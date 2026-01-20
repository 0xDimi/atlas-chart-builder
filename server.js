const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
let DefiLlama;
try {
  ({ DefiLlama } = require("@defillama/api"));
} catch (error) {
  DefiLlama = null;
}

const ROOT_DIR = __dirname;
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "0.0.0.0"]);
const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://0.0.0.0:5173",
  "https://0xdimi.github.io",
];
const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(","))
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

function getHostName(hostHeader) {
  if (!hostHeader) {
    return "";
  }
  const trimmed = hostHeader.trim();
  if (trimmed.startsWith("[")) {
    const end = trimmed.indexOf("]");
    if (end !== -1) {
      return trimmed.slice(1, end).toLowerCase();
    }
  }
  return trimmed.split(":")[0].toLowerCase();
}

function isLocalHost(hostHeader) {
  return LOCAL_HOSTS.has(getHostName(hostHeader));
}

function isAllowedOrigin(origin) {
  return origin && allowedOrigins.has(origin);
}

function applyCors(req, res) {
  const origin = req.headers.origin;
  if (!isAllowedOrigin(origin)) {
    return;
  }
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-api-key"
  );
}

function isRequestAllowed(req) {
  if (isLocalHost(req.headers.host)) {
    return true;
  }
  return isAllowedOrigin(req.headers.origin);
}

function loadEnvFile(filepath) {
  if (!fs.existsSync(filepath)) {
    return;
  }
  const raw = fs.readFileSync(filepath, "utf8");
  raw.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }
    const [key, ...rest] = trimmed.split("=");
    if (!key) {
      return;
    }
    const value = rest.join("=").trim();
    if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
      process.env[key] = value;
    }
  });
}

loadEnvFile(path.join(ROOT_DIR, ".env"));

const PORT = Number(process.env.PORT || 5173);

const providers = {
  defillama: {
    label: "DefiLlama",
    baseUrl: process.env.DEFILLAMA_BASE_URL || "https://pro-api.llama.fi",
    apiKey: process.env.DEFILLAMA_API_KEY || "",
    keyHeader: process.env.DEFILLAMA_KEY_HEADER || "x-api-key",
    keyPrefix: process.env.DEFILLAMA_KEY_PREFIX || "",
  },
  tokenterminal: {
    label: "Token Terminal",
    baseUrl:
      process.env.TOKEN_TERMINAL_BASE_URL || "https://api.tokenterminal.com/v2",
    apiKey: process.env.TOKEN_TERMINAL_API_KEY || "",
    keyHeader: process.env.TOKEN_TERMINAL_KEY_HEADER || "Authorization",
    keyPrefix: process.env.TOKEN_TERMINAL_KEY_PREFIX || "Bearer",
  },
};
const DEFILLAMA_SDK_PROVIDER = "defillama-sdk";
const DEFILLAMA_TIMEOUT = Number(process.env.DEFILLAMA_TIMEOUT || 30000);
const DEFILLAMA_SDK_MODULES = new Set([
  "tvl",
  "prices",
  "stablecoins",
  "yields",
  "volumes",
  "fees",
  "emissions",
  "bridges",
  "ecosystem",
  "etfs",
  "dat",
  "account",
]);
const defillamaSdkClient = DefiLlama
  ? new DefiLlama({ timeout: DEFILLAMA_TIMEOUT })
  : null;
const defillamaSdkProClient =
  DefiLlama && providers.defillama.apiKey
    ? new DefiLlama({
        apiKey: providers.defillama.apiKey,
        timeout: DEFILLAMA_TIMEOUT,
      })
    : null;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function buildTargetUrl(baseUrl, requestedPath) {
  if (!requestedPath) {
    return null;
  }
  try {
    const base = new URL(baseUrl);
    if (/^https?:\/\//i.test(requestedPath)) {
      const candidate = new URL(requestedPath);
      if (candidate.origin !== base.origin) {
        return null;
      }
      return candidate.toString();
    }
    const trimmedBase = base.toString().replace(/\/$/, "");
    const trimmedPath = requestedPath.startsWith("/")
      ? requestedPath
      : `/${requestedPath}`;
    return `${trimmedBase}${trimmedPath}`;
  } catch (error) {
    return null;
  }
}

function parseSdkArgs(rawArgs) {
  if (!rawArgs) {
    return [];
  }
  try {
    const parsed = JSON.parse(rawArgs);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    return [rawArgs];
  }
}

function isSafeSdkSegment(segment) {
  return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(segment);
}

function getDefiLlamaClient() {
  return defillamaSdkProClient || defillamaSdkClient;
}

async function handleDefiLlamaSdkRequest(req, res, url) {
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }
  if (!DefiLlama) {
    sendJson(res, 503, {
      error: "DefiLlama SDK not installed. Run npm install.",
    });
    return;
  }
  const method = url.searchParams.get("method");
  if (!method) {
    sendJson(res, 400, { error: "Missing method parameter." });
    return;
  }
  const [moduleName, methodName, extra] = method.split(".");
  if (extra || !moduleName || !methodName) {
    sendJson(res, 400, { error: "Method must be module.method." });
    return;
  }
  if (
    !DEFILLAMA_SDK_MODULES.has(moduleName) ||
    !isSafeSdkSegment(methodName)
  ) {
    sendJson(res, 400, { error: "Unsupported SDK method." });
    return;
  }
  const client = getDefiLlamaClient();
  if (!client || !client[moduleName]) {
    sendJson(res, 500, { error: "DefiLlama SDK unavailable." });
    return;
  }
  const targetModule = client[moduleName];
  const targetMethod = targetModule[methodName];
  if (typeof targetMethod !== "function") {
    sendJson(res, 400, { error: "Unknown SDK method." });
    return;
  }
  const args = parseSdkArgs(url.searchParams.get("args") || "");

  try {
    const result = await targetMethod.apply(targetModule, args);
    sendJson(res, 200, result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "DefiLlama SDK request failed.";
    const statusCode =
      error && typeof error === "object" && typeof error.statusCode === "number"
        ? error.statusCode
        : 502;
    sendJson(res, statusCode, { error: message });
  }
}

async function handleApiRequest(req, res, providerKey, url) {
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }
  const provider = providers[providerKey];
  if (!provider) {
    sendJson(res, 404, { error: "Unknown provider." });
    return;
  }
  if (!provider.apiKey) {
    sendJson(res, 503, {
      error: `${provider.label} API key missing. Set it in .env.`,
    });
    return;
  }
  const requestedPath = url.searchParams.get("path");
  if (!requestedPath) {
    sendJson(res, 400, { error: "Missing path parameter." });
    return;
  }
  const targetUrl = buildTargetUrl(provider.baseUrl, requestedPath);
  if (!targetUrl) {
    sendJson(res, 400, { error: "Invalid or disallowed URL." });
    return;
  }

  try {
    const headers = {
      "User-Agent": "Atlas Chart Builder",
    };
    const prefix = provider.keyPrefix ? `${provider.keyPrefix} ` : "";
    headers[provider.keyHeader] = `${prefix}${provider.apiKey}`;

    const response = await fetch(targetUrl, { headers });
    const body = await response.text();

    res.statusCode = response.status;
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/json; charset=utf-8"
    );
    res.setHeader("Cache-Control", "no-store");
    res.end(body);
  } catch (error) {
    sendJson(res, 502, { error: "Upstream request failed." });
  }
}

function serveStatic(req, res, url) {
  const rawPath = decodeURIComponent(url.pathname);
  const safePath = rawPath === "/" ? "/index.html" : rawPath;
  const filePath = path.normalize(path.join(ROOT_DIR, safePath));

  if (!filePath.startsWith(ROOT_DIR)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname.startsWith("/api/")) {
    if (!isRequestAllowed(req)) {
      sendJson(res, 403, {
        error: "Origin not allowed.",
      });
      return;
    }
    if (req.method === "OPTIONS") {
      applyCors(req, res);
      res.statusCode = 204;
      res.end();
      return;
    }
    applyCors(req, res);
    if (url.pathname === "/api/health") {
      sendJson(res, 200, {
        status: "ok",
        providers: Object.keys(providers),
        defillamaSdk: Boolean(DefiLlama),
      });
      return;
    }
    const providerKey = url.pathname.replace("/api/", "");
    if (providerKey === DEFILLAMA_SDK_PROVIDER) {
      handleDefiLlamaSdkRequest(req, res, url);
      return;
    }
    handleApiRequest(req, res, providerKey, url);
    return;
  }
  serveStatic(req, res, url);
});

server.listen(PORT, () => {
  console.log(`Atlas Chart Builder running at http://localhost:${PORT}`);
});

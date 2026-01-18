const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const ROOT_DIR = __dirname;

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
    const providerKey = url.pathname.replace("/api/", "");
    handleApiRequest(req, res, providerKey, url);
    return;
  }
  serveStatic(req, res, url);
});

server.listen(PORT, () => {
  console.log(`Atlas Chart Builder running at http://localhost:${PORT}`);
});

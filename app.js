const sampleCsv = `Date,TVL,Fees,Volume
2024-01-01,842,3.4,120
2024-01-08,905,3.9,150
2024-01-15,978,4.2,180
2024-01-22,1002,4.6,210
2024-01-29,1120,5.1,240
2024-02-05,1094,4.9,230
2024-02-12,1182,5.3,260
2024-02-19,1256,5.7,290
2024-02-26,1324,6.1,310
2024-03-04,1388,6.4,340
`;

const templateCsv = {
  tvl: `Date,TVL
2024-01-01,842
2024-01-08,905
2024-01-15,978
2024-01-22,1002
2024-01-29,1120
2024-02-05,1094
2024-02-12,1182
2024-02-19,1256
2024-02-26,1324
2024-03-04,1388
`,
  feesRevenue: `Date,Fees,Revenue
2024-01-01,3.4,1.2
2024-01-08,3.9,1.4
2024-01-15,4.2,1.6
2024-01-22,4.6,1.9
2024-01-29,5.1,2.1
2024-02-05,4.9,2.0
2024-02-12,5.3,2.3
2024-02-19,5.7,2.5
2024-02-26,6.1,2.8
2024-03-04,6.4,3.0
`,
  perpsOi: `Date,OpenInterest,Volume
2024-01-01,420,180
2024-01-08,460,210
2024-01-15,510,240
2024-01-22,540,265
2024-01-29,580,300
2024-02-05,560,295
2024-02-12,610,330
2024-02-19,640,360
2024-02-26,690,390
2024-03-04,720,420
`,
  dexShare: `Date,Uniswap,Curve,Pancake
2024-01-01,120,90,60
2024-01-08,135,88,72
2024-01-15,142,95,76
2024-01-22,150,98,80
2024-01-29,165,105,90
2024-02-05,160,102,88
2024-02-12,178,110,95
2024-02-19,186,115,100
2024-02-26,194,120,108
2024-03-04,205,128,112
`,
  stablecoins: `Date,USDT,USDC,DAI,FRAX
2024-01-01,90,45,20,8
2024-01-08,92,46,20.5,8.2
2024-01-15,95,47.5,21,8.3
2024-01-22,97,48.8,21.3,8.4
2024-01-29,99,50.2,21.8,8.5
2024-02-05,101,51,22.1,8.6
2024-02-12,103,52.3,22.6,8.7
2024-02-19,105,53,23,8.8
2024-02-26,107,54.4,23.4,8.9
2024-03-04,109,55.2,23.8,9
`,
  chainFees: `Date,Ethereum,Solana,Arbitrum,Base
2024-01-01,8.2,1.4,0.9,0.4
2024-01-08,8.7,1.6,1.1,0.5
2024-01-15,9.4,1.7,1.2,0.6
2024-01-22,10.1,1.8,1.3,0.7
2024-01-29,10.6,2.0,1.4,0.8
2024-02-05,10.2,1.9,1.3,0.75
2024-02-12,11.1,2.2,1.5,0.85
2024-02-19,11.6,2.3,1.6,0.9
2024-02-26,12.2,2.4,1.7,1.0
2024-03-04,12.8,2.6,1.9,1.1
`,
  usersTx: `Date,ActiveUsers,Transactions
2024-01-01,420,1200
2024-01-08,440,1280
2024-01-15,465,1360
2024-01-22,490,1450
2024-01-29,510,1520
2024-02-05,505,1500
2024-02-12,535,1620
2024-02-19,560,1700
2024-02-26,590,1820
2024-03-04,620,1950
`,
};

const templates = [
  {
    id: "tvl-trend",
    name: "TVL trend",
    description: "Single line TVL chart",
    csv: templateCsv.tvl,
    settings: {
      chartType: "line",
      xColumn: "Date",
      yColumns: ["TVL"],
      xAxisType: "time",
      yAxisLabel: "TVL (USD, millions)",
      chartTitle: "TVL trend",
      chartSubtitle: "Sample template",
      legendPosition: "none",
      smooth: true,
      showSymbols: false,
      sortByX: true,
    },
    seriesOverrides: {},
    annotations: { events: [], bands: [], callouts: [] },
  },
  {
    id: "fees-revenue-combo",
    name: "Fees vs revenue",
    description: "Combo bar + line with dual axis",
    csv: templateCsv.feesRevenue,
    settings: {
      chartType: "combo",
      comboDefaultType: "bar",
      xColumn: "Date",
      yColumns: ["Fees", "Revenue"],
      xAxisType: "time",
      yAxisLabel: "Fees (USD, millions)",
      yAxisRightLabel: "Revenue (USD, millions)",
      chartTitle: "Fees vs revenue",
      legendPosition: "top",
      sortByX: true,
    },
    seriesOverrides: {
      Fees: {
        type: "bar",
        axis: "left",
        color: "#0f6b63",
      },
      Revenue: {
        type: "line",
        axis: "right",
        color: "#b3412f",
        smooth: true,
        marker: "circle",
      },
    },
    annotations: { events: [], bands: [], callouts: [] },
  },
  {
    id: "perps-oi",
    name: "Perps OI + volume",
    description: "Combo area + bar",
    csv: templateCsv.perpsOi,
    settings: {
      chartType: "combo",
      comboDefaultType: "area",
      xColumn: "Date",
      yColumns: ["OpenInterest", "Volume"],
      xAxisType: "time",
      yAxisLabel: "Open interest",
      yAxisRightLabel: "Volume",
      chartTitle: "Perps open interest and volume",
      legendPosition: "top",
      sortByX: true,
      showSymbols: false,
    },
    seriesOverrides: {
      OpenInterest: {
        type: "area",
        axis: "left",
        color: "#1a4d7a",
        smooth: true,
        marker: "none",
      },
      Volume: {
        type: "bar",
        axis: "right",
        color: "#f08b3e",
      },
    },
    annotations: { events: [], bands: [], callouts: [] },
  },
  {
    id: "dex-share",
    name: "DEX volume share",
    description: "Stacked 100% area chart",
    csv: templateCsv.dexShare,
    settings: {
      chartType: "area",
      xColumn: "Date",
      yColumns: ["Uniswap", "Curve", "Pancake"],
      xAxisType: "time",
      yAxisLabel: "Share",
      chartTitle: "DEX volume share",
      legendPosition: "top",
      sortByX: true,
      stacked: true,
      stackedPercent: true,
      showSymbols: false,
    },
    seriesOverrides: {},
    annotations: { events: [], bands: [], callouts: [] },
  },
  {
    id: "stablecoin-supply",
    name: "Stablecoin supply mix",
    description: "Stacked area for stablecoin supply",
    csv: templateCsv.stablecoins,
    settings: {
      chartType: "area",
      xColumn: "Date",
      yColumns: ["USDT", "USDC", "DAI", "FRAX"],
      xAxisType: "time",
      yAxisLabel: "Supply (USD, billions)",
      chartTitle: "Stablecoin supply mix",
      legendPosition: "top",
      sortByX: true,
      stacked: true,
      showSymbols: false,
    },
    seriesOverrides: {
      USDT: { valueFormat: "currency", valueSuffix: "B" },
      USDC: { valueFormat: "currency", valueSuffix: "B" },
      DAI: { valueFormat: "currency", valueSuffix: "B" },
      FRAX: { valueFormat: "currency", valueSuffix: "B" },
    },
    annotations: { events: [], bands: [], callouts: [] },
  },
  {
    id: "chain-fees",
    name: "Chain fee leaders",
    description: "Grouped bar chart for chain fees",
    csv: templateCsv.chainFees,
    settings: {
      chartType: "bar",
      xColumn: "Date",
      yColumns: ["Ethereum", "Solana", "Arbitrum", "Base"],
      xAxisType: "time",
      yAxisLabel: "Fees (USD, millions)",
      chartTitle: "Weekly chain fees",
      legendPosition: "top",
      sortByX: true,
    },
    seriesOverrides: {
      Ethereum: { valueFormat: "currency", valueSuffix: "M" },
      Solana: { valueFormat: "currency", valueSuffix: "M" },
      Arbitrum: { valueFormat: "currency", valueSuffix: "M" },
      Base: { valueFormat: "currency", valueSuffix: "M" },
    },
    annotations: { events: [], bands: [], callouts: [] },
  },
  {
    id: "users-tx",
    name: "Users vs transactions",
    description: "Combo line + bar with dual axis",
    csv: templateCsv.usersTx,
    settings: {
      chartType: "combo",
      comboDefaultType: "bar",
      xColumn: "Date",
      yColumns: ["ActiveUsers", "Transactions"],
      xAxisType: "time",
      yAxisLabel: "Active users (k)",
      yAxisRightLabel: "Transactions (k)",
      chartTitle: "Users and transactions",
      legendPosition: "top",
      sortByX: true,
    },
    seriesOverrides: {
      ActiveUsers: {
        type: "line",
        axis: "left",
        color: "#1a4d7a",
        smooth: true,
        valueFormat: "number",
        valueSuffix: "k",
      },
      Transactions: {
        type: "bar",
        axis: "right",
        color: "#f08b3e",
        valueFormat: "number",
        valueSuffix: "k",
      },
    },
    annotations: { events: [], bands: [], callouts: [] },
  },
];

const elements = {
  csvFile: document.getElementById("csvFile"),
  csvPaste: document.getElementById("csvPaste"),
  parsePaste: document.getElementById("parsePaste"),
  loadSample: document.getElementById("loadSample"),
  clearData: document.getElementById("clearData"),
  clearAllData: document.getElementById("clearAllData"),
  dataStatus: document.getElementById("dataStatus"),
  dataPreview: document.getElementById("dataPreview"),
  apiCard: document.getElementById("apiCard"),
  apiBaseUrl: document.getElementById("apiBaseUrl"),
  apiProvider: document.getElementById("apiProvider"),
  apiEndpointLabel: document.getElementById("apiEndpointLabel"),
  apiEndpoint: document.getElementById("apiEndpoint"),
  apiDatasetName: document.getElementById("apiDatasetName"),
  apiJsonPath: document.getElementById("apiJsonPath"),
  apiSdkArgsField: document.getElementById("apiSdkArgsField"),
  apiSdkArgs: document.getElementById("apiSdkArgs"),
  apiFetch: document.getElementById("apiFetch"),
  apiClear: document.getElementById("apiClear"),
  apiStatus: document.getElementById("apiStatus"),
  apiHint: document.getElementById("apiHint"),
  defillamaGuided: document.getElementById("defillamaGuided"),
  defillamaMetric: document.getElementById("defillamaMetric"),
  defillamaProtocol: document.getElementById("defillamaProtocol"),
  defillamaProtocolList: document.getElementById("defillamaProtocolList"),
  defillamaChainField: document.getElementById("defillamaChainField"),
  defillamaChain: document.getElementById("defillamaChain"),
  defillamaLoad: document.getElementById("defillamaLoad"),
  defillamaStatus: document.getElementById("defillamaStatus"),
  tokenTerminalGuided: document.getElementById("tokenTerminalGuided"),
  tokenTerminalProject: document.getElementById("tokenTerminalProject"),
  tokenTerminalProjectList: document.getElementById("tokenTerminalProjectList"),
  tokenTerminalAddCoin: document.getElementById("tokenTerminalAddCoin"),
  tokenTerminalClearCoins: document.getElementById("tokenTerminalClearCoins"),
  tokenTerminalSelectedList: document.getElementById("tokenTerminalSelectedList"),
  tokenTerminalLoadPrice: document.getElementById("tokenTerminalLoadPrice"),
  tokenTerminalStatus: document.getElementById("tokenTerminalStatus"),
  datasetList: document.getElementById("datasetList"),
  projectName: document.getElementById("projectName"),
  projectSelect: document.getElementById("projectSelect"),
  loadProject: document.getElementById("loadProject"),
  newProject: document.getElementById("newProject"),
  saveProject: document.getElementById("saveProject"),
  saveAsProject: document.getElementById("saveAsProject"),
  duplicateProject: document.getElementById("duplicateProject"),
  deleteProject: document.getElementById("deleteProject"),
  historySelect: document.getElementById("historySelect"),
  restoreHistory: document.getElementById("restoreHistory"),
  branchHistory: document.getElementById("branchHistory"),
  templateSelect: document.getElementById("templateSelect"),
  applyTemplate: document.getElementById("applyTemplate"),
  projectStatus: document.getElementById("projectStatus"),
  xColumn: document.getElementById("xColumn"),
  dateRangePreset: document.getElementById("dateRangePreset"),
  dateStart: document.getElementById("dateStart"),
  dateEnd: document.getElementById("dateEnd"),
  clearDateRange: document.getElementById("clearDateRange"),
  yColumns: document.getElementById("yColumns"),
  yColumnsField: document.getElementById("yColumnsField"),
  compareMode: document.getElementById("compareMode"),
  chartType: document.getElementById("chartType"),
  comboDefaults: document.getElementById("comboDefaults"),
  comboDefaultType: document.getElementById("comboDefaultType"),
  histogramOptions: document.getElementById("histogramOptions"),
  histogramColumn: document.getElementById("histogramColumn"),
  histogramBins: document.getElementById("histogramBins"),
  waterfallOptions: document.getElementById("waterfallOptions"),
  waterfallColumn: document.getElementById("waterfallColumn"),
  waterfallMode: document.getElementById("waterfallMode"),
  waterfallPositive: document.getElementById("waterfallPositive"),
  waterfallNegative: document.getElementById("waterfallNegative"),
  boxplotHint: document.getElementById("boxplotHint"),
  stacked: document.getElementById("stacked"),
  stackedPercent: document.getElementById("stackedPercent"),
  smooth: document.getElementById("smooth"),
  showSymbols: document.getElementById("showSymbols"),
  showLabels: document.getElementById("showLabels"),
  sortByX: document.getElementById("sortByX"),
  lineWidth: document.getElementById("lineWidth"),
  symbolSize: document.getElementById("symbolSize"),
  areaOpacity: document.getElementById("areaOpacity"),
  barWidth: document.getElementById("barWidth"),
  barGap: document.getElementById("barGap"),
  barCategoryGap: document.getElementById("barCategoryGap"),
  xAxisType: document.getElementById("xAxisType"),
  yScale: document.getElementById("yScale"),
  yScaleRight: document.getElementById("yScaleRight"),
  xAxisLabel: document.getElementById("xAxisLabel"),
  yAxisLabel: document.getElementById("yAxisLabel"),
  yAxisRightLabel: document.getElementById("yAxisRightLabel"),
  yAxisFormat: document.getElementById("yAxisFormat"),
  yAxisSuffix: document.getElementById("yAxisSuffix"),
  yAxisRightFormat: document.getElementById("yAxisRightFormat"),
  yAxisRightSuffix: document.getElementById("yAxisRightSuffix"),
  xAxisLabelSize: document.getElementById("xAxisLabelSize"),
  xAxisNameSize: document.getElementById("xAxisNameSize"),
  xAxisLabelFont: document.getElementById("xAxisLabelFont"),
  xAxisLabelWeight: document.getElementById("xAxisLabelWeight"),
  xAxisNameFont: document.getElementById("xAxisNameFont"),
  xAxisNameWeight: document.getElementById("xAxisNameWeight"),
  yAxisLabelSize: document.getElementById("yAxisLabelSize"),
  yAxisNameSize: document.getElementById("yAxisNameSize"),
  yAxisLabelFont: document.getElementById("yAxisLabelFont"),
  yAxisLabelWeight: document.getElementById("yAxisLabelWeight"),
  yAxisNameFont: document.getElementById("yAxisNameFont"),
  yAxisNameWeight: document.getElementById("yAxisNameWeight"),
  yAxisRightLabelSize: document.getElementById("yAxisRightLabelSize"),
  yAxisRightNameSize: document.getElementById("yAxisRightNameSize"),
  yAxisRightLabelFont: document.getElementById("yAxisRightLabelFont"),
  yAxisRightLabelWeight: document.getElementById("yAxisRightLabelWeight"),
  yAxisRightNameFont: document.getElementById("yAxisRightNameFont"),
  yAxisRightNameWeight: document.getElementById("yAxisRightNameWeight"),
  yMin: document.getElementById("yMin"),
  yMax: document.getElementById("yMax"),
  xAxisRotate: document.getElementById("xAxisRotate"),
  chartTitle: document.getElementById("chartTitle"),
  chartSubtitle: document.getElementById("chartSubtitle"),
  titleLeft: document.getElementById("titleLeft"),
  titleTop: document.getElementById("titleTop"),
  titleAlign: document.getElementById("titleAlign"),
  pickTitlePosition: document.getElementById("pickTitlePosition"),
  titleSize: document.getElementById("titleSize"),
  subtitleSize: document.getElementById("subtitleSize"),
  legendSize: document.getElementById("legendSize"),
  legendPosition: document.getElementById("legendPosition"),
  legendFont: document.getElementById("legendFont"),
  legendWeight: document.getElementById("legendWeight"),
  renderer: document.getElementById("renderer"),
  palette: document.getElementById("palette"),
  customColors: document.getElementById("customColors"),
  fontFamily: document.getElementById("fontFamily"),
  textColor: document.getElementById("textColor"),
  gridColor: document.getElementById("gridColor"),
  transparentBg: document.getElementById("transparentBg"),
  backgroundColor: document.getElementById("backgroundColor"),
  watermarkEnabled: document.getElementById("watermarkEnabled"),
  watermarkOpacity: document.getElementById("watermarkOpacity"),
  watermarkOpacityValue: document.getElementById("watermarkOpacityValue"),
  watermarkScale: document.getElementById("watermarkScale"),
  watermarkScaleValue: document.getElementById("watermarkScaleValue"),
  resetChart: document.getElementById("resetChart"),
  exportName: document.getElementById("exportName"),
  exportScale: document.getElementById("exportScale"),
  copyPng: document.getElementById("copyPng"),
  downloadPng: document.getElementById("downloadPng"),
  advancedJson: document.getElementById("advancedJson"),
  applyAdvanced: document.getElementById("applyAdvanced"),
  clearAdvanced: document.getElementById("clearAdvanced"),
  advancedStatus: document.getElementById("advancedStatus"),
  seriesCount: document.getElementById("seriesCount"),
  chartRecommendation: document.getElementById("chartRecommendation"),
  recommendedType: document.getElementById("recommendedType"),
  recommendationReason: document.getElementById("recommendationReason"),
  applyRecommendation: document.getElementById("applyRecommendation"),
  seriesOverrides: document.getElementById("seriesOverrides"),
  chartCard: document.getElementById("chartCard"),
  chartShell: document.getElementById("chartShell"),
  controlPanel: document.getElementById("controlPanel"),
  toggleLayout: document.getElementById("toggleLayout"),
  toggleFullscreen: document.getElementById("toggleFullscreen"),
  copyPngQuick: document.getElementById("copyPngQuick"),
  downloadPngQuick: document.getElementById("downloadPngQuick"),
  quickTextEditor: document.getElementById("quickTextEditor"),
  quickAxisTarget: document.getElementById("quickAxisTarget"),
  quickAxisLabelSize: document.getElementById("quickAxisLabelSize"),
  quickAxisNameSize: document.getElementById("quickAxisNameSize"),
  quickAxisLabelFont: document.getElementById("quickAxisLabelFont"),
  quickAxisLabelWeight: document.getElementById("quickAxisLabelWeight"),
  quickAxisNameFont: document.getElementById("quickAxisNameFont"),
  quickAxisNameWeight: document.getElementById("quickAxisNameWeight"),
  closeQuickText: document.getElementById("closeQuickText"),
  openAxisEditor: document.getElementById("openAxisEditor"),
  eventX: document.getElementById("eventX"),
  eventLabel: document.getElementById("eventLabel"),
  eventColor: document.getElementById("eventColor"),
  addEvent: document.getElementById("addEvent"),
  eventList: document.getElementById("eventList"),
  bandStart: document.getElementById("bandStart"),
  bandEnd: document.getElementById("bandEnd"),
  bandLabel: document.getElementById("bandLabel"),
  bandColor: document.getElementById("bandColor"),
  addBand: document.getElementById("addBand"),
  bandList: document.getElementById("bandList"),
  calloutX: document.getElementById("calloutX"),
  calloutY: document.getElementById("calloutY"),
  calloutLabel: document.getElementById("calloutLabel"),
  calloutColor: document.getElementById("calloutColor"),
  addCallout: document.getElementById("addCallout"),
  calloutList: document.getElementById("calloutList"),
};

const palettes = {
  ocean: ["#0f6b63", "#1a4d7a", "#f08b3e", "#b3412f", "#d4a373"],
  ember: ["#b3412f", "#f08b3e", "#7a3426", "#2f7d6b", "#1a4d7a"],
  forest: ["#1f6f5c", "#3a7d44", "#8f9d4f", "#d9b44a", "#4a5d23"],
  mono: ["#1a1d1f", "#4f5658", "#778184", "#a1a7a9", "#c7ccce"],
  sand: ["#d4a373", "#f0d9b5", "#8a5a44", "#b08968", "#6b705c"],
};

const STORAGE_KEY = "atlasChartBuilderProjects";
const VIEW_KEY = "atlasChartBuilderViewMode";
const TAB_KEY = "atlasChartBuilderActiveTab";
const HISTORY_LIMIT = 20;
const MIN_CHART_WIDTH = 320;
const MIN_CHART_HEIGHT = 260;
const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
const percentFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

const state = {
  seriesOverrides: {},
  annotations: { events: [], bands: [], callouts: [] },
  projects: [],
  currentProjectId: null,
  datasets: [],
  activeDatasetId: null,
  apiBaseUrl: "",
};

const API_LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "0.0.0.0"]);
const API_BASE_URL_KEY = "atlasChartBuilderApiBaseUrl";
const DEFILLAMA_PUBLIC_BASE_URL = "https://api.llama.fi";
const WATERMARK_IMAGE_SRC = "Alea Logo_Dark Horizontal.png";
const WATERMARK_ASPECT_RATIO = 4;
const isLocalHost =
  typeof window !== "undefined" &&
  API_LOCAL_HOSTS.has(window.location.hostname);
const apiEnabled = typeof window !== "undefined";
const DEFILLAMA_SDK_PROVIDER = "defillama-sdk";
const API_PROVIDER_LABELS = {
  defillama: "DefiLlama",
  "defillama-sdk": "DefiLlama (SDK)",
  tokenterminal: "Token Terminal",
};

const DEFILLAMA_METRIC_CONFIGS = {
  "protocol-tvl": {
    label: "TVL",
    path: (slug) => `/protocol/${slug}`,
    jsonPath: "tvl",
    needsChain: false,
  },
  "protocol-chain-tvl": {
    label: "TVL",
    path: (slug) => `/protocol/${slug}`,
    jsonPath: (_, chain) => `chainTvls.${chain}.tvl`,
    needsChain: true,
  },
  "protocol-fees": {
    label: "Fees",
    path: (slug) => `/summary/fees/${slug}`,
    jsonPath: "totalDataChart",
    needsChain: false,
  },
  "protocol-revenue": {
    label: "Revenue",
    path: (slug) => `/summary/revenue/${slug}`,
    jsonPath: "totalDataChart",
    needsChain: false,
  },
  "dex-volume": {
    label: "DEX volume",
    path: (slug) => `/summary/dexs/${slug}`,
    jsonPath: "totalDataChart",
    needsChain: false,
  },
};

if (apiEnabled) {
  const storedBaseUrl = localStorage.getItem(API_BASE_URL_KEY) || "";
  const defaultBaseUrl = isLocalHost ? window.location.origin : "";
  state.apiBaseUrl = normalizeApiBaseUrl(storedBaseUrl || defaultBaseUrl);
}

let chart;
let currentRows = [];
let currentColumns = [];
let quickAxisTarget = "x";
let apiFetchInFlight = false;
let zoomSnapshot = null;
let suppressDatePresetSync = false;
const defillamaProtocolIndex = new Map();
const defillamaProtocolNameIndex = new Map();
const tokenTerminalProjectIndex = new Map();
const tokenTerminalProjectNameIndex = new Map();
const tokenTerminalProjectSymbolIndex = new Map();
const tokenTerminalMetricIndex = new Map();
let tokenTerminalAvailableProjects = new Set();
const tokenTerminalSelectedProjects = [];

const axisTargets = {
  x: {
    labelSize: elements.xAxisLabelSize,
    nameSize: elements.xAxisNameSize,
    labelFont: elements.xAxisLabelFont,
    labelWeight: elements.xAxisLabelWeight,
    nameFont: elements.xAxisNameFont,
    nameWeight: elements.xAxisNameWeight,
  },
  yLeft: {
    labelSize: elements.yAxisLabelSize,
    nameSize: elements.yAxisNameSize,
    labelFont: elements.yAxisLabelFont,
    labelWeight: elements.yAxisLabelWeight,
    nameFont: elements.yAxisNameFont,
    nameWeight: elements.yAxisNameWeight,
  },
  yRight: {
    labelSize: elements.yAxisRightLabelSize,
    nameSize: elements.yAxisRightNameSize,
    labelFont: elements.yAxisRightLabelFont,
    labelWeight: elements.yAxisRightLabelWeight,
    nameFont: elements.yAxisRightNameFont,
    nameWeight: elements.yAxisRightNameWeight,
  },
  legend: {
    labelSize: elements.legendSize,
    nameSize: elements.legendSize,
    labelFont: elements.legendFont,
    labelWeight: elements.legendWeight,
    nameFont: elements.legendFont,
    nameWeight: elements.legendWeight,
  },
};

function initChart() {
  if (typeof echarts === "undefined") {
    updateProjectStatus("ECharts failed to load. Check your network.", true);
    return;
  }
  const chartElement = document.getElementById("chart");
  if (!chartElement) {
    updateProjectStatus("Chart container missing.", true);
    return;
  }
  if (chart) {
    chart.dispose();
  }
  chart = echarts.init(chartElement, null, {
    renderer: elements.renderer.value,
  });
  attachChartEvents();
}

function updateStatus(message, isError) {
  elements.dataStatus.textContent = message;
  elements.dataStatus.style.color = isError ? "#b3412f" : "#0f6b63";
}

function updateApiStatus(message, isError) {
  if (!elements.apiStatus) {
    return;
  }
  elements.apiStatus.textContent = message;
  elements.apiStatus.style.color = isError ? "#b3412f" : "#0f6b63";
}

function normalizeApiBaseUrl(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) {
    return "";
  }
  const needsProtocol = !/^(https?:)?\/\//i.test(trimmed);
  const isLocal =
    /^(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/i.test(trimmed);
  const withProtocol = needsProtocol
    ? `${isLocal ? "http" : "https"}://${trimmed}`
    : trimmed;
  try {
    const parsed = new URL(withProtocol);
    return parsed.origin;
  } catch (error) {
    return "";
  }
}

function getApiBaseUrl() {
  return state.apiBaseUrl;
}

function setApiBaseUrl(value) {
  const normalized = normalizeApiBaseUrl(value);
  if (!normalized && value && value.trim()) {
    updateApiStatus("Invalid API host URL.", true);
  }
  state.apiBaseUrl = normalized;
  if (apiEnabled) {
    if (state.apiBaseUrl) {
      localStorage.setItem(API_BASE_URL_KEY, state.apiBaseUrl);
    } else {
      localStorage.removeItem(API_BASE_URL_KEY);
    }
  }
  syncApiBaseUrlInput();
  syncApiControls();
  updateApiHint(elements.apiProvider ? elements.apiProvider.value : "");
}

function syncApiBaseUrlInput() {
  if (!elements.apiBaseUrl) {
    return;
  }
  elements.apiBaseUrl.value = state.apiBaseUrl;
}

function updateApiHint(provider) {
  if (!elements.apiHint) {
    return;
  }
  const usingSdk = provider === DEFILLAMA_SDK_PROVIDER;
  let hint = "";
  if (state.apiBaseUrl) {
    hint = `Using ${state.apiBaseUrl} for API requests.`;
  } else if (provider === "defillama") {
    hint = "Using the public DefiLlama API (no host required).";
  } else if (isLocalHost) {
    hint = "Local-only: requires the proxy server and API keys.";
  } else {
    hint = "Set your hosted API URL to enable connectors on GitHub Pages.";
  }
  if (usingSdk) {
    hint = `${hint} SDK methods may require a Pro key.`;
  }
  elements.apiHint.textContent = hint;
}

function syncApiControls() {
  if (!elements.apiFetch) {
    return;
  }
  const provider = elements.apiProvider ? elements.apiProvider.value : "";
  const canFetch =
    Boolean(state.apiBaseUrl) || (provider === "defillama" && apiEnabled);
  elements.apiFetch.disabled = apiFetchInFlight || !canFetch;
}

function getApiProviderLabel(provider) {
  return API_PROVIDER_LABELS[provider] || "API";
}

function resolveApiBaseUrl(provider) {
  if (state.apiBaseUrl) {
    return state.apiBaseUrl;
  }
  if (provider === "defillama") {
    return DEFILLAMA_PUBLIC_BASE_URL;
  }
  return "";
}

function syncApiProviderUI() {
  if (!elements.apiProvider) {
    return;
  }
  const provider = elements.apiProvider.value;
  const usingSdk = provider === DEFILLAMA_SDK_PROVIDER;

  if (elements.apiEndpointLabel) {
    elements.apiEndpointLabel.textContent = usingSdk
      ? "SDK method"
      : "Endpoint path or full URL";
  }
  if (elements.apiEndpoint) {
    elements.apiEndpoint.placeholder = usingSdk
      ? "tvl.getProtocol"
      : "/protocol/ethereum or https://...";
  }
  if (elements.apiSdkArgsField) {
    elements.apiSdkArgsField.classList.toggle("is-hidden", !usingSdk);
  }
  if (elements.defillamaGuided) {
    elements.defillamaGuided.classList.toggle("is-hidden", provider !== "defillama");
    if (provider === "defillama") {
      syncDefillamaChainOptions();
    }
  }
  if (elements.tokenTerminalGuided) {
    elements.tokenTerminalGuided.classList.toggle(
      "is-hidden",
      provider !== "tokenterminal"
    );
    if (provider === "tokenterminal") {
      loadTokenTerminalProjects();
      if (!tokenTerminalMetricIndex.size) {
        loadTokenTerminalMetrics();
      } else {
        loadTokenTerminalMetricProjects(resolveTokenTerminalPriceMetric());
      }
    }
  }
  updateApiHint(provider);
}

function setApiAvailability() {
  if (!elements.apiCard) {
    return;
  }
  if (!apiEnabled) {
    elements.apiCard.classList.add("is-hidden");
    return;
  }
  elements.apiCard.classList.remove("is-hidden");
  syncApiBaseUrlInput();
  syncApiProviderUI();
  syncApiControls();
}

function updateDefillamaStatus(message, isError) {
  if (!elements.defillamaStatus) {
    return;
  }
  elements.defillamaStatus.textContent = message || "";
  elements.defillamaStatus.style.color = isError ? "#b3412f" : "";
}

function updateTokenTerminalStatus(message, isError) {
  if (!elements.tokenTerminalStatus) {
    return;
  }
  elements.tokenTerminalStatus.textContent = message || "";
  elements.tokenTerminalStatus.style.color = isError ? "#b3412f" : "";
}

function normalizeTokenTerminalProjectLabel(project) {
  if (!project) {
    return "";
  }
  const name = project.name || project.project_name || "";
  const id = project.project_id || project.id || "";
  const symbol = project.symbol ? project.symbol.toUpperCase() : "";
  const labelParts = [];
  if (name) {
    labelParts.push(name);
  }
  if (id && name && id.toLowerCase() !== name.toLowerCase()) {
    labelParts.push(`(${id})`);
  } else if (id && !name) {
    labelParts.push(id);
  }
  if (symbol) {
    labelParts.push(`[${symbol}]`);
  }
  return labelParts.join(" ").trim();
}

function resolveTokenTerminalProjectId(input) {
  const value = String(input || "").trim();
  if (!value) {
    return "";
  }
  const match = value.match(/\(([^)]+)\)/);
  if (match && match[1]) {
    return match[1].trim();
  }
  const symbolMatch = value.match(/\[([^\]]+)\]/);
  if (symbolMatch && symbolMatch[1]) {
    const symbolKey = symbolMatch[1].trim().toLowerCase();
    if (tokenTerminalProjectSymbolIndex.has(symbolKey)) {
      return tokenTerminalProjectSymbolIndex.get(symbolKey);
    }
  }
  const lower = value.toLowerCase();
  if (tokenTerminalProjectIndex.has(lower)) {
    return lower;
  }
  if (tokenTerminalProjectNameIndex.has(lower)) {
    return tokenTerminalProjectNameIndex.get(lower);
  }
  if (tokenTerminalProjectSymbolIndex.has(lower)) {
    return tokenTerminalProjectSymbolIndex.get(lower);
  }
  return value;
}

function resolveTokenTerminalPriceMetric() {
  if (tokenTerminalMetricIndex.has("price")) {
    return "price";
  }
  for (const [metricId, metric] of tokenTerminalMetricIndex.entries()) {
    const name = String(metric?.metric_name || metric?.name || "").toLowerCase();
    if (name.includes("price")) {
      return metricId;
    }
  }
  return "price";
}

function normalizeDefillamaProtocolLabel(protocol) {
  if (!protocol) {
    return "";
  }
  const name = protocol.name || protocol.slug || "";
  const slug = protocol.slug || "";
  if (name && slug && name.toLowerCase() !== slug.toLowerCase()) {
    return `${name} (${slug})`;
  }
  return name || slug;
}

function resolveDefillamaProtocolSlug(input) {
  const value = String(input || "").trim();
  if (!value) {
    return "";
  }
  const match = value.match(/\(([^)]+)\)\s*$/);
  if (match && match[1]) {
    return match[1].trim();
  }
  const lower = value.toLowerCase();
  if (defillamaProtocolIndex.has(lower)) {
    return lower;
  }
  if (defillamaProtocolNameIndex.has(lower)) {
    return defillamaProtocolNameIndex.get(lower);
  }
  return value;
}

function syncDefillamaChainOptions() {
  if (!elements.defillamaChain || !elements.defillamaMetric) {
    return;
  }
  const metric = elements.defillamaMetric.value;
  const needsChain =
    DEFILLAMA_METRIC_CONFIGS[metric] &&
    DEFILLAMA_METRIC_CONFIGS[metric].needsChain;
  if (elements.defillamaChainField) {
    elements.defillamaChainField.classList.toggle("is-hidden", !needsChain);
  }
  if (!needsChain) {
    populateSelect(elements.defillamaChain, [], "Chain not required");
    return;
  }
  const slug = resolveDefillamaProtocolSlug(elements.defillamaProtocol.value);
  const protocol = defillamaProtocolIndex.get(slug);
  const chains = protocol && Array.isArray(protocol.chains) ? protocol.chains : [];
  if (!chains.length) {
    populateSelect(elements.defillamaChain, [], "Select protocol first");
    return;
  }
  const uniqueChains = Array.from(new Set(chains)).sort();
  populateSelect(elements.defillamaChain, uniqueChains, "Select chain");
}

async function loadDefillamaProtocols() {
  if (!elements.defillamaProtocolList) {
    return;
  }
  updateDefillamaStatus("Loading DefiLlama protocols...", false);
  try {
    const response = await fetch(`${DEFILLAMA_PUBLIC_BASE_URL}/protocols`);
    if (!response.ok) {
      throw new Error(`Failed to load protocols (${response.status})`);
    }
    const protocols = await response.json();
    defillamaProtocolIndex.clear();
    defillamaProtocolNameIndex.clear();
    const fragment = document.createDocumentFragment();
    protocols
      .slice()
      .sort((a, b) => (b.tvl || 0) - (a.tvl || 0))
      .forEach((protocol) => {
        if (!protocol || !protocol.slug) {
          return;
        }
        const slug = String(protocol.slug).toLowerCase();
        defillamaProtocolIndex.set(slug, protocol);
        if (protocol.name) {
          defillamaProtocolNameIndex.set(String(protocol.name).toLowerCase(), slug);
        }
        const option = document.createElement("option");
        option.value = normalizeDefillamaProtocolLabel(protocol);
        fragment.appendChild(option);
      });
    elements.defillamaProtocolList.innerHTML = "";
    elements.defillamaProtocolList.appendChild(fragment);
    updateDefillamaStatus(`Loaded ${defillamaProtocolIndex.size} protocols.`, false);
    syncDefillamaChainOptions();
  } catch (error) {
    updateDefillamaStatus(
      "Could not load protocol list. You can still type a slug.",
      true
    );
  }
}

function renderTokenTerminalProjectList() {
  if (!elements.tokenTerminalProjectList) {
    return;
  }
  const fragment = document.createDocumentFragment();
  const available =
    tokenTerminalAvailableProjects && tokenTerminalAvailableProjects.size
      ? tokenTerminalAvailableProjects
      : null;
  tokenTerminalProjectIndex.forEach((project, slug) => {
    if (available && !available.has(slug)) {
      return;
    }
    const option = document.createElement("option");
    option.value = normalizeTokenTerminalProjectLabel(project);
    fragment.appendChild(option);
  });
  elements.tokenTerminalProjectList.innerHTML = "";
  elements.tokenTerminalProjectList.appendChild(fragment);
}

function renderTokenTerminalSelectedProjects() {
  if (!elements.tokenTerminalSelectedList) {
    return;
  }
  elements.tokenTerminalSelectedList.innerHTML = "";
  if (!tokenTerminalSelectedProjects.length) {
    return;
  }
  const fragment = document.createDocumentFragment();
  tokenTerminalSelectedProjects.forEach((project) => {
    const chip = document.createElement("span");
    chip.className = "token-chip";
    chip.textContent = project.label || project.name || project.id;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Remove ${project.label || project.id}`);
    remove.addEventListener("click", () => {
      removeTokenTerminalSelection(project.slug);
    });
    chip.appendChild(remove);
    fragment.appendChild(chip);
  });
  elements.tokenTerminalSelectedList.appendChild(fragment);
}

function removeTokenTerminalSelection(slug) {
  const index = tokenTerminalSelectedProjects.findIndex(
    (project) => project.slug === slug
  );
  if (index === -1) {
    return;
  }
  tokenTerminalSelectedProjects.splice(index, 1);
  renderTokenTerminalSelectedProjects();
}

function clearTokenTerminalSelections() {
  tokenTerminalSelectedProjects.length = 0;
  renderTokenTerminalSelectedProjects();
}

function addTokenTerminalSelection(value) {
  const resolved = resolveTokenTerminalProjectId(value);
  if (!resolved) {
    updateTokenTerminalStatus("Enter a coin from the list.", true);
    return;
  }
  const slug = String(resolved).toLowerCase();
  const project = tokenTerminalProjectIndex.get(slug);
  if (!project) {
    updateTokenTerminalStatus(
      `Unknown coin: ${resolved}. Pick from the list.`,
      true
    );
    return;
  }
  const projectId = project.project_id || project.id || resolved;
  if (
    tokenTerminalSelectedProjects.some(
      (entry) => entry.slug === slug || entry.id === projectId
    )
  ) {
    updateTokenTerminalStatus("Coin already added.", false);
    return;
  }
  tokenTerminalSelectedProjects.push({
    id: String(projectId),
    slug,
    name: project.name || projectId,
    label: normalizeTokenTerminalProjectLabel(project),
  });
  renderTokenTerminalSelectedProjects();
  if (elements.tokenTerminalProject) {
    elements.tokenTerminalProject.value = "";
  }
  updateTokenTerminalStatus("", false);
}

function getTokenTerminalSelections() {
  if (tokenTerminalSelectedProjects.length) {
    return {
      ids: tokenTerminalSelectedProjects.map((project) => project.id),
      names: tokenTerminalSelectedProjects.map(
        (project) => project.name || project.id
      ),
      unknown: [],
    };
  }
  const input = elements.tokenTerminalProject?.value || "";
  return parseTokenTerminalProjectIds(input);
}

async function loadTokenTerminalProjects() {
  if (!elements.tokenTerminalProjectList) {
    return;
  }
  const baseUrl = resolveApiBaseUrl("tokenterminal");
  if (!baseUrl) {
    updateTokenTerminalStatus(
      "Set API host to load Token Terminal coins.",
      true
    );
    return;
  }
  updateTokenTerminalStatus("Loading Token Terminal coins...", false);
  try {
    const url = new URL("/api/tokenterminal", baseUrl);
    url.searchParams.set("path", "/projects");
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to load projects (${response.status})`);
    }
    const payload = await response.json();
    const projects = Array.isArray(payload?.data) ? payload.data : payload;
    if (!Array.isArray(projects)) {
      throw new Error("Project list missing.");
    }
    tokenTerminalProjectIndex.clear();
    tokenTerminalProjectNameIndex.clear();
    tokenTerminalProjectSymbolIndex.clear();
    projects.forEach((project) => {
      const id = project?.project_id || project?.id;
      if (!id) {
        return;
      }
      const slug = String(id).toLowerCase();
      tokenTerminalProjectIndex.set(slug, project);
      if (project.name) {
        tokenTerminalProjectNameIndex.set(
          String(project.name).toLowerCase(),
          slug
        );
      }
      if (project.symbol) {
        tokenTerminalProjectSymbolIndex.set(
          String(project.symbol).toLowerCase(),
          slug
        );
      }
    });
    renderTokenTerminalProjectList();
    updateTokenTerminalStatus(
      `Loaded ${tokenTerminalProjectIndex.size} coins.`,
      false
    );
  } catch (error) {
    updateTokenTerminalStatus(
      "Could not load coins. You can still type a project id.",
      true
    );
  }
}

async function loadTokenTerminalMetrics() {
  const baseUrl = resolveApiBaseUrl("tokenterminal");
  if (!baseUrl) {
    return;
  }
  try {
    const url = new URL("/api/tokenterminal", baseUrl);
    url.searchParams.set("path", "/metrics");
    const response = await fetch(url.toString());
    if (!response.ok) {
      return;
    }
    const payload = await response.json();
    const metrics = Array.isArray(payload?.data) ? payload.data : payload;
    if (!Array.isArray(metrics)) {
      return;
    }
    tokenTerminalMetricIndex.clear();
    metrics.forEach((metric) => {
      const id = metric?.metric_id || metric?.id;
      if (!id) {
        return;
      }
      tokenTerminalMetricIndex.set(String(id), metric);
    });
    const priceMetric = resolveTokenTerminalPriceMetric();
    loadTokenTerminalMetricProjects(priceMetric);
  } catch (error) {}
}

async function loadTokenTerminalMetricProjects(metricId) {
  const baseUrl = resolveApiBaseUrl("tokenterminal");
  if (!baseUrl || !metricId) {
    return;
  }
  try {
    const url = new URL("/api/tokenterminal", baseUrl);
    url.searchParams.set("path", `/metrics/${metricId}/projects`);
    const response = await fetch(url.toString());
    if (!response.ok) {
      return;
    }
    const payload = await response.json();
    const projects = Array.isArray(payload?.data) ? payload.data : payload;
    if (!Array.isArray(projects)) {
      return;
    }
    const available = new Set();
    projects.forEach((project) => {
      const id = project?.project_id || project?.id || project?.project;
      if (!id) {
        return;
      }
      available.add(String(id).toLowerCase());
    });
    if (available.size) {
      tokenTerminalAvailableProjects = available;
      renderTokenTerminalProjectList();
      updateTokenTerminalStatus(
        `Loaded ${available.size} coins with price data.`,
        false
      );
    } else {
      tokenTerminalAvailableProjects = new Set();
      renderTokenTerminalProjectList();
      updateTokenTerminalStatus(
        "Price project list unavailable; using full project list.",
        false
      );
    }
  } catch (error) {}
}

function parseTokenTerminalProjectIds(input) {
  const ids = [];
  const names = [];
  const unknown = [];
  String(input || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .forEach((value) => {
      const id = resolveTokenTerminalProjectId(value);
      if (!id) {
        return;
      }
      const lower = String(id).toLowerCase();
      if (ids.includes(lower)) {
        return;
      }
      const project = tokenTerminalProjectIndex.get(lower);
      if (!project) {
        unknown.push(id);
        return;
      }
      const projectId = project.project_id || project.id || id;
      ids.push(String(projectId));
      names.push(project.name || projectId);
    });
  return { ids, names, unknown };
}

function buildTokenTerminalPriceRequest() {
  const { ids, names, unknown } = getTokenTerminalSelections();
  if (unknown.length) {
    throw new Error(`Unknown project id(s): ${unknown.join(", ")}`);
  }
  if (!ids.length) {
    throw new Error("Select at least one coin.");
  }
  const metricId = resolveTokenTerminalPriceMetric();
  const params = new URLSearchParams();
  const cleanedIds = ids.filter(Boolean);
  const invalidIds = cleanedIds.filter((id) => !/^[a-z0-9-]+$/i.test(id));
  if (invalidIds.length) {
    throw new Error(
      `Unsupported project id(s): ${invalidIds.join(", ")}. Pick from the list.`
    );
  }
  params.set("project_ids", cleanedIds.join(","));
  if (elements.dateStart?.value) {
    params.set("start", elements.dateStart.value);
  }
  if (elements.dateEnd?.value) {
    params.set("end", elements.dateEnd.value);
  }
  const path = `/metrics/${metricId}?${params.toString()}`;
  const label = names.join(", ");
  return {
    path,
    jsonPath: "data",
    datasetName: `Token Terminal Price: ${label}`.trim(),
  };
}

function parseTokenTerminalMetricRequest(endpoint) {
  if (!endpoint) {
    return null;
  }
  try {
    const parsed = new URL(endpoint, "https://example.test");
    const match = parsed.pathname.match(/^\/metrics\/([^/]+)$/);
    if (!match) {
      return null;
    }
    const metricId = match[1];
    const projectParam = parsed.searchParams.get("project_ids");
    if (!projectParam) {
      return null;
    }
    const projectIds = projectParam
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => value.toLowerCase());
    if (!projectIds.length) {
      return null;
    }
    return {
      metricId,
      projectIds,
      start: parsed.searchParams.get("start") || "",
      end: parsed.searchParams.get("end") || "",
    };
  } catch (error) {
    return null;
  }
}

function isTokenTerminalProjectUnavailableError(message) {
  if (!message) {
    return false;
  }
  return (
    /projects?\s+are\s+not\s+available/i.test(message) ||
    /project\s+not\s+found/i.test(message) ||
    /available\s+projects/i.test(message)
  );
}

async function fetchTokenTerminalProjectMetrics(metricId, projectIds, range) {
  const baseUrl = resolveApiBaseUrl("tokenterminal");
  if (!baseUrl) {
    throw new Error("Set API host to enable Token Terminal.");
  }
  const rows = [];
  for (const projectId of projectIds) {
    const params = new URLSearchParams();
    params.set("metric_ids", metricId);
    if (range && range.start) {
      params.set("start", range.start);
    }
    if (range && range.end) {
      params.set("end", range.end);
    }
    const url = new URL("/api/tokenterminal", baseUrl);
    url.searchParams.set("path", `/projects/${projectId}/metrics?${params.toString()}`);
    const response = await fetch(url.toString());
    const bodyText = await response.text();
    if (!response.ok) {
      let message = bodyText || `Request failed (${response.status})`;
      if (bodyText.trim().startsWith("{")) {
        try {
          const parsed = JSON.parse(bodyText);
          if (parsed && parsed.error) {
            message = parsed.error;
          }
          if (parsed && parsed.message) {
            message = parsed.message;
          }
        } catch (error) {}
      }
      throw new Error(message);
    }
    let payload;
    try {
      payload = JSON.parse(bodyText);
    } catch (error) {
      continue;
    }
    const dataRows = Array.isArray(payload?.data) ? payload.data : [];
    const projectMeta = tokenTerminalProjectIndex.get(
      String(projectId).toLowerCase()
    );
    const projectName = projectMeta?.name || projectId;
    dataRows.forEach((row) => {
      if (!row) {
        return;
      }
      const rawTimestamp = row.timestamp || row.date || row.datetime;
      const timestamp = parseDateValue(rawTimestamp) ?? rawTimestamp;
      const value =
        row.value !== undefined
          ? row.value
          : row.metric_value !== undefined
          ? row.metric_value
          : row.price;
      if (!timestamp || value === undefined) {
        return;
      }
      rows.push({
        timestamp,
        project_id: projectId,
        project_name: projectName,
        value,
      });
    });
  }
  return rows;
}

function buildDefillamaRequest() {
  const metricKey = elements.defillamaMetric.value;
  const metric = DEFILLAMA_METRIC_CONFIGS[metricKey];
  if (!metric) {
    throw new Error("Select a metric.");
  }
  const slug = resolveDefillamaProtocolSlug(elements.defillamaProtocol.value);
  if (!slug) {
    throw new Error("Enter a protocol.");
  }
  const protocol = defillamaProtocolIndex.get(slug);
  const name = protocol && protocol.name ? protocol.name : slug;
  const chain = elements.defillamaChain ? elements.defillamaChain.value : "";
  if (metric.needsChain && !chain) {
    throw new Error("Select a chain.");
  }
  const path = metric.path(slug);
  const jsonPath =
    typeof metric.jsonPath === "function"
      ? metric.jsonPath(slug, chain)
      : metric.jsonPath;
  const suffix = metric.needsChain && chain ? `${chain} ${metric.label}` : metric.label;
  return {
    path,
    jsonPath,
    datasetName: `DefiLlama ${name} ${suffix}`.trim(),
  };
}

function updateProjectStatus(message, isError) {
  elements.projectStatus.textContent = message;
  elements.projectStatus.style.color = isError ? "#b3412f" : "#0f6b63";
}

function updateAdvancedStatus(message, isError) {
  elements.advancedStatus.textContent = message;
  elements.advancedStatus.style.color = isError ? "#b3412f" : "#0f6b63";
}

function updateSeriesCount(count) {
  elements.seriesCount.textContent = `${count} series`;
}

function isLikelyDate(value) {
  if (!value) {
    return false;
  }
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return true;
  }
  const stringValue = String(value).trim();
  if (!stringValue) {
    return false;
  }
  if (!/[\\-\\/T]/.test(stringValue)) {
    return false;
  }
  return !Number.isNaN(Date.parse(stringValue));
}

function inferColumnType(values) {
  let total = 0;
  let dateCount = 0;
  let numericCount = 0;

  values.forEach((value) => {
    if (value === null || value === undefined || value === "") {
      return;
    }
    total += 1;
    if (isLikelyDate(value)) {
      dateCount += 1;
      return;
    }
    if (parseNumber(value) !== null) {
      numericCount += 1;
    }
  });

  if (!total) {
    return "categorical";
  }
  if (dateCount / total >= 0.6) {
    return "time";
  }
  if (numericCount / total >= 0.6) {
    return "numeric";
  }
  return "categorical";
}

function autoSetAxisTypeFromX() {
  if (!elements.xAxisType || !currentRows.length) {
    return;
  }
  const xColumn = elements.xColumn.value || currentColumns[0];
  if (!xColumn) {
    return;
  }
  const sample = currentRows.slice(0, 20).map((row) => row[xColumn]);
  const inferred = inferColumnType(sample);
  if (inferred === "time" && elements.xAxisType.value !== "time") {
    elements.xAxisType.value = "time";
    return;
  }
  if (inferred === "numeric" && elements.xAxisType.value === "category") {
    elements.xAxisType.value = "value";
  }
}

function countNumericColumns(columns, rows) {
  if (!columns.length || !rows.length) {
    return 0;
  }
  const sample = rows.slice(0, 20);
  return columns.reduce((count, col) => {
    let numericHits = 0;
    let total = 0;
    sample.forEach((row) => {
      const value = row[col];
      if (value === null || value === undefined || value === "") {
        return;
      }
      total += 1;
      if (parseNumber(value) !== null) {
        numericHits += 1;
      }
    });
    if (total && numericHits / total >= 0.6) {
      return count + 1;
    }
    return count;
  }, 0);
}

function getRecommendedChartType() {
  if (!currentRows.length || !currentColumns.length) {
    return null;
  }
  const xColumn = elements.xColumn.value || currentColumns[0];
  const xValues = currentRows.slice(0, 20).map((row) => row[xColumn]);
  const xType = inferColumnType(xValues);
  const yColumns = getSelectedYColumns();
  const numericYCount = countNumericColumns(yColumns, currentRows);

  if (xType === "categorical") {
    return {
      value: "bar",
      label: "Bar",
      reason: "Categorical x-axis",
    };
  }
  if (xType === "numeric" && numericYCount <= 1) {
    return {
      value: "scatter",
      label: "Scatter",
      reason: "Numeric x-axis",
    };
  }
  if (xType === "time") {
    return {
      value: "line",
      label: "Line",
      reason: "Time series",
    };
  }
  return {
    value: "line",
    label: "Line",
    reason: "Continuous trend",
  };
}

function updateRecommendation() {
  if (!elements.chartRecommendation || !elements.recommendedType) {
    return;
  }
  const recommendation = getRecommendedChartType();
  if (!recommendation) {
    elements.chartRecommendation.classList.add("is-hidden");
    return;
  }

  elements.recommendedType.textContent = recommendation.label;
  if (elements.recommendationReason) {
    elements.recommendationReason.textContent = recommendation.reason;
  }
  elements.chartRecommendation.dataset.type = recommendation.value;
  if (elements.applyRecommendation) {
    const isCurrent = elements.chartType.value === recommendation.value;
    elements.applyRecommendation.disabled = isCurrent;
    elements.applyRecommendation.textContent = isCurrent ? "Applied" : "Apply";
  }
  elements.chartRecommendation.classList.remove("is-hidden");
}

const tabButtons = Array.from(
  document.querySelectorAll("[data-tab-button]")
);
const panelPages = Array.from(document.querySelectorAll("[data-panel]"));
const quickLabelText = {
  labelSize: document.querySelector('[data-quick-text="label-size"]'),
  labelFont: document.querySelector('[data-quick-text="label-font"]'),
  labelWeight: document.querySelector('[data-quick-text="label-weight"]'),
  nameSize: document.querySelector('[data-quick-text="name-size"]'),
  nameFont: document.querySelector('[data-quick-text="name-font"]'),
  nameWeight: document.querySelector('[data-quick-text="name-weight"]'),
};
const quickNameFields = Array.from(
  document.querySelectorAll("[data-quick-group='name']")
);

function setActiveTab(tabId, persist = true) {
  if (!tabButtons.length || !panelPages.length) {
    return;
  }
  const target = tabId || tabButtons[0].dataset.tabButton;
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tabButton === target;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  panelPages.forEach((page) => {
    page.classList.toggle("is-active", page.dataset.panel === target);
  });
  if (persist) {
    localStorage.setItem(TAB_KEY, target);
  }
}

function setViewMode(mode, persist = true) {
  if (!elements.controlPanel) {
    return;
  }
  const nextMode = mode === "stacked" ? "stacked" : "tabs";
  elements.controlPanel.dataset.view = nextMode;
  if (elements.toggleLayout) {
    elements.toggleLayout.textContent =
      nextMode === "tabs" ? "Show all" : "Tabbed view";
  }
  if (persist) {
    localStorage.setItem(VIEW_KEY, nextMode);
  }
}

function initControlLayout() {
  if (!elements.controlPanel) {
    return;
  }
  const storedMode = localStorage.getItem(VIEW_KEY) || "tabs";
  const storedTab =
    localStorage.getItem(TAB_KEY) ||
    (tabButtons[0] ? tabButtons[0].dataset.tabButton : "data");
  setViewMode(storedMode, false);
  setActiveTab(storedTab, false);
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.tabButton);
    });
  });
  if (elements.toggleLayout) {
    elements.toggleLayout.addEventListener("click", () => {
      const current = elements.controlPanel.dataset.view;
      setViewMode(current === "tabs" ? "stacked" : "tabs");
    });
  }
}

function isChartFullscreen() {
  return document.fullscreenElement === elements.chartCard;
}

function updateFullscreenButton() {
  if (!elements.toggleFullscreen) {
    return;
  }
  elements.toggleFullscreen.textContent = isChartFullscreen()
    ? "Exit fullscreen"
    : "Fullscreen";
}

let quickEditorOpen = false;

function getAxisTargetConfig(target) {
  return axisTargets[target] || axisTargets.x;
}

function syncQuickEditorFromControls() {
  if (!elements.quickTextEditor) {
    return;
  }
  setQuickEditorMode(quickAxisTarget);
  const target = getAxisTargetConfig(quickAxisTarget);
  elements.quickAxisLabelSize.value = target.labelSize.value;
  elements.quickAxisNameSize.value = target.nameSize.value;
  elements.quickAxisLabelFont.value = target.labelFont.value;
  elements.quickAxisLabelWeight.value = target.labelWeight.value;
  elements.quickAxisNameFont.value = target.nameFont.value;
  elements.quickAxisNameWeight.value = target.nameWeight.value;
}

function syncControlsFromQuickEditor() {
  const target = getAxisTargetConfig(quickAxisTarget);
  target.labelSize.value = elements.quickAxisLabelSize.value;
  target.nameSize.value = elements.quickAxisNameSize.value;
  target.labelFont.value = elements.quickAxisLabelFont.value;
  target.labelWeight.value = elements.quickAxisLabelWeight.value;
  target.nameFont.value = elements.quickAxisNameFont.value;
  target.nameWeight.value = elements.quickAxisNameWeight.value;
  scheduleUpdateChart();
}

function positionQuickEditor(event) {
  const editor = elements.quickTextEditor;
  const rect = elements.chartCard.getBoundingClientRect();
  const clientX = event?.event?.clientX ?? event?.clientX ?? rect.left + 24;
  const clientY = event?.event?.clientY ?? event?.clientY ?? rect.top + 24;
  editor.style.left = "auto";
  editor.style.right = "auto";
  editor.classList.remove("is-hidden");
  const editorRect = editor.getBoundingClientRect();
  const maxLeft = rect.width - editorRect.width - 16;
  const maxTop = rect.height - editorRect.height - 16;
  const nextLeft = Math.min(
    Math.max(clientX - rect.left + 12, 16),
    Math.max(16, maxLeft)
  );
  const nextTop = Math.min(
    Math.max(clientY - rect.top + 12, 16),
    Math.max(16, maxTop)
  );
  editor.style.left = `${nextLeft}px`;
  editor.style.top = `${nextTop}px`;
}

function setQuickEditorMode(targetKey) {
  if (!elements.quickTextEditor) {
    return;
  }
  const isLegend = targetKey === "legend";
  quickNameFields.forEach((field) => {
    field.classList.toggle("is-hidden", isLegend);
  });
  if (quickLabelText.labelSize) {
    quickLabelText.labelSize.textContent = isLegend
      ? "Legend size"
      : "Label size";
  }
  if (quickLabelText.labelFont) {
    quickLabelText.labelFont.textContent = isLegend
      ? "Legend font"
      : "Label font";
  }
  if (quickLabelText.labelWeight) {
    quickLabelText.labelWeight.textContent = isLegend
      ? "Legend weight"
      : "Label weight";
  }
  if (quickLabelText.nameSize) {
    quickLabelText.nameSize.textContent = "Name size";
  }
  if (quickLabelText.nameFont) {
    quickLabelText.nameFont.textContent = "Name font";
  }
  if (quickLabelText.nameWeight) {
    quickLabelText.nameWeight.textContent = "Name weight";
  }
}

function openQuickEditor(event, targetLabel, targetKey) {
  if (!elements.quickTextEditor) {
    return;
  }
  quickAxisTarget = targetKey || "x";
  setQuickEditorMode(quickAxisTarget);
  syncQuickEditorFromControls();
  elements.quickAxisTarget.textContent =
    targetLabel || "Click an axis label to edit.";
  positionQuickEditor(event || {});
  quickEditorOpen = true;
}

function closeQuickEditor() {
  if (!elements.quickTextEditor) {
    return;
  }
  elements.quickTextEditor.classList.add("is-hidden");
  quickEditorOpen = false;
}

function getChartDimensions() {
  const rect = elements.chartShell.getBoundingClientRect();
  const style = window.getComputedStyle(elements.chartShell);
  const left = parseFloat(style.left);
  const top = parseFloat(style.top);
  return {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    left: Number.isFinite(left) ? left : 0,
    top: Number.isFinite(top) ? top : 0,
  };
}

function setChartDimensions(width, height, left, top) {
  let resolvedWidth = width;
  let resolvedHeight = height;
  if (Number.isFinite(width)) {
    resolvedWidth = Math.max(width, MIN_CHART_WIDTH);
    elements.chartShell.style.width = `${resolvedWidth}px`;
  }
  if (Number.isFinite(height)) {
    resolvedHeight = Math.max(height, MIN_CHART_HEIGHT);
    elements.chartShell.style.height = `${resolvedHeight}px`;
  }
  if (Number.isFinite(left)) {
    elements.chartShell.style.left = `${left}px`;
  }
  if (Number.isFinite(top)) {
    elements.chartShell.style.top = `${top}px`;
  }
  return { width: resolvedWidth, height: resolvedHeight };
}

function clampChartSize() {
  const rect = elements.chartShell.getBoundingClientRect();
  if (rect.width < MIN_CHART_WIDTH) {
    elements.chartShell.style.width = `${MIN_CHART_WIDTH}px`;
  }
  if (rect.height < MIN_CHART_HEIGHT) {
    elements.chartShell.style.height = `${MIN_CHART_HEIGHT}px`;
  }
}

let resizeFrame = null;
let updateFrame = null;

function scheduleChartResize() {
  if (resizeFrame) return;
  resizeFrame = requestAnimationFrame(() => {
    resizeFrame = null;
    if (chart) {
      chart.resize();
    }
  });
}

function scheduleUpdateChart() {
  if (updateFrame) {
    return;
  }
  updateFrame = requestAnimationFrame(() => {
    updateFrame = null;
    updateChart();
  });
}

function extractZoomSnapshot(source) {
  if (!source) {
    return null;
  }
  const snapshot = {};
  ["start", "end", "startValue", "endValue"].forEach((key) => {
    if (source[key] !== undefined && source[key] !== null) {
      snapshot[key] = source[key];
    }
  });
  return Object.keys(snapshot).length ? snapshot : null;
}

function readZoomSnapshot() {
  if (!chart) {
    return null;
  }
  const option = chart.getOption();
  const dataZoom = option?.dataZoom;
  if (!Array.isArray(dataZoom) || !dataZoom.length) {
    return null;
  }
  const source = dataZoom.find((entry) => entry.type === "inside") || dataZoom[0];
  return extractZoomSnapshot(source);
}

function applyZoomSnapshot(option, snapshot) {
  if (!snapshot || !option || !Array.isArray(option.dataZoom)) {
    return;
  }
  option.dataZoom = option.dataZoom.map((entry) => ({
    ...entry,
    ...snapshot,
  }));
}

function syncBackgroundState() {
  elements.backgroundColor.disabled = elements.transparentBg.checked;
}

function formatOpacityValue(value) {
  const percent = Math.round(value * 100);
  return `${percent}%`;
}

function syncWatermarkState() {
  if (
    !elements.watermarkEnabled ||
    !elements.watermarkOpacity ||
    !elements.watermarkScale
  ) {
    return;
  }
  const enabled = elements.watermarkEnabled.checked;
  elements.watermarkOpacity.disabled = !enabled;
  elements.watermarkScale.disabled = !enabled;
  if (elements.watermarkOpacityValue) {
    const opacity = parseNumber(elements.watermarkOpacity.value);
    const safeOpacity = Number.isFinite(opacity) ? opacity : 0;
    elements.watermarkOpacityValue.textContent = formatOpacityValue(safeOpacity);
  }
  if (elements.watermarkScaleValue) {
    const scale = parseNumber(elements.watermarkScale.value);
    const safeScale = Number.isFinite(scale) ? scale : 1;
    elements.watermarkScaleValue.textContent = formatOpacityValue(safeScale);
  }
}

function syncDateFilterState() {
  if (!elements.dateStart || !elements.dateEnd) {
    return;
  }
  elements.dateStart.disabled = false;
  elements.dateEnd.disabled = false;
  if (elements.clearDateRange) {
    elements.clearDateRange.disabled = false;
  }
}

function formatDateInputValue(date) {
  if (!date) {
    return "";
  }
  return date.toISOString().slice(0, 10);
}

function applyDateRangePreset(preset) {
  if (!elements.dateStart || !elements.dateEnd) {
    return;
  }
  const now = new Date();
  let start = null;
  let end = null;

  switch (preset) {
    case "last7":
      end = now;
      start = new Date(now);
      start.setDate(start.getDate() - 7);
      break;
    case "last30":
      end = now;
      start = new Date(now);
      start.setDate(start.getDate() - 30);
      break;
    case "quarter":
      end = now;
      start = new Date(now);
      start.setMonth(start.getMonth() - 3);
      break;
    case "last6m":
      end = now;
      start = new Date(now);
      start.setMonth(start.getMonth() - 6);
      break;
    case "ytd":
      end = now;
      start = new Date(now.getFullYear(), 0, 1);
      break;
    case "lastYear":
      end = now;
      start = new Date(now);
      start.setFullYear(start.getFullYear() - 1);
      break;
    case "last3y":
      end = now;
      start = new Date(now);
      start.setFullYear(start.getFullYear() - 3);
      break;
    case "last5y":
      end = now;
      start = new Date(now);
      start.setFullYear(start.getFullYear() - 5);
      break;
    case "all":
      start = null;
      end = null;
      break;
    case "custom":
    default:
      return;
  }

  suppressDatePresetSync = true;
  elements.dateStart.value = start ? formatDateInputValue(start) : "";
  elements.dateEnd.value = end ? formatDateInputValue(end) : "";
  suppressDatePresetSync = false;
  if (elements.xAxisType && (start || end)) {
    elements.xAxisType.value = "time";
  }
  syncDateFilterState();
  zoomSnapshot = null;
  scheduleUpdateChart();
}

function syncChartModeUI() {
  const type = elements.chartType.value;
  elements.comboDefaults.classList.toggle("is-hidden", type !== "combo");
  elements.histogramOptions.classList.toggle("is-hidden", type !== "histogram");
  elements.waterfallOptions.classList.toggle("is-hidden", type !== "waterfall");
  elements.boxplotHint.classList.toggle("is-hidden", type !== "boxplot");
  elements.yColumnsField.classList.toggle(
    "is-hidden",
    type === "histogram" || type === "waterfall"
  );
}

async function toggleFullscreen() {
  if (!elements.chartCard || !elements.chartCard.requestFullscreen) {
    updateProjectStatus("Fullscreen not supported in this browser.", true);
    return;
  }
  if (isChartFullscreen()) {
    await document.exitFullscreen();
    return;
  }
  try {
    await elements.chartCard.requestFullscreen();
  } catch (error) {
    updateProjectStatus("Fullscreen request blocked.", true);
  }
}

let titlePickMode = false;

function setTitlePickMode(active) {
  titlePickMode = active;
  if (elements.pickTitlePosition) {
    elements.pickTitlePosition.textContent = active
      ? "Click chart..."
      : "Pick position";
  }
}

function handleTitlePick(event) {
  if (!titlePickMode) {
    return;
  }
  const pointer = event.event || event;
  const offsetX = Math.round(
    pointer.offsetX !== undefined ? pointer.offsetX : pointer.zrX
  );
  const offsetY = Math.round(
    pointer.offsetY !== undefined ? pointer.offsetY : pointer.zrY
  );
  if (!Number.isFinite(offsetX) || !Number.isFinite(offsetY)) {
    setTitlePickMode(false);
    return;
  }
  elements.titleLeft.value = offsetX;
  elements.titleTop.value = offsetY;
  setTitlePickMode(false);
  updateChart();
}

function handleChartClick(params) {
  if (!params || !params.componentType) {
    return;
  }
  if (titlePickMode) {
    return;
  }
  if (params.componentType === "xAxis") {
    openQuickEditor(params, "Editing X axis text", "x");
  }
  if (params.componentType === "yAxis") {
    const axisLabel =
      params.axisIndex === 1
        ? "Editing right Y axis text"
        : "Editing Y axis text";
    const axisKey = params.axisIndex === 1 ? "yRight" : "yLeft";
    openQuickEditor(params, axisLabel, axisKey);
  }
  if (params.componentType === "legend") {
    openQuickEditor(params, "Editing legend text", "legend");
  }
}

function attachChartEvents() {
  if (!chart) {
    return;
  }
  chart.off("click", handleChartClick);
  chart.on("click", handleChartClick);
  chart.off("legendselectchanged", handleLegendClick);
  chart.on("legendselectchanged", handleLegendClick);
  chart.off("datazoom", handleDataZoom);
  chart.on("datazoom", handleDataZoom);
  const zr = chart.getZr();
  zr.off("click", handleTitlePick);
  zr.on("click", handleTitlePick);
}

function handleLegendClick() {
  openQuickEditor(null, "Editing legend text", "legend");
}

function handleDataZoom(event) {
  const payload = event?.batch?.[0] || event;
  const snapshot = extractZoomSnapshot(payload);
  if (snapshot) {
    zoomSnapshot = snapshot;
  }
}

const defaultControlState = new Map();
let defaultChartSize = null;
const resetControls = [];

function captureDefaultControlState() {
  resetControls.length = 0;
  resetControls.push(
    elements.chartType,
    elements.comboDefaultType,
    elements.stacked,
    elements.stackedPercent,
    elements.smooth,
    elements.showSymbols,
    elements.showLabels,
    elements.sortByX,
    elements.lineWidth,
    elements.symbolSize,
    elements.areaOpacity,
    elements.barWidth,
    elements.barGap,
    elements.barCategoryGap,
    elements.xAxisType,
    elements.yScale,
    elements.yScaleRight,
    elements.xAxisLabel,
    elements.yAxisLabel,
    elements.yAxisRightLabel,
    elements.yAxisFormat,
    elements.yAxisSuffix,
    elements.yAxisRightFormat,
    elements.yAxisRightSuffix,
    elements.xAxisLabelSize,
    elements.xAxisNameSize,
    elements.xAxisLabelFont,
    elements.xAxisLabelWeight,
    elements.xAxisNameFont,
    elements.xAxisNameWeight,
    elements.yAxisLabelSize,
    elements.yAxisNameSize,
    elements.yAxisLabelFont,
    elements.yAxisLabelWeight,
    elements.yAxisNameFont,
    elements.yAxisNameWeight,
    elements.yAxisRightLabelSize,
    elements.yAxisRightNameSize,
    elements.yAxisRightLabelFont,
    elements.yAxisRightLabelWeight,
    elements.yAxisRightNameFont,
    elements.yAxisRightNameWeight,
    elements.yMin,
    elements.yMax,
    elements.xAxisRotate,
    elements.chartTitle,
    elements.chartSubtitle,
    elements.titleLeft,
    elements.titleTop,
    elements.titleAlign,
    elements.titleSize,
    elements.subtitleSize,
    elements.legendSize,
    elements.legendPosition,
    elements.legendFont,
    elements.legendWeight,
    elements.renderer,
    elements.palette,
    elements.customColors,
    elements.fontFamily,
    elements.textColor,
    elements.gridColor,
    elements.transparentBg,
    elements.backgroundColor,
    elements.watermarkEnabled,
    elements.watermarkOpacity,
    elements.watermarkScale,
    elements.histogramBins,
    elements.waterfallMode,
    elements.waterfallPositive,
    elements.waterfallNegative,
    elements.dateStart,
    elements.dateEnd,
    elements.exportName,
    elements.exportScale,
    elements.advancedJson
  );

  resetControls.forEach((control) => {
    const value =
      control.type === "checkbox" ? control.checked : control.value;
    defaultControlState.set(control, value);
  });

  defaultChartSize = getChartDimensions();
}

function resetChartSettings() {
  setTitlePickMode(false);
  const previousRenderer = elements.renderer.value;
  resetControls.forEach((control) => {
    if (control.type === "checkbox") {
      control.checked = Boolean(defaultControlState.get(control));
    } else {
      control.value = defaultControlState.get(control) ?? "";
    }
  });

  state.seriesOverrides = {};
  state.annotations = { events: [], bands: [], callouts: [] };
  elements.advancedJson.value = "";

  refreshColumnControls();
  syncBackgroundState();
  syncWatermarkState();
  syncChartModeUI();
  syncDateFilterState();
  renderSeriesOverrides();
  renderAnnotations();
  if (elements.renderer.value !== previousRenderer) {
    initChart();
  }
  updateChart();
  syncQuickEditorFromControls();

  if (defaultChartSize) {
    setChartDimensions(
      defaultChartSize.width,
      defaultChartSize.height,
      defaultChartSize.left,
      defaultChartSize.top
    );
    scheduleChartResize();
  }

  updateProjectStatus("Chart reset.", false);
}

function createDataset(name, rows, columns) {
  return {
    id: createId("dataset"),
    name: name || `Dataset ${state.datasets.length + 1}`,
    rows: rows || [],
    columns: columns || [],
    createdAt: Date.now(),
  };
}

function updateStatusForDataset(dataset) {
  if (!dataset || !dataset.rows.length || !dataset.columns.length) {
    updateStatus("No rows found", true);
    return;
  }
  updateStatus(`${dataset.rows.length} rows loaded • ${dataset.name}`, false);
}

function setActiveDataset(datasetId) {
  const dataset = state.datasets.find((entry) => entry.id === datasetId);
  if (!dataset) {
    state.activeDatasetId = null;
    currentRows = [];
    currentColumns = [];
    refreshColumnControls();
    renderPreview();
    updateStatus("No CSV loaded", false);
    renderDatasetList();
    updateChart();
    return;
  }
  state.activeDatasetId = dataset.id;
  currentRows = dataset.rows;
  currentColumns = dataset.columns;
  updateStatusForDataset(dataset);
  refreshColumnControls();
  autoSetAxisTypeFromX();
  renderPreview();
  renderDatasetList();
  updateChart();
}

function addDataset(name, rows, columns) {
  const dataset = createDataset(name, rows, columns);
  zoomSnapshot = null;
  state.datasets.unshift(dataset);
  setActiveDataset(dataset.id);
}

function removeDataset(datasetId) {
  const nextDatasets = state.datasets.filter((entry) => entry.id !== datasetId);
  state.datasets = nextDatasets;
  zoomSnapshot = null;
  if (state.activeDatasetId === datasetId) {
    const next = state.datasets[0];
    setActiveDataset(next ? next.id : null);
  } else {
    renderDatasetList();
  }
}

function clearAllDatasets() {
  state.datasets = [];
  state.activeDatasetId = null;
  currentRows = [];
  currentColumns = [];
  zoomSnapshot = null;
  refreshColumnControls();
  renderPreview();
  renderDatasetList();
  updateStatus("No CSV loaded", false);
  updateChart();
}

function renderDatasetList() {
  elements.datasetList.innerHTML = "";
  if (!state.datasets.length) {
    elements.datasetList.innerHTML =
      "<p class=\"hint\">No datasets loaded.</p>";
    return;
  }
  state.datasets.forEach((dataset) => {
    const pill = document.createElement("div");
    pill.className = `pill${
      dataset.id === state.activeDatasetId ? " pill-active" : ""
    }`;
    const text = document.createElement("span");
    text.textContent = `${dataset.name} (${dataset.rows.length})`;
    pill.appendChild(text);
    pill.addEventListener("click", () => {
      setActiveDataset(dataset.id);
    });
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "x";
    removeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      removeDataset(dataset.id);
    });
    pill.appendChild(removeButton);
    elements.datasetList.appendChild(pill);
  });
}

function parseCsvToData(text) {
  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  if (result.errors && result.errors.length) {
    updateStatus("CSV parse error", true);
  }

  return {
    rows: result.data || [],
    columns: result.meta && result.meta.fields ? result.meta.fields : [],
  };
}

function parseCsvText(text) {
  const data = parseCsvToData(text);
  addDataset(`Pasted CSV ${state.datasets.length + 1}`, data.rows, data.columns);
}

function createApiDatasetName(provider, endpoint) {
  const label = getApiProviderLabel(provider);
  const trimmed = String(endpoint || "")
    .split("?")[0]
    .split("/")
    .filter(Boolean)
    .slice(-2)
    .join(" ");
  return trimmed ? `${label} ${trimmed}` : `${label} dataset`;
}

function resolveJsonPath(source, path) {
  if (!path) {
    return source;
  }
  const normalized = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = normalized.split(".").filter(Boolean);
  let current = source;
  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined;
    }
    const index = Number(part);
    if (Array.isArray(current) && Number.isInteger(index)) {
      current = current[index];
    } else {
      current = current[part];
    }
  }
  return current;
}

function findFirstArray(source) {
  if (Array.isArray(source)) {
    return source;
  }
  if (!source || typeof source !== "object") {
    return null;
  }
  const queue = [source];
  while (queue.length) {
    const current = queue.shift();
    if (!current || typeof current !== "object") {
      continue;
    }
    for (const key of Object.keys(current)) {
      const next = current[key];
      if (Array.isArray(next)) {
        return next;
      }
      if (next && typeof next === "object") {
        queue.push(next);
      }
    }
  }
  return null;
}

function flattenObject(source, prefix = "", depth = 0, maxDepth = 3, result = {}) {
  if (depth > maxDepth) {
    if (prefix) {
      result[prefix] = source;
    }
    return result;
  }
  if (source === null || source === undefined) {
    if (prefix) {
      result[prefix] = source;
    }
    return result;
  }
  if (Array.isArray(source)) {
    if (prefix) {
      result[prefix] = JSON.stringify(source);
    }
    return result;
  }
  if (typeof source !== "object") {
    if (prefix) {
      result[prefix] = source;
    }
    return result;
  }
  const entries = Object.entries(source);
  if (!entries.length && prefix) {
    result[prefix] = "";
    return result;
  }
  entries.forEach(([key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value, nextKey, depth + 1, maxDepth, result);
      return;
    }
    if (Array.isArray(value)) {
      result[nextKey] = value.length ? JSON.stringify(value) : "";
      return;
    }
    result[nextKey] = value;
  });
  return result;
}

function normalizeRowsToTable(rows) {
  const columns = new Set();
  const normalized = rows.map((row) => {
    if (row && typeof row === "object" && !Array.isArray(row)) {
      const flat = flattenObject(row);
      Object.keys(flat).forEach((key) => columns.add(key));
      return flat;
    }
    if (Array.isArray(row)) {
      const obj = {};
      row.forEach((value, index) => {
        const key = `col${index + 1}`;
        obj[key] = value;
        columns.add(key);
      });
      return obj;
    }
    columns.add("value");
    return { value: row };
  });
  return { rows: normalized, columns: Array.from(columns) };
}

function extractRowsFromApiResponse(payload, path, strictPath = false) {
  let target;
  if (path) {
    target = resolveJsonPath(payload, path);
  }
  if (path && strictPath && target === undefined) {
    return null;
  }
  if (target === undefined) {
    target = findFirstArray(payload) || payload;
  }
  if (target && typeof target === "object" && !Array.isArray(target)) {
    if (Array.isArray(target.data)) {
      target = target.data;
    }
  }
  const rows = Array.isArray(target) ? target : target ? [target] : [];
  if (!rows.length) {
    return { rows: [], columns: [] };
  }
  return normalizeRowsToTable(rows);
}

function pivotTokenTerminalMetrics(rows) {
  if (!Array.isArray(rows) || !rows.length) {
    return null;
  }
  const columns = new Set(["timestamp"]);
  const byTimestamp = new Map();
  let hasProject = false;
  let hasValue = false;
  rows.forEach((row) => {
    if (!row) {
      return;
    }
    const timestamp = row.timestamp || row.date || row.datetime;
    if (!timestamp) {
      return;
    }
    const projectName = row.project_name || row.name || "";
    const projectId = row.project_id || row.project || "";
    const symbol = row.symbol || "";
    let key = projectName || projectId || symbol || "";
    if (projectName && projectId) {
      if (projectName.toLowerCase() !== String(projectId).toLowerCase()) {
        key = `${projectName} (${projectId})`;
      }
    } else if (!key && symbol) {
      key = symbol;
    }
    const value =
      row.value !== undefined
        ? row.value
        : row.metric_value !== undefined
        ? row.metric_value
        : row.price;
    if (!key || value === undefined) {
      return;
    }
    hasProject = true;
    hasValue = true;
    columns.add(key);
    const entry = byTimestamp.get(timestamp) || { timestamp };
    entry[key] = value;
    byTimestamp.set(timestamp, entry);
  });
  if (!hasProject || !hasValue) {
    return null;
  }
  const rowsOut = Array.from(byTimestamp.values()).sort((a, b) => {
    const aTime = parseDateValue(a.timestamp) || 0;
    const bTime = parseDateValue(b.timestamp) || 0;
    return aTime - bTime;
  });
  return { rows: rowsOut, columns: Array.from(columns) };
}

async function fetchApiDataset() {
  if (!apiEnabled) {
    updateApiStatus("API connectors are disabled on public hosts.", true);
    return;
  }
  if (apiFetchInFlight) {
    return;
  }
  if (!elements.apiEndpoint || !elements.apiProvider) {
    updateApiStatus("API connector UI missing.", true);
    return;
  }
  const endpoint = elements.apiEndpoint.value.trim();
  if (!endpoint) {
    updateApiStatus(
      elements.apiProvider.value === DEFILLAMA_SDK_PROVIDER
        ? "Enter an SDK method."
        : "Enter an endpoint path or URL.",
      true
    );
    return;
  }
  const provider = elements.apiProvider.value;
  const baseUrl = resolveApiBaseUrl(provider);
  if (!baseUrl) {
    updateApiStatus("Set an API host to enable connectors.", true);
    return;
  }
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  const datasetName =
    elements.apiDatasetName && elements.apiDatasetName.value.trim()
      ? elements.apiDatasetName.value.trim()
      : createApiDatasetName(provider, endpoint);
  const jsonPath = elements.apiJsonPath
    ? elements.apiJsonPath.value.trim()
    : "";
  const sdkArgs = elements.apiSdkArgs ? elements.apiSdkArgs.value.trim() : "";
  const tokenTerminalRequest =
    provider === "tokenterminal"
      ? parseTokenTerminalMetricRequest(normalizedEndpoint)
      : null;
  if (provider === "tokenterminal" && tokenTerminalRequest) {
    try {
      updateTokenTerminalStatus("Loading Token Terminal price data...", false);
      const range = {
        start:
          tokenTerminalRequest.start ||
          (elements.dateStart ? elements.dateStart.value : ""),
        end:
          tokenTerminalRequest.end ||
          (elements.dateEnd ? elements.dateEnd.value : ""),
      };
      const mappedIds = tokenTerminalRequest.projectIds.map((id) => {
        const project = tokenTerminalProjectIndex.get(String(id).toLowerCase());
        return project?.project_id || project?.id || id;
      });
      const rows = await fetchTokenTerminalProjectMetrics(
        tokenTerminalRequest.metricId,
        mappedIds,
        range
      );
      const pivoted = pivotTokenTerminalMetrics(rows);
      if (pivoted && pivoted.rows.length) {
        if (
          tokenTerminalRequest.projectIds.length > 1 &&
          elements.compareMode &&
          elements.compareMode.value === "none"
        ) {
          elements.compareMode.value = "percent";
        }
        if (elements.xAxisType && elements.xAxisType.value !== "time") {
          elements.xAxisType.value = "time";
        }
        addDataset(datasetName, pivoted.rows, pivoted.columns);
        updateApiStatus(`Loaded ${pivoted.rows.length} rows`, false);
        updateTokenTerminalStatus("", false);
        return;
      }
      updateTokenTerminalStatus("No rows returned for selected coins.", true);
      updateApiStatus("No rows returned for selected coins.", true);
      return;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Token Terminal fetch failed.";
      updateTokenTerminalStatus(message, true);
      updateApiStatus(message, true);
      return;
    }
  }
  const usePublicDefiLlama =
    provider === "defillama" &&
    (normalizedEndpoint.startsWith("/protocol/") ||
      normalizedEndpoint.startsWith("/summary/"));

  apiFetchInFlight = true;
  syncApiControls();
  updateApiStatus("Fetching dataset...", false);

  try {
    let url;
    if (usePublicDefiLlama) {
      url = new URL(
        /^https?:\/\//i.test(endpoint)
          ? endpoint
          : `${DEFILLAMA_PUBLIC_BASE_URL}${normalizedEndpoint}`
      );
    } else if (provider === "defillama" && baseUrl === DEFILLAMA_PUBLIC_BASE_URL) {
      const trimmed = endpoint.replace(/^\//, "");
      url = new URL(
        /^https?:\/\//i.test(endpoint) ? endpoint : `${baseUrl}/${trimmed}`
      );
    } else {
      url = new URL(`/api/${provider}`, baseUrl);
      if (provider === DEFILLAMA_SDK_PROVIDER) {
        url.searchParams.set("method", endpoint);
        if (sdkArgs) {
          url.searchParams.set("args", sdkArgs);
        }
      } else {
        url.searchParams.set("path", endpoint);
      }
    }
    const response = await fetch(url.toString());
    const contentType = response.headers.get("content-type") || "";
    const bodyText = await response.text();
    if (!response.ok) {
      let message = bodyText || `Request failed (${response.status})`;
      if (bodyText.trim().startsWith("{")) {
        try {
          const parsed = JSON.parse(bodyText);
          if (parsed && parsed.error) {
            message = parsed.error;
          }
        } catch (error) {}
      }
      throw new Error(message);
    }
    if (contentType.includes("text/csv")) {
      const data = parseCsvToData(bodyText);
      addDataset(datasetName, data.rows, data.columns);
      updateApiStatus(`Loaded ${data.rows.length} rows`, false);
      return;
    }
    let payload;
    try {
      payload = JSON.parse(bodyText);
    } catch (error) {
      throw new Error("Response was not valid JSON.");
    }
    if (provider === "tokenterminal") {
      const rawRows = Array.isArray(payload?.data) ? payload.data : null;
      const pivoted = pivotTokenTerminalMetrics(rawRows);
      if (pivoted && pivoted.rows.length) {
        if (elements.xAxisType && elements.xAxisType.value !== "time") {
          elements.xAxisType.value = "time";
        }
        addDataset(datasetName, pivoted.rows, pivoted.columns);
        updateApiStatus(`Loaded ${pivoted.rows.length} rows`, false);
        return;
      }
    }
    const data = extractRowsFromApiResponse(payload, jsonPath, true);
    if (!data) {
      throw new Error("JSON path not found in response.");
    }
    if (!data.rows.length) {
      updateApiStatus("No rows found in response.", true);
      return;
    }
    addDataset(datasetName, data.rows, data.columns);
    updateApiStatus(`Loaded ${data.rows.length} rows`, false);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "API fetch failed.";
    if (provider === "tokenterminal") {
      if (isTokenTerminalProjectUnavailableError(message)) {
        const parsedRequest = parseTokenTerminalMetricRequest(endpoint);
        if (parsedRequest) {
          try {
            updateTokenTerminalStatus(
              "Retrying Token Terminal price via per-project endpoint...",
              false
            );
            const range = {
              start:
                parsedRequest.start ||
                (elements.dateStart ? elements.dateStart.value : ""),
              end:
                parsedRequest.end ||
                (elements.dateEnd ? elements.dateEnd.value : ""),
            };
            const rows = await fetchTokenTerminalProjectMetrics(
              parsedRequest.metricId,
              parsedRequest.projectIds,
              range
            );
            const pivoted = pivotTokenTerminalMetrics(rows);
            if (pivoted && pivoted.rows.length) {
              if (
                parsedRequest.projectIds.length > 1 &&
                elements.compareMode &&
                elements.compareMode.value === "none"
              ) {
                elements.compareMode.value = "percent";
              }
              if (elements.xAxisType && elements.xAxisType.value !== "time") {
                elements.xAxisType.value = "time";
              }
              addDataset(datasetName, pivoted.rows, pivoted.columns);
              updateApiStatus(`Loaded ${pivoted.rows.length} rows`, false);
              updateTokenTerminalStatus("", false);
              return;
            }
          } catch (fallbackError) {
            const fallbackMessage =
              fallbackError instanceof Error
                ? fallbackError.message
                : "Token Terminal fallback failed.";
            updateTokenTerminalStatus(fallbackMessage, true);
            updateApiStatus(fallbackMessage, true);
            return;
          }
        }
      }
      updateTokenTerminalStatus(message, true);
    }
    updateApiStatus(message, true);
  } finally {
    apiFetchInFlight = false;
    syncApiControls();
  }
}

function clearApiForm() {
  if (elements.apiEndpoint) {
    elements.apiEndpoint.value = "";
  }
  if (elements.apiDatasetName) {
    elements.apiDatasetName.value = "";
  }
  if (elements.apiJsonPath) {
    elements.apiJsonPath.value = "";
  }
  if (elements.apiSdkArgs) {
    elements.apiSdkArgs.value = "";
  }
  updateApiStatus("", false);
}

function populateSelect(select, values, placeholder) {
  select.innerHTML = "";
  if (placeholder) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = placeholder;
    select.appendChild(option);
  }
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function refreshColumnControls() {
  populateSelect(elements.xColumn, currentColumns);
  populateSelect(elements.histogramColumn, currentColumns);
  populateSelect(elements.waterfallColumn, currentColumns);

  elements.yColumns.innerHTML = "";
  currentColumns.forEach((col, index) => {
    const label = document.createElement("label");
    label.className = "checkbox";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = col;
    if (index > 0) {
      input.checked = true;
    }
    input.addEventListener("change", () => {
      renderSeriesOverrides();
      scheduleUpdateChart();
    });
    label.appendChild(input);
    label.appendChild(document.createTextNode(col));
    elements.yColumns.appendChild(label);
  });

  elements.xColumn.value = currentColumns[0] || "";
  elements.histogramColumn.value = currentColumns[1] || currentColumns[0] || "";
  elements.waterfallColumn.value = currentColumns[1] || currentColumns[0] || "";

  updateSeriesCount(0);
  renderSeriesOverrides();
  syncChartModeUI();
}

function setSelectedYColumns(columns) {
  if (!columns || !columns.length) {
    return;
  }
  const selected = new Set(columns);
  elements.yColumns
    .querySelectorAll("input[type=checkbox]")
    .forEach((input) => {
      input.checked = selected.has(input.value);
    });
}

function renderPreview() {
  if (!currentRows.length) {
    elements.dataPreview.innerHTML = "<p class=\"hint\">No data loaded.</p>";
    return;
  }

  const previewRows = currentRows.slice(0, 8);
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  currentColumns.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  previewRows.forEach((row) => {
    const tr = document.createElement("tr");
    currentColumns.forEach((col) => {
      const td = document.createElement("td");
      td.textContent = row[col];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  elements.dataPreview.innerHTML = "";
  elements.dataPreview.appendChild(table);
}

function getSelectedYColumns() {
  return Array.from(
    elements.yColumns.querySelectorAll("input[type=checkbox]:checked")
  ).map((input) => input.value);
}

function parseNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const normalized = String(value)
    .trim()
    .replace(/[$,%]/g, "")
    .replace(/,/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value, format, options = {}) {
  if (value === null || value === undefined || value === "") {
    return "";
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return value;
  }
  const style = format || "auto";
  if (style === "percent" || (style === "auto" && options.stackedPercent)) {
    return `${percentFormatter.format(parsed)}%`;
  }
  const { scaledValue, suffixText } = applySuffix(parsed, options.suffix);
  const formatted =
    style === "currency"
      ? currencyFormatter.format(scaledValue)
      : numberFormatter.format(scaledValue);
  return `${formatted}${suffixText}`;
}

function applySuffix(value, suffix) {
  const safeSuffix = suffix || "none";
  if (safeSuffix === "none") {
    return { scaledValue: value, suffixText: "" };
  }
  const absValue = Math.abs(value);
  if (safeSuffix === "auto") {
    if (absValue >= 1e9) {
      return { scaledValue: value / 1e9, suffixText: "B" };
    }
    if (absValue >= 1e6) {
      return { scaledValue: value / 1e6, suffixText: "M" };
    }
    if (absValue >= 1e3) {
      return { scaledValue: value / 1e3, suffixText: "k" };
    }
    return { scaledValue: value, suffixText: "" };
  }
  if (safeSuffix === "k") {
    return { scaledValue: value / 1e3, suffixText: "k" };
  }
  if (safeSuffix === "M") {
    return { scaledValue: value / 1e6, suffixText: "M" };
  }
  if (safeSuffix === "B") {
    return { scaledValue: value / 1e9, suffixText: "B" };
  }
  return { scaledValue: value, suffixText: "" };
}

function resolveAxisFont(value) {
  if (!value || value === "inherit") {
    return undefined;
  }
  return value;
}

function resolveAxisWeight(value) {
  if (!value || value === "inherit") {
    return undefined;
  }
  return value;
}

function computeAxisSpacing(labelSize, nameSize, isYAxis) {
  const margin = Math.max(12, Math.round(labelSize * 0.95));
  if (isYAxis) {
    return {
      margin,
      nameGap: Math.max(
        120,
        Math.round(labelSize * 3.2 + nameSize * 1.6 + 48)
      ),
    };
  }
  return {
    margin,
    nameGap: Math.max(44, Math.round(labelSize * 2 + nameSize + 22)),
  };
}

function computeAxisInsets(leftSpacing, rightSpacing, showRightAxis) {
  const left = Math.max(
    96,
    Math.round(leftSpacing.nameGap + leftSpacing.margin + 32)
  );
  const right = showRightAxis
    ? Math.max(
        96,
        Math.round(rightSpacing.nameGap + rightSpacing.margin + 32)
      )
    : 40;
  return { left, right };
}

function buildAxisTextStyles(targetKey, textColor) {
  const target = getAxisTargetConfig(targetKey);
  if (
    !target ||
    !target.labelSize ||
    !target.nameSize ||
    !target.labelFont ||
    !target.labelWeight ||
    !target.nameFont ||
    !target.nameWeight
  ) {
    return {
      labelTextStyle: { color: textColor, fontSize: 12 },
      nameTextStyle: { color: textColor, fontSize: 12 },
      labelSize: 12,
      nameSize: 12,
    };
  }
  const labelSize = parseNumber(target.labelSize.value) || 12;
  const nameSize = parseNumber(target.nameSize.value) || 12;
  const labelFont = resolveAxisFont(target.labelFont.value);
  const labelWeight = resolveAxisWeight(target.labelWeight.value);
  const nameFont = resolveAxisFont(target.nameFont.value);
  const nameWeight = resolveAxisWeight(target.nameWeight.value);
  const labelTextStyle = {
    color: textColor,
    fontSize: labelSize,
    ...(labelFont ? { fontFamily: labelFont } : {}),
    ...(labelWeight ? { fontWeight: labelWeight } : {}),
  };
  const nameTextStyle = {
    color: textColor,
    fontSize: nameSize,
    ...(nameFont ? { fontFamily: nameFont } : {}),
    ...(nameWeight ? { fontWeight: nameWeight } : {}),
  };
  return { labelTextStyle, nameTextStyle, labelSize, nameSize };
}

function extractSeriesValue(item) {
  if (!item) {
    return null;
  }
  if (Array.isArray(item.data)) {
    return item.data[item.data.length - 1];
  }
  if (Array.isArray(item.value)) {
    return item.value[item.value.length - 1];
  }
  return item.value;
}

function resolveTooltipHeader(item) {
  if (!item) {
    return "";
  }
  if (item.axisValueLabel !== undefined) {
    return item.axisValueLabel;
  }
  if (item.name !== undefined) {
    return item.name;
  }
  if (Array.isArray(item.data)) {
    return item.data[0];
  }
  if (Array.isArray(item.value)) {
    return item.value[0];
  }
  return "";
}

function parseXValue(value, axisType) {
  if (axisType === "time") {
    const parsed = parseDateValue(value);
    return parsed === null ? value : parsed;
  }
  if (axisType === "value") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : value;
  }
  return value;
}

function parseAnnotationX(value, axisType) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  if (axisType === "value") {
    return parseNumber(value);
  }
  if (axisType === "time") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? value : parsed;
  }
  return value;
}

function isPlausibleDateMs(value) {
  if (!Number.isFinite(value)) {
    return false;
  }
  const min = Date.UTC(1970, 0, 1);
  const max = Date.UTC(2100, 0, 1);
  return value >= min && value <= max;
}

function parseDateValue(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    if (isPlausibleDateMs(value)) {
      return value;
    }
    const asSeconds = value * 1000;
    if (isPlausibleDateMs(asSeconds)) {
      return asSeconds;
    }
    return value;
  }
  const text = String(value).trim();
  if (!text) {
    return null;
  }
  if (/^\d{10}$/.test(text)) {
    return Number(text) * 1000;
  }
  if (/^\d{13}$/.test(text)) {
    return Number(text);
  }
  const parsed = Date.parse(text);
  return Number.isNaN(parsed) ? null : parsed;
}

function parseDateInputValue(value) {
  if (!value) {
    return null;
  }
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function getFilteredRows() {
  const xColumn = elements.xColumn.value || currentColumns[0];
  const axisType = elements.xAxisType.value;
  if (!xColumn || axisType !== "time") {
    return currentRows;
  }
  const startRaw = elements.dateStart ? elements.dateStart.value : "";
  const endRaw = elements.dateEnd ? elements.dateEnd.value : "";
  let start = parseDateInputValue(startRaw);
  let end = parseDateInputValue(endRaw);
  if (start === null && end === null) {
    return currentRows;
  }
  const dayMs = 24 * 60 * 60 * 1000;
  if (end !== null) {
    end = end + dayMs - 1;
  }
  if (start !== null && end !== null && end < start) {
    [start, end] = [end, start];
  }
  return currentRows.filter((row) => {
    const raw = row[xColumn];
    const parsed = parseDateValue(raw);
    if (parsed === null) {
      return false;
    }
    if (start !== null && parsed < start) {
      return false;
    }
    if (end !== null && parsed > end) {
      return false;
    }
    return true;
  });
}

function buildRowData(xColumn, yColumns, axisType, sortByX) {
  const rows = [];
  const sourceRows = getFilteredRows();
  sourceRows.forEach((row) => {
    const xValue = parseXValue(row[xColumn], axisType);
    if (xValue === null || xValue === undefined || xValue === "") {
      return;
    }
    const values = {};
    let hasValue = false;
    yColumns.forEach((col) => {
      const yValue = parseNumber(row[col]);
      if (yValue !== null) {
        values[col] = yValue;
        hasValue = true;
      }
    });
    if (hasValue) {
      rows.push({ x: xValue, values });
    }
  });

  if (sortByX) {
    rows.sort((a, b) => {
      if (a.x === b.x) return 0;
      return a.x > b.x ? 1 : -1;
    });
  }

  return rows;
}

function buildDataZoom(axisType) {
  if (axisType !== "time" && axisType !== "category") {
    return [];
  }
  return [
    {
      type: "inside",
      xAxisIndex: 0,
      filterMode: "filter",
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
      moveOnMouseWheel: false,
    },
    {
      type: "slider",
      xAxisIndex: 0,
      height: 24,
      bottom: 8,
      borderColor: "transparent",
      backgroundColor: "rgba(20, 24, 28, 0.08)",
      fillerColor: "rgba(28, 79, 90, 0.22)",
      handleStyle: {
        color: "#1c4f5a",
        borderColor: "#1c4f5a",
      },
      textStyle: { color: elements.textColor.value },
    },
  ];
}

function resolveBarSizing() {
  const width = parseNumber(elements.barWidth.value);
  const gap = parseNumber(elements.barGap.value);
  const categoryGap = parseNumber(elements.barCategoryGap.value);
  return {
    barMaxWidth: Number.isFinite(width) ? width : undefined,
    barGap: Number.isFinite(gap) ? `${gap}%` : undefined,
    barCategoryGap: Number.isFinite(categoryGap) ? `${categoryGap}%` : undefined,
  };
}

function normalizeRowsToPercent(rows, yColumns) {
  return rows.map((row) => {
    const total = yColumns.reduce((sum, col) => {
      return sum + (row.values[col] || 0);
    }, 0);
    const values = {};
    yColumns.forEach((col) => {
      const value = row.values[col] || 0;
      values[col] = total === 0 ? 0 : (value / total) * 100;
    });
    return { x: row.x, values };
  });
}

function normalizeRowsToPerformance(rows, yColumns, mode) {
  if (mode !== "percent" && mode !== "index") {
    return rows;
  }
  const sorted = rows.slice().sort((a, b) => {
    if (a.x === b.x) return 0;
    return a.x > b.x ? 1 : -1;
  });
  const baselines = {};
  yColumns.forEach((col) => {
    baselines[col] = null;
  });
  sorted.forEach((row) => {
    yColumns.forEach((col) => {
      if (baselines[col] !== null) {
        return;
      }
      const value = row.values[col];
      if (value !== null && value !== undefined && Number.isFinite(value)) {
        baselines[col] = value;
      }
    });
  });
  return rows.map((row) => {
    const values = {};
    yColumns.forEach((col) => {
      const base = baselines[col];
      const value = row.values[col];
      if (
        base === null ||
        base === 0 ||
        value === null ||
        value === undefined ||
        !Number.isFinite(value)
      ) {
        values[col] = null;
        return;
      }
      if (mode === "percent") {
        values[col] = ((value / base) - 1) * 100;
        return;
      }
      values[col] = (value / base) * 100;
    });
    return { x: row.x, values };
  });
}

function resolveAxisFormatting(yColumns, axisSide) {
  const axisFormat =
    axisSide === "right" ? elements.yAxisRightFormat : elements.yAxisFormat;
  const axisSuffix =
    axisSide === "right" ? elements.yAxisRightSuffix : elements.yAxisSuffix;
  const formatOverride = axisFormat ? axisFormat.value : "auto";
  const suffixOverride = axisSuffix ? axisSuffix.value : "none";
  if (formatOverride !== "auto" || suffixOverride !== "none") {
    return {
      format: formatOverride !== "auto" ? formatOverride : "auto",
      suffix: suffixOverride !== "none" ? suffixOverride : "none",
    };
  }
  const formats = new Set();
  const suffixes = new Set();
  yColumns.forEach((col) => {
    const override = state.seriesOverrides[col] || {};
    const usesRight = override.axis === "right";
    if ((axisSide === "right" && usesRight) || (axisSide === "left" && !usesRight)) {
      formats.add(override.valueFormat || "auto");
      suffixes.add(override.valueSuffix || "none");
    }
  });
  return {
    format: formats.size === 1 ? Array.from(formats)[0] : "auto",
    suffix: suffixes.size === 1 ? Array.from(suffixes)[0] : "none",
  };
}

function resolvePalette() {
  if (elements.palette.value === "custom") {
    const colors = elements.customColors.value
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    return colors.length ? colors : palettes.ocean;
  }
  return palettes[elements.palette.value] || palettes.ocean;
}

function legendConfig(position, seriesNames) {
  if (position === "none") {
    return { show: false };
  }
  const legendSize = parseNumber(elements.legendSize.value) || 12;
  const legendItem = Math.max(10, Math.round(legendSize * 0.9));
  const legendGap = Math.max(6, Math.round(legendSize * 0.4));
  const legendFont = resolveAxisFont(elements.legendFont.value);
  const legendWeight = resolveAxisWeight(elements.legendWeight.value);
  const base = {
    show: true,
    itemWidth: legendItem,
    itemHeight: legendItem,
    itemGap: legendGap,
    textStyle: {
      color: elements.textColor.value,
      fontSize: legendSize,
      lineHeight: legendSize + 4,
      ...(legendFont ? { fontFamily: legendFont } : {}),
      ...(legendWeight ? { fontWeight: legendWeight } : {}),
    },
  };
  if (seriesNames) {
    base.data = seriesNames;
  }

  if (position === "left" || position === "right") {
    return {
      ...base,
      orient: "vertical",
      top: "middle",
      [position]: 8,
    };
  }

  const topOffset = position === "top" ? 46 : 8;
  return {
    ...base,
    orient: "horizontal",
    [position]: topOffset,
    left: "center",
  };
}

function gridConfig(position, axisInsets = {}) {
  const legendSize = parseNumber(elements.legendSize.value) || 12;
  const legendBlock = Math.max(70, Math.round(legendSize * 3.2));
  const grid = {
    left: 60,
    right: 40,
    top: 80,
    bottom: 60,
    containLabel: true,
  };

  if (Number.isFinite(axisInsets.left)) {
    grid.left = Math.max(grid.left, axisInsets.left);
  }
  if (Number.isFinite(axisInsets.right)) {
    grid.right = Math.max(grid.right, axisInsets.right);
  }

  if (position === "left") {
    grid.left = Math.max(grid.left, 120);
  }
  if (position === "right") {
    grid.right = Math.max(grid.right, 120);
  }
  if (position === "top") {
    grid.top = Math.max(grid.top, legendBlock);
  }
  if (position === "bottom") {
    grid.bottom = Math.max(grid.bottom, legendBlock - 20);
  }

  return grid;
}

function buildWatermarkGraphic() {
  if (!elements.watermarkEnabled || !elements.watermarkEnabled.checked) {
    return null;
  }
  const opacity =
    Math.min(1, Math.max(0, parseNumber(elements.watermarkOpacity.value) || 0));
  const scaleRaw = parseNumber(elements.watermarkScale?.value);
  const scale = Math.min(1.6, Math.max(0.3, Number.isFinite(scaleRaw) ? scaleRaw : 1));
  const chartWidth = chart ? chart.getWidth() : 800;
  const chartHeight = chart ? chart.getHeight() : 500;
  const baseWidth = Math.min(360, Math.round(chartWidth * 0.5));
  const maxWidthByWidth = Math.round(chartWidth * 0.8);
  const maxWidthByHeight = Math.round(chartHeight * 0.6 * WATERMARK_ASPECT_RATIO);
  const maxWidth = Math.max(140, Math.min(maxWidthByWidth, maxWidthByHeight));
  const width = Math.min(Math.max(140, Math.round(baseWidth * scale)), maxWidth);
  const height = Math.round(width / WATERMARK_ASPECT_RATIO);
  return [
    {
      id: "center-watermark",
      type: "image",
      silent: true,
      left: "center",
      top: "middle",
      z: 0,
      style: {
        image: WATERMARK_IMAGE_SRC,
        width,
        height,
        opacity,
      },
    },
  ];
}

function buildBaseOption() {
  const textColor = elements.textColor.value;
  const backgroundColor = elements.transparentBg.checked
    ? "transparent"
    : elements.backgroundColor.value;
  const titleSize = parseNumber(elements.titleSize.value) || 28;
  const subtitleSize = parseNumber(elements.subtitleSize.value) || 14;
  const titleLeft = parseNumber(elements.titleLeft.value);
  const titleTop = parseNumber(elements.titleTop.value);
  const resolvedLeft = Number.isFinite(titleLeft) ? titleLeft : 8;
  const resolvedTop = Number.isFinite(titleTop) ? titleTop : 8;
  const titleAlign = elements.titleAlign.value || "left";
  const watermarkGraphic = buildWatermarkGraphic();

  return {
    backgroundColor,
    color: resolvePalette(),
    textStyle: {
      fontFamily: elements.fontFamily.value,
      color: textColor,
    },
    graphic: watermarkGraphic || undefined,
    title: {
      text: elements.chartTitle.value,
      subtext: elements.chartSubtitle.value,
      left: resolvedLeft,
      top: resolvedTop,
      textAlign: titleAlign,
      itemGap: 6,
      textStyle: {
        fontFamily: elements.fontFamily.value,
        fontWeight: 600,
        color: textColor,
        fontSize: titleSize,
      },
      subtextStyle: {
        fontFamily: elements.fontFamily.value,
        color: textColor,
        fontSize: subtitleSize,
      },
    },
  };
}

function buildTrendlineSeries(name, data, axisType, color, yAxisIndex) {
  const points = data
    .map((point, index) => {
      const xRaw = point[0];
      const yRaw = point[1];
      const xValue = axisType === "category" ? index : Number(xRaw);
      const yValue = Number(yRaw);
      if (!Number.isFinite(xValue) || !Number.isFinite(yValue)) {
        return null;
      }
      return { x: xValue, y: yValue, index, xRaw };
    })
    .filter(Boolean);

  if (points.length < 2) {
    return null;
  }

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  points.forEach((point) => {
    sumX += point.x;
    sumY += point.y;
    sumXY += point.x * point.y;
    sumX2 += point.x * point.x;
  });

  const n = points.length;
  const denominator = n * sumX2 - sumX * sumX;
  if (denominator === 0) {
    return null;
  }

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  let xStart;
  let xEnd;
  let yStart;
  let yEnd;

  if (axisType === "category") {
    xStart = data[0][0];
    xEnd = data[data.length - 1][0];
    yStart = intercept;
    yEnd = slope * (data.length - 1) + intercept;
  } else {
    const xValues = points.map((point) => point.x);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    xStart = minX;
    xEnd = maxX;
    yStart = slope * minX + intercept;
    yEnd = slope * maxX + intercept;
  }

  return {
    name: `${name} trend`,
    type: "line",
    data: [
      [xStart, yStart],
      [xEnd, yEnd],
    ],
    showSymbol: false,
    symbol: "none",
    silent: true,
    yAxisIndex,
    lineStyle: {
      width: 2,
      type: "dashed",
      color,
    },
    emphasis: { disabled: true },
    tooltip: { show: false },
  };
}

function buildAnnotationSeries(axisType) {
  const events = state.annotations.events || [];
  const bands = state.annotations.bands || [];
  const callouts = state.annotations.callouts || [];

  if (!events.length && !bands.length && !callouts.length) {
    return null;
  }

  const markLineData = events
    .map((event) => {
      const xValue = parseAnnotationX(event.x, axisType);
      if (xValue === null) {
        return null;
      }
      return {
        xAxis: xValue,
        lineStyle: { color: event.color || "#1a4d7a" },
        label: { formatter: event.label || "" },
      };
    })
    .filter(Boolean);

  const markAreaData = bands
    .map((band) => {
      const start = parseAnnotationX(band.start, axisType);
      const end = parseAnnotationX(band.end, axisType);
      if (start === null || end === null) {
        return null;
      }
      return [
        {
          xAxis: start,
          itemStyle: { color: band.color || "#f08b3e", opacity: 0.18 },
          label: { show: !!band.label, formatter: band.label || "" },
        },
        { xAxis: end },
      ];
    })
    .filter(Boolean);

  const markPointData = callouts
    .map((callout) => {
      const xValue = parseAnnotationX(callout.x, axisType);
      const yValue = parseNumber(callout.y);
      if (xValue === null || yValue === null) {
        return null;
      }
      return {
        coord: [xValue, yValue],
        value: callout.label || "",
        label: { formatter: callout.label || "" },
        itemStyle: { color: callout.color || "#0f6b63" },
      };
    })
    .filter(Boolean);

  return {
    name: "__annotations",
    type: "line",
    data: [],
    silent: true,
    lineStyle: { opacity: 0 },
    itemStyle: { opacity: 0 },
    tooltip: { show: false },
    markLine: markLineData.length
      ? { symbol: ["none", "none"], data: markLineData }
      : undefined,
    markArea: markAreaData.length ? { data: markAreaData } : undefined,
    markPoint: markPointData.length ? { data: markPointData } : undefined,
  };
}

function buildStandardOption() {
  const xColumn = elements.xColumn.value;
  const yColumns = getSelectedYColumns();
  const axisType = elements.xAxisType.value;
  const chartType = elements.chartType.value;
  const compareMode = elements.compareMode ? elements.compareMode.value : "none";
  const stackedPercent = elements.stackedPercent.checked;
  const stacked = elements.stacked.checked || stackedPercent;
  const smoothGlobal = elements.smooth.checked;
  const showSymbols = elements.showSymbols.checked;
  const showLabels = elements.showLabels.checked;
  const lineWidth = parseNumber(elements.lineWidth.value) || 2;
  const symbolSize = parseNumber(elements.symbolSize.value) || 6;
  const areaOpacity = parseNumber(elements.areaOpacity.value) || 0.3;
  const sortByX = elements.sortByX.checked;
  const comboDefault = elements.comboDefaultType.value || "line";
  const palette = resolvePalette();
  const barSizing = resolveBarSizing();

  const rows = buildRowData(xColumn, yColumns, axisType, sortByX);
  const normalizedRows = stackedPercent
    ? normalizeRowsToPercent(rows, yColumns)
    : normalizeRowsToPerformance(rows, yColumns, compareMode);

  const series = [];
  const trendlines = [];
  let usesRightAxis = false;
  const formatBySeries = {};
  const suffixBySeries = {};

  yColumns.forEach((col, index) => {
    const override = state.seriesOverrides[col] || {};
    const baseType = chartType === "combo" ? comboDefault : chartType;
    const overrideType =
      override.type && override.type !== "default" ? override.type : baseType;
    const isArea = overrideType === "area";
    const type = isArea ? "line" : overrideType;
    const color = override.color || palette[index % palette.length];
    const lineStyleType = override.lineStyle || "solid";
    const marker = override.marker || "auto";
    const smooth =
      override.smooth !== undefined ? override.smooth : smoothGlobal;
    const yAxisIndex = override.axis === "right" ? 1 : 0;
    const valueFormat = override.valueFormat || "auto";
    const valueSuffix = override.valueSuffix || "none";
    const effectiveFormat =
      compareMode === "percent"
        ? "percent"
        : compareMode === "index"
        ? "number"
        : valueFormat;
    if (yAxisIndex === 1) {
      usesRightAxis = true;
    }
    formatBySeries[col] = effectiveFormat;
    suffixBySeries[col] = compareMode === "index" ? "none" : valueSuffix;

    const data = normalizedRows.map((row) => [
      row.x,
      row.values[col] !== undefined ? row.values[col] : null,
    ]);

    const seriesItem = {
      name: col,
      type,
      data,
      yAxisIndex,
      label: {
        show: showLabels,
        formatter: (params) =>
          formatValue(extractSeriesValue(params), effectiveFormat, {
            stackedPercent,
            suffix: compareMode === "index" ? "none" : valueSuffix,
          }),
      },
      emphasis: { focus: "series" },
    };

    if (type === "scatter") {
      seriesItem.symbol = marker === "auto" ? "circle" : marker;
      seriesItem.symbolSize = symbolSize;
      seriesItem.itemStyle = { color };
    } else if (type === "bar") {
      seriesItem.barMaxWidth =
        barSizing.barMaxWidth !== undefined ? barSizing.barMaxWidth : 40;
      if (barSizing.barGap !== undefined) {
        seriesItem.barGap = barSizing.barGap;
      }
      if (barSizing.barCategoryGap !== undefined) {
        seriesItem.barCategoryGap = barSizing.barCategoryGap;
      }
      seriesItem.itemStyle = { color };
      seriesItem.stack = stacked ? "total" : undefined;
    } else {
      seriesItem.smooth = smooth;
      seriesItem.showSymbol = marker === "none" ? false : showSymbols;
      seriesItem.symbol = marker === "auto" ? "circle" : marker;
      seriesItem.symbolSize = symbolSize;
      seriesItem.lineStyle = {
        width: lineWidth,
        type: lineStyleType,
        color,
      };
      seriesItem.itemStyle = { color };
      seriesItem.stack = stacked ? "total" : undefined;
      if (isArea) {
        seriesItem.areaStyle = { opacity: areaOpacity };
      }
    }

    series.push(seriesItem);

    if (override.trendline) {
      const trendline = buildTrendlineSeries(
        col,
        data,
        axisType,
        color,
        yAxisIndex
      );
      if (trendline) {
        trendlines.push(trendline);
      }
    }
  });

  const annotationSeries = buildAnnotationSeries(axisType);
  if (annotationSeries) {
    series.push(annotationSeries);
  }
  series.push(...trendlines);

  updateSeriesCount(yColumns.length);

  const yScale = elements.yScale.value === "log" ? "log" : "value";
  const yScaleRight = elements.yScaleRight.value === "log" ? "log" : "value";
  const yMin = parseNumber(elements.yMin.value);
  const yMax = parseNumber(elements.yMax.value);
  const textColor = elements.textColor.value;
  const gridColor = elements.gridColor.value;
  const axisColor = elements.textColor.value;
  const xAxisRotate = parseNumber(elements.xAxisRotate.value) || 0;
  const xAxisStyles = buildAxisTextStyles("x", textColor);
  const yAxisStyles = buildAxisTextStyles("yLeft", textColor);
  const yAxisRightStyles = buildAxisTextStyles("yRight", textColor);
  const xAxisSpacing = computeAxisSpacing(
    xAxisStyles.labelSize,
    xAxisStyles.nameSize,
    false
  );
  const yAxisSpacing = computeAxisSpacing(
    yAxisStyles.labelSize,
    yAxisStyles.nameSize,
    true
  );
  const yAxisRightSpacing = computeAxisSpacing(
    yAxisRightStyles.labelSize,
    yAxisRightStyles.nameSize,
    true
  );
  const leftAxisFormatting = resolveAxisFormatting(yColumns, "left");
  const rightAxisFormatting = resolveAxisFormatting(yColumns, "right");

  const rightAxisLabel = elements.yAxisRightLabel.value.trim();
  const showRightAxis = usesRightAxis || Boolean(rightAxisLabel);
  const axisInsets = computeAxisInsets(
    yAxisSpacing,
    yAxisRightSpacing,
    showRightAxis
  );

  const defaultLeftLabel =
    elements.yAxisLabel.value ||
    (compareMode === "percent"
      ? "Performance (%)"
      : compareMode === "index"
      ? "Index (Base=100)"
      : "");
  const yAxis = [
    {
      type: yScale,
      name: defaultLeftLabel,
      nameGap: yAxisSpacing.nameGap,
      nameLocation: "middle",
      nameRotate: 90,
      nameTextStyle: yAxisStyles.nameTextStyle,
      min: yMin !== null ? yMin : undefined,
      max: yMax !== null ? yMax : undefined,
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: {
        ...yAxisStyles.labelTextStyle,
        margin: yAxisSpacing.margin,
        hideOverlap: true,
        formatter: (value) =>
          formatValue(value, leftAxisFormatting.format, {
            stackedPercent,
            suffix: leftAxisFormatting.suffix,
          }),
      },
      axisTick: { lineStyle: { color: axisColor } },
      splitLine: {
        show: true,
        lineStyle: { color: gridColor },
      },
      triggerEvent: true,
    },
  ];

  if (stackedPercent) {
    yAxis[0].min = 0;
    yAxis[0].max = 100;
  }

  if (showRightAxis) {
    const defaultRightLabel =
      elements.yAxisRightLabel.value ||
      (compareMode === "percent"
        ? "Performance (%)"
        : compareMode === "index"
        ? "Index (Base=100)"
        : "");
    yAxis.push({
      type: yScaleRight,
      name: defaultRightLabel,
      nameGap: yAxisRightSpacing.nameGap,
      nameLocation: "middle",
      nameRotate: -90,
      nameTextStyle: yAxisRightStyles.nameTextStyle,
      axisLine: { show: true, lineStyle: { color: axisColor } },
      axisLabel: {
        ...yAxisRightStyles.labelTextStyle,
        margin: yAxisRightSpacing.margin,
        hideOverlap: true,
        show: usesRightAxis,
        formatter: (value) =>
          formatValue(value, rightAxisFormatting.format, {
            stackedPercent,
            suffix: rightAxisFormatting.suffix,
          }),
      },
      axisTick: { show: usesRightAxis, lineStyle: { color: axisColor } },
      splitLine: { show: false },
      triggerEvent: true,
    });
  }

  const tooltipFormatter = (params) => {
    const items = Array.isArray(params) ? params : [params];
    const header = resolveTooltipHeader(items[0]);
    const lines = items
      .filter((item) => item.seriesName !== "__annotations")
      .map((item) => {
        const format = formatBySeries[item.seriesName] || "auto";
        const suffix = suffixBySeries[item.seriesName] || "none";
        const value = extractSeriesValue(item);
        const formatted = formatValue(value, format, {
          stackedPercent,
          suffix,
        });
        return `${item.marker} ${item.seriesName}: ${formatted}`;
      });
    return [header, ...lines].filter(Boolean).join("<br/>");
  };

  const base = buildBaseOption();
  const dataZoom = buildDataZoom(axisType);
  const grid = gridConfig(elements.legendPosition.value, axisInsets);
  if (dataZoom.length && typeof grid.bottom === "number") {
    grid.bottom += 36;
  }
  return {
    ...base,
    tooltip: {
      trigger: chartType === "scatter" ? "item" : "axis",
      formatter: tooltipFormatter,
    },
    legend: legendConfig(elements.legendPosition.value, yColumns),
    grid,
    dataZoom,
    xAxis: {
      type: axisType,
      name: elements.xAxisLabel.value,
      nameLocation: "middle",
      nameGap: xAxisSpacing.nameGap,
      nameTextStyle: { ...xAxisStyles.nameTextStyle, align: "center" },
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: {
        ...xAxisStyles.labelTextStyle,
        rotate: xAxisRotate,
        margin: xAxisSpacing.margin,
      },
      axisTick: { lineStyle: { color: axisColor } },
      splitLine: { show: false },
      triggerEvent: true,
    },
    yAxis,
    series,
  };
}

function formatNumberShort(value) {
  if (!Number.isFinite(value)) {
    return String(value);
  }
  const absValue = Math.abs(value);
  if (absValue >= 1000) {
    return value.toFixed(0);
  }
  return value.toFixed(2).replace(/\.00$/, "");
}

function buildHistogramOption() {
  const column = elements.histogramColumn.value;
  const sourceRows = getFilteredRows();
  const barSizing = resolveBarSizing();
  const values = sourceRows
    .map((row) => parseNumber(row[column]))
    .filter((value) => value !== null);

  if (!column || !values.length) {
    updateSeriesCount(0);
    return buildBaseOption();
  }

  const bins = parseNumber(elements.histogramBins.value) || 12;
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const safeBins = Math.max(3, bins);
  const binSize = minValue === maxValue ? 1 : (maxValue - minValue) / safeBins;

  const counts = new Array(safeBins).fill(0);
  values.forEach((value) => {
    const index = Math.min(
      Math.floor((value - minValue) / binSize),
      safeBins - 1
    );
    counts[index] += 1;
  });

  const labels = counts.map((_, index) => {
    const start = minValue + index * binSize;
    const end = start + binSize;
    return `${formatNumberShort(start)}-${formatNumberShort(end)}`;
  });

  const series = [
    {
      name: column,
      type: "bar",
      data: counts,
      barMaxWidth: barSizing.barMaxWidth ?? 40,
      barGap: barSizing.barGap,
      barCategoryGap: barSizing.barCategoryGap,
      itemStyle: { color: resolvePalette()[0] },
    },
  ];

  const annotationSeries = buildAnnotationSeries("category");
  if (annotationSeries) {
    series.push(annotationSeries);
  }

  updateSeriesCount(1);

  const base = buildBaseOption();
  const textColor = elements.textColor.value;
  const axisColor = elements.textColor.value;
  const gridColor = elements.gridColor.value;
  const xAxisRotate = parseNumber(elements.xAxisRotate.value) || 0;
  const xAxisStyles = buildAxisTextStyles("x", textColor);
  const yAxisStyles = buildAxisTextStyles("yLeft", textColor);
  const xAxisSpacing = computeAxisSpacing(
    xAxisStyles.labelSize,
    xAxisStyles.nameSize,
    false
  );
  const yAxisSpacing = computeAxisSpacing(
    yAxisStyles.labelSize,
    yAxisStyles.nameSize,
    true
  );

  return {
    ...base,
    tooltip: { trigger: "axis" },
    legend: legendConfig(elements.legendPosition.value, [column]),
    grid: gridConfig(
      elements.legendPosition.value,
      computeAxisInsets(yAxisSpacing, yAxisSpacing, false)
    ),
    xAxis: {
      type: "category",
      data: labels,
      name: elements.xAxisLabel.value || column,
      nameLocation: "middle",
      nameGap: xAxisSpacing.nameGap,
      nameTextStyle: { ...xAxisStyles.nameTextStyle, align: "center" },
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: {
        ...xAxisStyles.labelTextStyle,
        rotate: xAxisRotate,
        margin: xAxisSpacing.margin,
      },
      axisTick: { lineStyle: { color: axisColor } },
      triggerEvent: true,
    },
    yAxis: {
      type: "value",
      name: elements.yAxisLabel.value || "Count",
      nameGap: yAxisSpacing.nameGap,
      nameLocation: "middle",
      nameRotate: 90,
      nameTextStyle: yAxisStyles.nameTextStyle,
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: {
        ...yAxisStyles.labelTextStyle,
        margin: yAxisSpacing.margin,
        hideOverlap: true,
      },
      axisTick: { lineStyle: { color: axisColor } },
      splitLine: {
        show: true,
        lineStyle: { color: gridColor },
      },
      triggerEvent: true,
    },
    series,
  };
}

function calculateQuantile(sorted, quantile) {
  const position = (sorted.length - 1) * quantile;
  const base = Math.floor(position);
  const rest = position - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
}

function buildBoxplotOption() {
  const yColumns = getSelectedYColumns();
  const boxData = [];
  const categories = [];
  const sourceRows = getFilteredRows();

  yColumns.forEach((col) => {
    const values = sourceRows
      .map((row) => parseNumber(row[col]))
      .filter((value) => value !== null)
      .sort((a, b) => a - b);
    if (!values.length) {
      return;
    }
    const min = values[0];
    const max = values[values.length - 1];
    const q1 = calculateQuantile(values, 0.25);
    const median = calculateQuantile(values, 0.5);
    const q3 = calculateQuantile(values, 0.75);
    boxData.push([min, q1, median, q3, max]);
    categories.push(col);
  });

  updateSeriesCount(categories.length);

  const series = [
    {
      name: "Distribution",
      type: "boxplot",
      data: boxData,
      itemStyle: { color: resolvePalette()[0] },
    },
  ];

  const annotationSeries = buildAnnotationSeries("category");
  if (annotationSeries) {
    series.push(annotationSeries);
  }

  const base = buildBaseOption();
  const textColor = elements.textColor.value;
  const axisColor = elements.textColor.value;
  const gridColor = elements.gridColor.value;
  const xAxisRotate = parseNumber(elements.xAxisRotate.value) || 0;
  const xAxisStyles = buildAxisTextStyles("x", textColor);
  const yAxisStyles = buildAxisTextStyles("yLeft", textColor);
  const xAxisSpacing = computeAxisSpacing(
    xAxisStyles.labelSize,
    xAxisStyles.nameSize,
    false
  );
  const yAxisSpacing = computeAxisSpacing(
    yAxisStyles.labelSize,
    yAxisStyles.nameSize,
    true
  );

  return {
    ...base,
    tooltip: { trigger: "item" },
    legend: legendConfig(elements.legendPosition.value, ["Distribution"]),
    grid: gridConfig(
      elements.legendPosition.value,
      computeAxisInsets(yAxisSpacing, yAxisSpacing, false)
    ),
    xAxis: {
      type: "category",
      data: categories,
      name: elements.xAxisLabel.value,
      nameLocation: "middle",
      nameGap: xAxisSpacing.nameGap,
      nameTextStyle: { ...xAxisStyles.nameTextStyle, align: "center" },
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: {
        ...xAxisStyles.labelTextStyle,
        rotate: xAxisRotate,
        margin: xAxisSpacing.margin,
      },
      axisTick: { lineStyle: { color: axisColor } },
      triggerEvent: true,
    },
    yAxis: {
      type: "value",
      name: elements.yAxisLabel.value,
      nameGap: yAxisSpacing.nameGap,
      nameLocation: "middle",
      nameRotate: 90,
      nameTextStyle: yAxisStyles.nameTextStyle,
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: {
        ...yAxisStyles.labelTextStyle,
        margin: yAxisSpacing.margin,
        hideOverlap: true,
      },
      axisTick: { lineStyle: { color: axisColor } },
      splitLine: {
        show: true,
        lineStyle: { color: gridColor },
      },
      triggerEvent: true,
    },
    series,
  };
}

function buildWaterfallOption() {
  const xColumn = elements.xColumn.value;
  const yColumn = elements.waterfallColumn.value;
  const axisType = elements.xAxisType.value;
  const sortByX = elements.sortByX.checked;
  const barSizing = resolveBarSizing();

  if (!xColumn || !yColumn) {
    updateSeriesCount(0);
    return buildBaseOption();
  }

  const rows = buildRowData(xColumn, [yColumn], axisType, sortByX);
  if (!rows.length) {
    updateSeriesCount(0);
    return buildBaseOption();
  }

  const categories = rows.map((row) => String(row.x));
  const values = rows.map((row) => row.values[yColumn] || 0);
  const deltas = values.map((value, index) =>
    index === 0 ? value : value - values[index - 1]
  );

  const baseSeries = [];
  let runningTotal = 0;
  deltas.forEach((delta) => {
    baseSeries.push(runningTotal);
    runningTotal += delta;
  });

  const showTotal = elements.waterfallMode.value === "deltaTotal";
  if (showTotal) {
    categories.push("Total");
    baseSeries.push(0);
    deltas.push(runningTotal);
  }

  const positiveColor = elements.waterfallPositive.value;
  const negativeColor = elements.waterfallNegative.value;
  const deltaData = deltas.map((value) => ({
    value,
    itemStyle: { color: value >= 0 ? positiveColor : negativeColor },
  }));

  const series = [
    {
      name: "Base",
      type: "bar",
      stack: "waterfall",
      data: baseSeries,
      barMaxWidth: barSizing.barMaxWidth ?? 40,
      barGap: barSizing.barGap,
      barCategoryGap: barSizing.barCategoryGap,
      itemStyle: { color: "transparent" },
      emphasis: { itemStyle: { color: "transparent" } },
    },
    {
      name: "Change",
      type: "bar",
      stack: "waterfall",
      data: deltaData,
      barMaxWidth: barSizing.barMaxWidth ?? 40,
      barGap: barSizing.barGap,
      barCategoryGap: barSizing.barCategoryGap,
    },
  ];

  const annotationSeries = buildAnnotationSeries("category");
  if (annotationSeries) {
    series.push(annotationSeries);
  }

  updateSeriesCount(1);

  const base = buildBaseOption();
  const textColor = elements.textColor.value;
  const axisColor = elements.textColor.value;
  const gridColor = elements.gridColor.value;
  const xAxisRotate = parseNumber(elements.xAxisRotate.value) || 0;
  const xAxisStyles = buildAxisTextStyles("x", textColor);
  const yAxisStyles = buildAxisTextStyles("yLeft", textColor);
  const xAxisSpacing = computeAxisSpacing(
    xAxisStyles.labelSize,
    xAxisStyles.nameSize,
    false
  );
  const yAxisSpacing = computeAxisSpacing(
    yAxisStyles.labelSize,
    yAxisStyles.nameSize,
    true
  );

  return {
    ...base,
    tooltip: { trigger: "axis" },
    legend: legendConfig(elements.legendPosition.value, ["Change"]),
    grid: gridConfig(
      elements.legendPosition.value,
      computeAxisInsets(yAxisSpacing, yAxisSpacing, false)
    ),
    xAxis: {
      type: "category",
      data: categories,
      name: elements.xAxisLabel.value,
      nameLocation: "middle",
      nameGap: xAxisSpacing.nameGap,
      nameTextStyle: { ...xAxisStyles.nameTextStyle, align: "center" },
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: {
        ...xAxisStyles.labelTextStyle,
        rotate: xAxisRotate,
        margin: xAxisSpacing.margin,
      },
      axisTick: { lineStyle: { color: axisColor } },
      triggerEvent: true,
    },
    yAxis: {
      type: "value",
      name: elements.yAxisLabel.value,
      nameGap: yAxisSpacing.nameGap,
      nameLocation: "middle",
      nameRotate: 90,
      nameTextStyle: yAxisStyles.nameTextStyle,
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: {
        ...yAxisStyles.labelTextStyle,
        margin: yAxisSpacing.margin,
        hideOverlap: true,
      },
      axisTick: { lineStyle: { color: axisColor } },
      splitLine: {
        show: true,
        lineStyle: { color: gridColor },
      },
      triggerEvent: true,
    },
    series,
  };
}

function buildOption() {
  const chartType = elements.chartType.value;
  if (chartType === "histogram") {
    return buildHistogramOption();
  }
  if (chartType === "boxplot") {
    return buildBoxplotOption();
  }
  if (chartType === "waterfall") {
    return buildWaterfallOption();
  }
  return buildStandardOption();
}

function deepMerge(target, source) {
  if (Array.isArray(source)) {
    return source.slice();
  }
  if (source === null || typeof source !== "object") {
    return source;
  }
  const output = { ...(target || {}) };
  Object.keys(source).forEach((key) => {
    output[key] = deepMerge(target ? target[key] : undefined, source[key]);
  });
  return output;
}

function applyAdvanced(option) {
  const advanced = elements.advancedJson.value.trim();
  if (!advanced) {
    updateAdvancedStatus("", false);
    return option;
  }
  try {
    const overrides = JSON.parse(advanced);
    updateAdvancedStatus("Advanced JSON applied", false);
    return deepMerge(option, overrides);
  } catch (error) {
    updateAdvancedStatus("Invalid JSON, using base options", true);
    return option;
  }
}

function updateChart() {
  if (!chart) return;
  try {
    const currentZoom = zoomSnapshot || readZoomSnapshot();
    if (!currentRows.length || !currentColumns.length) {
      chart.clear();
      updateRecommendation();
      chart.setOption({
        title: {
          text: "Upload a CSV to begin",
          subtext: "Drop a file, paste data, or load a template to preview.",
          left: "center",
          top: "middle",
          textStyle: {
            fontFamily: "Fraunces",
            fontSize: 18,
            fontWeight: 600,
            color: "#4a4f52",
          },
          subtextStyle: {
            fontFamily: "Instrument Sans",
            fontSize: 12,
            color: "#6a7074",
          },
        },
      });
      updateSeriesCount(0);
      return;
    }
    const option = applyAdvanced(buildOption());
    if (currentZoom) {
      applyZoomSnapshot(option, currentZoom);
    }
    chart.setOption(option, true);
    updateRecommendation();
  } catch (error) {
    chart.clear();
    updateProjectStatus("Chart render failed. Check console errors.", true);
    console.error(error);
  }
}

function getExportDataUrl() {
  if (!chart) {
    return null;
  }
  const scale = parseNumber(elements.exportScale.value) || 2;
  const backgroundColor = elements.transparentBg.checked
    ? "transparent"
    : elements.backgroundColor.value;
  const option = chart.getOption();
  const dataZoom = Array.isArray(option?.dataZoom) ? option.dataZoom : null;
  const hasSlider =
    dataZoom &&
    dataZoom.some((entry) => entry.type === "slider" && entry.show !== false);

  if (hasSlider) {
    const hidden = dataZoom.map((entry) =>
      entry.type === "slider" ? { ...entry, show: false } : { ...entry }
    );
    chart.setOption({ dataZoom: hidden }, false);
  }

  const dataUrl = chart.getDataURL({
    type: "png",
    pixelRatio: scale,
    backgroundColor,
  });

  if (hasSlider) {
    chart.setOption({ dataZoom }, false);
  }

  return dataUrl;
}

async function copyChart() {
  try {
    const dataUrl = getExportDataUrl();
    if (!dataUrl) {
      throw new Error("No chart available");
    }
    const blob = await (await fetch(dataUrl)).blob();
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob }),
    ]);
  } catch (error) {
    updateAdvancedStatus("Copy failed. Use download instead.", true);
  }
}

function downloadChart() {
  const dataUrl = getExportDataUrl();
  if (!dataUrl) {
    updateAdvancedStatus("Download failed. No chart available.", true);
    return;
  }
  const link = document.createElement("a");
  const name = elements.exportName.value.trim() || "chart";
  link.href = dataUrl;
  link.download = `${name}.png`;
  link.click();
}

function updateSeriesOverride(name, changes) {
  const current = state.seriesOverrides[name] || {};
  state.seriesOverrides[name] = { ...current, ...changes };
}

function renderSeriesOverrides() {
  elements.seriesOverrides.innerHTML = "";
  const chartType = elements.chartType.value;
  if (
    chartType === "histogram" ||
    chartType === "waterfall" ||
    chartType === "boxplot"
  ) {
    elements.seriesOverrides.innerHTML =
      "<p class=\"hint\">Overrides apply to multi-series charts.</p>";
    return;
  }
  const yColumns = getSelectedYColumns();
  if (!yColumns.length) {
    elements.seriesOverrides.innerHTML =
      "<p class=\"hint\">Select Y series to customize.</p>";
    return;
  }

  const palette = resolvePalette();

  yColumns.forEach((col, index) => {
    const override = state.seriesOverrides[col] || {};

    const item = document.createElement("div");
    item.className = "override-item";

    const head = document.createElement("div");
    head.className = "override-head";

    const title = document.createElement("div");
    title.className = "override-title";
    title.textContent = col;

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "ghost compact";
    resetButton.textContent = "Reset";
    resetButton.addEventListener("click", () => {
      delete state.seriesOverrides[col];
      renderSeriesOverrides();
      scheduleUpdateChart();
    });

    head.appendChild(title);
    head.appendChild(resetButton);

    const grid = document.createElement("div");
    grid.className = "override-grid";

    const axisLabel = document.createElement("label");
    axisLabel.textContent = "Axis";
    const axisSelect = document.createElement("select");
    ["left", "right"].forEach((axis) => {
      const option = document.createElement("option");
      option.value = axis;
      option.textContent = axis === "left" ? "Left" : "Right";
      axisSelect.appendChild(option);
    });
    axisSelect.value = override.axis || "left";
    axisSelect.addEventListener("change", () => {
      updateSeriesOverride(col, { axis: axisSelect.value });
      scheduleUpdateChart();
    });
    axisLabel.appendChild(axisSelect);

    const typeLabel = document.createElement("label");
    typeLabel.textContent = "Type";
    const typeSelect = document.createElement("select");
    [
      { value: "default", label: "Default" },
      { value: "line", label: "Line" },
      { value: "area", label: "Area" },
      { value: "bar", label: "Bar" },
      { value: "scatter", label: "Scatter" },
    ].forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.value;
      option.textContent = entry.label;
      typeSelect.appendChild(option);
    });
    typeSelect.value = override.type || "default";
    typeSelect.addEventListener("change", () => {
      updateSeriesOverride(col, { type: typeSelect.value });
      scheduleUpdateChart();
    });
    typeLabel.appendChild(typeSelect);

    const colorLabel = document.createElement("label");
    colorLabel.textContent = "Color";
    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = override.color || palette[index % palette.length];
    colorInput.addEventListener("input", () => {
      updateSeriesOverride(col, { color: colorInput.value });
      scheduleUpdateChart();
    });
    colorLabel.appendChild(colorInput);

    const lineLabel = document.createElement("label");
    lineLabel.textContent = "Line style";
    const lineSelect = document.createElement("select");
    [
      { value: "solid", label: "Solid" },
      { value: "dashed", label: "Dashed" },
      { value: "dotted", label: "Dotted" },
    ].forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.value;
      option.textContent = entry.label;
      lineSelect.appendChild(option);
    });
    lineSelect.value = override.lineStyle || "solid";
    lineSelect.addEventListener("change", () => {
      updateSeriesOverride(col, { lineStyle: lineSelect.value });
      scheduleUpdateChart();
    });
    lineLabel.appendChild(lineSelect);

    const markerLabel = document.createElement("label");
    markerLabel.textContent = "Marker";
    const markerSelect = document.createElement("select");
    [
      { value: "auto", label: "Auto" },
      { value: "circle", label: "Circle" },
      { value: "rect", label: "Square" },
      { value: "triangle", label: "Triangle" },
      { value: "diamond", label: "Diamond" },
      { value: "none", label: "None" },
    ].forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.value;
      option.textContent = entry.label;
      markerSelect.appendChild(option);
    });
    markerSelect.value = override.marker || "auto";
    markerSelect.addEventListener("change", () => {
      updateSeriesOverride(col, { marker: markerSelect.value });
      scheduleUpdateChart();
    });
    markerLabel.appendChild(markerSelect);

    const formatLabel = document.createElement("label");
    formatLabel.textContent = "Value format";
    const formatSelect = document.createElement("select");
    [
      { value: "auto", label: "Auto" },
      { value: "number", label: "Number" },
      { value: "currency", label: "USD ($)" },
      { value: "percent", label: "Percent" },
    ].forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.value;
      option.textContent = entry.label;
      formatSelect.appendChild(option);
    });
    formatSelect.value = override.valueFormat || "auto";
    formatSelect.addEventListener("change", () => {
      updateSeriesOverride(col, { valueFormat: formatSelect.value });
      scheduleUpdateChart();
    });
    formatLabel.appendChild(formatSelect);

    const suffixLabel = document.createElement("label");
    suffixLabel.textContent = "Suffix";
    const suffixSelect = document.createElement("select");
    [
      { value: "none", label: "None" },
      { value: "k", label: "k (thousand)" },
      { value: "M", label: "M (million)" },
      { value: "B", label: "B (billion)" },
    ].forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.value;
      option.textContent = entry.label;
      suffixSelect.appendChild(option);
    });
    suffixSelect.value = override.valueSuffix || "none";
    suffixSelect.addEventListener("change", () => {
      updateSeriesOverride(col, { valueSuffix: suffixSelect.value });
      scheduleUpdateChart();
    });
    suffixLabel.appendChild(suffixSelect);

    const smoothLabel = document.createElement("label");
    smoothLabel.textContent = "Smooth";
    const smoothInput = document.createElement("input");
    smoothInput.type = "checkbox";
    smoothInput.checked =
      override.smooth !== undefined ? override.smooth : elements.smooth.checked;
    smoothInput.addEventListener("change", () => {
      updateSeriesOverride(col, { smooth: smoothInput.checked });
      scheduleUpdateChart();
    });
    smoothLabel.appendChild(smoothInput);

    const trendLabel = document.createElement("label");
    trendLabel.textContent = "Trendline";
    const trendInput = document.createElement("input");
    trendInput.type = "checkbox";
    trendInput.checked = !!override.trendline;
    trendInput.addEventListener("change", () => {
      updateSeriesOverride(col, { trendline: trendInput.checked });
      scheduleUpdateChart();
    });
    trendLabel.appendChild(trendInput);

    grid.appendChild(axisLabel);
    grid.appendChild(typeLabel);
    grid.appendChild(colorLabel);
    grid.appendChild(lineLabel);
    grid.appendChild(markerLabel);
    grid.appendChild(formatLabel);
    grid.appendChild(suffixLabel);
    grid.appendChild(smoothLabel);
    grid.appendChild(trendLabel);

    item.appendChild(head);
    item.appendChild(grid);
    elements.seriesOverrides.appendChild(item);
  });
}

function renderAnnotationList(container, items, formatter, onRemove) {
  container.innerHTML = "";
  items.forEach((item, index) => {
    const pill = document.createElement("div");
    pill.className = "pill";
    const text = document.createElement("span");
    text.textContent = formatter(item);
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "x";
    button.addEventListener("click", () => onRemove(index));
    pill.appendChild(text);
    pill.appendChild(button);
    container.appendChild(pill);
  });
}

function renderAnnotations() {
  const events = state.annotations.events || [];
  const bands = state.annotations.bands || [];
  const callouts = state.annotations.callouts || [];

  renderAnnotationList(elements.eventList, events, (event) => {
    return `${event.label || "Event"} @ ${event.x}`;
  }, (index) => {
    events.splice(index, 1);
    renderAnnotations();
    scheduleUpdateChart();
  });

  renderAnnotationList(elements.bandList, bands, (band) => {
    const label = band.label ? `${band.label} ` : "";
    return `${label}${band.start} to ${band.end}`;
  }, (index) => {
    bands.splice(index, 1);
    renderAnnotations();
    scheduleUpdateChart();
  });

  renderAnnotationList(elements.calloutList, callouts, (callout) => {
    return `${callout.label || "Callout"} (${callout.x}, ${callout.y})`;
  }, (index) => {
    callouts.splice(index, 1);
    renderAnnotations();
    scheduleUpdateChart();
  });
}

function addEventAnnotation() {
  const xValue = elements.eventX.value.trim();
  if (!xValue) {
    updateProjectStatus("Event needs an X value.", true);
    return;
  }
  state.annotations.events.push({
    x: xValue,
    label: elements.eventLabel.value.trim(),
    color: elements.eventColor.value,
  });
  elements.eventX.value = "";
  elements.eventLabel.value = "";
  renderAnnotations();
  scheduleUpdateChart();
}

function addBandAnnotation() {
  const start = elements.bandStart.value.trim();
  const end = elements.bandEnd.value.trim();
  if (!start || !end) {
    updateProjectStatus("Band needs start and end X.", true);
    return;
  }
  state.annotations.bands.push({
    start,
    end,
    label: elements.bandLabel.value.trim(),
    color: elements.bandColor.value,
  });
  elements.bandStart.value = "";
  elements.bandEnd.value = "";
  elements.bandLabel.value = "";
  renderAnnotations();
  scheduleUpdateChart();
}

function addCalloutAnnotation() {
  const xValue = elements.calloutX.value.trim();
  const yValue = elements.calloutY.value.trim();
  if (!xValue || !yValue) {
    updateProjectStatus("Callout needs X and Y values.", true);
    return;
  }
  state.annotations.callouts.push({
    x: xValue,
    y: yValue,
    label: elements.calloutLabel.value.trim(),
    color: elements.calloutColor.value,
  });
  elements.calloutX.value = "";
  elements.calloutY.value = "";
  elements.calloutLabel.value = "";
  renderAnnotations();
  scheduleUpdateChart();
}

function clone(value) {
  return value ? JSON.parse(JSON.stringify(value)) : value;
}

function createId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now()}`;
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }
  return date.toLocaleString();
}

function getSettings() {
  return {
    xColumn: elements.xColumn.value,
    yColumns: getSelectedYColumns(),
    chartType: elements.chartType.value,
    comboDefaultType: elements.comboDefaultType.value,
    stacked: elements.stacked.checked,
    stackedPercent: elements.stackedPercent.checked,
    smooth: elements.smooth.checked,
    showSymbols: elements.showSymbols.checked,
    showLabels: elements.showLabels.checked,
    sortByX: elements.sortByX.checked,
    lineWidth: elements.lineWidth.value,
    symbolSize: elements.symbolSize.value,
    areaOpacity: elements.areaOpacity.value,
    barWidth: elements.barWidth.value,
    barGap: elements.barGap.value,
    barCategoryGap: elements.barCategoryGap.value,
    xAxisType: elements.xAxisType.value,
    yScale: elements.yScale.value,
    yScaleRight: elements.yScaleRight.value,
    xAxisLabel: elements.xAxisLabel.value,
    yAxisLabel: elements.yAxisLabel.value,
    yAxisRightLabel: elements.yAxisRightLabel.value,
    yAxisFormat: elements.yAxisFormat ? elements.yAxisFormat.value : "auto",
    yAxisSuffix: elements.yAxisSuffix ? elements.yAxisSuffix.value : "none",
    yAxisRightFormat: elements.yAxisRightFormat
      ? elements.yAxisRightFormat.value
      : "auto",
    yAxisRightSuffix: elements.yAxisRightSuffix
      ? elements.yAxisRightSuffix.value
      : "none",
    xAxisLabelSize: elements.xAxisLabelSize.value,
    xAxisNameSize: elements.xAxisNameSize.value,
    xAxisLabelFont: elements.xAxisLabelFont.value,
    xAxisLabelWeight: elements.xAxisLabelWeight.value,
    xAxisNameFont: elements.xAxisNameFont.value,
    xAxisNameWeight: elements.xAxisNameWeight.value,
    yAxisLabelSize: elements.yAxisLabelSize.value,
    yAxisNameSize: elements.yAxisNameSize.value,
    yAxisLabelFont: elements.yAxisLabelFont.value,
    yAxisLabelWeight: elements.yAxisLabelWeight.value,
    yAxisNameFont: elements.yAxisNameFont.value,
    yAxisNameWeight: elements.yAxisNameWeight.value,
    yAxisRightLabelSize: elements.yAxisRightLabelSize.value,
    yAxisRightNameSize: elements.yAxisRightNameSize.value,
    yAxisRightLabelFont: elements.yAxisRightLabelFont.value,
    yAxisRightLabelWeight: elements.yAxisRightLabelWeight.value,
    yAxisRightNameFont: elements.yAxisRightNameFont.value,
    yAxisRightNameWeight: elements.yAxisRightNameWeight.value,
    yMin: elements.yMin.value,
    yMax: elements.yMax.value,
    xAxisRotate: elements.xAxisRotate.value,
    chartTitle: elements.chartTitle.value,
    chartSubtitle: elements.chartSubtitle.value,
    titleLeft: elements.titleLeft.value,
    titleTop: elements.titleTop.value,
    titleAlign: elements.titleAlign.value,
    titleSize: elements.titleSize.value,
    subtitleSize: elements.subtitleSize.value,
    legendSize: elements.legendSize.value,
    legendPosition: elements.legendPosition.value,
    legendFont: elements.legendFont.value,
    legendWeight: elements.legendWeight.value,
    renderer: elements.renderer.value,
    palette: elements.palette.value,
    customColors: elements.customColors.value,
    fontFamily: elements.fontFamily.value,
    textColor: elements.textColor.value,
    gridColor: elements.gridColor.value,
    transparentBg: elements.transparentBg.checked,
    backgroundColor: elements.backgroundColor.value,
    watermarkEnabled: elements.watermarkEnabled.checked,
    watermarkOpacity: elements.watermarkOpacity.value,
    watermarkScale: elements.watermarkScale.value,
    exportName: elements.exportName.value,
    exportScale: elements.exportScale.value,
    histogramColumn: elements.histogramColumn.value,
    histogramBins: elements.histogramBins.value,
    waterfallColumn: elements.waterfallColumn.value,
    waterfallMode: elements.waterfallMode.value,
    waterfallPositive: elements.waterfallPositive.value,
    waterfallNegative: elements.waterfallNegative.value,
    compareMode: elements.compareMode ? elements.compareMode.value : "none",
    dateRangePreset: elements.dateRangePreset
      ? elements.dateRangePreset.value
      : "custom",
    dateStart: elements.dateStart.value,
    dateEnd: elements.dateEnd.value,
    advancedJson: elements.advancedJson.value,
    chartWidth: getChartDimensions().width,
    chartHeight: getChartDimensions().height,
  };
}

function applyControlSettings(settings) {
  if (!settings) {
    return;
  }
  const previousRenderer = elements.renderer.value;

  if (settings.xColumn !== undefined) {
    elements.xColumn.value = settings.xColumn;
  }
  if (settings.chartType !== undefined) {
    elements.chartType.value = settings.chartType;
  }
  if (settings.comboDefaultType !== undefined) {
    elements.comboDefaultType.value = settings.comboDefaultType;
  }
  if (settings.stacked !== undefined) {
    elements.stacked.checked = settings.stacked;
  }
  if (settings.stackedPercent !== undefined) {
    elements.stackedPercent.checked = settings.stackedPercent;
  }
  if (settings.smooth !== undefined) {
    elements.smooth.checked = settings.smooth;
  }
  if (settings.showSymbols !== undefined) {
    elements.showSymbols.checked = settings.showSymbols;
  }
  if (settings.showLabels !== undefined) {
    elements.showLabels.checked = settings.showLabels;
  }
  if (settings.sortByX !== undefined) {
    elements.sortByX.checked = settings.sortByX;
  }
  if (settings.lineWidth !== undefined) {
    elements.lineWidth.value = settings.lineWidth;
  }
  if (settings.symbolSize !== undefined) {
    elements.symbolSize.value = settings.symbolSize;
  }
  if (settings.areaOpacity !== undefined) {
    elements.areaOpacity.value = settings.areaOpacity;
  }
  if (settings.barWidth !== undefined) {
    elements.barWidth.value = settings.barWidth;
  }
  if (settings.barGap !== undefined) {
    elements.barGap.value = settings.barGap;
  }
  if (settings.barCategoryGap !== undefined) {
    elements.barCategoryGap.value = settings.barCategoryGap;
  }
  if (settings.xAxisType !== undefined) {
    elements.xAxisType.value = settings.xAxisType;
  }
  if (settings.yScale !== undefined) {
    elements.yScale.value = settings.yScale;
  }
  if (settings.yScaleRight !== undefined) {
    elements.yScaleRight.value = settings.yScaleRight;
  }
  if (settings.xAxisLabel !== undefined) {
    elements.xAxisLabel.value = settings.xAxisLabel;
  }
  if (settings.yAxisLabel !== undefined) {
    elements.yAxisLabel.value = settings.yAxisLabel;
  }
  if (settings.yAxisRightLabel !== undefined) {
    elements.yAxisRightLabel.value = settings.yAxisRightLabel;
  }
  if (settings.yAxisFormat !== undefined && elements.yAxisFormat) {
    elements.yAxisFormat.value = settings.yAxisFormat;
  }
  if (settings.yAxisSuffix !== undefined && elements.yAxisSuffix) {
    elements.yAxisSuffix.value = settings.yAxisSuffix;
  }
  if (settings.yAxisRightFormat !== undefined && elements.yAxisRightFormat) {
    elements.yAxisRightFormat.value = settings.yAxisRightFormat;
  }
  if (settings.yAxisRightSuffix !== undefined && elements.yAxisRightSuffix) {
    elements.yAxisRightSuffix.value = settings.yAxisRightSuffix;
  }
  if (settings.xAxisLabelSize !== undefined) {
    elements.xAxisLabelSize.value = settings.xAxisLabelSize;
  }
  if (settings.xAxisNameSize !== undefined) {
    elements.xAxisNameSize.value = settings.xAxisNameSize;
  }
  if (settings.xAxisLabelFont !== undefined) {
    elements.xAxisLabelFont.value = settings.xAxisLabelFont;
  }
  if (settings.xAxisLabelWeight !== undefined) {
    elements.xAxisLabelWeight.value = settings.xAxisLabelWeight;
  }
  if (settings.xAxisNameFont !== undefined) {
    elements.xAxisNameFont.value = settings.xAxisNameFont;
  }
  if (settings.xAxisNameWeight !== undefined) {
    elements.xAxisNameWeight.value = settings.xAxisNameWeight;
  }
  if (settings.yAxisLabelSize !== undefined) {
    elements.yAxisLabelSize.value = settings.yAxisLabelSize;
  }
  if (settings.yAxisNameSize !== undefined) {
    elements.yAxisNameSize.value = settings.yAxisNameSize;
  }
  if (settings.yAxisLabelFont !== undefined) {
    elements.yAxisLabelFont.value = settings.yAxisLabelFont;
  }
  if (settings.yAxisLabelWeight !== undefined) {
    elements.yAxisLabelWeight.value = settings.yAxisLabelWeight;
  }
  if (settings.yAxisNameFont !== undefined) {
    elements.yAxisNameFont.value = settings.yAxisNameFont;
  }
  if (settings.yAxisNameWeight !== undefined) {
    elements.yAxisNameWeight.value = settings.yAxisNameWeight;
  }
  if (settings.yAxisRightLabelSize !== undefined) {
    elements.yAxisRightLabelSize.value = settings.yAxisRightLabelSize;
  }
  if (settings.yAxisRightNameSize !== undefined) {
    elements.yAxisRightNameSize.value = settings.yAxisRightNameSize;
  }
  if (settings.yAxisRightLabelFont !== undefined) {
    elements.yAxisRightLabelFont.value = settings.yAxisRightLabelFont;
  }
  if (settings.yAxisRightLabelWeight !== undefined) {
    elements.yAxisRightLabelWeight.value = settings.yAxisRightLabelWeight;
  }
  if (settings.yAxisRightNameFont !== undefined) {
    elements.yAxisRightNameFont.value = settings.yAxisRightNameFont;
  }
  if (settings.yAxisRightNameWeight !== undefined) {
    elements.yAxisRightNameWeight.value = settings.yAxisRightNameWeight;
  }
  if (settings.yMin !== undefined) {
    elements.yMin.value = settings.yMin;
  }
  if (settings.yMax !== undefined) {
    elements.yMax.value = settings.yMax;
  }
  if (settings.xAxisRotate !== undefined) {
    elements.xAxisRotate.value = settings.xAxisRotate;
  }
  if (settings.chartTitle !== undefined) {
    elements.chartTitle.value = settings.chartTitle;
  }
  if (settings.chartSubtitle !== undefined) {
    elements.chartSubtitle.value = settings.chartSubtitle;
  }
  if (settings.titleLeft !== undefined) {
    elements.titleLeft.value = settings.titleLeft;
  }
  if (settings.titleTop !== undefined) {
    elements.titleTop.value = settings.titleTop;
  }
  if (settings.titleAlign !== undefined) {
    elements.titleAlign.value = settings.titleAlign;
  }
  if (settings.titleSize !== undefined) {
    elements.titleSize.value = settings.titleSize;
  }
  if (settings.subtitleSize !== undefined) {
    elements.subtitleSize.value = settings.subtitleSize;
  }
  if (settings.legendSize !== undefined) {
    elements.legendSize.value = settings.legendSize;
  }
  if (settings.legendPosition !== undefined) {
    elements.legendPosition.value = settings.legendPosition;
  }
  if (settings.legendFont !== undefined) {
    elements.legendFont.value = settings.legendFont;
  }
  if (settings.legendWeight !== undefined) {
    elements.legendWeight.value = settings.legendWeight;
  }
  if (settings.renderer !== undefined) {
    elements.renderer.value = settings.renderer;
  }
  if (settings.palette !== undefined) {
    elements.palette.value = settings.palette;
  }
  if (settings.customColors !== undefined) {
    elements.customColors.value = settings.customColors;
  }
  if (settings.fontFamily !== undefined) {
    elements.fontFamily.value = settings.fontFamily;
  }
  if (settings.textColor !== undefined) {
    elements.textColor.value = settings.textColor;
  }
  if (settings.gridColor !== undefined) {
    elements.gridColor.value = settings.gridColor;
  }
  if (settings.transparentBg !== undefined) {
    elements.transparentBg.checked = settings.transparentBg;
  }
  if (settings.backgroundColor !== undefined) {
    elements.backgroundColor.value = settings.backgroundColor;
  }
  if (settings.watermarkEnabled !== undefined) {
    elements.watermarkEnabled.checked = settings.watermarkEnabled;
  }
  if (settings.watermarkOpacity !== undefined) {
    elements.watermarkOpacity.value = settings.watermarkOpacity;
  }
  if (settings.watermarkScale !== undefined) {
    elements.watermarkScale.value = settings.watermarkScale;
  }
  if (settings.exportName !== undefined) {
    elements.exportName.value = settings.exportName;
  }
  if (settings.exportScale !== undefined) {
    elements.exportScale.value = settings.exportScale;
  }
  if (settings.histogramColumn !== undefined) {
    elements.histogramColumn.value = settings.histogramColumn;
  }
  if (settings.histogramBins !== undefined) {
    elements.histogramBins.value = settings.histogramBins;
  }
  if (settings.waterfallColumn !== undefined) {
    elements.waterfallColumn.value = settings.waterfallColumn;
  }
  if (settings.waterfallMode !== undefined) {
    elements.waterfallMode.value = settings.waterfallMode;
  }
  if (settings.waterfallPositive !== undefined) {
    elements.waterfallPositive.value = settings.waterfallPositive;
  }
  if (settings.waterfallNegative !== undefined) {
    elements.waterfallNegative.value = settings.waterfallNegative;
  }
  if (settings.compareMode !== undefined && elements.compareMode) {
    elements.compareMode.value = settings.compareMode;
  }
  if (settings.dateRangePreset !== undefined && elements.dateRangePreset) {
    elements.dateRangePreset.value = settings.dateRangePreset;
  }
  if (settings.dateStart !== undefined) {
    elements.dateStart.value = settings.dateStart;
  }
  if (settings.dateEnd !== undefined) {
    elements.dateEnd.value = settings.dateEnd;
  }
  if (settings.advancedJson !== undefined) {
    elements.advancedJson.value = settings.advancedJson;
  }
  if (settings.chartWidth !== undefined || settings.chartHeight !== undefined) {
    const width = parseNumber(settings.chartWidth);
    const height = parseNumber(settings.chartHeight);
    setChartDimensions(width, height);
    scheduleChartResize();
  }

  syncWatermarkState();
  syncDateFilterState();

  if (elements.renderer.value !== previousRenderer) {
    initChart();
  }
}

function buildSnapshot() {
  return {
    data: {
      rows: clone(currentRows),
      columns: clone(currentColumns),
      datasets: clone(state.datasets),
      activeDatasetId: state.activeDatasetId,
    },
    settings: getSettings(),
    seriesOverrides: clone(state.seriesOverrides),
    annotations: clone(state.annotations),
  };
}

function applySnapshot(snapshot) {
  if (!snapshot) {
    return;
  }
  const datasets = clone(snapshot.data?.datasets);
  if (datasets && datasets.length) {
    state.datasets = datasets;
    state.activeDatasetId =
      snapshot.data?.activeDatasetId || state.datasets[0].id;
    const active =
      state.datasets.find((entry) => entry.id === state.activeDatasetId) ||
      state.datasets[0];
    currentRows = active.rows || [];
    currentColumns = active.columns || [];
    updateStatusForDataset(active);
  } else {
    currentRows = clone(snapshot.data?.rows) || [];
    currentColumns = clone(snapshot.data?.columns) || [];
    state.datasets = [];
    if (currentRows.length || currentColumns.length) {
      const fallback = createDataset("Imported data", currentRows, currentColumns);
      state.datasets = [fallback];
      state.activeDatasetId = fallback.id;
      updateStatusForDataset(fallback);
    } else {
      state.activeDatasetId = null;
      updateStatus("No rows found", true);
    }
  }

  refreshColumnControls();
  renderPreview();
  renderDatasetList();
  applyControlSettings(snapshot.settings || {});
  syncQuickEditorFromControls();
  setSelectedYColumns(snapshot.settings?.yColumns || []);

  state.seriesOverrides = clone(snapshot.seriesOverrides) || {};
  state.annotations = clone(snapshot.annotations) || {
    events: [],
    bands: [],
    callouts: [],
  };

  syncBackgroundState();
  syncChartModeUI();
  renderSeriesOverrides();
  renderAnnotations();
  updateChart();
}

function loadProjectStore() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

function saveProjectStore() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects));
}

function renderProjectSelect() {
  elements.projectSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select project";
  elements.projectSelect.appendChild(placeholder);

  state.projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.name;
    if (project.id === state.currentProjectId) {
      option.selected = true;
    }
    elements.projectSelect.appendChild(option);
  });
}

function renderHistorySelect(project) {
  elements.historySelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select snapshot";
  elements.historySelect.appendChild(placeholder);

  if (!project || !project.history) {
    return;
  }

  project.history.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.id;
    option.textContent = `${formatTimestamp(entry.timestamp)}`;
    elements.historySelect.appendChild(option);
  });
}

function renderTemplateSelect() {
  elements.templateSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select template";
  elements.templateSelect.appendChild(placeholder);

  templates.forEach((template) => {
    const option = document.createElement("option");
    option.value = template.id;
    option.textContent = template.name;
    elements.templateSelect.appendChild(option);
  });
}

function saveProject(asNew) {
  const name = elements.projectName.value.trim() || "Untitled";
  const snapshot = buildSnapshot();
  let project = null;

  if (!asNew && state.currentProjectId) {
    project = state.projects.find(
      (entry) => entry.id === state.currentProjectId
    );
  }

  if (!project) {
    project = {
      id: createId("project"),
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      snapshot,
      history: [],
    };
    state.projects.unshift(project);
    state.currentProjectId = project.id;
  } else {
    project.name = name;
    project.updatedAt = Date.now();
    project.snapshot = snapshot;
  }

  project.history.unshift({
    id: createId("snapshot"),
    timestamp: Date.now(),
    snapshot,
  });
  project.history = project.history.slice(0, HISTORY_LIMIT);

  saveProjectStore();
  renderProjectSelect();
  renderHistorySelect(project);
  elements.projectName.value = name;
  updateProjectStatus("Project saved.", false);
}

function loadProjectById(projectId) {
  const project = state.projects.find((entry) => entry.id === projectId);
  if (!project) {
    updateProjectStatus("Project not found.", true);
    return;
  }
  state.currentProjectId = project.id;
  elements.projectName.value = project.name;
  applySnapshot(project.snapshot);
  renderProjectSelect();
  renderHistorySelect(project);
  updateProjectStatus("Project loaded.", false);
}

function newProject() {
  state.currentProjectId = null;
  elements.projectName.value = "";
  updateProjectStatus("New project started.", false);
}

function deleteProject() {
  if (!state.currentProjectId) {
    updateProjectStatus("Select a project to delete.", true);
    return;
  }
  state.projects = state.projects.filter(
    (entry) => entry.id !== state.currentProjectId
  );
  state.currentProjectId = null;
  saveProjectStore();
  renderProjectSelect();
  renderHistorySelect(null);
  elements.projectName.value = "";
  updateProjectStatus("Project deleted.", false);
}

function duplicateProject() {
  const project = state.projects.find(
    (entry) => entry.id === state.currentProjectId
  );
  if (!project) {
    updateProjectStatus("Select a project to duplicate.", true);
    return;
  }
  const clonedSnapshot = clone(project.snapshot);
  const duplicate = {
    id: createId("project"),
    name: `Copy of ${project.name}`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    snapshot: clonedSnapshot,
    history: [
      {
        id: createId("snapshot"),
        timestamp: Date.now(),
        snapshot: clonedSnapshot,
      },
    ],
  };
  state.projects.unshift(duplicate);
  state.currentProjectId = duplicate.id;
  elements.projectName.value = duplicate.name;
  saveProjectStore();
  renderProjectSelect();
  renderHistorySelect(duplicate);
  applySnapshot(duplicate.snapshot);
  updateProjectStatus("Project duplicated.", false);
}

function restoreHistory() {
  const project = state.projects.find(
    (entry) => entry.id === state.currentProjectId
  );
  if (!project) {
    updateProjectStatus("Select a project first.", true);
    return;
  }
  const snapshotId = elements.historySelect.value;
  const historyEntry = project.history.find((entry) => entry.id === snapshotId);
  if (!historyEntry) {
    updateProjectStatus("Select a snapshot to restore.", true);
    return;
  }
  project.snapshot = clone(historyEntry.snapshot);
  project.updatedAt = Date.now();
  saveProjectStore();
  applySnapshot(project.snapshot);
  updateProjectStatus("Snapshot restored.", false);
}

function branchFromHistory() {
  const project = state.projects.find(
    (entry) => entry.id === state.currentProjectId
  );
  if (!project) {
    updateProjectStatus("Select a project first.", true);
    return;
  }
  const snapshotId = elements.historySelect.value;
  const historyEntry = project.history.find((entry) => entry.id === snapshotId);
  if (!historyEntry) {
    updateProjectStatus("Select a snapshot to branch.", true);
    return;
  }

  const snapshot = clone(historyEntry.snapshot);
  const branched = {
    id: createId("project"),
    name: `Branch of ${project.name}`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    snapshot,
    history: [
      {
        id: createId("snapshot"),
        timestamp: Date.now(),
        snapshot,
      },
    ],
  };
  state.projects.unshift(branched);
  state.currentProjectId = branched.id;
  elements.projectName.value = branched.name;
  saveProjectStore();
  renderProjectSelect();
  renderHistorySelect(branched);
  applySnapshot(branched.snapshot);
  updateProjectStatus("Branched from snapshot.", false);
}

function applyTemplate() {
  const templateId = elements.templateSelect.value;
  const template = templates.find((entry) => entry.id === templateId);
  if (!template) {
    updateProjectStatus("Select a template to apply.", true);
    return;
  }

  const data = parseCsvToData(template.csv);
  const dataset = {
    id: createId("dataset"),
    name: `${template.name} data`,
    rows: data.rows,
    columns: data.columns,
    createdAt: Date.now(),
  };
  const snapshot = {
    data: {
      rows: data.rows,
      columns: data.columns,
      datasets: [dataset],
      activeDatasetId: dataset.id,
    },
    settings: template.settings || {},
    seriesOverrides: clone(template.seriesOverrides || {}),
    annotations: clone(template.annotations || {}),
  };
  applySnapshot(snapshot);
  elements.projectName.value = template.name;
  updateProjectStatus("Template applied.", false);
}

const resizeState = {
  active: false,
  handle: null,
  startX: 0,
  startY: 0,
  startWidth: 0,
  startHeight: 0,
  startLeft: 0,
  startTop: 0,
};

function handleResizeStart(event) {
  const handle = event.currentTarget.dataset.handle;
  if (!handle) {
    return;
  }
  event.preventDefault();
  const rect = elements.chartShell.getBoundingClientRect();
  const style = window.getComputedStyle(elements.chartShell);
  const startLeft = parseFloat(style.left);
  const startTop = parseFloat(style.top);
  resizeState.active = true;
  resizeState.handle = handle;
  resizeState.startX = event.clientX;
  resizeState.startY = event.clientY;
  resizeState.startWidth = rect.width;
  resizeState.startHeight = rect.height;
  resizeState.startLeft = Number.isFinite(startLeft) ? startLeft : 0;
  resizeState.startTop = Number.isFinite(startTop) ? startTop : 0;
  document.body.style.userSelect = "none";
  document.addEventListener("mousemove", handleResizeMove);
  document.addEventListener("mouseup", handleResizeEnd);
}

function handleResizeMove(event) {
  if (!resizeState.active) {
    return;
  }
  const dx = event.clientX - resizeState.startX;
  const dy = event.clientY - resizeState.startY;
  let nextWidth = resizeState.startWidth;
  let nextHeight = resizeState.startHeight;
  let nextLeft = resizeState.startLeft;
  let nextTop = resizeState.startTop;

  if (resizeState.handle.includes("right")) {
    nextWidth = resizeState.startWidth + dx;
  }
  if (resizeState.handle.includes("left")) {
    nextWidth = resizeState.startWidth - dx;
    nextLeft = resizeState.startLeft + dx;
  }
  if (resizeState.handle.includes("bottom")) {
    nextHeight = resizeState.startHeight + dy;
  }
  if (resizeState.handle.includes("top")) {
    nextHeight = resizeState.startHeight - dy;
    nextTop = resizeState.startTop + dy;
  }

  const clampedWidth = Math.max(nextWidth, MIN_CHART_WIDTH);
  const clampedHeight = Math.max(nextHeight, MIN_CHART_HEIGHT);
  if (resizeState.handle.includes("left")) {
    const widthDelta = resizeState.startWidth - clampedWidth;
    nextLeft = resizeState.startLeft + widthDelta;
  }
  if (resizeState.handle.includes("top")) {
    const heightDelta = resizeState.startHeight - clampedHeight;
    nextTop = resizeState.startTop + heightDelta;
  }

  setChartDimensions(clampedWidth, clampedHeight, nextLeft, nextTop);
  scheduleChartResize();
}

function handleResizeEnd() {
  resizeState.active = false;
  resizeState.handle = null;
  document.body.style.userSelect = "";
  document.removeEventListener("mousemove", handleResizeMove);
  document.removeEventListener("mouseup", handleResizeEnd);
}

function attachResizeHandles() {
  elements.chartShell
    .querySelectorAll(".resize-handle")
    .forEach((handle) => {
      handle.addEventListener("mousedown", handleResizeStart);
    });
}

function attachListeners() {
  elements.csvFile.addEventListener("change", (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    files.forEach((file) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors && results.errors.length) {
            updateStatus("CSV parse error", true);
          }
          const rows = results.data || [];
          const columns = results.meta.fields || [];
          addDataset(file.name, rows, columns);
        },
      });
    });
    event.target.value = "";
  });

  elements.parsePaste.addEventListener("click", () => {
    if (!elements.csvPaste.value.trim()) {
      updateStatus("Paste CSV to parse", true);
      return;
    }
    parseCsvText(elements.csvPaste.value);
  });

  elements.loadSample.addEventListener("click", () => {
    const data = parseCsvToData(sampleCsv);
    addDataset("Sample dataset", data.rows, data.columns);
  });

  if (elements.apiFetch && apiEnabled) {
    elements.apiFetch.addEventListener("click", () => {
      fetchApiDataset();
    });
  }

  if (elements.apiBaseUrl && apiEnabled) {
    const handleBaseUrlUpdate = () => {
      setApiBaseUrl(elements.apiBaseUrl.value);
      updateApiStatus("", false);
    };
    elements.apiBaseUrl.addEventListener("change", handleBaseUrlUpdate);
    elements.apiBaseUrl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleBaseUrlUpdate();
      }
    });
  }

  if (elements.apiProvider && apiEnabled) {
    elements.apiProvider.addEventListener("change", () => {
      syncApiProviderUI();
      updateApiStatus("", false);
      syncApiControls();
    });
  }

  if (elements.apiClear && apiEnabled) {
    elements.apiClear.addEventListener("click", () => {
      clearApiForm();
    });
  }

  if (elements.defillamaMetric) {
    elements.defillamaMetric.addEventListener("change", () => {
      syncDefillamaChainOptions();
    });
  }

  if (elements.defillamaProtocol) {
    elements.defillamaProtocol.addEventListener("input", () => {
      syncDefillamaChainOptions();
    });
  }

  if (elements.defillamaLoad) {
    elements.defillamaLoad.addEventListener("click", () => {
      try {
        if (elements.apiProvider) {
          elements.apiProvider.value = "defillama";
        }
        syncApiProviderUI();
        const request = buildDefillamaRequest();
        if (elements.apiEndpoint) {
          elements.apiEndpoint.value = request.path;
        }
        if (elements.apiJsonPath) {
          elements.apiJsonPath.value = request.jsonPath;
        }
        if (elements.apiDatasetName) {
          elements.apiDatasetName.value = request.datasetName;
        }
        updateDefillamaStatus("", false);
        fetchApiDataset();
      } catch (error) {
        updateDefillamaStatus(
          error instanceof Error ? error.message : "Invalid selection.",
          true
        );
      }
    });
  }

  if (elements.tokenTerminalLoadPrice) {
    elements.tokenTerminalLoadPrice.addEventListener("click", () => {
      try {
        if (elements.apiProvider) {
          elements.apiProvider.value = "tokenterminal";
        }
        syncApiProviderUI();
        const request = buildTokenTerminalPriceRequest();
        if (elements.apiEndpoint) {
          elements.apiEndpoint.value = request.path;
        }
        if (elements.apiJsonPath) {
          elements.apiJsonPath.value = request.jsonPath;
        }
        if (elements.apiDatasetName) {
          elements.apiDatasetName.value = request.datasetName;
        }
        updateTokenTerminalStatus("", false);
        fetchApiDataset();
      } catch (error) {
        updateTokenTerminalStatus(
          error instanceof Error ? error.message : "Invalid selection.",
          true
        );
      }
    });
  }

  if (elements.tokenTerminalAddCoin) {
    elements.tokenTerminalAddCoin.addEventListener("click", () => {
      addTokenTerminalSelection(elements.tokenTerminalProject?.value || "");
    });
  }

  if (elements.tokenTerminalClearCoins) {
    elements.tokenTerminalClearCoins.addEventListener("click", () => {
      clearTokenTerminalSelections();
      updateTokenTerminalStatus("Cleared coin list.", false);
    });
  }

  if (elements.tokenTerminalProject) {
    elements.tokenTerminalProject.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addTokenTerminalSelection(elements.tokenTerminalProject.value || "");
      }
    });
  }

  if (apiEnabled) {
    [
      elements.apiEndpoint,
      elements.apiDatasetName,
      elements.apiJsonPath,
      elements.apiSdkArgs,
    ]
      .filter(Boolean)
      .forEach((input) => {
        input.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            fetchApiDataset();
          }
        });
      });
  }

  elements.clearData.addEventListener("click", () => {
    if (!state.activeDatasetId) {
      updateStatus("No CSV loaded", false);
      return;
    }
    removeDataset(state.activeDatasetId);
  });

  elements.clearAllData.addEventListener("click", () => {
    clearAllDatasets();
  });

  if (elements.clearDateRange) {
    elements.clearDateRange.addEventListener("click", () => {
      elements.dateStart.value = "";
      elements.dateEnd.value = "";
      if (elements.dateRangePreset) {
        elements.dateRangePreset.value = "all";
      }
      syncDateFilterState();
      zoomSnapshot = null;
      scheduleUpdateChart();
    });
  }

  const handleDateChange = () => {
    const hasValue = elements.dateStart.value || elements.dateEnd.value;
    if (hasValue && elements.xAxisType.value !== "time") {
      elements.xAxisType.value = "time";
    }
    if (!suppressDatePresetSync && elements.dateRangePreset) {
      elements.dateRangePreset.value = hasValue ? "custom" : "all";
    }
    syncDateFilterState();
    zoomSnapshot = null;
    scheduleUpdateChart();
  };

  if (elements.dateRangePreset) {
    elements.dateRangePreset.addEventListener("change", () => {
      applyDateRangePreset(elements.dateRangePreset.value);
    });
  }

  if (elements.dateStart && elements.dateEnd) {
    elements.dateStart.addEventListener("input", handleDateChange);
    elements.dateStart.addEventListener("change", handleDateChange);
    elements.dateEnd.addEventListener("input", handleDateChange);
    elements.dateEnd.addEventListener("change", handleDateChange);
  }

  if (elements.xColumn) {
    elements.xColumn.addEventListener("change", () => {
      autoSetAxisTypeFromX();
      scheduleUpdateChart();
    });
  }

  elements.chartType.addEventListener("change", () => {
    syncChartModeUI();
    renderSeriesOverrides();
    scheduleUpdateChart();
  });

  if (elements.applyRecommendation) {
    elements.applyRecommendation.addEventListener("click", () => {
      const recommendation = getRecommendedChartType();
      if (!recommendation) {
        return;
      }
      elements.chartType.value = recommendation.value;
      syncChartModeUI();
      renderSeriesOverrides();
      scheduleUpdateChart();
    });
  }

  elements.palette.addEventListener("change", () => {
    renderSeriesOverrides();
    scheduleUpdateChart();
  });

  elements.smooth.addEventListener("change", () => {
    renderSeriesOverrides();
  });

  elements.stackedPercent.addEventListener("change", () => {
    if (elements.stackedPercent.checked) {
      elements.stacked.checked = true;
    }
    scheduleUpdateChart();
  });

  const inputsToWatch = [
    elements.xColumn,
    elements.compareMode,
    elements.comboDefaultType,
    elements.stacked,
    elements.smooth,
    elements.showSymbols,
    elements.showLabels,
    elements.sortByX,
    elements.lineWidth,
    elements.symbolSize,
    elements.areaOpacity,
    elements.barWidth,
    elements.barGap,
    elements.barCategoryGap,
    elements.xAxisType,
    elements.yScale,
    elements.yScaleRight,
    elements.xAxisLabel,
    elements.yAxisLabel,
    elements.yAxisRightLabel,
    elements.xAxisLabelSize,
    elements.xAxisNameSize,
    elements.xAxisLabelFont,
    elements.xAxisLabelWeight,
    elements.xAxisNameFont,
    elements.xAxisNameWeight,
    elements.yAxisLabelSize,
    elements.yAxisNameSize,
    elements.yAxisLabelFont,
    elements.yAxisLabelWeight,
    elements.yAxisNameFont,
    elements.yAxisNameWeight,
    elements.yAxisRightLabelSize,
    elements.yAxisRightNameSize,
    elements.yAxisRightLabelFont,
    elements.yAxisRightLabelWeight,
    elements.yAxisRightNameFont,
    elements.yAxisRightNameWeight,
    elements.yMin,
    elements.yMax,
    elements.xAxisRotate,
    elements.chartTitle,
    elements.chartSubtitle,
    elements.titleLeft,
    elements.titleTop,
    elements.titleAlign,
    elements.titleSize,
    elements.subtitleSize,
    elements.legendSize,
    elements.legendPosition,
    elements.legendFont,
    elements.legendWeight,
    elements.customColors,
    elements.fontFamily,
    elements.textColor,
    elements.gridColor,
    elements.transparentBg,
    elements.backgroundColor,
    elements.watermarkEnabled,
    elements.watermarkOpacity,
    elements.watermarkScale,
    elements.histogramColumn,
    elements.histogramBins,
    elements.waterfallColumn,
    elements.waterfallMode,
    elements.waterfallPositive,
    elements.waterfallNegative,
  ];

  inputsToWatch.forEach((input) => {
    input.addEventListener("input", scheduleUpdateChart);
    input.addEventListener("change", scheduleUpdateChart);
  });

  elements.xAxisType.addEventListener("change", () => {
    syncDateFilterState();
  });

  elements.renderer.addEventListener("change", () => {
    initChart();
    scheduleUpdateChart();
  });

  elements.applyAdvanced.addEventListener("click", scheduleUpdateChart);

  elements.clearAdvanced.addEventListener("click", () => {
    elements.advancedJson.value = "";
    updateAdvancedStatus("", false);
    scheduleUpdateChart();
  });

  elements.transparentBg.addEventListener("change", () => {
    syncBackgroundState();
  });

  if (elements.watermarkEnabled) {
    elements.watermarkEnabled.addEventListener("change", () => {
      syncWatermarkState();
    });
  }

  if (elements.watermarkOpacity) {
    elements.watermarkOpacity.addEventListener("input", () => {
      syncWatermarkState();
    });
  }

  if (elements.watermarkScale) {
    elements.watermarkScale.addEventListener("input", () => {
      syncWatermarkState();
    });
  }

  elements.copyPng.addEventListener("click", () => {
    copyChart();
  });

  elements.downloadPng.addEventListener("click", () => {
    downloadChart();
  });

  elements.copyPngQuick.addEventListener("click", () => {
    copyChart();
  });

  elements.downloadPngQuick.addEventListener("click", () => {
    downloadChart();
  });

  elements.toggleFullscreen.addEventListener("click", () => {
    toggleFullscreen();
  });

  elements.pickTitlePosition.addEventListener("click", () => {
    setTitlePickMode(!titlePickMode);
  });

  elements.resetChart.addEventListener("click", () => {
    resetChartSettings();
  });

  elements.openAxisEditor.addEventListener("click", () => {
    openQuickEditor(null, "Axis text editor", "x");
  });

  elements.closeQuickText.addEventListener("click", () => {
    closeQuickEditor();
  });

  [
    elements.quickAxisLabelSize,
    elements.quickAxisNameSize,
    elements.quickAxisLabelFont,
    elements.quickAxisLabelWeight,
    elements.quickAxisNameFont,
    elements.quickAxisNameWeight,
  ].forEach((input) => {
    input.addEventListener("input", syncControlsFromQuickEditor);
    input.addEventListener("change", syncControlsFromQuickEditor);
  });

  [
    elements.xAxisLabelSize,
    elements.xAxisNameSize,
    elements.xAxisLabelFont,
    elements.xAxisLabelWeight,
    elements.xAxisNameFont,
    elements.xAxisNameWeight,
    elements.yAxisLabelSize,
    elements.yAxisNameSize,
    elements.yAxisLabelFont,
    elements.yAxisLabelWeight,
    elements.yAxisNameFont,
    elements.yAxisNameWeight,
    elements.yAxisRightLabelSize,
    elements.yAxisRightNameSize,
    elements.yAxisRightLabelFont,
    elements.yAxisRightLabelWeight,
    elements.yAxisRightNameFont,
    elements.yAxisRightNameWeight,
  ].forEach((input) => {
    input.addEventListener("input", () => {
      if (quickEditorOpen) {
        syncQuickEditorFromControls();
      }
    });
    input.addEventListener("change", () => {
      if (quickEditorOpen) {
        syncQuickEditorFromControls();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeQuickEditor();
      if (titlePickMode) {
        setTitlePickMode(false);
      }
    }
  });

  elements.addEvent.addEventListener("click", () => {
    addEventAnnotation();
  });

  elements.addBand.addEventListener("click", () => {
    addBandAnnotation();
  });

  elements.addCallout.addEventListener("click", () => {
    addCalloutAnnotation();
  });

  elements.newProject.addEventListener("click", () => {
    newProject();
  });

  elements.saveProject.addEventListener("click", () => {
    saveProject(false);
  });

  elements.saveAsProject.addEventListener("click", () => {
    saveProject(true);
  });

  elements.loadProject.addEventListener("click", () => {
    if (!elements.projectSelect.value) {
      updateProjectStatus("Select a project to load.", true);
      return;
    }
    loadProjectById(elements.projectSelect.value);
  });

  elements.deleteProject.addEventListener("click", () => {
    deleteProject();
  });

  elements.duplicateProject.addEventListener("click", () => {
    duplicateProject();
  });

  elements.restoreHistory.addEventListener("click", () => {
    restoreHistory();
  });

  elements.branchHistory.addEventListener("click", () => {
    branchFromHistory();
  });

  elements.applyTemplate.addEventListener("click", () => {
    applyTemplate();
  });

  document.addEventListener("fullscreenchange", () => {
    updateFullscreenButton();
    scheduleChartResize();
  });

  window.addEventListener("resize", () => {
    clampChartSize();
    scheduleChartResize();
  });
}

state.projects = loadProjectStore();
renderProjectSelect();
renderTemplateSelect();
setApiAvailability();
initChart();
attachListeners();
initControlLayout();
attachResizeHandles();
clampChartSize();
scheduleChartResize();
syncBackgroundState();
syncWatermarkState();
syncChartModeUI();
syncDateFilterState();
renderSeriesOverrides();
renderAnnotations();
renderDatasetList();
updateChart();
updateFullscreenButton();
syncQuickEditorFromControls();
setTitlePickMode(false);
captureDefaultControlState();
loadDefillamaProtocols();

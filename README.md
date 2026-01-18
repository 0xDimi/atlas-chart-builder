# Atlas Chart Builder

Local-only chart builder for CSV data. Upload CSV files from DeFiLlama, Token Terminal, Artemis, Dune, CoinGecko, or any other source and export polished charts with transparent backgrounds.

## Run locally

From the project directory:

```bash
cp .env.example .env
node server.js
```

Open `http://localhost:5173` in your browser.

## Notes

- Copy to clipboard works only on `http://localhost` or `https`.
- Transparent backgrounds export to PNG alpha by default.
- Use the Advanced overrides box to paste full ECharts JSON options for complete control.
- If you only need local CSVs (no API connectors), you can run
  `python3 -m http.server 5173` instead.

## API connectors

Add your keys in `.env`:

```
DEFILLAMA_API_KEY=your_key_here
TOKEN_TERMINAL_API_KEY=your_key_here
```

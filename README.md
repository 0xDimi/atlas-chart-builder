# Atlas Chart Builder

CSV chart builder for local or public use. Upload CSV files from DeFiLlama, Token Terminal, Artemis, Dune, CoinGecko, or any other source and export polished charts with transparent backgrounds.

## Public hosting (static, no APIs)

The app is static and can be hosted from the repo root. API connectors are disabled on public hosts.

GitHub Pages:
1. Push the repo to GitHub.
2. Go to Settings -> Pages.
3. Deploy from branch `main` and folder `/`.

Netlify:
- Build command: none
- Publish directory: `/`

Vercel:
- Framework preset: Other
- Output directory: `/`

## Run locally

Static (no APIs):

```bash
python3 -m http.server 5173
```

Optional local API connectors:

```bash
cp .env.example .env
node server.js
```

Add API keys in `.env` before starting the server.

Open `http://localhost:5173` in your browser.

## Notes

- Copy to clipboard works only on `https` or `http://localhost`.
- Transparent backgrounds export to PNG alpha by default.
- Use the Advanced overrides box to paste full ECharts JSON options for complete control.

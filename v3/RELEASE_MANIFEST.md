# V3 handoff archive

This archive contains the runnable latest V3 prototype plus the assets and implementation notes needed to review or continue it.

## Included

- `src/` — V3 implementation plus the shared V2 components and base styles required by the app
- `public/` — product imagery, fonts, motion media and all responsive science-v3 plates
- `dist/` — the latest production build
- `planning/v3/` — motion/nav plan, Higgsfield prompts, asset manifest, lookdev sources, wireframes and implementation notes
- `comparison_execution/` — final audit and recommendation documents relevant to the V3 handoff
- `package.json`, `package-lock.json`, `tsconfig.json`, `index.html`, `README.md`

## Run

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5174/?version=v3` for V3. The default `/` route remains the V2 comparison baseline.

The archive intentionally excludes `node_modules`, `.git`, temporary files and unrelated intermediate exports.

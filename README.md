# Taste of Lebanon — Digital Menu (React + Vite)

A proper React project, converted from the original in-browser Babel/CDN setup
into a standard Vite-bundled app. No more `text/babel` script tags — this is
now compiled JSX with real ES module imports, and the images are bundled by
Vite instead of being loaded as loose files.

## Project structure

```
amber-table-react/
├── index.html            # Vite entry HTML (Bootstrap/FontAwesome/fonts via CDN)
├── package.json
├── vite.config.js
├── public/
│   └── Pictures/          # original menu photos
└── src/
    ├── main.jsx           # ReactDOM.createRoot(...).render(<App />)
    ├── App.jsx            # main App component (state, filtering, cart logic)
    ├── components.jsx     # ThemeToggle, TagChip, ItemCard, CartDrawer
    ├── data.js             # MENU_DATA + fetchMenu(), images imported as modules
    └── index.css           # all custom styles (theme variables, cards, cart, etc.)
```

## What changed from the original

- Removed the CDN `react`, `react-dom`, and `babel-standalone` script tags —
  React now comes from `node_modules` via `npm install`, and JSX is compiled
  by Vite/esbuild at build time instead of in the browser at runtime.
- Split files (`data.js`, `components.js`, `app.js`) now use `import`/`export`
  instead of relying on script load order and global variables.
- Images are imported directly in `data.js` (e.g. `import grape from
  "../public/Pictures/grape (1).jpg"`), so Vite bundles, hashes, and
  optimizes them automatically instead of referencing loose relative paths.
- Bootstrap, Font Awesome, and Google Fonts are still pulled from CDNs in
  `index.html`, matching the original.

## Running it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

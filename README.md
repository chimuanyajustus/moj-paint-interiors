# MOJ Paint & Interiors

A React storefront + admin dashboard for MOJ Paint & Interiors, built with
Vite, Tailwind CSS, lucide-react icons, and Recharts for the admin sales chart.

## Getting started

1. Make sure you have [Node.js](https://nodejs.org) 18+ installed.
2. Open this folder in VS Code (or your terminal).
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open the URL Vite prints (usually `http://localhost:5173`) in your browser.

## Building for production / hosting

```bash
npm run build
```

This outputs a static site into the `dist/` folder, which you can upload to
any static host (Netlify, Vercel, GitHub Pages, cPanel, etc.).

## Project structure

```
moj-paint-app/
├── index.html          Entry HTML page
├── package.json         Dependencies & scripts
├── vite.config.js        Vite build config
├── tailwind.config.js    Tailwind CSS config
├── postcss.config.js     PostCSS config (required by Tailwind)
└── src/
    ├── main.jsx          React entry point, mounts <App />
    ├── App.jsx           The entire storefront + admin app (single component)
    └── index.css         Tailwind directives
```

## Things to configure before going live

- **WhatsApp number:** open `src/App.jsx` and find the `WHATSAPP_NUMBER`
  constant near the top — swap in your real WhatsApp Business number
  (international format, no `+` or spaces, e.g. `2348012345678`).
- **Product photos:** each product already has a real photo embedded as
  base64 (from the images you uploaded). To swap or add more, set a
  product's `photoUrl` field to a hosted image URL — once this site is on
  its own domain, hotlinked photos will work fine (this only needed to be
  base64 for Claude's in-chat preview).
- **Admin dashboard:** currently uses in-memory demo data (no real backend/
  database) — orders, products, etc. reset on page refresh. Hook it up to
  a real backend (e.g. Supabase, Firebase, or a custom API) when you're
  ready to persist real data.
- **Payments:** the checkout flow hands orders off to WhatsApp for manual
  confirmation and payment. If you want in-app Paystack payments instead,
  that's a separate integration.

# JLPT Path 🎌

A complete self-study platform for learning Japanese from zero through JLPT N5 and N4.

---

## 🚀 Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy to GitHub Pages

### Option A — Automatic (GitHub Actions)

Every push to `main` auto-deploys. Just enable Pages in your repo settings:

1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` — done ✅

Your live URL: `https://YOUR_USERNAME.github.io/jlpt-path/`

> ⚠️ If your repo is named differently, update `basePath` and `assetPrefix`
> in `next.config.js` to match your repo name exactly.

### Option B — Manual deploy

```bash
npm install
npm run deploy
```

Then in **Settings → Pages**, set source to the `gh-pages` branch.

---

## 📁 Project Structure

```
src/
  app/          # All Next.js pages (App Router)
  components/   # Reusable UI components
  data/         # Seed data — vocab, kanji, grammar, etc.
  store/        # Progress tracking (localStorage)
  types/        # TypeScript types
  lib/          # Utility functions
```

---

## ⚙️ next.config.js explained

| Setting | Why it's needed |
|---|---|
| `output: 'export'` | Generates a static `/out` folder |
| `basePath: '/jlpt-path'` | Matches the GitHub repo sub-path |
| `assetPrefix: '/jlpt-path'` | Ensures CSS/JS load from the right path |
| `trailingSlash: true` | Each page gets its own folder — required for GH Pages |
| `images: { unoptimized: true }` | next/image doesn't work in static export mode |

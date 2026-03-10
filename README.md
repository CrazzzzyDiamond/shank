# Shank

Real-time pitch training for brass and woodwind musicians. Play a note — get instant feedback.

## Stack

- React 19 + TypeScript, Vite, pnpm monorepo
- VexFlow (notation), YIN algorithm (pitch detection), TailwindCSS v4

## Dev

```bash
pnpm install
pnpm dev        # localhost:5173
pnpm build
pnpm build:gh-pages
```

## Structure

```
apps/web          # React app
packages/music    # instrument configs, note utils
packages/pitch    # YIN pitch detection
```

## Deploy

Push to `main` → GitHub Actions builds and deploys to GitHub Pages.

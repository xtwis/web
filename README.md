# xtwis/web

Documentation site for the [xtwis](https://github.com/xtwis) organization.

Built with [VitePress](https://vitepress.dev/).

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Structure

- `docs/` — VitePress source (this repo's own content).
- `docs/packages/` — _generated_, not committed. Synced from each package repo's `docs/` during CI build.

## Deployment

Pushed to GitHub Pages via `.github/workflows/deploy.yml` on a daily cron plus
`workflow_dispatch`. See the workflow file for details.

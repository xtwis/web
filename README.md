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
- `docs/<locale>/<slug>/` — _generated_, not committed. Synced from each package repo's `docs/` during Vercel build (`pnpm build:sync`).

## Deployment

Triggered on push to `main` via `.github/workflows/ci.yml` (after lint passes) and on `repository_dispatch` events of type `docs-sync` via `.github/workflows/sync-docs.yml`.

Both workflows `POST` the deploy hook configured in `secrets.VERCEL_DEPLOY_HOOK`.

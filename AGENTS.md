# AGENTS.md

## Purpose
Public API generating UUID values (`v4` and `v7`).

## Repository Role
- Category: `*.api.airat.top` (public API project).
- Deployment platform: Cloudflare Workers.
- Main files: `worker.js`, `wrangler.toml`.
- Related browser tool: `../uuid.airat.top`.

## API Summary
- Live endpoint: `https://uuid.api.airat.top`.
- Status page: `https://status.airat.top`.
- Supports `GET` and `POST`.
- Params: `version` (`4`/`7`), optional `plain=1`.
- Health route: `/health`.

## AI Working Notes
- Keep default version as `v4`.
- Preserve validation behavior for unsupported versions.
- Keep plain-text mode stable for automation scripts.

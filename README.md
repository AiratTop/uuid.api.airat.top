# uuid.api.airat.top

![uuid](https://repository-images.githubusercontent.com/1142059601/3ff866cc-25b3-4282-b47a-fadadeb73b32)

Tiny Cloudflare Worker API that generates UUID v4 and UUID v7.

- Live endpoint: https://uuid.api.airat.top
- Status page: https://status.airat.top

You can use my Open Source [UUID generator](https://uuid.airat.top) to generate UUID v4/v7 in the browser ([GitHub repo](https://github.com/AiratTop/uuid.airat.top)).

## API

Default behavior:

- UUID version defaults to `v4`.
- Use `?version=7` (or `?version=v7`) to generate `v7`.

### GET

```http
GET /
```

Example (default v4):

```bash
curl 'https://uuid.api.airat.top/'
```

Response:

```json
{"uuid":"2f5b0b6b-2b54-4a2c-93c3-8e5f9a8e1a5c","version":"v4"}
```

Example (v7):

```bash
curl 'https://uuid.api.airat.top/?version=7'
```

Response:

```json
{"uuid":"0194f94c-29f6-7da7-a7f8-66f0f21ff923","version":"v7"}
```

Test in browser:

- https://uuid.api.airat.top/
- https://uuid.api.airat.top/?version=7

Plain response:

```bash
curl 'https://uuid.api.airat.top/?plain=1&version=7'
```

Response:

```text
0194f94c-29f6-7da7-a7f8-66f0f21ff923
```

### POST

POST also returns a fresh UUID.

```bash
curl -X POST 'https://uuid.api.airat.top/?version=7'
```

Response:

```json
{"uuid":"0194f94c-29f6-7da7-a7f8-66f0f21ff923","version":"v7"}
```

### Validation errors

Unsupported version returns `400`:

```bash
curl 'https://uuid.api.airat.top/?version=8'
```

```json
{"error":"Unsupported version. Use version=4 or version=7."}
```

### CORS

CORS is enabled for all origins (`*`).

## Privacy

No analytics or request logs are collected by this project.

## Monitoring

Health check endpoint:

```http
GET /health
```

Response:

```json
{"status":"ok"}
```

Test in browser: https://uuid.api.airat.top/health

## Project structure

- `worker.js` - Cloudflare Worker script.

## Deployment

Deploy with Wrangler (the repo already includes `wrangler.toml`):

```bash
npx wrangler deploy
```

If you use Cloudflare Workers Builds (GitHub integration), set the deploy command to `npx wrangler deploy` and keep the root path at `/`.

To serve it on a custom domain, add the domain in **Workers & Pages -> Domains & Routes**. Cloudflare will create the DNS record and issue SSL automatically.

## License

The original source code, configuration, and documentation in this repository are licensed under
the [Apache License 2.0](LICENSE), with copyright details in [NOTICE](NOTICE).

---

## Author

**AiratTop (Airat Halitov)**

- Website: [airat.top](https://airat.top)
- GitHub: [@AiratTop](https://github.com/AiratTop)
- Email: [mail@airat.top](mailto:mail@airat.top)
- Repository: [uuid.api.airat.top](https://github.com/AiratTop/uuid.api.airat.top)

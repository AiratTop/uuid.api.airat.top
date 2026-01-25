# uuid.api.airat.top

Tiny Cloudflare Worker that generates UUID v4.

Live endpoint: https://uuid.api.airat.top

## API

### GET

```
GET /
```

Example:

```bash
curl 'https://uuid.api.airat.top/'
```

Response:

```json
{"uuid":"2f5b0b6b-2b54-4a2c-93c3-8e5f9a8e1a5c"}
```

Test in browser: https://uuid.api.airat.top/

### POST

POST also returns a fresh UUID.

```bash
curl -X POST 'https://uuid.api.airat.top/'
```

Response:

```json
{"uuid":"2f5b0b6b-2b54-4a2c-93c3-8e5f9a8e1a5c"}
```

### CORS

CORS is enabled for all origins (`*`).

## Privacy

No analytics or request logs are collected by this project.

## Monitoring

Health check endpoint:

```
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

To serve it on a custom domain, add the domain in **Workers & Pages → Domains & Routes**. Cloudflare will create the DNS record and issue SSL automatically.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**AiratTop**

- Website: [airat.top](https://airat.top)
- GitHub: [@AiratTop](https://github.com/AiratTop)
- Email: [mail@airat.top](mailto:mail@airat.top)
- Repository: [uuid.api.airat.top](https://github.com/AiratTop/uuid.api.airat.top)

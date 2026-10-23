# CargoMate AI API integration

The dashboard frontend now uses a dedicated Axios service at `src/api/CargoMateApi.js`.

## Base URL

Set `VITE_AI_API_BASE_URL` in `.env` to the API base URL. The default configured value is:

`http://187.127.140.51:8034/api`

The service calls these endpoints:

- `POST /chat` — AI assistant chat; sends `message`, `session_id`, and `user_role`.
- `POST /lookup` — HS code lookup; sends product description, export/import countries, quantity and unit.
- `POST /incentive/estimate` — product incentive estimate.
- `POST /incentive/meis` — product MEIS benefit estimate.

The dashboard components are shared by the user and B2B dashboard routes, so the integration applies to both. HS lookup summaries, incentive reports, and audit history are saved in browser local storage scoped to the current local user identifier where available. This is browser-side history, not server-side compliance-grade audit storage.

## Run

```bash
npm install
npm run dev
```

If requests fail from the browser, verify that the API host is reachable, the API allows the frontend origin through CORS, and the endpoint request schemas match the deployed OpenAPI specification. The API server was not reachable from the build environment during this edit, so live endpoint responses could not be verified here.

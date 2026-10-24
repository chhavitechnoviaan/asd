# CargoMate dashboard merge

The marketing/home frontend remains in `src/pages` and `src/components`.
The original dashboard application code from `asd-frontend 2/src` is preserved under `src/cargomateDashboard/`.

Routes now render the original dashboard components locally:
- `/b2b-dashboard` -> original `B2BDashboard`
- `/user-dashboard` -> original `UserDashboard`
- `/admin-dashboard` -> original `AdminDashboard`

## Run locally

1. Copy `.env.example` to `.env` and adjust API URLs for your environment.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local Vite URL shown in the terminal.

The frontend routes no longer redirect dashboard actions to a Vercel frontend URL. The dashboard API calls still need their configured backend/AI API servers to be reachable and permit CORS from the local origin.

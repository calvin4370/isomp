# ISOMP

Inclusive Social Media Platform monorepo.

## Monorepo layout

- `apps/web` - React 18 + Vite frontend (Tailwind, Zustand, Axios, Lucide).
- `apps/api` - FastAPI backend (Pydantic schemas, MVP endpoints).
- `packages/shared-contracts` - lightweight API payload contract artifacts.
- `docs` - hackathon runbook and delivery notes.

## Quick start

### 1) Install dependencies

```bash
npm install
```

### 2) Run frontend

```bash
npm run web:dev
```

Frontend runs on `http://localhost:5173`.

### 3) Run backend (separate terminal)

```bash
python -m pip install -r apps/api/requirements.txt
python -m uvicorn apps.api.app.main:app --reload --app-dir .
```

Backend runs on `http://localhost:8000`.

## Available scripts

- `npm run web:dev` - start frontend dev server.
- `npm run web:build` - build frontend.
- `npm run web:lint` - lint frontend.
- `npm run api:dev` - start backend with uvicorn.
- `npm run api:check` - compile-check backend Python files.

## MVP endpoints

- `GET /api/v1/health`
- `GET /api/v1/posts/feed`
- `POST /api/v1/posts`
- `POST /api/v1/onboarding/recommendations`
- `POST /api/v1/captions/transcribe`
- `GET /api/v1/profile/me`
- `PUT /api/v1/profile/me`

## Frontend pages

- `/explore` - adaptive onboarding panel + feed with expandable transcript and image description.
- `/profile` - profile summary and post grid placeholder.
- `/channels` - community channels and booking placeholder panel.

## Environment

Copy `apps/web/.env.example` to `apps/web/.env.local` if needed:

```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## Notes

- Accessibility settings persist in session storage.
- Frontend API calls include mock fallback behavior for offline/demo safety.

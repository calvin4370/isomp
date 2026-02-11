# ISOMP

ISOMP is an inclusive social media platform celebrating specially-abled people. It helps specially-abled individuals become influencers by providing a platform tailored to their needs. The platform connects and brings together people of all abilities.

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

The web app includes fallback demo data and can run even if backend is not running.

### 3) Run backend (separate terminal)

```bash
python -m pip install -r apps/api/requirements.txt
python -m uvicorn apps.api.app.main:app --reload --app-dir .
```

Backend runs on `http://localhost:8000`.


## API endpoints

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

## More Info

- Product Requirements Document at `docs/product-requirements-document.md`
- Design Document at `docs/design-doc.md`

## Notes

- Accessibility settings persist in session storage.
- Frontend API calls include mock fallback behavior for offline/demo without running backend server.
- Cursor used to improve coding productivity

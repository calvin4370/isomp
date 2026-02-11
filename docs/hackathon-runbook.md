# ISOMP Hackathon Runbook

## Demo flow

1. Open `http://localhost:5173` in browser.
2. Start at Explore page.
3. Show adaptive onboarding chips and apply recommendations.
4. Toggle accessibility switches in the right sidebar.
5. Navigate between Explore, Profile, and Channels pages.
6. Highlight backend-driven feed and fallback-safe API behavior.

## API smoke tests

- `GET /api/v1/health`
- `GET /api/v1/posts/feed`
- `POST /api/v1/onboarding/recommendations`
- `POST /api/v1/captions/transcribe`

## Demo-ready checklist

- Frontend starts without lint errors.
- Backend starts and responds on port `8000`.
- Session persistence for accessibility settings works.
- Fallback mock data loads if backend is down.

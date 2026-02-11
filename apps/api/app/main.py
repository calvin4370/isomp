from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import captions, health, onboarding, posts

app = FastAPI(title="ISOMP API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_v1 = FastAPI(title="ISOMP API v1")
api_v1.include_router(health.router)
api_v1.include_router(posts.router)
api_v1.include_router(onboarding.router)
api_v1.include_router(captions.router)

app.mount("/api/v1", api_v1)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "ISOMP API is running"}

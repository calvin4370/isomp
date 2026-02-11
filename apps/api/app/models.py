from typing import List, Literal

from pydantic import BaseModel, Field

Ability = Literal["visual", "hearing", "motor"]


class HealthResponse(BaseModel):
    status: str = "ok"
    service: str = "isomp-api"


class Post(BaseModel):
    id: str
    author: str
    channel: str
    caption: str
    transcript: str
    imageDescription: str
    likes: int = Field(default=0, ge=0)
    comments: int = Field(default=0, ge=0)
    shares: int = Field(default=0, ge=0)


class FeedResponse(BaseModel):
    posts: List[Post]


class RecommendationRequest(BaseModel):
    abilities: List[Ability]


class RecommendationResponse(BaseModel):
    recommendedFeatures: List[str]


class TranscriptRequest(BaseModel):
    mediaId: str
    language: str = "en"


class TranscriptResponse(BaseModel):
    mediaId: str
    transcript: str
    confidence: float = Field(default=0.79, ge=0, le=1)
    disclaimer: str

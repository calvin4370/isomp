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
    mediaType: str | None = None
    mediaUrl: str | None = None
    likes: int = Field(default=0, ge=0)
    comments: int = Field(default=0, ge=0)
    shares: int = Field(default=0, ge=0)


class FeedResponse(BaseModel):
    posts: List[Post]


class CreatePostRequest(BaseModel):
    author: str = Field(min_length=1, max_length=80)
    channel: str = Field(min_length=1, max_length=80)
    caption: str = Field(min_length=1, max_length=600)
    transcript: str = "Transcript will be generated from media/audio for this post."
    imageDescription: str = "Image description will be generated when media is attached."
    mediaType: str | None = None
    mediaUrl: str | None = None


class Profile(BaseModel):
    handle: str
    bio: str
    followers: int = Field(default=0, ge=0)
    following: int = Field(default=0, ge=0)


class UpdateProfileRequest(BaseModel):
    handle: str = Field(min_length=1, max_length=80)
    bio: str = Field(min_length=1, max_length=400)


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

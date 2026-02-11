from fastapi import APIRouter

from ..models import CreatePostRequest, FeedResponse, Post
from ..services.feed import create_post, get_feed_posts

router = APIRouter(prefix="/posts", tags=["posts"])


@router.get("/feed", response_model=FeedResponse)
def get_feed() -> FeedResponse:
    return FeedResponse(posts=get_feed_posts())


@router.post("", response_model=Post)
def add_post(payload: CreatePostRequest) -> Post:
    return create_post(
        author=payload.author,
        channel=payload.channel,
        caption=payload.caption,
        transcript=payload.transcript,
        image_description=payload.imageDescription,
    )

from fastapi import APIRouter

from ..models import FeedResponse
from ..services.feed import SAMPLE_FEED

router = APIRouter(prefix="/posts", tags=["posts"])


@router.get("/feed", response_model=FeedResponse)
def get_feed() -> FeedResponse:
    return FeedResponse(posts=SAMPLE_FEED)

from fastapi import APIRouter

from ..models import Profile, UpdateProfileRequest
from ..services.profile import get_profile, update_profile

router = APIRouter(prefix="/profile", tags=["profile"])


@router.get("/me", response_model=Profile)
def fetch_profile() -> Profile:
    return get_profile()


@router.put("/me", response_model=Profile)
def save_profile(payload: UpdateProfileRequest) -> Profile:
    return update_profile(handle=payload.handle, bio=payload.bio)

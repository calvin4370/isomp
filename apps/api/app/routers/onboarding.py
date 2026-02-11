from fastapi import APIRouter

from ..models import RecommendationRequest, RecommendationResponse
from ..services.recommendations import compute_recommendations

router = APIRouter(prefix="/onboarding", tags=["onboarding"])


@router.post("/recommendations", response_model=RecommendationResponse)
def recommend_features(payload: RecommendationRequest) -> RecommendationResponse:
    return RecommendationResponse(
        recommendedFeatures=compute_recommendations(payload.abilities)
    )

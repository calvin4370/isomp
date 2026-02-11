from fastapi import APIRouter

from ..models import TranscriptRequest, TranscriptResponse

router = APIRouter(prefix="/captions", tags=["captions"])


@router.post("/transcribe", response_model=TranscriptResponse)
def transcribe_media(payload: TranscriptRequest) -> TranscriptResponse:
    return TranscriptResponse(
        mediaId=payload.mediaId,
        transcript="This is a deterministic transcript mock for hackathon demos.",
        confidence=0.79,
        disclaimer="Prototype output: low-confidence transcription may require manual review.",
    )

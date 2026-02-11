from typing import Iterable, Set

FEATURE_MAP = {
    "visual": {"textToSpeech", "imageToSpeech", "voiceNavigation", "transcript"},
    "hearing": {"signToCaption", "speechToText", "transcript"},
    "motor": {"eyeTracking", "voiceNavigation"},
}


def compute_recommendations(abilities: Iterable[str]) -> list[str]:
    features: Set[str] = set()
    for ability in abilities:
        features.update(FEATURE_MAP.get(ability, set()))
    return sorted(features)

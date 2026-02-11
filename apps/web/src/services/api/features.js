import { apiClient } from './client'
import { mockFeed, mockRecommendations } from './mockData'

export async function getFeed() {
  try {
    const { data } = await apiClient.get('/posts/feed')
    return data.posts
  } catch {
    return mockFeed
  }
}

export async function getRecommendations(abilities) {
  try {
    const { data } = await apiClient.post('/onboarding/recommendations', { abilities })
    return data.recommendedFeatures
  } catch {
    const features = new Set()
    abilities.forEach((ability) => {
      ;(mockRecommendations[ability] ?? []).forEach((feature) => features.add(feature))
    })
    return [...features]
  }
}

export async function transcribeMedia(mediaId) {
  try {
    const { data } = await apiClient.post('/captions/transcribe', {
      mediaId,
      language: 'en',
    })
    return data.transcript
  } catch {
    return 'This is a local fallback transcript generated for demo mode.'
  }
}

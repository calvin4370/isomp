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

export async function createPost(payload) {
  try {
    const { data } = await apiClient.post('/posts', payload)
    return data
  } catch {
    return {
      id: `post-${Date.now()}`,
      author: payload.author,
      channel: payload.channel,
      caption: payload.caption,
      transcript: payload.transcript,
      imageDescription: payload.imageDescription,
      likes: 0,
      comments: 0,
      shares: 0,
    }
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

export async function getProfile() {
  try {
    const { data } = await apiClient.get('/profile/me')
    return data
  } catch {
    return null
  }
}

export async function saveProfile(payload) {
  try {
    const { data } = await apiClient.put('/profile/me', payload)
    return data
  } catch {
    return payload
  }
}

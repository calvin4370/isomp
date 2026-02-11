export const mockFeed = [
  {
    id: 'post-1',
    author: 'Ava Creates',
    channel: 'BlindCommunity',
    caption: 'Today I shared how I record daily routines with audio cues.',
    transcript:
      'Hello everyone. In this short clip I explain how I use voice notes to structure my day and collaborate with my support network.',
    imageDescription: 'A creator holding a phone while recording a voice note in a bright living room.',
    likes: 124,
    comments: 32,
    shares: 8,
    hasAudio: true,
    hasSignLanguage: false,
    signCaption: '',
  },
  {
    id: 'post-2',
    author: 'Noah Signs',
    channel: 'DeafCommunity',
    caption: 'Sign language storytelling session highlights from today.',
    transcript:
      'In this video we discuss identity, confidence, and how visual storytelling can grow social influence.',
    imageDescription: 'A person signing enthusiastically in front of colorful posters.',
    likes: 201,
    comments: 41,
    shares: 17,
    hasAudio: true,
    hasSignLanguage: true,
    signCaption: 'Translated sign caption: We discuss identity, confidence, and visual storytelling growth.',
  },
]

export const mockRecommendations = {
  visual: ['textToSpeech', 'imageToSpeech', 'voiceNavigation', 'transcript'],
  hearing: ['signToCaption', 'speechToText', 'transcript'],
  motor: ['eyeTracking', 'voiceNavigation'],
}

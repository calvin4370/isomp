import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const initialState = {
  textToSpeech: true,
  speechToText: true,
  signToCaption: false,
  imageToSpeech: true,
  voiceNavigation: false,
  eyeTracking: false,
  transcript: true,
  largeText: false,
}

export const useAccessibilityStore = create(
  persist(
    (set) => ({
      settings: initialState,
      setSetting: (key, value) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        })),
      applyRecommendation: (features) =>
        set((state) => {
          const updated = { ...state.settings }
          Object.keys(updated).forEach((key) => {
            updated[key] = features.includes(key)
          })
          return { settings: updated }
        }),
    }),
    {
      name: 'isomp-accessibility',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ settings: state.settings }),
    },
  ),
)

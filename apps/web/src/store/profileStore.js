import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const initialProfile = {
  handle: '@isompCreator',
  bio: 'Accessible creator sharing daily life, community tips, and inclusive tools.',
  followers: 1302,
  following: 248,
}

export const useProfileStore = create(
  persist(
    (set) => ({
      profile: initialProfile,
      hasHydratedFromApi: false,
      updateProfile: (partial) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...partial,
          },
        })),
      setProfileFromApi: (profile) =>
        set({
          profile: {
            ...initialProfile,
            ...profile,
          },
          hasHydratedFromApi: true,
        }),
    }),
    {
      name: 'isomp-profile',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ profile: state.profile, hasHydratedFromApi: state.hasHydratedFromApi }),
    },
  ),
)

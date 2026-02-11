import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useFeedStore = create(
  persist(
    (set) => ({
      posts: [],
      hasLoaded: false,
      setPosts: (posts) =>
        set({
          posts,
          hasLoaded: true,
        }),
      addPost: (post) =>
        set((state) => ({
          posts: [post, ...state.posts],
          hasLoaded: true,
        })),
    }),
    {
      name: 'isomp-feed',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ posts: state.posts, hasLoaded: state.hasLoaded }),
    },
  ),
)

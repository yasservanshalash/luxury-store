import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FavoriteItem {
  id: string
  name: string
  price: number
  comparePrice?: number
  image: string
  slug: string
  category: {
    name: string
    slug: string
  }
}

interface FavoritesStore {
  favorites: FavoriteItem[]
  addToFavorites: (item: FavoriteItem) => void
  removeFromFavorites: (id: string) => void
  isFavorited: (id: string) => boolean
  clearFavorites: () => void
  getFavoritesCount: () => number
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (item) => {
        const favorites = get().favorites
        const existingItem = favorites.find((f) => f.id === item.id)

        if (!existingItem) {
          set({
            favorites: [...favorites, item],
          })
        }
      },

      removeFromFavorites: (id) => {
        set({
          favorites: get().favorites.filter((item) => item.id !== id),
        })
      },

      isFavorited: (id) => {
        return get().favorites.some((item) => item.id === id)
      },

      clearFavorites: () => {
        set({ favorites: [] })
      },

      getFavoritesCount: () => {
        return get().favorites.length
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
) 
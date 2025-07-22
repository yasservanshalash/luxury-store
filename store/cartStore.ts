import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ProductVariant {
  id: string
  name: string
  value: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  slug: string
  selectedVariant?: ProductVariant
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string, variantId?: string) => void
  updateQuantity: (id: string, variantId: string | undefined, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items
        const existingItem = items.find(
          (i) => i.id === item.id && i.selectedVariant?.id === item.selectedVariant?.id
        )

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === existingItem.id && i.selectedVariant?.id === existingItem.selectedVariant?.id
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            ),
          })
        } else {
          set({
            items: [...items, { ...item, quantity: item.quantity || 1 }],
          })
        }
      },

      removeItem: (id, variantId) => {
        set({
          items: get().items.filter((item) => 
            !(item.id === id && item.selectedVariant?.id === variantId)
          ),
        })
      },

      updateQuantity: (id, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, variantId)
          return
        }

        set({
          items: get().items.map((item) =>
            item.id === id && item.selectedVariant?.id === variantId 
              ? { ...item, quantity } 
              : item
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
) 
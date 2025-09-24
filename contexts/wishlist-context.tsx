"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  brand?: string
  rating?: number
}

interface WishlistState {
  items: WishlistItem[]
  itemCount: number
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_WISHLIST" }

const WishlistContext = createContext<{
  state: WishlistState
  dispatch: React.Dispatch<WishlistAction>
} | null>(null)

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        return state // Item already in wishlist
      }

      const newItems = [...state.items, action.payload]
      return {
        ...state,
        items: newItems,
        itemCount: newItems.length,
      }
    }

    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter((item) => item.id !== action.payload)
      return {
        ...state,
        items: filteredItems,
        itemCount: filteredItems.length,
      }
    }

    case "CLEAR_WISHLIST":
      return {
        items: [],
        itemCount: 0,
      }

    default:
      return state
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    itemCount: 0,
  })

  return <WishlistContext.Provider value={{ state, dispatch }}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

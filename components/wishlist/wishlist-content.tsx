"use client"

import { useWishlist } from "@/contexts/wishlist-context"
import { WishlistItem } from "./wishlist-item"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"

export function WishlistContent() {
  const { state } = useWishlist()

  if (state.items.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="mx-auto h-24 w-24 text-gray-300 mb-6" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-8">Save items you love to your wishlist!</p>
        <Button asChild className="bg-main hover:bg-main/90">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">{state.itemCount} items in your wishlist</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {state.items.map((item) => (
          <WishlistItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { Star, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

interface WishlistItemProps {
  item: {
    id: string
    name: string
    price: number
    image: string
    brand?: string
    rating?: number
  }
}

export function WishlistItem({ item }: WishlistItemProps) {
  const { dispatch: wishlistDispatch } = useWishlist()
  const { dispatch: cartDispatch } = useCart()

  const handleRemoveFromWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    wishlistDispatch({ type: "REMOVE_ITEM", payload: item.id })
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
        brand: item.brand,
      },
    })
    // Optionally remove from wishlist after adding to cart
    wishlistDispatch({ type: "REMOVE_ITEM", payload: item.id })
  }

  return (
    <Link href={`/products/${item.id}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-4">
          {/* Remove Button */}
          <div className="relative mb-3">
            {item.rating && (
              <Badge className="absolute top-2 left-2 z-10 bg-cyan-500 hover:bg-cyan-500 text-white">
                <Star className="w-3 h-3 mr-1 fill-current" />
                {item.rating}
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10 h-8 w-8 p-0 bg-white/80 hover:bg-white"
              onClick={handleRemoveFromWishlist}
            >
              <X className="h-4 w-4 text-red-500" />
            </Button>

            {/* Product Image */}
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">{item.name}</h3>

            {item.brand && <p className="text-xs text-orange-500 font-medium">{item.brand}</p>}

            <p className="font-bold text-sm">Price: ${item.price}</p>
          </div>

          {/* Add to Cart Button */}
          <Button className="w-full mt-3 bg-main hover:bg-main/90" onClick={handleAddToCart}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}

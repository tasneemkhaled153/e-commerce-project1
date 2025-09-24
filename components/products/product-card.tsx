"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import type { Product } from "@/types/product"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { dispatch: cartDispatch } = useCart()
  const { dispatch: wishlistDispatch, state: wishlistState } = useWishlist()

  const isInWishlist = wishlistState.items.some((item) => item.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        brand: product.brand,
      },
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isInWishlist) {
      wishlistDispatch({ type: "REMOVE_ITEM", payload: product.id })
    } else {
      wishlistDispatch({
        type: "ADD_ITEM",
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          rating: product.rating,
        },
      })
    }
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card
        className={cn(
          "product group cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-white",
          isHovered && "border border-main",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          {/* Rating Badge */}
          <div className="relative mb-3">
            <Badge className="absolute top-2 left-2 z-10 bg-cyan-500 hover:bg-cyan-500 text-white">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {product.rating}
            </Badge>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10 h-8 w-8 p-0 bg-white/80 hover:bg-white"
              onClick={handleToggleWishlist}
            >
              <Heart className={cn("h-4 w-4", isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600")} />
            </Button>

            {/* Product Image */}
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>

            <p className="text-xs text-orange-500 font-medium">{product.category}</p>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                {product.originalPrice && (
                  <p className="text-xs text-gray-500 line-through">Price: {product.originalPrice}</p>
                )}
                <p className="font-bold text-sm">Price: {product.price}</p>
              </div>
            </div>
          </div>

          {/* Add to Cart Button - Shows on hover */}
          <Button
            className={cn(
              "btn w-full mt-3 bg-main hover:bg-main/90 transition-all duration-1000",
              !isHovered && "transform translate-y-full opacity-0",
            )}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart +
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}

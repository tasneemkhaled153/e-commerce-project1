"use client"

import { useState } from "react"
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import type { Product } from "@/types/product"
import { cn } from "@/lib/utils"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const { dispatch: cartDispatch } = useCart()
  const { dispatch: wishlistDispatch, state: wishlistState } = useWishlist()

  const isInWishlist = wishlistState.items.some((item) => item.id === product.id)

  const handleAddToCart = () => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        brand: product.brand,
      },
    })
  }

  const handleToggleWishlist = () => {
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

  const incrementQuantity = () => {
    if (quantity < (product.quantity || 999)) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="space-y-4">
        <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-contain p-8"
          />
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-balance">{product.name}</h1>

          {product.description && (
            <p className="text-gray-600 text-lg leading-relaxed mb-6 text-pretty">{product.description}</p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-gray-900">Price: {product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Quantity and Rating */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <span className="text-lg font-medium text-gray-900">Quantity: {product.quantity || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-gray-900">Rate:</span>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-medium">{product.rating}</span>
            </div>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 text-lg font-medium min-w-[3rem] text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={incrementQuantity}
                disabled={quantity >= (product.quantity || 999)}
                className="h-10 w-10 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-main hover:bg-main/90 text-white py-3 text-lg"
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart +
          </Button>

          <Button variant="outline" onClick={handleToggleWishlist} className="px-6 py-3 bg-transparent">
            <Heart className={cn("w-5 h-5", isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600")} />
          </Button>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <Badge variant={product.inStock ? "default" : "destructive"}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
          {product.brand && <Badge variant="secondary">{product.brand}</Badge>}
        </div>

        {/* Product Features */}
        {product.features && product.features.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Features:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-main rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

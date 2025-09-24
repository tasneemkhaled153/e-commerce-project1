"use client"

import { useState } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
    brand?: string
  }
}

export function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove()
      return
    }

    setIsUpdating(true)
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: item.id, quantity: newQuantity },
    })
    setTimeout(() => setIsUpdating(false), 300)
  }

  const handleRemove = () => {
    dispatch({ type: "REMOVE_ITEM", payload: item.id })
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <Link href={`/products/${item.id}`} className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-contain p-2"
              />
            </div>
          </Link>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <Link href={`/products/${item.id}`} className="block">
              <h3 className="font-semibold text-gray-900 hover:text-main transition-colors line-clamp-2">
                {item.name}
              </h3>
            </Link>
            {item.brand && <p className="text-sm text-gray-500 mt-1">{item.brand}</p>}
            <p className="text-lg font-bold text-gray-900 mt-2">${item.price}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateQuantity(item.quantity - 1)}
                disabled={isUpdating}
                className="h-10 w-10 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 text-lg font-medium min-w-[3rem] text-center">{item.quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateQuantity(item.quantity + 1)}
                disabled={isUpdating}
                className="h-10 w-10 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="h-10 w-10 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Item Total */}
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

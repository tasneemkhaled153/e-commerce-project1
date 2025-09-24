"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"

interface OrderSummaryProps {
  paymentMethod: "online" | "cash"
}

export function OrderSummary({ paymentMethod }: OrderSummaryProps) {
  const { state, dispatch } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const subtotal = state.total
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create order
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase()
      const orderData = {
        id: orderId,
        items: state.items,
        subtotal,
        shipping,
        tax,
        total,
        paymentMethod,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      }

      // Store order in localStorage (in real app, this would be sent to backend)
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      localStorage.setItem("orders", JSON.stringify([orderData, ...existingOrders]))

      // Clear cart
      dispatch({ type: "CLEAR_CART" })

      // Redirect to order confirmation
      router.push(`/orders/${orderId}`)
    } catch (error) {
      console.error("Order processing failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {state.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Order Totals */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({state.itemCount} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Payment Method */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium">Payment Method:</p>
          <p className="text-sm text-gray-600">{paymentMethod === "online" ? "Online Payment" : "Cash on Delivery"}</p>
        </div>

        <Button
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="w-full bg-main hover:bg-main/90"
          size="lg"
        >
          {isProcessing ? "Processing..." : `Place Order - $${total.toFixed(2)}`}
        </Button>
      </CardContent>
    </Card>
  )
}

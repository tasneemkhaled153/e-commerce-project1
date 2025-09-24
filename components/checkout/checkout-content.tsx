"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { CheckoutForm } from "./checkout-form"
import { OrderSummary } from "./order-summary"
import { PaymentMethods } from "./payment-methods"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export function CheckoutContent() {
  const { state } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("online")

  if (state.items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingCart className="mx-auto h-24 w-24 text-gray-300 mb-6" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to checkout!</p>
        <Button asChild className="bg-main hover:bg-main/90">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Checkout Form */}
      <div className="space-y-8">
        <CheckoutForm />
        <PaymentMethods paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
      </div>

      {/* Order Summary */}
      <div>
        <OrderSummary paymentMethod={paymentMethod} />
      </div>
    </div>
  )
}

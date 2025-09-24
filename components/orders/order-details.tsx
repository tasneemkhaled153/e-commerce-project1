"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, CreditCard, Banknote, Package, Truck, CheckCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Order {
  id: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
    brand?: string
  }>
  subtotal: number
  shipping: number
  tax: number
  total: number
  paymentMethod: "online" | "cash"
  status: string
  createdAt: string
}

interface OrderDetailsProps {
  orderId: string
}

export function OrderDetails({ orderId }: OrderDetailsProps) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const foundOrder = storedOrders.find((o: Order) => o.id === orderId)

    if (!foundOrder) {
      notFound()
    }

    setOrder(foundOrder)
    setLoading(false)
  }, [orderId])

  if (loading) {
    return <div className="text-center py-8">Loading order details...</div>
  }

  if (!order) {
    return notFound()
  }

  const orderSteps = [
    { label: "Order Confirmed", icon: CheckCircle, completed: true },
    { label: "Processing", icon: Package, completed: true },
    { label: "Shipped", icon: Truck, completed: false },
    { label: "Delivered", icon: CheckCircle, completed: false },
  ]

  return (
    <div className="space-y-8">
      {/* Order Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <div className="flex items-center gap-4 text-gray-600 mt-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              {order.paymentMethod === "online" ? <CreditCard className="h-4 w-4" /> : <Banknote className="h-4 w-4" />}
              {order.paymentMethod === "online" ? "Online Payment" : "Cash on Delivery"}
            </div>
          </div>
        </div>
        <Badge variant={order.status === "confirmed" ? "default" : "secondary"} className="text-lg px-4 py-2">
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>

      {/* Order Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {orderSteps.map((step, index) => (
              <div key={step.label} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step.completed ? "bg-main text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <step.icon className="h-6 w-6" />
                </div>
                <p className={`text-sm mt-2 ${step.completed ? "text-main font-medium" : "text-gray-500"}`}>
                  {step.label}
                </p>
                {index < orderSteps.length - 1 && (
                  <div className={`w-24 h-0.5 mt-6 ${step.completed ? "bg-main" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items ({order.items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="flex-1">
                      <Link href={`/products/${item.id}`} className="block">
                        <h3 className="font-semibold hover:text-main transition-colors">{item.name}</h3>
                      </Link>
                      {item.brand && <p className="text-sm text-gray-500">{item.brand}</p>}
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">${item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>

              <div className="space-y-3 pt-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Track Package
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Download Invoice
                </Button>
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/orders">Back to Orders</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

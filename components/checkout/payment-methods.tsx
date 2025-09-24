"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, Banknote } from "lucide-react"

interface PaymentMethodsProps {
  paymentMethod: "online" | "cash"
  setPaymentMethod: (method: "online" | "cash") => void
}

export function PaymentMethods({ paymentMethod, setPaymentMethod }: PaymentMethodsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value as "online" | "cash")}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="online" id="online" />
            <Label htmlFor="online" className="flex items-center space-x-3 cursor-pointer flex-1">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Online Payment</p>
                <p className="text-sm text-gray-600">Pay securely with credit/debit card</p>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash" className="flex items-center space-x-3 cursor-pointer flex-1">
              <Banknote className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Cash on Delivery</p>
                <p className="text-sm text-gray-600">Pay when your order arrives</p>
              </div>
            </Label>
          </div>
        </RadioGroup>

        {paymentMethod === "online" && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              You will be redirected to our secure payment gateway to complete your payment.
            </p>
          </div>
        )}

        {paymentMethod === "cash" && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              Please have the exact amount ready when your order arrives. Our delivery person will collect the payment.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

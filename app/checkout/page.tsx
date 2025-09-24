import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckoutContent } from "@/components/checkout/checkout-content"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <CheckoutContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { OrderDetails } from "@/components/orders/order-details"

interface OrderPageProps {
  params: {
    id: string
  }
}

export default function OrderPage({ params }: OrderPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <OrderDetails orderId={params.id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

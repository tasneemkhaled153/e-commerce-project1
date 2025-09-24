import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { OrdersList } from "@/components/orders/orders-list"

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>
          <OrdersList />
        </div>
      </main>
      <Footer />
    </div>
  )
}

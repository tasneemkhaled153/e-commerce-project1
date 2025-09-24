import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BrandGrid } from "@/components/brands/brand-grid"
import { mockBrands } from "@/lib/mock-data"

export default function BrandsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Our Brands</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              You can see our brands and each brand includes the products in it.
            </p>
          </div>
          <BrandGrid brands={mockBrands} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

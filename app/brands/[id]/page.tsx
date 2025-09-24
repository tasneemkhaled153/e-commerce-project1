import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductGrid } from "@/components/products/product-grid"
import { mockBrands, mockProducts } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface BrandPageProps {
  params: {
    id: string
  }
}

export default function BrandPage({ params }: BrandPageProps) {
  const brand = mockBrands.find((b) => b.id === params.id)

  if (!brand) {
    notFound()
  }

  const brandProducts = mockProducts.filter((p) => p.brand?.toLowerCase() === brand.name.toLowerCase())

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Brand Header */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-50 rounded-lg flex items-center justify-center">
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                className="max-w-full max-h-full object-contain p-4"
              />
            </div>
            <h1 className="text-4xl font-bold text-blue-600 mb-4">{brand.name}</h1>
            {brand.description && <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">{brand.description}</p>}
            <p className="text-gray-500">{brandProducts.length} products available</p>
          </div>

          {/* Products */}
          {brandProducts.length > 0 ? (
            <ProductGrid products={brandProducts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products available for this brand.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

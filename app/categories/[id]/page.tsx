import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductFilters } from "@/components/products/product-filters"
import { mockCategories, mockProducts } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = mockCategories.find((c) => c.id === params.id)

  if (!category) {
    notFound()
  }

  const categoryProducts = mockProducts.filter((p) => p.category.toLowerCase() === category.name.toLowerCase())

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Category Header */}
          <div className="mb-8">
            <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden mb-6">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
            {category.description && <p className="text-gray-600 text-lg mb-4">{category.description}</p>}
            <p className="text-gray-500">{categoryProducts.length} products found</p>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className="w-64 flex-shrink-0">
              <ProductFilters />
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {categoryProducts.length > 0 ? (
                <ProductGrid products={categoryProducts} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products available in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

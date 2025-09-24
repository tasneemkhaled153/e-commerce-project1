import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CategoryGrid } from "@/components/categories/category-grid"
import { mockCategories } from "@/lib/mock-data"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our wide range of product categories and find exactly what you're looking for.
            </p>
          </div>
          <CategoryGrid categories={mockCategories} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

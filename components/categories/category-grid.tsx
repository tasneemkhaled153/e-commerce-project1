import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/types/product"

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.id}`}>
          <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden">
            <CardContent className="p-0">
              {/* Category Image */}
              <div className="aspect-video bg-gray-50 overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Category Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-main transition-colors">
                  {category.name}
                </h3>

                {category.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>
                )}

                <p className="text-sm text-gray-500">{category.productCount} products</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

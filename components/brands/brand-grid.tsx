import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Brand } from "@/types/product"

interface BrandGridProps {
  brands: Brand[]
}

export function BrandGrid({ brands }: BrandGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {brands.map((brand) => (
        <Link key={brand.id} href={`/brands/${brand.id}`}>
          <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-white">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                {/* Brand Logo */}
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Brand Name */}
                <h3 className="text-xl font-bold text-blue-600 group-hover:text-main transition-colors">
                  {brand.name}
                </h3>

                {/* Product Count */}
                <p className="text-sm text-gray-500">{brand.productCount} products</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

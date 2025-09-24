import { ProductGrid } from "./product-grid"
import type { Product } from "@/types/product"

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">Related Products</h2>
      <ProductGrid products={products} />
    </section>
  )
}

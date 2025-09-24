import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ProductGrid } from "@/components/products/product-grid"
import { mockProducts } from "@/lib/mock-data"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <section className="py-12">
          <div className="container mx-auto px-4">
            <ProductGrid products={mockProducts} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

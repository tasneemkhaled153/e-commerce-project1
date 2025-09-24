import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative h-96 bg-gradient-to-r from-green-50 to-orange-50 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/fresh-vegetables-and-fruits-banner-with-colorful-p.jpg"
          alt="Fresh vegetables and fruits"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-lg text-white">
          <h1 className="text-4xl font-bold mb-4 text-balance">Fresh Products, Fresh Deals</h1>
          <p className="text-lg mb-6 text-pretty">
            Discover the best quality products at unbeatable prices. From fresh groceries to the latest electronics.
          </p>
          <Button asChild size="lg" className="bg-main hover:bg-main/90">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

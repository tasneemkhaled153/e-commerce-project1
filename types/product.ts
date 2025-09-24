export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  brand?: string
  rating: number
  description?: string
  quantity?: number
  inStock: boolean
  features?: string[]
}

export interface Brand {
  id: string
  name: string
  logo: string
  description?: string
  productCount: number
}

export interface Category {
  id: string
  name: string
  image: string
  description?: string
  productCount: number
}

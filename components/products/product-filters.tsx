"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface FilterState {
  priceRange: [number, number]
  categories: string[]
  brands: string[]
  ratings: number[]
}

export function ProductFilters() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 20000],
    categories: [],
    brands: [],
    ratings: [],
  })

  const categories = ["Electronics", "Fashion", "Home & Garden", "Sports", "Books", "Toys"]
  const brands = ["Canon", "Dell", "Lenovo", "Sony", "Apple", "Samsung", "HP", "Asus"]

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, category] : prev.categories.filter((c) => c !== category),
    }))
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      brands: checked ? [...prev.brands, brand] : prev.brands.filter((b) => b !== brand),
    }))
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      ratings: checked ? [...prev.ratings, rating] : prev.ratings.filter((r) => r !== rating),
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 20000],
      categories: [],
      brands: [],
      ratings: [],
    })
  }

  const activeFiltersCount = filters.categories.length + filters.brands.length + filters.ratings.length

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((category) => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(category, false)} />
                </Badge>
              ))}
              {filters.brands.map((brand) => (
                <Badge key={brand} variant="secondary" className="flex items-center gap-1">
                  {brand}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleBrandChange(brand, false)} />
                </Badge>
              ))}
              {filters.ratings.map((rating) => (
                <Badge key={rating} variant="secondary" className="flex items-center gap-1">
                  {rating}+ stars
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleRatingChange(rating, false)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))}
              max={20000}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                />
                <Label htmlFor={category} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Brands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
                />
                <Label htmlFor={brand} className="text-sm">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.ratings.includes(rating)}
                  onCheckedChange={(checked) => handleRatingChange(rating, !!checked)}
                />
                <Label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                  {rating} stars & up
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button className="w-full bg-main hover:bg-main/90">Apply Filters</Button>
    </div>
  )
}

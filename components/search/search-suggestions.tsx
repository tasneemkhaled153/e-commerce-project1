"use client"

import { useState, useEffect } from "react"
import { mockProducts } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"

interface SearchSuggestionsProps {
  query: string
  onSelect: (suggestion: string) => void
}

export function SearchSuggestions({ query, onSelect }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (query.length > 1) {
      const productSuggestions = mockProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 5)
        .map((product) => product.name)

      setSuggestions(productSuggestions)
    } else {
      setSuggestions([])
    }
  }, [query])

  if (suggestions.length === 0) return null

  return (
    <Card className="absolute top-full left-0 right-0 mt-1 z-50">
      <CardContent className="p-0">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </CardContent>
    </Card>
  )
}

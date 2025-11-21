"use client"

import { useState, useMemo, useEffect } from "react"
import ProductCard from "@/components/products/ProductCard"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Checkbox } from "@/components/ui/Checkbox"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Slider } from "@/components/ui/Slider"
import { Category, Product } from "@/lib/types"
import { getProducts } from "@/lib/products"
import { getCategory } from "@/lib/categories"

export default function ProductPage() {
  // États
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [maxPrice, setMaxPrice] = useState(100000)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [showFilters, setShowFilters] = useState(false)

  // Récupération des produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts()
        const productList: Product[] = Array.isArray(res) ? res : res
        setProducts(productList)

        const validPrices = productList
          .map((p) => p.price)
          .filter((price): price is number => typeof price === "number" && !isNaN(price))

        const computedMax = validPrices.length > 0 ? Math.max(...validPrices) : 100000
        setMaxPrice(computedMax)
        setPriceRange([0, computedMax])
      } catch (error) {
        console.error("Erreur produits :", error)
      }
    }

    fetchProducts()
  }, [])

  // Récupération des catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategory()
        setCategories(Array.isArray(fetchedCategories) ? fetchedCategories : fetchedCategories)
      } catch (error) {
        console.error("Erreur catégories :", error)
      }
    }

    fetchCategories()
  }, [])

  // Filtrage dynamique
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const price = product.price ?? 0
      const matchSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category)

      const matchPrice = price >= priceRange[0] && price <= priceRange[1]

      return matchSearch && matchCategory && matchPrice
    })
  }, [products, searchTerm, selectedCategories, priceRange])

  // Toggle catégorie
  const toggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    )
  }

  // Bloc filtres réutilisable
  const FiltersContent = (
    <div className="space-y-6 p-4">
      <h1 className="font-semibold text-2xl mb-2">Filtres</h1>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Rechercher un produit..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Catégories */}
      <div>
        <h2 className="font-medium text-lg mb-2">Catégories</h2>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.slug} className="flex items-center space-x-2">
              <Checkbox
                id={cat.slug}
                checked={selectedCategories.includes(cat.name)}
                onCheckedChange={() => toggleCategory(cat.name)}
              />
              <Label htmlFor={cat.slug} className="text-sm cursor-pointer">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Prix */}
      <div>
        <h2 className="font-medium text-lg mb-2">Plage de prix (FCFA)</h2>
        <Slider
          min={0}
          max={maxPrice}
          step={100}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
        />
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-4 gap-6 px-3 md:px-4 py-6">
      {/* --- Filtres (Desktop) --- */}
      <div className="hidden md:block">{FiltersContent}</div>

      {/* --- Bouton filtres (Mobile) --- */}
      <div className="flex justify-between items-center md:hidden mb-4">
        <h1 className="font-semibold text-2xl">Produits</h1>
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          <SlidersHorizontal size={18} />
          Filtres
        </button>
      </div>

      {/* --- Liste produits --- */}
      <div className="md:col-span-3">
        <h2 className="hidden md:block font-semibold text-3xl mb-4">
          Liste de nos produits
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="w-full grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            Aucun produit ne correspond à votre recherche.
          </p>
        )}
      </div>

      {/* --- Modal mobile --- */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-end z-50">
          <div className="bg-white w-4/5 max-w-sm h-full shadow-lg animate-slideIn relative overflow-y-auto">
            <button
              onClick={() => setShowFilters(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={22} />
            </button>
            {FiltersContent}
          </div>
        </div>
      )}

      {/* --- Animation CSS --- */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  )
}

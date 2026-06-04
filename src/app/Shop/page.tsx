'use client'

import Link from 'next/link'
import { Search, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { PRODUCTS, CATEGORIES } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import { Header } from '@/components/Header'
import { useSearchParams } from "next/navigation";



export default function Shop() {
  const { addToCart } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const [addedProduct, setAddedProduct] = useState<string | null>(null)
const searchParams = useSearchParams();

const initialSearch = searchParams.get("search") || "";

const [searchQuery, setSearchQuery] = useState(initialSearch);
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      

      {/* Page Title */}
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Epic Collection</h1>
          <p className="text-foreground/70">Choose from our legendary mythological designs</p>
        </div>
      </section>

      {/* Filters and Products */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              {/* Search */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-foreground mb-3">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search designs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary"
                  />
                  <Search size={18} className="absolute right-3 top-2.5 text-foreground/50" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-3">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'text-foreground/70 hover:bg-card hover:text-foreground'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/70 mb-4">No products found</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All')
                    setSearchQuery('')
                  }}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary transition h-full flex flex-col">
                      <div className="aspect-square overflow-hidden bg-muted relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-accent/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                          {product.category}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition">
                          {product.name}
                        </h3>
                        <p className="text-xs text-foreground/60 mb-3 flex-grow">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">${product.price}</span>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                quantity: 1,
                                size: 'M',
                                image: product.image,
                              })
                              setAddedProduct(product.id)
                              setTimeout(() => setAddedProduct(null), 2000)
                            }}
                            className={`p-2 rounded-lg transition ${
                              addedProduct === product.id
                                ? 'bg-green-600 text-white'
                                : 'bg-primary text-primary-foreground hover:bg-primary/90'
                            }`}
                            title="Add to cart"
                          >
                            <ShoppingCart size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

     
    </div>
  )
}

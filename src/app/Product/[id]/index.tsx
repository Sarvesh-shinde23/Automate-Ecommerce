'use client'

import Link from 'next/link'
import { useState, use } from 'react'
import { ShoppingCart, ChevronLeft } from 'lucide-react'

import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import { PRODUCTS } from '@/lib/types'

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { id } = use(params)
  const product = PRODUCTS.find((p) => p.id === id)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <Link href="/shop" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        size: selectedSize,
        image: product.image,
      })
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary">⚡</div>
              <span className="text-xl font-bold text-foreground">Mythic Legends</span>
            </Link>
            <div className="flex items-center gap-4">
              <ShoppingCart size={20} className="text-foreground/80" />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-foreground/70 hover:text-primary transition"
          >
            <ChevronLeft size={18} />
            Back
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-card border border-border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold mb-3">
                {product.category}
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-3">{product.name}</h1>
              <p className="text-foreground/70 mb-4">{product.description}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                <span className="text-foreground/50 line-through">${(product.price * 1.2).toFixed(2)}</span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-4">Select Size</label>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-lg font-semibold transition ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border text-foreground hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-4">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-border rounded-lg hover:border-primary transition"
                >
                  −
                </button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-border rounded-lg hover:border-primary transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2 mb-4 ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              <ShoppingCart size={20} />
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>

            {/* Product Details */}
            <div className="border-t border-border pt-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Color</h3>
                  <p className="text-foreground/70">{product.color}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Material</h3>
                  <p className="text-foreground/70">100% Premium Cotton</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Care Instructions</h3>
                  <p className="text-foreground/70">Machine wash cold, tumble dry low. Do not bleach.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-border pt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link
                  key={relProduct.id}
                  href={`/product/${relProduct.id}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary transition">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={relProduct.image}
                        alt={relProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition">
                        {relProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-primary">${relProduct.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
     
    </div>
  )
}

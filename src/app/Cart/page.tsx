'use client'

import Link from 'next/link'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart-context'


export default function Cart() {
  const { items, removeFromCart, updateQuantity } = useCart()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
    

      {/* Page Title */}
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground">Shopping Cart</h1>
        </div>
      </section>

      {/* Cart Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart size={48} className="mx-auto text-foreground/50 mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-foreground/70 mb-6">Add some legendary tees to get started!</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 pb-6 border-b border-border">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-card flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-grow">
                      <Link href={`/product/${item.id}`} className="font-semibold text-foreground hover:text-primary transition">
                        {item.name}
                      </Link>
                      <p className="text-sm text-foreground/70 mt-1">Size: {item.size}</p>
                      <p className="text-lg font-bold text-primary mt-2">${item.price}</p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.cartItemId || item.id)}
                        className="text-foreground/50 hover:text-accent transition"
                        title="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                          className="px-2 py-1 border border-border rounded hover:border-primary transition"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                          className="px-2 py-1 border border-border rounded hover:border-primary transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/shop"
                className="inline-block mt-8 px-6 py-2 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-20">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-foreground/80">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/80">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/80">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal <= 100 && (
                  <p className="text-xs text-foreground/60 italic">
                    Free shipping on orders over $100
                  </p>
                )}
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>

              <button className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition mb-3">
                Proceed to Checkout
              </button>

              <button className="w-full py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition">
                Apply Coupon
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      
    </div>
  )
}

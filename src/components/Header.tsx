'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function Header() {
  const { cartCount } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">⚡</div>
            <span className="text-xl font-bold text-foreground">Mythic Legends</span>
          </Link>
          <nav className="hidden gap-8 md:flex">
            <Link href="/" className="text-sm text-foreground/80 hover:text-primary transition">
              Home
            </Link>
            <Link href="/shop" className="text-sm text-foreground/80 hover:text-primary transition">
              Shop
            </Link>
            <Link href="/about" className="text-sm text-foreground/80 hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-sm text-foreground/80 hover:text-primary transition">
              Contact
            </Link>
          </nav>
          <Link href="/cart" className="relative text-foreground/80 hover:text-primary transition">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

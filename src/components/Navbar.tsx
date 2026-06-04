"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const { items } = useCart();
const router = useRouter();
const [searchQuery, setSearchQuery] = useState("");
  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();

  router.push(`/Shop?search=${encodeURIComponent(searchQuery)}`);
};

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold text-foreground">
              Mythic Legends
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/Shop"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Shop
            </Link>

            <Link
              href="/About"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              About
            </Link>

            <Link
              href="/Contact"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/Support"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Support
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
           <form onSubmit={handleSearch} className="flex items-center">
  <input
    type="text"
    placeholder="Search..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-40 rounded-l-lg border border-border px-3 py-2 text-sm"
  />

  <button
    type="submit"
    className="rounded-r-lg border border-l-0 border-border px-3 py-2"
  >
    <Search size={18} />
  </button>
</form>

            <Link
              href="/Cart"
              className="relative text-foreground/80 hover:text-primary transition-colors"
            >
              <ShoppingCart size={22} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
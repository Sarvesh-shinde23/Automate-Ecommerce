
import Link from 'next/link'


const Footer = () => {
  return (
  <div>
    <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-foreground/70 hover:text-primary transition">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-foreground/70 hover:text-primary transition">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/shop" className="text-sm text-foreground/70 hover:text-primary transition">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=greek" className="text-sm text-foreground/70 hover:text-primary transition">
                    Greek Gods
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-sm text-foreground/70 hover:text-primary transition">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-foreground/70 hover:text-primary transition">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-foreground/70 hover:text-primary transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-foreground/70 hover:text-primary transition">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-sm text-foreground/70">
             
            </p>
          </div>
        </div>
      </footer>
  </div>
  )
}

export default Footer
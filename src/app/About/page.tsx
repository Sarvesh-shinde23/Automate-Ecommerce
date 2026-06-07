'use client'

import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
    
      <section className="bg-card border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground">About Mythic Legends</h1>
          <p className="text-foreground/70 mt-4">Our story of epic designs and legendary inspiration</p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-foreground mb-6">Who We Are</h2>
          <p className="text-foreground/80 text-lg mb-6 leading-relaxed">
            Mythic Legends was founded on a simple belief: that the stories of ancient civilizations and mythological heroes
            deserve to be celebrated and worn with pride. We're passionate about bringing the epic tales of gods, legends, and
            legendary creatures to life through stunning t-shirt designs.
          </p>

          <h2 className="text-3xl font-bold text-foreground mb-6 mt-12">Our Mission</h2>
          <p className="text-foreground/80 text-lg mb-6 leading-relaxed">
            To create premium t-shirt designs that capture the essence, power, and beauty of mythology. Each design is carefully
            crafted to honor the stories they represent while providing wearers with a way to express their connection to these
            timeless tales.
          </p>

          <h2 className="text-3xl font-bold text-foreground mb-6 mt-12">Why Choose Us</h2>
          <ul className="space-y-4 text-foreground/80 text-lg">
            <li className="flex gap-3">
              <span className="text-primary">✓</span>
              <span>Unique designs you won&apos;t find anywhere else</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">✓</span>
              <span>Premium quality cotton t-shirts built to last</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">✓</span>
              <span>Detailed, vibrant prints that stay vivid through many washes</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">✓</span>
              <span>Fast, reliable shipping to get your legends quickly</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">✓</span>
              <span>Exceptional customer support and satisfaction guarantee</span>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-foreground mb-6 mt-12">Our Craftsmanship</h2>
          <p className="text-foreground/80 text-lg mb-6 leading-relaxed">
            Every design goes through multiple rounds of refinement. Our artists research the mythological sources extensively to
            ensure accuracy and respect for the original stories. We use only the finest printing techniques to create designs that
            are both visually stunning and durable.
          </p>

          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition"
            >
              Explore Our Collection
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

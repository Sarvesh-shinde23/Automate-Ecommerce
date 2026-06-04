"use client"


import Link from 'next/link'


const hero = () => {

  

  return (
    <div className="min-h-screen bg-background text-foreground">
   

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-balance text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6">
              Wear the <span className="text-primary">Power</span> of
              <br />
              <span className="text-accent">Mythology</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
              Epic t-shirt designs inspired by gods, legends, and the timeless tales of ancient civilizations. Each piece tells a story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/Shop"
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition"
              >
                Explore Collection
              </Link>
              <Link
                href="/About"
                className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition"
              >
                Learn Our Story
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                image: '/zeus.jpg',
                title: 'parshuram',
                price: '$34.99',
              },
              {
                image: '/dragon.jpg',
                title: 'Shiva',
                price: '$36.99',
              },
              {
                image: '/phoenix.jpg',
                title: 'Hanuman',
                price: '$38.99',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary transition"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-primary font-bold mb-3">{item.price}</p>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition">
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose <span className="text-primary">Mythic Legends</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✨',
                title: 'Premium Quality',
                description: 'High-quality t-shirts with durable, vibrant prints',
              },
              {
                icon: '🎨',
                title: 'Epic Designs',
                description: 'Exclusive mythological artwork you won\'t find anywhere else',
              },
              {
                icon: '🚚',
                title: 'Fast Shipping',
                description: 'Quick delivery to bring your legends home faster',
              },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default hero
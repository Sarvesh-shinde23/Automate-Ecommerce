export interface Product {
  id: string
  name: string
  category: string
  price: number
  description: string
  image: string
  color: string
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Zeus & Lightning',
    category: 'Greek Gods',
    price: 34.99,
    description: 'The King of Gods strikes with thunderous power',
    image: '/zeus.jpg',
    color: 'Gold & Black',
  },
  {
    id: '2',
    name: 'Odin\'s Wisdom',
    category: 'Norse Gods',
    price: 34.99,
    description: 'All-Father gazes with ancient wisdom',
    image: 'https://images.unsplash.com/photo-1556821552-5ff63b1ce257?w=500&h=500&fit=crop',
    color: 'Silver & Black',
  },
  {
    id: '3',
    name: 'Athena\'s Armor',
    category: 'Greek Gods',
    price: 39.99,
    description: 'Goddess of wisdom and war, forever vigilant',
    image: 'https://images.unsplash.com/photo-1562777392-a158d18e8ba4?w=500&h=500&fit=crop',
    color: 'Bronze & Black',
  },
  {
    id: '4',
    name: 'Dragon\'s Flame',
    category: 'Asian Legends',
    price: 36.99,
    description: 'Ancient dragon breathing celestial fire',
    image: '/dragon.jpg',
    color: 'Red & Gold',
  },
  {
    id: '5',
    name: 'Valkyrie Rising',
    category: 'Norse Gods',
    price: 39.99,
    description: 'Winged warriors of the Norse gods',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    color: 'Silver & Red',
  },
  {
    id: '6',
    name: 'Kraken\'s Wrath',
    category: 'Sea Legends',
    price: 37.99,
    description: 'The ocean\'s darkest terror emerges',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    color: 'Deep Blue & Black',
  },
  {
    id: '7',
    name: 'Phoenix Rebirth',
    category: 'Legendary Creatures',
    price: 38.99,
    description: 'Eternal flame and rebirth in one design',
    image: '/phoenix.jpg',
    color: 'Flame Orange & Gold',
  },
  {
    id: '8',
    name: 'Medusa\'s Curse',
    category: 'Greek Gods',
    price: 35.99,
    description: 'Beauty and terror intertwined',
    image: 'https://images.unsplash.com/photo-1549027615-cd4628902d4a?w=500&h=500&fit=crop',
    color: 'Green & Black',
  },
]

export const CATEGORIES = ['All', 'Greek Gods', 'Norse Gods', 'Asian Legends', 'Sea Legends', 'Legendary Creatures']

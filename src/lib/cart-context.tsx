'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  image: string
  cartItemId?: string // Unique identifier for this cart entry
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    setIsClient(true)
    const savedCart = localStorage.getItem('mythic-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to load cart from localStorage:', e)
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('mythic-cart', JSON.stringify(items))
    }
  }, [items, isClient])

  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      )
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id && item.size === newItem.size
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }
      const itemWithId = {
        ...newItem,
        cartItemId: `${newItem.id}-${newItem.size}-${Date.now()}`
      }
      return [...prevItems, itemWithId]
    })
  }

  const removeFromCart = (cartItemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId))
  }

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(cartItemId)
      return
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

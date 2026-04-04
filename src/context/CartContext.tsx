import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  customization?: {
    design?: string
    colors?: string[]
    text?: string
  }
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const CART_STORAGE_KEY = 'foundforyou_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (storedCart) {
        setItems(JSON.parse(storedCart))
      }
    } catch (err) {
      console.error('Failed to restore cart from localStorage:', err)
    }
    setHydrated(true)
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      } catch (err) {
        console.error('Failed to save cart to localStorage:', err)
      }
    }
  }, [items, hydrated])

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      // Check if item already exists
      const existingItem = prevItems.find((i) => i.productId === item.productId)

      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        )
      }

      // Add new item
      return [...prevItems, item]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((i) =>
        i.productId === productId ? { ...i, quantity } : i,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

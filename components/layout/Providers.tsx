'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@/src/context/AuthContext'
import { CartProvider } from '@/src/context/CartContext'
import Header from './Header'
import Footer from './Footer'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  )
}

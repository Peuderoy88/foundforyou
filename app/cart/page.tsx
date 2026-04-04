'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const tax = subtotal * 0.08 // 8% tax
  const shipping = items.length > 0 ? 10 : 0
  const total = subtotal + tax + shipping

  const handleQuantityChange = (id: string, quantity: number) => {
    setIsUpdating(id)
    setTimeout(() => {
      updateQuantity(id, quantity)
      setIsUpdating(null)
    }, 300)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/shop" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium mb-8">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="text-4xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
        </div>

        {/* Empty State */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingBag className="w-24 h-24 text-slate-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
          <p className="text-slate-600 mb-8">
            Explore our collection of unique, AI-generated products and find something perfect for you.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/shop" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium mb-8">
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 mb-2">Shopping Cart</h1>
        <p className="text-slate-600">{items.length} item{items.length !== 1 ? 's' : ''} in cart</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-6 border-b border-slate-200 last:border-b-0 hover:bg-slate-50 transition">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-24 h-24 bg-slate-100 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.productType && (
                          <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
                            {item.productType}
                          </span>
                        )}
                        {item.style && (
                          <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
                            {item.style}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="space-y-2">
                      <div className="flex items-center border border-slate-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-slate-600 hover:text-slate-900"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="w-8 text-center font-semibold border-x border-slate-300 py-1"
                        />
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-slate-600 hover:text-slate-900"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-right font-semibold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between text-slate-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-200">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-cyan-600">${total.toFixed(2)}</span>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition mb-3">
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition mb-4"
              >
                Clear Cart
              </button>

              {/* Promo Code */}
              <div className="pt-4">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 mb-2"
                />
                <button className="w-full py-2 border border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 transition text-sm font-medium">
                  Apply Code
                </button>
              </div>

              {/* Security Info */}
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600">
                  🔒 Your payment information is secure. We use Stripe for encrypted transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

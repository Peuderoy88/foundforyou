'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState<'shipping' | 'payment' | 'review' | 'success'>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    // Shipping info
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',

    // Payment info
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  })

  const tax = subtotal * 0.08
  const shipping = items.length > 0 ? 10 : 0
  const total = subtotal + tax + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">No Items in Cart</h1>
          <p className="text-slate-600 mb-8">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.firstName && formData.address && formData.city && formData.zip) {
      setStep('payment')
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.cardNumber && formData.cardExpiry && formData.cardCVC) {
      setStep('review')
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock successful payment
      setStep('success')
      clearCart()
    } catch (error) {
      console.error('Payment processing failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Success Page
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed! ✨</h1>
          <p className="text-slate-600 mb-8">
            Thank you for your purchase! Your order has been successfully placed. A confirmation email has been sent to your inbox.
          </p>

          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8 text-left">
            <h3 className="font-semibold text-slate-900 mb-4">Order Details</h3>
            <div className="space-y-2 text-sm text-slate-700 mb-4 pb-4 border-b border-slate-200">
              <div className="flex justify-between">
                <span>Order Number:</span>
                <span className="font-mono font-semibold">ORD-{Math.random().toString(36).substring(7).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>Items:</span>
                <span>{items.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-semibold text-slate-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              📦 You'll receive a tracking number via email once your order ships.
            </p>

            <p className="text-xs text-slate-600">
              💬 Questions? Contact support@foundforyou.com
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition"
            >
              Back to Home
            </Link>
            <Link
              href="/shop"
              className="block w-full py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/cart" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-bold text-slate-900">Checkout</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step Indicator */}
            <div className="flex items-center gap-4 mb-12">
              {(['shipping', 'payment', 'review'] as const).map((s, i) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition ${
                      s === step || ['shipping', 'payment', 'review'].indexOf(step) > i
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className="ml-3 text-sm font-medium text-slate-700 capitalize">{s}</span>
                  {i < 2 && <div className="flex-1 h-1 bg-slate-200 mx-4" />}
                </div>
              ))}
            </div>

            {/* Shipping Form */}
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Shipping Address</h2>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />

                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />

                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />

                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {/* Payment Form */}
            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Payment Information
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />

                  <input
                    type="text"
                    placeholder="4111 1111 1111 1111"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                      required
                    />

                    <input
                      type="text"
                      placeholder="CVC"
                      value={formData.cardCVC}
                      onChange={(e) => setFormData({ ...formData, cardCVC: e.target.value })}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-600 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Powered by Stripe for secure payments
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition"
                  >
                    Review Order
                  </button>
                </div>
              </form>
            )}

            {/* Review Order */}
            {step === 'review' && (
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Review Your Order</h2>

                {/* Shipping Info */}
                <div className="pb-6 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3">Shipping Address</h3>
                  <p className="text-sm text-slate-700">
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}<br />
                    {formData.city}, {formData.state} {formData.zip}
                  </p>
                </div>

                {/* Order Items */}
                <div className="pb-6 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3">Items</h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-slate-700">
                          {item.title} × {item.quantity}
                        </span>
                        <span className="font-semibold text-slate-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition"
                  >
                    Back
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-700">
                      {item.title} × {item.quantity}
                    </span>
                    <span className="font-semibold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
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

              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-cyan-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

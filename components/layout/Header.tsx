'use client'

import Link from 'next/link'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="hidden sm:inline font-bold text-xl text-gray-900">FoundForYou</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
            <Link href="/shop" className="text-gray-600 hover:text-purple-600 transition">
              Shop
            </Link>
            <Link href="/create" className="text-gray-600 hover:text-purple-600 transition">
              Create
            </Link>
            <Link href="/gallery" className="text-gray-600 hover:text-purple-600 transition">
              Gallery
            </Link>
            <div className="border-l border-gray-300 pl-6 flex gap-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-purple-600 transition">
                Login
              </Link>
              <Link href="/auth/register" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                Sign Up
              </Link>
            </div>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-purple-600 transition" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/shop" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">
              Shop
            </Link>
            <Link href="/create" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">
              Create
            </Link>
            <Link href="/gallery" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">
              Gallery
            </Link>
            <Link href="/auth/login" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">
              Login
            </Link>
            <Link href="/auth/register" className="block px-4 py-2 bg-purple-600 text-white rounded">
              Sign Up
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

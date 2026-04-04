'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Filter, ChevronDown } from 'lucide-react'

interface Product {
  id: string
  title: string
  image: string
  price: number
  category: string
  style: string
  uniqueNumber: number
  totalUnique: number
  viewsToday: number
  remaining: number
  rating: number
  reviews: number
}

// Mock products data - will be replaced with Firestore queries
const mockProducts: Product[] = [
  {
    id: 'UU-1712192400-seed1-001',
    title: 'Cosmic Dreamer',
    image: 'https://images.unsplash.com/photo-1578432291840-8d1c6b69b379?w=400&h=400&fit=crop',
    price: 34.95,
    category: 'apparel',
    style: 'cosmic',
    uniqueNumber: 1,
    totalUnique: 1,
    viewsToday: 234,
    remaining: 0,
    rating: 4.8,
    reviews: 12,
  },
  {
    id: 'UU-1712192401-seed2-001',
    title: 'Minimalist Wave',
    image: 'https://images.unsplash.com/photo-1574032123339-5d3e3c6cdb00?w=400&h=400&fit=crop',
    price: 29.95,
    category: 'apparel',
    style: 'minimalist',
    uniqueNumber: 1,
    totalUnique: 1,
    viewsToday: 156,
    remaining: 2,
    rating: 4.6,
    reviews: 8,
  },
  {
    id: 'UU-1712192402-seed3-001',
    title: 'Retro Vibes Hoodie',
    image: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=400&h=400&fit=crop',
    price: 49.95,
    category: 'apparel',
    style: 'retro',
    uniqueNumber: 1,
    totalUnique: 1,
    viewsToday: 89,
    remaining: 1,
    rating: 5.0,
    reviews: 3,
  },
  {
    id: 'UU-1712192403-seed4-001',
    title: 'Abstract Mug',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    price: 14.95,
    category: 'drinkware',
    style: 'abstract',
    uniqueNumber: 1,
    totalUnique: 1,
    viewsToday: 567,
    remaining: 3,
    rating: 4.9,
    reviews: 21,
  },
  {
    id: 'UU-1712192404-seed5-001',
    title: 'Fantasy Poster',
    image: 'https://images.unsplash.com/photo-1578432291840-8d1c6b69b379?w=400&h=400&fit=crop',
    price: 19.95,
    category: 'posters',
    style: 'fantasy',
    uniqueNumber: 1,
    totalUnique: 1,
    viewsToday: 432,
    remaining: 5,
    rating: 4.7,
    reviews: 14,
  },
  {
    id: 'UU-1712192405-seed6-001',
    title: 'Zen Garden Print',
    image: 'https://images.unsplash.com/photo-1599599810694-e3ba5ebb6d4b?w=400&h=400&fit=crop',
    price: 24.95,
    category: 'posters',
    style: 'zen',
    uniqueNumber: 1,
    totalUnique: 1,
    viewsToday: 123,
    remaining: 4,
    rating: 4.5,
    reviews: 6,
  },
  {
    id: 'UU-1712192406-seed7-001',
    title: 'Cyberpunk T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    price: 28.95,
    category: 'apparel',
    style: 'cyberpunk',
    uniqueNumber: 1,
    totalUnique: 1,
    viewsToday: 345,
    remaining: 2,
    rating: 4.8,
    reviews: 9,
  },
  {
    id: 'UU-1712192407-seed8-001',
    title: 'Nature Canvas',
    image: 'https://images.unsplash.com/photo-1552589730-d3a09e4fb882?w=400&h=400&fit=crop',
    price: 54.95,
    category: 'canvas',
    style: 'nature',
    uniqueNumber: 1,
    totalUnique: 1,
    viewsToday: 78,
    remaining: 1,
    rating: 5.0,
    reviews: 2,
  },
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 })
  const [selectedStyle, setSelectedStyle] = useState('all')
  const [sortBy, setSortBy] = useState('trending')

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'drinkware', label: 'Drinkware' },
    { id: 'posters', label: 'Posters' },
    { id: 'canvas', label: 'Canvas' },
  ]

  const styles = [
    { id: 'all', label: 'All Styles' },
    { id: 'cosmic', label: 'Cosmic' },
    { id: 'minimalist', label: 'Minimalist' },
    { id: 'retro', label: 'Retro' },
    { id: 'abstract', label: 'Abstract' },
    { id: 'fantasy', label: 'Fantasy' },
    { id: 'zen', label: 'Zen' },
    { id: 'cyberpunk', label: 'Cyberpunk' },
    { id: 'nature', label: 'Nature' },
  ]

  const sortOptions = [
    { id: 'trending', label: 'Trending' },
    { id: 'newest', label: 'Newest' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Top Rated' },
    { id: 'views', label: 'Most Viewed' },
  ]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.style.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory

      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max

      const matchesStyle = selectedStyle === 'all' || product.style === selectedStyle

      return matchesSearch && matchesCategory && matchesPrice && matchesStyle
    })

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'views':
        filtered.sort((a, b) => b.viewsToday - a.viewsToday)
        break
      case 'trending':
        filtered.sort((a, b) => b.viewsToday - a.viewsToday)
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, priceRange, selectedStyle, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header Section */}
      <section className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Discover Unique Creations</h1>
          <p className="text-slate-600 mb-6">Browse AI-generated, one-of-a-kind products from our community</p>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search designs, styles, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-56 flex-shrink-0">
            <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h2>

              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-slate-900 mb-3 text-sm">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat.id}
                        checked={selectedCategory === cat.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                      />
                      <span className="text-sm text-slate-700">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-slate-900 mb-3 text-sm">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-600">Min: ${priceRange.min}</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: Math.min(parseInt(e.target.value), priceRange.max),
                        })
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600">Max: ${priceRange.max}</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: Math.max(parseInt(e.target.value), priceRange.min),
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Style Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-slate-900 mb-3 text-sm">Style</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {styles.map((style) => (
                    <label key={style.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="style"
                        value={style.id}
                        checked={selectedStyle === style.id}
                        onChange={(e) => setSelectedStyle(e.target.value)}
                        className="w-4 h-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                      />
                      <span className="text-sm text-slate-700">{style.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setPriceRange({ min: 0, max: 100 })
                  setSelectedStyle('all')
                }}
                className="w-full py-2 px-4 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> products
              </p>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/product`}>
                    <div className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-cyan-500 hover:shadow-lg transition cursor-pointer h-full">
                      {/* Image Container */}
                      <div className="relative overflow-hidden bg-slate-100 aspect-square">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />

                        {/* Badges */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          {product.remaining === 0 ? (
                            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              Sold Out
                            </div>
                          ) : product.remaining <= 3 ? (
                            <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              ⏰ {product.remaining} left
                            </div>
                          ) : null}
                          <div className="bg-cyan-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Limited #1 of 1
                          </div>
                        </div>

                        {/* Views Badge */}
                        <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
                          👁 {product.viewsToday} views
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-cyan-600 transition">
                          {product.title}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                            ))}
                          </div>
                          <span className="text-xs text-slate-600">({product.reviews})</span>
                        </div>

                        {/* Price */}
                        <div className="text-2xl font-bold text-slate-900">${product.price.toFixed(2)}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600 text-lg mb-4">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setPriceRange({ min: 0, max: 100 })
                    setSelectedStyle('all')
                  }}
                  className="text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Clear filters and try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

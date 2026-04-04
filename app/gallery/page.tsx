'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Heart, Share2, User, TrendingUp } from 'lucide-react'

interface Creator {
  id: string
  name: string
  avatar: string
  followers: number
  verified: boolean
  products: number
}

interface Product {
  id: string
  title: string
  image: string
  creatorId: string
  creatorName: string
  creatorAvatar: string
  price: number
  style: string
  views: number
  likes: number
  rating: number
}

// Mock creators
const creators: Creator[] = [
  {
    id: 'creator-001',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    followers: 1243,
    verified: true,
    products: 12,
  },
  {
    id: 'creator-002',
    name: 'Emma Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    followers: 892,
    verified: true,
    products: 8,
  },
  {
    id: 'creator-003',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    followers: 654,
    verified: false,
    products: 5,
  },
]

// Mock products
const mockProducts: Product[] = [
  {
    id: 'prod-001',
    title: 'Cosmic Dreamer',
    image: 'https://images.unsplash.com/photo-1578432291840-8d1c6b69b379?w=400&h=400&fit=crop',
    creatorId: 'creator-001',
    creatorName: 'Alex Rivera',
    creatorAvatar: creators[0].avatar,
    price: 34.95,
    style: 'cosmic',
    views: 234,
    likes: 45,
    rating: 4.8,
  },
  {
    id: 'prod-002',
    title: 'Minimalist Wave',
    image: 'https://images.unsplash.com/photo-1574032123339-5d3e3c6cdb00?w=400&h=400&fit=crop',
    creatorId: 'creator-002',
    creatorName: 'Emma Johnson',
    creatorAvatar: creators[1].avatar,
    price: 29.95,
    style: 'minimalist',
    views: 156,
    likes: 32,
    rating: 4.6,
  },
  {
    id: 'prod-003',
    title: 'Retro Vibes',
    image: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=400&h=400&fit=crop',
    creatorId: 'creator-003',
    creatorName: 'Marcus Chen',
    creatorAvatar: creators[2].avatar,
    price: 49.95,
    style: 'retro',
    views: 89,
    likes: 28,
    rating: 5.0,
  },
  {
    id: 'prod-004',
    title: 'Abstract Art',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    creatorId: 'creator-001',
    creatorName: 'Alex Rivera',
    creatorAvatar: creators[0].avatar,
    price: 14.95,
    style: 'abstract',
    views: 567,
    likes: 89,
    rating: 4.9,
  },
  {
    id: 'prod-005',
    title: 'Fantasy Quest',
    image: 'https://images.unsplash.com/photo-1599599810694-e3ba5ebb6d4b?w=400&h=400&fit=crop',
    creatorId: 'creator-002',
    creatorName: 'Emma Johnson',
    creatorAvatar: creators[1].avatar,
    price: 19.95,
    style: 'fantasy',
    views: 432,
    likes: 67,
    rating: 4.7,
  },
  {
    id: 'prod-006',
    title: 'Zen Garden',
    image: 'https://images.unsplash.com/photo-1552589730-d3a09e4fb882?w=400&h=400&fit=crop',
    creatorId: 'creator-003',
    creatorName: 'Marcus Chen',
    creatorAvatar: creators[2].avatar,
    price: 24.95,
    style: 'zen',
    views: 123,
    likes: 45,
    rating: 4.5,
  },
]

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('all')
  const [sortBy, setSortBy] = useState('trending')
  const [view, setView] = useState<'products' | 'creators'>('products')

  const styles = ['all', 'cosmic', 'minimalist', 'retro', 'abstract', 'fantasy', 'zen']

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStyle = selectedStyle === 'all' || product.style === selectedStyle
    return matchesSearch && matchesStyle
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.views - a.views
      case 'popular':
        return b.likes - a.likes
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return 0 // Placeholder
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Community Gallery 🎨</h1>
          <p className="text-lg opacity-90">Scopri creazioni uniche da talenti di tutto il mondo</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* View Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setView('products')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              view === 'products'
                ? 'text-cyan-600 border-cyan-600'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            Prodotti ({mockProducts.length})
          </button>
          <button
            onClick={() => setView('creators')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              view === 'creators'
                ? 'text-cyan-600 border-cyan-600'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            Creatori ({creators.length})
          </button>
        </div>

        {/* Products View */}
        {view === 'products' && (
          <>
            {/* Search & Filter */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cerca prodotti o creatori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {styles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                        selectedStyle === style
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {style === 'all' ? 'Tutti' : style.charAt(0).toUpperCase() + style.slice(1)}
                    </button>
                  ))}
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 ml-auto"
                >
                  <option value="trending">Tendenze</option>
                  <option value="popular">Più Popolari</option>
                  <option value="rating">Meglio Valutati</option>
                  <option value="newest">Più Recenti</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div key={product.id} className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-cyan-400 hover:shadow-lg transition">
                  {/* Image */}
                  <div className="relative overflow-hidden bg-slate-100 aspect-square">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <div className="bg-cyan-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {product.views}
                      </div>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                      <button className="bg-white rounded-full p-3 hover:bg-cyan-100 transition">
                        <Heart className="w-5 h-5 text-red-500" />
                      </button>
                      <button className="bg-white rounded-full p-3 hover:bg-cyan-100 transition">
                        <Share2 className="w-5 h-5 text-cyan-600" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Creator Info */}
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200">
                      <img
                        src={product.creatorAvatar}
                        alt={product.creatorName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {product.creatorName}
                          {creators.find(c => c.id === product.creatorId)?.verified && (
                            <span className="text-blue-600 ml-1">✓</span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Title */}
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
                      <span className="text-xs text-slate-600">({product.likes})</span>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                      <button className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-semibold hover:from-cyan-600 hover:to-blue-700 transition">
                        Visualizza
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Creators View */}
        {view === 'creators' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator) => (
              <div key={creator.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-cyan-400 hover:shadow-lg transition">
                {/* Header Background */}
                <div className="h-24 bg-gradient-to-r from-purple-400 to-pink-400" />

                {/* Content */}
                <div className="px-6 pb-6 -mt-12 relative">
                  {/* Avatar */}
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover mb-4"
                  />

                  {/* Info */}
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-1">
                    {creator.name}
                    {creator.verified && <span className="text-blue-600">✓</span>}
                  </h3>

                  <div className="flex gap-6 text-sm text-slate-600 mb-4">
                    <div>
                      <p className="font-semibold text-slate-900">{creator.followers}</p>
                      <p>Seguaci</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{creator.products}</p>
                      <p>Prodotti</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition">
                      Segui
                    </button>
                    <button className="flex-1 py-2 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition">
                      Visualizza
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

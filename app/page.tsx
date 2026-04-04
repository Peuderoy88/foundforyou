'use client'

import Link from 'next/link'
import { Search, Sparkles, Wand2 } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('for-you')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'for-you', label: 'For You' },
    { id: 'whimsical', label: 'Whimsical' },
    { id: 'inspirational', label: 'Inspirational' },
    { id: 'deep', label: 'Deep' },
    { id: 'retro', label: 'Retro' },
  ]

  const products = [
    {
      id: 1,
      title: 'For Your Love of Fantasy',
      image: 'https://images.unsplash.com/photo-1578432291840-8d1c6b69b379?w=400&h=400&fit=crop',
      price: 24.95,
      description: 'Floresca is just | Isem',
    },
    {
      id: 2,
      title: 'Based on Your Interests',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
      price: 17.95,
      description: 'Drier cal tone of it mink | oath',
    },
    {
      id: 3,
      title: 'Inspired by Kanye West',
      image: 'https://images.unsplash.com/photo-1578432291840-8d1c6b69b379?w=400&h=400&fit=crop',
      price: 39.95,
      description: 'Haporloru i mt eren iota | isem',
    },
    {
      id: 4,
      title: 'A Philosophical Twist of Humor',
      image: 'https://images.unsplash.com/photo-1599599810694-e3ba5ebb6d4b?w=400&h=400&fit=crop',
      price: 10.95,
      description: 'Minimal art design | isem',
    },
  ]

  const collections = [
    {
      id: 1,
      title: 'Witty & Humorous',
      image: 'https://images.unsplash.com/photo-1578432291840-8d1c6b69b379?w=500&h=400&fit=crop',
      price: 19.95,
      description: 'Essença, dim 1 | isem',
    },
    {
      id: 2,
      title: 'Cosmic Dreams',
      image: 'https://images.unsplash.com/photo-1552589730-d3a09e4fb882?w=800&h=400&fit=crop',
      price: 29.95,
      description: 'Galaxy-inspired collection',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div
              className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"
              style={{ animation: 'blob 7s infinite' }}
            />
            <div
              className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"
              style={{ animation: 'blob 7s infinite 2s' }}
            />
            <div
              className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"
              style={{ animation: 'blob 7s infinite 4s' }}
            />
          </div>

          {/* Starfield Effect */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-50"
                style={{
                  width: Math.random() * 3 + 'px',
                  height: Math.random() * 3 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
                Find something that exists just for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">YOU</span>.
              </h1>
              <p className="text-xl text-gray-300">
                Shop unique, one-of-kind creations, or create your own personalized product with the power of AI.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all hover:scale-105 text-center"
              >
                Discover
              </Link>
              <Link
                href="/create"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-pink-500/50 transition-all hover:scale-105 text-center"
              >
                Create
              </Link>
            </div>
          </div>

          {/* Right Illustration - Magnifying Glass */}
          <div className="relative h-96 lg:h-full flex items-center justify-center">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              {/* Outer Circle Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full filter blur-2xl opacity-40 animate-pulse" />

              {/* Magnifying Glass */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full animate-float"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              >
                {/* Lens */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="url(#lensGradient)"
                  stroke="url(#strokeGradient)"
                  strokeWidth="8"
                  opacity="0.8"
                />

                {/* Handle */}
                <rect
                  x="130"
                  y="130"
                  width="20"
                  height="60"
                  rx="10"
                  fill="url(#handleGradient)"
                  stroke="url(#strokeGradient)"
                  strokeWidth="3"
                  opacity="0.8"
                />

                {/* Stars inside lens */}
                <circle cx="75" cy="80" r="3" fill="#fbbf24" opacity="0.8" />
                <circle cx="120" cy="90" r="2" fill="#fbbf24" opacity="0.6" />
                <circle cx="110" cy="130" r="2.5" fill="#fbbf24" opacity="0.7" />

                {/* Gradients */}
                <defs>
                  <radialGradient id="lensGradient">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                  </radialGradient>
                  <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="handleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Animated Sparkles */}
              <Sparkles className="absolute top-4 right-8 w-6 h-6 text-yellow-300 animate-bounce" />
              <Sparkles className="absolute bottom-16 left-8 w-4 h-4 text-yellow-300 animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">
            Discover What We've Found For You Today
          </h2>
          <p className="text-center text-gray-600 mb-12">
            <Sparkles className="w-4 h-4 inline mr-2 text-yellow-500" />
            Curated just for your taste
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Futuristic samurai warrior surrounded by cherry blossoms"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition">
                <Wand2 className="w-5 h-5" />
              </button>
            </div>

            {/* Try suggestions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Try:</span>
              <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                <span>✏️</span> Surreal city skyline
              </button>
              <button className="text-sm text-pink-600 hover:underline flex items-center gap-1">
                <span>💕</span> Fantasy wolf
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
                  <p className="text-xs text-gray-500 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      💶{product.price.toFixed(2)}
                    </span>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Curated Collections */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">
              Explore Curated Collections
              <span className="text-sm text-gray-500 ml-3">Nating wild ormers of passion</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">{collection.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{collection.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        💶{collection.price.toFixed(2)}
                      </span>
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition flex items-center gap-2">
                        Buy Now
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

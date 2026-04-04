'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, Share2, ShoppingCart, Download, MessageSquare } from 'lucide-react'
import { useCart } from '@/context/CartContext'

interface Review {
  id: string
  author: string
  rating: number
  title: string
  comment: string
  date: string
  avatar: string
}

// Mock product data - will be replaced with Firestore query
const mockProduct = {
  id: 'UU-1712192400-seed1-001',
  title: 'Cosmic Dreamer',
  description:
    'A mesmerizing fusion of cosmic elements and dreamlike imagery. This piece captures the essence of infinite possibilities and celestial wonder. Perfect for those who seek inspiration in the stars and dare to dream beyond boundaries.',
  image: 'https://images.unsplash.com/photo-1578432291840-8d1c6b69b379?w=800&h=800&fit=crop',
  price: 34.95,
  category: 'apparel',
  style: 'cosmic',
  uniqueNumber: 1,
  totalUnique: 1,
  viewsToday: 234,
  remaining: 0,
  rating: 4.8,
  reviewCount: 12,
  createdAt: '2024-04-03',
  creator: {
    id: 'creator-001',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    followers: 1243,
    verified: true,
  },
  certificate: {
    id: 'CERT-UU-1712192400-seed1-001',
    serialNumber: 'FFYOU-2024-000001',
    issuedAt: '2024-04-03',
    downloadUrl: '/certificates/FFYOU-2024-000001.pdf',
  },
  reviews: [
    {
      id: 'rev-1',
      author: 'Sarah Chen',
      rating: 5,
      title: 'Amazing quality!',
      comment: 'The design is absolutely stunning. Better quality than expected. Would definitely buy again!',
      date: '2024-04-01',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      id: 'rev-2',
      author: 'Marcus Thompson',
      rating: 4,
      title: 'Great design, great value',
      comment: 'Love the uniqueness. Fits perfectly and the colors are vibrant. Shipping was fast too.',
      date: '2024-03-28',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      id: 'rev-3',
      author: 'Emma Williams',
      rating: 5,
      title: 'One of a kind!',
      comment: "This is exactly what I was looking for. Love that it's truly unique and comes with a certificate of authenticity.",
      date: '2024-03-25',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
  ] as Review[],
}

export default function ProductPage() {
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isFavorited, setIsFavorited] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const isOutOfStock = mockProduct.remaining === 0

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addItem({
        id: mockProduct.id,
        title: mockProduct.title,
        price: mockProduct.price,
        image: mockProduct.image,
        quantity,
        productType: mockProduct.category,
        style: mockProduct.style,
      })
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockProduct.title,
        text: `Check out this unique ${mockProduct.title} on FoundForYou!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-cyan-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-cyan-600">
            Shop
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{mockProduct.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Product Images */}
          <div>
            {/* Main Image */}
            <div className="mb-4">
              <div className="relative bg-slate-100 rounded-lg overflow-hidden aspect-square group">
                <img
                  src={mockProduct.image}
                  alt={mockProduct.title}
                  className="w-full h-full object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Limited #1 of 1
                  </div>
                  {mockProduct.remaining === 0 ? (
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Sold Out
                    </div>
                  ) : mockProduct.remaining <= 3 ? (
                    <div className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      ⏰ Only {mockProduct.remaining} left
                    </div>
                  ) : null}
                </div>

                {/* View Count */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                  👁 {mockProduct.viewsToday} views today
                </div>
              </div>
            </div>

            {/* Product Info Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Product Details</h3>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium capitalize">{mockProduct.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Style:</span>
                  <span className="font-medium capitalize">{mockProduct.style}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span className="font-medium">{new Date(mockProduct.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3 mt-3">
                  <span>Uniqueness ID:</span>
                  <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">{mockProduct.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            {/* Header */}
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{mockProduct.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">
                      {i < Math.floor(mockProduct.rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="font-semibold text-slate-900">{mockProduct.rating}</span>
              </div>
              <span className="text-slate-600">({mockProduct.reviewCount} reviews)</span>
            </div>

            {/* Description */}
            <p className="text-slate-700 mb-8 leading-relaxed">{mockProduct.description}</p>

            {/* Pricing */}
            <div className="mb-8">
              <div className="text-5xl font-bold text-slate-900 mb-2">${mockProduct.price.toFixed(2)}</div>
              <p className="text-slate-600">
                One-of-a-kind, uniquely generated with AI. Comes with Certificate of Authenticity.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              {/* Quantity and Add to Cart */}
              <div className="flex gap-4">
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isOutOfStock}
                    className="px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-12 text-center font-semibold border-x border-slate-300 py-2"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isOutOfStock}
                    className="px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold transition ${
                    isOutOfStock
                      ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                      : addedToCart
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isOutOfStock ? 'Out of Stock' : addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`flex-1 flex items-center justify-center gap-2 px-8 py-3 border-2 rounded-lg font-semibold transition ${
                    isFavorited
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-slate-300 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'Favorited' : 'Favorite'}
                </button>

                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>

            {/* Creator Info */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-slate-900 mb-4">Created by</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={mockProduct.creator.avatar}
                    alt={mockProduct.creator.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-slate-900 flex items-center gap-2">
                      {mockProduct.creator.name}
                      {mockProduct.creator.verified && <span className="text-blue-600">✓</span>}
                    </div>
                    <p className="text-sm text-slate-600">{mockProduct.creator.followers} followers</p>
                  </div>
                </div>
                <Link
                  href="/gallery"
                  className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition"
                >
                  View Profile
                </Link>
              </div>
            </div>

            {/* Certificate Section */}
            <div className="bg-white border-2 border-cyan-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎖️</span>
                Certificate of Authenticity
              </h3>
              <div className="space-y-3 text-sm text-slate-700 mb-4">
                <div className="flex justify-between">
                  <span>Certificate ID:</span>
                  <span className="font-mono bg-slate-100 px-2 py-1 rounded text-xs">
                    {mockProduct.certificate.serialNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Issued:</span>
                  <span>{new Date(mockProduct.certificate.issuedAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-slate-600">
                  This product comes with a tamper-proof digital certificate verifying its uniqueness and authenticity.
                </p>
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition">
                <Download className="w-4 h-4" />
                Download Certificate
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-slate-200 pt-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Customer Reviews</h2>

          {/* Review Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">{mockProduct.rating}</div>
              <div className="flex justify-center text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < Math.floor(mockProduct.rating) ? '★' : '☆'}</span>
                ))}
              </div>
              <p className="text-sm text-slate-600">Based on {mockProduct.reviewCount} reviews</p>
            </div>

            {[5, 4, 3].map((stars) => {
              const count = Math.floor(mockProduct.reviewCount * (6 - stars) / 15)
              const percentage = (count / mockProduct.reviewCount) * 100
              return (
                <div key={stars} className="bg-white border border-slate-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{stars}</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                  </div>
                  <p className="text-xs text-slate-600">{count} reviews</p>
                </div>
              )
            })}
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {mockProduct.reviews.map((review) => (
              <div key={review.id} className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{review.author}</p>
                      <p className="text-xs text-slate-600">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>

                <h4 className="font-semibold text-slate-900 mb-2">{review.title}</h4>
                <p className="text-slate-700 mb-4">{review.comment}</p>

                <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                  <MessageSquare className="w-4 h-4" />
                  Helpful ({Math.floor(Math.random() * 20)})
                </button>
              </div>
            ))}
          </div>

          {/* Load More Reviews */}
          <div className="text-center mt-8">
            <button className="px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition">
              Load More Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

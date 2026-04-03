/**
 * Core TypeScript types for FoundForYou
 */

// User Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  totalSpent: number
  totalCreations: number
  totalOrders: number
  badges: string[]
  status: 'active' | 'suspended' | 'banned' | 'deleted'
  socialLinks?: SocialLinks
  preferences?: UserPreferences
  roles: ('user' | 'admin')[]
}

export interface SocialLinks {
  instagram?: string
  tiktok?: string
  twitter?: string
}

export interface UserPreferences {
  newsletter: boolean
  notifications: boolean
}

// Product Types
export interface Product {
  id: string
  title: string
  description: string
  imageUrl: string
  prompt: string
  template: 't-shirt' | 'mug' | 'hoodie' | 'poster'
  basePrice: number
  sellingPrice: number
  colors: ColorPalette
  style: 'vibrant' | 'dark' | 'minimal' | 'pastel'
  artistId: string
  createdAt: Date
  status: 'draft' | 'available' | 'sold-out' | 'archived'
  limit: number // max units
  sold: number // units sold
  uniqueId: string // UU-{TIMESTAMP}-{SEED}-{SERIAL}
  sdSeed: number // Stable Diffusion seed
  sdModel: string
  certificateUrl?: string
  tags: string[]
  ratings: ProductRatings
  socialShare?: SocialShareData
  visibility: 'public' | 'private' | 'draft'
}

export interface ColorPalette {
  primary: string
  secondary: string
  palette: string[]
}

export interface ProductRatings {
  avgRating: number
  count: number
}

export interface SocialShareData {
  instagramUrl?: string
  tiktokUrl?: string
  shareCount: number
}

// Order Types
export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'refunded'
  stripePaymentId?: string
  shippingAddress: ShippingAddress
  trackingNumber?: string
  createdAt: Date
  paidAt?: Date
  shippedAt?: Date
  notes?: string
}

export interface OrderItem {
  productId: string
  quantity: number
  price: number
  serialNumber: string
}

export interface ShippingAddress {
  name: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

// AI Generation Types
export interface AIGeneration {
  id: string
  userId: string
  prompt: string
  template: string
  status: 'queued' | 'processing' | 'completed' | 'failed'
  imageUrl?: string
  sdSeed: number
  sdModel: string
  style: string
  colors: string[]
  createdAt: Date
  completedAt?: Date
  errorMessage?: string
  retryCount: number
}

// Review Types
export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  title: string
  comment: string
  verified: boolean
  createdAt: Date
  helpful: number
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  quantity: number
  price: number
  addedAt: Date
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shippingCost: number
  tax: number
  total: number
}

// Uniqueness Types
export interface UniqueIDData {
  prefix: string // 'UU'
  timestamp: number
  seed: string
  serial: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  timestamp: Date
}

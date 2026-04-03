/**
 * Application Constants
 */

// Product Templates
export const PRODUCT_TEMPLATES = [
  { id: 't-shirt', name: 'T-Shirt', price: 29.99, image: '/images/templates/tshirt.jpg', stock: 100 },
  { id: 'mug', name: 'Mug', price: 19.99, image: '/images/templates/mug.jpg', stock: 80 },
  { id: 'hoodie', name: 'Hoodie', price: 59.99, image: '/images/templates/hoodie.jpg', stock: 50 },
  { id: 'poster', name: 'Poster', price: 24.99, image: '/images/templates/poster.jpg', stock: 120 },
] as const

// Design Styles
export const DESIGN_STYLES = [
  { id: 'vibrant', label: 'Vibrant', description: 'Bold, colorful, and energetic designs' },
  { id: 'dark', label: 'Dark', description: 'Mysterious, dramatic, moody aesthetic' },
  { id: 'minimal', label: 'Minimal', description: 'Clean, simple, elegant designs' },
  { id: 'pastel', label: 'Pastel', description: 'Soft, gentle, dreamy colors' },
] as const

// Color Palettes
export const COLOR_PALETTES = [
  { id: 'neon', name: 'Neon', colors: ['#FF006E', '#00F5FF', '#FFBE0B'] },
  { id: 'earthy', name: 'Earthy', colors: ['#8B4513', '#D2B48C', '#228B22'] },
  { id: 'ocean', name: 'Ocean', colors: ['#000080', '#0047AB', '#87CEEB'] },
  { id: 'sunset', name: 'Sunset', colors: ['#FF7F00', '#FF1493', '#FFD700'] },
  { id: 'forest', name: 'Forest', colors: ['#2D5016', '#3A7D44', '#4ADBC1'] },
  { id: 'cosmic', name: 'Cosmic', colors: ['#1A0033', '#7C3AED', '#FF006E'] },
] as const

// AI Generation
export const AI_CONFIG = {
  MAX_GENERATIONS_PER_USER_PER_DAY: 5,
  MAX_RETRIES: 3,
  GENERATION_TIMEOUT_MS: 120000, // 2 minutes
  STABLE_DIFFUSION_MODEL: 'stable-diffusion-xl-v1',
  STABLE_DIFFUSION_STEPS: 50,
  STABLE_DIFFUSION_GUIDANCE_SCALE: 7.5,
  IMAGE_SIZE: '1024x1024',
} as const

// Pricing
export const PRICING = {
  BASE_MARGIN: 0.3, // 30% markup
  SHIPPING_STANDARD: 12.0,
  SHIPPING_EXPRESS: 25.0,
  TAX_RATE: 0.0, // Set based on region
} as const

// Cart & Checkout
export const CART_CONFIG = {
  MAX_ITEMS: 50,
  SESSION_TIMEOUT_HOURS: 24,
} as const

// Stripe & Payment
export const PAYMENT_CONFIG = {
  CURRENCY: 'eur',
  PAYMENT_METHODS: ['card', 'paypal'],
} as const

// Pagination
export const PAGINATION = {
  PRODUCTS_PER_PAGE: 24,
  ORDERS_PER_PAGE: 10,
  REVIEWS_PER_PAGE: 5,
} as const

// URL Paths
export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  CREATE: '/create',
  GALLERY: '/gallery',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ACCOUNT: '/account',
  ADMIN: '/admin',
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  HELP: '/help',
  LEGAL: '/legal',
} as const

// UI Constants
export const UI = {
  ANIMATION_DURATION_MS: 300,
  TOAST_DURATION_MS: 5000,
  DEBOUNCE_DELAY_MS: 500,
  INFINITE_SCROLL_THRESHOLD: 0.5,
} as const

// Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIRES_UPPERCASE: true,
  PASSWORD_REQUIRES_NUMBERS: true,
  PROMPT_MAX_LENGTH: 500,
  PROMPT_MIN_LENGTH: 10,
  BANNED_WORDS: ['nsfw', 'explicit', 'violent'], // Add more as needed
} as const

// Badges & Achievements
export const BADGES = {
  FIRST_CREATOR: { id: 'first-creator', name: 'First Creator', icon: '🎨' },
  FIRST_PURCHASE: { id: 'first-purchase', name: 'First Purchase', icon: '🛍️' },
  COLLECTOR: { id: 'collector', name: 'Collector', icon: '🏆' },
  TRENDSETTER: { id: 'trendsetter', name: 'Trendsetter', icon: '⭐' },
  POWER_USER: { id: 'power-user', name: 'Power User', icon: '⚡' },
} as const

# Firestore Schema Documentation

## Collections Overview

FoundForYou uses 7 main Firestore collections with the following structure:

---

## 1. users/ Collection

**Purpose:** Store user profiles, preferences, and account data

**Document ID:** `{userId}` (Firebase Auth UID)

```javascript
{
  // Basic Info
  email: string,                    // User email (from Firebase Auth)
  name: string,                     // Display name
  avatar: string,                   // Avatar URL (optional)
  
  // Account Data
  createdAt: timestamp,             // Registration date
  lastLoginAt: timestamp,           // Last login (optional)
  
  // Activity Metrics
  totalSpent: number,               // Total amount spent (in EUR)
  totalCreations: number,           // Number of products created
  totalOrders: number,              // Number of orders placed
  
  // Status & Roles
  badges: [string],                 // Array of earned badges
  roles: [string],                  // ['user'] or ['user', 'admin']
  status: string,                   // 'active' | 'suspended' | 'banned'
  
  // Social Links
  socialLinks: {
    instagram: string,              // @username (optional)
    tiktok: string,                 // @username (optional)
    twitter: string,                // @username (optional)
  },
  
  // Preferences
  preferences: {
    newsletter: boolean,            // Subscribe to newsletter
    notifications: boolean,         // Enable notifications
    privateProfile: boolean,        // Hide profile from gallery
    darkMode: boolean,              // UI preference
  },
  
  // Security
  emailVerified: boolean,           // Email verification status
  twoFactorEnabled: boolean,        // 2FA status (optional)
}
```

**Indexes Required:**
- `totalSpent` (Descending) - For leaderboards
- `createdAt` (Descending) - For newest creators
- `status` (Ascending) - For filtering

---

## 2. products/ Collection

**Purpose:** Store AI-generated product listings

**Document ID:** `{productId}` (Auto-generated)

```javascript
{
  // Product Identity
  uniqueId: string,                 // UU-{TIMESTAMP}-{SEED}-{SERIAL}
  title: string,                    // AI-generated title
  description: string,              // AI-generated description
  imageUrl: string,                 // Image from Stable Diffusion
  
  // Creation Data
  prompt: string,                   // User's original prompt
  template: string,                 // 't-shirt' | 'mug' | 'hoodie' | 'poster'
  style: string,                    // 'vibrant' | 'dark' | 'minimal' | 'pastel'
  colors: {
    primary: string,                // Hex color (e.g., '#FF006E')
    secondary: string,              // Hex color
    palette: [string],              // Array of all colors used
  },
  
  // AI Metadata
  sdSeed: number,                   // Stable Diffusion seed (for reproducibility)
  sdModel: string,                  // 'stable-diffusion-xl-v1'
  promptHash: string,               // Hash of the prompt (for deduplication)
  
  // Creator Info
  artistId: string,                 // Reference to users/{userId}
  createdAt: timestamp,             // Creation date
  
  // Pricing
  basePrice: number,                // Cost to create (e.g., 15.00)
  sellingPrice: number,             // Selling price (e.g., 89.99)
  costMargin: number,               // Calculated margin percentage
  
  // Inventory
  status: string,                   // 'draft' | 'available' | 'sold-out' | 'archived'
  limit: number,                    // Max units allowed (e.g., 10)
  sold: number,                     // Units sold (0-limit)
  remaining: number,                // limit - sold (calculated)
  
  // Certificate
  certificateUrl: string,           // PDF certificate URL (optional)
  certificateId: string,            // Unique cert ID (optional)
  
  // Organization
  tags: [string],                   // ['gaming', 'sci-fi', 'limited-edition', 'trending']
  category: string,                 // Parent category (optional)
  
  // Social Engagement
  ratings: {
    avgRating: number,              // 0-5
    count: number,                  // Number of ratings
    totalScore: number,             // Sum of all ratings
  },
  
  socialShare: {
    instagramUrl: string,           // Share link (optional)
    tiktokUrl: string,              // Share link (optional)
    shareCount: number,             // Times shared
    viewCount: number,              // Page views
  },
  
  // Visibility & SEO
  visibility: string,               // 'public' | 'private' | 'draft'
  seoTitle: string,                 // For search engines
  seoDescription: string,           // For search engines
  seoKeywords: [string],            // SEO keywords
}
```

**Indexes Required:**
- `status` (Ascending), `createdAt` (Descending) - For shop filtering
- `artistId` (Ascending), `createdAt` (Descending) - For creator pages
- `template` (Ascending), `sold` (Ascending) - For inventory
- `tags` (Ascending), `createdAt` (Descending) - For category browsing
- `ratings.avgRating` (Descending) - For top-rated products

**Subcollection: reviews/**
- Stores product reviews (see Reviews section)

---

## 3. orders/ Collection

**Purpose:** Store customer orders and transaction history

**Document ID:** `{orderId}` (Auto-generated)

```javascript
{
  // Order Identity
  orderNumber: string,              // Human-readable (e.g., 'ORD-2024-00123')
  
  // Customer Info
  userId: string,                   // Reference to users/{userId}
  
  // Items
  items: [
    {
      productId: string,            // Reference to products/{id}
      productTitle: string,         // Snapshot of title
      productImage: string,         // Snapshot of image
      quantity: number,             // Units ordered (usually 1)
      price: number,                // Price per unit at purchase time
      subtotal: number,             // quantity × price
      serialNumber: string,         // Unique serial (e.g., 'PROD-001-OF-010')
      certificateUrl: string,       // Link to certificate (optional)
    }
  ],
  
  // Pricing
  subtotal: number,                 // Sum of all items
  shippingCost: number,             // Shipping fee
  shippingMethod: string,           // 'standard' | 'express'
  tax: number,                      // Sales tax
  couponCode: string,               // Applied coupon (optional)
  discount: number,                 // Discount amount
  total: number,                    // subtotal + shipping + tax - discount
  currency: string,                 // 'eur' (ISO 4217)
  
  // Shipping
  shippingAddress: {
    name: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    postalCode: string,
    country: string,
    company: string,                // (optional)
  },
  
  trackingNumber: string,           // Shipping tracking (optional)
  estimatedDelivery: timestamp,     // Estimated delivery date
  
  // Payment
  paymentMethod: string,            // 'stripe' | 'paypal'
  stripePaymentId: string,          // Stripe payment intent ID
  stripeCheckoutSessionId: string,  // Stripe session ID
  paypalTransactionId: string,      // PayPal transaction (optional)
  
  // Order Status
  status: string,                   // 'pending' | 'processing' | 'shipped' | 'delivered' | 'refunded'
  timeline: {
    createdAt: timestamp,           // Order placed
    paidAt: timestamp,              // Payment confirmed
    processingAt: timestamp,        // Started processing
    shippedAt: timestamp,           // Shipped out
    deliveredAt: timestamp,         // Delivered
    refundedAt: timestamp,          // Refunded (optional)
  },
  
  // Additional Info
  notes: string,                    // Order notes (optional)
  customerNotes: string,            // Customer special requests
  refundReason: string,             // If refunded (optional)
  
  // Marketing
  source: string,                   // 'organic' | 'social' | 'email' | 'referral'
  affiliateId: string,              // Referral program (optional)
}
```

**Indexes Required:**
- `userId` (Ascending), `timeline.createdAt` (Descending) - For user orders
- `status` (Ascending), `timeline.createdAt` (Descending) - For admin dashboard
- `timeline.createdAt` (Descending) - For recent orders

---

## 4. aiGenerations/ Collection

**Purpose:** Track AI image/text generation queue and status

**Document ID:** `{generationId}` (Auto-generated)

```javascript
{
  // Tracking
  userId: string,                   // Reference to users/{userId}
  batchId: string,                  // For batch processing (optional)
  
  // Input
  prompt: string,                   // User's design prompt
  template: string,                 // Product template
  style: string,                    // Design style
  colors: [string],                 // Color palette
  customText: string,               // Custom text overlay (optional)
  
  // Processing
  status: string,                   // 'queued' | 'processing' | 'completed' | 'failed'
  
  // AI Model Details
  imageGeneration: {
    model: string,                  // 'stable-diffusion-xl-v1'
    seed: number,                   // Fixed seed for reproducibility
    steps: number,                  // 50
    guidanceScale: number,          // 7.5
    imageSize: string,              // '1024x1024'
    negativePrompt: string,         // What NOT to generate
    status: string,                 // 'pending' | 'processing' | 'completed' | 'failed'
    imageUrl: string,               // Generated image URL (optional)
    duration: number,               // Generation time (ms)
    errorMessage: string,           // If failed (optional)
  },
  
  textGeneration: {
    model: string,                  // 'claude-3-sonnet-20240229'
    status: string,                 // 'pending' | 'processing' | 'completed' | 'failed'
    title: string,                  // Generated product title (optional)
    description: string,            // Generated description (optional)
    keywords: [string],             // SEO keywords (optional)
    duration: number,               // Generation time (ms)
    errorMessage: string,           // If failed (optional)
  },
  
  // Retry Logic
  retryCount: number,               // Number of retry attempts
  maxRetries: number,               // Max allowed retries (3)
  
  // Timestamps
  createdAt: timestamp,             // Started generation
  startedAt: timestamp,             // When processing began (optional)
  completedAt: timestamp,           // When finished (optional)
  nextRetryAt: timestamp,           // If scheduled for retry (optional)
  
  // Association
  productId: string,                // Reference to created product (once done)
  orderId: string,                  // Associated order (optional)
}
```

**Indexes Required:**
- `userId` (Ascending), `status` (Ascending) - For user's generation status
- `status` (Ascending), `createdAt` (Descending) - For queue monitoring
- `completedAt` (Descending) - For analytics

---

## 5. reviews/ Collection

**Purpose:** Store product reviews and ratings

**Document ID:** `{reviewId}` (Auto-generated)

```javascript
{
  // Review Identity
  productId: string,                // Reference to products/{id}
  userId: string,                   // Reference to users/{userId}
  
  // Rating & Content
  rating: number,                   // 1-5 stars
  title: string,                    // Review title
  comment: string,                  // Review comment (max 1000 chars)
  
  // Verification
  verified: boolean,                // true if user purchased product
  purchaseDate: timestamp,          // When user bought the product
  
  // Engagement
  helpful: number,                  // Count of "helpful" votes
  unhelpful: number,                // Count of "unhelpful" votes
  
  // Moderation
  approved: boolean,                // Pass moderation
  flagged: boolean,                 // Flagged for review
  flagReason: string,               // Why flagged (optional)
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
}
```

**Indexes Required:**
- `productId` (Ascending), `rating` (Descending) - For product reviews
- `verified` (Ascending), `rating` (Descending) - For verified reviews only

---

## 6. analytics/ Collection

**Purpose:** Store daily and aggregate analytics data

**Document ID:** `{date}` (YYYY-MM-DD format)

```javascript
{
  date: string,                     // 'YYYY-MM-DD'
  
  // Page Analytics
  pageViews: {
    home: number,
    shop: number,
    product: number,
    create: number,
    gallery: number,
    checkout: number,
  },
  
  // User Analytics
  newUsers: number,                 // New signups today
  activeUsers: number,              // Logged in users
  returningUsers: number,           // Returning visitors
  
  // Conversion Analytics
  visits: number,                   // Total visits
  cartsCreated: number,             // Carts initiated
  checkoutsStarted: number,         // Checkout page views
  ordersCompleted: number,          // Orders completed
  conversionRate: number,           // visits → orders (%)
  
  // Product Analytics
  productsCreated: number,          // New products created
  topProducts: [                    // Top 5 products
    {
      productId: string,
      title: string,
      views: number,
      sales: number,
    }
  ],
  topPrompts: [                     // Most used prompts
    {
      prompt: string,
      count: number,
    }
  ],
  
  // Revenue Analytics
  revenue: number,                  // Total revenue (EUR)
  avgOrderValue: number,            // Average order value
  totalOrders: number,              // Orders placed
  refunds: number,                  // Refund amount
  
  // Social Analytics
  totalShares: number,              // Total shares
  socialTraffic: {
    instagram: number,
    tiktok: number,
    twitter: number,
  },
  
  // Technical
  errors: number,                   // API errors
  aiGenerationErrors: number,       // AI generation failures
  paymentErrors: number,            // Payment failures
}
```

**Indexes Required:**
- `date` (Descending) - For date range queries

---

## 7. config/ Collection

**Purpose:** Application-wide configuration

**Document ID:** `appSettings`

```javascript
{
  // Maintenance
  maintenanceMode: boolean,         // Put app in maintenance
  maintenanceMessage: string,       // Maintenance message
  
  // AI Limits
  aiQueueEnabled: boolean,          // Enable AI generation queue
  maxGenerationsPerDay: number,     // Max 5 per user/day
  maxGenerationRetries: number,     // Max retry attempts (3)
  generationTimeoutMs: number,      // Timeout in milliseconds
  
  // Inventory
  reservationExpiryHours: number,   // How long to reserve (default 1 hour)
  
  // Pricing
  baseMarginPercentage: number,     // 30% default
  shippingStandard: number,         // Standard shipping cost
  shippingExpress: number,          // Express shipping cost
  
  // Limits
  maxCartItems: number,             // Max 50
  maxRetailPrice: number,           // Max 500 EUR
  minRetailPrice: number,           // Min 10 EUR
  
  // Security (Encrypted in practice)
  stableDiffusionApiKey: string,    // ENCRYPTED
  claudeApiKey: string,             // ENCRYPTED
  stripePublishableKey: string,
  stripeSecretKey: string,          // ENCRYPTED
  paypalClientId: string,
  paypalSecret: string,             // ENCRYPTED
  
  // Feature Flags
  features: {
    paypal: boolean,
    socialSharing: boolean,
    reviews: boolean,
    adminPanel: boolean,
    analyticsDashboard: boolean,
  },
  
  // Email
  emailProvider: string,            // 'sendgrid' | 'resend'
  emailApiKey: string,              // ENCRYPTED
  notificationEmail: string,
  
  // Monitoring
  sentryDsn: string,                // Error tracking
  analyticsId: string,              // Google Analytics
  
  // Metadata
  lastUpdated: timestamp,
  updatedBy: string,                // Admin user ID
}
```

---

## Firestore Indexes

### Single-Field Indexes

These should be auto-created by Firebase:
- `users.createdAt` (Descending)
- `products.createdAt` (Descending)
- `products.sold` (Ascending)
- `orders.createdAt` (Descending)
- `analytics.date` (Descending)

### Composite Indexes

Create these manually in Firebase Console:

| Collection | Fields | Order |
|-----------|--------|-------|
| products | status, createdAt | Asc, Desc |
| products | artistId, createdAt | Asc, Desc |
| products | template, sold | Asc, Asc |
| products | tags, createdAt | Asc, Desc |
| products | ratings.avgRating, createdAt | Desc, Desc |
| orders | userId, createdAt | Asc, Desc |
| orders | status, createdAt | Asc, Desc |
| aiGenerations | userId, status | Asc, Asc |
| aiGenerations | status, createdAt | Asc, Desc |
| reviews | productId, rating | Asc, Desc |

---

## Data Validation Rules

### User Creation
- Email must be unique (Firebase Auth)
- Name: 2-50 characters
- Avatar: valid URL format

### Product Creation
- Prompt: 10-500 characters
- Template: one of allowed templates
- Style: one of allowed styles
- Price: 10-500 EUR

### Order Creation
- Items: min 1, max 50
- Total: must match calculation
- Shipping: must include address

### Review Creation
- Rating: 1-5 integer
- Comment: 10-1000 characters
- Only verified (purchased) users can review

---

## Timestamp Format

All timestamps use Firebase `serverTimestamp()`:
- Automatically set by backend
- Ensures consistency across regions
- Cannot be manually overwritten by client

---

## Backup & Recovery

Firestore automatic backups are enabled:
- Daily backups to Google Cloud Storage
- 30-day retention
- On-demand backup creation available

---

## Data Retention Policies

- **Draft Products**: Delete after 90 days
- **Abandoned Carts**: Delete after 30 days
- **Failed Generations**: Delete after 7 days
- **Orders**: Keep indefinitely (legal requirement)
- **User Data**: Delete on account closure (GDPR)
- **Analytics**: Aggregate after 90 days

---

## Security Considerations

1. **Never expose API keys** - Use Cloud Functions for sensitive operations
2. **Validate on backend** - Don't trust client data
3. **Use security rules** - Enforce at Firestore level
4. **Encrypt sensitive fields** - API keys in config collection
5. **Audit logging** - Track admin actions
6. **Rate limiting** - Prevent abuse (via Cloud Functions)

---

Last updated: April 2024

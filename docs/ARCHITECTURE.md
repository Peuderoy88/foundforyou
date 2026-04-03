# FoundForYou Architecture

## System Overview

FoundForYou is a premium AI-powered ecommerce platform built with modern web technologies.

### Tech Stack

**Frontend:**
- Next.js 14+ (App Router)
- React 18+
- TypeScript (strict mode)
- Tailwind CSS
- Shadcn/UI Components
- Lucide React Icons

**Backend & Services:**
- Firebase (Firestore, Auth, Storage)
- Stripe API (Payments)
- Replicate API (Stable Diffusion)
- Anthropic Claude API (Text generation)

**Deployment:**
- Vercel (recommended)
- Firebase (DB, Auth)
- Stripe (Payment processing)

## Directory Structure

```
foundforyou/
├── app/
│   ├── (root routes)      # / home, /shop, /create, /gallery, etc.
│   ├── api/               # API endpoints
│   ├── auth/              # Authentication pages
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
│
├── components/
│   ├── layout/            # Header, Footer
│   ├── home/              # Homepage sections
│   ├── shop/              # Shop components
│   ├── create/            # AI Creation wizard
│   ├── checkout/          # Payment flow
│   ├── account/           # User account
│   ├── gallery/           # Community gallery
│   ├── admin/             # Admin panel
│   └── ui/                # Reusable UI components
│
├── lib/
│   ├── services/          # Business logic
│   │   ├── aiService.ts
│   │   ├── authService.ts
│   │   ├── productService.ts
│   │   └── stripeService.ts
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Helper functions
│   ├── firebase.ts        # Firebase config
│   └── constants.ts       # App configuration
│
├── context/               # React Context providers
│   ├── AuthContext.tsx
│   └── CartContext.tsx
│
├── types/                 # TypeScript definitions
│   └── index.ts
│
├── public/                # Static assets
│   ├── images/
│   └── fonts/
│
└── docs/                  # Documentation
    ├── ARCHITECTURE.md
    ├── API.md
    └── SETUP.md
```

## Data Flow

### Product Creation Flow

```
User Input
    ↓
Step 1: Select Template
    ↓
Step 2: Customize (prompt, style, colors)
    ↓
Step 3: AI Generation
    ├─→ Stable Diffusion (image)
    └─→ Claude (description)
    ↓
Step 4: Preview
    ↓
Step 5: Add to Cart
    ↓
Checkout → Stripe Payment
    ↓
Order Confirmed + Certificate
```

### Uniqueness System

```
generateUniqueId(userId, prompt, timestamp):
    ↓
    seed = hash(userId + prompt + timestamp)[:5]
    serial = getSerialForSeed(seed) + 1
    ↓
    uniqueId = f"UU-{timestamp}-{seed}-{serial:03d}"
    ↓
Example: "UU-1717416234123-a7f3b-001"
```

## Database Schema (Firestore)

### Collections

**users/** - User profiles
- id, email, name, avatar
- totalSpent, totalCreations
- badges, socialLinks
- preferences (newsletter, notifications)

**products/** - AI-generated products
- title, description, imageUrl
- prompt, template, colors, style
- basePrice, sellingPrice
- uniqueId, sdSeed, sdModel
- status (draft, available, sold-out)
- limit, sold (inventory)
- certificateUrl, tags
- ratings (avgRating, count)

**orders/** - Purchase history
- userId, items[], total
- status (pending, processing, shipped, delivered)
- shippingAddress, trackingNumber
- stripePaymentId

**aiGenerations/** - Queue & status
- userId, prompt, template, style
- status (queued, processing, completed, failed)
- imageUrl, sdSeed, errorMessage

**reviews/** - Product reviews
- productId, userId, rating, comment
- verified (purchased), createdAt

**analytics/** - Daily metrics
- pageViews, conversions
- topProducts, newUsers

## API Architecture

### Authentication Routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/user`

### Product Routes
- `GET /api/products` (list, filter, search)
- `GET /api/products/[id]` (detail)
- `POST /api/products` (create)

### AI Routes
- `POST /api/ai/generate-image`
- `GET /api/ai/status/[genId]`
- `POST /api/ai/description`

### Payment Routes
- `POST /api/payments/intent` (Stripe)
- `POST /api/payments/confirm`
- `POST /api/payments/webhook` (Stripe events)

### Order Routes
- `GET /api/orders` (user's orders)
- `GET /api/orders/[id]`
- `POST /api/orders` (create)

## Key Features

### 1. Uniqueness Guarantee

Every product has:
- Unique ID: `UU-{TIMESTAMP}-{SEED}-{SERIAL}`
- Certificate of Authenticity (PDF)
- Fixed Stable Diffusion seed (reproducibility)
- Serial number (prevents duplicates)

### 2. AI Generation

**Image Generation:**
- Replicate API → Stable Diffusion XL
- Custom prompt engineering
- Fixed seed for reproducibility
- Queue management (max 5/user/day)

**Text Generation:**
- Claude API
- Auto-generate product titles
- Auto-generate descriptions
- SEO tags extraction

### 3. Payment Processing

**Stripe Integration:**
- Create payment intents
- Handle webhooks
- Lock inventory on payment
- Award badges on completion

**PayPal (Phase 2):**
- OAuth integration
- Webhook handling

### 4. Security

**Firebase Security Rules:**
```
users/ - authenticated users only
products/ - public read, authenticated write
orders/ - user's own orders only
```

**API Security:**
- Server-side API keys (never exposed)
- JWT validation
- CORS configuration
- Input validation on all endpoints
- Rate limiting (planned)

## Deployment

### Environment Variables

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
REPLICATE_API_TOKEN
CLAUDE_API_KEY
```

### Deployment Steps

1. Set environment variables on Vercel
2. Deploy to Vercel (auto from branch)
3. Configure Firebase rules
4. Test Stripe webhooks
5. Monitor logs (Sentry)

## Performance Optimization

- **Image Optimization:** Next.js Image component, WebP
- **Code Splitting:** Dynamic imports for routes
- **SSR/SSG/ISR:** Homepage SSG, shop ISR
- **Caching:** Firebase indexes, Stripe caching
- **CDN:** Vercel CDN for static assets
- **Bundle:** ~250KB gzipped (target)

## Roadmap

### MVP (Current)
- ✅ Homepage
- ✅ Shop & Product Detail
- ✅ AI Creation Wizard
- ✅ Cart & Checkout (Stripe)
- ✅ User Account
- ✅ Community Gallery
- ⏳ Admin Dashboard

### Phase 2
- PayPal integration
- Advanced search/filters
- Reviews & ratings
- Email notifications
- Analytics dashboard

### Phase 3
- Mobile app
- Video generation
- Bulk orders
- B2B portal

## Getting Help

For architecture questions, see specific docs:
- [API Reference](./API.md)
- [Setup Guide](./SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)

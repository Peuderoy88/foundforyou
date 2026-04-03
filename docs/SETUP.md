# Setup Guide - FoundForYou Development

## Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project
- Stripe account
- Replicate API account
- Claude API account

## Step 1: Firebase Setup

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name it "FoundForYou"
4. Enable Google Analytics (optional)
5. Click "Create project"

### Enable Firestore

1. In Firebase Console, go to "Build" → "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select your region (closest to users)
5. Click "Create"

### Enable Authentication

1. Go to "Build" → "Authentication"
2. Click "Get started"
3. Enable "Email/Password"
4. Optionally enable "Google" and "GitHub"

### Enable Cloud Storage

1. Go to "Build" → "Storage"
2. Click "Get started"
3. Start in production mode
4. Select the same region as Firestore

### Get Firebase Config

1. In Firebase Console, go to "Project Settings" (gear icon)
2. Under "Your apps", find Web app
3. If not created, click "Add app" and select Web
4. Copy the firebaseConfig object

### Deploy Firestore Rules

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize in project: `firebase init`
4. Deploy rules: `firebase deploy --only firestore:rules`

## Step 2: Configure Environment Variables

```bash
# Copy template
cp .env.local .env.local

# Edit .env.local with your values:
NEXT_PUBLIC_FIREBASE_API_KEY=your_value
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value
NEXT_PUBLIC_FIREBASE_APP_ID=your_value

STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

REPLICATE_API_TOKEN=your_token
CLAUDE_API_KEY=your_key
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Initialize Firestore Collections (Optional)

For testing, you can seed the database with sample data:

```bash
npm run seed
# (Will be created in Phase 3)
```

## Step 5: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Step 6: Set Up Firebase Rules (Important!)

In `firestore.rules`, update with the actual rules:

```bash
firebase deploy --only firestore:rules
```

## Testing Authentication

1. Go to http://localhost:3000/auth/register
2. Create a test account
3. Verify in Firebase Console → Authentication

## Testing Firestore Access

In browser console:
```javascript
import { getProducts } from '@/lib/services/productService'
const products = await getProducts()
console.log(products)
```

## Stripe Setup (Phase 7)

1. Create Stripe account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard
3. Add to .env.local
4. Create webhook endpoint for payments
5. Test with card: `4242 4242 4242 4242` (exp: 12/25, CVC: 123)

## Replicate Setup (Phase 5)

1. Sign up at [replicate.com](https://replicate.com)
2. Get API token from account page
3. Add to .env.local as `REPLICATE_API_TOKEN`
4. Test image generation in Phase 5

## Claude API Setup (Phase 5)

1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Generate API key
3. Add to .env.local as `CLAUDE_API_KEY`
4. Test text generation in Phase 5

## Troubleshooting

### "Firebase is not initialized"
- Check all NEXT_PUBLIC_ variables are set
- Restart dev server: `npm run dev`

### "Firestore permission denied"
- Check security rules are deployed
- Check user is authenticated
- Verify rules allow the operation

### "Stripe key is missing"
- Confirm keys in .env.local
- Use `pk_test_` for public key
- Use `sk_test_` for secret key

### "Module not found"
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Restart dev server

## Database Indexes

Firestore will auto-create some indexes. For composite indexes:

1. Run a query that needs an index
2. Firebase Console will show a link
3. Click to create the index
4. Or create manually in Firestore Console → Indexes

See [FIRESTORE_SCHEMA.md](./FIRESTORE_SCHEMA.md) for all required indexes.

## Running Tests

```bash
npm run test
```

## Building for Production

```bash
npm run build
```

## Deploying to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed steps.

## Next Steps

Once setup is complete:
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Review [FIRESTORE_SCHEMA.md](./FIRESTORE_SCHEMA.md)
3. Start Phase 3: Authentication System
4. Build components from plan

## Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Anthropic Documentation](https://docs.anthropic.com)

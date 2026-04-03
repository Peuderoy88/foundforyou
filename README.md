# FoundForYou - AI-Powered Personalized Products Ecommerce

A premium ecommerce platform for unique, non-repeatable AI-generated personalized products. Each creation is a one-of-a-kind masterpiece certified as unique.

## 🎨 Overview

FoundForYou is a next-generation ecommerce platform that leverages:
- **AI Image Generation** (Stable Diffusion) for custom designs
- **AI Text Generation** (Claude) for product descriptions
- **Unique ID System** ensuring no two products are identical
- **Premium Checkout Flow** with Stripe & PayPal integration
- **Community Gallery** for user-generated content showcase

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.local .env.local.example
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open http://localhost:3000

## 📚 Documentation

- [Architecture](./docs/ARCHITECTURE.md) - System design & components
- [API Reference](./docs/API.md) - API endpoints
- [Setup Guide](./docs/SETUP.md) - Detailed setup
- [Deployment](./docs/DEPLOYMENT.md) - Production guide

## 📁 Project Structure

```
app/                  # Next.js routes
components/          # React components
lib/                # Services, utilities, hooks
types/              # TypeScript definitions
context/            # React Context
public/             # Static assets
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+, React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Auth)
- **AI**: Stable Diffusion (Replicate), Claude (Anthropic)
- **Payments**: Stripe API
- **Deployment**: Vercel

## ✨ Key Features

- ✨ AI Creation Wizard (5 steps)
- 🛡️ Guaranteed Uniqueness
- 📦 Full Ecommerce (Shop, Cart, Checkout, Orders)
- 👥 Community Gallery
- 📊 Admin Dashboard
- 🔐 Secure Payments

## 🚀 Status

**MVP Phase** - Core features implemented and ready for development.

---

For more details, see [Architecture Documentation](./docs/ARCHITECTURE.md)

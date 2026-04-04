import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'FoundForYou - AI-Powered Personalized Products',
  description: 'Create unique, non-repeatable AI-generated products. Personalized merchandise with AI assistance.',
  keywords: 'AI, personalization, merchandise, ecommerce, unique products',
  openGraph: {
    title: 'FoundForYou - Create Unique AI Products',
    description: 'Design and buy unique AI-generated personalized products',
    url: 'https://foundforyou.com',
    siteName: 'FoundForYou',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}

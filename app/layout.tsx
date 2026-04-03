import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={`${inter.className} flex flex-col min-h-screen bg-white text-gray-900`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

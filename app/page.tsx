import Link from 'next/link'
import { Sparkles, Zap, Shield, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                AI-Powered Creation
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
              Create Products<br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                That No One Else Will Ever Have
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Design unique, non-repeatable AI-generated products. Each creation is a one-of-a-kind masterpiece with a certificate of authenticity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/create"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-purple-400/50 transition-all hover:scale-105"
              >
                <Zap className="w-5 h-5 mr-2" />
                Create Your Unique Piece
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-purple-600 hover:text-purple-600 transition"
              >
                Explore Shop
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="pt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto text-sm">
              <div>
                <div className="text-2xl font-bold text-purple-600">2.3K</div>
                <div className="text-gray-600">Orders Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">8.9K</div>
                <div className="text-gray-600">Creators</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">4.9★</div>
                <div className="text-gray-600">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Why FoundForYou?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Design',
                description: 'Describe your vision, and AI creates it uniquely for you',
              },
              {
                icon: Shield,
                title: 'Guaranteed Uniqueness',
                description: 'Every product is one-of-a-kind with a certificate',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'From idea to product in minutes, not days',
              },
              {
                icon: Users,
                title: 'Community Driven',
                description: 'Share, discover, and connect with fellow creators',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                  <Icon className="w-10 h-10 text-purple-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Create Something Unique?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Your imagination is the only limit. Let AI bring it to life.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-xl transition hover:scale-105"
          >
            Start Creating Now
          </Link>
        </div>
      </section>
    </div>
  )
}

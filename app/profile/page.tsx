'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, LogOut, Heart, Package, Settings, Download, Share2 } from 'lucide-react'

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  joinedDate: string
  totalOrders: number
  totalSpent: number
  favoriteCount: number
}

interface Order {
  id: string
  orderNumber: string
  date: string
  items: number
  total: number
  status: 'completed' | 'pending' | 'shipped'
  products: Array<{ name: string; quantity: number }>
}

// Mock user data
const mockUser: UserProfile = {
  id: 'user-001',
  name: 'Marco Rossi',
  email: 'marco@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  joinedDate: '2024-01-15',
  totalOrders: 5,
  totalSpent: 249.75,
  favoriteCount: 12,
}

const mockOrders: Order[] = [
  {
    id: 'order-001',
    orderNumber: 'ORD-A1B2C3',
    date: '2024-04-01',
    items: 2,
    total: 84.90,
    status: 'completed',
    products: [
      { name: 'Cosmic Dreamer T-Shirt', quantity: 1 },
      { name: 'Abstract Mug', quantity: 1 },
    ],
  },
  {
    id: 'order-002',
    orderNumber: 'ORD-D4E5F6',
    date: '2024-03-28',
    items: 1,
    total: 49.95,
    status: 'shipped',
    products: [{ name: 'Retro Vibes Hoodie', quantity: 1 }],
  },
  {
    id: 'order-003',
    orderNumber: 'ORD-G7H8I9',
    date: '2024-03-15',
    items: 3,
    total: 64.85,
    status: 'completed',
    products: [
      { name: 'Fantasy Poster', quantity: 2 },
      { name: 'Zen Garden Print', quantity: 1 },
    ],
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'favorites' | 'settings'>('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ name: mockUser.name })

  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-amber-100 text-amber-800',
    shipped: 'bg-blue-100 text-blue-800',
  }

  const statusLabels = {
    completed: '✓ Completato',
    pending: '⏳ In Elaborazione',
    shipped: '📦 Spedito',
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="text-cyan-600 hover:text-cyan-700 font-medium mb-8">
          ← Indietro
        </Link>
        <h1 className="text-4xl font-bold text-slate-900">Il Tuo Profilo</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden sticky top-8">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
                />
                <h2 className="text-xl font-bold mb-1">{mockUser.name}</h2>
                <p className="text-sm opacity-90">{mockUser.email}</p>
              </div>

              {/* Stats */}
              <div className="p-6 border-b border-slate-200">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600">{mockUser.totalOrders}</div>
                    <p className="text-xs text-slate-600">Ordini</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600">{mockUser.favoriteCount}</div>
                    <p className="text-xs text-slate-600">Preferiti</p>
                  </div>
                </div>
                <div className="bg-slate-100 rounded p-3">
                  <p className="text-xs text-slate-600 mb-1">Speso totale</p>
                  <p className="text-2xl font-bold text-slate-900">${mockUser.totalSpent.toFixed(2)}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4 space-y-2">
                {[
                  { id: 'overview', label: 'Panoramica', icon: User },
                  { id: 'orders', label: 'I Miei Ordini', icon: Package },
                  { id: 'favorites', label: 'Preferiti', icon: Heart },
                  { id: 'settings', label: 'Impostazioni', icon: Settings },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                      activeTab === id
                        ? 'bg-cyan-100 text-cyan-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                ))}
              </nav>

              {/* Logout */}
              <div className="p-4 border-t border-slate-200">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium">
                  <LogOut className="w-5 h-5" />
                  Esci
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-8 text-white">
                  <h2 className="text-2xl font-bold mb-2">Benvenuto, {mockUser.name.split(' ')[0]}! 👋</h2>
                  <p className="text-cyan-100 mb-4">Membro dal {new Date(mockUser.joinedDate).toLocaleDateString('it-IT', { year: 'numeric', month: 'long' })}</p>
                  <div className="flex gap-4">
                    <Link
                      href="/create"
                      className="px-6 py-2 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                      Crea Prodotto
                    </Link>
                    <Link
                      href="/shop"
                      className="px-6 py-2 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition"
                    >
                      Continua Shopping
                    </Link>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg border border-slate-200 p-6 text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-1">{mockUser.totalOrders}</div>
                    <p className="text-sm text-slate-600">Ordini Totali</p>
                  </div>
                  <div className="bg-white rounded-lg border border-slate-200 p-6 text-center">
                    <div className="text-3xl font-bold text-cyan-600 mb-1">${mockUser.totalSpent.toFixed(2)}</div>
                    <p className="text-sm text-slate-600">Importo Speso</p>
                  </div>
                  <div className="bg-white rounded-lg border border-slate-200 p-6 text-center">
                    <div className="text-3xl font-bold text-pink-600 mb-1">{mockUser.favoriteCount}</div>
                    <p className="text-sm text-slate-600">Prodotti Preferiti</p>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Ordini Recenti</h3>
                  <div className="space-y-3">
                    {mockOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{order.orderNumber}</p>
                          <p className="text-sm text-slate-600">{new Date(order.date).toLocaleDateString('it-IT')}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">${order.total.toFixed(2)}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                            {statusLabels[order.status]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-2 text-cyan-600 hover:text-cyan-700 font-medium mt-4">
                    Visualizza tutti gli ordini →
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">I Miei Ordini</h2>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-slate-200 rounded-lg p-6 hover:border-cyan-400 transition">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-slate-900">{order.orderNumber}</h3>
                          <p className="text-sm text-slate-600">{new Date(order.date).toLocaleDateString('it-IT')}</p>
                        </div>
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </div>

                      <div className="mb-4 p-4 bg-slate-50 rounded-lg">
                        {order.products.map((product, i) => (
                          <div key={i} className="flex justify-between text-sm mb-2 last:mb-0">
                            <span className="text-slate-700">{product.name}</span>
                            <span className="font-semibold text-slate-900">×{product.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-slate-900">${order.total.toFixed(2)}</span>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 transition text-sm font-medium">
                            Dettagli
                          </button>
                          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 transition text-sm font-medium flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Ricevuta
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Preferiti ({mockUser.favoriteCount})</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-slate-200 rounded-lg overflow-hidden hover:border-cyan-400 transition">
                      <div className="aspect-square bg-slate-100 flex items-center justify-center">
                        <div className="text-center">
                          <Heart className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                          <p className="text-sm text-slate-600">Immagine prodotto</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 mb-2">Prodotto Preferito #{i}</h3>
                        <p className="text-2xl font-bold text-cyan-600 mb-4">${(24.99 + i * 5).toFixed(2)}</p>
                        <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition">
                          Aggiungi al Carrello
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Profile Settings */}
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Impostazioni Profilo</h2>

                  <div className="space-y-6">
                    {!isEditing ? (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">Nome</label>
                          <p className="text-slate-700">{mockUser.name}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                          <p className="text-slate-700">{mockUser.email}</p>
                        </div>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition"
                        >
                          Modifica Profilo
                        </button>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">Nome</label>
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-2 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition"
                          >
                            Salva
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition"
                          >
                            Annulla
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Preferenze</h2>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-slate-700">Ricevi notifiche di nuovi prodotti</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-slate-700">Ricevi email di promozioni</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-slate-700">Condividi i miei preferiti pubblicamente</span>
                    </label>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                  <h2 className="text-lg font-bold text-red-900 mb-4">Zona Pericolosa</h2>
                  <p className="text-sm text-red-700 mb-4">
                    Queste azioni non possono essere annullate. Per favore procedi con cautela.
                  </p>
                  <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                    Elimina Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

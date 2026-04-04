'use client'

import { TrendingUp, Users, ShoppingCart, DollarSign, AlertCircle } from 'lucide-react'

interface StatCard {
  title: string
  value: string | number
  change: number
  icon: React.ReactNode
  color: string
}

interface RecentOrder {
  id: string
  customer: string
  product: string
  amount: number
  status: 'pending' | 'shipped' | 'delivered'
  date: string
}

interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  trend: number
}

// Mock data
const stats: StatCard[] = [
  {
    title: 'Revenue Totale',
    value: '$12,450',
    change: 15.3,
    icon: <DollarSign className="w-6 h-6" />,
    color: 'bg-green-100 text-green-700',
  },
  {
    title: 'Ordini Totali',
    value: '248',
    change: 8.2,
    icon: <ShoppingCart className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'Utenti Attivi',
    value: '1,243',
    change: 12.5,
    icon: <Users className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    title: 'Conversione',
    value: '3.2%',
    change: -0.5,
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'bg-amber-100 text-amber-700',
  },
]

const recentOrders: RecentOrder[] = [
  {
    id: 'ORD-001',
    customer: 'Marco Rossi',
    product: 'Cosmic Dreamer T-Shirt',
    amount: 34.95,
    status: 'shipped',
    date: '2024-04-04',
  },
  {
    id: 'ORD-002',
    customer: 'Emma Johnson',
    product: 'Abstract Mug',
    amount: 14.95,
    status: 'delivered',
    date: '2024-04-03',
  },
  {
    id: 'ORD-003',
    customer: 'Luca Ferrari',
    product: 'Retro Vibes Hoodie',
    amount: 49.95,
    status: 'pending',
    date: '2024-04-04',
  },
  {
    id: 'ORD-004',
    customer: 'Sarah Chen',
    product: 'Fantasy Poster',
    amount: 19.95,
    status: 'shipped',
    date: '2024-04-02',
  },
  {
    id: 'ORD-005',
    customer: 'Alex Rivera',
    product: 'Zen Garden Print',
    amount: 24.95,
    status: 'delivered',
    date: '2024-04-01',
  },
]

const topProducts: TopProduct[] = [
  {
    id: 'prod-001',
    name: 'Cosmic Dreamer',
    sales: 156,
    revenue: 5451,
    trend: 23,
  },
  {
    id: 'prod-002',
    name: 'Abstract Mug',
    sales: 234,
    revenue: 3496.30,
    trend: 18,
  },
  {
    id: 'prod-003',
    name: 'Retro Vibes',
    sales: 89,
    revenue: 4445.55,
    trend: -5,
  },
]

const statusColors = {
  pending: 'bg-amber-100 text-amber-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
}

const statusLabels = {
  pending: '⏳ In Elaborazione',
  shipped: '📦 Spedito',
  delivered: '✓ Consegnato',
}

export default function AdminDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Benvenuto nel pannello amministrativo FoundForYou</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">{stat.title}</h3>
              <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p
                  className={`text-xs font-medium ${stat.change > 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}% vs mese precedente
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Ordini Recenti</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Ordine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Prodotto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Importo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Stato
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{order.product}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        ${order.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-slate-200 text-center">
              <button className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
                Visualizza tutti gli ordini →
              </button>
            </div>
          </div>
        </div>

        {/* Top Products Sidebar */}
        <div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Prodotti Top</h2>
            </div>

            <div className="p-6 space-y-6">
              {topProducts.map((product) => (
                <div key={product.id} className="pb-6 border-b border-slate-200 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 text-sm">{product.name}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${product.trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.trend > 0 ? '+' : ''}{product.trend}%
                    </span>
                  </div>
                  <div className="space-y-1 mb-3">
                    <p className="text-xs text-slate-600">
                      Vendite: <span className="font-semibold text-slate-900">{product.sales}</span>
                    </p>
                    <p className="text-xs text-slate-600">
                      Revenue: <span className="font-semibold text-slate-900">${product.revenue.toFixed(2)}</span>
                    </p>
                  </div>

                  {/* Mini Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div
                      className="bg-cyan-600 h-1.5 rounded-full"
                      style={{ width: `${(product.sales / 250) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts Card */}
          <div className="bg-white rounded-lg shadow mt-8">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Avvisi
              </h2>
            </div>

            <div className="p-6 space-y-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Stock Basso:</strong> 3 prodotti in esaurimento
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Ordini Pending:</strong> 5 ordini in sospeso
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Nuovi Utenti:</strong> 23 registrazioni oggi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Revenue Trend (Ultimi 30 giorni)</h2>
        <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
          <div className="text-center text-slate-500">
            <p className="text-lg font-semibold mb-2">Chart Placeholder</p>
            <p className="text-sm">Implementare Recharts o Chart.js per grafici reali</p>
          </div>
        </div>
      </div>
    </div>
  )
}

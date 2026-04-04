'use client'

import { Search, Filter, Download, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface Order {
  id: string
  customer: string
  email: string
  items: number
  total: number
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  paymentMethod: string
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'Marco Rossi',
    email: 'marco@example.com',
    items: 2,
    total: 84.9,
    status: 'delivered',
    date: '2024-04-04',
    paymentMethod: 'Stripe',
  },
  {
    id: 'ORD-002',
    customer: 'Emma Johnson',
    email: 'emma@example.com',
    items: 1,
    total: 49.95,
    status: 'shipped',
    date: '2024-04-03',
    paymentMethod: 'Stripe',
  },
  {
    id: 'ORD-003',
    customer: 'Luca Ferrari',
    email: 'luca@example.com',
    items: 3,
    total: 104.85,
    status: 'pending',
    date: '2024-04-04',
    paymentMethod: 'PayPal',
  },
  {
    id: 'ORD-004',
    customer: 'Sarah Chen',
    email: 'sarah@example.com',
    items: 1,
    total: 34.95,
    status: 'delivered',
    date: '2024-04-02',
    paymentMethod: 'Stripe',
  },
  {
    id: 'ORD-005',
    customer: 'Alex Rivera',
    email: 'alex@example.com',
    items: 2,
    total: 64.9,
    status: 'cancelled',
    date: '2024-04-01',
    paymentMethod: 'Stripe',
  },
]

const statusColors = {
  pending: 'bg-amber-100 text-amber-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const statusLabels = {
  pending: '⏳ In Elaborazione',
  shipped: '📦 Spedito',
  delivered: '✓ Consegnato',
  cancelled: '✗ Annullato',
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestione Ordini</h1>
          <p className="text-slate-600">Monitora e gestisci gli ordini dei clienti</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition font-semibold">
          <Download className="w-5 h-5" />
          Esporta CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Totali', value: '248', color: 'bg-blue-100 text-blue-700' },
          { label: 'In Elaborazione', value: '12', color: 'bg-amber-100 text-amber-700' },
          { label: 'Spediti', value: '89', color: 'bg-purple-100 text-purple-700' },
          { label: 'Consegnati', value: '147', color: 'bg-green-100 text-green-700' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} rounded-lg p-4`}>
            <p className="text-sm font-medium opacity-75">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-8 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cerca ordini..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 appearance-none pr-10"
          >
            <option value="all">Tutti gli Status</option>
            <option value="pending">In Elaborazione</option>
            <option value="shipped">Spediti</option>
            <option value="delivered">Consegnati</option>
            <option value="cancelled">Annullati</option>
          </select>
          <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow">
            {/* Order Header */}
            <button
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-4 flex-1 text-left">
                <div>
                  <p className="font-semibold text-slate-900">{order.id}</p>
                  <p className="text-sm text-slate-600">{order.customer}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-semibold text-slate-900">${order.total.toFixed(2)}</p>
                  <p className="text-xs text-slate-600">{order.items} articoli</p>
                </div>

                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </span>

                <p className="text-sm text-slate-600 w-24 text-right">{order.date}</p>

                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition ${
                    expandedOrder === order.id ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {/* Order Details */}
            {expandedOrder === order.id && (
              <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Informazioni Cliente</h4>
                    <div className="space-y-1 text-sm text-slate-700">
                      <p><strong>Nome:</strong> {order.customer}</p>
                      <p><strong>Email:</strong> {order.email}</p>
                      <p><strong>Metodo:</strong> {order.paymentMethod}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Riepilogo Ordine</h4>
                    <div className="space-y-1 text-sm text-slate-700">
                      <p><strong>Articoli:</strong> {order.items}</p>
                      <p><strong>Totale:</strong> ${order.total.toFixed(2)}</p>
                      <p><strong>Data:</strong> {order.date}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <select
                    defaultValue={order.status}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-cyan-500"
                  >
                    <option value="pending">In Elaborazione</option>
                    <option value="shipped">Spedito</option>
                    <option value="delivered">Consegnato</option>
                    <option value="cancelled">Annullato</option>
                  </select>
                  <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-700 transition">
                    Invia Email Tracciamento
                  </button>
                  <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm hover:bg-slate-100 transition">
                    Stampa Etichetta
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

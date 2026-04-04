'use client'

import { TrendingUp, TrendingDown, Calendar, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react'
import { useState } from 'react'

interface ChartData {
  label: string
  value: number
  color: string
}

interface TimeSeriesData {
  date: string
  revenue: number
  orders: number
  users: number
}

const revenueData: TimeSeriesData[] = [
  { date: '2024-03-25', revenue: 850, orders: 12, users: 45 },
  { date: '2024-03-26', revenue: 920, orders: 14, users: 52 },
  { date: '2024-03-27', revenue: 750, orders: 10, users: 38 },
  { date: '2024-03-28', revenue: 1050, orders: 16, users: 61 },
  { date: '2024-03-29', revenue: 1200, orders: 18, users: 72 },
  { date: '2024-03-30', revenue: 1100, orders: 17, users: 68 },
  { date: '2024-04-01', revenue: 1350, orders: 20, users: 85 },
  { date: '2024-04-02', revenue: 1450, orders: 22, users: 92 },
  { date: '2024-04-03', revenue: 1600, orders: 24, users: 105 },
  { date: '2024-04-04', revenue: 1550, orders: 23, users: 98 },
]

const productCategoryData: ChartData[] = [
  { label: 'T-Shirt', value: 35, color: 'bg-blue-500' },
  { label: 'Hoodie', value: 25, color: 'bg-purple-500' },
  { label: 'Mug', value: 20, color: 'bg-cyan-500' },
  { label: 'Poster', value: 15, color: 'bg-pink-500' },
  { label: 'Other', value: 5, color: 'bg-slate-500' },
]

const conversionData: ChartData[] = [
  { label: 'Visitors', value: 5200, color: 'bg-blue-100 text-blue-700' },
  { label: 'Add to Cart', value: 450, color: 'bg-amber-100 text-amber-700' },
  { label: 'Checkout', value: 320, color: 'bg-purple-100 text-purple-700' },
  { label: 'Purchase', value: 248, color: 'bg-green-100 text-green-700' },
]

const metrics = [
  { label: 'Avg Order Value', value: '$87.50', change: 5.2, positive: true },
  { label: 'Customer Lifetime Value', value: '$542.30', change: 12.8, positive: true },
  { label: 'Cart Abandonment', value: '42.5%', change: -8.3, positive: true },
  { label: 'Return Rate', value: '3.2%', change: -1.5, positive: true },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue))
  const maxOrders = Math.max(...revenueData.map(d => d.orders))
  const maxUsers = Math.max(...revenueData.map(d => d.users))

  const getBarHeight = (value: number, max: number) => (value / max) * 100

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics</h1>
          <p className="text-slate-600">Analisi dettagliate delle performance</p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                dateRange === range
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {range === '7d' ? '7 giorni' : range === '30d' ? '30 giorni' : range === '90d' ? '90 giorni' : '1 anno'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-slate-600 mb-2">{metric.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${metric.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {metric.positive ? '↓' : '↑'} {Math.abs(metric.change)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <LineChartIcon className="w-5 h-5 text-cyan-600" />
              Trend Revenue e Ordini
            </h2>
          </div>

          <div className="h-64 flex items-end justify-between gap-2 mb-4">
            {revenueData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t opacity-70 hover:opacity-100 transition"
                  style={{ height: `${getBarHeight(data.revenue, maxRevenue) * 0.7 + 20}%` }}
                  title={`€${data.revenue}`}
                />
                <span className="text-xs text-slate-600">{data.date.slice(5)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4 flex justify-between text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-600 rounded"></div>
              <span>Revenue (€)</span>
            </div>
          </div>
        </div>

        {/* Product Mix Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
            <PieChartIcon className="w-5 h-5 text-purple-600" />
            Mix Prodotti
          </h2>

          <div className="space-y-3">
            {productCategoryData.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-amber-600" />
            Funnel Conversione
          </h2>

          <div className="space-y-4">
            {conversionData.map((step, i) => {
              const percentage = (step.value / conversionData[0].value) * 100
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{step.label}</span>
                    <span className="text-sm font-bold text-slate-900">{step.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-6 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className={`h-full ${step.color} flex items-center justify-end pr-2 transition`}
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 20 && <span className="text-xs font-bold">{percentage.toFixed(0)}%</span>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Conversion Rate:</strong> 4.8% da visitatori a acquisti
            </p>
          </div>
        </div>

        {/* Top Insights */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Insights Principali</h2>

          <div className="space-y-4">
            <div className="p-4 border-l-4 border-green-600 bg-green-50">
              <p className="font-semibold text-slate-900 text-sm mb-1">📈 Crescita Positiva</p>
              <p className="text-sm text-slate-600">
                Revenue in crescita del 23% rispetto allo scorso mese
              </p>
            </div>

            <div className="p-4 border-l-4 border-amber-600 bg-amber-50">
              <p className="font-semibold text-slate-900 text-sm mb-1">⚠️ Cart Abandonment</p>
              <p className="text-sm text-slate-600">
                42.5% degli utenti abbandona il carrello. Implementare reminder email
              </p>
            </div>

            <div className="p-4 border-l-4 border-cyan-600 bg-cyan-50">
              <p className="font-semibold text-slate-900 text-sm mb-1">👥 AOV in Aumento</p>
              <p className="text-sm text-slate-600">
                Average Order Value +5.2%. Cross-sell strategy sta funzionando
              </p>
            </div>

            <div className="p-4 border-l-4 border-purple-600 bg-purple-50">
              <p className="font-semibold text-slate-900 text-sm mb-1">🎯 Top Performer</p>
              <p className="text-sm text-slate-600">
                T-Shirt categoria dominante con 35% delle vendite
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

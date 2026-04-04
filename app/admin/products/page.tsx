'use client'

import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  stock: number
  status: 'active' | 'draft' | 'archived'
  sales: number
  revenue: number
  createdAt: string
}

const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Cosmic Dreamer T-Shirt',
    price: 34.95,
    stock: 12,
    status: 'active',
    sales: 156,
    revenue: 5451,
    createdAt: '2024-03-15',
  },
  {
    id: 'prod-002',
    name: 'Abstract Mug',
    price: 14.95,
    stock: 45,
    status: 'active',
    sales: 234,
    revenue: 3496.3,
    createdAt: '2024-03-10',
  },
  {
    id: 'prod-003',
    name: 'Retro Vibes Hoodie',
    price: 49.95,
    stock: 3,
    status: 'active',
    sales: 89,
    revenue: 4445.55,
    createdAt: '2024-02-28',
  },
  {
    id: 'prod-004',
    name: 'Zen Garden Print',
    price: 24.95,
    stock: 0,
    status: 'archived',
    sales: 67,
    revenue: 1671.65,
    createdAt: '2024-02-20',
  },
]

const statusColors = {
  active: 'bg-green-100 text-green-800',
  draft: 'bg-amber-100 text-amber-800',
  archived: 'bg-slate-100 text-slate-800',
}

const statusLabels = {
  active: '✓ Attivo',
  draft: '📝 Bozza',
  archived: '🗂️ Archiviato',
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    )
  }

  const toggleAll = () => {
    setSelectedProducts(
      selectedProducts.length === filteredProducts.length ? [] : filteredProducts.map((p) => p.id),
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestione Prodotti</h1>
          <p className="text-slate-600">Gestisci il catalogo e l'inventario</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition font-semibold">
          <Plus className="w-5 h-5" />
          Nuovo Prodotto
        </button>
      </div>

      {/* Filters & Search */}
      <div className="mb-8 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cerca prodotti..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
          />
        </div>
        <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500">
          <option>Tutti i Status</option>
          <option>Attivi</option>
          <option>Bozze</option>
          <option>Archiviati</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                Prodotto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                Prezzo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                Vendite
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className={`border-b border-slate-200 hover:bg-slate-50 transition ${
                  selectedProducts.includes(product.id) ? 'bg-blue-50' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProduct(product.id)}
                    className="w-4 h-4 rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      product.stock === 0
                        ? 'bg-red-100 text-red-700'
                        : product.stock < 10
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {product.stock} pz
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">{product.sales}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                  ${product.revenue.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[product.status]}`}>
                    {statusLabels[product.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition" title="Visualizza">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition" title="Modifica">
                      <Edit className="w-4 h-4 text-cyan-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition" title="Elimina">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="fixed bottom-8 left-72 right-8 bg-white rounded-lg shadow-lg p-4 flex items-center justify-between border-l-4 border-cyan-600">
          <p className="text-sm text-slate-700">
            <span className="font-semibold">{selectedProducts.length}</span> prodotto/i selezionato/i
          </p>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition">
              Modifica
            </button>
            <button className="px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-700 rounded-lg transition">
              Elimina
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

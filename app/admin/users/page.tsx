'use client'

import { Search, Mail, Shield, Ban } from 'lucide-react'
import { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  joined: string
  orders: number
  spent: number
  status: 'active' | 'suspended' | 'banned'
  role: 'user' | 'creator' | 'admin'
}

const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'Marco Rossi',
    email: 'marco@example.com',
    joined: '2024-01-15',
    orders: 5,
    spent: 249.75,
    status: 'active',
    role: 'user',
  },
  {
    id: 'user-002',
    name: 'Alex Rivera',
    email: 'alex@example.com',
    joined: '2024-01-20',
    orders: 12,
    spent: 450.3,
    status: 'active',
    role: 'creator',
  },
  {
    id: 'user-003',
    name: 'Emma Johnson',
    email: 'emma@example.com',
    joined: '2024-02-01',
    orders: 3,
    spent: 89.85,
    status: 'active',
    role: 'user',
  },
  {
    id: 'user-004',
    name: 'Luca Ferrari',
    email: 'luca@example.com',
    joined: '2024-02-10',
    orders: 8,
    spent: 320.5,
    status: 'suspended',
    role: 'user',
  },
  {
    id: 'user-005',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    joined: '2024-03-01',
    orders: 15,
    spent: 670.2,
    status: 'active',
    role: 'creator',
  },
]

const statusColors = {
  active: 'bg-green-100 text-green-800',
  suspended: 'bg-amber-100 text-amber-800',
  banned: 'bg-red-100 text-red-800',
}

const roleColors = {
  user: 'bg-blue-100 text-blue-700',
  creator: 'bg-purple-100 text-purple-700',
  admin: 'bg-red-100 text-red-700',
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestione Utenti</h1>
        <p className="text-slate-600 mb-8">Gestisci utenti e permessi</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Utenti Totali', value: '1,243', color: 'bg-blue-100 text-blue-700' },
          { label: 'Creatori Attivi', value: '156', color: 'bg-purple-100 text-purple-700' },
          { label: 'Nuovi (30d)', value: '87', color: 'bg-green-100 text-green-700' },
          { label: 'Sospesi', value: '8', color: 'bg-amber-100 text-amber-700' },
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
            placeholder="Cerca utenti..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
        >
          <option value="all">Tutti i Ruoli</option>
          <option value="user">Utenti</option>
          <option value="creator">Creatori</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                Utente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                Iscritto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                Ordini
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                Speso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                Ruolo
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
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-semibold text-slate-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{user.email}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{user.joined}</td>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">{user.orders}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                  ${user.spent.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${roleColors[user.role]}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user.status]}`}>
                    {user.status === 'active' ? '✓ Attivo' : user.status === 'suspended' ? '⏸️ Sospeso' : '✗ Bannato'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                      <Mail className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                      <Shield className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                      <Ban className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

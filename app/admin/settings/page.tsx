'use client'

import { Save, Bell, Shield, Zap, Mail, Globe, Database, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'FoundForYou',
    siteDescription: 'Prodotti personalizzati con AI',
    adminEmail: 'admin@foundforyou.com',
    maintenanceMode: false,
    maxGenerationsPerDay: 10,
    maxUsersPerDay: 500,
    enableNotifications: true,
    notificationEmail: 'notifications@foundforyou.com',
    enableAnalytics: true,
    currency: 'EUR',
    taxRate: 22,
    shippingCost: 10.00,
    minOrderValue: 25.00,
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 500)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Impostazioni</h1>
        <p className="text-slate-600">Configura i parametri dell'applicazione</p>
      </div>

      {/* Save Success Message */}
      {saveSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          <p className="text-sm text-green-800">✓ Impostazioni salvate con successo</p>
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* Site Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">Impostazioni Sito</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nome Sito</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Descrizione</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleChange('siteDescription', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Valuta</label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Aliquota IVA</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => handleChange('taxRate', parseFloat(e.target.value))}
                    step="0.1"
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-slate-600">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900">Manutenzione</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium text-amber-800">
                  Attiva Modalità Manutenzione
                </span>
              </label>
              <p className="text-xs text-amber-700 mt-2">
                Quando attiva, gli utenti vedranno una pagina di manutenzione. Solo admin possono accedere.
              </p>
            </div>
          </div>
        </div>

        {/* Shipping & Order Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-slate-900">Spedizione & Ordini</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Costo Spedizione</label>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">€</span>
                <input
                  type="number"
                  value={settings.shippingCost}
                  onChange={(e) => handleChange('shippingCost', parseFloat(e.target.value))}
                  step="0.01"
                  min="0"
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Importo Minimo Ordine</label>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">€</span>
                <input
                  type="number"
                  value={settings.minOrderValue}
                  onChange={(e) => handleChange('minOrderValue', parseFloat(e.target.value))}
                  step="0.01"
                  min="0"
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Max Generazioni/Giorno</label>
              <input
                type="number"
                value={settings.maxGenerationsPerDay}
                onChange={(e) => handleChange('maxGenerationsPerDay', parseInt(e.target.value))}
                min="1"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-cyan-600" />
            <h2 className="text-lg font-bold text-slate-900">Notifiche</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) => handleChange('enableNotifications', e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium text-slate-700">
                  Abilita Notifiche Email
                </span>
              </label>
            </div>

            {settings.enableNotifications && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email per Notifiche</label>
                <input
                  type="email"
                  value={settings.notificationEmail}
                  onChange={(e) => handleChange('notificationEmail', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            <div className="p-4 bg-slate-50 rounded-lg space-y-2">
              <p className="text-sm font-medium text-slate-700">Notifiche Attive:</p>
              <div className="space-y-2">
                {['Nuovi Ordini', 'Generazioni AI Completate', 'Stock Basso', 'Errori Sistema'].map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Admin Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-bold text-slate-900">Admin</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Admin</label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleChange('adminEmail', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Max Utenti/Giorno</label>
                <input
                  type="number"
                  value={settings.maxUsersPerDay}
                  onChange={(e) => handleChange('maxUsersPerDay', parseInt(e.target.value))}
                  min="1"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer h-full pt-8">
                  <input
                    type="checkbox"
                    checked={settings.enableAnalytics}
                    onChange={(e) => handleChange('enableAnalytics', e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium text-slate-700">Abilita Analytics</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Database Backup */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-bold text-slate-900">Backup & Database</h2>
          </div>

          <div className="space-y-3">
            <button className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition">
              📥 Esporta Dati (CSV)
            </button>
            <button className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition">
              🔄 Esegui Backup Firestore
            </button>
            <button className="w-full px-4 py-3 border border-red-300 rounded-lg text-red-700 font-medium hover:bg-red-50 transition">
              ⚠️ Ripristina da Backup (Distruttivo)
            </button>
          </div>

          <div className="mt-4 p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
            <p><strong>Ultimo Backup:</strong> 2024-04-04 14:32 UTC</p>
            <p><strong>Backup Automatici:</strong> Giornalieri alle 02:00 UTC</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end gap-3">
        <button className="px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition">
          Annulla
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Salvataggio...' : 'Salva Impostazioni'}
        </button>
      </div>
    </div>
  )
}

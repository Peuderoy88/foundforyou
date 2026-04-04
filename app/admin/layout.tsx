import { redirect } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Add authentication check - redirect if not admin
  // if (!user || !user.isAdmin) {
  //   redirect('/')
  // }

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold">FoundForYou</h1>
          <p className="text-sm text-slate-400">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {[
            { href: '/admin', label: '📊 Dashboard', icon: 'chart-bar' },
            { href: '/admin/products', label: '📦 Prodotti', icon: 'package' },
            { href: '/admin/orders', label: '📋 Ordini', icon: 'clipboard' },
            { href: '/admin/users', label: '👥 Utenti', icon: 'users' },
            { href: '/admin/analytics', label: '📈 Analytics', icon: 'trending-up' },
            { href: '/admin/settings', label: '⚙️ Impostazioni', icon: 'settings' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition text-sm font-medium"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700 space-y-2">
          <button className="w-full px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg transition text-left">
            👤 Admin User
          </button>
          <button className="w-full px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

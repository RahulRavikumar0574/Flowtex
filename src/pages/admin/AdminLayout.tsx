import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

export function AdminLayout() {
  const { user, loading, logout } = useAuth()
  const location = useLocation()
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    if (user?.role !== 'admin') return
    api.adminStats().then((s) => setUnread(s.unread)).catch(() => {})
    const t = setInterval(() => {
      api.adminStats().then((s) => setUnread(s.unread)).catch(() => {})
    }, 20000)
    return () => clearInterval(t)
  }, [user, location.pathname])

  if (loading) return null
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="flex w-56 shrink-0 flex-col bg-flow-deep text-white">
        <div className="border-b border-white/10 p-6">
          <p className="font-display text-lg font-bold">Flowtex</p>
          <p className="text-xs text-white/60">Admin Portal</p>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-medium"
          >
            <LayoutDashboard size={18} />
            Quotes / Enquiries
            {unread > 0 && (
              <span className="ml-auto rounded-full bg-flow-accent px-2 py-0.5 text-xs font-bold text-flow-deep">
                {unread}
              </span>
            )}
          </Link>
        </nav>
        <button
          type="button"
          onClick={() => {
            logout()
            window.location.href = '/admin/login'
          }}
          className="m-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-white/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
      <main className="flex-1 overflow-auto p-6 md:p-8">
        <Outlet context={{ refreshUnread: () => api.adminStats().then((s) => setUnread(s.unread)) }} />
      </main>
    </div>
  )
}

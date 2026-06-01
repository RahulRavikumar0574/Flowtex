import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../lib/api'

export function AdminLoginPage() {
  const { login, logout, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [user, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      const { user: me } = await api.me()
      if (me.role !== 'admin') {
        logout()
        setError('This account does not have admin access')
        return
      }
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-flow-deep px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-flow-accent">Flowtex Admin</p>
        <h1 className="font-display mt-1 text-2xl font-bold text-flow-deep">Admin Login</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="text-flow-navy/70">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-flow-deep/10 px-3 py-2.5"
            />
          </label>
          <label className="block text-sm">
            <span className="text-flow-navy/70">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-flow-deep/10 px-3 py-2.5"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-flow-deep py-3 font-semibold text-white disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const returnTo = params.get('return') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user?.role === 'customer') {
      navigate(decodeURIComponent(returnTo), { replace: true })
    }
  }, [user, returnTo, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate(decodeURIComponent(returnTo), { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="glass-light w-full max-w-md rounded-3xl p-8">
        <h1 className="font-display text-2xl font-bold text-flow-deep">Login</h1>
        <p className="mt-1 text-sm text-flow-navy/70">Access your quote requests and conversations.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="text-flow-navy/70">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-flow-deep/10 px-3 py-2.5"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="glow-cta w-full rounded-full bg-flow-deep py-3 font-semibold text-white disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-flow-navy/70">
          New here?{' '}
          <Link
            to={`/signup?return=${encodeURIComponent(returnTo)}`}
            className="font-semibold text-flow-accent hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

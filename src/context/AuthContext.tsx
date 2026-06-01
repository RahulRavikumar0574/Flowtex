import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { api, setToken, type ApiUser } from '../lib/api'

type AuthContextValue = {
  user: ApiUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: {
    name: string
    email: string
    phone: string
    password: string
  }) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const { user: me } = await api.me()
      setUser(me)
    } catch {
      setToken(null)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('flowtex_token')
    if (!token) {
      setLoading(false)
      return
    }
    refreshUser().finally(() => setLoading(false))
  }, [refreshUser])

  const login = useCallback(async (email: string, password: string) => {
    const { token, user: u } = await api.login({ email, password })
    setToken(token)
    setUser(u)
  }, [])

  const signup = useCallback(
    async (data: { name: string; email: string; phone: string; password: string }) => {
      const { token, user: u } = await api.signup(data)
      setToken(token)
      setUser(u)
    },
    [],
  )

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, signup, logout, refreshUser }),
    [user, loading, login, signup, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

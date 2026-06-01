import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { api, type QuoteRequest } from '../lib/api'
import { useAuth } from './AuthContext'

type QuoteNotificationsContextValue = {
  unreadCount: number
  notifications: QuoteRequest[]
  refresh: () => Promise<void>
}

const QuoteNotificationsContext = createContext<QuoteNotificationsContextValue | null>(null)

export function QuoteNotificationsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState<QuoteRequest[]>([])

  const refresh = useCallback(async () => {
    if (!user || user.role !== 'customer') {
      setUnreadCount(0)
      setNotifications([])
      return
    }
    try {
      const [countRes, listRes] = await Promise.all([
        api.getUnreadCount(),
        api.getQuoteNotifications(),
      ])
      setUnreadCount(countRes.count)
      setNotifications(listRes.notifications)
    } catch {
      setUnreadCount(0)
      setNotifications([])
    }
  }, [user])

  useEffect(() => {
    refresh()
    if (!user || user.role !== 'customer') return
    const interval = setInterval(refresh, 20000)
    return () => clearInterval(interval)
  }, [user, refresh])

  const value = useMemo(
    () => ({ unreadCount, notifications, refresh }),
    [unreadCount, notifications, refresh],
  )

  return (
    <QuoteNotificationsContext.Provider value={value}>
      {children}
    </QuoteNotificationsContext.Provider>
  )
}

export function useQuoteNotifications() {
  const ctx = useContext(QuoteNotificationsContext)
  if (!ctx) {
    throw new Error('useQuoteNotifications must be used within QuoteNotificationsProvider')
  }
  return ctx
}

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useQuoteNotifications } from '../../context/QuoteNotificationsContext'

export function QuoteNotificationBell() {
  const { user } = useAuth()
  const { unreadCount, notifications, refresh } = useQuoteNotifications()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  if (!user || user.role !== 'customer') return null

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v)
          void refresh()
        }}
        className="relative flex h-full min-h-[3.5rem] items-center justify-center rounded-full border border-flow-deep/15 bg-white px-4 text-flow-deep hover:bg-flow-ice sm:min-w-[3.5rem]"
        aria-label={`Quote notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-flow-accent px-1 text-[10px] font-bold text-flow-deep">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-[80] mt-2 w-[min(100vw-2rem,320px)] overflow-hidden rounded-2xl glass-light shadow-xl">
          <div className="border-b border-flow-deep/10 px-4 py-3">
            <p className="font-semibold text-flow-deep">Notifications</p>
          </div>
          {notifications.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-flow-navy/60">No new replies</p>
          ) : (
            <ul className="max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <li key={n._id} className="border-b border-flow-deep/5 last:border-0">
                  <Link
                    to={`/account/quotes/${n._id}`}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 hover:bg-flow-ice/60"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-flow-accent">
                      New Quote Reply
                    </p>
                    <p className="mt-0.5 font-medium text-flow-deep">{n.productName}</p>
                    <p className="mt-1 text-sm font-semibold text-flow-accent">View Reply →</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/account/quotes"
            onClick={() => setOpen(false)}
            className="block border-t border-flow-deep/10 px-4 py-3 text-center text-sm font-semibold text-flow-deep hover:bg-flow-ice/40"
          >
            My Quotes
          </Link>
        </div>
      )}
    </div>
  )
}

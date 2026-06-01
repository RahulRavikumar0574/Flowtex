import type { FlowtexProduct } from '../../data/products'
import { useAuth } from '../../context/AuthContext'
import { useQuoteNotifications } from '../../context/QuoteNotificationsContext'
import { GetQuoteButton } from './GetQuoteButton'
import { QuoteNotificationBell } from './QuoteNotificationBell'

type Props = {
  product: FlowtexProduct
  buttonClassName?: string
}

/** Get Quote + notification bell; badge count shown on button when logged in */
export function GetQuoteWithNotifications({ product, buttonClassName }: Props) {
  const { user } = useAuth()
  const { unreadCount } = useQuoteNotifications()

  return (
    <div className="flex flex-1 gap-2">
      <GetQuoteButton
        product={product}
        className={buttonClassName}
        unreadBadge={user?.role === 'customer' && unreadCount > 0 ? unreadCount : 0}
      />
      <QuoteNotificationBell />
    </div>
  )
}

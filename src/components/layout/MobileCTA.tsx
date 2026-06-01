import { Link } from 'react-router-dom'
import { MessageCircle, FileText } from 'lucide-react'
import { PLACEHOLDERS } from '../../data/site'
import { useAuth } from '../../context/AuthContext'
import { getQuoteNavPath } from '../../lib/quoteNav'

export function MobileCTA() {
  const { user } = useAuth()
  const wa = PLACEHOLDERS.whatsapp.replace(/[^\d]/g, '') || '919999999999'
  const quoteTo = getQuoteNavPath(user?.role === 'customer')

  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 flex gap-2 p-4 md:hidden">
      <a
        href={`https://wa.me/${wa}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 font-semibold text-white shadow-lg"
        aria-label="WhatsApp"
      >
        <MessageCircle size={20} />
        WhatsApp
      </a>
      <Link
        to={quoteTo}
        className="glow-cta flex flex-1 items-center justify-center gap-2 rounded-2xl bg-flow-deep py-3.5 font-semibold text-white"
      >
        <FileText size={18} />
        Get Quote
      </Link>
    </div>
  )
}

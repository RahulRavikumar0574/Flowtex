import { Link, useLocation } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { ModalShell } from './ModalShell'

type Props = {
  onClose: () => void
}

export function LoginRequiredModal({ onClose }: Props) {
  const location = useLocation()
  const sep = location.search ? '&' : '?'
  const returnTo = encodeURIComponent(
    `${location.pathname}${location.search}${sep}openQuote=1`,
  )

  return (
    <ModalShell title="Login / Sign Up Required" onClose={onClose}>
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-flow-ice">
          <Lock className="text-flow-accent" size={28} />
        </div>
        <p className="font-semibold text-flow-deep">Login to Get a Price Quote</p>
        <p className="mt-2 text-sm text-flow-navy/70">
          Please login or create an account to request price for this product.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            to={`/login?return=${returnTo}`}
            className="glow-cta rounded-full bg-flow-deep py-3 text-center font-semibold text-white"
            onClick={onClose}
          >
            Login
          </Link>
          <Link
            to={`/signup?return=${returnTo}`}
            className="rounded-full border border-flow-deep/15 bg-white py-3 text-center font-semibold text-flow-deep hover:bg-flow-ice"
            onClick={onClose}
          >
            Create New Account
          </Link>
        </div>
      </div>
    </ModalShell>
  )
}

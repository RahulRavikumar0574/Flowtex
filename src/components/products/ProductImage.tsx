import { useState } from 'react'
import clsx from 'clsx'
import { Droplets } from 'lucide-react'
import { isPlaceholderImage } from '../../data/products'

type Props = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  placeholderLabel?: string
}

export function ProductImage({ src, alt, className, imgClassName, placeholderLabel }: Props) {
  const [failed, setFailed] = useState(false)

  if (isPlaceholderImage(src) || failed) {
    return (
      <div
        className={clsx(
          'flex flex-col items-center justify-center rounded-t-full rounded-b-2xl border-2 border-flow-accent/25 bg-gradient-to-b from-flow-glow/25 to-flow-accent/15 shadow-inner',
          className,
        )}
      >
        <Droplets className="text-flow-accent/60" size={28} />
        <span className="mt-2 px-2 text-center text-[9px] font-medium text-flow-navy/45">
          {failed ? '[PRODUCT_IMAGE]' : (placeholderLabel ?? src)}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={clsx('object-contain', imgClassName, className)}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

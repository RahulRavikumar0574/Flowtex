import { useEffect, useState } from 'react'
import { getProductGalleryCandidates } from '../data/products'

/** Preloads gallery URLs and returns only files that exist on the server */
export function useProductGallery(slug: string | undefined) {
  const [validUrls, setValidUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) {
      setValidUrls([])
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    const candidates = getProductGalleryCandidates(slug)

    Promise.all(
      candidates.map(
        (url) =>
          new Promise<string | null>((resolve) => {
            const img = new Image()
            img.onload = () => resolve(url)
            img.onerror = () => resolve(null)
            img.src = url
          }),
      ),
    ).then((results) => {
      if (!cancelled) {
        setValidUrls(results.filter((u): u is string => u !== null))
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { gallery: validUrls, primaryImage: validUrls[0] ?? null, loading }
}

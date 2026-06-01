import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { geoCentroid, geoMercator, geoPath } from 'd3-geo'
import type { Feature, FeatureCollection } from 'geojson'
import {
  GEO_NAME_TO_STATE_ID,
  HIGHLIGHTED_GEO_NAMES,
  getStateByGeoName,
  getStateFeatures,
  STATE_INSTALLATIONS,
  type StateInstallation,
} from '../../../data/stateInstallations'

type GeoProps = { st_nm: string }

type IndiaMapProps = {
  selectedId: string
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}

function getFocusTransform(
  path: ReturnType<typeof geoPath>,
  features: Feature[],
  width: number,
  height: number,
): { x: number; y: number; scale: number } {
  if (!features.length) return { x: 0, y: 0, scale: 1 }
  const collection: FeatureCollection = { type: 'FeatureCollection', features }
  const [[x0, y0], [x1, y1]] = path.bounds(collection)
  const dx = x1 - x0
  const dy = y1 - y0
  if (dx === 0 || dy === 0) return { x: 0, y: 0, scale: 1 }
  const padding = 48
  const scale = Math.min((width - padding * 2) / dx, (height - padding * 2) / dy, 2.8)
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  return {
    scale,
    x: width / 2 - scale * cx,
    y: height / 2 - scale * cy,
  }
}

function MapPin({
  x,
  y,
  active,
  label,
}: {
  x: number
  y: number
  active: boolean
  label: string
}) {
  return (
    <g transform={`translate(${x},${y})`} pointerEvents="none">
      <motion.circle
        r={active ? 18 : 14}
        className="fill-flow-accent/25"
        animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.circle
        r={active ? 12 : 9}
        className="fill-flow-glow/20"
        animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.35 }}
      />
      <motion.circle
        r={5}
        className={`stroke-2 stroke-white ${active ? 'fill-flow-glow' : 'fill-flow-accent'}`}
        animate={active ? { y: [0, -2, 0] } : {}}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          filter: active
            ? 'drop-shadow(0 0 8px rgba(77,163,255,0.9))'
            : 'drop-shadow(0 0 4px rgba(43,127,212,0.5))',
        }}
      />
      <AnimatePresence>
        {active && (
          <motion.text
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: -14 }}
            exit={{ opacity: 0 }}
            textAnchor="middle"
            className="fill-flow-deep text-[10px] font-semibold md:text-[11px]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {label}
          </motion.text>
        )}
      </AnimatePresence>
    </g>
  )
}

export function IndiaMap({ selectedId, hoveredId, onSelect, onHover }: IndiaMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null)
  const [size, setSize] = useState({ width: 640, height: 520 })
  const [tooltip, setTooltip] = useState<{ x: number; y: number; state: StateInstallation } | null>(
    null,
  )

  const activeId = hoveredId ?? selectedId

  useEffect(() => {
    fetch('/data/india-states.geojson')
      .then((r) => r.json())
      .then((data: FeatureCollection) => setGeojson(data))
      .catch(() => setGeojson(null))
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const { width, height } = el.getBoundingClientRect()
      setSize({ width: Math.max(width, 280), height: Math.max(height, 320) })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const projection = useMemo(() => {
    const p = geoMercator()
    if (geojson) p.fitSize([size.width, size.height], geojson)
    return p
  }, [geojson, size])

  const pathGen = useMemo(() => geoPath(projection), [projection])

  const selectedState = STATE_INSTALLATIONS.find((s) => s.id === selectedId)
  const focusFeatures = useMemo(() => {
    if (!geojson || !selectedState) return []
    return getStateFeatures(geojson, selectedState)
  }, [geojson, selectedState])

  const mapTransform = useMemo(() => {
    if (!focusFeatures.length) return { x: 0, y: 0, scale: 1 }
    return getFocusTransform(pathGen, focusFeatures, size.width, size.height)
  }, [focusFeatures, pathGen, size])

  const pinPositions = useMemo(() => {
    if (!geojson) return []
    return STATE_INSTALLATIONS.map((state) => {
      const features = getStateFeatures(geojson, state)
      if (!features.length) return null
      const collection: FeatureCollection = { type: 'FeatureCollection', features }
      const [lng, lat] = geoCentroid(collection)
      const projected = projection([lng, lat])
      if (!projected) return null
      return { state, x: projected[0], y: projected[1] }
    }).filter(Boolean) as { state: StateInstallation; x: number; y: number }[]
  }, [geojson, projection])

  const handleGeoInteraction = useCallback(
    (geoName: string, clientX: number, clientY: number, rect: DOMRect) => {
      const state = getStateByGeoName(geoName)
      if (!state) return
      onSelect(state.id)
      setTooltip({
        x: clientX - rect.left,
        y: clientY - rect.top,
        state,
      })
    },
    [onSelect],
  )

  if (!geojson) {
    return (
      <div
        ref={containerRef}
        className="flex h-full min-h-[320px] w-full items-center justify-center rounded-3xl bg-flow-mist/50"
      >
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-flow-accent border-t-transparent" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative h-full min-h-[320px] w-full">
      <svg
        width={size.width}
        height={size.height}
        viewBox={`0 0 ${size.width} ${size.height}`}
        className="h-full w-full"
        role="img"
        aria-label="Interactive map of India showing Flowtex installations by state"
      >
        <defs>
          <linearGradient id="flowtexMapBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8f4fc" />
            <stop offset="100%" stopColor="#f5f9fc" />
          </linearGradient>
          <filter id="stateGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width={size.width} height={size.height} fill="url(#flowtexMapBg)" rx={0} />

        <motion.g
          animate={{
            transform: `translate(${mapTransform.x}, ${mapTransform.y}) scale(${mapTransform.scale})`,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          style={{ transformOrigin: '0px 0px' }}
        >
          {geojson.features.map((feature) => {
            const geoName = (feature.properties as GeoProps)?.st_nm ?? ''
            const stateId = GEO_NAME_TO_STATE_ID[geoName]
            const isHighlighted = HIGHLIGHTED_GEO_NAMES.has(geoName)
            const isActive = stateId === activeId
            const isSelected = stateId === selectedId
            const d = pathGen(feature) ?? ''

            return (
              <path
                key={geoName + feature.type}
                d={d}
                className="cursor-pointer transition-all duration-300"
                fill={
                  isActive
                    ? '#2b7fd4'
                    : isHighlighted
                      ? isSelected
                        ? '#4da3ff'
                        : '#b8d9f5'
                      : '#e2eaf2'
                }
                stroke={isActive ? '#0d2847' : '#ffffff'}
                strokeWidth={isActive ? 1.2 : 0.6}
                opacity={isHighlighted ? 1 : 0.85}
                filter={isActive ? 'url(#stateGlow)' : undefined}
                onMouseEnter={(e) => {
                  if (stateId) onHover(stateId)
                  const state = getStateByGeoName(geoName)
                  if (state) {
                    const rect = containerRef.current!.getBoundingClientRect()
                    setTooltip({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                      state,
                    })
                  }
                }}
                onMouseLeave={() => {
                  onHover(null)
                  setTooltip(null)
                }}
                onClick={(e) => {
                  const rect = containerRef.current!.getBoundingClientRect()
                  handleGeoInteraction(geoName, e.clientX, e.clientY, rect)
                }}
              />
            )
          })}

          {pinPositions.map(({ state, x, y }) => (
            <MapPin
              key={state.id}
              x={x}
              y={y}
              active={activeId === state.id}
              label={state.name}
            />
          ))}
        </motion.g>
      </svg>

      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="pointer-events-none absolute z-20 max-w-[200px] rounded-xl glass-light px-3 py-2 shadow-lg"
            style={{
              left: Math.min(tooltip.x + 12, size.width - 210),
              top: Math.max(tooltip.y - 48, 8),
            }}
          >
            <p className="text-xs font-bold text-flow-deep">{tooltip.state.name}</p>
            <p className="text-[11px] text-flow-navy/70">
              {tooltip.state.installations.toLocaleString('en-IN')}+ installs
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

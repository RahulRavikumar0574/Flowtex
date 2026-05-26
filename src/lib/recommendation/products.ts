import type { TankProductMeta } from './types'

/**
 * Product metadata for the recommendation engine.
 * Admin-editable: add products here or load from CMS later.
 */
export const TANK_PRODUCTS: TankProductMeta[] = [
  {
    id: 'ft-3l',
    name: 'Flowtex 3 Layer',
    capacityRange: '500–1000 L',
    capacityLiters: { min: 500, max: 1000 },
    layerCount: 3,
    tier: 'economy',
    heatLabel: 'Up to 45°C',
    warranty: '10 Years',
    tags: ['Urban homes', 'Moderate climate', 'Budget-friendly'],
    dimensions: {
      capacity: 35,
      heatResistance: 42,
      durability: 48,
      uvProtection: 40,
      antibacterial: 45,
      tierFit: 28,
    },
  },
  {
    id: 'ft-4l',
    name: 'Flowtex 4 Layer',
    capacityRange: '750–1500 L',
    capacityLiters: { min: 750, max: 1500 },
    layerCount: 4,
    tier: 'mid',
    heatLabel: 'Up to 50°C',
    warranty: '12 Years',
    tags: ['Apartments', 'Warm climates', 'Balanced value'],
    dimensions: {
      capacity: 58,
      heatResistance: 58,
      durability: 62,
      uvProtection: 55,
      antibacterial: 60,
      tierFit: 52,
    },
  },
  {
    id: 'ft-6l',
    name: 'Flowtex 6 Layer Pro',
    capacityRange: '1000–2000 L',
    capacityLiters: { min: 1000, max: 2000 },
    layerCount: 6,
    tier: 'premium',
    heatLabel: 'Up to 60°C',
    warranty: '15 Years',
    tags: ['Extreme heat', 'Large households', 'Maximum protection'],
    dimensions: {
      capacity: 78,
      heatResistance: 88,
      durability: 85,
      uvProtection: 82,
      antibacterial: 88,
      tierFit: 78,
    },
  },
  {
    id: 'ft-xl',
    name: 'Flowtex XL Industrial',
    capacityRange: '2000–5000 L',
    capacityLiters: { min: 2000, max: 5000 },
    layerCount: 6,
    tier: 'industrial',
    heatLabel: 'Up to 65°C',
    warranty: '15 Years',
    tags: ['Commercial', 'Industrial', 'Institutional'],
    dimensions: {
      capacity: 95,
      heatResistance: 95,
      durability: 92,
      uvProtection: 88,
      antibacterial: 90,
      tierFit: 95,
    },
  },
]

export const PRODUCT_BY_ID = Object.fromEntries(
  TANK_PRODUCTS.map((p) => [p.id, p]),
) as Record<string, TankProductMeta>

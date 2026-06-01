import type { TankProductMeta } from './types'

/**
 * Representative products for the Smart Tank Finder engine.
 * Maps to real Flowtex layer categories.
 */
export const TANK_PRODUCTS: TankProductMeta[] = [
  {
    id: 'ft-3l',
    name: '3 Layer Water Tank',
    capacityRange: '500–5000 L',
    capacityLiters: { min: 500, max: 5000 },
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
    name: '4 Layer Water Tank',
    capacityRange: '500–5000 L',
    capacityLiters: { min: 500, max: 5000 },
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
    id: 'ft-5l',
    name: '5 Layer Puff Water Tank',
    capacityRange: '500–5000 L',
    capacityLiters: { min: 500, max: 5000 },
    layerCount: 5,
    tier: 'premium',
    heatLabel: 'Up to 58°C',
    warranty: '14 Years',
    tags: ['Puff insulation', 'Hot climates', 'Enhanced thermal'],
    dimensions: {
      capacity: 72,
      heatResistance: 78,
      durability: 75,
      uvProtection: 72,
      antibacterial: 78,
      tierFit: 68,
    },
  },
  {
    id: 'ft-6l',
    name: '6 Layer Puff Water Tank',
    capacityRange: '1000–5000 L',
    capacityLiters: { min: 1000, max: 5000 },
    layerCount: 6,
    tier: 'premium',
    heatLabel: 'Up to 60°C',
    warranty: '15 Years',
    tags: ['Extreme heat', 'Double puff', 'Maximum protection'],
    dimensions: {
      capacity: 88,
      heatResistance: 92,
      durability: 88,
      uvProtection: 85,
      antibacterial: 90,
      tierFit: 85,
    },
  },
]

export const PRODUCT_BY_ID = Object.fromEntries(
  TANK_PRODUCTS.map((p) => [p.id, p]),
) as Record<string, TankProductMeta>

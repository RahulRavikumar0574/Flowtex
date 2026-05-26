import type { AnswerKey, QuestionWeightConfig, ScoringDimension } from './types'

/** Global dimension importance when resolving conflicts (higher = wins ties) */
export const DIMENSION_PRIORITY: Record<ScoringDimension, number> = {
  capacity: 1.0,
  heatResistance: 0.95,
  durability: 0.85,
  uvProtection: 0.8,
  antibacterial: 0.75,
  tierFit: 0.7,
}

export const DIMENSION_LABELS: Record<ScoringDimension, string> = {
  capacity: 'Storage Capacity',
  heatResistance: 'Heat Resistance',
  durability: 'Durability',
  uvProtection: 'UV Protection',
  antibacterial: 'Anti-Bacterial',
  tierFit: 'Budget & Tier Fit',
}

/** How much each quiz answer influences profile dimensions */
export const QUESTION_WEIGHTS: QuestionWeightConfig[] = [
  {
    id: 'family',
    dimensionWeights: { capacity: 1.0 },
  },
  {
    id: 'usage',
    dimensionWeights: { capacity: 0.85, tierFit: 0.35 },
  },
  {
    id: 'climate',
    dimensionWeights: { heatResistance: 1.0, uvProtection: 0.75 },
  },
  {
    id: 'install',
    dimensionWeights: { durability: 0.6, capacity: 0.25 },
  },
  {
    id: 'location',
    dimensionWeights: { uvProtection: 0.95, heatResistance: 0.45 },
  },
  {
    id: 'water',
    dimensionWeights: { durability: 0.85, antibacterial: 1.0 },
  },
  {
    id: 'budget',
    dimensionWeights: { tierFit: 1.0 },
  },
]

/**
 * Answer option → normalized need level (0–100) per dimension.
 * Deterministic lookup — no randomness.
 */
export const ANSWER_SCORE_MAP: Record<
  AnswerKey,
  Record<string, Partial<Record<ScoringDimension, number>>>
> = {
  family: {
    '1-2': { capacity: 22 },
    '3-5': { capacity: 48 },
    '6-8': { capacity: 72 },
    '8+': { capacity: 92 },
  },
  usage: {
    Low: { capacity: 18, tierFit: 25 },
    Moderate: { capacity: 42, tierFit: 45 },
    High: { capacity: 68, tierFit: 62 },
    'Very High': { capacity: 90, tierFit: 78 },
  },
  climate: {
    Mild: { heatResistance: 25, uvProtection: 20 },
    Warm: { heatResistance: 48, uvProtection: 45 },
    Hot: { heatResistance: 72, uvProtection: 68 },
    'Extreme Heat': { heatResistance: 95, uvProtection: 88 },
  },
  install: {
    Terrace: { durability: 55, capacity: 50 },
    Ground: { durability: 45, capacity: 40 },
    Basement: { durability: 60, capacity: 55 },
    Custom: { durability: 70, capacity: 65 },
  },
  location: {
    Indoor: { uvProtection: 15, heatResistance: 20 },
    Outdoor: { uvProtection: 90, heatResistance: 75 },
    'Semi-covered': { uvProtection: 55, heatResistance: 45 },
  },
  water: {
    Borewell: { durability: 70, antibacterial: 65 },
    Corporation: { durability: 50, antibacterial: 55 },
    Mixed: { durability: 62, antibacterial: 72 },
    Tanker: { durability: 80, antibacterial: 85 },
  },
  budget: {
    Economy: { tierFit: 22 },
    'Best Value': { tierFit: 48 },
    Premium: { tierFit: 72 },
    'No Compromise': { tierFit: 95 },
  },
}

/** Products within this % of top score are flagged as close matches */
export const CLOSE_SCORE_THRESHOLD = 8

/** Minimum gap to suggest premium upgrade over best match */
export const PREMIUM_UPGRADE_MIN_TIER_GAP = 1

export const TIER_ORDER = ['economy', 'mid', 'premium', 'industrial'] as const

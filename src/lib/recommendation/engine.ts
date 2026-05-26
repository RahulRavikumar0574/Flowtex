import {
  ANSWER_SCORE_MAP,
  CLOSE_SCORE_THRESHOLD,
  DIMENSION_LABELS,
  DIMENSION_PRIORITY,
  QUESTION_WEIGHTS,
  TIER_ORDER,
} from './config'
import { TANK_PRODUCTS } from './products'
import type {
  AnswerKey,
  ConflictNote,
  DimensionBreakdown,
  ProductScore,
  RankedRecommendation,
  RecommendationResult,
  ScoringDimension,
  TankProductMeta,
  UserAnswers,
  UserProfile,
} from './types'

const ALL_DIMENSIONS: ScoringDimension[] = [
  'capacity',
  'heatResistance',
  'durability',
  'uvProtection',
  'antibacterial',
  'tierFit',
]

function emptyProfile(): UserProfile {
  return {
    capacity: 0,
    heatResistance: 0,
    durability: 0,
    uvProtection: 0,
    antibacterial: 0,
    tierFit: 0,
  }
}

/** Build weighted user need profile from answers — deterministic */
export function buildUserProfile(answers: UserAnswers): UserProfile {
  const accumulators: Record<ScoringDimension, { sum: number; weight: number }> = {
    capacity: { sum: 0, weight: 0 },
    heatResistance: { sum: 0, weight: 0 },
    durability: { sum: 0, weight: 0 },
    uvProtection: { sum: 0, weight: 0 },
    antibacterial: { sum: 0, weight: 0 },
    tierFit: { sum: 0, weight: 0 },
  }

  for (const qConfig of QUESTION_WEIGHTS) {
    const answer = answers[qConfig.id]
    if (!answer) continue

    const optionScores = ANSWER_SCORE_MAP[qConfig.id]?.[answer]
    if (!optionScores) continue

    for (const [dim, qWeight] of Object.entries(qConfig.dimensionWeights) as [
      ScoringDimension,
      number,
    ][]) {
      const value = optionScores[dim]
      if (value === undefined) continue
      accumulators[dim].sum += value * qWeight
      accumulators[dim].weight += qWeight
    }
  }

  const profile = emptyProfile()
  for (const dim of ALL_DIMENSIONS) {
    const { sum, weight } = accumulators[dim]
    profile[dim] = weight > 0 ? Math.round(sum / weight) : 50
  }
  return profile
}

/** Match percent: 100 when product strength meets/exceeds need; penalize shortfall */
function dimensionMatch(userNeed: number, productStrength: number): number {
  if (productStrength >= userNeed) {
    const overshoot = productStrength - userNeed
    return Math.max(88, 100 - overshoot * 0.15)
  }
  const shortfall = userNeed - productStrength
  return Math.max(0, 100 - shortfall * 1.35)
}

function scoreProduct(product: TankProductMeta, profile: UserProfile): ProductScore {
  const breakdown: DimensionBreakdown[] = ALL_DIMENSIONS.map((dim) => {
    const userNeed = profile[dim]
    const productStrength = product.dimensions[dim]
    const matchPercent = Math.round(dimensionMatch(userNeed, productStrength))
    const weight = DIMENSION_PRIORITY[dim]
    return {
      dimension: dim,
      label: DIMENSION_LABELS[dim],
      userNeed,
      productStrength,
      matchPercent,
      weight,
    }
  })

  const totalWeight = breakdown.reduce((s, b) => s + b.weight, 0)
  const weightedSum = breakdown.reduce((s, b) => s + b.matchPercent * b.weight, 0)
  const overallScore = Math.round(weightedSum / totalWeight)

  const suitabilityTags = buildSuitabilityTags(product, profile, breakdown)

  return { product, overallScore, breakdown, suitabilityTags }
}

function buildSuitabilityTags(
  product: TankProductMeta,
  profile: UserProfile,
  breakdown: DimensionBreakdown[],
): string[] {
  const tags: string[] = []
  const strong = breakdown.filter((b) => b.matchPercent >= 85)

  if (strong.some((b) => b.dimension === 'capacity')) {
    tags.push('Ideal capacity')
  }
  if (profile.heatResistance >= 70 && product.dimensions.heatResistance >= 75) {
    tags.push('Heat-ready')
  }
  if (profile.uvProtection >= 65 && product.dimensions.uvProtection >= 70) {
    tags.push('UV-shielded')
  }
  if (profile.antibacterial >= 65 && product.dimensions.antibacterial >= 70) {
    tags.push('Hygiene-focused')
  }
  if (profile.tierFit <= 40 && product.tier === 'economy') {
    tags.push('Budget-smart')
  }
  if (profile.tierFit >= 75 && (product.tier === 'premium' || product.tier === 'industrial')) {
    tags.push('Premium tier')
  }
  if (product.tags[0]) tags.push(product.tags[0])

  return [...new Set(tags)].slice(0, 4)
}

function detectConflicts(profile: UserProfile, ranked: ProductScore[]): ConflictNote[] {
  const notes: ConflictNote[] = []

  if (profile.tierFit < 35 && (profile.heatResistance > 75 || profile.capacity > 75)) {
    notes.push({
      type: 'conflict',
      message:
        'Your budget preference is economy-focused, but climate and usage suggest higher-spec protection. We prioritized durability and heat resistance.',
    })
  }

  if (profile.capacity > 80 && profile.tierFit < 45) {
    notes.push({
      type: 'conflict',
      message:
        'Large household storage needs may exceed economy-tier capacity. Best match balances value with minimum viable capacity.',
    })
  }

  if (ranked.length >= 2) {
    const gap = ranked[0].overallScore - ranked[1].overallScore
    if (gap <= CLOSE_SCORE_THRESHOLD) {
      notes.push({
        type: 'closeScores',
        message: `${ranked[0].product.name} and ${ranked[1].product.name} scored within ${gap}% — both are strong fits with different strengths.`,
      })
    }
  }

  return notes
}

function generateReasons(
  best: ProductScore,
  profile: UserProfile,
  answers: UserAnswers,
): string[] {
  const reasons: string[] = []
  const p = best.product
  const b = best.breakdown

  const cap = b.find((x) => x.dimension === 'capacity')
  if (cap && cap.matchPercent >= 80 && answers.family) {
    reasons.push(
      `Recommended because your household size (${answers.family}) requires ${p.capacityRange} storage capacity.`,
    )
  }

  const heat = b.find((x) => x.dimension === 'heatResistance')
  if (heat && heat.matchPercent >= 80 && answers.climate) {
    reasons.push(
      `${p.layerCount}-layer construction with ${p.heatLabel} rating suits ${answers.climate.toLowerCase()} climate conditions.`,
    )
  }

  const uv = b.find((x) => x.dimension === 'uvProtection')
  if (uv && uv.matchPercent >= 78 && answers.location === 'Outdoor') {
    reasons.push('UV-resistant outer layer recommended for outdoor terrace installation.')
  }

  const ab = b.find((x) => x.dimension === 'antibacterial')
  if (ab && ab.matchPercent >= 78 && answers.water) {
    reasons.push(
      `Anti-bacterial inner layer aligns with ${answers.water.toLowerCase()} water source hygiene requirements.`,
    )
  }

  const tier = b.find((x) => x.dimension === 'tierFit')
  if (tier && tier.matchPercent >= 75 && answers.budget) {
    reasons.push(`Best balance between your "${answers.budget}" budget preference and long-term durability.`)
  }

  if (profile.durability > 65 && p.dimensions.durability >= 70) {
    reasons.push('Reinforced multi-layer shell handles long-term structural stress and weathering.')
  }

  if (reasons.length === 0) {
    reasons.push(
      `Scored ${best.overallScore}% overall compatibility across capacity, climate, and usage factors.`,
    )
  }

  return reasons.slice(0, 5)
}

function tierIndex(tier: string): number {
  return TIER_ORDER.indexOf(tier as (typeof TIER_ORDER)[number])
}

function assignRoles(ranked: ProductScore[]): RankedRecommendation[] {
  if (ranked.length === 0) return []

  const best = ranked[0]
  const result: RankedRecommendation[] = [
    { ...best, role: 'bestMatch', roleLabel: 'Best Match' },
  ]

  const alternative = ranked.find((r) => r.product.id !== best.product.id)
  if (alternative) {
    result.push({ ...alternative, role: 'alternative', roleLabel: 'Recommended Alternative' })
  }

  const bestTier = tierIndex(best.product.tier)
  const premiumCandidates = ranked
    .filter((r) => tierIndex(r.product.tier) > bestTier)
    .sort((a, b) => b.overallScore - a.overallScore)

  const premium =
    premiumCandidates[0] ??
    ranked.find(
      (r) =>
        r.product.id !== best.product.id &&
        r.product.id !== alternative?.product.id &&
        tierIndex(r.product.tier) >= bestTier,
    )

  if (premium && premium.product.id !== best.product.id) {
    const already = result.some((r) => r.product.id === premium.product.id)
    if (!already) {
      result.push({ ...premium, role: 'premiumUpgrade', roleLabel: 'Premium Upgrade' })
    }
  } else if (ranked[2] && ranked[2].product.id !== alternative?.product.id) {
    result.push({ ...ranked[2], role: 'premiumUpgrade', roleLabel: 'Premium Upgrade' })
  }

  return result
}

/** Main entry — pure, deterministic, same inputs → same output */
export function getRecommendations(answers: UserAnswers): RecommendationResult {
  const userProfile = buildUserProfile(answers)

  const ranked = TANK_PRODUCTS.map((product) => scoreProduct(product, userProfile)).sort(
    (a, b) => {
      if (b.overallScore !== a.overallScore) return b.overallScore - a.overallScore
      return a.product.id.localeCompare(b.product.id)
    },
  )

  const conflicts = detectConflicts(userProfile, ranked)
  const recommendations = assignRoles(ranked)
  const reasons = generateReasons(ranked[0], userProfile, answers)

  const isCloseCall =
    ranked.length >= 2 &&
    ranked[0].overallScore - ranked[1].overallScore <= CLOSE_SCORE_THRESHOLD

  if (isCloseCall && recommendations[1]) {
    const upgradeHint: ConflictNote = {
      type: 'upgradeHint',
      message: `Choose ${recommendations[0].product.name} for best overall fit, or ${recommendations[1].product.name} if ${recommendations[1].suitabilityTags[0]?.toLowerCase() ?? 'alternate strengths'} matter more to you.`,
    }
    conflicts.push(upgradeHint)
  }

  return {
    ranked,
    recommendations,
    reasons,
    conflicts,
    userProfile,
    isCloseCall,
  }
}

/** Validate all required answers present */
export function isProfileComplete(answers: UserAnswers, requiredKeys: AnswerKey[]): boolean {
  return requiredKeys.every((k) => Boolean(answers[k]))
}

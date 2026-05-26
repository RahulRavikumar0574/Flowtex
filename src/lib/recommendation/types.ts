/** Answer keys — extend when adding new quiz questions */
export type AnswerKey =
  | 'family'
  | 'usage'
  | 'climate'
  | 'install'
  | 'location'
  | 'water'
  | 'budget'

export type UserAnswers = Partial<Record<AnswerKey, string>>

/** Dimensions the engine scores against */
export type ScoringDimension =
  | 'capacity'
  | 'heatResistance'
  | 'durability'
  | 'uvProtection'
  | 'antibacterial'
  | 'tierFit'

export type UserProfile = Record<ScoringDimension, number>

export type ProductTier = 'economy' | 'mid' | 'premium' | 'industrial'

export type TankProductMeta = {
  id: string
  name: string
  capacityRange: string
  capacityLiters: { min: number; max: number }
  layerCount: number
  tier: ProductTier
  /** 0–100 product strength per dimension */
  dimensions: Record<ScoringDimension, number>
  tags: string[]
  heatLabel: string
  warranty: string
}

export type DimensionBreakdown = {
  dimension: ScoringDimension
  label: string
  userNeed: number
  productStrength: number
  matchPercent: number
  weight: number
}

export type ProductScore = {
  product: TankProductMeta
  overallScore: number
  breakdown: DimensionBreakdown[]
  suitabilityTags: string[]
}

export type RecommendationRole = 'bestMatch' | 'alternative' | 'premiumUpgrade'

export type RankedRecommendation = ProductScore & {
  role: RecommendationRole
  roleLabel: string
}

export type ConflictNote = {
  type: 'conflict' | 'closeScores' | 'upgradeHint'
  message: string
}

export type RecommendationResult = {
  ranked: ProductScore[]
  recommendations: RankedRecommendation[]
  reasons: string[]
  conflicts: ConflictNote[]
  userProfile: UserProfile
  /** True when top two products are within CLOSE_SCORE_THRESHOLD */
  isCloseCall: boolean
}

export type QuestionWeightConfig = {
  id: AnswerKey
  /** Dimension → contribution weight when this answer is applied */
  dimensionWeights: Partial<Record<ScoringDimension, number>>
}

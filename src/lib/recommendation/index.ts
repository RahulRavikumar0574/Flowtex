export { getRecommendations, buildUserProfile, isProfileComplete } from './engine'
export { TANK_PRODUCTS, PRODUCT_BY_ID } from './products'
export {
  DIMENSION_LABELS,
  ANSWER_SCORE_MAP,
  QUESTION_WEIGHTS,
  CLOSE_SCORE_THRESHOLD,
} from './config'
export type {
  UserAnswers,
  UserProfile,
  ProductScore,
  RecommendationResult,
  RankedRecommendation,
  TankProductMeta,
  ScoringDimension,
} from './types'

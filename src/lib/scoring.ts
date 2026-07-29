import { CATEGORIES, MAX_CATEGORY_SCORE, MAX_TOTAL_SCORE, type CategoryId } from '../data/quizData'
import { scoreToTier, type Tier } from '../data/animalContent'

export type Answers = Record<string, number>

export interface CategoryScore {
  categoryId: CategoryId
  score: number
  maxScore: number
  tier: Tier
}

export interface ScoreResult {
  total: number
  maxTotal: number
  overallTier: Tier
  categories: CategoryScore[]
}

export function computeScores(answers: Answers): ScoreResult {
  const categories: CategoryScore[] = CATEGORIES.map((category) => {
    const score = category.statements.reduce((sum, statement) => sum + (answers[statement.id] ?? 0), 0)
    return {
      categoryId: category.id,
      score,
      maxScore: MAX_CATEGORY_SCORE,
      tier: scoreToTier(score, MAX_CATEGORY_SCORE),
    }
  })

  const total = categories.reduce((sum, category) => sum + category.score, 0)

  return {
    total,
    maxTotal: MAX_TOTAL_SCORE,
    overallTier: scoreToTier(total, MAX_TOTAL_SCORE),
    categories,
  }
}

export function isComplete(answers: Answers): boolean {
  return CATEGORIES.every((category) => category.statements.every((statement) => answers[statement.id] !== undefined))
}

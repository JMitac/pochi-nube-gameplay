import type { DuckId, FoodKind, GameMode } from '../domain/ids';
import { FOOD_RULES } from './foodRules';

/**
 * Design decision (not defined in the gameplay doc): the "fruit rain" ×2
 * and the cooperative "together" ×2 stack, so a fruit can be worth ×4.
 * Flip this flag to make them not stack.
 */
export const STACK_MULTIPLIERS = true;
export const TOGETHER_MULTIPLIER = 2;

export interface CatchScoreInput {
  foodKind: FoodKind;
  duckId: DuckId;
  phaseMultiplier: number;
  isTogether: boolean;
}

export function calculateCatchPoints(input: CatchScoreInput): number {
  const basePoints = FOOD_RULES[input.foodKind].points[input.duckId];
  if (basePoints < 0) return basePoints;

  const togetherMultiplier = input.isTogether ? TOGETHER_MULTIPLIER : 1;
  const multiplier = STACK_MULTIPLIERS
    ? input.phaseMultiplier * togetherMultiplier
    : Math.max(input.phaseMultiplier, togetherMultiplier);

  return basePoints * multiplier;
}

export const STAR_THRESHOLDS: Record<Exclude<GameMode, 'versus'>, readonly [number, number, number]> = {
  coop: [250, 500, 750],
  solo: [150, 300, 450],
};

/** Cooperative and solo matches end with 1, 2 or 3 stars. */
export function calculateStars(score: number, mode: GameMode): 0 | 1 | 2 | 3 {
  if (mode === 'versus') return 0;
  const [one, two, three] = STAR_THRESHOLDS[mode];
  if (score >= three) return 3;
  if (score >= two) return 2;
  if (score >= one) return 1;
  return 0;
}

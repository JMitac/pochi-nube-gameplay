import type { DuckId, FoodKind } from '../domain/ids';
import { DECOY_SLOW_FACTOR, SNACK_SPEED_FACTOR } from './abilityRules';

/** Horizontal speed in stage pixels per second. */
export const DUCK_SPEED = 300;
/** Moving "into" the screen is slower so depth feels right in the 2.5D view. */
export const DEPTH_SPEED_FACTOR = 0.65;

export const JUMP_DURATION_MS = 650;
export const JUMP_HEIGHT = 110;

export const CATCH_RADIUS = 48;
export const CATCH_REACH_HEIGHT = 70;
export const BOOSTED_CATCH_RADIUS_FACTOR = 1.6;

/** One "step" of a duck in stage pixels. "Less than 2 steps" means together. */
export const STEP_DISTANCE = 70;
export const TOGETHER_DISTANCE = STEP_DISTANCE * 2;

export const DIZZY_DURATION_MS = 1_000;
export const DIZZY_SPEED_FACTOR = 0.35;
export const PUDDLE_STUN_DURATION_MS = 1_000;
export const PUDDLE_IMMUNITY_MS = 1_500;
export const HOP_SPEED_FACTOR = 0.5;

export type AbilityId = 'sharedSnack' | 'walkPlan';
export type PuddleReaction = 'bellyFlop' | 'hop';

export interface DuckProfile {
  id: DuckId;
  displayName: string;
  favoriteFoods: readonly FoodKind[];
  abilityId: AbilityId;
  abilityName: string;
  puddleReaction: PuddleReaction;
}

export const DUCK_PROFILES: Record<DuckId, DuckProfile> = {
  pochi: {
    id: 'pochi',
    displayName: 'Pochi',
    favoriteFoods: ['pear', 'pricklyPear', 'peach'],
    abilityId: 'sharedSnack',
    abilityName: 'Snack',
    puddleReaction: 'bellyFlop',
  },
  nube: {
    id: 'nube',
    displayName: 'Nube',
    favoriteFoods: ['strawberry', 'blueberry'],
    abilityId: 'walkPlan',
    abilityName: 'Plan',
    puddleReaction: 'hop',
  },
};

/** Height of a jump as a smooth parabola. Returns 0 outside the jump. */
export function jumpHeightAt(elapsedSinceJumpMs: number): number {
  if (elapsedSinceJumpMs < 0 || elapsedSinceJumpMs > JUMP_DURATION_MS) return 0;
  const progress = elapsedSinceJumpMs / JUMP_DURATION_MS;
  return 4 * JUMP_HEIGHT * progress * (1 - progress);
}

export interface SpeedFactorInput {
  nowMs: number;
  duckId: DuckId;
  stunnedUntilMs: number;
  speedBoostUntilMs: number;
  dizzyUntilMs: number;
  inPuddle: boolean;
  isDistractedByDecoy: boolean;
}

/**
 * Speed multiplier of a duck right now. Shared so the client predicts
 * its own duck with exactly the same rules the server applies.
 */
export function computeSpeedFactor(input: SpeedFactorInput): number {
  if (input.nowMs < input.stunnedUntilMs) return 0;

  let factor = 1;
  if (input.nowMs < input.speedBoostUntilMs) factor *= SNACK_SPEED_FACTOR;
  if (input.nowMs < input.dizzyUntilMs) factor *= DIZZY_SPEED_FACTOR;
  if (input.inPuddle && DUCK_PROFILES[input.duckId].puddleReaction === 'hop') factor *= HOP_SPEED_FACTOR;
  if (input.isDistractedByDecoy) factor *= DECOY_SLOW_FACTOR;
  return factor;
}

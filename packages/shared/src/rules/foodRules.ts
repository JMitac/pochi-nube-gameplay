import type { DuckId, FoodKind } from '../domain/ids';

export type FoodEffect = 'none' | 'affection' | 'dizzy';

export interface FoodRules {
  kind: FoodKind;
  points: Record<DuckId, number>;
  bouncesOnce: boolean;
  effect: FoodEffect;
  /** Relative chance of appearing among the good foods. */
  spawnWeight: number;
}

export const FOOD_RULES: Record<FoodKind, FoodRules> = {
  pear: { kind: 'pear', points: { pochi: 20, nube: 10 }, bouncesOnce: false, effect: 'none', spawnWeight: 14 },
  pricklyPear: { kind: 'pricklyPear', points: { pochi: 20, nube: 10 }, bouncesOnce: false, effect: 'none', spawnWeight: 10 },
  peach: { kind: 'peach', points: { pochi: 20, nube: 10 }, bouncesOnce: true, effect: 'none', spawnWeight: 10 },
  strawberry: { kind: 'strawberry', points: { pochi: 10, nube: 20 }, bouncesOnce: false, effect: 'none', spawnWeight: 16 },
  blueberry: { kind: 'blueberry', points: { pochi: 10, nube: 20 }, bouncesOnce: false, effect: 'none', spawnWeight: 16 },
  bread: { kind: 'bread', points: { pochi: 30, nube: 30 }, bouncesOnce: false, effect: 'affection', spawnWeight: 6 },
  goldenFruit: { kind: 'goldenFruit', points: { pochi: 50, nube: 50 }, bouncesOnce: false, effect: 'none', spawnWeight: 2 },
  rottenApple: { kind: 'rottenApple', points: { pochi: -10, nube: -10 }, bouncesOnce: false, effect: 'dizzy', spawnWeight: 0 },
};

/** Height (stage px) from which every food starts falling. */
export const FOOD_START_HEIGHT = 420;
/** Height a bouncy food reaches after touching the grass once. */
export const BOUNCE_HEIGHT = 150;
export const BOUNCE_DURATION_MS = 900;
export const BOUNCE_DRIFT_PX = 90;

/** Orchard slopes: fallen fruit rolls downhill for a moment before it is lost. */
export const ROLL_SPEED = 170;
export const ROLL_DURATION_MS = 900;

export function isFavoriteFood(duckId: DuckId, kind: FoodKind): boolean {
  const rules = FOOD_RULES[kind];
  return rules.points[duckId] > rules.points[duckId === 'pochi' ? 'nube' : 'pochi'];
}

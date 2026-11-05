export const ABILITY_COOLDOWN_MS = 15_000;

/** Pochi · Snack compartido */
export const SNACK_SPEED_FACTOR = 1.5;
export const SNACK_BOOST_DURATION_MS = 4_000;
export const DECOY_DURATION_MS = 4_000;
export const DECOY_RADIUS = 150;
export const DECOY_SLOW_FACTOR = 0.55;

/** Nube · Plan del paseo */
export const WALK_PLAN_DURATION_MS = 5_000;
export const WALK_PLAN_FOOD_COUNT = 5;

/** Barra de cariño */
export const AFFECTION_MAX = 100;
export const AFFECTION_BREAD_GAIN = 25;
export const AFFECTION_COMBO_GAIN = 10;
export const COMBO_SIZE = 3;
export const COMBO_WINDOW_MS = 2_500;
export const AFFECTION_BOOST_DURATION_MS = 5_000;

/** Versus · aleteo */
export const FLAP_RANGE = 90;
export const FLAP_PUSH_DISTANCE = 70;
export const FLAP_COOLDOWN_MS = 2_500;

export interface DecoyLike {
  x: number;
  y: number;
  ownerSessionId: string;
}

/** Versus snack: a duck near the rival's bread gets distracted and slows down. */
export function isNearRivalDecoy(position: { x: number; y: number }, sessionId: string, decoys: Iterable<DecoyLike>): boolean {
  for (const decoy of decoys) {
    if (decoy.ownerSessionId !== sessionId && Math.hypot(decoy.x - position.x, decoy.y - position.y) < DECOY_RADIUS) return true;
  }
  return false;
}

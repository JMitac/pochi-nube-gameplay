import type { Bounds } from '@pochi/shared';

/** Base size of a duck in the game, as drawn on the "Juego" artboard (Pochi 160, Nube 156). */
export const DUCK_BASE_SIZE = 160;
/** Where the feet are inside the duck artwork (viewBox 200×220, feet at y≈203). */
export const DUCK_FEET_X = DUCK_BASE_SIZE / 2;
export const DUCK_FEET_Y = DUCK_BASE_SIZE * 1.1 * (203 / 220);

const FAR_SCALE = 0.86;
const NEAR_SCALE = 1.14;

/** Ducks closer to the front of the grass look a little bigger (2.5D depth). */
export function depthScale(y: number, playfield: Bounds): number {
  const depth = (y - playfield.minY) / Math.max(1, playfield.maxY - playfield.minY);
  return FAR_SCALE + (NEAR_SCALE - FAR_SCALE) * Math.min(1, Math.max(0, depth));
}

import { DEPTH_SPEED_FACTOR, DUCK_SPEED } from '../rules/duckRules';
import { clampToBounds, normalize, pushOutOfEllipse, type Vector2 } from './geometry';
import type { MapDefinition } from './maps';

export interface MovementInput {
  x: number;
  y: number;
}

export const NO_MOVEMENT: MovementInput = { x: 0, y: 0 };

/**
 * Moves a duck one step. It is pure on purpose: the server uses it to
 * simulate and the client uses the exact same function to predict.
 */
export function stepDuckPosition(
  position: Vector2,
  input: MovementInput,
  deltaMs: number,
  speedFactor: number,
  map: MapDefinition,
): Vector2 {
  const direction = normalize(input);
  const distancePx = (DUCK_SPEED * speedFactor * deltaMs) / 1000;
  const moved = {
    x: position.x + direction.x * distancePx,
    y: position.y + direction.y * distancePx * DEPTH_SPEED_FACTOR,
  };
  return keepInsideWalkableArea(moved, map);
}

export function keepInsideWalkableArea(position: Vector2, map: MapDefinition): Vector2 {
  let result = clampToBounds(position, map.playfield);
  for (const water of map.solidWater) {
    result = pushOutOfEllipse(result, water);
  }
  return clampToBounds(result, map.playfield);
}

export function isMoving(input: MovementInput): boolean {
  return Math.abs(input.x) > 0.05 || Math.abs(input.y) > 0.05;
}

import { describe, expect, it } from 'vitest';
import { generateRoomCode, normalizeRoomCode, sanitizePlayerName } from './rooms';
import { keepInsideWalkableArea } from '../world/movement';
import { MAP_DEFINITIONS } from '../world/maps';

describe('room codes', () => {
  it('generates codes like CUAC-7K2', () => {
    expect(generateRoomCode()).toMatch(/^CUAC-[A-Z2-9]{3}$/);
  });

  it('normalizes what the player types', () => {
    expect(normalizeRoomCode('cuac7k2')).toBe('CUAC-7K2');
    expect(normalizeRoomCode(' cuac-7k2 ')).toBe('CUAC-7K2');
  });
});

describe('sanitizePlayerName', () => {
  it('falls back to a default name', () => {
    expect(sanitizePlayerName('   ')).toBe('Patito');
    expect(sanitizePlayerName('<Julio>')).toBe('Julio');
  });
});

describe('keepInsideWalkableArea', () => {
  it('keeps ducks out of the meadow pond', () => {
    const pond = MAP_DEFINITIONS.meadow.solidWater[0]!;
    const result = keepInsideWalkableArea({ x: pond.cx, y: pond.cy }, MAP_DEFINITIONS.meadow);
    const insideRatio = Math.hypot((result.x - pond.cx) / pond.rx, (result.y - pond.cy) / pond.ry);
    expect(insideRatio).toBeGreaterThanOrEqual(0.999);
  });
});

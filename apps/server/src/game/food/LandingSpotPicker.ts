import { clamp, isInsideEllipse, type MapDefinition, type Vector2 } from '@pochi/shared';
import { randomBetween, type RandomSource } from '../MatchContext';

const EDGE_MARGIN = 20;
const MAX_ATTEMPTS = 12;

/** Finds a spot on the grass (never inside solid water) where a food can land. */
export function pickLandingSpot(map: MapDefinition, random: RandomSource): Vector2 {
  const { playfield } = map;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const spot = {
      x: randomBetween(random, playfield.minX + EDGE_MARGIN, playfield.maxX - EDGE_MARGIN),
      y: randomBetween(random, playfield.minY + EDGE_MARGIN / 2, playfield.maxY - EDGE_MARGIN / 2),
    };
    if (!map.solidWater.some((water) => isInsideEllipse(spot, water))) return spot;
  }
  return { x: playfield.minX + EDGE_MARGIN, y: playfield.minY + EDGE_MARGIN };
}

/** Orchard trees shake and drop a few fruits close to each other. */
export function pickSpotsUnderTree(map: MapDefinition, random: RandomSource, count: number): Vector2[] {
  const treeIndex = Math.floor(random.next() * map.shakingTreesX.length);
  const treeX = map.shakingTreesX[treeIndex] ?? (map.playfield.minX + map.playfield.maxX) / 2;
  const { playfield } = map;

  return Array.from({ length: count }, () => ({
    x: clamp(treeX + randomBetween(random, -map.spawnSpreadPx, map.spawnSpreadPx), playfield.minX, playfield.maxX),
    y: randomBetween(random, playfield.minY + 10, playfield.maxY - 10),
  }));
}

import type { MapId } from '../domain/ids';
import type { Bounds, Ellipse } from './geometry';

/**
 * The world uses the same coordinates as the 1280×720 design stage:
 * x goes left→right, y goes from the back of the grass (top) to the front (bottom).
 * Height above the grass is a separate value.
 */
export const STAGE_WIDTH = 1280;
export const STAGE_HEIGHT = 720;

export interface SlopeRules {
  /** -1 rolls to the left, 1 rolls to the right. */
  rollDirection: -1 | 1;
}

export interface MapDefinition {
  id: MapId;
  playfield: Bounds;
  /** Water the ducks must walk around. */
  solidWater: readonly Ellipse[];
  /** Puddles that are always there (cold in the lagoon). */
  fixedPuddles: readonly Ellipse[];
  coldWater: boolean;
  /** Trees that shake and drop several fruits together. */
  shakingTreesX: readonly number[];
  slope: SlopeRules | null;
  spawnSpreadPx: number;
}

export const MAP_DEFINITIONS: Record<MapId, MapDefinition> = {
  meadow: {
    id: 'meadow',
    playfield: { minX: 70, maxX: 1210, minY: 455, maxY: 700 },
    solidWater: [{ cx: 640, cy: 640, rx: 262, ry: 66 }],
    fixedPuddles: [],
    coldWater: false,
    shakingTreesX: [],
    slope: null,
    spawnSpreadPx: 0,
  },
  orchard: {
    id: 'orchard',
    playfield: { minX: 70, maxX: 1210, minY: 470, maxY: 700 },
    solidWater: [],
    fixedPuddles: [{ cx: 560, cy: 610, rx: 70, ry: 18 }],
    coldWater: false,
    shakingTreesX: [200, 590, 1160],
    slope: { rollDirection: -1 },
    spawnSpreadPx: 110,
  },
  lagoon: {
    id: 'lagoon',
    playfield: { minX: 70, maxX: 1210, minY: 470, maxY: 700 },
    solidWater: [],
    fixedPuddles: [
      { cx: 640, cy: 600, rx: 330, ry: 86 },
      { cx: 190, cy: 560, rx: 70, ry: 18 },
      { cx: 1080, cy: 560, rx: 80, ry: 20 },
      { cx: 360, cy: 660, rx: 60, ry: 16 },
      { cx: 930, cy: 670, rx: 64, ry: 16 },
    ],
    coldWater: true,
    shakingTreesX: [],
    slope: null,
    spawnSpreadPx: 0,
  },
};

export const SPAWN_POINTS: Record<'pochi' | 'nube', { x: number; y: number }> = {
  pochi: { x: 420, y: 520 },
  nube: { x: 860, y: 520 },
};

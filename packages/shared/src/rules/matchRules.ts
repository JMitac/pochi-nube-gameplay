import type { PhaseId } from '../domain/ids';

export const MATCH_DURATION_MS = 120_000;
export const COUNTDOWN_DURATION_MS = 3_000;
export const FINAL_TICK_TOCK_MS = 10_000;
export const SERVER_TICK_MS = 1000 / 30;
export const STATE_PATCH_MS = 50; // ~20 updates per second

export const MAX_PLAYERS_PER_ROOM = 2;
export const SOLO_PLAYERS_PER_ROOM = 1;

export interface PhaseRules {
  id: PhaseId;
  startsAtMs: number;
  spawnIntervalMs: number;
  fallDurationMs: number;
  rottenChance: number;
  pointsMultiplier: number;
  hasRainClouds: boolean;
}

/** The match speeds up in three phases inside the two minutes. */
export const PHASES: readonly PhaseRules[] = [
  {
    id: 'calm',
    startsAtMs: 0,
    spawnIntervalMs: 1_500,
    fallDurationMs: 2_400,
    rottenChance: 0,
    pointsMultiplier: 1,
    hasRainClouds: false,
  },
  {
    id: 'tricky',
    startsAtMs: 30_000,
    spawnIntervalMs: 900,
    fallDurationMs: 2_000,
    rottenChance: 0.14,
    pointsMultiplier: 1,
    hasRainClouds: true,
  },
  {
    id: 'fruitRain',
    startsAtMs: 90_000,
    spawnIntervalMs: 420,
    fallDurationMs: 1_600,
    rottenChance: 0.12,
    pointsMultiplier: 2,
    hasRainClouds: true,
  },
];

export function resolvePhase(elapsedMs: number): PhaseRules {
  let current = PHASES[0]!;
  for (const phase of PHASES) {
    if (elapsedMs >= phase.startsAtMs) current = phase;
  }
  return current;
}

export function remainingMatchMs(elapsedMs: number): number {
  return Math.max(0, MATCH_DURATION_MS - elapsedMs);
}

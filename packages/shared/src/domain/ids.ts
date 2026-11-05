/**
 * Identifiers shared by the client and the server.
 * Every list is declared once as a readonly tuple so the union type
 * and the runtime validation always stay in sync.
 */

export const ROOM_NAME = 'picnic';

export const DUCK_IDS = ['pochi', 'nube'] as const;
export type DuckId = (typeof DUCK_IDS)[number];

export const GAME_MODES = ['coop', 'versus', 'solo'] as const;
export type GameMode = (typeof GAME_MODES)[number];

export const MAP_IDS = ['meadow', 'orchard', 'lagoon'] as const;
export type MapId = (typeof MAP_IDS)[number];

export const ROOM_VISIBILITIES = ['public', 'private'] as const;
export type RoomVisibility = (typeof ROOM_VISIBILITIES)[number];

export const FOOD_KINDS = [
  'pear',
  'pricklyPear',
  'peach',
  'strawberry',
  'blueberry',
  'bread',
  'goldenFruit',
  'rottenApple',
] as const;
export type FoodKind = (typeof FOOD_KINDS)[number];

export const MATCH_STATUSES = ['waiting', 'countdown', 'playing', 'finished'] as const;
export type MatchStatus = (typeof MATCH_STATUSES)[number];

export const PHASE_IDS = ['calm', 'tricky', 'fruitRain'] as const;
export type PhaseId = (typeof PHASE_IDS)[number];

export function isOneOf<T extends string>(list: readonly T[], value: unknown): value is T {
  return typeof value === 'string' && (list as readonly string[]).includes(value);
}

export function otherDuck(duckId: DuckId): DuckId {
  return duckId === 'pochi' ? 'nube' : 'pochi';
}

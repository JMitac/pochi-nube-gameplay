import type { DuckId, FoodKind, GameMode, MapId, MatchStatus, PhaseId, RoomVisibility } from '../domain/ids';

/**
 * Read-only shape of the synchronized room state, as the client sees it.
 * The server implements it with @colyseus/schema classes.
 */
export interface MapLike<T> {
  forEach(callback: (value: T, key: string) => void): void;
  get(key: string): T | undefined;
  readonly size: number;
}

export interface PlayerView {
  sessionId: string;
  name: string;
  duckId: DuckId;
  ready: boolean;
  connected: boolean;
  x: number;
  y: number;
  height: number;
  score: number;
  affection: number;
  abilityReadyAtMs: number;
  speedBoostUntilMs: number;
  stunnedUntilMs: number;
  dizzyUntilMs: number;
  affectionBoostUntilMs: number;
  inPuddle: boolean;
  catches: MapLike<number>;
}

export interface FoodView {
  id: string;
  kind: FoodKind;
  x: number;
  y: number;
  height: number;
  fallProgress: number;
}

export interface PuddleView {
  id: string;
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  isCold: boolean;
}

export interface RainCloudView {
  id: string;
  x: number;
  y: number;
}

export interface DecoyView {
  id: string;
  x: number;
  y: number;
  ownerSessionId: string;
}

export interface PicnicStateView {
  status: MatchStatus;
  mode: GameMode;
  mapId: MapId;
  visibility: RoomVisibility;
  roomCode: string;
  hostSessionId: string;
  maxPlayers: number;
  countdownRemainingMs: number;
  elapsedMs: number;
  phaseId: PhaseId;
  isPaused: boolean;
  teamScore: number;
  winnerSessionId: string;
  players: MapLike<PlayerView>;
  foods: MapLike<FoodView>;
  puddles: MapLike<PuddleView>;
  rainClouds: MapLike<RainCloudView>;
  decoys: MapLike<DecoyView>;
}

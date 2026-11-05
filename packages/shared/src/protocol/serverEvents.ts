import type { DuckId, FoodKind, PhaseId } from '../domain/ids';
import type { Vector2 } from '../world/geometry';

/** One-off events the server sends so the client can play sounds and effects. */
export const SERVER_EVENTS = {
  foodCaught: 'foodCaught',
  foodLost: 'foodLost',
  puddleSplash: 'puddleSplash',
  phaseChanged: 'phaseChanged',
  comboTriggered: 'comboTriggered',
  affectionFull: 'affectionFull',
  abilityUsed: 'abilityUsed',
  walkPlanRevealed: 'walkPlanRevealed',
  quacked: 'quacked',
  flapHit: 'flapHit',
  playerJoined: 'playerJoined',
  jumped: 'jumped',
} as const;

export interface FoodCaughtEvent {
  foodId: string;
  foodKind: FoodKind;
  sessionId: string;
  duckId: DuckId;
  points: number;
  isFavorite: boolean;
  isTogether: boolean;
  position: Vector2;
}

export interface FoodLostEvent {
  foodId: string;
  position: Vector2;
}

export interface PuddleSplashEvent {
  sessionId: string;
  duckId: DuckId;
  isCold: boolean;
}

export interface PhaseChangedEvent {
  phaseId: PhaseId;
}

export interface SessionEvent {
  sessionId: string;
  duckId: DuckId;
}

export interface WalkPlanRevealedEvent {
  spots: Vector2[];
  durationMs: number;
}

export interface FlapHitEvent {
  attackerSessionId: string;
  victimSessionId: string;
  stolenPoints: number;
}

export interface ServerEventPayloads {
  [SERVER_EVENTS.foodCaught]: FoodCaughtEvent;
  [SERVER_EVENTS.foodLost]: FoodLostEvent;
  [SERVER_EVENTS.puddleSplash]: PuddleSplashEvent;
  [SERVER_EVENTS.phaseChanged]: PhaseChangedEvent;
  [SERVER_EVENTS.comboTriggered]: SessionEvent;
  [SERVER_EVENTS.affectionFull]: SessionEvent;
  [SERVER_EVENTS.abilityUsed]: SessionEvent;
  [SERVER_EVENTS.walkPlanRevealed]: WalkPlanRevealedEvent;
  [SERVER_EVENTS.quacked]: SessionEvent;
  [SERVER_EVENTS.flapHit]: FlapHitEvent;
  [SERVER_EVENTS.playerJoined]: SessionEvent;
  [SERVER_EVENTS.jumped]: SessionEvent;
}

export type ServerEventType = keyof ServerEventPayloads;

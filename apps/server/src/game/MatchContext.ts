import type { MapDefinition, ServerEventPayloads, ServerEventType } from '@pochi/shared';
import type { PicnicState } from '../rooms/schema/PicnicState';
import type { PlayerState } from '../rooms/schema/PlayerState';

/** Where the engine sends one-off events. The room implements it (dependency inversion). */
export interface MatchEventSink {
  broadcast<T extends ServerEventType>(type: T, payload: ServerEventPayloads[T]): void;
  sendTo<T extends ServerEventType>(sessionId: string, type: T, payload: ServerEventPayloads[T]): void;
}

export interface RandomSource {
  /** Returns a number in [0, 1). */
  next(): number;
}

export const mathRandomSource: RandomSource = { next: () => Math.random() };

export class IdGenerator {
  private counter = 0;

  next(prefix: string): string {
    this.counter += 1;
    return `${prefix}${this.counter}`;
  }
}

/** Everything a system needs to read or change the match. */
export interface MatchContext {
  readonly state: PicnicState;
  readonly map: MapDefinition;
  readonly events: MatchEventSink;
  readonly random: RandomSource;
  readonly ids: IdGenerator;
}

export function matchTimeOf(context: MatchContext): number {
  return context.state.elapsedMs;
}

export function playersOf(context: MatchContext): PlayerState[] {
  return Array.from(context.state.players.values());
}

export function partnerOf(context: MatchContext, player: PlayerState): PlayerState | undefined {
  return playersOf(context).find((other) => other.sessionId !== player.sessionId);
}

export function randomBetween(random: RandomSource, min: number, max: number): number {
  return min + random.next() * (max - min);
}

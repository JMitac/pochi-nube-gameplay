import { MapSchema, Schema, type } from '@colyseus/schema';
import type { DuckId, MovementInput } from '@pochi/shared';

export class PlayerState extends Schema {
  @type('string') sessionId = '';
  @type('string') name = '';
  @type('string') duckId: DuckId = 'pochi';
  @type('boolean') ready = false;
  @type('boolean') connected = true;

  @type('number') x = 0;
  @type('number') y = 0;
  @type('number') height = 0;

  @type('number') score = 0;
  @type('number') affection = 0;

  @type('number') abilityReadyAtMs = 0;
  @type('number') speedBoostUntilMs = 0;
  @type('number') stunnedUntilMs = 0;
  @type('number') dizzyUntilMs = 0;
  @type('number') affectionBoostUntilMs = 0;
  @type('boolean') inPuddle = false;

  /** How many of each food this duck caught, for the results screen. */
  @type({ map: 'number' }) catches = new MapSchema<number>();

  // ---- Server only (not synchronized) ----
  input: MovementInput = { x: 0, y: 0 };
  jumpStartedAtMs = -1;
  puddleImmuneUntilMs = 0;
  recentCatchTimesMs: number[] = [];
  lastCatchPoints = 0;
  flapReadyAtMs = 0;
  lastQuackAtRealMs = 0;
}

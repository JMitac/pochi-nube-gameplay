import {
  computeSpeedFactor,
  isNearRivalDecoy,
  stepDuckPosition,
  type DecoyView,
  type MapDefinition,
  type MovementInput,
  type PlayerView,
  type Vector2,
} from '@pochi/shared';

const SNAP_DISTANCE = 140;
const MOVING_CORRECTION_PER_SECOND = 1.5;
const IDLE_CORRECTION_PER_SECOND = 8;

/**
 * Client-side prediction: your own duck moves the moment you press a key,
 * using the same shared movement rules as the server, and is gently pulled
 * back toward the server's position so both never drift apart.
 */
export class LocalDuckPredictor {
  private position: Vector2 | null = null;

  reset(): void {
    this.position = null;
  }

  update(
    server: PlayerView,
    decoys: DecoyView[],
    input: MovementInput,
    deltaMs: number,
    matchTimeMs: number,
    map: MapDefinition,
    canMove: boolean,
  ): Vector2 {
    if (!this.position) this.position = { x: server.x, y: server.y };

    const speedFactor = canMove
      ? computeSpeedFactor({
          nowMs: matchTimeMs,
          duckId: server.duckId,
          stunnedUntilMs: server.stunnedUntilMs,
          speedBoostUntilMs: server.speedBoostUntilMs,
          dizzyUntilMs: server.dizzyUntilMs,
          inPuddle: server.inPuddle,
          isDistractedByDecoy: isNearRivalDecoy(this.position, server.sessionId, decoys),
        })
      : 0;

    this.position = stepDuckPosition(this.position, input, deltaMs, speedFactor, map);
    this.correctTowards(server, input, deltaMs);
    return this.position;
  }

  private correctTowards(server: Vector2, input: MovementInput, deltaMs: number): void {
    const position = this.position!;
    const errorX = server.x - position.x;
    const errorY = server.y - position.y;
    if (Math.hypot(errorX, errorY) > SNAP_DISTANCE) {
      this.position = { x: server.x, y: server.y };
      return;
    }
    const isIdle = input.x === 0 && input.y === 0;
    const rate = isIdle ? IDLE_CORRECTION_PER_SECOND : MOVING_CORRECTION_PER_SECOND;
    const blend = Math.min(1, (rate * deltaMs) / 1000);
    this.position = { x: position.x + errorX * blend, y: position.y + errorY * blend };
  }
}

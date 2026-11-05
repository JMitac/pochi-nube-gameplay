import type { MovementInput } from '@pochi/shared';

const RESEND_WHILE_MOVING_MS = 150;

/** Sends the joystick/keys to the server only when they change (plus a light heartbeat). */
export class MovementSender {
  private lastSent: MovementInput = { x: 0, y: 0 };
  private lastSentAtMs = 0;

  constructor(private readonly send: (movement: MovementInput) => void) {}

  update(movement: MovementInput, nowMs: number): void {
    const rounded = { x: Math.round(movement.x * 100) / 100, y: Math.round(movement.y * 100) / 100 };
    const changed = rounded.x !== this.lastSent.x || rounded.y !== this.lastSent.y;
    const isMoving = rounded.x !== 0 || rounded.y !== 0;
    const heartbeatDue = isMoving && nowMs - this.lastSentAtMs > RESEND_WHILE_MOVING_MS;
    if (!changed && !heartbeatDue) return;

    this.send(rounded);
    this.lastSent = rounded;
    this.lastSentAtMs = nowMs;
  }

  stop(): void {
    this.send({ x: 0, y: 0 });
    this.lastSent = { x: 0, y: 0 };
  }
}

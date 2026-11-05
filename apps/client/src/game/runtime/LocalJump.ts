import { JUMP_DURATION_MS, jumpHeightAt } from '@pochi/shared';

/** Predicts your own jump so the duck leaves the ground the moment you press Space. */
export class LocalJump {
  private startedAtMs = -Infinity;

  tryStart(nowMs: number): boolean {
    if (this.isJumping(nowMs)) return false;
    this.startedAtMs = nowMs;
    return true;
  }

  heightAt(nowMs: number): number {
    return jumpHeightAt(nowMs - this.startedAtMs);
  }

  isJumping(nowMs: number): boolean {
    return nowMs - this.startedAtMs <= JUMP_DURATION_MS;
  }
}

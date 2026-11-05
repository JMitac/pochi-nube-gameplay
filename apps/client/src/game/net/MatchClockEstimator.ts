import type { PicnicStateView } from '@pochi/shared';

/**
 * The server sends the match time ~20 times per second. Between updates
 * this estimates it locally so cooldowns and timers move smoothly.
 */
export class MatchClockEstimator {
  private lastServerElapsedMs = 0;
  private receivedAtMs = 0;

  observe(state: PicnicStateView, nowMs: number): void {
    if (state.elapsedMs !== this.lastServerElapsedMs) {
      this.lastServerElapsedMs = state.elapsedMs;
      this.receivedAtMs = nowMs;
    }
  }

  estimate(state: PicnicStateView, nowMs: number): number {
    const running = state.status === 'playing' && !state.isPaused;
    if (!running) return state.elapsedMs;
    return this.lastServerElapsedMs + Math.min(nowMs - this.receivedAtMs, 200);
  }
}

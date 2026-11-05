import type { Vector2 } from '@pochi/shared';
import type { LandingMarker } from '../render/worldFrame';

const FADE_MS = 600;

/** Nube's "Plan del paseo": landing spots that stay visible for a few seconds. */
export class LandingMarkers {
  private spots: Vector2[] = [];
  private visibleUntilMs = 0;

  show(spots: Vector2[], durationMs: number, nowMs: number): void {
    this.spots = spots;
    this.visibleUntilMs = nowMs + durationMs;
  }

  current(nowMs: number): LandingMarker[] {
    const remaining = this.visibleUntilMs - nowMs;
    if (remaining <= 0) return [];
    const opacity = Math.min(1, remaining / FADE_MS);
    return this.spots.map((spot) => ({ x: spot.x, y: spot.y, opacity }));
  }
}

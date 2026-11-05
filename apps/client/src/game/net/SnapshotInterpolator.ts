export interface Placement {
  x: number;
  y: number;
  height: number;
}

interface Snapshot extends Placement {
  timeMs: number;
}

const BUFFER_SIZE = 12;
/** Render remote things this far in the past, so there are two snapshots to blend. */
export const INTERPOLATION_DELAY_MS = 100;

/**
 * Smooths what the server sends: the other duck and the fruits are drawn
 * between the last two updates instead of jumping 20 times per second.
 */
export class SnapshotInterpolator {
  private readonly buffers = new Map<string, Snapshot[]>();

  /** Stores where something was when a server patch arrived. */
  push(id: string, placement: Placement, timeMs: number): void {
    const buffer = this.buffers.get(id) ?? [];
    buffer.push({ ...placement, timeMs });
    if (buffer.length > BUFFER_SIZE) buffer.shift();
    this.buffers.set(id, buffer);
  }

  sample(id: string, renderTimeMs: number): Placement | undefined {
    const buffer = this.buffers.get(id);
    if (!buffer || buffer.length === 0) return undefined;

    for (let index = buffer.length - 1; index > 0; index -= 1) {
      const newer = buffer[index]!;
      const older = buffer[index - 1]!;
      if (older.timeMs <= renderTimeMs && renderTimeMs <= newer.timeMs) {
        const span = Math.max(1, newer.timeMs - older.timeMs);
        const progress = (renderTimeMs - older.timeMs) / span;
        return {
          x: older.x + (newer.x - older.x) * progress,
          y: older.y + (newer.y - older.y) * progress,
          height: older.height + (newer.height - older.height) * progress,
        };
      }
    }
    const newest = buffer[buffer.length - 1]!;
    return renderTimeMs > newest.timeMs ? newest : buffer[0];
  }

  /** Forgets ids that are no longer in the state. */
  retain(liveIds: Set<string>): void {
    for (const id of this.buffers.keys()) {
      if (!liveIds.has(id)) this.buffers.delete(id);
    }
  }
}

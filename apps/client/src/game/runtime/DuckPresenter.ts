import type { MapDefinition, PlayerView } from '@pochi/shared';
import type { DuckDirection } from '../../art/ducks/duckPose';
import type { DuckActorHandle } from '../actors/DuckActor';
import { depthScale } from '../render/projection';

const TALK_DURATION_MS = 700;
const WALK_SPEED_THRESHOLD = 0.04; // px per ms

interface DuckMemory {
  lastX: number;
  lastY: number;
  direction: DuckDirection;
  talkUntilMs: number;
}

export interface DuckPlacement {
  player: PlayerView;
  x: number;
  y: number;
  height: number;
}

/** Turns positions into what the player sees: pose, facing direction, glow and dizziness. */
export class DuckPresenter {
  private readonly memory = new Map<string, DuckMemory>();

  startTalking(sessionId: string, nowMs: number): void {
    const memory = this.memory.get(sessionId);
    if (memory) memory.talkUntilMs = nowMs + TALK_DURATION_MS;
  }

  present(
    actor: DuckActorHandle,
    placement: DuckPlacement,
    map: MapDefinition,
    nowMs: number,
    deltaMs: number,
    matchTimeMs: number,
  ): number {
    const { player, x, y, height } = placement;
    const memory = this.rememberedFor(player, x, y);
    const speed = Math.hypot(x - memory.lastX, y - memory.lastY) / Math.max(1, deltaMs);
    if (x - memory.lastX > 0.3) memory.direction = 'right';
    else if (x - memory.lastX < -0.3) memory.direction = 'left';
    memory.lastX = x;
    memory.lastY = y;

    const scale = depthScale(y, map.playfield);
    actor.place(x, y, height, scale);
    actor.setLook({
      pose: height > 2 ? 'jump' : nowMs < memory.talkUntilMs ? 'talk' : speed > WALK_SPEED_THRESHOLD ? 'walk' : 'idle',
      direction: memory.direction,
      isGlowing: matchTimeMs < player.affectionBoostUntilMs,
      isDizzy: matchTimeMs < player.dizzyUntilMs || matchTimeMs < player.stunnedUntilMs,
    });
    return scale;
  }

  private rememberedFor(player: PlayerView, x: number, y: number): DuckMemory {
    let memory = this.memory.get(player.sessionId);
    if (!memory) {
      memory = { lastX: x, lastY: y, direction: player.duckId === 'nube' ? 'left' : 'right', talkUntilMs: 0 };
      this.memory.set(player.sessionId, memory);
    }
    return memory;
  }
}

import { JUMP_DURATION_MS, jumpHeightAt, stepDuckPosition } from '@pochi/shared';
import { speedFactorFor } from '../DuckModifiers';
import { matchTimeOf, playersOf, type MatchContext } from '../MatchContext';
import type { MatchSystem } from '../MatchSystem';

/** Moves every duck with its last input and updates the height of its jump. */
export class DuckMovementSystem implements MatchSystem {
  update(context: MatchContext, deltaMs: number): void {
    const now = matchTimeOf(context);

    for (const player of playersOf(context)) {
      const next = stepDuckPosition(player, player.input, deltaMs, speedFactorFor(context, player), context.map);
      player.x = next.x;
      player.y = next.y;

      const sinceJump = now - player.jumpStartedAtMs;
      const isJumping = player.jumpStartedAtMs >= 0 && sinceJump <= JUMP_DURATION_MS;
      player.height = isJumping ? jumpHeightAt(sinceJump) : 0;
      if (!isJumping) player.jumpStartedAtMs = -1;
    }
  }
}

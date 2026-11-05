import { DUCK_PROFILES, isInsideEllipse, PUDDLE_IMMUNITY_MS, PUDDLE_STUN_DURATION_MS, SERVER_EVENTS } from '@pochi/shared';
import type { PlayerState } from '../../rooms/schema/PlayerState';
import type { PuddleState } from '../../rooms/schema/WorldEntities';
import { matchTimeOf, playersOf, type MatchContext } from '../MatchContext';
import type { MatchSystem } from '../MatchSystem';

/**
 * Charcos: Pochi falls on his belly and stays still for a second,
 * Nube hops and walks at half speed (the speed part lives in DuckModifiers).
 */
export class PuddleSystem implements MatchSystem {
  update(context: MatchContext): void {
    for (const player of playersOf(context)) {
      const puddle = player.height > 4 ? undefined : this.findPuddleUnder(context, player);
      const wasInPuddle = player.inPuddle;
      player.inPuddle = puddle !== undefined;

      if (puddle && !wasInPuddle) this.reactToPuddle(context, player, puddle);
    }
  }

  private findPuddleUnder(context: MatchContext, player: PlayerState): PuddleState | undefined {
    for (const puddle of context.state.puddles.values()) {
      const ellipse = { cx: puddle.x, cy: puddle.y, rx: puddle.radiusX, ry: puddle.radiusY };
      if (isInsideEllipse(player, ellipse)) return puddle;
    }
    return undefined;
  }

  private reactToPuddle(context: MatchContext, player: PlayerState, puddle: PuddleState): void {
    const now = matchTimeOf(context);
    if (now < player.puddleImmuneUntilMs) return;

    if (DUCK_PROFILES[player.duckId].puddleReaction === 'bellyFlop') {
      player.stunnedUntilMs = now + PUDDLE_STUN_DURATION_MS;
    }
    player.puddleImmuneUntilMs = now + PUDDLE_STUN_DURATION_MS + PUDDLE_IMMUNITY_MS;
    context.events.broadcast(SERVER_EVENTS.puddleSplash, {
      sessionId: player.sessionId,
      duckId: player.duckId,
      isCold: puddle.isCold,
    });
  }
}

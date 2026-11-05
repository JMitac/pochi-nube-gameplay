import { AFFECTION_BOOST_DURATION_MS, AFFECTION_MAX, SERVER_EVENTS } from '@pochi/shared';
import type { PlayerState } from '../../rooms/schema/PlayerState';
import { matchTimeOf, playersOf, type MatchContext } from '../MatchContext';

/**
 * Barra de cariño. In cooperative mode the bar is shared by both ducks;
 * in versus and solo each duck fills its own.
 */
export class AffectionMeter {
  add(context: MatchContext, player: PlayerState, amount: number): void {
    const owners = context.state.mode === 'coop' ? playersOf(context) : [player];
    const reachedMax = owners.some((owner) => owner.affection + amount >= AFFECTION_MAX);

    for (const owner of owners) {
      owner.affection = Math.min(AFFECTION_MAX, owner.affection + amount);
    }
    if (reachedMax) this.release(context, owners);
  }

  private release(context: MatchContext, owners: PlayerState[]): void {
    const boostUntil = matchTimeOf(context) + AFFECTION_BOOST_DURATION_MS;
    for (const owner of owners) {
      owner.affection = 0;
      owner.affectionBoostUntilMs = boostUntil;
      context.events.broadcast(SERVER_EVENTS.affectionFull, { sessionId: owner.sessionId, duckId: owner.duckId });
    }
  }
}

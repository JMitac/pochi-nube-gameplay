import { DECOY_DURATION_MS, SNACK_BOOST_DURATION_MS } from '@pochi/shared';
import type { PlayerState } from '../../rooms/schema/PlayerState';
import { DecoyState } from '../../rooms/schema/WorldEntities';
import { matchTimeOf, partnerOf, type MatchContext } from '../MatchContext';
import type { DuckAbility } from './DuckAbility';

/**
 * Pochi · Snack compartido.
 * Cooperative: Nube runs faster for 4 s. Versus: leaves a bread that distracts the rival.
 * Solo: Pochi eats the snack himself and runs faster.
 */
export class SharedSnackAbility implements DuckAbility {
  readonly id = 'sharedSnack' as const;

  activate(context: MatchContext, player: PlayerState): void {
    if (context.state.mode === 'versus') {
      this.dropDecoy(context, player);
      return;
    }
    const target = context.state.mode === 'coop' ? (partnerOf(context, player) ?? player) : player;
    target.speedBoostUntilMs = matchTimeOf(context) + SNACK_BOOST_DURATION_MS;
  }

  private dropDecoy(context: MatchContext, player: PlayerState): void {
    const decoy = new DecoyState();
    decoy.id = context.ids.next('decoy');
    decoy.x = player.x;
    decoy.y = player.y;
    decoy.ownerSessionId = player.sessionId;
    decoy.expiresAtMs = matchTimeOf(context) + DECOY_DURATION_MS;
    context.state.decoys.set(decoy.id, decoy);
  }
}

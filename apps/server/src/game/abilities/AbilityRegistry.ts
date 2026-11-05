import { ABILITY_COOLDOWN_MS, DUCK_PROFILES, SERVER_EVENTS, type AbilityId } from '@pochi/shared';
import type { PlayerState } from '../../rooms/schema/PlayerState';
import { isStunned } from '../DuckModifiers';
import { matchTimeOf, type MatchContext } from '../MatchContext';
import type { DuckAbility } from './DuckAbility';

/** Looks up the ability of each duck and enforces the shared 15 s cooldown. */
export class AbilityRegistry {
  private readonly abilities = new Map<AbilityId, DuckAbility>();

  constructor(abilities: DuckAbility[]) {
    for (const ability of abilities) this.abilities.set(ability.id, ability);
  }

  tryActivate(context: MatchContext, player: PlayerState): boolean {
    const now = matchTimeOf(context);
    if (now < player.abilityReadyAtMs || isStunned(context, player)) return false;

    const ability = this.abilities.get(DUCK_PROFILES[player.duckId].abilityId);
    if (!ability) return false;

    ability.activate(context, player);
    player.abilityReadyAtMs = now + ABILITY_COOLDOWN_MS;
    context.events.broadcast(SERVER_EVENTS.abilityUsed, { sessionId: player.sessionId, duckId: player.duckId });
    return true;
  }
}

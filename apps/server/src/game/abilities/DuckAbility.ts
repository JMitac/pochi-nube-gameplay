import type { AbilityId } from '@pochi/shared';
import type { PlayerState } from '../../rooms/schema/PlayerState';
import type { MatchContext } from '../MatchContext';

/** Each duck ability is its own class, so adding a new one never touches the others. */
export interface DuckAbility {
  readonly id: AbilityId;
  activate(context: MatchContext, player: PlayerState): void;
}

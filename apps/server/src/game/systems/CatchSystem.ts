import { CATCH_REACH_HEIGHT, distance } from '@pochi/shared';
import type { PlayerState } from '../../rooms/schema/PlayerState';
import type { FoodState } from '../../rooms/schema/WorldEntities';
import { catchRadiusFor, isStunned } from '../DuckModifiers';
import { playersOf, type MatchContext } from '../MatchContext';
import type { MatchSystem } from '../MatchSystem';
import type { ScoreKeeper } from '../score/ScoreKeeper';

/** Finds which duck (if any) is under each food, low enough to catch it. */
export class CatchSystem implements MatchSystem {
  constructor(private readonly scoreKeeper: ScoreKeeper) {}

  update(context: MatchContext): void {
    const players = playersOf(context);
    for (const food of Array.from(context.state.foods.values())) {
      const catcher = this.findCatcher(context, players, food);
      if (!catcher) continue;
      context.state.foods.delete(food.id);
      this.scoreKeeper.awardCatch(context, catcher, food);
    }
  }

  private findCatcher(context: MatchContext, players: PlayerState[], food: FoodState): PlayerState | undefined {
    let closest: PlayerState | undefined;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const player of players) {
      if (!this.canReach(context, player, food)) continue;
      const gap = distance(player, food);
      if (gap < closestDistance) {
        closest = player;
        closestDistance = gap;
      }
    }
    return closest;
  }

  private canReach(context: MatchContext, player: PlayerState, food: FoodState): boolean {
    if (isStunned(context, player)) return false;
    const isLowEnough = food.height <= CATCH_REACH_HEIGHT + player.height;
    return isLowEnough && distance(player, food) <= catchRadiusFor(context, player);
  }
}

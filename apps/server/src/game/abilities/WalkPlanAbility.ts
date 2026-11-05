import { SERVER_EVENTS, WALK_PLAN_DURATION_MS, WALK_PLAN_FOOD_COUNT } from '@pochi/shared';
import type { PlayerState } from '../../rooms/schema/PlayerState';
import type { FoodSpawnPlanner } from '../food/FoodSpawnPlanner';
import { playersOf, type MatchContext } from '../MatchContext';
import type { DuckAbility } from './DuckAbility';

/**
 * Nube · Plan del paseo: shows where the next 5 fruits will land for 5 s.
 * In cooperative mode both ducks see it; in versus only Nube does.
 */
export class WalkPlanAbility implements DuckAbility {
  readonly id = 'walkPlan' as const;

  constructor(private readonly planner: FoodSpawnPlanner) {}

  activate(context: MatchContext, player: PlayerState): void {
    const spots = this.planner
      .peekUpcoming(context, WALK_PLAN_FOOD_COUNT)
      .map((planned) => ({ x: planned.landing.x, y: planned.landing.y }));
    const payload = { spots, durationMs: WALK_PLAN_DURATION_MS };
    const viewers = context.state.mode === 'coop' ? playersOf(context) : [player];

    for (const viewer of viewers) {
      context.events.sendTo(viewer.sessionId, SERVER_EVENTS.walkPlanRevealed, payload);
    }
  }
}

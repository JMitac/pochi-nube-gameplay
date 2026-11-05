import { FOOD_START_HEIGHT, resolvePhase } from '@pochi/shared';
import { FoodState } from '../../rooms/schema/WorldEntities';
import type { FoodSpawnPlanner, PlannedFood } from '../food/FoodSpawnPlanner';
import { matchTimeOf, type MatchContext } from '../MatchContext';
import type { MatchSystem } from '../MatchSystem';

/** Turns the planned foods into falling foods in the synchronized state. */
export class FoodSpawnSystem implements MatchSystem {
  constructor(private readonly planner: FoodSpawnPlanner) {}

  update(context: MatchContext): void {
    const now = matchTimeOf(context);
    for (const planned of this.planner.takeDue(context, now)) {
      this.spawn(context, planned, now);
    }
  }

  private spawn(context: MatchContext, planned: PlannedFood, now: number): void {
    const food = new FoodState();
    food.id = context.ids.next('food');
    food.kind = planned.kind;
    food.x = planned.landing.x;
    food.y = planned.landing.y;
    food.height = FOOD_START_HEIGHT;
    food.fallProgress = 0;
    food.stage = 'falling';
    food.stageStartedAtMs = now;
    food.fallDurationMs = resolvePhase(now).fallDurationMs;
    context.state.foods.set(food.id, food);
  }
}

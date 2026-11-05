import {
  BOUNCE_DRIFT_PX,
  BOUNCE_DURATION_MS,
  BOUNCE_HEIGHT,
  clamp,
  FOOD_RULES,
  FOOD_START_HEIGHT,
  ROLL_DURATION_MS,
  ROLL_SPEED,
  SERVER_EVENTS,
} from '@pochi/shared';
import type { FoodState } from '../../rooms/schema/WorldEntities';
import { matchTimeOf, type MatchContext } from '../MatchContext';
import type { MatchSystem } from '../MatchSystem';

/**
 * Moves the foods: they fall faster and faster, peaches bounce once,
 * orchard fruit rolls down the slope, and anything left on the grass is lost.
 */
export class FoodPhysicsSystem implements MatchSystem {
  update(context: MatchContext): void {
    const now = matchTimeOf(context);
    for (const food of context.state.foods.values()) {
      const elapsed = now - food.stageStartedAtMs;
      if (food.stage === 'falling') this.updateFalling(context, food, elapsed, now);
      else if (food.stage === 'bouncing') this.updateBouncing(context, food, elapsed, now);
      else this.updateRolling(context, food, elapsed);
    }
  }

  private updateFalling(context: MatchContext, food: FoodState, elapsed: number, now: number): void {
    const progress = clamp(elapsed / food.fallDurationMs, 0, 1);
    food.fallProgress = progress;
    food.height = FOOD_START_HEIGHT * (1 - progress * progress);
    if (progress >= 1) this.touchGrass(context, food, now);
  }

  private updateBouncing(context: MatchContext, food: FoodState, elapsed: number, now: number): void {
    const progress = clamp(elapsed / BOUNCE_DURATION_MS, 0, 1);
    food.height = 4 * BOUNCE_HEIGHT * progress * (1 - progress);
    food.x = clamp(food.stageStartX + food.driftX * progress, context.map.playfield.minX, context.map.playfield.maxX);
    if (progress >= 1) this.touchGrass(context, food, now);
  }

  private updateRolling(context: MatchContext, food: FoodState, elapsed: number): void {
    const direction = context.map.slope?.rollDirection ?? 0;
    const travelled = (ROLL_SPEED * Math.min(elapsed, ROLL_DURATION_MS)) / 1000;
    food.height = 0;
    food.x = clamp(food.stageStartX + direction * travelled, context.map.playfield.minX, context.map.playfield.maxX);
    if (elapsed >= ROLL_DURATION_MS) this.loseFood(context, food);
  }

  private touchGrass(context: MatchContext, food: FoodState, now: number): void {
    food.height = 0;
    food.stageStartedAtMs = now;
    food.stageStartX = food.x;

    if (FOOD_RULES[food.kind].bouncesOnce && !food.hasBounced) {
      food.hasBounced = true;
      food.stage = 'bouncing';
      food.driftX = (context.random.next() < 0.5 ? -1 : 1) * BOUNCE_DRIFT_PX;
      return;
    }
    if (context.map.slope && food.stage !== 'rolling') {
      food.stage = 'rolling';
      return;
    }
    this.loseFood(context, food);
  }

  private loseFood(context: MatchContext, food: FoodState): void {
    context.state.foods.delete(food.id);
    if (food.kind === 'rottenApple') return;
    context.events.broadcast(SERVER_EVENTS.foodLost, { foodId: food.id, position: { x: food.x, y: food.y } });
  }
}

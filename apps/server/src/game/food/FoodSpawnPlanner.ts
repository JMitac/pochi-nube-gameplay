import { resolvePhase, WALK_PLAN_FOOD_COUNT, type FoodKind, type Vector2 } from '@pochi/shared';
import type { MatchContext } from '../MatchContext';
import type { ResettableSystem } from '../MatchSystem';
import { pickFoodKind } from './FoodKindPicker';
import { pickLandingSpot, pickSpotsUnderTree } from './LandingSpotPicker';

export interface PlannedFood {
  kind: FoodKind;
  landing: Vector2;
  spawnAtMs: number;
}

const TREE_SHAKE_CHANCE = 0.3;
const TREE_SHAKE_FRUITS = 3;
const MIN_PLANNED_AHEAD = WALK_PLAN_FOOD_COUNT + 3;

/**
 * Decides in advance what falls and where. Planning ahead is what lets
 * Nube's "Plan del paseo" show the next fruits before they have a shadow.
 */
export class FoodSpawnPlanner implements ResettableSystem {
  private queue: PlannedFood[] = [];
  private nextSpawnAtMs = 0;

  reset(): void {
    this.queue = [];
    this.nextSpawnAtMs = 0;
  }

  /** Removes and returns every planned food whose time has come. */
  takeDue(context: MatchContext, nowMs: number): PlannedFood[] {
    this.fillAhead(context);
    const due = this.queue.filter((planned) => planned.spawnAtMs <= nowMs);
    this.queue = this.queue.filter((planned) => planned.spawnAtMs > nowMs);
    return due;
  }

  peekUpcoming(context: MatchContext, count: number): PlannedFood[] {
    this.fillAhead(context);
    return this.queue.slice(0, count);
  }

  private fillAhead(context: MatchContext): void {
    while (this.queue.length < MIN_PLANNED_AHEAD) {
      this.planNextDrop(context);
    }
  }

  private planNextDrop(context: MatchContext): void {
    const phase = resolvePhase(this.nextSpawnAtMs);
    const spawnAtMs = this.nextSpawnAtMs;
    const shakesTree = context.map.shakingTreesX.length > 0 && context.random.next() < TREE_SHAKE_CHANCE;
    const spots = shakesTree
      ? pickSpotsUnderTree(context.map, context.random, TREE_SHAKE_FRUITS)
      : [pickLandingSpot(context.map, context.random)];

    for (const landing of spots) {
      this.queue.push({ kind: pickFoodKind(context.random, phase.rottenChance), landing, spawnAtMs });
    }
    this.nextSpawnAtMs += phase.spawnIntervalMs * (shakesTree ? 1.8 : 1);
  }
}

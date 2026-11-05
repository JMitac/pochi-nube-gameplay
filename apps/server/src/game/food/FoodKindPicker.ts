import { FOOD_KINDS, FOOD_RULES, type FoodKind } from '@pochi/shared';
import type { RandomSource } from '../MatchContext';

const GOOD_FOODS = FOOD_KINDS.filter((kind) => FOOD_RULES[kind].spawnWeight > 0);
const TOTAL_WEIGHT = GOOD_FOODS.reduce((sum, kind) => sum + FOOD_RULES[kind].spawnWeight, 0);

/** Chooses which food falls next, using the weights from the shared rules. */
export function pickFoodKind(random: RandomSource, rottenChance: number): FoodKind {
  if (random.next() < rottenChance) return 'rottenApple';

  let ticket = random.next() * TOTAL_WEIGHT;
  for (const kind of GOOD_FOODS) {
    ticket -= FOOD_RULES[kind].spawnWeight;
    if (ticket <= 0) return kind;
  }
  return 'pear';
}

import {
  AFFECTION_BREAD_GAIN,
  AFFECTION_COMBO_GAIN,
  calculateCatchPoints,
  COMBO_SIZE,
  COMBO_WINDOW_MS,
  DIZZY_DURATION_MS,
  distance,
  FOOD_RULES,
  isFavoriteFood,
  resolvePhase,
  SERVER_EVENTS,
  TOGETHER_DISTANCE,
} from '@pochi/shared';
import type { PlayerState } from '../../rooms/schema/PlayerState';
import type { FoodState } from '../../rooms/schema/WorldEntities';
import { matchTimeOf, partnerOf, type MatchContext } from '../MatchContext';
import { AffectionMeter } from './AffectionMeter';

/** Everything that happens when a duck catches a food: points, effects and combos. */
export class ScoreKeeper {
  constructor(private readonly affection = new AffectionMeter()) {}

  awardCatch(context: MatchContext, player: PlayerState, food: FoodState): void {
    const isTogether = this.isTogether(context, player);
    const points = calculateCatchPoints({
      foodKind: food.kind,
      duckId: player.duckId,
      phaseMultiplier: resolvePhase(matchTimeOf(context)).pointsMultiplier,
      isTogether,
    });

    this.addPoints(context, player, points);
    player.catches.set(food.kind, (player.catches.get(food.kind) ?? 0) + 1);
    this.applyFoodEffect(context, player, food);

    context.events.broadcast(SERVER_EVENTS.foodCaught, {
      foodId: food.id,
      foodKind: food.kind,
      sessionId: player.sessionId,
      duckId: player.duckId,
      points,
      isFavorite: isFavoriteFood(player.duckId, food.kind),
      isTogether,
      position: { x: food.x, y: food.y },
    });
  }

  /** Moves points between ducks (versus flap). Returns how many were stolen. */
  stealPoints(context: MatchContext, thief: PlayerState, victim: PlayerState): number {
    const stolen = Math.min(victim.score, Math.max(0, victim.lastCatchPoints));
    if (stolen <= 0) return 0;
    this.addPoints(context, victim, -stolen);
    this.addPoints(context, thief, stolen);
    victim.lastCatchPoints = 0;
    return stolen;
  }

  private addPoints(context: MatchContext, player: PlayerState, points: number): void {
    player.score = Math.max(0, player.score + points);
    player.lastCatchPoints = points;
    context.state.teamScore = Math.max(0, context.state.teamScore + points);
  }

  private isTogether(context: MatchContext, player: PlayerState): boolean {
    if (context.state.mode !== 'coop') return false;
    const partner = partnerOf(context, player);
    return partner !== undefined && distance(player, partner) < TOGETHER_DISTANCE;
  }

  private applyFoodEffect(context: MatchContext, player: PlayerState, food: FoodState): void {
    const effect = FOOD_RULES[food.kind].effect;
    if (effect === 'dizzy') {
      player.dizzyUntilMs = matchTimeOf(context) + DIZZY_DURATION_MS;
      player.recentCatchTimesMs = [];
      return;
    }
    if (effect === 'affection') this.affection.add(context, player, AFFECTION_BREAD_GAIN);
    this.trackCombo(context, player);
  }

  private trackCombo(context: MatchContext, player: PlayerState): void {
    const now = matchTimeOf(context);
    player.recentCatchTimesMs = [...player.recentCatchTimesMs, now].filter((time) => now - time <= COMBO_WINDOW_MS);
    if (player.recentCatchTimesMs.length < COMBO_SIZE) return;

    player.recentCatchTimesMs = [];
    context.events.broadcast(SERVER_EVENTS.comboTriggered, { sessionId: player.sessionId, duckId: player.duckId });
    this.affection.add(context, player, AFFECTION_COMBO_GAIN);
  }
}

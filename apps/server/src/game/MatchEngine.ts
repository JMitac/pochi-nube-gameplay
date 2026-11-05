import { clamp, SERVER_EVENTS, type MovePayload } from '@pochi/shared';
import { AbilityRegistry } from './abilities/AbilityRegistry';
import { SharedSnackAbility } from './abilities/SharedSnackAbility';
import { WalkPlanAbility } from './abilities/WalkPlanAbility';
import { isStunned } from './DuckModifiers';
import { FlapAction } from './FlapAction';
import { FoodSpawnPlanner } from './food/FoodSpawnPlanner';
import { MatchClock } from './MatchClock';
import { matchTimeOf, type MatchContext } from './MatchContext';
import type { MatchSystem } from './MatchSystem';
import { ScoreKeeper } from './score/ScoreKeeper';
import { CatchSystem } from './systems/CatchSystem';
import { DecoySystem } from './systems/DecoySystem';
import { DuckMovementSystem } from './systems/DuckMovementSystem';
import { FoodPhysicsSystem } from './systems/FoodPhysicsSystem';
import { FoodSpawnSystem } from './systems/FoodSpawnSystem';
import { PuddleSystem } from './systems/PuddleSystem';
import { RainCloudSystem } from './systems/RainCloudSystem';
import { WorldReset } from './WorldReset';

/**
 * Runs the match. It only wires the systems together in the right order;
 * each rule lives in its own system.
 */
export class MatchEngine {
  private readonly clock = new MatchClock();
  private readonly worldReset = new WorldReset();
  private readonly planner = new FoodSpawnPlanner();
  private readonly scoreKeeper = new ScoreKeeper();
  private readonly abilities = new AbilityRegistry([new SharedSnackAbility(), new WalkPlanAbility(this.planner)]);
  private readonly flap = new FlapAction(this.scoreKeeper);
  private readonly systems: MatchSystem[] = [
    new DuckMovementSystem(),
    new PuddleSystem(),
    new DecoySystem(),
    new RainCloudSystem(),
    new FoodSpawnSystem(this.planner),
    new FoodPhysicsSystem(),
    new CatchSystem(this.scoreKeeper),
  ];

  constructor(private readonly context: MatchContext) {}

  startCountdown(): void {
    this.planner.reset();
    this.worldReset.reset(this.context);
    this.clock.startCountdown(this.context);
  }

  update(deltaMs: number): void {
    const result = this.clock.tick(this.context, deltaMs);
    if (result !== 'simulate') return;
    for (const system of this.systems) system.update(this.context, deltaMs);
  }

  togglePause(): void {
    if (this.context.state.status === 'playing') this.context.state.isPaused = !this.context.state.isPaused;
  }

  // ---- Player commands ----

  move(sessionId: string, payload: MovePayload): void {
    const player = this.context.state.players.get(sessionId);
    if (!player) return;
    player.input = { x: clamp(Number(payload?.x) || 0, -1, 1), y: clamp(Number(payload?.y) || 0, -1, 1) };
  }

  jump(sessionId: string): void {
    const player = this.context.state.players.get(sessionId);
    if (!player || !this.isRunning() || isStunned(this.context, player) || player.jumpStartedAtMs >= 0) return;
    player.jumpStartedAtMs = matchTimeOf(this.context);
    this.context.events.broadcast(SERVER_EVENTS.jumped, { sessionId, duckId: player.duckId });
    this.flap.tryFlap(this.context, player);
  }

  useAbility(sessionId: string): void {
    const player = this.context.state.players.get(sessionId);
    if (player && this.isRunning()) this.abilities.tryActivate(this.context, player);
  }

  private isRunning(): boolean {
    return this.context.state.status === 'playing' && !this.context.state.isPaused;
  }
}

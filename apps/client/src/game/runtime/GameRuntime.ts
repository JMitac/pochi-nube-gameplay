import {
  MAP_DEFINITIONS,
  NO_MOVEMENT,
  SERVER_EVENTS,
  TOGETHER_DISTANCE,
  distance,
  type DecoyView,
  type MapDefinition,
  type MovementInput,
  type PicnicStateView,
  type PlayerView,
  type PuddleView,
} from '@pochi/shared';
import { audioEngine } from '../../audio/audioInstance';
import type { RoomSession } from '../../network/RoomSession';
import type { HudSnapshot } from '../../state/hudStore';
import type { DuckActorHandle } from '../actors/DuckActor';
import type { GameAction, InputState } from '../input/InputState';
import { LocalDuckPredictor } from '../net/LocalDuckPredictor';
import { MatchClockEstimator } from '../net/MatchClockEstimator';
import { MovementSender } from '../net/MovementSender';
import { INTERPOLATION_DELAY_MS, SnapshotInterpolator } from '../net/SnapshotInterpolator';
import { GroundLayer } from '../render/GroundLayer';
import { DUCK_FEET_Y } from '../render/projection';
import { SkyLayer } from '../render/SkyLayer';
import { SpriteTextureCache } from '../render/SpriteTextureCache';
import type { AirborneDuckShadow, FoodPlacement, WorldFrame } from '../render/worldFrame';
import { DuckPresenter, type DuckPlacement } from './DuckPresenter';
import { HudPresenter } from './HudPresenter';
import { LandingMarkers } from './LandingMarkers';
import { LocalJump } from './LocalJump';

export interface GameRuntimeOptions {
  session: RoomSession;
  input: InputState;
  groundCanvas: HTMLCanvasElement;
  skyCanvas: HTMLCanvasElement;
  pixelRatio: number;
  antialias: boolean;
  findDuckActor(sessionId: string): DuckActorHandle | undefined;
  placeTogetherBadge(position: { x: number; y: number } | null): void;
  publishHud(snapshot: HudSnapshot): void;
}

const MAX_FRAME_MS = 100;

/** Everything one frame needs, computed once and handed to each step. */
interface FrameContext {
  state: PicnicStateView;
  mySessionId: string;
  map: MapDefinition;
  decoys: DecoyView[];
  movement: MovementInput;
  canPlay: boolean;
  matchTimeMs: number;
  nowMs: number;
  deltaMs: number;
}

/**
 * The game loop. Each frame it reads the input, predicts your duck, smooths
 * everything the server sent, places the ducks and draws the Three.js layers.
 * React only hears from it through the HUD snapshot a few times per second.
 */
export class GameRuntime {
  private readonly textures: SpriteTextureCache;
  private readonly ground: GroundLayer;
  private readonly sky: SkyLayer;
  private readonly interpolator = new SnapshotInterpolator();
  private readonly predictor = new LocalDuckPredictor();
  private readonly clock = new MatchClockEstimator();
  private readonly localJump = new LocalJump();
  private readonly landingMarkers = new LandingMarkers();
  private readonly ducks = new DuckPresenter();
  private readonly hud: HudPresenter;
  private readonly movementSender: MovementSender;
  private readonly cleanups: Array<() => void> = [];
  private frameRequest = 0;
  private lastFrameAtMs = 0;

  constructor(private readonly options: GameRuntimeOptions) {
    this.textures = new SpriteTextureCache(Math.min(2, options.pixelRatio * 1.5));
    this.ground = new GroundLayer(options.groundCanvas, options.pixelRatio, options.antialias, this.textures);
    this.sky = new SkyLayer(options.skyCanvas, options.pixelRatio, options.antialias, this.textures);
    this.hud = new HudPresenter(options.publishHud);
    this.movementSender = new MovementSender((movement) => options.session.move(movement));
  }

  start(): void {
    const { session } = this.options;
    this.cleanups.push(
      session.onPatch((state) => this.recordPatch(state)),
      session.on(SERVER_EVENTS.walkPlanRevealed, ({ spots, durationMs }) =>
        this.landingMarkers.show(spots, durationMs, performance.now()),
      ),
      session.on(SERVER_EVENTS.quacked, ({ sessionId }) => this.showQuack(sessionId)),
    );
    this.lastFrameAtMs = performance.now();
    this.frameRequest = requestAnimationFrame(this.frame);
  }

  stop(): void {
    cancelAnimationFrame(this.frameRequest);
    this.movementSender.stop();
    this.cleanups.forEach((cleanup) => cleanup());
    this.ground.dispose();
    this.sky.dispose();
    this.textures.dispose();
  }

  setPixelRatio(pixelRatio: number): void {
    this.ground.setPixelRatio(pixelRatio);
    this.sky.setPixelRatio(pixelRatio);
  }

  private readonly frame = (nowMs: number): void => {
    this.frameRequest = requestAnimationFrame(this.frame);
    const deltaMs = Math.min(MAX_FRAME_MS, nowMs - this.lastFrameAtMs);
    this.lastFrameAtMs = nowMs;

    const state = this.options.session.state;
    const mySessionId = this.options.session.sessionId;
    if (!state || !mySessionId) return;

    this.clock.observe(state, nowMs);
    const matchTimeMs = this.clock.estimate(state, nowMs);
    const canPlay = state.status === 'playing' && !state.isPaused;

    this.handleActions(this.options.input.drainActions(), canPlay, nowMs);
    const movement = canPlay ? this.options.input.movement : NO_MOVEMENT;
    this.movementSender.update(movement, nowMs);

    const context: FrameContext = {
      state,
      mySessionId,
      map: MAP_DEFINITIONS[state.mapId],
      decoys: collect<DecoyView>(state.decoys),
      movement,
      canPlay,
      matchTimeMs,
      nowMs,
      deltaMs,
    };
    const placements = this.placeDucks(context);
    const frame = this.buildWorldFrame(context, placements);
    this.ground.draw(frame);
    this.sky.draw(frame);
    this.hud.update(state, mySessionId, matchTimeMs, nowMs);
  };

  private handleActions(actions: GameAction[], canPlay: boolean, nowMs: number): void {
    const { session } = this.options;
    for (const action of actions) {
      if (action === 'quack') {
        session.quack();
        continue;
      }
      if (!canPlay) continue;
      if (action === 'jump' && this.localJump.tryStart(nowMs)) {
        audioEngine.playEffect('jump');
        session.jump();
      }
      if (action === 'ability') session.useAbility();
    }
  }

  private recordPatch(state: PicnicStateView): void {
    const nowMs = performance.now();
    const liveIds = new Set<string>();
    state.players.forEach((player) => {
      liveIds.add(player.sessionId);
      this.interpolator.push(player.sessionId, player, nowMs);
    });
    state.foods.forEach((food) => {
      liveIds.add(food.id);
      this.interpolator.push(food.id, food, nowMs);
    });
    this.interpolator.retain(liveIds);
  }

  private placeDucks(context: FrameContext): DuckPlacement[] {
    const placements: DuckPlacement[] = [];
    context.state.players.forEach((player) => {
      const placement =
        player.sessionId === context.mySessionId ? this.placeMyDuck(player, context) : this.placeRemoteDuck(player, context);
      placements.push(placement);
      const actor = this.options.findDuckActor(player.sessionId);
      if (actor) this.ducks.present(actor, placement, context.map, context.nowMs, context.deltaMs, context.matchTimeMs);
    });
    this.updateTogetherBadge(context.state, placements);
    return placements;
  }

  private placeMyDuck(player: PlayerView, context: FrameContext): DuckPlacement {
    const position = this.predictor.update(
      player,
      context.decoys,
      context.movement,
      context.deltaMs,
      context.matchTimeMs,
      context.map,
      context.canPlay,
    );
    return { player, x: position.x, y: position.y, height: Math.max(this.localJump.heightAt(context.nowMs), player.height) };
  }

  private placeRemoteDuck(player: PlayerView, context: FrameContext): DuckPlacement {
    const sampled = this.interpolator.sample(player.sessionId, context.nowMs - INTERPOLATION_DELAY_MS) ?? player;
    return { player, x: sampled.x, y: sampled.y, height: sampled.height };
  }

  private updateTogetherBadge(state: PicnicStateView, placements: DuckPlacement[]): void {
    const [first, second] = placements;
    const together =
      state.mode === 'coop' && state.status === 'playing' && first && second && distance(first, second) < TOGETHER_DISTANCE;
    if (!together) {
      this.options.placeTogetherBadge(null);
      return;
    }
    this.options.placeTogetherBadge({
      x: (first.x + second.x) / 2,
      y: Math.min(first.y - first.height, second.y - second.height) - DUCK_FEET_Y - 20,
    });
  }

  private buildWorldFrame({ state, decoys, nowMs }: FrameContext, placements: DuckPlacement[]): WorldFrame {
    const renderTimeMs = nowMs - INTERPOLATION_DELAY_MS;
    const foods: FoodPlacement[] = [];
    state.foods.forEach((food) => {
      const sampled = this.interpolator.sample(food.id, renderTimeMs) ?? food;
      foods.push({
        id: food.id,
        kind: food.kind,
        x: sampled.x,
        y: sampled.y,
        height: sampled.height,
        fallProgress: food.fallProgress,
      });
    });

    const airborneDucks: AirborneDuckShadow[] = placements
      .filter((placement) => placement.height > 1)
      .map((placement) => ({
        id: placement.player.sessionId,
        x: placement.x,
        y: placement.y,
        height: placement.height,
        scale: 1,
      }));

    return {
      foods,
      puddles: collect<PuddleView>(state.puddles),
      clouds: collect(state.rainClouds).map((cloud) => ({ id: cloud.id, x: cloud.x, y: cloud.y })),
      decoys,
      landingMarkers: this.landingMarkers.current(nowMs),
      airborneDucks,
      timeMs: nowMs,
    };
  }

  private showQuack(sessionId: string): void {
    const player = this.options.session.state?.players.get(sessionId);
    if (player) audioEngine.playQuack(player.duckId);
    this.ducks.startTalking(sessionId, performance.now());
    this.options.findDuckActor(sessionId)?.sayQuack();
  }
}

function collect<T>(map: { forEach(callback: (value: T) => void): void }): T[] {
  const items: T[] = [];
  map.forEach((value) => items.push(value));
  return items;
}

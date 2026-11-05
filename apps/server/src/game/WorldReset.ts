import { SPAWN_POINTS } from '@pochi/shared';
import type { PlayerState } from '../rooms/schema/PlayerState';
import { PuddleState } from '../rooms/schema/WorldEntities';
import { playersOf, type MatchContext } from './MatchContext';

/** Leaves the map and the ducks ready for a fresh match. */
export class WorldReset {
  reset(context: MatchContext): void {
    const { state } = context;
    state.foods.clear();
    state.rainClouds.clear();
    state.decoys.clear();
    state.teamScore = 0;
    state.winnerSessionId = '';
    this.placeFixedPuddles(context);
    for (const player of playersOf(context)) this.resetPlayer(player);
  }

  private placeFixedPuddles(context: MatchContext): void {
    context.state.puddles.clear();
    for (const ellipse of context.map.fixedPuddles) {
      const puddle = new PuddleState();
      puddle.id = context.ids.next('puddle');
      puddle.x = ellipse.cx;
      puddle.y = ellipse.cy;
      puddle.radiusX = ellipse.rx;
      puddle.radiusY = ellipse.ry;
      puddle.isCold = context.map.coldWater;
      context.state.puddles.set(puddle.id, puddle);
    }
  }

  private resetPlayer(player: PlayerState): void {
    const spawn = SPAWN_POINTS[player.duckId];
    player.x = spawn.x;
    player.y = spawn.y;
    player.height = 0;
    player.score = 0;
    player.affection = 0;
    player.abilityReadyAtMs = 0;
    player.speedBoostUntilMs = 0;
    player.stunnedUntilMs = 0;
    player.dizzyUntilMs = 0;
    player.affectionBoostUntilMs = 0;
    player.inPuddle = false;
    player.catches.clear();
    player.input = { x: 0, y: 0 };
    player.jumpStartedAtMs = -1;
    player.puddleImmuneUntilMs = 0;
    player.recentCatchTimesMs = [];
    player.lastCatchPoints = 0;
    player.flapReadyAtMs = 0;
  }
}

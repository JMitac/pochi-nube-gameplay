import { resolvePhase } from '@pochi/shared';
import { PuddleState, RainCloudState } from '../../rooms/schema/WorldEntities';
import { matchTimeOf, randomBetween, type MatchContext } from '../MatchContext';
import type { MatchSystem } from '../MatchSystem';

const MAX_CLOUDS = 2;
const MAX_CLOUD_PUDDLES = 7;
const CLOUD_SPEED = 60;
const PUDDLE_DROP_INTERVAL_MS = 3_500;
const CLOUD_PUDDLE_RADIUS_X = 58;
const CLOUD_PUDDLE_RADIUS_Y = 16;
const OFFSCREEN_MARGIN = 160;

/** Rain clouds cross the map from the second phase on and leave new puddles. */
export class RainCloudSystem implements MatchSystem {
  update(context: MatchContext, deltaMs: number): void {
    if (resolvePhase(matchTimeOf(context)).hasRainClouds && context.state.rainClouds.size < MAX_CLOUDS) {
      this.spawnCloud(context);
    }

    for (const [id, cloud] of context.state.rainClouds.entries()) {
      cloud.x += (cloud.velocityX * deltaMs) / 1000;
      if (this.isOffscreen(context, cloud)) {
        context.state.rainClouds.delete(id);
        continue;
      }
      this.maybeDropPuddle(context, cloud);
    }
  }

  private spawnCloud(context: MatchContext): void {
    const { playfield } = context.map;
    const goesRight = context.random.next() < 0.5;
    const cloud = new RainCloudState();
    cloud.id = context.ids.next('cloud');
    cloud.x = goesRight ? playfield.minX - OFFSCREEN_MARGIN + 40 : playfield.maxX + OFFSCREEN_MARGIN - 40;
    cloud.y = randomBetween(context.random, playfield.minY + 20, playfield.maxY - 20);
    cloud.velocityX = goesRight ? CLOUD_SPEED : -CLOUD_SPEED;
    cloud.nextPuddleAtMs = matchTimeOf(context) + PUDDLE_DROP_INTERVAL_MS;
    context.state.rainClouds.set(cloud.id, cloud);
  }

  private isOffscreen(context: MatchContext, cloud: RainCloudState): boolean {
    const { playfield } = context.map;
    return cloud.x < playfield.minX - OFFSCREEN_MARGIN || cloud.x > playfield.maxX + OFFSCREEN_MARGIN;
  }

  private maybeDropPuddle(context: MatchContext, cloud: RainCloudState): void {
    const now = matchTimeOf(context);
    const { playfield } = context.map;
    const isOverGrass = cloud.x > playfield.minX && cloud.x < playfield.maxX;
    if (now < cloud.nextPuddleAtMs || !isOverGrass) return;

    cloud.nextPuddleAtMs = now + PUDDLE_DROP_INTERVAL_MS;
    this.removeOldestCloudPuddleIfFull(context);

    const puddle = new PuddleState();
    puddle.id = context.ids.next('puddle');
    puddle.x = cloud.x;
    puddle.y = cloud.y;
    puddle.radiusX = CLOUD_PUDDLE_RADIUS_X;
    puddle.radiusY = CLOUD_PUDDLE_RADIUS_Y;
    puddle.isCold = context.map.coldWater;
    puddle.isFromRainCloud = true;
    context.state.puddles.set(puddle.id, puddle);
  }

  private removeOldestCloudPuddleIfFull(context: MatchContext): void {
    const cloudPuddles = Array.from(context.state.puddles.entries()).filter(([, puddle]) => puddle.isFromRainCloud);
    if (cloudPuddles.length < MAX_CLOUD_PUDDLES) return;
    const [oldestId] = cloudPuddles[0]!;
    context.state.puddles.delete(oldestId);
  }
}

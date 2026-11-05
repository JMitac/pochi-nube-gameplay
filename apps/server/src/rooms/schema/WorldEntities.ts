import { Schema, type } from '@colyseus/schema';
import type { FoodKind } from '@pochi/shared';

export class FoodState extends Schema {
  @type('string') id = '';
  @type('string') kind: FoodKind = 'pear';
  @type('number') x = 0;
  @type('number') y = 0;
  @type('number') height = 0;
  /** 0 when it starts falling, 1 when it touches the grass. Drives the growing shadow. */
  @type('number') fallProgress = 0;

  // ---- Server only (not synchronized) ----
  stage: FoodStage = 'falling';
  stageStartedAtMs = 0;
  fallDurationMs = 0;
  hasBounced = false;
  driftX = 0;
  stageStartX = 0;
}

export type FoodStage = 'falling' | 'bouncing' | 'rolling';

export class PuddleState extends Schema {
  @type('string') id = '';
  @type('number') x = 0;
  @type('number') y = 0;
  @type('number') radiusX = 0;
  @type('number') radiusY = 0;
  @type('boolean') isCold = false;

  // ---- Server only (not synchronized) ----
  isFromRainCloud = false;
}

export class RainCloudState extends Schema {
  @type('string') id = '';
  @type('number') x = 0;
  @type('number') y = 0;

  // ---- Server only (not synchronized) ----
  velocityX = 0;
  nextPuddleAtMs = 0;
}

export class DecoyState extends Schema {
  @type('string') id = '';
  @type('number') x = 0;
  @type('number') y = 0;
  @type('string') ownerSessionId = '';

  // ---- Server only (not synchronized) ----
  expiresAtMs = 0;
}

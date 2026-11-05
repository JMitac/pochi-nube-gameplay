import type { DecoyView, FoodKind, PuddleView } from '@pochi/shared';

export interface FoodPlacement {
  id: string;
  kind: FoodKind;
  x: number;
  y: number;
  height: number;
  fallProgress: number;
}

export interface CloudPlacement {
  id: string;
  x: number;
  y: number;
}

/** Shadow left on the grass while a duck is in the air. */
export interface AirborneDuckShadow {
  id: string;
  x: number;
  y: number;
  height: number;
  scale: number;
}

export interface LandingMarker {
  x: number;
  y: number;
  opacity: number;
}

/** Everything the two Three.js layers draw in one frame, already interpolated. */
export interface WorldFrame {
  foods: FoodPlacement[];
  puddles: PuddleView[];
  clouds: CloudPlacement[];
  decoys: DecoyView[];
  landingMarkers: LandingMarker[];
  airborneDucks: AirborneDuckShadow[];
  timeMs: number;
}

/** How high above its shadow a rain cloud floats, in stage pixels. */
export const CLOUD_ALTITUDE = 250;

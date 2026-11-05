import type { DuckId } from '@pochi/shared';

export type DuckPose = 'idle' | 'walk' | 'jump' | 'talk';
export type DuckDirection = 'right' | 'left';

/** Values the duck artwork reads (the design's renderVals, in English). */
export interface DuckPoseValues {
  flipTransform?: string;
  shadowClass?: string;
  shadowRadiusX: number;
  shadowOpacity: number;
  jumpClass?: string;
  bodyTransform?: string;
  bodyClass?: string;
  frontFootTransform?: string;
  frontFootClass?: string;
  backFootTransform?: string;
  backFootClass?: string;
  wingTransform?: string;
  wingClass?: string;
  beakTransform?: string;
  beakClass?: string;
  eyeClass?: string;
}

/** The few numbers where Pochi's and Nube's rigs differ. */
interface DuckRig {
  classPrefix: string;
  stepAngle: number;
  wingRestTransform: string;
  beakOpenTransform: string;
}

const DUCK_RIGS: Record<DuckId, DuckRig> = {
  pochi: {
    classPrefix: 'pochi',
    stepAngle: 24,
    wingRestTransform: 'rotate(38 130 138)',
    beakOpenTransform: 'rotate(22 172 78)',
  },
  nube: {
    classPrefix: 'nube',
    stepAngle: 22,
    wingRestTransform: 'rotate(40 132 140)',
    beakOpenTransform: 'rotate(24 172 76)',
  },
};

/** Builds the pose of a duck. Same rules as the design for both characters. */
export function buildDuckPose(duckId: DuckId, pose: DuckPose, direction: DuckDirection, animated: boolean): DuckPoseValues {
  const rig = DUCK_RIGS[duckId];
  const css = (name: string) => `${rig.classPrefix}-${name}`;
  const walking = pose === 'walk';
  const jumping = pose === 'jump';
  const talking = pose === 'talk';
  const still = pose === 'idle';

  return {
    flipTransform: direction === 'left' ? 'translate(200 0) scale(-1 1)' : undefined,
    shadowRadiusX: jumping ? 44 : 64,
    shadowOpacity: jumping ? 0.1 : 0.14,
    shadowClass: jumping && animated ? css('shadow') : undefined,
    jumpClass: jumping && animated ? css('jump') : undefined,
    bodyTransform: jumping ? 'translate(0 -24) rotate(-8 100 150)' : undefined,
    bodyClass: animated ? (walking ? css('bob') : still || talking ? css('breathe') : undefined) : undefined,
    frontFootTransform: jumping ? 'rotate(42 89 180)' : walking && !animated ? `rotate(${rig.stepAngle} 89 180)` : undefined,
    backFootTransform: jumping ? 'rotate(34 121 180)' : walking && !animated ? `rotate(${-rig.stepAngle} 121 180)` : undefined,
    frontFootClass: walking && animated ? css('front-foot') : undefined,
    backFootClass: walking && animated ? css('back-foot') : undefined,
    wingTransform: jumping && !animated ? rig.wingRestTransform : undefined,
    wingClass: jumping && animated ? css('flap') : undefined,
    beakTransform: talking && !animated ? rig.beakOpenTransform : undefined,
    beakClass: talking && animated ? css('beak') : undefined,
    eyeClass: animated ? css('blink') : undefined,
  };
}

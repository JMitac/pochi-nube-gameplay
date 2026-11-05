import { memo } from 'react';
import type { DuckId } from '@pochi/shared';
import { buildDuckPose, type DuckDirection, type DuckPose } from './duckPose';
import { NubeArt } from './NubeArt';
import { PochiArt } from './PochiArt';

const DUCK_LABELS: Record<DuckId, string> = {
  pochi: 'Pochi, patito moteado con mochila',
  nube: 'Nube, patita blanca con pañuelo terracota',
};

const POSE_LABELS: Record<DuckPose, string> = {
  idle: 'quieto',
  walk: 'caminando',
  jump: 'saltando',
  talk: 'haciendo cuac',
};

interface DuckFigureProps {
  duckId: DuckId;
  /** Width in px. The height is always 1.1 × width, like in the design. */
  size: number;
  pose?: DuckPose;
  direction?: DuckDirection;
  animated?: boolean;
  className?: string;
}

export const DuckFigure = memo(function DuckFigure({
  duckId,
  size,
  pose = 'idle',
  direction = 'right',
  animated = true,
  className,
}: DuckFigureProps) {
  const poseValues = buildDuckPose(duckId, pose, direction, animated);
  const Art = duckId === 'pochi' ? PochiArt : NubeArt;

  return (
    <svg
      width={size}
      height={Math.round(size * 1.1)}
      viewBox="0 0 200 220"
      className={`block overflow-visible ${className ?? ''}`}
      role="img"
      aria-label={`${DUCK_LABELS[duckId]}, ${POSE_LABELS[pose]}`}
    >
      <Art pose={poseValues} />
    </svg>
  );
});

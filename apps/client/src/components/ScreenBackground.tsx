import type { MapId } from '@pochi/shared';
import { SceneBackdrop } from '../art/scene/SceneBackdrop';
import { useIsNight } from '../hooks/useIsNight';

export type BackgroundTint = 'none' | 'cream' | 'ink' | 'inkSoft';

const TINT_CLASSES: Record<Exclude<BackgroundTint, 'none'>, string> = {
  cream: 'bg-[rgba(255,248,236,0.5)]',
  ink: 'bg-[rgba(74,52,36,0.25)]',
  inkSoft: 'bg-[rgba(74,52,36,0.2)]',
};

interface ScreenBackgroundProps {
  mapId?: MapId;
  tint?: BackgroundTint;
}

/** Animated scene plus the soft veil the menus use so text stays readable. */
export function ScreenBackground({ mapId, tint = 'none' }: ScreenBackgroundProps) {
  const isNight = useIsNight();
  return (
    <>
      <SceneBackdrop mapId={mapId} isNight={isNight} />
      {tint !== 'none' && <div className={`absolute inset-0 ${TINT_CLASSES[tint]}`} />}
    </>
  );
}

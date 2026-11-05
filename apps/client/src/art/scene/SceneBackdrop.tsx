import type { ComponentType } from 'react';
import type { MapId } from '@pochi/shared';
import { LagoonScene } from './LagoonScene';
import { MeadowScene } from './MeadowScene';
import { OrchardScene } from './OrchardScene';
import type { SceneArtProps } from './sceneArtProps';

interface SceneTheme {
  Art: ComponentType<SceneArtProps>;
  daySky: string;
  nightSky: string;
}

/** Sky colours per map, from the design's Escena component. */
const SCENE_THEMES: Record<MapId, SceneTheme> = {
  meadow: { Art: MeadowScene, daySky: '#CFEAF4', nightSky: '#3A4C8F' },
  orchard: { Art: OrchardScene, daySky: '#FCE3C2', nightSky: '#4A3F80' },
  lagoon: { Art: LagoonScene, daySky: '#E4EEF6', nightSky: '#33497F' },
};

interface SceneBackdropProps {
  mapId?: MapId;
  isNight: boolean;
}

/** The animated 1280×720 background every screen sits on. */
export function SceneBackdrop({ mapId = 'meadow', isNight }: SceneBackdropProps) {
  const { Art, daySky, nightSky } = SCENE_THEMES[mapId];
  return (
    <div className="absolute left-0 top-0">
      <Art
        skyColor={isNight ? nightSky : daySky}
        sunDisplay={isNight ? 'none' : 'inline'}
        nightDisplay={isNight ? 'inline' : 'none'}
      />
    </div>
  );
}

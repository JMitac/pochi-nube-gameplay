import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { sanitizePlayerName } from '@pochi/shared';

export type GraphicsQuality = 'low' | 'high';
export type Handedness = 'right' | 'left';

export interface SettingsState {
  playerName: string;
  musicVolume: number;
  effectsVolume: number;
  vibration: boolean;
  graphicsQuality: GraphicsQuality;
  handedness: Handedness;
  setPlayerName(name: string): void;
  setMusicVolume(volume: number): void;
  setEffectsVolume(volume: number): void;
  setVibration(enabled: boolean): void;
  setGraphicsQuality(quality: GraphicsQuality): void;
  setHandedness(handedness: Handedness): void;
}

function randomDuckName(): string {
  return `Patito${Math.floor(10 + Math.random() * 89)}`;
}

/** Player preferences ("Configuración"), saved in this browser. */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      playerName: randomDuckName(),
      musicVolume: 70,
      effectsVolume: 85,
      vibration: true,
      graphicsQuality: 'high',
      handedness: 'right',
      setPlayerName: (name) => set({ playerName: sanitizePlayerName(name) }),
      setMusicVolume: (musicVolume) => set({ musicVolume }),
      setEffectsVolume: (effectsVolume) => set({ effectsVolume }),
      setVibration: (vibration) => set({ vibration }),
      setGraphicsQuality: (graphicsQuality) => set({ graphicsQuality }),
      setHandedness: (handedness) => set({ handedness }),
    }),
    {
      name: 'pochi-nube-settings',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

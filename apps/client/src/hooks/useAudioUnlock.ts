import { useEffect } from 'react';
import { audioEngine } from '../audio/audioInstance';
import { useSettingsStore } from '../state/settingsStore';

/**
 * Browsers only allow sound after the first tap or key press.
 * This starts the audio engine at that moment and applies the saved volumes.
 */
export function useAudioUnlock(): void {
  useEffect(() => {
    const unlock = () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      void audioEngine.init().then(() => {
        const { musicVolume, effectsVolume } = useSettingsStore.getState();
        audioEngine.setVolume('music', musicVolume);
        audioEngine.setVolume('effects', effectsVolume);
        audioEngine.resumeRequestedTrack();
      });
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);
}

/** Keeps the audio volumes in sync with the settings sliders. */
export function useAudioVolumes(): void {
  const musicVolume = useSettingsStore((state) => state.musicVolume);
  const effectsVolume = useSettingsStore((state) => state.effectsVolume);

  useEffect(() => audioEngine.setVolume('music', musicVolume), [musicVolume]);
  useEffect(() => audioEngine.setVolume('effects', effectsVolume), [effectsVolume]);
}

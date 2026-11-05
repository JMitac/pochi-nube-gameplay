import { useEffect } from 'react';
import { audioEngine } from '../audio/audioInstance';
import { useSettingsStore } from '../state/settingsStore';

/**
 * Events that count as a real user gesture on every browser.
 * On phones a finger going *down* (pointerdown/touchstart) does not unlock audio;
 * lifting it (pointerup/touchend) or a click does.
 */
const GESTURE_EVENTS = ['pointerup', 'touchend', 'click', 'keydown'] as const;

/**
 * Browsers only allow sound after a tap or key press. This unlocks the audio inside
 * that gesture, starts the engine and applies the saved volumes. It keeps listening
 * while the sound is not running, because iOS suspends audio again when the app goes
 * to the background or a call comes in.
 */
export function useAudioUnlock(): void {
  useEffect(() => {
    const unlock = () => {
      if (audioEngine.isReady && audioEngine.isRunning) return;
      audioEngine.unlockFromGesture();
      void audioEngine.init().then(() => {
        const { musicVolume, effectsVolume } = useSettingsStore.getState();
        audioEngine.setVolume('music', musicVolume);
        audioEngine.setVolume('effects', effectsVolume);
        audioEngine.resumeRequestedTrack();
      });
    };

    for (const eventName of GESTURE_EVENTS) window.addEventListener(eventName, unlock, { capture: true, passive: true });
    return () => {
      for (const eventName of GESTURE_EVENTS) window.removeEventListener(eventName, unlock, { capture: true });
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

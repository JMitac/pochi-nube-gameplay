import type { DuckId } from '@pochi/shared';
import type { ToneInput, ToneLibrary, ToneNode } from './toneTypes';

/**
 * Placeholder quacks made with synths. The soundtrack page marks the real ones
 * as "Grabación" (CC0 recordings from freesound.org). When those files exist,
 * put them in apps/client/public/sounds/ and they are used instead (see AudioEngine).
 *
 * Pochi (male): low and raspy "rrraeb". Nube (female): high, clear "cuac-cuac".
 */
export interface DuckVoice {
  quack(duckId: DuckId, time: number): void;
  nodes: ToneNode[];
}

export function createDuckVoice(tone: ToneLibrary, destination: ToneInput): DuckVoice {
  const formant = new tone.Filter(1200, 'bandpass').connect(destination);
  formant.Q.value = 3;
  const voice = new tone.Synth({
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 0.01, decay: 0.08, sustain: 0.7, release: 0.06 },
  }).connect(formant);
  voice.volume.value = -6;
  const rasp = new tone.NoiseSynth({ noise: { type: 'brown' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0 } }).connect(
    formant,
  );
  rasp.volume.value = -16;

  const quackPochi = (time: number) => {
    formant.frequency.setValueAtTime(700, time);
    voice.triggerAttackRelease(190, 0.26, time);
    voice.frequency.exponentialRampToValueAtTime(140, time + 0.24);
    rasp.triggerAttackRelease(0.24, time, 0.7);
  };

  const quackNube = (time: number) => {
    formant.frequency.setValueAtTime(1500, time);
    [0, 0.16].forEach((delay) => {
      voice.triggerAttackRelease(520, 0.11, time + delay);
      voice.frequency.exponentialRampToValueAtTime(430, time + delay + 0.1);
    });
  };

  return {
    quack: (duckId, time) => (duckId === 'pochi' ? quackPochi(time) : quackNube(time)),
    nodes: [formant, voice, rasp],
  };
}

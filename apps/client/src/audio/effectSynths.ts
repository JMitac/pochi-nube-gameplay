import type { ToneInput, ToneLibrary } from './toneTypes';

/** The small set of synths every sound effect and jingle is played with. */
export function createEffectSynths(tone: ToneLibrary, destination: ToneInput) {
  const pluck = new tone.PolySynth(tone.FMSynth, {
    harmonicity: 3.01,
    modulationIndex: 4,
    envelope: { attack: 0.001, decay: 0.25, sustain: 0, release: 0.2 },
    modulationEnvelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.1 },
  }).connect(destination);
  pluck.volume.value = -8;

  const bells = new tone.PolySynth(tone.FMSynth, {
    harmonicity: 4,
    modulationIndex: 9,
    envelope: { attack: 0.002, decay: 1.1, sustain: 0, release: 1.2 },
    modulationEnvelope: { attack: 0.002, decay: 0.25, sustain: 0, release: 0.3 },
  }).connect(destination);
  bells.volume.value = -10;

  const sine = new tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.005, decay: 0.1, sustain: 0.6, release: 0.08 },
  }).connect(destination);
  sine.volume.value = -8;

  const sawVibrato = new tone.Vibrato(9, 0.35).connect(destination);
  const sawFilter = new tone.Filter(1100, 'lowpass').connect(sawVibrato);
  const saw = new tone.Synth({
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.6, release: 0.15 },
  }).connect(sawFilter);
  saw.volume.value = -12;

  const membrane = new tone.MembraneSynth({
    pitchDecay: 0.02,
    octaves: 3,
    envelope: { attack: 0.001, decay: 0.12, sustain: 0 },
  }).connect(destination);
  membrane.volume.value = -8;

  const noiseFilter = new tone.Filter(2500, 'lowpass').connect(destination);
  const noise = new tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.004, decay: 0.28, sustain: 0 },
  }).connect(noiseFilter);
  noise.volume.value = -14;

  const shimmer = new tone.MetalSynth({
    harmonicity: 5.1,
    modulationIndex: 20,
    resonance: 6000,
    octaves: 1,
    envelope: { attack: 0.001, decay: 0.3, release: 0.1 },
  }).connect(destination);
  shimmer.volume.value = -28;

  const ukulele = new tone.PolySynth(tone.Synth, {
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.002, decay: 0.6, sustain: 0.1, release: 0.6 },
  }).connect(destination);
  ukulele.volume.value = -12;

  return { pluck, bells, sine, saw, membrane, noise, noiseFilter, shimmer, ukulele };
}

export type EffectSynths = ReturnType<typeof createEffectSynths>;

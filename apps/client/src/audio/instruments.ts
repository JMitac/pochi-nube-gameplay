import type { DrumPiece, MelodyInstrument } from './tracks';
import type { ToneInput, ToneLibrary, ToneNode } from './toneTypes';

/** A synth ready to play notes, plus every node that must be disposed with it. */
export interface NoteVoice {
  play(notes: string | string[], duration: string | number, time: number, velocity?: number): void;
  setVolume(decibels: number): void;
  nodes: ToneNode[];
}

/** A percussion voice: it only needs to know when to hit. */
export interface DrumVoice {
  hit(time: number, velocity?: number, duration?: string): void;
  setVolume(decibels: number): void;
  nodes: ToneNode[];
}

interface SynthLike extends ToneNode {
  volume: { value: number };
  triggerAttackRelease(...args: never[]): unknown;
}

function noteVoice<T extends SynthLike>(synth: T, extraNodes: ToneNode[] = []): NoteVoice {
  const play = synth.triggerAttackRelease.bind(synth) as unknown as NoteVoice['play'];
  return {
    play,
    setVolume: (decibels) => {
      synth.volume.value = decibels;
    },
    nodes: [synth, ...extraNodes],
  };
}

export function createUkulele(tone: ToneLibrary, destination: ToneInput): NoteVoice {
  const synth = new tone.PolySynth(tone.Synth, {
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.002, decay: 0.35, sustain: 0.04, release: 0.25 },
  }).connect(destination);
  synth.volume.value = -15;
  return noteVoice(synth);
}

export function createXylophone(tone: ToneLibrary, destination: ToneInput): NoteVoice {
  const synth = new tone.PolySynth(tone.FMSynth, {
    harmonicity: 3.01,
    modulationIndex: 5,
    envelope: { attack: 0.001, decay: 0.4, sustain: 0, release: 0.4 },
    modulationEnvelope: { attack: 0.001, decay: 0.12, sustain: 0, release: 0.1 },
  }).connect(destination);
  synth.volume.value = -11;
  return noteVoice(synth);
}

export function createBells(tone: ToneLibrary, destination: ToneInput): NoteVoice {
  const synth = new tone.PolySynth(tone.FMSynth, {
    harmonicity: 4,
    modulationIndex: 9,
    envelope: { attack: 0.002, decay: 1.4, sustain: 0, release: 1.6 },
    modulationEnvelope: { attack: 0.002, decay: 0.3, sustain: 0, release: 0.4 },
  }).connect(destination);
  synth.volume.value = -14;
  return noteVoice(synth);
}

function createWindInstrument(tone: ToneLibrary, destination: ToneInput, isWhistle: boolean): NoteVoice {
  const synth = new tone.Synth({
    oscillator: { type: 'sine' },
    portamento: isWhistle ? 0.05 : 0.02,
    envelope: { attack: isWhistle ? 0.03 : 0.07, decay: 0.1, sustain: 0.85, release: 0.15 },
  });
  const vibrato = new tone.Vibrato(isWhistle ? 5.5 : 4.5, isWhistle ? 0.14 : 0.08);
  synth.connect(vibrato);
  vibrato.connect(destination);
  synth.volume.value = isWhistle ? -13 : -12;
  return noteVoice(synth, [vibrato]);
}

export function createPad(tone: ToneLibrary, destination: ToneInput): NoteVoice {
  const synth = new tone.PolySynth(tone.AMSynth, {
    harmonicity: 1.5,
    envelope: { attack: 1.2, decay: 0.4, sustain: 0.8, release: 2.2 },
  }).connect(destination);
  synth.volume.value = -24;
  return noteVoice(synth);
}

export function createBass(tone: ToneLibrary, destination: ToneInput): NoteVoice {
  const synth = new tone.MonoSynth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.005, decay: 0.3, sustain: 0.4, release: 0.25 },
    filterEnvelope: { attack: 0.005, decay: 0.2, sustain: 0.3, release: 0.2, baseFrequency: 180, octaves: 2.5 },
  }).connect(destination);
  synth.volume.value = -10;
  return noteVoice(synth);
}

export const MELODY_INSTRUMENTS: Record<MelodyInstrument, (tone: ToneLibrary, destination: ToneInput) => NoteVoice> = {
  xylophone: createXylophone,
  bells: createBells,
  flute: (tone, destination) => createWindInstrument(tone, destination, false),
  whistle: (tone, destination) => createWindInstrument(tone, destination, true),
};

function createKick(tone: ToneLibrary, destination: ToneInput): DrumVoice {
  const synth = new tone.MembraneSynth({
    pitchDecay: 0.03,
    octaves: 5,
    envelope: { attack: 0.001, decay: 0.35, sustain: 0 },
  }).connect(destination);
  synth.volume.value = -13;
  return {
    hit: (time, velocity = 0.9) => synth.triggerAttackRelease('C1', '8n', time, velocity),
    setVolume: (decibels) => (synth.volume.value = decibels),
    nodes: [synth],
  };
}

function createNoiseDrum(
  tone: ToneLibrary,
  destination: ToneInput,
  decay: number,
  filter: { frequency: number; type: 'bandpass' | 'highpass'; q?: number },
  volume: number,
  defaultVelocity: number,
): DrumVoice {
  const synth = new tone.NoiseSynth({ noise: { type: 'white' }, envelope: { attack: 0.001, decay, sustain: 0 } });
  const shapingFilter = new tone.Filter(filter.frequency, filter.type);
  if (filter.q !== undefined) shapingFilter.Q.value = filter.q;
  synth.connect(shapingFilter);
  shapingFilter.connect(destination);
  synth.volume.value = volume;
  return {
    hit: (time, velocity = defaultVelocity, duration = '16n') => synth.triggerAttackRelease(duration, time, velocity),
    setVolume: (decibels) => (synth.volume.value = decibels),
    nodes: [synth, shapingFilter],
  };
}

function createSleighBells(tone: ToneLibrary, destination: ToneInput): DrumVoice {
  const synth = new tone.MetalSynth({
    harmonicity: 5.1,
    modulationIndex: 16,
    resonance: 5200,
    octaves: 1.2,
    envelope: { attack: 0.001, decay: 0.12, release: 0.05 },
  }).connect(destination);
  synth.volume.value = -34;
  return {
    hit: (time, velocity = 0.6) => synth.triggerAttackRelease('C6', '32n', time, velocity),
    setVolume: (decibels) => (synth.volume.value = decibels),
    nodes: [synth],
  };
}

export const DRUM_VOICES: Record<DrumPiece, (tone: ToneLibrary, destination: ToneInput) => DrumVoice> = {
  kick: createKick,
  claps: (tone, destination) => createNoiseDrum(tone, destination, 0.12, { frequency: 1400, type: 'bandpass', q: 1.2 }, -17, 0.8),
  shaker: (tone, destination) => createNoiseDrum(tone, destination, 0.045, { frequency: 6500, type: 'highpass' }, -27, 0.5),
  sleighBells: createSleighBells,
};

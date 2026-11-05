import type { EffectSynths } from './effectSynths';

export type SoundEffectId =
  | 'catch'
  | 'favorite'
  | 'jump'
  | 'combo'
  | 'rotten'
  | 'golden'
  | 'button'
  | 'puddle'
  | 'cold'
  | 'lost'
  | 'snack'
  | 'plan'
  | 'phase'
  | 'tick'
  | 'partnerJoined'
  | 'affection';

type EffectPlayer = (synths: EffectSynths, time: number) => void;

/** The 16 effects of the soundtrack page ("Efectos"), unchanged. */
export const SOUND_EFFECTS: Record<SoundEffectId, EffectPlayer> = {
  catch: (s, t) => {
    ['C6', 'E6', 'G6'].forEach((note, index) => s.pluck.triggerAttackRelease(note, 0.08, t + index * 0.045, 0.8));
  },
  favorite: (s, t) => {
    ['C6', 'E6', 'G6', 'C7'].forEach((note, index) => s.pluck.triggerAttackRelease(note, 0.08, t + index * 0.045, 0.85));
    s.shimmer.triggerAttackRelease('C7', 0.1, t + 0.18, 0.5);
  },
  jump: (s, t) => {
    s.sine.triggerAttackRelease(320, 0.18, t);
    s.sine.frequency.exponentialRampToValueAtTime(780, t + 0.15);
  },
  combo: (s, t) => {
    s.bells.triggerAttackRelease('D6', 0.3, t, 0.8);
    s.bells.triggerAttackRelease('A6', 0.5, t + 0.09, 0.8);
    s.shimmer.triggerAttackRelease('A7', 0.1, t + 0.12, 0.5);
  },
  rotten: (s, t) => {
    s.saw.triggerAttackRelease(300, 0.5, t);
    s.saw.frequency.exponentialRampToValueAtTime(105, t + 0.45);
  },
  golden: (s, t) => {
    ['C6', 'E6', 'G6', 'C7', 'E7'].forEach((note, index) => s.bells.triggerAttackRelease(note, 0.4, t + index * 0.06, 0.75));
    s.shimmer.triggerAttackRelease('C7', 0.2, t + 0.3, 0.6);
  },
  button: (s, t) => {
    s.membrane.triggerAttackRelease('C5', 0.05, t, 0.7);
  },
  puddle: (s, t) => {
    s.noiseFilter.frequency.setValueAtTime(3200, t);
    s.noiseFilter.frequency.exponentialRampToValueAtTime(350, t + 0.25);
    s.noise.triggerAttackRelease(0.28, t, 0.8);
    s.membrane.triggerAttackRelease('G3', 0.1, t + 0.02, 0.6);
  },
  cold: (s, t) => {
    s.sine.triggerAttackRelease(1200, 0.1, t);
    s.sine.frequency.exponentialRampToValueAtTime(1750, t + 0.08);
    s.sine.triggerAttackRelease(1350, 0.1, t + 0.16);
    s.sine.frequency.exponentialRampToValueAtTime(1900, t + 0.24);
  },
  lost: (s, t) => {
    s.membrane.triggerAttackRelease('C2', 0.15, t, 0.5);
  },
  snack: (s, t) => {
    s.noiseFilter.frequency.setValueAtTime(600, t);
    s.noiseFilter.frequency.exponentialRampToValueAtTime(4000, t + 0.2);
    s.noise.triggerAttackRelease(0.22, t, 0.5);
    ['G5', 'C6'].forEach((note, index) => s.pluck.triggerAttackRelease(note, 0.1, t + 0.18 + index * 0.07, 0.8));
  },
  plan: (s, t) => {
    ['A5', 'C#6', 'E6', 'A6'].forEach((note, index) => s.bells.triggerAttackRelease(note, 0.6, t + index * 0.09, 0.6));
  },
  phase: (s, t) => {
    s.bells.triggerAttackRelease('G5', 0.4, t, 0.7);
    s.bells.triggerAttackRelease('C6', 0.8, t + 0.16, 0.7);
  },
  tick: (s, t) => {
    s.membrane.triggerAttackRelease('A5', 0.03, t, 0.5);
  },
  partnerJoined: (s, t) => {
    s.bells.triggerAttackRelease('E6', 0.5, t, 0.7);
    s.bells.triggerAttackRelease('C6', 0.9, t + 0.25, 0.7);
  },
  affection: (s, t) => {
    ['C6', 'E6', 'G6', 'B6', 'D7'].forEach((note, index) => s.bells.triggerAttackRelease(note, 0.8, t + index * 0.07, 0.55));
    s.shimmer.triggerAttackRelease('E7', 0.4, t + 0.35, 0.6);
  },
};

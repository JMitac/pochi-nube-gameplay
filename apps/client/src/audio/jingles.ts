import type { EffectSynths } from './effectSynths';

export type JingleId = 'victory' | 'almost' | 'defeat' | 'countdown';

type JinglePlayer = (synths: EffectSynths, time: number) => void;

/** Short melodies that never loop ("Jingles" on the soundtrack page). */
export const JINGLES: Record<JingleId, JinglePlayer> = {
  victory: (s, t) => {
    ['G4', 'C5', 'E5', 'G5'].forEach((note, index) => s.pluck.triggerAttackRelease(note, 0.14, t + index * 0.11, 0.85));
    s.ukulele.triggerAttackRelease(['C4', 'E4', 'G4', 'C5'], 1.2, t + 0.46, 0.8);
    s.bells.triggerAttackRelease('C6', 1.0, t + 0.46, 0.8);
    s.membrane.triggerAttackRelease('C2', 0.3, t + 0.46, 0.9);
    ['A5', 'B5'].forEach((note, index) => s.pluck.triggerAttackRelease(note, 0.1, t + 1.5 + index * 0.13, 0.8));
    s.ukulele.triggerAttackRelease(['A3', 'C4', 'F4', 'A4'], 0.4, t + 1.76, 0.75);
    s.ukulele.triggerAttackRelease(['G3', 'C4', 'E4', 'G4', 'C5'], 1.8, t + 2.2, 0.85);
    s.bells.triggerAttackRelease('E6', 1.4, t + 2.2, 0.75);
    s.membrane.triggerAttackRelease('C2', 0.3, t + 2.2, 1);
    ['C6', 'E6', 'G6', 'C7'].forEach((note, index) => s.bells.triggerAttackRelease(note, 0.9, t + 2.7 + index * 0.1, 0.5));
    s.shimmer.triggerAttackRelease('C7', 0.4, t + 3.2, 0.5);
  },
  almost: (s, t) => {
    ['C5', 'D5', 'E5', 'G5'].forEach((note, index) => s.pluck.triggerAttackRelease(note, 0.2, t + index * 0.22, 0.7));
    s.ukulele.triggerAttackRelease(['F3', 'A3', 'C4', 'F4'], 0.8, t + 0.9, 0.6);
    s.pluck.triggerAttackRelease('F5', 0.3, t + 0.9, 0.7);
    s.ukulele.triggerAttackRelease(['G3', 'C4', 'E4', 'G4'], 1.6, t + 1.6, 0.7);
    s.bells.triggerAttackRelease('E6', 1.4, t + 1.6, 0.6);
  },
  defeat: (s, t) => {
    (
      [
        [392, 0],
        [370, 0.35],
        [349, 0.7],
      ] as const
    ).forEach(([frequency, delay]) => s.saw.triggerAttackRelease(frequency, 0.28, t + delay));
    s.saw.triggerAttackRelease(330, 0.9, t + 1.05);
    s.saw.frequency.exponentialRampToValueAtTime(300, t + 1.9);
  },
  countdown: (s, t) => {
    [0, 1, 2].forEach((delay) => s.bells.triggerAttackRelease('A5', 0.3, t + delay, 0.7));
    s.bells.triggerAttackRelease(['E6', 'A6'], 0.9, t + 3, 0.9);
    s.membrane.triggerAttackRelease('C2', 0.3, t + 3, 1);
    s.shimmer.triggerAttackRelease('A7', 0.3, t + 3.05, 0.6);
  },
};

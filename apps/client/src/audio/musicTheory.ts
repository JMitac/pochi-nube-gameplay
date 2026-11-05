import type { ToneLibrary } from './toneTypes';

export type ChordName = 'C' | 'Am' | 'F' | 'G' | 'D' | 'Em' | 'Bb' | 'Dm' | 'E';

export const CHORD_NOTES: Record<ChordName, readonly [string, string, string]> = {
  C: ['G4', 'C5', 'E5'],
  Am: ['A4', 'C5', 'E5'],
  F: ['A4', 'C5', 'F5'],
  G: ['G4', 'B4', 'D5'],
  D: ['F#4', 'A4', 'D5'],
  Em: ['G4', 'B4', 'E5'],
  Bb: ['Bb4', 'D5', 'F5'],
  Dm: ['A4', 'D5', 'F5'],
  E: ['G#4', 'B4', 'E5'],
};

export const BASS_ROOTS: Record<ChordName, string> = {
  C: 'C2',
  Am: 'A1',
  F: 'F2',
  G: 'G1',
  D: 'D2',
  Em: 'E2',
  Bb: 'Bb1',
  Dm: 'D2',
  E: 'E2',
};

export function transposeNote(tone: ToneLibrary, note: string, semitones: number): string {
  return tone.Frequency(note).transpose(semitones).toNote();
}

/** Converts a 0–100 slider value into decibels. */
export function volumeToDecibels(tone: ToneLibrary, volume: number): number {
  return volume <= 0 ? -Infinity : tone.gainToDb(volume / 100);
}

/** "x.x." → [1, null, 1, null] */
export function patternToSteps(pattern: string): Array<1 | null> {
  return pattern.split('').map((character) => (character === 'x' ? 1 : null));
}

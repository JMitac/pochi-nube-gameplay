import type { MapId } from '@pochi/shared';
import type { ChordName } from './musicTheory';

export type TrackId = 'menu' | 'waiting' | 'meadow' | 'orchard' | 'lagoon';
export type MelodyInstrument = 'xylophone' | 'bells' | 'flute' | 'whistle';
export type ChordStyle = 'strum' | 'arpeggio' | 'pad';
export type BassStyle = 'bouncing' | 'long' | 'walking';
export type DrumPiece = 'kick' | 'claps' | 'shaker' | 'sleighBells';
export type StrumStroke = 'D' | 'u' | null;
export type Ambience = 'birds' | 'crickets' | 'wind' | 'wind+crickets' | null;

export interface TrackDefinition {
  title: string;
  bpm: number;
  swing: number;
  chords: ChordName[];
  chordStyle: ChordStyle;
  strumPattern?: StrumStroke[];
  melodyInstrument: MelodyInstrument;
  melodyNoteLength: string;
  /** 8 bars of 8 eighth notes. */
  melody: Array<Array<string | null>>;
  bassStyle: BassStyle;
  drums: Partial<Record<DrumPiece, string>> | null;
  ambience: Ambience;
}

/** The soundtrack from "Banda sonora de Pochi y Nube", note for note. */
export const TRACKS: Record<TrackId, TrackDefinition> = {
  menu: {
    title: 'Portada y menú',
    bpm: 100,
    swing: 0.15,
    chords: ['C', 'Am', 'F', 'G', 'C', 'Am', 'F', 'G'],
    chordStyle: 'strum',
    strumPattern: ['D', null, 'u', 'D', null, 'u', 'D', 'u'],
    melodyInstrument: 'xylophone',
    melodyNoteLength: '8n',
    melody: [
      ['E5', 'G5', 'E5', 'C5', 'D5', null, 'E5', null],
      ['C5', 'E5', 'A5', 'G5', 'E5', null, null, null],
      ['F5', 'A5', 'G5', 'F5', 'E5', 'D5', 'C5', null],
      ['D5', null, 'G4', 'B4', 'D5', null, null, null],
      ['E5', 'G5', 'C6', 'G5', 'E5', null, 'G5', null],
      ['A5', 'G5', 'E5', 'C5', 'D5', null, 'E5', null],
      ['F5', 'E5', 'D5', 'C5', 'D5', null, 'A4', null],
      ['B4', 'D5', 'G5', 'F5', 'E5', null, 'C5', null],
    ],
    bassStyle: 'bouncing',
    drums: { kick: 'x.......x.......', claps: '....x.......x...', shaker: 'x.x.x.x.x.x.x.x.' },
    ambience: null,
  },
  waiting: {
    title: 'Sala de espera',
    bpm: 88,
    swing: 0.1,
    chords: ['C', 'Am', 'F', 'G', 'C', 'Am', 'F', 'G'],
    chordStyle: 'arpeggio',
    melodyInstrument: 'bells',
    melodyNoteLength: '4n',
    melody: [
      ['E5', null, null, null, 'D5', null, null, null],
      ['C5', null, null, null, 'E5', null, null, null],
      ['F5', null, null, null, 'E5', null, 'D5', null],
      ['D5', null, null, null, null, null, null, null],
      ['G5', null, null, null, 'E5', null, null, null],
      ['A5', null, null, null, 'G5', null, null, null],
      ['F5', null, 'E5', null, 'D5', null, null, null],
      ['G5', null, null, null, null, null, null, null],
    ],
    bassStyle: 'long',
    drums: { shaker: 'x...x...x...x...' },
    ambience: 'birds',
  },
  meadow: {
    title: 'Pradera del Estanque',
    bpm: 112,
    swing: 0.1,
    chords: ['G', 'D', 'Em', 'C', 'C', 'D', 'G', 'G'],
    chordStyle: 'strum',
    strumPattern: ['D', null, 'u', null, 'D', 'u', null, 'u'],
    melodyInstrument: 'flute',
    melodyNoteLength: '4n',
    melody: [
      ['B4', null, 'D5', null, 'G5', null, 'D5', null],
      ['A4', null, 'D5', null, 'F#5', null, 'E5', null],
      ['G5', null, 'E5', null, 'B4', null, 'E5', null],
      ['E5', null, 'D5', null, 'C5', null, 'B4', null],
      ['C5', null, 'E5', null, 'G5', null, 'E5', null],
      ['D5', null, 'F#5', null, 'A5', null, 'F#5', null],
      ['G5', null, 'D5', null, 'B4', null, 'D5', null],
      ['G5', null, null, null, null, null, null, null],
    ],
    bassStyle: 'bouncing',
    drums: { kick: 'x.......x.......', claps: '....x.......x...', shaker: 'x.xxx.xxx.xxx.xx' },
    ambience: 'birds',
  },
  orchard: {
    title: 'Huerto de Frutas',
    bpm: 126,
    swing: 0.2,
    chords: ['F', 'Bb', 'C', 'F', 'Dm', 'Bb', 'C', 'C'],
    chordStyle: 'strum',
    strumPattern: [null, 'D', null, 'D', null, 'D', null, 'D'],
    melodyInstrument: 'whistle',
    melodyNoteLength: '8n',
    melody: [
      ['A5', null, 'C6', 'A5', 'G5', null, 'F5', null],
      ['D6', null, 'C6', 'Bb5', 'A5', null, null, null],
      ['G5', 'A5', 'Bb5', 'G5', 'E5', null, 'C5', null],
      ['F5', null, 'A5', null, 'C6', null, null, null],
      ['D6', 'C6', 'A5', null, 'F5', 'A5', 'D6', null],
      ['Bb5', 'A5', 'G5', null, 'F5', 'G5', 'Bb5', null],
      ['C6', null, 'Bb5', 'A5', 'G5', 'E5', 'C5', null],
      ['E5', 'F5', 'G5', null, 'C6', null, null, null],
    ],
    bassStyle: 'walking',
    drums: { kick: 'x...x...x...x...', claps: '....x..x....x...', shaker: 'xxxxxxxxxxxxxxxx' },
    ambience: 'birds',
  },
  lagoon: {
    title: 'Laguna de Invierno',
    bpm: 84,
    swing: 0,
    chords: ['Am', 'F', 'C', 'G', 'Am', 'F', 'C', 'E'],
    chordStyle: 'arpeggio',
    melodyInstrument: 'bells',
    melodyNoteLength: '4n',
    melody: [
      ['E5', null, 'A5', 'B5', 'C6', null, 'B5', null],
      ['A5', null, 'G5', 'F5', 'E5', null, null, null],
      ['G5', null, 'C6', 'D6', 'E6', null, 'D6', null],
      ['B5', null, 'D6', 'B5', 'G5', null, null, null],
      ['A5', 'C6', 'E6', null, 'D6', 'C6', 'B5', null],
      ['C6', null, 'A5', null, 'F5', null, 'A5', null],
      ['G5', 'E5', 'C6', null, 'B5', 'G5', 'E5', null],
      ['G#5', null, 'B5', null, 'E6', null, null, null],
    ],
    bassStyle: 'long',
    drums: { sleighBells: 'x.x.x.x.x.x.x.x.', kick: 'x.......x.......' },
    ambience: 'wind',
  },
};

export const MAP_TRACKS: Record<MapId, TrackId> = {
  meadow: 'meadow',
  orchard: 'orchard',
  lagoon: 'lagoon',
};

/** Night version: slower, lullaby-like, no drums and with crickets. */
export function toNightVersion(track: TrackDefinition): TrackDefinition {
  return {
    ...track,
    bpm: Math.round(track.bpm * 0.72),
    swing: 0,
    melody: track.melody.map((bar) => bar.map((note, index) => (index % 2 === 0 ? note : null))),
    melodyInstrument: 'bells',
    melodyNoteLength: '2n',
    chordStyle: 'pad',
    bassStyle: 'long',
    drums: null,
    ambience: track.ambience === 'wind' ? 'wind+crickets' : 'crickets',
  };
}

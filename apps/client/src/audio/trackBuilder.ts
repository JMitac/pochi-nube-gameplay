import { createBass, createPad, createUkulele, createXylophone, DRUM_VOICES, MELODY_INSTRUMENTS } from './instruments';
import { BASS_ROOTS, CHORD_NOTES, patternToSteps, transposeNote, type ChordName } from './musicTheory';
import type { DrumPiece, TrackDefinition } from './tracks';
import type { ToneLibrary, ToneNode } from './toneTypes';

export interface MixBuses {
  music: import('tone').Volume;
  pauseFilter: import('tone').Filter;
  reverb: import('tone').Reverb;
}

interface Startable extends ToneNode {
  start(time?: number | string): unknown;
}

interface Stoppable extends ToneNode {
  start(time?: number | string): unknown;
  stop(time?: number | string): unknown;
}

/** Everything a running track owns, so it can be stopped and disposed cleanly. */
export interface BuiltTrack {
  nodes: ToneNode[];
  parts: Startable[];
  sources: Stoppable[];
  intenseLayer: import('tone').Volume;
  baseBpm: number;
}

interface ChordStep {
  chord: ChordName;
  index: number;
}

/** "¡Lluvia de frutas!" extra drums, muted until the last 30 seconds. */
const INTENSE_PATTERN = { kick: 'x...x...x...x...', claps: '....x.......x.xx', shaker: 'xxxxxxxxxxxxxxxx' };

class TrackAssembler {
  readonly nodes: ToneNode[] = [];
  readonly parts: Startable[] = [];
  readonly sources: Stoppable[] = [];
  private readonly chordSteps: ChordStep[];

  constructor(
    private readonly tone: ToneLibrary,
    private readonly track: TrackDefinition,
    private readonly buses: MixBuses,
  ) {
    this.chordSteps = track.chords.flatMap((chord) => Array.from({ length: 8 }, (_, index) => ({ chord, index })));
  }

  private own<T extends { nodes: ToneNode[] }>(voice: T): T {
    this.nodes.push(...voice.nodes);
    return voice;
  }

  private sequence<T>(callback: (time: number, value: T) => void, events: T[], subdivision: string): void {
    this.parts.push(new this.tone.Sequence<T>(callback, events, subdivision));
  }

  addMelody(): void {
    const voice = this.own(MELODY_INSTRUMENTS[this.track.melodyInstrument](this.tone, this.buses.reverb));
    const notes = this.track.melody.flat();
    this.sequence<string | null>(
      (time, note) => {
        if (note) voice.play(note, this.track.melodyNoteLength, time, 0.8);
      },
      notes,
      '8n',
    );
  }

  addChords(): void {
    if (this.track.chordStyle === 'strum') this.addStrummedChords();
    else if (this.track.chordStyle === 'arpeggio') this.addArpeggiatedChords();
    else this.addPadChords();
  }

  private addStrummedChords(): void {
    const ukulele = this.own(createUkulele(this.tone, this.buses.reverb));
    const pattern = this.track.strumPattern ?? [];
    this.sequence<ChordStep>(
      (time, step) => {
        const stroke = pattern[step.index];
        if (!stroke) return;
        const notes = CHORD_NOTES[step.chord];
        if (stroke === 'D') {
          notes.forEach((note, order) => ukulele.play(note, '8n', time + order * 0.018, 0.8));
        } else {
          notes
            .slice(1)
            .reverse()
            .forEach((note, order) => ukulele.play(note, '16n', time + order * 0.015, 0.45));
        }
      },
      this.chordSteps,
      '8n',
    );
  }

  private addArpeggiatedChords(): void {
    const arpeggio = this.own(createXylophone(this.tone, this.buses.reverb));
    arpeggio.setVolume(-20);
    const pad = this.own(createPad(this.tone, this.buses.reverb));
    const order = [0, 1, 2, 1, 0, 1, 2, 1];
    this.sequence<ChordStep>(
      (time, step) => {
        const notes = CHORD_NOTES[step.chord];
        arpeggio.play(transposeNote(this.tone, notes[order[step.index]!]!, 12), '8n', time, 0.5);
        if (step.index === 0)
          pad.play(
            notes.map((note) => transposeNote(this.tone, note, -12)),
            '1m',
            time,
            0.5,
          );
      },
      this.chordSteps,
      '8n',
    );
  }

  private addPadChords(): void {
    const pad = this.own(createPad(this.tone, this.buses.reverb));
    pad.setVolume(-20);
    this.sequence<ChordStep>(
      (time, step) => {
        if (step.index !== 0) return;
        pad.play(
          CHORD_NOTES[step.chord].map((note) => transposeNote(this.tone, note, -12)),
          '1m',
          time,
          0.6,
        );
      },
      this.chordSteps,
      '8n',
    );
  }

  addBass(): void {
    const bass = this.own(createBass(this.tone, this.buses.reverb));
    this.sequence<ChordStep>(
      (time, step) => {
        const root = BASS_ROOTS[step.chord];
        if (this.track.bassStyle === 'bouncing') {
          if (step.index === 0) bass.play(root, '4n', time, 0.9);
          if (step.index === 4) bass.play(transposeNote(this.tone, root, 7), '4n', time, 0.75);
        } else if (this.track.bassStyle === 'walking') {
          const line = [
            root,
            null,
            root,
            null,
            transposeNote(this.tone, root, 7),
            null,
            transposeNote(this.tone, root, 12),
            transposeNote(this.tone, root, 10),
          ];
          const note = line[step.index];
          if (note) bass.play(note, '8n', time, 0.8);
        } else if (step.index === 0) {
          bass.play(root, '1m', time, 0.6);
        }
      },
      this.chordSteps,
      '8n',
    );
  }

  addDrums(): void {
    const drums = this.track.drums;
    if (!drums) return;
    for (const [piece, pattern] of Object.entries(drums) as Array<[DrumPiece, string]>) {
      const voice = this.own(DRUM_VOICES[piece](this.tone, this.buses.pauseFilter));
      this.sequence<1 | null>(
        (time, hit) => {
          if (hit) voice.hit(time);
        },
        patternToSteps(pattern),
        '16n',
      );
    }
  }

  addIntenseLayer(startsMuted: boolean): import('tone').Volume {
    const layer = new this.tone.Volume(0).connect(this.buses.pauseFilter);
    layer.mute = startsMuted;
    this.nodes.push(layer);
    const kick = this.own(DRUM_VOICES.kick(this.tone, layer));
    const claps = this.own(DRUM_VOICES.claps(this.tone, layer));
    const shaker = this.own(DRUM_VOICES.shaker(this.tone, layer));
    shaker.setVolume(-22);

    this.sequence<number>(
      (time, step) => {
        if (INTENSE_PATTERN.kick[step] === 'x') kick.hit(time, 1);
        if (INTENSE_PATTERN.claps[step] === 'x') claps.hit(time, 0.9);
        if (INTENSE_PATTERN.shaker[step] === 'x') shaker.hit(time, step % 4 === 2 ? 0.9 : 0.5, '32n');
      },
      Array.from({ length: 16 }, (_, step) => step),
      '16n',
    );
    return layer;
  }

  addAmbience(): void {
    const ambience = this.track.ambience ?? '';
    if (ambience.includes('birds')) this.addBirds();
    if (ambience.includes('crickets')) this.addCrickets();
    if (ambience.includes('wind')) this.addWind();
  }

  private addBirds(): void {
    const bird = new this.tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.005, decay: 0.05, sustain: 0.3, release: 0.04 },
    }).connect(this.buses.pauseFilter);
    bird.volume.value = -30;
    this.nodes.push(bird);
    this.parts.push(
      new this.tone.Loop((time) => {
        if (Math.random() >= 0.45) return;
        const frequency = 2300 + Math.random() * 900;
        bird.triggerAttackRelease(frequency, 0.07, time);
        bird.frequency.exponentialRampToValueAtTime(frequency * 1.45, time + 0.06);
        bird.triggerAttackRelease(frequency * 1.1, 0.06, time + 0.12);
        bird.frequency.exponentialRampToValueAtTime(frequency * 1.6, time + 0.17);
      }, '2n'),
    );
  }

  private addCrickets(): void {
    const cricket = new this.tone.Synth({
      oscillator: { type: 'square' },
      envelope: { attack: 0.003, decay: 0.02, sustain: 0.2, release: 0.01 },
    });
    const filter = new this.tone.Filter(4500, 'bandpass');
    filter.Q.value = 6;
    cricket.connect(filter);
    filter.connect(this.buses.pauseFilter);
    cricket.volume.value = -30;
    this.nodes.push(cricket, filter);
    this.parts.push(
      new this.tone.Loop((time) => {
        if (Math.random() >= 0.7) return;
        for (let chirp = 0; chirp < 3; chirp += 1) cricket.triggerAttackRelease(4400, 0.025, time + chirp * 0.06);
      }, '2n'),
    );
  }

  private addWind(): void {
    const noise = new this.tone.Noise('pink');
    const sweep = new this.tone.AutoFilter({ frequency: 0.07, baseFrequency: 250, octaves: 3 }).start();
    const level = new this.tone.Volume(-34);
    noise.connect(sweep);
    sweep.connect(level);
    level.connect(this.buses.pauseFilter);
    this.nodes.push(noise, sweep, level);
    this.sources.push(noise);
  }
}

/** Builds every layer of a track: melody, chords, bass, drums, the intense layer and ambience. */
export function buildTrack(tone: ToneLibrary, track: TrackDefinition, buses: MixBuses, isIntense: boolean): BuiltTrack {
  const assembler = new TrackAssembler(tone, track, buses);
  assembler.addMelody();
  assembler.addChords();
  assembler.addBass();
  assembler.addDrums();
  const intenseLayer = assembler.addIntenseLayer(!isIntense);
  assembler.addAmbience();

  return {
    nodes: assembler.nodes,
    parts: assembler.parts,
    sources: assembler.sources,
    intenseLayer,
    baseBpm: track.bpm,
  };
}

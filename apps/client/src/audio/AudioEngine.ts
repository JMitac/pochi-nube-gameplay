import type { DuckId } from '@pochi/shared';
import { createDuckVoice, type DuckVoice } from './duckVoices';
import { createEffectSynths, type EffectSynths } from './effectSynths';
import { JINGLES, type JingleId } from './jingles';
import { volumeToDecibels } from './musicTheory';
import { SOUND_EFFECTS, type SoundEffectId } from './soundEffects';
import { buildTrack, type BuiltTrack, type MixBuses } from './trackBuilder';
import { toNightVersion, TRACKS, type TrackId } from './tracks';
import type { ToneLibrary } from './toneTypes';

export type VolumeChannel = 'music' | 'effects';

export interface PlayTrackOptions {
  night?: boolean;
}

interface EngineMix extends MixBuses {
  effects: import('tone').Volume;
  effectsReverb: import('tone').Reverb;
}

const MUSIC_HEADROOM_DB = -6;
const EFFECTS_HEADROOM_DB = -4;
const INTENSE_TEMPO_FACTOR = 1.22;
const PAUSED_FILTER_HZ = 650;
const OPEN_FILTER_HZ = 20000;
const NODE_DISPOSE_DELAY_MS = 2500;
const DUPLICATE_JINGLE_MS = 300;
const TRACK_START_DELAY_S = 0.1;
const RECORDED_QUACK_URLS: Record<DuckId, string> = {
  pochi: '/sounds/quack-pochi.mp3',
  nube: '/sounds/quack-nube.mp3',
};

/**
 * Monophonic synths refuse notes scheduled before their last one (for example a
 * button click during the countdown jingle). A skipped blip is better than a crash.
 */
function playSafely(play: () => void): void {
  try {
    play();
  } catch (error) {
    if (import.meta.env.DEV) console.warn('[audio] sonido omitido:', error);
  }
}

/**
 * TypeScript port of the soundtrack's "PochiAudio" engine (Tone.js 14.8).
 * Everything is generated live: no audio files are needed.
 */
export class AudioEngine {
  private tone: ToneLibrary | null = null;
  private mix: EngineMix | null = null;
  private effectSynths: EffectSynths | null = null;
  private duckVoice: DuckVoice | null = null;
  private recordedQuacks: Partial<Record<DuckId, import('tone').Player>> = {};
  private current: BuiltTrack | null = null;
  private initPromise: Promise<void> | null = null;
  private lastJingle: { id: JingleId | null; atMs: number } = { id: null, atMs: 0 };
  private isTransportStarted = false;

  private currentTrack: TrackId | null = null;
  private isNight = false;
  private isIntense = false;
  private isPaused = false;
  private volumes: Record<VolumeChannel, number> = { music: 70, effects: 85 };

  get isReady(): boolean {
    return this.mix !== null;
  }

  get playingTrack(): TrackId | null {
    return this.currentTrack;
  }

  get playingAtNight(): boolean {
    return this.isNight;
  }

  /** Must be called after a user gesture: browsers block sound until then. */
  init(): Promise<void> {
    this.initPromise ??= this.setUp();
    return this.initPromise;
  }

  private async setUp(): Promise<void> {
    const tone = await import('tone');
    await tone.start();
    const music = new tone.Volume(volumeToDecibels(tone, this.volumes.music) + MUSIC_HEADROOM_DB).toDestination();
    const pauseFilter = new tone.Filter(OPEN_FILTER_HZ, 'lowpass').connect(music);
    const reverb = new tone.Reverb({ decay: 2.8, wet: 0.28 }).connect(pauseFilter);
    const effects = new tone.Volume(volumeToDecibels(tone, this.volumes.effects) + EFFECTS_HEADROOM_DB).toDestination();
    const effectsReverb = new tone.Reverb({ decay: 1.4, wet: 0.18 }).connect(effects);
    await Promise.all([reverb.ready, effectsReverb.ready]);

    this.tone = tone;
    this.mix = { music, pauseFilter, reverb, effects, effectsReverb };
    this.effectSynths = createEffectSynths(tone, effectsReverb);
    this.duckVoice = createDuckVoice(tone, effects);
    void this.loadRecordedQuacks(tone, effects);
  }

  playTrack(trackId: TrackId, options: PlayTrackOptions = {}): void {
    const night = Boolean(options.night);
    if (this.currentTrack === trackId && this.isNight === night) return;
    if (!this.tone || !this.mix) {
      this.currentTrack = trackId;
      this.isNight = night;
      return;
    }
    this.stop();

    const definition = night ? toNightVersion(TRACKS[trackId]) : TRACKS[trackId];
    const transport = this.tone.Transport;
    transport.bpm.value = definition.bpm * (this.isIntense ? INTENSE_TEMPO_FACTOR : 1);
    transport.swing = definition.swing;
    transport.swingSubdivision = '8n';

    // The transport keeps running between tracks; only the parts change.
    // Stopping and restarting it on every screen change upsets Tone's clock.
    const isRunning = this.isTransportStarted;
    const startAt = isRunning ? transport.seconds + TRACK_START_DELAY_S : 0;
    this.current = buildTrack(this.tone, definition, this.mix, this.isIntense);
    this.current.parts.forEach((part) => part.start(startAt));
    this.current.sources.forEach((source) => source.start());
    if (!isRunning) {
      transport.start(`+${TRACK_START_DELAY_S}`);
      this.isTransportStarted = true;
    }
    this.currentTrack = trackId;
    this.isNight = night;
  }

  /** Starts the track that was requested before the engine was ready. */
  resumeRequestedTrack(): void {
    const requested = this.currentTrack;
    if (!requested || this.current) return;
    this.currentTrack = null;
    this.playTrack(requested, { night: this.isNight });
  }

  stop(): void {
    this.currentTrack = null;
    if (!this.current || !this.tone) return;
    const finished = this.current;
    this.current = null;
    finished.parts.forEach((part) => part.dispose());
    finished.sources.forEach((source) => {
      try {
        source.stop();
      } catch {
        // Already stopped.
      }
    });
    setTimeout(() => finished.nodes.forEach((node) => node.dispose()), NODE_DISPOSE_DELAY_MS);
  }

  /** "¡Lluvia de frutas!": faster tempo plus the extra drum layer. */
  setIntense(active: boolean): void {
    // Ramping the tempo to the value it already has breaks Tone's tick maths, so only ramp on a real change.
    if (this.isIntense === active) return;
    this.isIntense = active;
    if (!this.current || !this.tone) return;
    this.current.intenseLayer.mute = !active;
    this.tone.Transport.bpm.rampTo(this.current.baseBpm * (active ? INTENSE_TEMPO_FACTOR : 1), 0.8);
  }

  /** Pause: the music sounds muffled, "as if behind a door". */
  setPaused(active: boolean): void {
    this.isPaused = active;
    this.mix?.pauseFilter.frequency.rampTo(active ? PAUSED_FILTER_HZ : OPEN_FILTER_HZ, 0.4);
  }

  setVolume(channel: VolumeChannel, value: number): void {
    const volume = Math.max(0, Math.min(100, Number(value) || 0));
    this.volumes[channel] = volume;
    if (!this.tone || !this.mix) return;
    const bus = channel === 'music' ? this.mix.music : this.mix.effects;
    const headroom = channel === 'music' ? MUSIC_HEADROOM_DB : EFFECTS_HEADROOM_DB;
    bus.volume.rampTo(volumeToDecibels(this.tone, volume) + headroom, 0.1);
  }

  playEffect(effectId: SoundEffectId): void {
    const { tone, effectSynths } = this;
    if (!tone || !effectSynths) return;
    playSafely(() => SOUND_EFFECTS[effectId](effectSynths, tone.now() + 0.01));
  }

  playJingle(jingleId: JingleId): void {
    const { tone, effectSynths } = this;
    if (!tone || !effectSynths) return;
    const nowMs = performance.now();
    if (this.lastJingle.id === jingleId && nowMs - this.lastJingle.atMs < DUPLICATE_JINGLE_MS) return;
    this.lastJingle = { id: jingleId, atMs: nowMs };
    playSafely(() => JINGLES[jingleId](effectSynths, tone.now() + 0.05));
  }

  playQuack(duckId: DuckId): void {
    const { tone, duckVoice } = this;
    if (!tone || !duckVoice) return;
    const recorded = this.recordedQuacks[duckId];
    if (recorded?.loaded) {
      playSafely(() => recorded.start());
      return;
    }
    playSafely(() => duckVoice.quack(duckId, tone.now() + 0.01));
  }

  get pausedState(): boolean {
    return this.isPaused;
  }

  private async loadRecordedQuacks(tone: ToneLibrary, destination: import('tone').Volume): Promise<void> {
    for (const duckId of Object.keys(RECORDED_QUACK_URLS) as DuckId[]) {
      try {
        const response = await fetch(RECORDED_QUACK_URLS[duckId], { method: 'HEAD' });
        const isAudio = response.ok && (response.headers.get('content-type') ?? '').startsWith('audio');
        if (!isAudio) continue;
        const player = new tone.Player().connect(destination);
        await player.load(RECORDED_QUACK_URLS[duckId]);
        this.recordedQuacks[duckId] = player;
      } catch {
        // No recording yet: the synth quack is used.
      }
    }
  }
}

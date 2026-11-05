import { useEffect } from 'react';
import { audioEngine } from '../audio/audioInstance';
import type { TrackId } from '../audio/tracks';
import { useIsNight } from './useIsNight';

/** Plays the track that belongs to the current screen (day or night version). */
export function useScreenMusic(trackId: TrackId | null): void {
  const isNight = useIsNight();

  useEffect(() => {
    if (trackId) audioEngine.playTrack(trackId, { night: isNight });
    else audioEngine.stop();
  }, [trackId, isNight]);
}

import { useEffect, useRef } from 'react';
import { FINAL_TICK_TOCK_MS } from '@pochi/shared';
import { audioEngine } from '../../audio/audioInstance';
import type { HudSnapshot } from '../../state/hudStore';

/** "Tic-tac" every second during the last 10 seconds of the match. */
export function useMatchSounds(hud: HudSnapshot | null): void {
  const lastTickSecond = useRef<number | null>(null);
  const remainingMs = hud?.remainingMs ?? Infinity;
  const isPlaying = hud ? !hud.isCountingDown : false;

  useEffect(() => {
    if (!isPlaying || remainingMs > FINAL_TICK_TOCK_MS || remainingMs <= 0) return;
    const second = Math.ceil(remainingMs / 1000);
    if (lastTickSecond.current === second) return;
    lastTickSecond.current = second;
    audioEngine.playEffect('tick');
  }, [isPlaying, remainingMs]);
}

import { create } from 'zustand';
import type { DuckId, PhaseId } from '@pochi/shared';

export interface HudPlayer {
  sessionId: string;
  name: string;
  duckId: DuckId;
  score: number;
}

export interface HudSnapshot {
  remainingMs: number;
  countdownRemainingMs: number;
  isCountingDown: boolean;
  phaseId: PhaseId;
  teamScore: number;
  players: HudPlayer[];
  myDuckId: DuckId;
  affectionPercent: number;
  abilityCooldownMs: number;
  abilityCooldownFraction: number;
  isTogether: boolean;
  isServerPaused: boolean;
}

interface HudStoreState {
  hud: HudSnapshot | null;
  setHud(hud: HudSnapshot): void;
  clear(): void;
}

/** The numbers shown on the in-game HUD, refreshed a few times per second by the game loop. */
export const useHudStore = create<HudStoreState>((set) => ({
  hud: null,
  setHud: (hud) => set({ hud }),
  clear: () => set({ hud: null }),
}));

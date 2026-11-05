import { create } from 'zustand';
import type { DuckId, FoodKind, GameMode, MapId } from '@pochi/shared';

export interface PlayerResult {
  sessionId: string;
  name: string;
  duckId: DuckId;
  score: number;
  catches: Partial<Record<FoodKind, number>>;
}

export interface MatchResult {
  mode: GameMode;
  mapId: MapId;
  teamScore: number;
  winnerSessionId: string;
  mySessionId: string;
  players: PlayerResult[];
  isNewRecord: boolean;
  previousRecord: number;
}

interface ResultsState {
  lastResult: MatchResult | null;
  setLastResult(result: MatchResult): void;
}

export const useResultsStore = create<ResultsState>((set) => ({
  lastResult: null,
  setLastResult: (lastResult) => set({ lastResult }),
}));

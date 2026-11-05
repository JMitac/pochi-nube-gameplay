import { create } from 'zustand';
import type { DuckId, GameMode, MapId, MatchStatus, RoomVisibility } from '@pochi/shared';

export interface LobbyPlayer {
  sessionId: string;
  name: string;
  duckId: DuckId;
  ready: boolean;
}

export interface RoomSnapshot {
  roomCode: string;
  mode: GameMode;
  mapId: MapId;
  visibility: RoomVisibility;
  status: MatchStatus;
  maxPlayers: number;
  hostSessionId: string;
  players: LobbyPlayer[];
}

interface RoomStoreState {
  mySessionId: string | null;
  snapshot: RoomSnapshot | null;
  setConnected(sessionId: string): void;
  setSnapshot(snapshot: RoomSnapshot): void;
  clear(): void;
}

/** What the menus need to know about the current room (the game loop reads the live state). */
export const useRoomStore = create<RoomStoreState>((set) => ({
  mySessionId: null,
  snapshot: null,
  setConnected: (mySessionId) => set({ mySessionId }),
  setSnapshot: (snapshot) => set({ snapshot }),
  clear: () => set({ mySessionId: null, snapshot: null }),
}));

export function selectMe(state: RoomStoreState): LobbyPlayer | undefined {
  return state.snapshot?.players.find((player) => player.sessionId === state.mySessionId);
}

export function selectPartner(state: RoomStoreState): LobbyPlayer | undefined {
  return state.snapshot?.players.find((player) => player.sessionId !== state.mySessionId);
}

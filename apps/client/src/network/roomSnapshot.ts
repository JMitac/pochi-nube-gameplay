import type { PicnicStateView } from '@pochi/shared';
import type { LobbyPlayer, RoomSnapshot } from '../state/roomStore';

/** Copies the parts of the live state that the menus show. */
export function toRoomSnapshot(state: PicnicStateView): RoomSnapshot {
  const players: LobbyPlayer[] = [];
  state.players.forEach((player) => {
    players.push({ sessionId: player.sessionId, name: player.name, duckId: player.duckId, ready: player.ready });
  });

  return {
    roomCode: state.roomCode,
    mode: state.mode,
    mapId: state.mapId,
    visibility: state.visibility,
    status: state.status,
    maxPlayers: state.maxPlayers,
    hostSessionId: state.hostSessionId,
    players,
  };
}

export function snapshotsAreEqual(a: RoomSnapshot | null, b: RoomSnapshot): boolean {
  return a !== null && JSON.stringify(a) === JSON.stringify(b);
}

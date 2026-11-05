import { DUCK_IDS, otherDuck, SPAWN_POINTS, type DuckId } from '@pochi/shared';
import type { PicnicState } from '../rooms/schema/PicnicState';
import { PlayerState } from '../rooms/schema/PlayerState';

export interface NewPlayer {
  sessionId: string;
  name: string;
  preferredDuck?: DuckId;
}

/** Waiting-room rules: who is the host, which duck each one plays and who is ready. */
export class LobbyService {
  constructor(private readonly state: PicnicState) {}

  addPlayer(newPlayer: NewPlayer): PlayerState {
    const player = new PlayerState();
    player.sessionId = newPlayer.sessionId;
    player.name = newPlayer.name;
    player.duckId = this.pickDuck(newPlayer.preferredDuck);
    const spawn = SPAWN_POINTS[player.duckId];
    player.x = spawn.x;
    player.y = spawn.y;

    this.state.players.set(player.sessionId, player);
    if (!this.state.hostSessionId) this.state.hostSessionId = player.sessionId;
    return player;
  }

  removePlayer(sessionId: string): void {
    this.state.players.delete(sessionId);
    if (this.state.hostSessionId !== sessionId) return;
    const nextHost = Array.from(this.state.players.keys())[0];
    this.state.hostSessionId = nextHost ?? '';
  }

  /** A duck can only be chosen if the other player does not have it. */
  chooseDuck(sessionId: string, duckId: DuckId): void {
    const player = this.state.players.get(sessionId);
    if (!player || this.state.status !== 'waiting' || !DUCK_IDS.includes(duckId)) return;
    if (this.isDuckTakenByOther(sessionId, duckId)) return;
    player.duckId = duckId;
    player.ready = false;
  }

  /** Returns true when everybody is in and ready, so the match can start. */
  setReady(sessionId: string, ready: boolean): boolean {
    const player = this.state.players.get(sessionId);
    if (!player || this.state.status !== 'waiting') return false;
    player.ready = ready;
    return this.isEveryoneReady();
  }

  backToWaitingRoom(): void {
    this.state.status = 'waiting';
    this.state.isPaused = false;
    for (const player of this.state.players.values()) player.ready = false;
  }

  private isEveryoneReady(): boolean {
    const players = Array.from(this.state.players.values());
    return players.length === this.state.maxPlayers && players.every((player) => player.ready);
  }

  private pickDuck(preferred: DuckId | undefined): DuckId {
    const taken = Array.from(this.state.players.values()).map((player) => player.duckId);
    const wanted = preferred ?? 'pochi';
    return taken.includes(wanted) ? otherDuck(wanted) : wanted;
  }

  private isDuckTakenByOther(sessionId: string, duckId: DuckId): boolean {
    for (const other of this.state.players.values()) {
      if (other.sessionId !== sessionId && other.duckId === duckId) return true;
    }
    return false;
  }
}

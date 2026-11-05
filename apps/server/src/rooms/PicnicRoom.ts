import { Room, type Client } from '@colyseus/core';
import {
  CLIENT_MESSAGES,
  isOneOf,
  DUCK_IDS,
  MAP_DEFINITIONS,
  MAX_PLAYERS_PER_ROOM,
  SERVER_EVENTS,
  SERVER_TICK_MS,
  SOLO_PLAYERS_PER_ROOM,
  STATE_PATCH_MS,
  type ChooseDuckPayload,
  type CreateRoomOptions,
  type MovePayload,
  type RoomMetadata,
  type SetReadyPayload,
} from '@pochi/shared';
import { IdGenerator, mathRandomSource, type MatchContext } from '../game/MatchContext';
import { MatchEngine } from '../game/MatchEngine';
import { LobbyService } from '../lobby/LobbyService';
import { roomCodeRegistry } from '../services/RoomCodeRegistry';
import { parseCreateRoomOptions, parsePlayerName } from './roomOptions';
import { RoomEventSink } from './RoomEventSink';
import { PicnicState } from './schema/PicnicState';

const QUACK_COOLDOWN_MS = 400;

/** One picnic: up to two ducks, each from their own device. */
export class PicnicRoom extends Room<PicnicState> {
  private engine!: MatchEngine;
  private lobby!: LobbyService;
  private settings!: CreateRoomOptions;

  override onCreate(rawOptions: unknown): void {
    this.settings = parseCreateRoomOptions(rawOptions);
    this.setState(this.createInitialState());
    this.maxClients = this.state.maxPlayers;

    this.lobby = new LobbyService(this.state);
    this.engine = new MatchEngine(this.createMatchContext());

    this.publishMetadata();
    if (this.settings.visibility === 'private') void this.setPrivate(true);

    this.registerMessageHandlers();
    this.setPatchRate(STATE_PATCH_MS);
    this.setSimulationInterval((deltaMs) => this.tick(deltaMs), SERVER_TICK_MS);
  }

  override onJoin(client: Client, rawOptions: unknown): void {
    const isFirstPlayer = this.state.players.size === 0;
    const player = this.lobby.addPlayer({
      sessionId: client.sessionId,
      name: parsePlayerName(rawOptions),
      preferredDuck: isFirstPlayer ? this.settings.duckId : undefined,
    });
    this.broadcast(SERVER_EVENTS.playerJoined, { sessionId: player.sessionId, duckId: player.duckId }, { except: client });
  }

  override onLeave(client: Client): void {
    this.lobby.removePlayer(client.sessionId);
    if (this.state.status === 'countdown') this.lobby.backToWaitingRoom();
    this.refreshLock();
  }

  override onDispose(): void {
    roomCodeRegistry.release(this.state.roomCode);
  }

  private createInitialState(): PicnicState {
    const state = new PicnicState();
    state.mode = this.settings.mode;
    state.mapId = this.settings.mapId;
    state.visibility = this.settings.visibility;
    state.roomCode = roomCodeRegistry.reserve();
    state.maxPlayers = this.settings.mode === 'solo' ? SOLO_PLAYERS_PER_ROOM : MAX_PLAYERS_PER_ROOM;
    return state;
  }

  private createMatchContext(): MatchContext {
    return {
      state: this.state,
      map: MAP_DEFINITIONS[this.settings.mapId],
      events: new RoomEventSink(this),
      random: mathRandomSource,
      ids: new IdGenerator(),
    };
  }

  private publishMetadata(): void {
    const metadata: RoomMetadata = {
      roomCode: this.state.roomCode,
      hostName: this.settings.playerName,
      mode: this.settings.mode,
      mapId: this.settings.mapId,
      visibility: this.settings.visibility,
    };
    void this.setMetadata(metadata);
  }

  private registerMessageHandlers(): void {
    this.onMessage(CLIENT_MESSAGES.move, (client, payload: MovePayload) => this.engine.move(client.sessionId, payload));
    this.onMessage(CLIENT_MESSAGES.jump, (client) => this.engine.jump(client.sessionId));
    this.onMessage(CLIENT_MESSAGES.useAbility, (client) => this.engine.useAbility(client.sessionId));
    this.onMessage(CLIENT_MESSAGES.quack, (client) => this.relayQuack(client));
    this.onMessage(CLIENT_MESSAGES.chooseDuck, (client, payload: ChooseDuckPayload) => this.chooseDuck(client, payload));
    this.onMessage(CLIENT_MESSAGES.setReady, (client, payload: SetReadyPayload) => this.setReady(client, payload));
    this.onMessage(CLIENT_MESSAGES.togglePause, () => this.togglePause());
    this.onMessage(CLIENT_MESSAGES.rematch, () => this.rematch());
  }

  private tick(deltaMs: number): void {
    this.engine.update(deltaMs);
  }

  private chooseDuck(client: Client, payload: ChooseDuckPayload): void {
    if (isOneOf(DUCK_IDS, payload?.duckId)) this.lobby.chooseDuck(client.sessionId, payload.duckId);
  }

  private setReady(client: Client, payload: SetReadyPayload): void {
    const everyoneReady = this.lobby.setReady(client.sessionId, Boolean(payload?.ready));
    if (!everyoneReady) return;
    void this.lock();
    this.engine.startCountdown();
  }

  /** Only a solo match can really stop the clock; with two players the game goes on. */
  private togglePause(): void {
    if (this.state.mode === 'solo') this.engine.togglePause();
  }

  private rematch(): void {
    if (this.state.status !== 'finished') return;
    this.lobby.backToWaitingRoom();
    this.refreshLock();
  }

  private relayQuack(client: Client): void {
    const player = this.state.players.get(client.sessionId);
    const now = Date.now();
    if (!player || now - player.lastQuackAtRealMs < QUACK_COOLDOWN_MS) return;
    player.lastQuackAtRealMs = now;
    this.broadcast(SERVER_EVENTS.quacked, { sessionId: player.sessionId, duckId: player.duckId });
  }

  private refreshLock(): void {
    const hasFreeSeat = this.state.players.size < this.state.maxPlayers;
    if (this.state.status === 'waiting' && hasFreeSeat) void this.unlock();
    else void this.lock();
  }
}

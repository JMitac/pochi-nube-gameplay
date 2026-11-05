import { Client, type Room } from 'colyseus.js';
import {
  CLIENT_MESSAGES,
  ROOM_NAME,
  SERVER_EVENTS,
  type CreateRoomOptions,
  type DuckId,
  type JoinRoomOptions,
  type MovementInput,
  type PicnicStateView,
  type ServerEventPayloads,
  type ServerEventType,
} from '@pochi/shared';
import { useRoomStore } from '../state/roomStore';
import { snapshotsAreEqual, toRoomSnapshot } from './roomSnapshot';
import { SERVER_URL } from './serverConfig';

type EventListener<T extends ServerEventType> = (payload: ServerEventPayloads[T]) => void;
type AnyListener = (payload: unknown) => void;

/**
 * The connection to the current picnic room. Screens talk to the server only
 * through this class: it knows how to join, leave and send each command.
 */
export class RoomSession {
  private readonly client = new Client(SERVER_URL);
  private room: Room<PicnicStateView> | null = null;
  private readonly listeners = new Map<ServerEventType, Set<AnyListener>>();
  private readonly leaveListeners = new Set<() => void>();
  private readonly patchListeners = new Set<(state: PicnicStateView) => void>();

  get state(): PicnicStateView | null {
    return this.room?.state ?? null;
  }

  get sessionId(): string | null {
    return this.room?.sessionId ?? null;
  }

  get isConnected(): boolean {
    return this.room !== null;
  }

  async createRoom(options: CreateRoomOptions): Promise<void> {
    await this.leave();
    this.attach(await this.client.create<PicnicStateView>(ROOM_NAME, options));
  }

  async joinRoom(roomId: string, options: JoinRoomOptions): Promise<void> {
    await this.leave();
    this.attach(await this.client.joinById<PicnicStateView>(roomId, options));
  }

  async leave(): Promise<void> {
    const room = this.room;
    if (!room) return;
    this.room = null;
    useRoomStore.getState().clear();
    try {
      await room.leave(true);
    } catch {
      // The connection was already closed.
    }
  }

  on<T extends ServerEventType>(type: T, listener: EventListener<T>): () => void {
    const set = this.listeners.get(type) ?? new Set<AnyListener>();
    set.add(listener as AnyListener);
    this.listeners.set(type, set);
    return () => set.delete(listener as AnyListener);
  }

  /** Called every time a state patch arrives from the server (~20 per second). */
  onPatch(listener: (state: PicnicStateView) => void): () => void {
    this.patchListeners.add(listener);
    return () => this.patchListeners.delete(listener);
  }

  onLeave(listener: () => void): () => void {
    this.leaveListeners.add(listener);
    return () => this.leaveListeners.delete(listener);
  }

  // ---- Commands ----

  move(input: MovementInput): void {
    this.room?.send(CLIENT_MESSAGES.move, input);
  }

  jump(): void {
    this.room?.send(CLIENT_MESSAGES.jump);
  }

  useAbility(): void {
    this.room?.send(CLIENT_MESSAGES.useAbility);
  }

  quack(): void {
    this.room?.send(CLIENT_MESSAGES.quack);
  }

  chooseDuck(duckId: DuckId): void {
    this.room?.send(CLIENT_MESSAGES.chooseDuck, { duckId });
  }

  setReady(ready: boolean): void {
    this.room?.send(CLIENT_MESSAGES.setReady, { ready });
  }

  togglePause(): void {
    this.room?.send(CLIENT_MESSAGES.togglePause);
  }

  requestRematch(): void {
    this.room?.send(CLIENT_MESSAGES.rematch);
  }

  // ---- Wiring ----

  private attach(room: Room<PicnicStateView>): void {
    this.room = room;
    useRoomStore.getState().setConnected(room.sessionId);

    room.onStateChange((state) => {
      this.mirrorState(state);
      this.patchListeners.forEach((listener) => listener(state));
    });
    for (const type of Object.values(SERVER_EVENTS)) {
      room.onMessage(type, (payload: unknown) => this.emit(type, payload));
    }
    room.onLeave(() => {
      if (this.room !== room) return;
      this.room = null;
      useRoomStore.getState().clear();
      this.leaveListeners.forEach((listener) => listener());
    });
  }

  private mirrorState(state: PicnicStateView): void {
    const store = useRoomStore.getState();
    const snapshot = toRoomSnapshot(state);
    if (!snapshotsAreEqual(store.snapshot, snapshot)) store.setSnapshot(snapshot);
  }

  private emit(type: ServerEventType, payload: unknown): void {
    this.listeners.get(type)?.forEach((listener) => listener(payload));
  }
}

export const roomSession = new RoomSession();

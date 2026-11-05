import type { Room } from '@colyseus/core';
import type { ServerEventPayloads, ServerEventType } from '@pochi/shared';
import type { MatchEventSink } from '../game/MatchContext';

/** Delivers engine events through the Colyseus room. */
export class RoomEventSink implements MatchEventSink {
  constructor(private readonly room: Room) {}

  broadcast<T extends ServerEventType>(type: T, payload: ServerEventPayloads[T]): void {
    this.room.broadcast(type, payload);
  }

  sendTo<T extends ServerEventType>(sessionId: string, type: T, payload: ServerEventPayloads[T]): void {
    const client = this.room.clients.find((candidate) => candidate.sessionId === sessionId);
    client?.send(type, payload);
  }
}

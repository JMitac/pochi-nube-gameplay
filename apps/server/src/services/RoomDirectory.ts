import { matchMaker } from '@colyseus/core';
import { normalizeRoomCode, ROOM_NAME, type PublicRoomSummary, type RoomMetadata } from '@pochi/shared';

interface ListedRoom {
  roomId: string;
  clients: number;
  maxClients: number;
  locked: boolean;
  private: boolean;
  metadata?: Partial<RoomMetadata>;
}

/** Read-only view of the live rooms, for the "Salas públicas" list and the code search. */
export class RoomDirectory {
  async listPublicRooms(): Promise<PublicRoomSummary[]> {
    const rooms = await this.queryRooms();
    return rooms
      .filter((room) => !room.private && !room.locked && room.clients < room.maxClients)
      .map((room) => ({
        roomId: room.roomId,
        hostName: room.metadata?.hostName ?? 'Patito',
        mode: room.metadata?.mode ?? 'coop',
        mapId: room.metadata?.mapId ?? 'meadow',
        clients: room.clients,
        maxClients: room.maxClients,
      }));
  }

  async findRoomIdByCode(rawCode: string): Promise<string | undefined> {
    const code = normalizeRoomCode(rawCode);
    const rooms = await this.queryRooms();
    return rooms.find((room) => room.metadata?.roomCode === code && !room.locked)?.roomId;
  }

  private async queryRooms(): Promise<ListedRoom[]> {
    const rooms = await matchMaker.query({ name: ROOM_NAME });
    return rooms as unknown as ListedRoom[];
  }
}

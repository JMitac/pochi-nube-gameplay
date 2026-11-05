import type { PublicRoomSummary, RoomLookupResult } from '@pochi/shared';
import { API_URL } from './serverConfig';

export class RoomNotFoundError extends Error {
  constructor() {
    super('No encontramos esa sala. Revisa el código.');
  }
}

/** "Salas públicas" list. */
export async function fetchPublicRooms(): Promise<PublicRoomSummary[]> {
  const response = await fetch(`${API_URL}/rooms`);
  if (!response.ok) throw new Error('No se pudo cargar la lista de salas');
  return (await response.json()) as PublicRoomSummary[];
}

/** Turns a code like CUAC-7K2 into the id Colyseus needs to join. */
export async function findRoomIdByCode(code: string): Promise<string> {
  const response = await fetch(`${API_URL}/rooms/code/${encodeURIComponent(code)}`);
  if (response.status === 404) throw new RoomNotFoundError();
  if (!response.ok) throw new Error('No se pudo buscar la sala');
  const result = (await response.json()) as RoomLookupResult;
  return result.roomId;
}

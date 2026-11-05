import type { DuckId, GameMode, MapId, RoomVisibility } from '../domain/ids';

export const PLAYER_NAME_MAX_LENGTH = 16;
export const ROOM_CODE_PREFIX = 'CUAC';
export const ROOM_CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export const ROOM_CODE_SUFFIX_LENGTH = 3;

export interface CreateRoomOptions {
  visibility: RoomVisibility;
  mode: GameMode;
  mapId: MapId;
  playerName: string;
  /** Only used in solo mode, where the player picks the duck before playing. */
  duckId?: DuckId;
}

export interface JoinRoomOptions {
  playerName: string;
}

export interface RoomMetadata {
  roomCode: string;
  hostName: string;
  mode: GameMode;
  mapId: MapId;
  visibility: RoomVisibility;
}

export interface PublicRoomSummary {
  roomId: string;
  hostName: string;
  mode: GameMode;
  mapId: MapId;
  clients: number;
  maxClients: number;
}

export interface RoomLookupResult {
  roomId: string;
}

export function sanitizePlayerName(rawName: unknown): string {
  const text = typeof rawName === 'string' ? rawName.trim() : '';
  const safe = text.replace(/[^\p{L}\p{N} _-]/gu, '').slice(0, PLAYER_NAME_MAX_LENGTH);
  return safe.length > 0 ? safe : 'Patito';
}

export function normalizeRoomCode(rawCode: string): string {
  const compact = rawCode.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (compact.startsWith(ROOM_CODE_PREFIX) && compact.length > ROOM_CODE_PREFIX.length) {
    return `${ROOM_CODE_PREFIX}-${compact.slice(ROOM_CODE_PREFIX.length)}`;
  }
  return rawCode.toUpperCase().trim();
}

export function generateRoomCode(random: () => number = Math.random): string {
  let suffix = '';
  for (let index = 0; index < ROOM_CODE_SUFFIX_LENGTH; index += 1) {
    const position = Math.floor(random() * ROOM_CODE_ALPHABET.length);
    suffix += ROOM_CODE_ALPHABET[position];
  }
  return `${ROOM_CODE_PREFIX}-${suffix}`;
}

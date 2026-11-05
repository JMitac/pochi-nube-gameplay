import {
  DUCK_IDS,
  GAME_MODES,
  isOneOf,
  MAP_IDS,
  ROOM_VISIBILITIES,
  sanitizePlayerName,
  type CreateRoomOptions,
} from '@pochi/shared';

/** Never trust what the client sends: every option falls back to a safe default. */
export function parseCreateRoomOptions(raw: unknown): CreateRoomOptions {
  const options = (raw ?? {}) as Record<string, unknown>;
  const mode = isOneOf(GAME_MODES, options.mode) ? options.mode : 'coop';
  return {
    mode,
    mapId: isOneOf(MAP_IDS, options.mapId) ? options.mapId : 'meadow',
    // Solo rooms are never listed: nobody else can join them.
    visibility: mode === 'solo' ? 'private' : isOneOf(ROOM_VISIBILITIES, options.visibility) ? options.visibility : 'private',
    playerName: sanitizePlayerName(options.playerName),
    duckId: isOneOf(DUCK_IDS, options.duckId) ? options.duckId : undefined,
  };
}

export function parsePlayerName(raw: unknown): string {
  return sanitizePlayerName((raw as Record<string, unknown> | undefined)?.playerName);
}

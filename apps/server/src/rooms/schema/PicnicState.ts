import { MapSchema, Schema, type } from '@colyseus/schema';
import type { GameMode, MapId, MatchStatus, PhaseId, RoomVisibility } from '@pochi/shared';
import { PlayerState } from './PlayerState';
import { DecoyState, FoodState, PuddleState, RainCloudState } from './WorldEntities';

export class PicnicState extends Schema {
  @type('string') status: MatchStatus = 'waiting';
  @type('string') mode: GameMode = 'coop';
  @type('string') mapId: MapId = 'meadow';
  @type('string') visibility: RoomVisibility = 'private';
  @type('string') roomCode = '';
  @type('string') hostSessionId = '';
  @type('number') maxPlayers = 2;

  @type('number') countdownRemainingMs = 0;
  @type('number') elapsedMs = 0;
  @type('string') phaseId: PhaseId = 'calm';
  @type('boolean') isPaused = false;

  @type('number') teamScore = 0;
  @type('string') winnerSessionId = '';

  @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
  @type({ map: FoodState }) foods = new MapSchema<FoodState>();
  @type({ map: PuddleState }) puddles = new MapSchema<PuddleState>();
  @type({ map: RainCloudState }) rainClouds = new MapSchema<RainCloudState>();
  @type({ map: DecoyState }) decoys = new MapSchema<DecoyState>();
}

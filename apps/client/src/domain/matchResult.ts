import { FOOD_KINDS, type FoodKind, type PicnicStateView } from '@pochi/shared';
import type { MatchResult, PlayerResult } from '../state/resultsStore';
import { saveSoloScore } from './soloRecords';

/** Freezes the final numbers of a finished match for the results screen. */
export function buildMatchResult(state: PicnicStateView, mySessionId: string): MatchResult {
  const players: PlayerResult[] = [];
  state.players.forEach((player) => {
    const catches: Partial<Record<FoodKind, number>> = {};
    for (const kind of FOOD_KINDS) {
      const count = player.catches.get(kind);
      if (count) catches[kind] = count;
    }
    players.push({ sessionId: player.sessionId, name: player.name, duckId: player.duckId, score: player.score, catches });
  });
  players.sort((a, b) => Number(a.duckId !== 'pochi') - Number(b.duckId !== 'pochi'));

  const myScore = players.find((player) => player.sessionId === mySessionId)?.score ?? 0;
  const record = state.mode === 'solo' ? saveSoloScore(state.mapId, myScore) : { isNewRecord: false, previousRecord: 0 };

  return {
    mode: state.mode,
    mapId: state.mapId,
    teamScore: state.teamScore,
    winnerSessionId: state.winnerSessionId,
    mySessionId,
    players,
    isNewRecord: record.isNewRecord,
    previousRecord: record.previousRecord,
  };
}

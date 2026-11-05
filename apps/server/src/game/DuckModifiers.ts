import { BOOSTED_CATCH_RADIUS_FACTOR, CATCH_RADIUS, computeSpeedFactor, isNearRivalDecoy } from '@pochi/shared';
import type { PlayerState } from '../rooms/schema/PlayerState';
import { matchTimeOf, type MatchContext } from './MatchContext';

/** Answers "how fast / how far can this duck reach right now?" in a single place. */
export function isStunned(context: MatchContext, player: PlayerState): boolean {
  return matchTimeOf(context) < player.stunnedUntilMs;
}

export function speedFactorFor(context: MatchContext, player: PlayerState): number {
  return computeSpeedFactor({
    nowMs: matchTimeOf(context),
    duckId: player.duckId,
    stunnedUntilMs: player.stunnedUntilMs,
    speedBoostUntilMs: player.speedBoostUntilMs,
    dizzyUntilMs: player.dizzyUntilMs,
    inPuddle: player.inPuddle,
    isDistractedByDecoy: isNearRivalDecoy(player, player.sessionId, context.state.decoys.values()),
  });
}

export function catchRadiusFor(context: MatchContext, player: PlayerState): number {
  const boosted = matchTimeOf(context) < player.affectionBoostUntilMs;
  return boosted ? CATCH_RADIUS * BOOSTED_CATCH_RADIUS_FACTOR : CATCH_RADIUS;
}

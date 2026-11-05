import { distance, FLAP_COOLDOWN_MS, FLAP_PUSH_DISTANCE, FLAP_RANGE, keepInsideWalkableArea, SERVER_EVENTS } from '@pochi/shared';
import type { PlayerState } from '../rooms/schema/PlayerState';
import { matchTimeOf, partnerOf, type MatchContext } from './MatchContext';
import type { ScoreKeeper } from './score/ScoreKeeper';

/** Versus · aleteo: jumping next to the rival pushes it a little and steals a fruit. */
export class FlapAction {
  constructor(private readonly scoreKeeper: ScoreKeeper) {}

  tryFlap(context: MatchContext, attacker: PlayerState): void {
    if (context.state.mode !== 'versus') return;
    const now = matchTimeOf(context);
    const victim = partnerOf(context, attacker);
    if (!victim || now < attacker.flapReadyAtMs || distance(attacker, victim) > FLAP_RANGE) return;

    attacker.flapReadyAtMs = now + FLAP_COOLDOWN_MS;
    this.push(context, attacker, victim);
    const stolenPoints = this.scoreKeeper.stealPoints(context, attacker, victim);
    context.events.broadcast(SERVER_EVENTS.flapHit, {
      attackerSessionId: attacker.sessionId,
      victimSessionId: victim.sessionId,
      stolenPoints,
    });
  }

  private push(context: MatchContext, attacker: PlayerState, victim: PlayerState): void {
    const gap = Math.max(1, distance(attacker, victim));
    const pushed = keepInsideWalkableArea(
      {
        x: victim.x + ((victim.x - attacker.x) / gap) * FLAP_PUSH_DISTANCE,
        y: victim.y + ((victim.y - attacker.y) / gap) * FLAP_PUSH_DISTANCE * 0.5,
      },
      context.map,
    );
    victim.x = pushed.x;
    victim.y = pushed.y;
  }
}

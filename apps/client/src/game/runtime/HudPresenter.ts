import {
  ABILITY_COOLDOWN_MS,
  AFFECTION_MAX,
  distance,
  remainingMatchMs,
  TOGETHER_DISTANCE,
  type PicnicStateView,
  type PlayerView,
} from '@pochi/shared';
import type { HudPlayer, HudSnapshot } from '../../state/hudStore';

const HUD_REFRESH_MS = 100;

/** Builds the numbers of the HUD a few times per second (React does not need 60 updates). */
export class HudPresenter {
  private lastPublishedAtMs = 0;

  constructor(private readonly publish: (snapshot: HudSnapshot) => void) {}

  update(state: PicnicStateView, mySessionId: string, matchTimeMs: number, nowMs: number): void {
    if (nowMs - this.lastPublishedAtMs < HUD_REFRESH_MS) return;
    this.lastPublishedAtMs = nowMs;

    const me = state.players.get(mySessionId);
    if (!me) return;
    const players: HudPlayer[] = [];
    state.players.forEach((player) =>
      players.push({ sessionId: player.sessionId, name: player.name, duckId: player.duckId, score: player.score }),
    );
    players.sort((a, b) => Number(a.duckId !== 'pochi') - Number(b.duckId !== 'pochi'));

    const cooldownMs = Math.max(0, me.abilityReadyAtMs - matchTimeMs);
    this.publish({
      remainingMs: remainingMatchMs(matchTimeMs),
      countdownRemainingMs: state.countdownRemainingMs,
      isCountingDown: state.status === 'countdown',
      phaseId: state.phaseId,
      teamScore: state.teamScore,
      players,
      myDuckId: me.duckId,
      affectionPercent: (me.affection / AFFECTION_MAX) * 100,
      abilityCooldownMs: cooldownMs,
      abilityCooldownFraction: cooldownMs / ABILITY_COOLDOWN_MS,
      isTogether: this.isTogether(state, me),
      isServerPaused: state.isPaused,
    });
  }

  private isTogether(state: PicnicStateView, me: PlayerView): boolean {
    if (state.mode !== 'coop') return false;
    let together = false;
    state.players.forEach((other) => {
      if (other.sessionId !== me.sessionId && distance(other, me) < TOGETHER_DISTANCE) together = true;
    });
    return together;
  }
}

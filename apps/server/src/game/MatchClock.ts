import { COUNTDOWN_DURATION_MS, MATCH_DURATION_MS, resolvePhase, SERVER_EVENTS } from '@pochi/shared';
import { playersOf, type MatchContext } from './MatchContext';

export type ClockTickResult = 'idle' | 'simulate' | 'started' | 'finished';

/** Owns the match timeline: countdown → playing (three phases) → finished. */
export class MatchClock {
  startCountdown(context: MatchContext): void {
    context.state.status = 'countdown';
    context.state.countdownRemainingMs = COUNTDOWN_DURATION_MS;
    context.state.elapsedMs = 0;
    context.state.phaseId = 'calm';
    context.state.isPaused = false;
  }

  tick(context: MatchContext, deltaMs: number): ClockTickResult {
    const { state } = context;
    if (state.status === 'countdown') return this.tickCountdown(context, deltaMs);
    if (state.status !== 'playing' || state.isPaused) return 'idle';

    state.elapsedMs = Math.min(MATCH_DURATION_MS, state.elapsedMs + deltaMs);
    this.updatePhase(context);

    if (state.elapsedMs >= MATCH_DURATION_MS) {
      this.finish(context);
      return 'finished';
    }
    return 'simulate';
  }

  private tickCountdown(context: MatchContext, deltaMs: number): ClockTickResult {
    const { state } = context;
    state.countdownRemainingMs = Math.max(0, state.countdownRemainingMs - deltaMs);
    if (state.countdownRemainingMs > 0) return 'idle';
    state.status = 'playing';
    return 'started';
  }

  private updatePhase(context: MatchContext): void {
    const phase = resolvePhase(context.state.elapsedMs);
    if (phase.id === context.state.phaseId) return;
    context.state.phaseId = phase.id;
    context.events.broadcast(SERVER_EVENTS.phaseChanged, { phaseId: phase.id });
  }

  private finish(context: MatchContext): void {
    const { state } = context;
    state.status = 'finished';
    state.winnerSessionId = state.mode === 'versus' ? this.findWinner(context) : '';
    state.foods.clear();
    state.rainClouds.clear();
    state.decoys.clear();
  }

  private findWinner(context: MatchContext): string {
    const [first, second] = playersOf(context).sort((a, b) => b.score - a.score);
    if (!first) return '';
    if (second && second.score === first.score) return '';
    return first.sessionId;
  }
}

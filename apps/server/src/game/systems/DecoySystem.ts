import { matchTimeOf, type MatchContext } from '../MatchContext';
import type { MatchSystem } from '../MatchSystem';

/** Removes the bread decoys (versus snack) once they expire. */
export class DecoySystem implements MatchSystem {
  update(context: MatchContext): void {
    const now = matchTimeOf(context);
    for (const [id, decoy] of context.state.decoys.entries()) {
      if (now >= decoy.expiresAtMs) context.state.decoys.delete(id);
    }
  }
}

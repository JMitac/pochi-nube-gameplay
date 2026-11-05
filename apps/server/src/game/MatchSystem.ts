import type { MatchContext } from './MatchContext';

/** A small piece of the simulation that runs once per server tick. */
export interface MatchSystem {
  update(context: MatchContext, deltaMs: number): void;
}

/** Systems that keep their own data and must forget it when a new match starts. */
export interface ResettableSystem {
  reset(context: MatchContext): void;
}

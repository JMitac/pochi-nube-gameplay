import type { DuckId } from '../domain/ids';

/** Messages the client sends to the room. */
export const CLIENT_MESSAGES = {
  move: 'move',
  jump: 'jump',
  useAbility: 'useAbility',
  quack: 'quack',
  chooseDuck: 'chooseDuck',
  setReady: 'setReady',
  togglePause: 'togglePause',
  rematch: 'rematch',
} as const;

export interface MovePayload {
  x: number;
  y: number;
}

export interface ChooseDuckPayload {
  duckId: DuckId;
}

export interface SetReadyPayload {
  ready: boolean;
}

export interface ClientMessagePayloads {
  [CLIENT_MESSAGES.move]: MovePayload;
  [CLIENT_MESSAGES.jump]: undefined;
  [CLIENT_MESSAGES.useAbility]: undefined;
  [CLIENT_MESSAGES.quack]: undefined;
  [CLIENT_MESSAGES.chooseDuck]: ChooseDuckPayload;
  [CLIENT_MESSAGES.setReady]: SetReadyPayload;
  [CLIENT_MESSAGES.togglePause]: undefined;
  [CLIENT_MESSAGES.rematch]: undefined;
}

export type ClientMessageType = keyof ClientMessagePayloads;

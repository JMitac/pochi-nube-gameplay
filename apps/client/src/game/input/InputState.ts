import { NO_MOVEMENT, type MovementInput } from '@pochi/shared';

export type GameAction = 'jump' | 'ability' | 'quack';

/**
 * Collects what the player wants to do, from the keyboard or the touch controls.
 * The game loop reads the movement every frame and drains the one-off actions.
 */
export class InputState {
  private keyboardMovement: MovementInput = NO_MOVEMENT;
  private touchMovement: MovementInput = NO_MOVEMENT;
  private pendingActions: GameAction[] = [];

  setKeyboardMovement(movement: MovementInput): void {
    this.keyboardMovement = movement;
  }

  setTouchMovement(movement: MovementInput): void {
    this.touchMovement = movement;
  }

  /** The joystick wins while it is being used. */
  get movement(): MovementInput {
    const touching = this.touchMovement.x !== 0 || this.touchMovement.y !== 0;
    return touching ? this.touchMovement : this.keyboardMovement;
  }

  request(action: GameAction): void {
    this.pendingActions.push(action);
  }

  drainActions(): GameAction[] {
    const actions = this.pendingActions;
    this.pendingActions = [];
    return actions;
  }

  reset(): void {
    this.keyboardMovement = NO_MOVEMENT;
    this.touchMovement = NO_MOVEMENT;
    this.pendingActions = [];
  }
}

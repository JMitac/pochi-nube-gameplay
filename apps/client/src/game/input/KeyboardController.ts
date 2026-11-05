import type { GameAction, InputState } from './InputState';

const MOVE_KEYS: Record<string, { x: number; y: number }> = {
  KeyW: { x: 0, y: -1 },
  ArrowUp: { x: 0, y: -1 },
  KeyS: { x: 0, y: 1 },
  ArrowDown: { x: 0, y: 1 },
  KeyA: { x: -1, y: 0 },
  ArrowLeft: { x: -1, y: 0 },
  KeyD: { x: 1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

const ACTION_KEYS: Record<string, GameAction> = {
  Space: 'jump',
  KeyQ: 'ability',
  KeyC: 'quack',
};

/** PC controls: WASD (or arrows) to move, Space to jump, Q for the ability, C to quack. */
export class KeyboardController {
  private readonly pressed = new Set<string>();

  constructor(
    private readonly input: InputState,
    private readonly onPauseKey: () => void,
  ) {}

  attach(): () => void {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleBlur);
    return () => {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
      window.removeEventListener('blur', this.handleBlur);
    };
  }

  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (event.target instanceof HTMLInputElement) return;
    if (event.code === 'Escape' || event.code === 'KeyP') {
      this.onPauseKey();
      return;
    }
    const action = ACTION_KEYS[event.code];
    if (action) {
      event.preventDefault();
      if (!event.repeat) this.input.request(action);
      return;
    }
    if (MOVE_KEYS[event.code]) {
      event.preventDefault();
      this.pressed.add(event.code);
      this.publishMovement();
    }
  };

  private readonly handleKeyUp = (event: KeyboardEvent): void => {
    if (!this.pressed.delete(event.code)) return;
    this.publishMovement();
  };

  private readonly handleBlur = (): void => {
    this.pressed.clear();
    this.publishMovement();
  };

  private publishMovement(): void {
    let x = 0;
    let y = 0;
    for (const code of this.pressed) {
      x += MOVE_KEYS[code]!.x;
      y += MOVE_KEYS[code]!.y;
    }
    this.input.setKeyboardMovement({ x: Math.sign(x), y: Math.sign(y) });
  }
}

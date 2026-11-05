import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { audioEngine } from '../../audio/audioInstance';

export type ButtonTone = 'honey' | 'cream' | 'white' | 'muted' | 'paper';

const TONE_CLASSES: Record<ButtonTone, string> = {
  honey: 'bg-honey',
  cream: 'bg-cream',
  white: 'bg-white',
  muted: 'bg-muted',
  paper: 'bg-paper',
};

interface GameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ButtonTone;
  /** Play the "botón" sound effect on click (on by default). */
  withClickSound?: boolean;
  children: ReactNode;
}

function withSound(onClick: GameButtonProps['onClick'], enabled: boolean): GameButtonProps['onClick'] {
  return (event) => {
    if (enabled) audioEngine.playEffect('button');
    onClick?.(event);
  };
}

/** Rounded "pill" button with the solid ink border and pop shadow of the design. */
export function PillButton({
  tone = 'honey',
  withClickSound = true,
  className = '',
  onClick,
  children,
  ...rest
}: GameButtonProps) {
  return (
    <button
      type="button"
      className={`press-pop border-ink font-display text-ink inline-flex items-center justify-center rounded-full font-extrabold ${TONE_CLASSES[tone]} ${className}`}
      onClick={withSound(onClick, withClickSound)}
      {...rest}
    >
      {children}
    </button>
  );
}

interface RoundIconButtonProps extends GameButtonProps {
  label: string;
}

/** Circular icon button (back, settings, help, refresh…). The label is read by screen readers. */
export function RoundIconButton({
  label,
  tone = 'cream',
  withClickSound = true,
  className = '',
  onClick,
  children,
  ...rest
}: RoundIconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`press-pop border-ink text-ink flex shrink-0 items-center justify-center rounded-full ${TONE_CLASSES[tone]} ${className}`}
      onClick={withSound(onClick, withClickSound)}
      {...rest}
    >
      {children}
    </button>
  );
}

interface ChoiceButtonProps extends GameButtonProps {
  selected: boolean;
}

/** A selectable option: honey when chosen, white otherwise (aria-pressed). */
export function ChoiceButton({ selected, className = '', onClick, children, withClickSound = true, ...rest }: ChoiceButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`press-pop border-ink text-ink ${selected ? 'bg-honey' : 'bg-white'} ${className}`}
      onClick={withSound(onClick, withClickSound)}
      {...rest}
    >
      {children}
    </button>
  );
}

import type { CSSProperties, PointerEvent, ReactNode } from 'react';
import type { DuckId } from '@pochi/shared';
import { BeakIcon, SparkleIcon, UpArrowIcon } from '../../art/icons/icons';
import { DUCK_ABILITY_LABELS } from '../../domain/labels';
import type { HudSnapshot } from '../../state/hudStore';
import type { GameAction, InputState } from '../input/InputState';

/** Ability button colours: Pochi's olive backpack, Nube's terracotta scarf. */
const ABILITY_COLORS: Record<DuckId, { filled: string; empty: string }> = {
  pochi: { filled: '#5E6833', empty: '#9BA36A' },
  nube: { filled: '#B4553B', empty: '#E3A08A' },
};

interface ActionButtonProps {
  label: string;
  caption: string;
  action: GameAction;
  input: InputState;
  className: string;
  wrapperClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** Fires on pointer down, not on click: in a game every millisecond counts. */
function ActionButton({ label, caption, action, input, className, wrapperClassName = '', style, children }: ActionButtonProps) {
  const press = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    input.request(action);
  };
  return (
    <div className={`flex flex-col items-center gap-1.5 ${wrapperClassName}`}>
      <button
        type="button"
        aria-label={label}
        tabIndex={-1}
        onPointerDown={press}
        className={`press-squash border-ink flex touch-none items-center justify-center rounded-full ${className}`}
        style={style}
      >
        {children}
      </button>
      <span className="bg-cream rounded-full px-2.5 text-[15px] font-extrabold">{caption}</span>
    </div>
  );
}

interface ActionButtonsProps {
  hud: HudSnapshot;
  input: InputState;
  isLeftHanded: boolean;
}

/** Bottom-right cluster: Cuac, the duck's ability (with its cooldown) and the big Jump button. */
export function ActionButtons({ hud, input, isLeftHanded }: ActionButtonsProps) {
  const colors = ABILITY_COLORS[hud.myDuckId];
  const cooldownSeconds = Math.ceil(hud.abilityCooldownMs / 1000);
  const readyPercent = Math.round((1 - hud.abilityCooldownFraction) * 100);
  const abilityLabel = DUCK_ABILITY_LABELS[hud.myDuckId];

  return (
    <div className={`absolute bottom-[30px] flex items-end gap-[18px] ${isLeftHanded ? 'left-9 flex-row-reverse' : 'right-9'}`}>
      <ActionButton
        label="Cuac"
        caption="Cuac"
        action="quack"
        input={input}
        wrapperClassName="mb-2.5"
        className="bg-cream shadow-pop size-[68px] border-4"
      >
        <BeakIcon />
      </ActionButton>
      <ActionButton
        label={
          cooldownSeconds > 0
            ? `Habilidad: ${abilityLabel.full}, ${cooldownSeconds} segundos`
            : `Habilidad: ${abilityLabel.full}, lista`
        }
        caption={`${abilityLabel.short} (Q)`}
        action="ability"
        input={input}
        wrapperClassName="mb-[18px]"
        className="shadow-pop-md relative size-24 border-[5px] p-0"
        style={{ background: `conic-gradient(${colors.filled} 0 ${readyPercent}%, ${colors.empty} ${readyPercent}% 100%)` }}
      >
        <span
          className="font-display text-cream flex size-[60px] items-center justify-center rounded-full text-[32px] font-extrabold"
          style={{ background: colors.filled }}
        >
          {cooldownSeconds > 0 ? cooldownSeconds : <SparkleIcon size={30} />}
        </span>
      </ActionButton>
      <ActionButton
        label="Saltar"
        caption="Saltar (Espacio)"
        action="jump"
        input={input}
        className="bg-honey shadow-pop-xl size-[136px] border-[6px]"
      >
        <UpArrowIcon size={56} />
      </ActionButton>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { CompressIcon, ExpandIcon } from '../../art/icons/icons';
import { useFullscreen } from '../../hooks/useFullscreen';
import { RoundIconButton } from './buttons';

const HINT_VISIBLE_MS = 6000;

type HintPlacement = 'above' | 'below';

interface FullscreenButtonProps {
  /** Size, border and shadow classes so it matches the buttons next to it. */
  className?: string;
  iconSize?: number;
  hintPlacement?: HintPlacement;
}

/**
 * Round button that puts the game in fullscreen and back.
 * iPhone Safari does not allow fullscreen for web pages, so there it explains how to
 * add the game to the home screen, which opens it without the browser bars.
 */
export function FullscreenButton({ className = '', iconSize = 30, hintPlacement = 'above' }: FullscreenButtonProps) {
  const { isSupported, isInstalledApp, isActive, toggle } = useFullscreen();
  const [isHintOpen, setIsHintOpen] = useState(false);

  useEffect(() => {
    if (!isHintOpen) return;
    const timer = window.setTimeout(() => setIsHintOpen(false), HINT_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [isHintOpen]);

  if (isInstalledApp) return null;

  const handleClick = () => (isSupported ? toggle() : setIsHintOpen((open) => !open));

  return (
    <div className="relative">
      <RoundIconButton
        label={isActive ? 'Salir de pantalla completa' : 'Pantalla completa'}
        className={className}
        onClick={handleClick}
      >
        {isActive ? <CompressIcon size={iconSize} /> : <ExpandIcon size={iconSize} />}
      </RoundIconButton>
      {isHintOpen && <HomeScreenHint placement={hintPlacement} onClose={() => setIsHintOpen(false)} />}
    </div>
  );
}

interface HomeScreenHintProps {
  placement: HintPlacement;
  onClose(): void;
}

/** Speech-bubble style panel with the iPhone steps. */
function HomeScreenHint({ placement, onClose }: HomeScreenHintProps) {
  const position = placement === 'above' ? 'bottom-[calc(100%+14px)]' : 'top-[calc(100%+14px)]';
  return (
    <div
      role="status"
      className={`pop-in border-ink bg-cream font-body text-ink shadow-pop absolute right-0 ${position} z-[1000] w-[340px] rounded-[24px] border-4 px-5 py-3.5 text-left`}
      onClick={onClose}
    >
      <p className="font-display m-0 text-[22px] font-extrabold leading-tight">Pantalla completa en iPhone</p>
      <p className="m-0 mt-1 text-[17px] font-bold leading-snug">
        Toca <span className="font-extrabold">Compartir</span> y luego{' '}
        <span className="font-extrabold">“Agregar a pantalla de inicio”</span>. Abre el juego desde ese ícono y se verá sin las
        barras de Safari.
      </p>
    </div>
  );
}

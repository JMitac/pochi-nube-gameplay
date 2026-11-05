import { forwardRef, useEffect, useState } from 'react';
import { HeartIcon, PauseIcon } from '../../art/icons/icons';
import { PillButton, RoundIconButton } from '../../components/ui/buttons';
import { Panel } from '../../components/ui/surfaces';
import type { HudSnapshot } from '../../state/hudStore';
import { useFloatingTextStore, type FloatingText } from '../effects/floatingTextStore';

const OUTLINED_TEXT = { WebkitTextStroke: '10px #4A3424', paintOrder: 'stroke fill', textShadow: '0 8px 0 #4A3424' } as const;

/** "×2 ¡Juntitos!" badge. The game loop moves it above the two ducks. */
export const TogetherBadge = forwardRef<HTMLDivElement>(function TogetherBadge(_, ref) {
  return (
    <div ref={ref} className="pointer-events-none absolute left-0 top-0 z-[900]" style={{ display: 'none' }}>
      <div className="combo-wiggle border-ink bg-blush font-display shadow-pop-sm flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border-4 px-3.5 py-1 text-[22px] font-extrabold">
        <HeartIcon width={20} height={18} />
        ×2 ¡Juntitos!
      </div>
    </div>
  );
});

const FLOATING_TONES: Record<FloatingText['tone'], string> = {
  good: 'bg-cream',
  gold: 'bg-gold',
  bad: 'bg-[#E6E3C8]',
};

/** "+40" labels that rise from where a fruit was caught. */
export function FloatingTexts() {
  const texts = useFloatingTextStore((state) => state.texts);
  const remove = useFloatingTextStore((state) => state.remove);
  return (
    <>
      {texts.map((text) => (
        <div
          key={text.id}
          onAnimationEnd={() => remove(text.id)}
          className={`score-float border-ink font-display pointer-events-none absolute z-[950] rounded-full border-[3px] px-2.5 py-0.5 text-[18px] font-extrabold ${FLOATING_TONES[text.tone]}`}
          style={{ left: text.x, top: text.y }}
        >
          {text.text}
        </div>
      ))}
    </>
  );
}

/** Big phase name in the middle of the screen when the match speeds up. */
export function PhaseBanner() {
  const banner = useFloatingTextStore((state) => state.phaseBanner);
  if (!banner) return null;
  return (
    <div
      key={banner.id}
      className="phase-banner font-display text-cream pointer-events-none absolute left-1/2 top-[42%] z-[960] whitespace-nowrap text-[64px] font-extrabold leading-none"
      style={OUTLINED_TEXT}
    >
      {banner.text}
    </div>
  );
}

const GO_DISPLAY_MS = 800;

/** "3, 2, 1, ¡Ya!" before the match starts. */
export function CountdownOverlay({ hud }: { hud: HudSnapshot }) {
  const [showGo, setShowGo] = useState(false);

  useEffect(() => {
    if (hud.isCountingDown) return;
    setShowGo(true);
    const timer = window.setTimeout(() => setShowGo(false), GO_DISPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [hud.isCountingDown]);

  const text = hud.isCountingDown ? String(Math.max(1, Math.ceil(hud.countdownRemainingMs / 1000))) : showGo ? '¡Ya!' : null;
  if (!text) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[970] flex items-center justify-center bg-[rgba(74,52,36,0.15)]"
      aria-live="assertive"
    >
      <span
        key={text}
        className="countdown-pop font-display text-cream text-[180px] font-extrabold leading-none"
        style={OUTLINED_TEXT}
      >
        {text}
      </span>
    </div>
  );
}

interface TopRightControlsProps {
  roomCode: string | null;
  onPause(): void;
}

export function TopRightControls({ roomCode, onPause }: TopRightControlsProps) {
  return (
    <div className="absolute right-6 top-5 z-[980] flex items-center gap-3">
      {roomCode && (
        <span className="border-ink bg-cream font-display rounded-full border-4 px-3.5 py-1.5 text-[20px] font-extrabold tracking-[2px]">
          {roomCode}
        </span>
      )}
      <RoundIconButton label="Pausa" className="shadow-pop size-[60px] border-4" onClick={onPause}>
        <PauseIcon size={24} />
      </RoundIconButton>
    </div>
  );
}

interface PauseOverlayProps {
  isSolo: boolean;
  onResume(): void;
  onQuit(): void;
}

/** Pause menu. With two players the match keeps going for the partner. */
export function PauseOverlay({ isSolo, onResume, onQuit }: PauseOverlayProps) {
  return (
    <div className="absolute inset-0 z-[990] flex items-center justify-center bg-[rgba(74,52,36,0.35)]">
      <Panel className="flex w-[520px] flex-col items-center gap-5 rounded-[40px] px-10 py-8 text-center">
        <h2 className="font-display m-0 text-[56px] font-extrabold leading-none">Pausa</h2>
        <p className="m-0 text-[19px] font-bold">
          {isSolo ? 'El reloj está detenido. Respira, patito.' : 'La partida sigue para tu pareja. ¡No tardes!'}
        </p>
        <div className="flex gap-4">
          <PillButton className="shadow-pop-md border-[5px] px-10 py-2 text-[30px]" onClick={onResume}>
            Seguir
          </PillButton>
          <PillButton tone="white" className="shadow-pop-md border-[5px] px-8 py-2 text-[30px]" onClick={onQuit}>
            Salir
          </PillButton>
        </div>
      </Panel>
    </div>
  );
}

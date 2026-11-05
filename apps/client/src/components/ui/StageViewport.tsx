import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { STAGE_HEIGHT, STAGE_WIDTH } from '@pochi/shared';

const StageScaleContext = createContext(1);

/** How much the 1280×720 stage is scaled on this screen. Needed to read touch distances. */
export function useStageScale(): number {
  return useContext(StageScaleContext);
}

function readScale(): number {
  return Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT);
}

function readIsPortraitPhone(): boolean {
  return window.matchMedia('(pointer: coarse)').matches && window.innerHeight > window.innerWidth;
}

/**
 * Every screen in the design is a 1280×720 artboard. This keeps that exact
 * layout and scales it to fit any window, centred, like a console screen.
 */
export function StageViewport({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(readScale);
  const [isPortraitPhone, setIsPortraitPhone] = useState(readIsPortraitPhone);

  useEffect(() => {
    const handleResize = () => {
      setScale(readScale());
      setIsPortraitPhone(readIsPortraitPhone());
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <StageScaleContext.Provider value={scale}>
      <div className="bg-ink fixed inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="bg-sky relative shrink-0 overflow-hidden"
          style={{ width: STAGE_WIDTH * scale, height: STAGE_HEIGHT * scale }}
        >
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT, transform: `scale(${scale})` }}
          >
            {children}
          </div>
        </div>
        {isPortraitPhone && <RotateDeviceHint />}
      </div>
    </StageScaleContext.Provider>
  );
}

/** "En celular (horizontal)": the game is played with the phone turned sideways. */
function RotateDeviceHint() {
  return (
    <div className="bg-ink/80 fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="border-ink bg-cream shadow-pop-xl flex flex-col items-center gap-3 rounded-[32px] border-[5px] px-8 py-6 text-center">
        <svg
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4A3424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="7" y="3" width="10" height="18" rx="2.5" />
          <path d="M3 9 a9 9 0 0 1 4 -5 M21 15 a9 9 0 0 1 -4 5" />
        </svg>
        <span className="font-display text-[30px] font-extrabold leading-none">Gira tu celular</span>
        <span className="text-[17px] font-bold">Pochi y Nube se juega en horizontal.</span>
      </div>
    </div>
  );
}

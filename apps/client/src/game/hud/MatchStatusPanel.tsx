import { ClockIcon, HeartIcon } from '../../art/icons/icons';
import { PHASE_LABELS } from '../../domain/labels';
import type { HudSnapshot } from '../../state/hudStore';
import { formatClock } from '../../utils/time';

/** Top-centre: clock, current phase and the "barra de cariño". */
export function MatchStatusPanel({ hud }: { hud: HudSnapshot }) {
  const affection = Math.round(hud.affectionPercent);
  return (
    <div className="absolute left-1/2 top-[18px] flex -translate-x-1/2 flex-col items-center gap-2">
      <div className="border-ink bg-cream shadow-pop flex items-center gap-2.5 rounded-full border-[5px] px-[26px] py-0.5">
        <ClockIcon size={26} />
        <span className="font-display text-[46px] font-extrabold tabular-nums leading-[1.1]" role="timer" aria-live="off">
          {formatClock(hud.remainingMs)}
        </span>
      </div>
      <span className="border-ink bg-honey rounded-full border-[3px] px-3.5 py-0.5 text-[15px] font-extrabold">
        {PHASE_LABELS[hud.phaseId]}
      </span>
      <div className="flex items-center gap-2">
        <HeartIcon width={26} height={24} />
        <div
          className="border-ink bg-cream box-border h-[22px] w-[220px] overflow-hidden rounded-full border-4"
          role="img"
          aria-label={`Barra de cariño al ${affection} por ciento`}
        >
          <div className="bg-blush h-full transition-[width] duration-300" style={{ width: `${affection}%` }} />
        </div>
      </div>
    </div>
  );
}

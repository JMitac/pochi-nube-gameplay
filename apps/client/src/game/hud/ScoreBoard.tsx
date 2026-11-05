import type { GameMode } from '@pochi/shared';
import { DuckFigure } from '../../art/ducks/DuckFigure';
import { DUCK_AVATAR_BACKGROUNDS } from '../../domain/labels';
import type { HudSnapshot } from '../../state/hudStore';

function basketLabel(mode: GameMode): string {
  if (mode === 'coop') return 'Canasta';
  return 'Tu canasta';
}

/** Top-left card: the basket total and each duck's points. */
export function ScoreBoard({ hud, mode, mySessionId }: { hud: HudSnapshot; mode: GameMode; mySessionId: string }) {
  const myScore = hud.players.find((player) => player.sessionId === mySessionId)?.score ?? 0;
  const total = mode === 'coop' ? hud.teamScore : myScore;

  return (
    <div className="border-ink bg-cream shadow-pop absolute left-6 top-5 flex items-center gap-[18px] rounded-[26px] border-4 px-[18px] py-3">
      <div className="flex flex-col items-start">
        <span className="text-[14px] font-extrabold uppercase tracking-[1px]">{basketLabel(mode)}</span>
        <span className="font-display text-[44px] font-extrabold tabular-nums leading-none">{total}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {hud.players.map((player) => (
          <div key={player.sessionId} className="flex items-center gap-2">
            <div
              className="border-ink relative size-9 overflow-hidden rounded-full border-[3px]"
              style={{ background: DUCK_AVATAR_BACKGROUNDS[player.duckId] }}
            >
              <div className="absolute left-[-50px] top-[-4px]">
                <DuckFigure duckId={player.duckId} size={80} animated={false} />
              </div>
            </div>
            <span className="w-[52px] text-[17px] font-extrabold">{player.duckId === 'pochi' ? 'Pochi' : 'Nube'}</span>
            <span className="font-display text-[22px] font-extrabold tabular-nums">{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

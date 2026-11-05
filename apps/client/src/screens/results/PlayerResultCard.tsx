import { DUCK_PROFILES, FOOD_KINDS } from '@pochi/shared';
import { FOOD_RESULT_LABELS } from '../../domain/labels';
import type { PlayerResult } from '../../state/resultsStore';

/** A duck's points and the foods it caught ("Peras ×6"…). */
export function PlayerResultCard({ player, isWinner }: { player: PlayerResult; isWinner: boolean }) {
  const caught = FOOD_KINDS.filter((kind) => (player.catches[kind] ?? 0) > 0).sort(
    (a, b) => (player.catches[b] ?? 0) - (player.catches[a] ?? 0),
  );

  return (
    <div
      className={`border-ink flex flex-col gap-1.5 rounded-3xl border-4 px-[18px] py-3.5 ${isWinner ? 'bg-[#FFF6D6]' : 'bg-white'}`}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-display text-[28px] font-extrabold">{DUCK_PROFILES[player.duckId].displayName}</span>
        <span className="font-display text-[28px] font-extrabold tabular-nums">{player.score}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {caught.length === 0 && <span className="text-[15px] font-bold">No atrapó nada esta vez</span>}
        {caught.map((kind) => (
          <span
            key={kind}
            className="border-ink rounded-full border-[2.5px] px-2.5 py-0.5 text-[15px] font-extrabold"
            style={{ background: FOOD_RESULT_LABELS[kind].chipColor }}
          >
            {FOOD_RESULT_LABELS[kind].plural} ×{player.catches[kind]}
          </span>
        ))}
      </div>
    </div>
  );
}

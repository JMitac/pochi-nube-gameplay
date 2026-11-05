import { DUCK_PROFILES, type DuckId } from '@pochi/shared';
import { DuckFigure } from '../../art/ducks/DuckFigure';
import type { DuckDirection } from '../../art/ducks/duckPose';
import { CheckIcon, SwapIcon } from '../../art/icons/icons';
import { audioEngine } from '../../audio/audioInstance';
import { DUCK_LIKES } from '../../domain/labels';
import type { LobbyPlayer } from '../../state/roomStore';

const CARD =
  'box-border flex h-[400px] w-[380px] flex-col items-center gap-1.5 rounded-[36px] border-[5px] border-ink p-5 shadow-pop-2xl';

function ReadyChip() {
  return (
    <span className="border-ink bg-grass inline-flex items-center gap-1.5 rounded-full border-[3px] px-3.5 py-0.5 text-[16px] font-extrabold">
      <CheckIcon size={16} />
      Listo
    </span>
  );
}

interface DuckSlotCardProps {
  player: LobbyPlayer;
  ownerLabel: string;
  ownerChipColor: string;
  direction: DuckDirection;
  /** Shown only when the player can still change duck. */
  onSwapDuck?: () => void;
}

/** A player's card: who it is, which duck, and whether they are ready. */
export function DuckSlotCard({ player, ownerLabel, ownerChipColor, direction, onSwapDuck }: DuckSlotCardProps) {
  return (
    <div className={`${CARD} bg-cream`}>
      <div className="flex items-center justify-between self-stretch">
        <span
          className={`border-ink max-w-[150px] truncate rounded-full border-[3px] px-3.5 py-0.5 text-[16px] font-extrabold ${ownerChipColor}`}
        >
          {ownerLabel}
        </span>
        {player.ready && <ReadyChip />}
        {!player.ready && onSwapDuck && (
          <button
            type="button"
            onClick={() => {
              audioEngine.playEffect('button');
              onSwapDuck();
            }}
            className="press-pop border-ink text-ink shadow-pop-xs inline-flex items-center gap-1.5 rounded-full border-[3px] bg-white px-3.5 py-0.5 text-[16px] font-extrabold"
          >
            <SwapIcon size={16} />
            Cambiar patito
          </button>
        )}
      </div>
      <DuckFigure duckId={player.duckId} size={230} direction={direction} />
      <span className="font-display text-[40px] font-extrabold leading-none">{DUCK_PROFILES[player.duckId].displayName}</span>
      <span className="text-center text-[17px] font-bold">{DUCK_LIKES[player.duckId]}</span>
    </div>
  );
}

/** The free seat: faded duck and a dashed border until the partner arrives. */
export function EmptyDuckSlotCard({ duckId }: { duckId: DuckId }) {
  return (
    <div className={`${CARD} border-dashed bg-[rgba(255,248,236,0.7)]`}>
      <div className="flex items-center justify-between self-stretch">
        <span className="border-ink bg-rose rounded-full border-[3px] px-3.5 py-0.5 text-[16px] font-extrabold">Jugador 2</span>
        <span className="border-ink rounded-full border-[3px] border-dashed bg-white px-3.5 py-0.5 text-[16px] font-extrabold">
          Esperando…
        </span>
      </div>
      <div className="opacity-35">
        <DuckFigure duckId={duckId} size={226} direction="left" />
      </div>
      <span className="font-display text-[40px] font-extrabold leading-none">{DUCK_PROFILES[duckId].displayName}</span>
      <span className="text-[17px] font-bold">Comparte el código para que entre</span>
    </div>
  );
}

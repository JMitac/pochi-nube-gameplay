import { DuckFigure } from '../../art/ducks/DuckFigure';
import { PillButton } from '../../components/ui/buttons';
import { Panel } from '../../components/ui/surfaces';
import type { LobbyPlayer } from '../../state/roomStore';

interface PartnerReadyModalProps {
  partner: LobbyPlayer;
  onStart(): void;
  onClose(): void;
}

/** "¡Patito12 ya está listo!": reminds this player that only their "¡Empezar!" is missing. */
export function PartnerReadyModal({ partner, onStart, onClose }: PartnerReadyModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="partner-ready-title"
      className="absolute inset-0 z-[990] flex items-center justify-center bg-[rgba(74,52,36,0.35)]"
    >
      <Panel className="pop-in flex w-[560px] flex-col items-center gap-4 rounded-[40px] px-10 pb-8 pt-6 text-center">
        <DuckFigure duckId={partner.duckId} size={150} direction="left" />
        <h2 id="partner-ready-title" className="font-display m-0 text-[46px] font-extrabold leading-none">
          ¡{partner.name} ya está listo!
        </h2>
        <p className="m-0 text-[20px] font-bold">
          Solo faltas tú. Presiona <span className="font-extrabold">¡Empezar!</span> para jugar la partida.
        </p>
        <div className="flex gap-4">
          <PillButton className="shadow-pop-md border-[5px] px-10 py-2 text-[30px]" onClick={onStart}>
            ¡Empezar!
          </PillButton>
          <PillButton tone="white" className="shadow-pop-md border-[5px] px-8 py-2 text-[30px]" onClick={onClose}>
            Ahora no
          </PillButton>
        </div>
      </Panel>
    </div>
  );
}

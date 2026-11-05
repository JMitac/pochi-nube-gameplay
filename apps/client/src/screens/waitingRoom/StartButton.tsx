import { PillButton } from '../../components/ui/buttons';
import { roomSession } from '../../network/RoomSession';
import type { LobbyPlayer, RoomSnapshot } from '../../state/roomStore';

interface StartButtonProps {
  snapshot: RoomSnapshot;
  me: LobbyPlayer;
  partner: LobbyPlayer | undefined;
}

interface StartButtonState {
  label: string;
  enabled: boolean;
}

/** "¡Empezar!" / "Esperando 1/2": the match starts when everybody pressed it. */
function resolveStartButton({ snapshot, me, partner }: StartButtonProps): StartButtonState {
  const playerCount = snapshot.players.length;
  if (playerCount < snapshot.maxPlayers) return { label: `Esperando ${playerCount}/${snapshot.maxPlayers}`, enabled: false };
  if (!me.ready) return { label: '¡Empezar!', enabled: true };
  if (partner && !partner.ready) return { label: `Esperando a ${partner.name}…`, enabled: false };
  return { label: '¡Vamos!', enabled: false };
}

export function StartButton(props: StartButtonProps) {
  const { label, enabled } = resolveStartButton(props);
  return (
    <PillButton
      tone={enabled ? 'honey' : 'muted'}
      disabled={!enabled}
      className="shadow-pop-md gap-3 border-[5px] px-11 py-2.5 text-[32px]"
      onClick={() => roomSession.setReady(true)}
    >
      {label}
    </PillButton>
  );
}

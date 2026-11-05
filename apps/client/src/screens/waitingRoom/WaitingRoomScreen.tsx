import { useEffect } from 'react';
import { MATCH_DURATION_MS, otherDuck, SERVER_EVENTS } from '@pochi/shared';
import { audioEngine } from '../../audio/audioInstance';
import { BackArrowIcon } from '../../art/icons/icons';
import { PillButton } from '../../components/ui/buttons';
import { ScreenBackground } from '../../components/ScreenBackground';
import { MAP_LABELS, MODE_LABELS } from '../../domain/labels';
import { useScreenMusic } from '../../hooks/useScreenMusic';
import { roomSession } from '../../network/RoomSession';
import { useNavigationStore } from '../../state/navigationStore';
import { selectMe, selectPartner, useRoomStore, type LobbyPlayer, type RoomSnapshot } from '../../state/roomStore';
import { formatClock } from '../../utils/time';
import { RoomCodeBanner } from './RoomCodeBanner';
import { DuckSlotCard, EmptyDuckSlotCard } from './DuckSlotCard';
import { PartnerReadyModal } from './PartnerReadyModal';
import { StartButton } from './StartButton';
import { usePartnerReadyNotice } from './usePartnerReadyNotice';
import { VisibilityBadge } from './VisibilityBadge';

/** 5 · Sala de espera */
export function WaitingRoomScreen() {
  const navigate = useNavigationStore((state) => state.navigate);
  const snapshot = useRoomStore((state) => state.snapshot);
  const me = useRoomStore(selectMe);
  const partner = useRoomStore(selectPartner);
  useScreenMusic('waiting');

  useEffect(() => roomSession.on(SERVER_EVENTS.playerJoined, () => audioEngine.playEffect('partnerJoined')), []);

  const leaveRoom = async () => {
    await roomSession.leave();
    navigate('menu');
  };

  if (!snapshot || !me) return <ScreenLoading />;
  return <WaitingRoom snapshot={snapshot} me={me} partner={partner} onLeave={() => void leaveRoom()} />;
}

interface WaitingRoomProps {
  snapshot: RoomSnapshot;
  me: LobbyPlayer;
  partner: LobbyPlayer | undefined;
  onLeave(): void;
}

function WaitingRoom({ snapshot, me, partner, onLeave }: WaitingRoomProps) {
  const partnerReadyNotice = usePartnerReadyNotice(me, partner);

  const isSolo = snapshot.mode === 'solo';
  const canSwapDuck = isSolo || !partner;
  const chip = 'rounded-full border-4 border-ink bg-cream px-[18px] py-2 text-[18px] font-extrabold';

  return (
    <div className="bg-sky font-body text-ink relative h-[720px] w-[1280px] overflow-hidden">
      <ScreenBackground mapId={snapshot.mapId} tint="inkSoft" />

      <div className="absolute left-10 right-10 top-7 flex items-center justify-between">
        <PillButton
          tone="cream"
          className="shadow-pop gap-2 border-4 py-2 pl-3.5 pr-[22px] text-[22px]"
          onClick={onLeave}
        >
          <BackArrowIcon size={24} />
          Salir
        </PillButton>
        {isSolo ? <span /> : <RoomCodeBanner roomCode={snapshot.roomCode} />}
        <VisibilityBadge visibility={snapshot.visibility} />
      </div>

      <div className="absolute left-1/2 top-32 flex -translate-x-1/2 gap-10">
        <DuckSlotCard
          player={me}
          ownerLabel="Tú"
          ownerChipColor="bg-sky"
          direction="right"
          onSwapDuck={canSwapDuck ? () => roomSession.chooseDuck(otherDuck(me.duckId)) : undefined}
        />
        {!isSolo &&
          (partner ? (
            <DuckSlotCard player={partner} ownerLabel={partner.name} ownerChipColor="bg-rose" direction="left" />
          ) : (
            <EmptyDuckSlotCard duckId={otherDuck(me.duckId)} />
          ))}
      </div>

      <div className="absolute bottom-8 left-10 right-10 flex items-center justify-between">
        <div className="flex gap-3">
          <span className={chip}>{MODE_LABELS[snapshot.mode]}</span>
          <span className={chip}>{MAP_LABELS[snapshot.mapId].name}</span>
          <span className={chip}>{formatClock(MATCH_DURATION_MS)} min</span>
        </div>
        <StartButton snapshot={snapshot} me={me} partner={partner} />
      </div>

      {partnerReadyNotice.isOpen && partner && (
        <PartnerReadyModal
          partner={partner}
          onStart={() => roomSession.setReady(true)}
          onClose={partnerReadyNotice.dismiss}
        />
      )}
    </div>
  );
}

function ScreenLoading() {
  return (
    <div className="bg-sky font-display text-ink relative flex h-[720px] w-[1280px] items-center justify-center text-[40px] font-extrabold">
      <ScreenBackground tint="inkSoft" />
      <span className="border-ink bg-cream shadow-pop-md relative rounded-full border-[5px] px-10 py-3">Entrando a la sala…</span>
    </div>
  );
}

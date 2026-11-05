import { useState } from 'react';
import { BackArrowIcon } from '../../art/icons/icons';
import { RoundIconButton } from '../../components/ui/buttons';
import { OutlinedTitle } from '../../components/ui/surfaces';
import { ScreenBackground } from '../../components/ScreenBackground';
import { useScreenMusic } from '../../hooks/useScreenMusic';
import { roomSession } from '../../network/RoomSession';
import { useNavigationStore } from '../../state/navigationStore';
import { useSettingsStore } from '../../state/settingsStore';
import { JoinByCodePanel } from './JoinByCodePanel';
import { PublicRoomsPanel } from './PublicRoomsPanel';

/** 4 · Buscar sala y salas públicas */
export function JoinRoomScreen() {
  const navigate = useNavigationStore((state) => state.navigate);
  const playerName = useSettingsStore((state) => state.playerName);
  const [joiningRoomId, setJoiningRoomId] = useState<string | null>(null);
  useScreenMusic('menu');

  /** Shared by both panels: join a room by its Colyseus id. */
  const joinRoom = async (roomId: string) => {
    setJoiningRoomId(roomId);
    try {
      await roomSession.joinRoom(roomId, { playerName });
      navigate('waitingRoom');
    } finally {
      setJoiningRoomId(null);
    }
  };

  return (
    <div className="bg-sky font-body text-ink relative h-[720px] w-[1280px] overflow-hidden">
      <ScreenBackground tint="ink" />

      <div className="absolute left-10 top-8 flex items-center gap-[18px]">
        <RoundIconButton label="Volver al menú" className="shadow-pop size-[60px] border-4" onClick={() => navigate('menu')}>
          <BackArrowIcon size={28} />
        </RoundIconButton>
        <OutlinedTitle className="text-[52px]" strokeWidth={8} shadowOffset={5}>
          Unirse a una sala
        </OutlinedTitle>
      </div>

      <div className="absolute left-10 top-[130px] flex w-[1200px] items-start gap-7">
        <JoinByCodePanel onJoin={joinRoom} isBusy={joiningRoomId !== null} />
        <PublicRoomsPanel onJoin={joinRoom} joiningRoomId={joiningRoomId} />
      </div>
    </div>
  );
}

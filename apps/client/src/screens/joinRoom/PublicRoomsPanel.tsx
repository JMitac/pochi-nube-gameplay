import { useCallback, useEffect, useState } from 'react';
import type { PublicRoomSummary } from '@pochi/shared';
import { RefreshIcon } from '../../art/icons/icons';
import { PillButton, RoundIconButton } from '../../components/ui/buttons';
import { Panel } from '../../components/ui/surfaces';
import { MAP_LABELS, MODE_LABELS } from '../../domain/labels';
import { fetchPublicRooms } from '../../network/roomDirectoryApi';

const AUTO_REFRESH_MS = 5_000;
const AVATAR_COLORS = ['#E3C9A0', '#FFFFFF', '#F7D3C7', '#B9DC9A'];

interface PublicRoomsPanelProps {
  joiningRoomId: string | null;
  onJoin(roomId: string): Promise<void>;
}

/** Right card: "Salas públicas", refreshed every few seconds. */
export function PublicRoomsPanel({ joiningRoomId, onJoin }: PublicRoomsPanelProps) {
  const [rooms, setRooms] = useState<PublicRoomSummary[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>('Buscando salas…');

  const refresh = useCallback(async () => {
    try {
      const found = await fetchPublicRooms();
      setRooms(found);
      setStatusMessage(found.length === 0 ? 'No hay salas abiertas ahora. ¡Crea una desde el menú!' : null);
    } catch {
      setStatusMessage('No pudimos conectar con el servidor.');
    }
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => void refresh(), AUTO_REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [refresh]);

  return (
    <Panel className="flex min-w-0 flex-1 flex-col gap-4 rounded-[36px] p-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-display m-0 text-[34px] font-extrabold leading-[1.1]">Salas públicas</h2>
        <RoundIconButton
          label="Actualizar lista"
          tone="white"
          className="shadow-pop-sm size-[52px] border-4"
          onClick={() => void refresh()}
        >
          <RefreshIcon size={24} />
        </RoundIconButton>
      </div>

      <div className="flex max-h-[372px] flex-col gap-3 overflow-y-auto pb-1">
        {statusMessage && (
          <p
            role="status"
            className="border-ink m-0 rounded-[22px] border-[3.5px] border-dashed bg-white px-[18px] py-4 text-[18px] font-bold"
          >
            {statusMessage}
          </p>
        )}
        {rooms.map((room, index) => (
          <div
            key={room.roomId}
            className="border-ink flex items-center gap-4 rounded-[22px] border-[3.5px] bg-white py-3 pl-[18px] pr-3.5"
          >
            <div
              className="border-ink size-12 flex-none rounded-full border-[3px]"
              style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="font-display truncate text-[24px] font-extrabold leading-[1.15]">Sala de {room.hostName}</span>
              <span className="text-[16px] font-bold">
                {MODE_LABELS[room.mode]} · {MAP_LABELS[room.mapId].name}
              </span>
            </div>
            <span className="border-ink bg-sky flex-none rounded-full border-[2.5px] px-3 py-1 text-[16px] font-extrabold">
              {room.clients}/{room.maxClients}
            </span>
            <PillButton
              className="shadow-pop-sm flex-none border-4 px-[22px] py-1.5 text-[22px]"
              disabled={joiningRoomId !== null}
              onClick={() => void onJoin(room.roomId).catch(() => void refresh())}
            >
              {joiningRoomId === room.roomId ? '…' : 'Unirse'}
            </PillButton>
          </div>
        ))}
      </div>
    </Panel>
  );
}

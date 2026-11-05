import { useState } from 'react';
import { GAME_MODES, MAP_IDS, ROOM_VISIBILITIES, type GameMode, type MapId, type RoomVisibility } from '@pochi/shared';
import { BackArrowIcon, GlobeIcon, LockIcon } from '../../art/icons/icons';
import { ChoiceButton, PillButton, RoundIconButton } from '../../components/ui/buttons';
import { Panel } from '../../components/ui/surfaces';
import { ScreenBackground } from '../../components/ScreenBackground';
import { MAP_LABELS, MODE_LABELS } from '../../domain/labels';
import { useScreenMusic } from '../../hooks/useScreenMusic';
import { roomSession } from '../../network/RoomSession';
import { useNavigationStore } from '../../state/navigationStore';
import { useSettingsStore } from '../../state/settingsStore';
import { MapPreview } from './MapPreview';

const VISIBILITY_OPTIONS: Record<RoomVisibility, { label: string; description: string }> = {
  public: { label: 'Pública', description: 'Aparece en la lista de salas públicas' },
  private: { label: 'Privada', description: 'Se genera un código para compartir' },
};

function describeRoom(visibility: RoomVisibility, mode: GameMode, mapId: MapId): string {
  const players = mode === 'solo' ? '1 jugador' : '2 jugadores';
  return `${VISIBILITY_OPTIONS[visibility].label} · ${MODE_LABELS[mode]} · ${MAP_LABELS[mapId].name} · ${players}`;
}

/** 3 · Crear sala */
export function CreateRoomScreen() {
  const navigate = useNavigationStore((state) => state.navigate);
  const playerName = useSettingsStore((state) => state.playerName);
  const [visibility, setVisibility] = useState<RoomVisibility>('private');
  const [mode, setMode] = useState<GameMode>('coop');
  const [mapId, setMapId] = useState<MapId>('meadow');
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useScreenMusic('menu');

  const createRoom = async () => {
    setIsCreating(true);
    setErrorMessage(null);
    try {
      await roomSession.createRoom({ visibility, mode, mapId, playerName });
      navigate('waitingRoom');
    } catch {
      setErrorMessage('No pudimos crear la sala. ¿El servidor está encendido?');
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-sky font-body text-ink relative h-[720px] w-[1280px] overflow-hidden">
      <ScreenBackground tint="ink" />

      <Panel className="absolute left-20 top-9 flex h-[648px] w-[1120px] flex-col gap-[22px] rounded-[40px] px-10 pb-8 pt-7">
        <div className="flex items-center gap-[18px]">
          <RoundIconButton
            label="Volver al menú"
            tone="white"
            className="shadow-pop-sm size-14 border-4"
            onClick={() => navigate('menu')}
          >
            <BackArrowIcon size={26} />
          </RoundIconButton>
          <h1 className="font-display m-0 text-[48px] font-extrabold leading-none">Crear sala</h1>
        </div>

        <section className="flex flex-col gap-2.5">
          <h2 className="font-display m-0 text-[24px] font-bold">Tipo de sala</h2>
          <div className="grid grid-cols-2 gap-[18px]">
            {ROOM_VISIBILITIES.map((option) => (
              <ChoiceButton
                key={option}
                selected={visibility === option}
                disabled={mode === 'solo' && option === 'public'}
                onClick={() => setVisibility(option)}
                className="shadow-pop flex items-center gap-4 rounded-3xl border-4 px-5 py-3.5 text-left disabled:opacity-50"
              >
                <div className="border-ink bg-cream flex size-[52px] flex-none items-center justify-center rounded-full border-[3px]">
                  {option === 'private' ? <LockIcon size={26} /> : <GlobeIcon size={26} />}
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[28px] font-extrabold leading-[1.1]">
                    {VISIBILITY_OPTIONS[option].label}
                  </span>
                  <span className="text-[17px] font-bold">{VISIBILITY_OPTIONS[option].description}</span>
                </div>
              </ChoiceButton>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="font-display m-0 text-[24px] font-bold">Modo de juego</h2>
          <div className="flex gap-3.5">
            {GAME_MODES.map((option) => (
              <ChoiceButton
                key={option}
                selected={mode === option}
                onClick={() => {
                  setMode(option);
                  if (option === 'solo') setVisibility('private');
                }}
                className="font-display shadow-pop-sm rounded-full border-4 px-7 py-2.5 text-[24px] font-extrabold"
              >
                {MODE_LABELS[option]}
              </ChoiceButton>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="font-display m-0 text-[24px] font-bold">Mapa</h2>
          <div className="grid grid-cols-3 gap-[18px]">
            {MAP_IDS.map((option) => (
              <ChoiceButton
                key={option}
                selected={mapId === option}
                onClick={() => setMapId(option)}
                className="shadow-pop flex flex-col gap-2 rounded-3xl border-4 px-2.5 pb-3 pt-2.5 text-left"
              >
                <MapPreview mapId={option} />
                <div className="flex items-center justify-between gap-2 px-1">
                  <span className="font-display text-[21px] font-extrabold leading-[1.1]">{MAP_LABELS[option].name}</span>
                  <span className="border-ink bg-cream flex-none rounded-full border-[2.5px] px-2.5 py-0.5 text-[14px] font-extrabold">
                    {MAP_LABELS[option].difficulty}
                  </span>
                </div>
              </ChoiceButton>
            ))}
          </div>
        </section>

        <div className="mt-auto flex items-center justify-between">
          <span
            className={`text-[19px] font-bold ${errorMessage ? 'text-terracotta' : ''}`}
            role={errorMessage ? 'alert' : undefined}
          >
            {errorMessage ?? describeRoom(visibility, mode, mapId)}
          </span>
          <PillButton
            className="shadow-pop-md gap-2.5 border-[5px] px-11 py-2.5 text-[32px]"
            onClick={createRoom}
            disabled={isCreating}
          >
            {isCreating ? 'Creando…' : 'Crear sala'}
          </PillButton>
        </div>
      </Panel>
    </div>
  );
}

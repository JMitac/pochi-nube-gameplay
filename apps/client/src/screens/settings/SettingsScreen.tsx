import { BackArrowIcon } from '../../art/icons/icons';
import { ChoiceButton, RoundIconButton } from '../../components/ui/buttons';
import { ToggleSwitch, VolumeSlider } from '../../components/ui/formControls';
import { Keycap, Panel } from '../../components/ui/surfaces';
import { ScreenBackground } from '../../components/ScreenBackground';
import { useScreenMusic } from '../../hooks/useScreenMusic';
import { useNavigationStore } from '../../state/navigationStore';
import { useSettingsStore, type GraphicsQuality, type Handedness } from '../../state/settingsStore';
import { TouchLayoutPreview } from './TouchLayoutPreview';

const QUALITY_OPTIONS: Array<{ id: GraphicsQuality; label: string; description: string }> = [
  { id: 'low', label: 'Baja', description: 'Para celulares modestos' },
  { id: 'high', label: 'Alta', description: 'Sombras y más detalle' },
];

const HAND_OPTIONS: Array<{ id: Handedness; label: string }> = [
  { id: 'right', label: 'Diestro' },
  { id: 'left', label: 'Zurdo' },
];

/** 6 · Configuración */
export function SettingsScreen() {
  const navigate = useNavigationStore((state) => state.navigate);
  const settings = useSettingsStore();
  useScreenMusic('menu');

  return (
    <div className="bg-sky font-body text-ink relative h-[720px] w-[1280px] overflow-hidden">
      <ScreenBackground tint="ink" />

      <Panel className="absolute left-20 top-9 flex h-[648px] w-[1120px] flex-col gap-[22px] rounded-[40px] px-10 py-7">
        <div className="flex items-center gap-[18px]">
          <RoundIconButton
            label="Volver al menú"
            tone="white"
            className="shadow-pop-sm size-14 border-4"
            onClick={() => navigate('menu')}
          >
            <BackArrowIcon size={26} />
          </RoundIconButton>
          <h1 className="font-display m-0 text-[48px] font-extrabold leading-none">Configuración</h1>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-9">
          <div className="flex flex-col gap-[18px]">
            <h2 className="font-display m-0 text-[28px] font-extrabold">Sonido</h2>
            <VolumeSlider id="music-volume" label="Música" value={settings.musicVolume} onChange={settings.setMusicVolume} />
            <VolumeSlider
              id="effects-volume"
              label="Efectos y cuacs"
              value={settings.effectsVolume}
              onChange={settings.setEffectsVolume}
            />
            <div className="flex items-center justify-between">
              <span className="text-[19px] font-extrabold">Vibración</span>
              <ToggleSwitch label="Vibración" checked={settings.vibration} onChange={settings.setVibration} />
            </div>

            <h2 className="font-display mb-0 mt-2.5 text-[28px] font-extrabold">Gráficos</h2>
            <div className="flex flex-col gap-2">
              <span className="text-[19px] font-extrabold">Calidad</span>
              <div className="grid grid-cols-2 gap-3">
                {QUALITY_OPTIONS.map((option) => (
                  <ChoiceButton
                    key={option.id}
                    selected={settings.graphicsQuality === option.id}
                    onClick={() => settings.setGraphicsQuality(option.id)}
                    className="shadow-pop-sm flex flex-col items-start rounded-[20px] border-4 px-[18px] py-2 text-left"
                  >
                    <span className="font-display text-[24px] font-extrabold leading-[1.1]">{option.label}</span>
                    <span className="text-[15px] font-bold">{option.description}</span>
                  </ChoiceButton>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-display m-0 text-[28px] font-extrabold">Controles</h2>
            <div className="flex items-center justify-between">
              <span className="text-[19px] font-extrabold">Celular</span>
              <div className="flex gap-2">
                {HAND_OPTIONS.map((option) => (
                  <ChoiceButton
                    key={option.id}
                    selected={settings.handedness === option.id}
                    onClick={() => settings.setHandedness(option.id)}
                    className="font-display shadow-pop-sm rounded-full border-4 px-5 py-1.5 text-[20px] font-extrabold"
                  >
                    {option.label}
                  </ChoiceButton>
                ))}
              </div>
            </div>
            <TouchLayoutPreview handedness={settings.handedness} />
            <span className="text-[19px] font-extrabold">PC</span>
            <div className="grid grid-cols-2 gap-x-[18px] gap-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1">
                  {['W', 'A', 'S', 'D'].map((key) => (
                    <Keycap key={key} compact>
                      {key}
                    </Keycap>
                  ))}
                </div>
                <span className="text-[17px] font-bold">Moverse</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Keycap compact className="min-w-[110px]">
                  Espacio
                </Keycap>
                <span className="text-[17px] font-bold">Saltar</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Keycap compact>Q</Keycap>
                <span className="text-[17px] font-bold">Habilidad</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Keycap compact>C</Keycap>
                <span className="text-[17px] font-bold">¡Cuac!</span>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

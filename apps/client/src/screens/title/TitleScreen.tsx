import { DuckFigure } from '../../art/ducks/DuckFigure';
import { GearIcon, HeartIcon, PlayIcon } from '../../art/icons/icons';
import { RoundIconButton, PillButton } from '../../components/ui/buttons';
import { FullscreenButton } from '../../components/ui/FullscreenButton';
import { ScreenBackground } from '../../components/ScreenBackground';
import { useScreenMusic } from '../../hooks/useScreenMusic';
import { useNavigationStore } from '../../state/navigationStore';
import { GameTitle } from './GameTitle';

/** 1 · Portada */
export function TitleScreen() {
  const navigate = useNavigationStore((state) => state.navigate);
  useScreenMusic('menu');

  return (
    <div className="bg-sky font-body text-ink relative h-[720px] w-[1280px] overflow-hidden">
      <ScreenBackground mapId="meadow" />

      <div className="absolute left-0 right-0 top-[52px] flex flex-col items-center gap-1.5">
        <GameTitle />
        <div className="pop-in mt-3.5" style={{ animationDelay: '1.15s' }}>
          <div className="border-ink bg-terracotta font-display text-cream shadow-pop -rotate-2 rounded-full border-4 px-[30px] py-2 text-[34px] font-extrabold">
            ¡Pícnic en el Estanque!
          </div>
        </div>
      </div>

      <div className="slide-in-left absolute left-[300px] top-[318px]" style={{ animationDelay: '0.3s' }}>
        <DuckFigure duckId="pochi" size={250} pose="idle" direction="right" />
      </div>
      <div className="slide-in-right absolute left-[730px] top-[322px]" style={{ animationDelay: '0.3s' }}>
        <DuckFigure duckId="nube" size={245} pose="talk" direction="left" />
      </div>
      <div className="pop-in absolute left-[605px] top-[352px]" style={{ animationDelay: '1.4s' }}>
        <HeartIcon width={70} height={64} fill="#F08A8A" strokeWidth={4} withShine className="heartbeat block origin-center" />
      </div>

      <div
        className="pop-in absolute bottom-10 left-0 right-0 flex items-center justify-center gap-6"
        style={{ animationDelay: '1.5s' }}
      >
        <div className="button-breathe">
          <PillButton className="shadow-pop-lg gap-3.5 border-[5px] px-16 py-3 text-[44px]" onClick={() => navigate('menu')}>
            <PlayIcon />
            Jugar
          </PillButton>
        </div>
        <RoundIconButton
          label="Cómo jugar"
          className="font-display shadow-pop-lg size-[76px] border-[5px] text-[44px] font-extrabold leading-none"
          onClick={() => navigate('howToPlay')}
        >
          ?
        </RoundIconButton>
        <RoundIconButton
          label="Configuración"
          className="shadow-pop-lg size-[76px] border-[5px]"
          onClick={() => navigate('settings')}
        >
          <GearIcon size={36} />
        </RoundIconButton>
        <FullscreenButton className="shadow-pop-lg size-[76px] border-[5px]" iconSize={34} />
      </div>
    </div>
  );
}

import { DuckFigure } from '../../art/ducks/DuckFigure';
import { BackArrowIcon, BookIcon, GearIcon, ListIcon, PlusIcon, SearchIcon } from '../../art/icons/icons';
import { PillButton, RoundIconButton } from '../../components/ui/buttons';
import { OutlinedTitle } from '../../components/ui/surfaces';
import { ScreenBackground } from '../../components/ScreenBackground';
import { useScreenMusic } from '../../hooks/useScreenMusic';
import { useNavigationStore } from '../../state/navigationStore';
import { MenuCard } from './MenuCard';
import { PlayerNameBadge } from './PlayerNameBadge';

/** 2 · Menú principal */
export function MainMenuScreen() {
  const navigate = useNavigationStore((state) => state.navigate);
  useScreenMusic('menu');

  return (
    <div className="bg-sky font-body text-ink relative h-[720px] w-[1280px] overflow-hidden">
      <ScreenBackground tint="cream" />

      <div className="absolute left-10 right-10 top-8 flex items-center justify-between">
        <RoundIconButton label="Volver a la portada" className="shadow-pop size-16 border-4" onClick={() => navigate('title')}>
          <BackArrowIcon size={30} />
        </RoundIconButton>
        <OutlinedTitle className="text-[56px]" strokeWidth={8} shadowOffset={6}>
          Pochi y Nube
        </OutlinedTitle>
        <PlayerNameBadge />
      </div>

      <div className="absolute left-1/2 top-[170px] grid w-[880px] -translate-x-1/2 grid-cols-2 gap-7">
        <MenuCard
          title="Crear sala"
          subtitle="Pública o privada con código"
          tone="honey"
          iconBackground="bg-cream"
          icon={<PlusIcon size={48} />}
          onClick={() => navigate('createRoom')}
        />
        <MenuCard
          title="Buscar sala"
          subtitle="Entra con el código de sala"
          iconBackground="bg-sky"
          icon={<SearchIcon size={46} />}
          onClick={() => navigate('joinRoom')}
        />
        <MenuCard
          title="Salas públicas"
          subtitle="Únete a una sala abierta"
          iconBackground="bg-grass"
          icon={<ListIcon size={46} />}
          onClick={() => navigate('joinRoom')}
        />
        <MenuCard
          title="Configuración"
          subtitle="Volumen, calidad y controles"
          iconBackground="bg-rose"
          icon={<GearIcon size={46} />}
          onClick={() => navigate('settings')}
        />
      </div>

      <div className="absolute -bottom-[60px] left-10">
        <DuckFigure duckId="pochi" size={200} />
      </div>
      <div className="absolute -bottom-[60px] right-10 -scale-x-100">
        <DuckFigure duckId="nube" size={196} />
      </div>
      <div className="absolute bottom-9 left-0 right-0 flex justify-center">
        <PillButton
          tone="cream"
          className="shadow-pop gap-2.5 border-4 px-7 py-2 text-[24px]"
          onClick={() => navigate('howToPlay')}
        >
          <BookIcon size={24} />
          ¿Cómo jugar?
        </PillButton>
      </div>
    </div>
  );
}

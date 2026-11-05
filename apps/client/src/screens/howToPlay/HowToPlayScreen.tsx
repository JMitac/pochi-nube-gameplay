import { useState, type ComponentType } from 'react';
import { BackArrowIcon } from '../../art/icons/icons';
import { PillButton, RoundIconButton } from '../../components/ui/buttons';
import { Panel } from '../../components/ui/surfaces';
import { ScreenBackground } from '../../components/ScreenBackground';
import { audioEngine } from '../../audio/audioInstance';
import { useScreenMusic } from '../../hooks/useScreenMusic';
import { useNavigationStore } from '../../state/navigationStore';
import { AbilitiesSection, ControlsSection, DangersSection, FoodsSection, GoalSection, ModesSection } from './howToPlaySections';

interface HowToPlayPage {
  title: string;
  Content: ComponentType;
}

const PAGES: HowToPlayPage[] = [
  { title: 'Objetivo', Content: GoalSection },
  { title: 'Controles', Content: ControlsSection },
  { title: 'Frutas y puntos', Content: FoodsSection },
  { title: 'Habilidades', Content: AbilitiesSection },
  { title: '¡Cuidado!', Content: DangersSection },
  { title: 'Modos', Content: ModesSection },
];

/** 9 · Cómo jugar (6 pages) */
export function HowToPlayScreen() {
  const navigate = useNavigationStore((state) => state.navigate);
  const goBack = useNavigationStore((state) => state.goBack);
  const [pageIndex, setPageIndex] = useState(0);
  useScreenMusic('waiting');

  const isFirst = pageIndex === 0;
  const isLast = pageIndex === PAGES.length - 1;
  const { Content } = PAGES[pageIndex]!;

  return (
    <div className="bg-sky font-body text-ink relative h-[720px] w-[1280px] overflow-hidden">
      <ScreenBackground mapId="meadow" tint="ink" />

      <Panel className="absolute left-10 top-7 flex h-[664px] w-[1200px] flex-col gap-[18px] rounded-[40px] px-8 py-6">
        <div className="flex items-center gap-[18px]">
          <RoundIconButton
            label="Volver"
            tone="white"
            className="shadow-pop-sm size-14 border-4"
            onClick={goBack}
          >
            <BackArrowIcon size={26} />
          </RoundIconButton>
          <h1 className="font-display m-0 text-[48px] font-extrabold leading-none">Cómo jugar</h1>
          <span className="ml-auto text-[18px] font-extrabold">
            {pageIndex + 1} de {PAGES.length}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 gap-6">
          <nav aria-label="Secciones" className="flex w-[250px] flex-none flex-col gap-2.5">
            {PAGES.map((page, index) => (
              <button
                key={page.title}
                type="button"
                aria-current={index === pageIndex ? 'step' : undefined}
                onClick={() => {
                  audioEngine.playEffect('button');
                  setPageIndex(index);
                }}
                className={`press-pop border-ink text-ink shadow-pop-sm flex items-center gap-3 rounded-[20px] border-4 px-3.5 py-2 text-left ${
                  index === pageIndex ? 'bg-honey' : 'bg-white'
                }`}
              >
                <span className="border-ink bg-cream font-display flex size-8 flex-none items-center justify-center rounded-full border-[3px] text-[18px] font-extrabold">
                  {index + 1}
                </span>
                <span className="font-display text-[22px] font-extrabold leading-[1.1]">{page.title}</span>
              </button>
            ))}
          </nav>

          <div className="border-ink relative box-border min-w-0 flex-1 overflow-hidden rounded-[28px] border-4 bg-white px-[26px] py-[22px]">
            <div key={pageIndex} className="page-slide-in">
              <Content />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <PillButton
            tone="white"
            className="shadow-pop-sm border-4 px-7 py-1.5 text-[22px]"
            onClick={() => (isFirst ? goBack() : setPageIndex((index) => index - 1))}
          >
            Anterior
          </PillButton>
          {isLast ? (
            <PillButton className="shadow-pop-sm border-4 px-9 py-1.5 text-[22px]" onClick={() => navigate('createRoom')}>
              ¡A jugar!
            </PillButton>
          ) : (
            <PillButton
              className="shadow-pop-sm border-4 px-9 py-1.5 text-[22px]"
              onClick={() => setPageIndex((index) => index + 1)}
            >
              Siguiente
            </PillButton>
          )}
        </div>
      </Panel>
    </div>
  );
}

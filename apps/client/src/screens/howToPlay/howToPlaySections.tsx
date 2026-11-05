import type { ReactNode } from 'react';
import { FOOD_RULES, type FoodKind } from '@pochi/shared';
import { DuckFigure } from '../../art/ducks/DuckFigure';
import { FoodIcon } from '../../art/food/FoodIcon';
import { Keycap } from '../../components/ui/surfaces';

const SECTION_TITLE = 'm-0 font-display text-[36px] leading-[1.1] font-extrabold';
const CARD_TITLE = 'font-display text-[22px] leading-[1.1] font-extrabold';
const CARD_TEXT = 'text-[15px] leading-[1.4] font-bold';

// ---------- 1 · Objetivo ----------

const PHASE_CARDS = [
  { time: '0:00 – 0:30', text: 'Tranquilo: caen pocas frutas', color: 'bg-[#E9F3E2]' },
  { time: '0:30 – 1:30', text: 'Se complica: lluvia y charcos', color: 'bg-[#FDF0D2]' },
  { time: 'Últimos 30 s', text: '¡Lluvia de frutas! Puntos ×2', color: 'bg-[#FBDCDD]' },
];

export function GoalSection() {
  return (
    <div className="flex flex-col gap-3.5">
      <h2 className={SECTION_TITLE}>Atrapa la comida antes de que toque el pasto</h2>
      <p className="m-0 max-w-[560px] text-[19px] font-bold leading-[1.45]">
        Cada partida dura 2 minutos. Gana quien llene más la canasta.
      </p>
      <ol className="m-0 flex max-w-[540px] flex-col gap-2 pl-6 text-[18px] font-bold leading-[1.4]">
        <li>Mira la sombrita que crece en el suelo: ahí va a caer la fruta.</li>
        <li>Corre y ponte justo debajo para atraparla.</li>
        <li>Salta para alcanzar las que rebotan alto, como los melocotones.</li>
      </ol>
      <div className="mt-1.5 flex gap-2.5">
        {PHASE_CARDS.map((phase) => (
          <div key={phase.time} className={`border-ink flex-1 rounded-2xl border-[3px] px-3 py-2 ${phase.color}`}>
            <div className="font-display text-[20px] font-extrabold">{phase.time}</div>
            <div className="text-[15px] font-bold">{phase.text}</div>
          </div>
        ))}
      </div>
      <div className="mt-0.5 flex justify-end pr-6">
        <DuckFigure duckId="pochi" size={112} pose="walk" direction="left" />
      </div>
    </div>
  );
}

// ---------- 2 · Controles ----------

function ControlRow({ keys, action }: { keys: ReactNode; action: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {keys}
      <span className="text-[17px] font-bold">{action}</span>
    </div>
  );
}

export function ControlsSection() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className={SECTION_TITLE}>Controles</h2>
      <p className="m-0 mb-1 text-[17px] font-bold">Cada jugador usa su propio dispositivo.</p>
      <div className="grid grid-cols-2 gap-5">
        <div className="border-ink flex flex-col gap-2.5 rounded-[20px] border-[3px] bg-[#F4F8FB] px-4 py-3">
          <span className={CARD_TITLE}>En PC</span>
          <ControlRow
            keys={
              <div className="flex gap-1">
                {['W', 'A', 'S', 'D'].map((key) => (
                  <Keycap key={key}>{key}</Keycap>
                ))}
              </div>
            }
            action="Moverse"
          />
          <ControlRow keys={<Keycap className="min-w-[110px]">Espacio</Keycap>} action="Saltar" />
          <ControlRow keys={<Keycap>Q</Keycap>} action="Habilidad" />
          <ControlRow keys={<Keycap>C</Keycap>} action="¡Cuac! para saludar" />
        </div>
        <div className="border-ink flex flex-col gap-2 rounded-[20px] border-[3px] bg-[#F4F8FB] px-4 py-3">
          <span className={CARD_TITLE}>En celular (horizontal)</span>
          <div className="border-ink bg-grass relative h-28 rounded-[18px] border-[3px]" aria-hidden="true">
            <div className="border-ink absolute bottom-2.5 left-3 box-border flex size-16 items-center justify-center rounded-full border-4 bg-[rgba(255,255,255,0.6)]">
              <div className="border-ink bg-cream size-[26px] rounded-full border-[3px]" />
            </div>
            <span className="absolute left-3.5 top-1.5 text-[13px] font-extrabold">Mover</span>
            <div className="absolute bottom-2.5 right-3 flex items-end gap-1.5">
              <div className="border-ink bg-cream size-[26px] rounded-full border-[3px]" />
              <div className="border-ink bg-olive-deep size-9 rounded-full border-[3px]" />
              <div className="border-ink bg-honey size-[54px] rounded-full border-4" />
            </div>
            <span className="absolute right-3 top-1.5 text-[13px] font-extrabold">Cuac · Habilidad · Saltar</span>
          </div>
          <span className="text-[14px] font-bold leading-[1.35]">¿Eres zurdo? En Configuración puedes invertir los lados.</span>
        </div>
      </div>
    </div>
  );
}

// ---------- 3 · Frutas y puntos ----------

interface FoodRow {
  kinds: FoodKind[];
  name: string;
  extra: string;
}

const FOOD_ROWS: FoodRow[] = [
  { kinds: ['pear', 'pricklyPear', 'peach'], name: 'Pera, tuna, melocotón', extra: 'Favoritas de Pochi' },
  { kinds: ['strawberry', 'blueberry'], name: 'Fresa, arándano', extra: 'Favoritas de Nube' },
  { kinds: ['bread'], name: 'Pan de molde', extra: 'Llena la barra de cariño' },
  { kinds: ['goldenFruit'], name: 'Fruta dorada (rara)', extra: 'Aparece pocas veces' },
  { kinds: ['rottenApple'], name: 'Manzana podrida', extra: 'Te mareas 1 segundo' },
];

function formatPoints(points: number): string {
  return points < 0 ? `−${Math.abs(points)}` : String(points);
}

const TABLE_COLUMNS = 'grid grid-cols-[1.6fr_0.6fr_0.6fr_1.3fr] items-center';

export function FoodsSection() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className={SECTION_TITLE}>Frutas y puntos</h2>
      <p className="m-0 text-[18px] font-bold">Cada patito gana el doble con sus frutas favoritas: ¡conviene repartirse!</p>
      <div className="border-ink flex flex-col overflow-hidden rounded-[18px] border-[3px]">
        <div className={`${TABLE_COLUMNS} bg-ink text-cream px-3.5 py-2 text-[16px] font-extrabold`}>
          <span>Comida</span>
          <span>Pochi</span>
          <span>Nube</span>
          <span>Extra</span>
        </div>
        {FOOD_ROWS.map((row, index) => {
          const points = FOOD_RULES[row.kinds[0]!].points;
          const isLast = index === FOOD_ROWS.length - 1;
          return (
            <div
              key={row.name}
              className={`${TABLE_COLUMNS} px-3.5 py-1.5 text-[17px] font-bold ${isLast ? 'bg-[#F6F1E6]' : 'border-muted border-b-2'}`}
            >
              <span className="flex items-center gap-1.5">
                {row.kinds.map((kind) => (
                  <FoodIcon key={kind} kind={kind} />
                ))}
                {row.name}
              </span>
              <span className="font-display text-[22px] font-extrabold">{formatPoints(points.pochi)}</span>
              <span className="font-display text-[22px] font-extrabold">{formatPoints(points.nube)}</span>
              <span>{row.extra}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- 4 · Habilidades y cariño ----------

export function AbilitiesSection() {
  return (
    <div className="flex flex-col gap-3.5">
      <h2 className={SECTION_TITLE}>Habilidades y cariño</h2>
      <p className="m-0 text-[18px] font-bold">
        Las habilidades se usan con Q (o el botón mediano) y se recargan cada 15 segundos.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-ink flex items-center gap-3 rounded-[20px] border-[3px] bg-[#F3F1E2] p-3">
          <div className="flex size-[110px] flex-none items-end justify-center overflow-hidden">
            <DuckFigure duckId="pochi" size={104} />
          </div>
          <div className="flex flex-col gap-1">
            <span className={CARD_TITLE}>Snack compartido</span>
            <span className={CARD_TEXT}>
              Pochi lanza un snack de su mochila. En cooperativo, Nube corre más rápido 4 s. En versus, deja un pan que distrae al
              rival.
            </span>
          </div>
        </div>
        <div className="border-ink flex items-center gap-3 rounded-[20px] border-[3px] bg-[#F8ECE6] p-3">
          <div className="flex size-[110px] flex-none items-end justify-center overflow-hidden">
            <DuckFigure duckId="nube" size={104} pose="talk" />
          </div>
          <div className="flex flex-col gap-1">
            <span className={CARD_TITLE}>Plan del paseo</span>
            <span className={CARD_TEXT}>
              Nube ve durante 5 s dónde caerán las próximas 5 frutas, aunque todavía no tengan sombra.
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-ink flex flex-col gap-1.5 rounded-[20px] border-[3px] bg-[#FBDCDD] px-4 py-3">
          <span className={CARD_TITLE}>Barra de cariño</span>
          <div className="border-ink bg-cream box-border h-5 overflow-hidden rounded-full border-[3px]">
            <div className="bg-blush h-full w-[70%]" />
          </div>
          <span className={CARD_TEXT}>Se llena con pan y combos. Llena, brillan y atrapan con un radio más grande por 5 s.</span>
        </div>
        <div className="border-ink flex flex-col gap-1.5 rounded-[20px] border-[3px] bg-[#FBDCDD] px-4 py-3">
          <span className={CARD_TITLE}>×2 ¡Juntitos!</span>
          <span className={CARD_TEXT}>En cooperativo, si están a menos de 2 pasos, cada fruta vale el doble.</span>
        </div>
      </div>
    </div>
  );
}

// ---------- 5 · ¡Cuidado! ----------

const DANGERS = [
  {
    title: 'Charcos',
    text: 'Pochi cae de panza y se queda quieto 1 s. Nube da saltitos y va a media velocidad.',
    color: 'bg-[#E4F2F8]',
    icon: (
      <>
        <ellipse cx="32" cy="24" rx="28" ry="12" fill="#8ACBE2" stroke="#4A3424" strokeWidth="3" />
        <path d="M18 22 Q26 18 34 22" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Nubes de lluvia',
    text: 'Se mueven por el mapa y dejan charcos nuevos donde pasan.',
    color: 'bg-[#EEF0F4]',
    icon: (
      <>
        <path
          d="M8 22 Q8 10 20 10 Q26 2 36 6 Q48 2 52 14 Q60 14 60 22 Q60 28 52 28 L14 28 Q8 28 8 22 Z"
          fill="#B8C2D0"
          stroke="#4A3424"
          strokeWidth="3"
        />
        <path d="M20 32 l-2 6 M32 32 l-2 6 M44 32 l-2 6" stroke="#5C8FC2" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Manzanas podridas',
    text: 'Restan 10 puntos y te marean un segundo. ¡Esquívalas!',
    color: 'bg-[#F1EFE0]',
    icon: (
      <>
        <circle cx="32" cy="20" r="15" fill="#8E8A4E" stroke="#4A3424" strokeWidth="3" />
        <path d="M25 16 q3 -4 7 0 M32 25 q3 4 7 0" stroke="#5B5630" strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    ),
  },
];

export function DangersSection() {
  return (
    <div className="flex flex-col gap-3.5">
      <h2 className={SECTION_TITLE}>¡Cuidado con…!</h2>
      <div className="flex max-w-[560px] flex-col gap-3">
        {DANGERS.map((danger) => (
          <div
            key={danger.title}
            className={`border-ink flex items-center gap-3.5 rounded-[20px] border-[3px] px-4 py-3 ${danger.color}`}
          >
            <svg width="64" height="40" viewBox="0 0 64 40" className="flex-none" aria-hidden="true">
              {danger.icon}
            </svg>
            <div>
              <div className="font-display text-[22px] font-extrabold">{danger.title}</div>
              <div className={CARD_TEXT}>{danger.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 right-[22px]">
        <DuckFigure duckId="nube" size={180} pose="jump" direction="left" />
      </div>
    </div>
  );
}

// ---------- 6 · Modos ----------

const MODES = [
  {
    title: 'Cooperativo',
    text: 'Llenan una sola canasta juntos. Al final reciben 1, 2 o 3 estrellas según el puntaje.',
    color: 'bg-[#FDF0D2]',
  },
  {
    title: 'Versus',
    text: 'Cada uno con su canasta. Salta cerca del otro para darle un aleteo y robarle una fruta.',
    color: 'bg-[#E4F2F8]',
  },
  { title: 'Solo', text: 'Elige a Pochi o a Nube y juega contra tu propio récord.', color: 'bg-[#E9F3E2]' },
];

export function ModesSection() {
  return (
    <div className="flex flex-col gap-3.5">
      <h2 className={SECTION_TITLE}>Modos de juego</h2>
      <div className="grid grid-cols-3 gap-3.5">
        {MODES.map((mode) => (
          <div key={mode.title} className={`border-ink flex flex-col gap-1.5 rounded-[20px] border-[3px] p-3.5 ${mode.color}`}>
            <span className="font-display text-[24px] font-extrabold">{mode.title}</span>
            <span className={CARD_TEXT}>{mode.text}</span>
          </div>
        ))}
      </div>
      <div className="border-ink rounded-[20px] border-[3px] bg-[#F4F8FB] px-4 py-3 text-[16px] font-bold leading-[1.45]">
        Para jugar con alguien: crea una sala privada y comparte el código que aparece arriba, o únete a una sala pública desde el
        menú.
      </div>
      <div className="flex h-[120px] items-end justify-center gap-[30px]">
        <DuckFigure duckId="pochi" size={100} pose="walk" direction="right" />
        <DuckFigure duckId="nube" size={98} pose="talk" direction="left" />
      </div>
    </div>
  );
}

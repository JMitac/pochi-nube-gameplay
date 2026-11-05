import type { DuckId, FoodKind, GameMode, MapId, PhaseId } from '@pochi/shared';

/** Spanish copy shown on screen. Code stays in English; the game speaks Spanish. */

export interface MapLabel {
  name: string;
  difficulty: string;
  /** Colours of the small map preview card in "Crear sala". */
  preview: { sky: string; ground: string; water: string; waterWidth: number; fruit: string };
}

export const MAP_LABELS: Record<MapId, MapLabel> = {
  meadow: {
    name: 'Pradera del Estanque',
    difficulty: 'Fácil',
    preview: { sky: '#CFEAF4', ground: '#B9DC9A', water: '#8ACBE2', waterWidth: 70, fruit: '#F5C64F' },
  },
  orchard: {
    name: 'Huerto de Frutas',
    difficulty: 'Media',
    preview: { sky: '#FBE3C4', ground: '#D9C27E', water: '#8ACBE2', waterWidth: 0, fruit: '#E9806A' },
  },
  lagoon: {
    name: 'Laguna de Invierno',
    difficulty: 'Difícil',
    preview: { sky: '#E4EEF6', ground: '#F4F7FA', water: '#A9D8EC', waterWidth: 120, fruit: '#7E8FD8' },
  },
};

export const MODE_LABELS: Record<GameMode, string> = {
  coop: 'Cooperativo',
  versus: 'Versus',
  solo: 'Solo',
};

export const PHASE_LABELS: Record<PhaseId, string> = {
  calm: 'Fase 1 · Tranquilo',
  tricky: 'Fase 2 · ¡Se complica!',
  fruitRain: 'Fase 3 · ¡Lluvia de frutas!',
};

export const DUCK_LIKES: Record<DuckId, string> = {
  pochi: 'Le encantan las peras, tunas y melocotones',
  nube: 'Le encantan las fresas y los arándanos',
};

export const DUCK_AVATAR_BACKGROUNDS: Record<DuckId, string> = {
  pochi: '#CFEAF4',
  nube: '#F7D3C7',
};

export const DUCK_QUACK_TEXT: Record<DuckId, string> = {
  pochi: '¡Rrraeb!',
  nube: '¡Cuac-cuac!',
};

export const DUCK_ABILITY_LABELS: Record<DuckId, { short: string; full: string }> = {
  pochi: { short: 'Snack', full: 'Snack compartido' },
  nube: { short: 'Plan', full: 'Plan del paseo' },
};

/** Plural names and chip colours used in the results screen. */
export const FOOD_RESULT_LABELS: Record<FoodKind, { plural: string; chipColor: string }> = {
  pear: { plural: 'Peras', chipColor: '#EEF3CC' },
  pricklyPear: { plural: 'Tunas', chipColor: '#EEF3CC' },
  peach: { plural: 'Melocotones', chipColor: '#FBE3C4' },
  strawberry: { plural: 'Fresas', chipColor: '#F9D3D5' },
  blueberry: { plural: 'Arándanos', chipColor: '#DCE2F7' },
  bread: { plural: 'Pan', chipColor: '#FFF3D6' },
  goldenFruit: { plural: 'Doradas', chipColor: '#FFF1BF' },
  rottenApple: { plural: 'Podridas', chipColor: '#E6E3C8' },
};

import type { FoodKind } from '@pochi/shared';

const INK = '#4A3424';

export interface SpriteArt {
  /** viewBox in the design's own coordinates, so the shapes stay untouched. */
  viewBox: string;
  /** Width in stage pixels when drawn in the game. */
  width: number;
  shapes: React.JSX.Element;
}

/**
 * Falling food, taken from the "Juego" artboard. The ones that do not appear
 * there (tuna and peach) use the table icons, scaled to the same size.
 */
export const FOOD_SPRITES: Record<FoodKind, SpriteArt> = {
  pear: {
    viewBox: '510 178 70 94',
    width: 62,
    shapes: (
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
        <path
          d="M545 196 Q560 196 562 214 Q578 236 568 254 Q558 268 545 268 Q532 268 522 254 Q512 236 528 214 Q530 196 545 196 Z"
          fill="#C9DB6A"
        />
        <path d="M545 196 Q546 186 552 182" fill="none" strokeLinecap="round" />
        <path d="M548 188 Q560 180 566 188 Q558 194 548 188 Z" fill="#78B464" strokeWidth="3" />
      </g>
    ),
  },
  strawberry: {
    viewBox: '864 120 52 66',
    width: 50,
    shapes: (
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
        <path d="M890 132 Q910 132 912 150 Q910 172 890 182 Q870 172 868 150 Q870 132 890 132 Z" fill="#E8525A" />
        <path d="M878 132 L890 124 L902 132 L896 138 L884 138 Z" fill="#78B464" strokeWidth="3" />
        <g fill="#FFE29A" stroke="none">
          <circle cx="882" cy="150" r="2" />
          <circle cx="896" cy="148" r="2" />
          <circle cx="889" cy="162" r="2" />
          <circle cx="880" cy="166" r="2" />
          <circle cx="899" cy="164" r="2" />
        </g>
      </g>
    ),
  },
  bread: {
    viewBox: '274 236 52 60',
    width: 52,
    shapes: (
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
        <path d="M278 252 Q278 240 292 240 Q300 236 308 240 Q322 240 322 252 L322 292 L278 292 Z" fill="#E7B66E" />
        <path d="M284 256 L316 256 L316 286 L284 286 Z" fill="#FFF3D6" strokeWidth="0" />
      </g>
    ),
  },
  goldenFruit: {
    viewBox: '960 274 100 70',
    width: 96,
    shapes: (
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
        <circle cx="1010" cy="314" r="26" fill="#F6C93C" />
        <path d="M998 302 Q1004 296 1012 298" stroke="#FFF8EC" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M1010 288 Q1012 280 1018 278" fill="none" strokeLinecap="round" />
        <g stroke="#FFF2B0" strokeWidth="3" strokeLinecap="round">
          <path d="M972 290 l-8 -6 M1048 290 l8 -6" fill="none" />
        </g>
      </g>
    ),
  },
  rottenApple: {
    viewBox: '418 106 44 44',
    width: 42,
    shapes: (
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
        <circle cx="440" cy="128" r="18" fill="#8E8A4E" />
        <path d="M432 122 q4 -4 8 0 M440 132 q4 4 8 0" stroke="#5B5630" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  blueberry: {
    viewBox: '704 70 32 32',
    width: 30,
    shapes: (
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
        <circle cx="720" cy="86" r="12" fill="#5C6FC2" />
        <path d="M716 80 l4 4 l4 -4" stroke="#C9D2F5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  pricklyPear: {
    viewBox: '6 5 28 34',
    width: 46,
    shapes: (
      <>
        <ellipse cx="20" cy="22" rx="11" ry="14" fill="#D9466E" stroke={INK} strokeWidth="2.5" />
        <circle cx="16" cy="18" r="1.4" fill={INK} />
        <circle cx="24" cy="24" r="1.4" fill={INK} />
        <circle cx="18" cy="28" r="1.4" fill={INK} />
      </>
    ),
  },
  peach: {
    viewBox: '5 7 30 30',
    width: 50,
    shapes: (
      <>
        <circle cx="20" cy="22" r="13" fill="#F5A86B" stroke={INK} strokeWidth="2.5" />
        <path d="M20 10 Q16 22 20 34" stroke="#E9806A" strokeWidth="2.5" fill="none" />
      </>
    ),
  },
};

/** Rain cloud, from the "¡Cuidado!" page of "Cómo jugar". */
export const RAIN_CLOUD_SPRITE: SpriteArt = {
  viewBox: '6 4 56 36',
  width: 190,
  shapes: (
    <>
      <path
        d="M8 22 Q8 10 20 10 Q26 2 36 6 Q48 2 52 14 Q60 14 60 22 Q60 28 52 28 L14 28 Q8 28 8 22 Z"
        fill="#B8C2D0"
        stroke={INK}
        strokeWidth="3"
      />
      <path d="M20 32 l-2 6 M32 32 l-2 6 M44 32 l-2 6" stroke="#5C8FC2" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
};

export function puddleSprite(isCold: boolean): SpriteArt {
  return {
    viewBox: '-102 -42 204 84',
    width: 204,
    shapes: (
      <>
        <ellipse cx="0" cy="0" rx="100" ry="40" fill={isCold ? '#A9D8EC' : '#8ACBE2'} stroke={INK} strokeWidth="3.5" />
        <path d="M-50 -6 Q-22 -16 6 -6" stroke="#FFFFFF" strokeWidth="5" fill="none" strokeLinecap="round" />
      </>
    ),
  };
}

/** Where a fruit will land, shown by Nube's "Plan del paseo". */
export const LANDING_MARKER_SPRITE: SpriteArt = {
  viewBox: '-52 -22 104 44',
  width: 104,
  shapes: (
    <ellipse
      cx="0"
      cy="0"
      rx="48"
      ry="18"
      fill="rgba(246, 184, 60, 0.35)"
      stroke="#F6B83C"
      strokeWidth="4"
      strokeDasharray="10 7"
    />
  ),
};

export function SpriteSvg({ art, width }: { art: SpriteArt; width?: number }) {
  const [, , viewWidth, viewHeight] = art.viewBox.split(' ').map(Number);
  const drawnWidth = width ?? art.width;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={drawnWidth}
      height={(drawnWidth * (viewHeight ?? 1)) / (viewWidth ?? 1)}
      viewBox={art.viewBox}
      aria-hidden="true"
    >
      {art.shapes}
    </svg>
  );
}

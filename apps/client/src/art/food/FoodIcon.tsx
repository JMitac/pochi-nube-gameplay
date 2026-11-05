import type { FoodKind } from '@pochi/shared';

const INK = '#4A3424';

/** Small food icons from the "Frutas y puntos" table of the design (40×40). */
const FOOD_ICON_SHAPES: Record<FoodKind, React.JSX.Element> = {
  pear: (
    <>
      <path
        d="M20 8 Q26 8 27 14 Q34 22 30 30 Q26 36 20 36 Q14 36 10 30 Q6 22 13 14 Q14 8 20 8 Z"
        fill="#C9DB6A"
        stroke={INK}
        strokeWidth="2.5"
      />
      <path d="M20 8 Q21 4 24 3" stroke={INK} strokeWidth="2.5" fill="none" />
    </>
  ),
  pricklyPear: (
    <>
      <ellipse cx="20" cy="22" rx="11" ry="14" fill="#D9466E" stroke={INK} strokeWidth="2.5" />
      <circle cx="16" cy="18" r="1.4" fill={INK} />
      <circle cx="24" cy="24" r="1.4" fill={INK} />
      <circle cx="18" cy="28" r="1.4" fill={INK} />
    </>
  ),
  peach: (
    <>
      <circle cx="20" cy="22" r="13" fill="#F5A86B" stroke={INK} strokeWidth="2.5" />
      <path d="M20 10 Q16 22 20 34" stroke="#E9806A" strokeWidth="2.5" fill="none" />
    </>
  ),
  strawberry: (
    <>
      <path d="M20 36 Q8 26 9 16 Q12 10 20 11 Q28 10 31 16 Q32 26 20 36 Z" fill="#E8525A" stroke={INK} strokeWidth="2.5" />
      <path d="M12 12 L20 6 L28 12 L20 14 Z" fill="#78B464" stroke={INK} strokeWidth="2" />
      <circle cx="16" cy="20" r="1.3" fill="#FFE29A" />
      <circle cx="24" cy="21" r="1.3" fill="#FFE29A" />
      <circle cx="20" cy="27" r="1.3" fill="#FFE29A" />
    </>
  ),
  blueberry: (
    <>
      <circle cx="20" cy="22" r="11" fill="#5C6FC2" stroke={INK} strokeWidth="2.5" />
      <path d="M16 15 l4 4 l4 -4" stroke="#C9D2F5" strokeWidth="2" fill="none" />
    </>
  ),
  bread: (
    <>
      <path d="M8 18 Q8 8 20 8 Q32 8 32 18 L32 34 L8 34 Z" fill="#E7B66E" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M12 18 L28 18 L28 30 L12 30 Z" fill="#FFF3D6" />
    </>
  ),
  goldenFruit: (
    <>
      <circle cx="20" cy="21" r="13" fill="#F6C93C" stroke={INK} strokeWidth="2.5" />
      <path d="M14 16 Q17 12 21 13" stroke="#FFF8EC" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  ),
  rottenApple: (
    <>
      <circle cx="20" cy="22" r="12" fill="#8E8A4E" stroke={INK} strokeWidth="2.5" />
      <path d="M14 18 q3 -3 6 0 M20 26 q3 3 6 0" stroke="#5B5630" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  ),
};

export function FoodIcon({ kind, size = 30 }: { kind: FoodKind; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      {FOOD_ICON_SHAPES[kind]}
    </svg>
  );
}

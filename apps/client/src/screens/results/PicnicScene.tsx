import { DuckFigure } from '../../art/ducks/DuckFigure';
import { HeartIcon } from '../../art/icons/icons';

/** Right side of the results screen: both ducks on the picnic blanket with floating hearts. */
export function PicnicScene() {
  return (
    <>
      <svg width="500" height="160" viewBox="0 0 500 160" className="absolute left-[740px] top-[470px]" aria-hidden="true">
        <path d="M30 40 L470 20 L490 140 L10 150 Z" fill="#E9806A" stroke="#4A3424" strokeWidth="5" strokeLinejoin="round" />
        <g stroke="#FFF8EC" strokeWidth="10" opacity="0.6">
          <path d="M140 35 L130 146 M250 30 L250 145 M360 25 L372 142" />
          <path d="M22 80 L480 62 M14 118 L486 104" />
        </g>
      </svg>
      <div className="absolute left-[760px] top-[312px]">
        <DuckFigure duckId="pochi" size={210} />
      </div>
      <div className="absolute left-[950px] top-[316px] -scale-x-100">
        <DuckFigure duckId="nube" size={205} />
      </div>
      <HeartIcon
        width={56}
        height={52}
        fill="#F08A8A"
        strokeWidth={5}
        className="absolute left-[948px] top-[270px]"
        style={{ animation: 'heart-float 2.4s ease-out infinite' }}
      />
      <HeartIcon
        width={34}
        height={32}
        fill="#F7A9B4"
        strokeWidth={6}
        className="absolute left-[1010px] top-[236px]"
        style={{ animation: 'heart-float 2.4s ease-out 1.2s infinite both' }}
      />
    </>
  );
}

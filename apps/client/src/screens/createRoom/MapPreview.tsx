import type { MapId } from '@pochi/shared';
import { MAP_LABELS } from '../../domain/labels';

/** Little landscape drawn on each map card of "Crear sala". */
export function MapPreview({ mapId }: { mapId: MapId }) {
  const { sky, ground, water, waterWidth, fruit } = MAP_LABELS[mapId].preview;
  return (
    <svg
      width="100%"
      height="88"
      viewBox="0 0 300 88"
      preserveAspectRatio="xMidYMid slice"
      className="border-ink box-border block rounded-[14px] border-[3px]"
      aria-hidden="true"
    >
      <rect width="300" height="88" fill={sky} />
      <path d="M0 44 Q80 28 160 40 T300 36 V88 H0 Z" fill={ground} />
      <ellipse cx="150" cy="68" rx={waterWidth} ry="12" fill={water} stroke="#4A3424" strokeWidth="2.5" />
      <circle cx="40" cy="34" r="20" fill="#78B464" stroke="#4A3424" strokeWidth="2.5" />
      <circle cx="262" cy="30" r="22" fill="#78B464" stroke="#4A3424" strokeWidth="2.5" />
      <circle cx="34" cy="30" r="4" fill={fruit} />
      <circle cx="268" cy="26" r="4" fill={fruit} />
    </svg>
  );
}

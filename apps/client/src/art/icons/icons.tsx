import type { CSSProperties, ReactNode } from 'react';

/** Stroke icons used across the screens, copied from the design. All are decorative. */

const INK = '#4A3424';

interface IconProps {
  size?: number;
  className?: string;
}

interface StrokeIconProps extends IconProps {
  strokeWidth?: number;
  children: ReactNode;
}

function StrokeIcon({ size = 24, strokeWidth = 2.6, className, children }: StrokeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={INK}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function BackArrowIcon({ size = 26, strokeWidth = 3 }: IconProps & { strokeWidth?: number }) {
  return (
    <StrokeIcon size={size} strokeWidth={strokeWidth}>
      <path d="M15 5 L8 12 L15 19" />
    </StrokeIcon>
  );
}

export function GearIcon({ size = 36, strokeWidth = 2.4 }: IconProps & { strokeWidth?: number }) {
  return (
    <StrokeIcon size={size} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5 V5 M12 19 V21.5 M2.5 12 H5 M19 12 H21.5 M5.3 5.3 L7 7 M17 17 L18.7 18.7 M5.3 18.7 L7 17 M17 7 L18.7 5.3" />
    </StrokeIcon>
  );
}

export function PlusIcon({ size = 48 }: IconProps) {
  return (
    <StrokeIcon size={size} strokeWidth={3}>
      <path d="M12 5 V19 M5 12 H19" />
    </StrokeIcon>
  );
}

export function SearchIcon({ size = 46 }: IconProps) {
  return (
    <StrokeIcon size={size} strokeWidth={2.8}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15 L20 20" />
    </StrokeIcon>
  );
}

export function ListIcon({ size = 46 }: IconProps) {
  return (
    <StrokeIcon size={size} strokeWidth={2.8}>
      <path d="M5 6 H19 M5 12 H19 M5 18 H13" />
    </StrokeIcon>
  );
}

export function BookIcon({ size = 24 }: IconProps) {
  return (
    <StrokeIcon size={size}>
      <path d="M4 5 a2 2 0 0 1 2 -2 H11 V20 H6 a2 2 0 0 0 -2 2 Z M20 5 a2 2 0 0 0 -2 -2 H13 V20 H18 a2 2 0 0 1 2 2 Z" />
    </StrokeIcon>
  );
}

export function UserIcon({ size = 22 }: IconProps) {
  return (
    <StrokeIcon size={size}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21 c1 -5 15 -5 16 0" />
    </StrokeIcon>
  );
}

export function LockIcon({ size = 26 }: IconProps) {
  return (
    <StrokeIcon size={size}>
      <rect x="5" y="11" width="14" height="9" rx="2.5" />
      <path d="M8 11 V8 a4 4 0 0 1 8 0 V11" />
    </StrokeIcon>
  );
}

export function GlobeIcon({ size = 26 }: IconProps) {
  return (
    <StrokeIcon size={size}>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12 H20 M12 4 Q7 12 12 20 Q17 12 12 4" />
    </StrokeIcon>
  );
}

export function CopyIcon({ size = 22 }: IconProps) {
  return (
    <StrokeIcon size={size}>
      <rect x="8" y="8" width="12" height="12" rx="3" />
      <path d="M16 8 V6 a2 2 0 0 0 -2 -2 H6 a2 2 0 0 0 -2 2 V14 a2 2 0 0 0 2 2 H8" />
    </StrokeIcon>
  );
}

export function RefreshIcon({ size = 24 }: IconProps) {
  return (
    <StrokeIcon size={size} strokeWidth={2.8}>
      <path d="M20 12 a8 8 0 1 1 -2.5 -5.8 M20 4 V8 H16" />
    </StrokeIcon>
  );
}

export function CheckIcon({ size = 16 }: IconProps) {
  return (
    <StrokeIcon size={size} strokeWidth={3.4}>
      <path d="M5 12 L10 17 L19 7" />
    </StrokeIcon>
  );
}

export function ClockIcon({ size = 26 }: IconProps) {
  return (
    <StrokeIcon size={size} strokeWidth={2.8}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9 V13 L15 15 M9 3 H15" />
    </StrokeIcon>
  );
}

export function UpArrowIcon({ size = 56 }: IconProps) {
  return (
    <StrokeIcon size={size} strokeWidth={3.4}>
      <path d="M12 19 V6 M6 11 L12 5 L18 11" />
    </StrokeIcon>
  );
}

export function SwapIcon({ size = 18 }: IconProps) {
  return (
    <StrokeIcon size={size} strokeWidth={3}>
      <path d="M5 8 H17 L14 5 M19 16 H7 L10 19" />
    </StrokeIcon>
  );
}

export function PlayIcon() {
  return (
    <svg width="30" height="34" viewBox="0 0 30 34" aria-hidden="true">
      <path d="M5 4 L27 17 L5 30 Z" fill={INK} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

export function PauseIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={INK} aria-hidden="true">
      <rect x="5" y="4" width="5" height="16" rx="2" />
      <rect x="14" y="4" width="5" height="16" rx="2" />
    </svg>
  );
}

export function BeakIcon() {
  return (
    <svg width="38" height="26" viewBox="0 0 38 26" aria-hidden="true">
      <path
        d="M3 9 Q20 2 35 8 Q34 13 20 13 Q34 14 34 19 Q20 25 3 17 Z"
        fill="#F28C28"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface HeartIconProps {
  width: number;
  height: number;
  fill?: string;
  strokeWidth?: number;
  withShine?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function HeartIcon({
  width,
  height,
  fill = '#E8525A',
  strokeWidth = 7,
  withShine = false,
  className,
  style,
}: HeartIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 70 64" className={className} style={style} aria-hidden="true">
      <path
        d="M35 58 C10 40 4 28 4 18 C4 8 12 3 20 3 C27 3 32 7 35 12 C38 7 43 3 50 3 C58 3 66 8 66 18 C66 28 60 40 35 58 Z"
        fill={fill}
        stroke={INK}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {withShine && <path d="M17 14 Q20 10 25 11" stroke="#FFF8EC" strokeWidth="4" fill="none" strokeLinecap="round" />}
    </svg>
  );
}

const STAR_PATH = 'M12 2.8 L14.7 8.6 L21 9.3 L16.3 13.6 L17.6 19.9 L12 16.7 L6.4 19.9 L7.7 13.6 L3 9.3 L9.3 8.6 Z';
const SPARKLE_PATH = 'M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z';

export function StarIcon({ size, filled = true, style }: { size: number; filled?: boolean; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      <path
        d={STAR_PATH}
        fill={filled ? '#F6C93C' : '#E6DCCB'}
        stroke={INK}
        strokeWidth={size > 70 ? 1.4 : 1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkleIcon({ size, style }: { size: number; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      <path d={SPARKLE_PATH} fill="#FFE29A" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/** Four corners pointing out: "go fullscreen". */
export function ExpandIcon({ size = 30 }: IconProps) {
  return (
    <StrokeIcon size={size} strokeWidth={3}>
      <path d="M4 9 V4 H9 M15 4 H20 V9 M20 15 V20 H15 M9 20 H4 V15" />
    </StrokeIcon>
  );
}

/** Four corners pointing in: "leave fullscreen". */
export function CompressIcon({ size = 30 }: IconProps) {
  return (
    <StrokeIcon size={size} strokeWidth={3}>
      <path d="M9 4 V9 H4 M20 9 H15 V4 M15 20 V15 H20 M4 15 H9 V20" />
    </StrokeIcon>
  );
}

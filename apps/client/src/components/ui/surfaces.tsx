import type { ReactNode } from 'react';

interface SurfaceProps {
  className?: string;
  children: ReactNode;
}

/** Cream card with thick ink border and a solid shadow: the main container of the design. */
export function Panel({ className = '', children }: SurfaceProps) {
  return <div className={`border-ink bg-cream shadow-pop-2xl box-border border-[5px] ${className}`}>{children}</div>;
}

/** Small rounded label ("Tú", "Listo", "Fácil", "1/2"…). */
export function Chip({ className = '', children }: SurfaceProps) {
  return <span className={`border-ink rounded-full font-extrabold ${className}`}>{children}</span>;
}

/** Big title with a thick ink outline and drop shadow ("Pochi y Nube", "Unirse a una sala"). */
export function OutlinedTitle({
  className = '',
  strokeWidth,
  shadowOffset,
  children,
}: SurfaceProps & { strokeWidth: number; shadowOffset: number }) {
  return (
    <h1
      className={`text-outline font-display m-0 font-extrabold leading-none ${className}`}
      style={{ WebkitTextStroke: `${strokeWidth}px #4A3424`, textShadow: `0 ${shadowOffset}px 0 #4A3424` }}
    >
      {children}
    </h1>
  );
}

/** Keyboard key. "compact" matches the settings screen (no side padding). */
export function Keycap({ className = '', compact = false, children }: SurfaceProps & { compact?: boolean }) {
  return (
    <kbd
      className={`border-ink font-display shadow-pop-xs box-border min-w-[34px] rounded-[9px] border-[3px] bg-white py-[3px] text-center text-[18px] font-extrabold ${compact ? 'px-0' : 'px-2'} ${className}`}
    >
      {children}
    </kbd>
  );
}

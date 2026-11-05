import type { ReactNode } from 'react';
import { audioEngine } from '../../audio/audioInstance';

interface MenuCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  iconBackground: string;
  tone?: 'honey' | 'cream';
  onClick(): void;
}

/** Big card of the main menu: round icon on the left, title and hint on the right. */
export function MenuCard({ title, subtitle, icon, iconBackground, tone = 'cream', onClick }: MenuCardProps) {
  return (
    <button
      type="button"
      onClick={() => {
        audioEngine.playEffect('button');
        onClick();
      }}
      className={`press-pop-tilt border-ink text-ink shadow-pop-xl flex items-center gap-[22px] rounded-[32px] border-[5px] p-7 text-left ${
        tone === 'honey' ? 'bg-honey' : 'bg-cream'
      }`}
    >
      <div
        className={`border-ink flex size-[92px] flex-none items-center justify-center rounded-full border-4 ${iconBackground}`}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-display text-[40px] font-extrabold leading-[1.05]">{title}</span>
        <span className="text-[19px] font-bold">{subtitle}</span>
      </div>
    </button>
  );
}

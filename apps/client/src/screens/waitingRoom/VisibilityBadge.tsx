import type { RoomVisibility } from '@pochi/shared';
import { GlobeIcon, LockIcon } from '../../art/icons/icons';

export function VisibilityBadge({ visibility }: { visibility: RoomVisibility }) {
  const isPrivate = visibility === 'private';
  return (
    <div className="border-ink bg-cream shadow-pop inline-flex items-center gap-2 rounded-full border-4 px-[18px] py-2 text-[18px] font-extrabold">
      {isPrivate ? <LockIcon size={20} /> : <GlobeIcon size={20} />}
      {isPrivate ? 'Privada' : 'Pública'}
    </div>
  );
}

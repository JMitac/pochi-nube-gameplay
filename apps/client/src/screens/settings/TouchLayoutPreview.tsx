import type { Handedness } from '../../state/settingsStore';

/** Mini phone layout that shows where the joystick and buttons go (mirrored for left-handed players). */
export function TouchLayoutPreview({ handedness }: { handedness: Handedness }) {
  const isLeftHanded = handedness === 'left';
  return (
    <div className="border-ink bg-grass relative h-[170px] overflow-hidden rounded-[26px] border-4" aria-hidden="true">
      <div
        className="border-ink absolute bottom-[18px] flex size-[92px] items-center justify-center rounded-full border-4 bg-[rgba(255,255,255,0.55)]"
        style={{ left: isLeftHanded ? 400 : 20 }}
      >
        <div className="border-ink bg-cream size-10 rounded-full border-4" />
      </div>
      <span className="absolute top-3 text-[15px] font-extrabold" style={{ left: isLeftHanded ? 420 : 30 }}>
        Mover
      </span>
      <div className="absolute bottom-[18px] flex items-end gap-2.5" style={{ left: isLeftHanded ? 20 : 346 }}>
        <div className="border-ink bg-olive size-[46px] rounded-full border-4" />
        <div className="border-ink bg-honey size-[78px] rounded-full border-4" />
      </div>
      <span className="absolute top-3 text-[15px] font-extrabold" style={{ left: isLeftHanded ? 20 : 326 }}>
        Habilidad · Saltar
      </span>
    </div>
  );
}

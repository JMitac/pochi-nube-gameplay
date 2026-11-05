import { audioEngine } from '../../audio/audioInstance';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/** "Vibración" switch from the settings screen. */
export function ToggleSwitch({ label, checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => {
        audioEngine.playEffect('button');
        onChange(!checked);
      }}
      className={`press-pop border-ink box-border flex h-[46px] w-[84px] rounded-full border-4 p-1 ${
        checked ? 'bg-grass-deep justify-end' : 'bg-muted justify-start'
      }`}
    >
      <span className="border-ink box-border size-[30px] rounded-full border-[3px] bg-white" />
    </button>
  );
}

interface VolumeSliderProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

/** Labelled 0–100 slider with the percentage on the right. */
export function VolumeSlider({ id, label, value, onChange }: VolumeSliderProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-[19px] font-extrabold">
        <label htmlFor={id}>{label}</label>
        <span className="tabular-nums">{value}%</span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-honey-dark h-7 w-full"
      />
    </div>
  );
}

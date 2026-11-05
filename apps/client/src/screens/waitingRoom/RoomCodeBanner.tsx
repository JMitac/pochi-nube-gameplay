import { useState } from 'react';
import { CheckIcon, CopyIcon } from '../../art/icons/icons';
import { RoundIconButton } from '../../components/ui/buttons';

const COPIED_FEEDBACK_MS = 1_500;

/** "Código de sala CUAC-7K2" with a copy button, at the top of the waiting room. */
export function RoomCodeBanner({ roomCode }: { roomCode: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    } catch {
      // Clipboard blocked: the code is still visible on screen.
    }
  };

  return (
    <div className="border-ink bg-cream shadow-pop-md flex items-center gap-3.5 rounded-full border-[5px] py-2 pl-[26px] pr-2.5">
      <span className="text-[18px] font-extrabold">Código de sala</span>
      <span className="font-display text-[40px] font-extrabold leading-none tracking-[4px]">{roomCode}</span>
      <RoundIconButton
        label={copied ? 'Código copiado' : 'Copiar código'}
        tone="honey"
        className="size-[50px] border-4"
        onClick={() => void copyCode()}
      >
        {copied ? <CheckIcon size={22} /> : <CopyIcon size={22} />}
      </RoundIconButton>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { audioEngine } from '../../audio/audioInstance';
import type { LobbyPlayer } from '../../state/roomStore';

interface PartnerReadyNotice {
  isOpen: boolean;
  dismiss(): void;
}

/**
 * Opens when the partner already pressed "¡Empezar!" and this player has not.
 * Closing it hides it until the partner becomes ready again (for example after a rematch).
 */
export function usePartnerReadyNotice(me: LobbyPlayer, partner: LobbyPlayer | undefined): PartnerReadyNotice {
  const isPartnerReady = Boolean(partner?.ready);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!isPartnerReady) setIsDismissed(false);
  }, [isPartnerReady]);

  const isOpen = isPartnerReady && !me.ready && !isDismissed;

  useEffect(() => {
    if (isOpen) audioEngine.playEffect('partnerJoined');
  }, [isOpen]);

  return { isOpen, dismiss: () => setIsDismissed(true) };
}

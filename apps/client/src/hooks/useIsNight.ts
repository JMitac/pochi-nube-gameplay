import { useEffect, useState } from 'react';
import { isNightHour } from '../utils/time';

const CHECK_EVERY_MS = 60_000;

/** True between 7 p.m. and 6 a.m. on the player's clock; re-checked every minute. */
export function useIsNight(): boolean {
  const [isNight, setIsNight] = useState(() => isNightHour());

  useEffect(() => {
    const timer = window.setInterval(() => setIsNight(isNightHour()), CHECK_EVERY_MS);
    return () => window.clearInterval(timer);
  }, []);

  return isNight;
}

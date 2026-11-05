import { useCallback, useEffect, useState } from 'react';
import {
  FULLSCREEN_CHANGE_EVENTS,
  isFullscreenActive,
  isFullscreenSupported,
  isRunningAsInstalledApp,
  toggleFullscreen,
} from '../utils/fullscreen';

export interface FullscreenState {
  /** The browser can put the page in fullscreen (false on iPhone Safari). */
  isSupported: boolean;
  /** Opened from the home screen icon: there is nothing to toggle. */
  isInstalledApp: boolean;
  isActive: boolean;
  toggle(): void;
}

/** Fullscreen status that follows the browser, including the Esc key or the system back gesture. */
export function useFullscreen(): FullscreenState {
  const [isActive, setIsActive] = useState(isFullscreenActive);

  useEffect(() => {
    const syncState = () => setIsActive(isFullscreenActive());
    for (const eventName of FULLSCREEN_CHANGE_EVENTS) document.addEventListener(eventName, syncState);
    return () => {
      for (const eventName of FULLSCREEN_CHANGE_EVENTS) document.removeEventListener(eventName, syncState);
    };
  }, []);

  const toggle = useCallback(() => void toggleFullscreen(), []);

  return { isSupported: isFullscreenSupported(), isInstalledApp: isRunningAsInstalledApp(), isActive, toggle };
}

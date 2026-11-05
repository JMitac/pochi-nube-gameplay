/**
 * Small wrapper over the Fullscreen API.
 * Safari (iPad, older macOS) still uses the `webkit` prefixed names; iPhone Safari
 * does not let web pages go fullscreen at all, so callers must check support first.
 */

type PrefixedDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => Promise<void> | void;
};

type PrefixedElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type LockableOrientation = ScreenOrientation & {
  lock?: (orientation: 'landscape') => Promise<void>;
};

export const FULLSCREEN_CHANGE_EVENTS = ['fullscreenchange', 'webkitfullscreenchange'] as const;

const prefixedDocument = () => document as PrefixedDocument;

export function isFullscreenSupported(): boolean {
  const doc = prefixedDocument();
  return Boolean(doc.fullscreenEnabled || doc.webkitFullscreenEnabled);
}

export function isFullscreenActive(): boolean {
  const doc = prefixedDocument();
  return Boolean(doc.fullscreenElement || doc.webkitFullscreenElement);
}

/** True when the game was opened from the home screen icon (it is already fullscreen). */
export function isRunningAsInstalledApp(): boolean {
  const isIosStandalone = (navigator as Navigator & { standalone?: boolean }).standalone === true;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  // "display-mode: fullscreen" also matches after our own button, so only count it when the API is not in use.
  const isLaunchedFullscreen = window.matchMedia('(display-mode: fullscreen)').matches && !isFullscreenActive();
  return isIosStandalone || isStandalone || isLaunchedFullscreen;
}

async function enterFullscreen(): Promise<void> {
  const root = document.documentElement as PrefixedElement;
  if (root.requestFullscreen) await root.requestFullscreen({ navigationUI: 'hide' });
  else await root.webkitRequestFullscreen?.();
  await lockLandscape();
}

async function exitFullscreen(): Promise<void> {
  const doc = prefixedDocument();
  if (doc.exitFullscreen) await doc.exitFullscreen();
  else await doc.webkitExitFullscreen?.();
}

/** Phones (Android) can keep the game sideways while fullscreen. Desktops just say no. */
async function lockLandscape(): Promise<void> {
  try {
    await (screen.orientation as LockableOrientation | undefined)?.lock?.('landscape');
  } catch {
    // Not allowed on this device: the "rotate your phone" hint still covers it.
  }
}

/** Must be called from a tap or click: browsers only allow fullscreen inside a gesture. */
export async function toggleFullscreen(): Promise<void> {
  try {
    if (isFullscreenActive()) await exitFullscreen();
    else await enterFullscreen();
  } catch (error) {
    if (import.meta.env.DEV) console.warn('[fullscreen] no se pudo cambiar:', error);
  }
}

const DEV_SERVER_PORT = 2567;

/**
 * Where the Colyseus server lives.
 * - VITE_SERVER_URL wins when it is set (client and server on different hosts).
 * - In development the server runs next to Vite, on port 2567 of the same host,
 *   so a phone on the same Wi-Fi can open http://<your-pc-ip>:5173 and play.
 * - In production the server also serves the game page, so it is the same origin.
 */
function resolveServerUrl(): string {
  const configured = import.meta.env.VITE_SERVER_URL as string | undefined;
  if (configured) return configured.replace(/\/$/, '');
  const { protocol, hostname, origin } = window.location;
  return import.meta.env.DEV ? `${protocol}//${hostname}:${DEV_SERVER_PORT}` : origin;
}

export const SERVER_URL = resolveServerUrl();

/** HTTP API. Without VITE_SERVER_URL it is relative: Vite proxies it in development. */
export const API_URL = import.meta.env.VITE_SERVER_URL ? `${SERVER_URL}/api` : '/api';

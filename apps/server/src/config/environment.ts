import { existsSync } from 'node:fs';
import path from 'node:path';

export interface ServerEnvironment {
  port: number;
  corsOrigins: string[];
  /** Folder with the built client. When it exists, the server also serves the game page. */
  clientDistPath: string | undefined;
}

const DEFAULT_CLIENT_DIST = path.resolve(process.cwd(), '../client/dist');

function resolveClientDist(configured: string | undefined): string | undefined {
  if (configured) return configured;
  return existsSync(path.join(DEFAULT_CLIENT_DIST, 'index.html')) ? DEFAULT_CLIENT_DIST : undefined;
}

export function readEnvironment(env: NodeJS.ProcessEnv = process.env): ServerEnvironment {
  return {
    port: Number(env.PORT) || 2567,
    corsOrigins: (env.CORS_ORIGIN ?? 'http://localhost:5173')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
    clientDistPath: resolveClientDist(env.CLIENT_DIST_PATH || undefined),
  };
}

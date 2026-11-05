import path from 'node:path';
import cors from 'cors';
import express, { type Express } from 'express';
import type { ServerEnvironment } from '../config/environment';
import type { RoomDirectory } from '../services/RoomDirectory';
import { createRoomRoutes } from './roomRoutes';

export function createHttpApp(environment: ServerEnvironment, directory: RoomDirectory): Express {
  const app = express();
  app.use(cors({ origin: environment.corsOrigins }));
  app.use(express.json());

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
  });
  app.use('/api/rooms', createRoomRoutes(directory));

  if (environment.clientDistPath) serveClient(app, environment.clientDistPath);
  return app;
}

function serveClient(app: Express, clientDistPath: string): void {
  const root = path.resolve(clientDistPath);
  app.use(express.static(root));
  app.get(/^(?!\/api).*/, (_request, response) => {
    response.sendFile(path.join(root, 'index.html'));
  });
}

import http from 'node:http';
import { Server } from '@colyseus/core';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { ROOM_NAME } from '@pochi/shared';
import { readEnvironment } from './config/environment';
import { createHttpApp } from './http/createHttpApp';
import { PicnicRoom } from './rooms/PicnicRoom';
import { RoomDirectory } from './services/RoomDirectory';

async function bootstrap(): Promise<void> {
  const environment = readEnvironment();
  const app = createHttpApp(environment, new RoomDirectory());
  const httpServer = http.createServer(app);

  const gameServer = new Server({ transport: new WebSocketTransport({ server: httpServer }) });
  gameServer.define(ROOM_NAME, PicnicRoom);

  await gameServer.listen(environment.port);
  console.log(`🦆 Servidor de Pochi y Nube escuchando en http://localhost:${environment.port}`);
  if (environment.clientDistPath) console.log(`   También sirve el juego desde ${environment.clientDistPath}`);
}

bootstrap().catch((error: unknown) => {
  console.error('No se pudo iniciar el servidor', error);
  process.exit(1);
});

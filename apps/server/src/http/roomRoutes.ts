import { Router } from 'express';
import type { RoomLookupResult } from '@pochi/shared';
import type { RoomDirectory } from '../services/RoomDirectory';

export function createRoomRoutes(directory: RoomDirectory): Router {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      response.json(await directory.listPublicRooms());
    } catch (error) {
      next(error);
    }
  });

  router.get('/code/:code', async (request, response, next) => {
    try {
      const roomId = await directory.findRoomIdByCode(request.params.code ?? '');
      if (!roomId) {
        response.status(404).json({ message: 'No encontramos esa sala' });
        return;
      }
      const result: RoomLookupResult = { roomId };
      response.json(result);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

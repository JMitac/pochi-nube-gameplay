import { generateRoomCode } from '@pochi/shared';

/** Hands out room codes like CUAC-7K2 and makes sure two live rooms never share one. */
export class RoomCodeRegistry {
  private readonly activeCodes = new Set<string>();

  constructor(private readonly random: () => number = Math.random) {}

  reserve(): string {
    for (let attempt = 0; attempt < 50; attempt += 1) {
      const code = generateRoomCode(this.random);
      if (!this.activeCodes.has(code)) {
        this.activeCodes.add(code);
        return code;
      }
    }
    throw new Error('No hay códigos de sala libres en este momento');
  }

  release(code: string): void {
    this.activeCodes.delete(code);
  }
}

export const roomCodeRegistry = new RoomCodeRegistry();

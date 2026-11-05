import type { MapId } from '@pochi/shared';

const STORAGE_KEY = 'pochi-nube-solo-records';

type RecordBook = Partial<Record<MapId, number>>;

function readBook(): RecordBook {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as RecordBook;
  } catch {
    return {};
  }
}

/** Solo mode: "juegas contra tu propio récord". Records live in this browser. */
export function readSoloRecord(mapId: MapId): number {
  return readBook()[mapId] ?? 0;
}

/** Saves the score if it beats the record. Returns the previous record. */
export function saveSoloScore(mapId: MapId, score: number): { isNewRecord: boolean; previousRecord: number } {
  const book = readBook();
  const previousRecord = book[mapId] ?? 0;
  const isNewRecord = score > previousRecord;
  if (isNewRecord) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...book, [mapId]: score }));
    } catch {
      // Storage may be blocked (private mode); the record simply is not kept.
    }
  }
  return { isNewRecord, previousRecord };
}

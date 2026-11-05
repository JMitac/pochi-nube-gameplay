/** "De noche: de 7 p. m. a 6 a. m. según la hora del jugador". */
export function isNightHour(date: Date = new Date()): boolean {
  const hour = date.getHours();
  return hour >= 19 || hour < 6;
}

/** 84_000 → "1:24" */
export function formatClock(milliseconds: number): string {
  const totalSeconds = Math.ceil(Math.max(0, milliseconds) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

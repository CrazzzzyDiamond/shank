export type { Note, InstrumentConfig } from './types.ts';
export { TRUMPET } from './trumpet.ts';

export function getRandomNote<T extends { midi: number }>(
  notes: T[],
  exclude?: T,
): T {
  const pool = exclude ? notes.filter((n) => n.midi !== exclude.midi) : notes;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

export function noteHz(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function isNoteMatch(
  hz: number,
  targetMidi: number,
  toleranceCents = 50,
): boolean {
  if (hz <= 0) return false;
  const cents = Math.abs(1200 * Math.log2(hz / noteHz(targetMidi)));
  return cents <= toleranceCents;
}

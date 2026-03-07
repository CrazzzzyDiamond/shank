export type { Note, InstrumentConfig } from './types.ts';
export { TRUMPET } from './trumpet.ts';

export function getRandomNote<T extends { midi: number }>(
  notes: T[],
  exclude?: T,
): T {
  const pool = exclude ? notes.filter((n) => n.midi !== exclude.midi) : notes;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

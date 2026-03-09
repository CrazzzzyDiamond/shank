export type { Note, InstrumentConfig } from './types.ts';
export { TRUMPET, TRUMPET_C, TRUMPET_D, TRUMPET_EB, TRUMPET_NATURAL } from './trumpet';
export { TROMBONE } from './trombone';
export { SAX_SOPRANO, SAX_ALTO, SAX_TENOR, SAX_BARI } from './saxophone';

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

const NOTE_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'] as const;

export function midiToLabel(midi: number): string {
  const name = NOTE_NAMES[((midi % 12) + 12) % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${name}${octave}`;
}

export function hzToLabel(hz: number): string {
  const midi = Math.round(12 * Math.log2(hz / 440) + 69);
  return midiToLabel(midi);
}

export function hzToCents(hz: number, targetMidi: number): number {
  return 1200 * Math.log2(hz / noteHz(targetMidi));
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

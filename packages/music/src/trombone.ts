import type { InstrumentConfig, Note } from './types.ts';

// Tenor trombone (Bb) — concert pitch, bass clef, range E2–Bb4
const TROMBONE_NOTES: Note[] = [
  { key: 'e/2',  label: 'E2',  midi: 40 },
  { key: 'f/2',  label: 'F2',  midi: 41 },
  { key: 'f#/2', label: 'F#2', midi: 42, accidental: '#' },
  { key: 'g/2',  label: 'G2',  midi: 43 },
  { key: 'ab/2', label: 'Ab2', midi: 44, accidental: 'b' },
  { key: 'a/2',  label: 'A2',  midi: 45 },
  { key: 'bb/2', label: 'Bb2', midi: 46, accidental: 'b' },
  { key: 'b/2',  label: 'B2',  midi: 47 },
  { key: 'c/3',  label: 'C3',  midi: 48 },
  { key: 'db/3', label: 'Db3', midi: 49, accidental: 'b' },
  { key: 'd/3',  label: 'D3',  midi: 50 },
  { key: 'eb/3', label: 'Eb3', midi: 51, accidental: 'b' },
  { key: 'e/3',  label: 'E3',  midi: 52 },
  { key: 'f/3',  label: 'F3',  midi: 53 },
  { key: 'f#/3', label: 'F#3', midi: 54, accidental: '#' },
  { key: 'g/3',  label: 'G3',  midi: 55 },
  { key: 'ab/3', label: 'Ab3', midi: 56, accidental: 'b' },
  { key: 'a/3',  label: 'A3',  midi: 57 },
  { key: 'bb/3', label: 'Bb3', midi: 58, accidental: 'b' },
  { key: 'b/3',  label: 'B3',  midi: 59 },
  { key: 'c/4',  label: 'C4',  midi: 60 },
  { key: 'db/4', label: 'Db4', midi: 61, accidental: 'b' },
  { key: 'd/4',  label: 'D4',  midi: 62 },
  { key: 'eb/4', label: 'Eb4', midi: 63, accidental: 'b' },
  { key: 'e/4',  label: 'E4',  midi: 64 },
  { key: 'f/4',  label: 'F4',  midi: 65 },
  { key: 'f#/4', label: 'F#4', midi: 66, accidental: '#' },
  { key: 'g/4',  label: 'G4',  midi: 67 },
  { key: 'ab/4', label: 'Ab4', midi: 68, accidental: 'b' },
  { key: 'a/4',  label: 'A4',  midi: 69 },
  { key: 'bb/4', label: 'Bb4', midi: 70, accidental: 'b' },
];

export const TROMBONE: InstrumentConfig = {
  id: 'trombone',
  name: 'Trombone',
  clef: 'bass',
  transposition: 0,
  notes: TROMBONE_NOTES,
};

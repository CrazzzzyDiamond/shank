import type { InstrumentConfig, Note } from './types.ts';

// Written pitch for Bb trumpet, range F#3–C6 (chromatic)
// F#3 is the lowest practical note (all 3 valves down)
// Flats used for all accidentals except F# (standard brass convention)
const TRUMPET_NOTES: Note[] = [
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
  { key: 'b/4',  label: 'B4',  midi: 71 },
  { key: 'c/5',  label: 'C5',  midi: 72 },
  { key: 'db/5', label: 'Db5', midi: 73, accidental: 'b' },
  { key: 'd/5',  label: 'D5',  midi: 74 },
  { key: 'eb/5', label: 'Eb5', midi: 75, accidental: 'b' },
  { key: 'e/5',  label: 'E5',  midi: 76 },
  { key: 'f/5',  label: 'F5',  midi: 77 },
  { key: 'f#/5', label: 'F#5', midi: 78, accidental: '#' },
  { key: 'g/5',  label: 'G5',  midi: 79 },
  { key: 'ab/5', label: 'Ab5', midi: 80, accidental: 'b' },
  { key: 'a/5',  label: 'A5',  midi: 81 },
  { key: 'bb/5', label: 'Bb5', midi: 82, accidental: 'b' },
  { key: 'b/5',  label: 'B5',  midi: 83 },
  { key: 'c/6',  label: 'C6',  midi: 84 },
];

// Bb trumpet — sounds M2 lower than written
export const TRUMPET: InstrumentConfig = {
  id: 'trumpet',
  name: 'Trumpet (Bb)',
  clef: 'treble',
  transposition: -2,
  notes: TRUMPET_NOTES,
};

// C trumpet — concert pitch, no transposition
export const TRUMPET_C: InstrumentConfig = {
  id: 'trumpet-c',
  name: 'Trumpet (C)',
  clef: 'treble',
  transposition: 0,
  notes: TRUMPET_NOTES,
};

// D trumpet — sounds M2 higher than written
export const TRUMPET_D: InstrumentConfig = {
  id: 'trumpet-d',
  name: 'Trumpet (D)',
  clef: 'treble',
  transposition: 2,
  notes: TRUMPET_NOTES,
};

// Eb trumpet — sounds m3 higher than written
export const TRUMPET_EB: InstrumentConfig = {
  id: 'trumpet-eb',
  name: 'Trumpet (Eb)',
  clef: 'treble',
  transposition: 3,
  notes: TRUMPET_NOTES,
};


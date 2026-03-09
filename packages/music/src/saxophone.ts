import type { InstrumentConfig, Note } from './types.ts';

// Written pitch for all saxophones, range Bb3–F6 (chromatic)
// All saxes share the same written fingering range and treble clef
const SAX_NOTES: Note[] = [
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
  { key: 'db/6', label: 'Db6', midi: 85, accidental: 'b' },
  { key: 'd/6',  label: 'D6',  midi: 86 },
  { key: 'eb/6', label: 'Eb6', midi: 87, accidental: 'b' },
  { key: 'e/6',  label: 'E6',  midi: 88 },
  { key: 'f/6',  label: 'F6',  midi: 89 },
];

// Soprano saxophone (Bb) — sounds M2 lower than written
export const SAX_SOPRANO: InstrumentConfig = {
  id: 'sax-soprano',
  name: 'Soprano Sax (Bb)',
  clef: 'treble',
  transposition: -2,
  notes: SAX_NOTES,
};

// Alto saxophone (Eb) — sounds M6 lower than written
export const SAX_ALTO: InstrumentConfig = {
  id: 'sax-alto',
  name: 'Alto Sax (Eb)',
  clef: 'treble',
  transposition: -9,
  notes: SAX_NOTES,
};

// Tenor saxophone (Bb) — sounds M9 lower than written
export const SAX_TENOR: InstrumentConfig = {
  id: 'sax-tenor',
  name: 'Tenor Sax (Bb)',
  clef: 'treble',
  transposition: -14,
  notes: SAX_NOTES,
};

// Baritone saxophone (Eb) — sounds M13 lower than written
export const SAX_BARI: InstrumentConfig = {
  id: 'sax-bari',
  name: 'Bari Sax (Eb)',
  clef: 'treble',
  transposition: -21,
  notes: SAX_NOTES,
};

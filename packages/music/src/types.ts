export interface Note {
  key: string;               // VexFlow key: "c/4", "bb/4", "f#/5"
  accidental?: 'b' | '#';   // accidental modifier to render
  label: string;             // "C4", "Bb4", "F#5"
  midi: number;
}

export interface InstrumentConfig {
  id: string;
  name: string;
  clef: 'treble' | 'bass';
  transposition: number; // semitones from concert pitch (0 = C, -2 = Bb trumpet)
  notes: Note[];
}

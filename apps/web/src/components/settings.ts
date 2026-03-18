export type InstrumentId =
  | 'trumpet' | 'trumpet-c' | 'trumpet-d' | 'trumpet-eb' | 'natural'
  | 'trombone'
  | 'sax-soprano' | 'sax-alto' | 'sax-tenor' | 'sax-bari';

export interface Settings {
  instrument: InstrumentId;
  noteRange: { min: number; max: number };
  holdDuration: number;
  theme: 'dark' | 'light';
  micDeviceId: string;
}

export const DEFAULT_SETTINGS: Settings = {
  instrument: 'trumpet',
  noteRange: { min: 60, max: 84 },
  holdDuration: 2,
  theme: 'dark',
  micDeviceId: '',
};

const TRUMPET_PRESETS = [{ label: 'Low', min: 54, max: 71 }, { label: 'Mid', min: 72, max: 83 }, { label: 'Full', min: 54, max: 84 }];
const SAX_PRESETS     = [{ label: 'Low', min: 58, max: 70 }, { label: 'Mid', min: 60, max: 84 }, { label: 'Full', min: 58, max: 89 }];

export const RANGE_PRESETS: Record<InstrumentId, { label: string; min: number; max: number }[]> = {
  'trumpet':          TRUMPET_PRESETS,
  'trumpet-c':        TRUMPET_PRESETS,
  'trumpet-d':        TRUMPET_PRESETS,
  'trumpet-eb':       TRUMPET_PRESETS,
  'natural':          [{ label: 'Low', min: 48, max: 72 }, { label: 'Mid', min: 36, max: 84 }, { label: 'Full', min: 21, max: 108 }],
  'trombone':         [{ label: 'Low', min: 40, max: 59 }, { label: 'Mid', min: 48, max: 67 }, { label: 'Full', min: 40, max: 70 }],
  'sax-soprano':      SAX_PRESETS,
  'sax-alto':         SAX_PRESETS,
  'sax-tenor':        SAX_PRESETS,
  'sax-bari':         SAX_PRESETS,
};

export const DEFAULT_RANGES: Record<InstrumentId, { min: number; max: number }> = {
  'trumpet':          { min: 72, max: 83 },
  'trumpet-c':        { min: 72, max: 83 },
  'trumpet-d':        { min: 72, max: 83 },
  'trumpet-eb':       { min: 72, max: 83 },
  'natural':          { min: 48, max: 72 },
  'trombone':         { min: 48, max: 67 },
  'sax-soprano':      { min: 60, max: 84 },
  'sax-alto':         { min: 60, max: 84 },
  'sax-tenor':        { min: 60, max: 84 },
  'sax-bari':         { min: 60, max: 84 },
};

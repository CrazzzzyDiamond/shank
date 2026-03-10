import type { Note } from '@shank/music';
import { useEffect, useState } from 'react';

export type InstrumentId =
  | 'trumpet' | 'trumpet-c' | 'trumpet-d' | 'trumpet-eb' | 'trumpet-natural'
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
  'trumpet-natural':  [{ label: 'Low', min: 58, max: 70 }, { label: 'Mid', min: 70, max: 82 }, { label: 'Full', min: 58, max: 84 }],
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
  'trumpet-natural':  { min: 70, max: 82 },
  'trombone':         { min: 48, max: 67 },
  'sax-soprano':      { min: 60, max: 84 },
  'sax-alto':         { min: 60, max: 84 },
  'sax-tenor':        { min: 60, max: 84 },
  'sax-bari':         { min: 60, max: 84 },
};

const TRUMPET_GROUP: { id: InstrumentId; label: string }[] = [
  { id: 'trumpet',    label: 'Bb' },
  { id: 'trumpet-c',  label: 'C'  },
  { id: 'trumpet-d',  label: 'D'  },
  { id: 'trumpet-eb', label: 'Eb' },
];

const TROMBONE_GROUP: { id: InstrumentId; label: string }[] = [
  { id: 'trombone', label: 'Tenor' },
];

const SAX_GROUP: { id: InstrumentId; label: string }[] = [
  { id: 'sax-soprano', label: 'Soprano' },
  { id: 'sax-alto',    label: 'Alto'    },
  { id: 'sax-tenor',   label: 'Tenor'   },
  { id: 'sax-bari',    label: 'Bari'    },
];

const DURATIONS = [1, 2, 3, 5] as const;

const btnActive   = 'bg-(--color-accent) text-zinc-900';
const btnInactive = 'bg-(--color-surface-2) text-amber-400 hover:text-amber-100';

interface Props {
  settings: Settings;
  onChange: (s: Settings) => void;
  notes: Note[];
  onClose: () => void;
}

export function SettingsPanel({ settings, onChange, notes, onClose }: Props) {
  const isActivePreset = (min: number, max: number) =>
    settings.noteRange.min === min && settings.noteRange.max === max;

  const rangePresets = RANGE_PRESETS[settings.instrument];

  const [micDevices, setMicDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setMicDevices(devices.filter((d) => d.kind === 'audioinput'));
    });
  }, []);

  return (
    <div className="flex h-full flex-col gap-8 overflow-y-auto p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-(--color-text-primary)">Settings</h2>
        <button
          onClick={onClose}
          className="text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)"
          aria-label="Close settings"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Instrument */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium uppercase tracking-widest text-(--color-text-muted)">
          Instrument
        </h3>
        <div className="flex flex-col gap-2">
          <p className="text-xs text-(--color-text-muted)">Trumpet</p>
          <div className="flex gap-1.5">
            {TRUMPET_GROUP.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onChange({ ...settings, instrument: id, noteRange: DEFAULT_RANGES[id] })}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                  settings.instrument === id ? btnActive : btnInactive
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-(--color-text-muted)">Saxophone</p>
          <div className="flex gap-1.5">
            {SAX_GROUP.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onChange({ ...settings, instrument: id, noteRange: DEFAULT_RANGES[id] })}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                  settings.instrument === id ? btnActive : btnInactive
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-(--color-text-muted)">Trombone</p>
          <div className="flex gap-1.5">
            {TROMBONE_GROUP.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onChange({ ...settings, instrument: id, noteRange: DEFAULT_RANGES[id] })}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                  settings.instrument === id ? btnActive : btnInactive
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-(--color-text-muted)">Natural</p>
          <div className="flex gap-1.5">
            <button
              onClick={() => onChange({ ...settings, instrument: 'trumpet-natural', noteRange: DEFAULT_RANGES['trumpet-natural'] })}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                settings.instrument === 'trumpet-natural' ? btnActive : btnInactive
              }`}
            >
              Natural
            </button>
          </div>
        </div>
      </section>

      {/* Theme — тимчасово прихована
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-medium uppercase tracking-widest text-(--color-text-muted)">
          Theme
        </h3>
        <div className="flex gap-2">
          {(['dark', 'light'] as const).map((t) => (
            <button
              key={t}
              onClick={() => onChange({ ...settings, theme: t })}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold capitalize transition-colors ${
                settings.theme === t ? btnActive : btnInactive
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>
      */}

      {/* Note range */}
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-medium uppercase tracking-widest text-(--color-text-muted)">
          Note Range
        </h3>

        <div className="flex gap-2">
          {rangePresets.map((p) => (
            <button
              key={p.label}
              onClick={() => onChange({ ...settings, noteRange: { min: p.min, max: p.max } })}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                isActivePreset(p.min, p.max) ? btnActive : btnInactive
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-1 flex-col gap-1">
            <label className="text-xs text-(--color-text-muted)">From</label>
            <select
              value={settings.noteRange.min}
              onChange={(e) =>
                onChange({ ...settings, noteRange: { ...settings.noteRange, min: Number(e.target.value) } })
              }
              className="rounded-lg border border-(--color-border) bg-(--color-surface-2) px-3 py-2 text-sm text-amber-100"
            >
              {notes
                .filter((n) => n.midi <= settings.noteRange.max)
                .map((n) => <option key={n.midi} value={n.midi}>{n.label}</option>)}
            </select>
          </div>

          <span className="mt-5 text-(--color-text-muted)">—</span>

          <div className="flex flex-1 flex-col gap-1">
            <label className="text-xs text-(--color-text-muted)">To</label>
            <select
              value={settings.noteRange.max}
              onChange={(e) =>
                onChange({ ...settings, noteRange: { ...settings.noteRange, max: Number(e.target.value) } })
              }
              className="rounded-lg border border-(--color-border) bg-(--color-surface-2) px-3 py-2 text-sm text-amber-100"
            >
              {notes
                .filter((n) => n.midi >= settings.noteRange.min)
                .map((n) => <option key={n.midi} value={n.midi}>{n.label}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Hold duration */}
      {micDevices.length > 1 && (
        <section className="flex flex-col gap-3">
          <h3 className="text-sm font-medium uppercase tracking-widest text-(--color-text-muted)">
            Microphone
          </h3>
          <select
            value={settings.micDeviceId}
            onChange={(e) => onChange({ ...settings, micDeviceId: e.target.value })}
            className="rounded-lg border border-(--color-border) bg-(--color-surface-2) px-3 py-2 text-sm text-amber-100"
          >
            <option value="">Default</option>
            {micDevices.map((d) => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.label || d.deviceId}
              </option>
            ))}
          </select>
        </section>
      )}

      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-medium uppercase tracking-widest text-(--color-text-muted)">
          Hold Duration
        </h3>
        <div className="flex gap-2">
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => onChange({ ...settings, holdDuration: d })}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                settings.holdDuration === d ? btnActive : btnInactive
              }`}
            >
              {d}s
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

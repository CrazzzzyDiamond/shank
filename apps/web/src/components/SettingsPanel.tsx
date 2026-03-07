import type { Note } from '@shank/music';

export interface Settings {
  noteRange: { min: number; max: number };
  holdDuration: number;
  theme: 'dark' | 'light';
}

export const DEFAULT_SETTINGS: Settings = {
  noteRange: { min: 60, max: 84 }, // C4–C6
  holdDuration: 2,
  theme: 'dark',
};

const RANGE_PRESETS = [
  { label: 'Low', min: 60, max: 71 },  // C4–B4
  { label: 'Mid', min: 72, max: 83 },  // C5–B5
  { label: 'Full', min: 60, max: 84 }, // C4–C6
] as const;

const DURATIONS = [1, 2, 3, 5] as const;

const btnActive = 'bg-(--color-accent) text-zinc-900';
const btnInactive = 'bg-(--color-surface-2) text-(--color-text-muted) hover:text-(--color-text-primary)';

interface Props {
  settings: Settings;
  onChange: (s: Settings) => void;
  notes: Note[];
  onClose: () => void;
}

export function SettingsPanel({ settings, onChange, notes, onClose }: Props) {
  const isActivePreset = (min: number, max: number) =>
    settings.noteRange.min === min && settings.noteRange.max === max;

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

      {/* Theme */}
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

      {/* Note range */}
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-medium uppercase tracking-widest text-(--color-text-muted)">
          Note Range
        </h3>

        <div className="flex gap-2">
          {RANGE_PRESETS.map((p) => (
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
              className="rounded-lg border border-(--color-border) bg-(--color-surface-2) px-3 py-2 text-sm text-(--color-text-primary)"
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
              className="rounded-lg border border-(--color-border) bg-(--color-surface-2) px-3 py-2 text-sm text-(--color-text-primary)"
            >
              {notes
                .filter((n) => n.midi >= settings.noteRange.min)
                .map((n) => <option key={n.midi} value={n.midi}>{n.label}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Hold duration */}
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

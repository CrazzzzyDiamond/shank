import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TRUMPET, TRUMPET_C, TRUMPET_D, TRUMPET_EB, TRUMPET_NATURAL, TROMBONE, SAX_SOPRANO, SAX_ALTO, SAX_TENOR, SAX_BARI, getRandomNote, isNoteMatch, hzToCents, midiToLabel } from '@shank/music';
import type { InstrumentConfig } from '@shank/music';
import { NoteDisplay } from './components/NoteDisplay';
import { CentsIndicator } from './components/CentsIndicator';
import { CatRive } from './components/CatRive';
import { SettingsPanel, DEFAULT_SETTINGS } from './components/SettingsPanel';
import type { Settings } from './components/SettingsPanel';
import { usePitchDetector } from './hooks/usePitchDetector';

const STORAGE_KEY = 'shank-settings';

const INSTRUMENTS: Record<Settings['instrument'], InstrumentConfig> = {
  'trumpet':         TRUMPET,
  'trumpet-c':       TRUMPET_C,
  'trumpet-d':       TRUMPET_D,
  'trumpet-eb':      TRUMPET_EB,
  'trumpet-natural': TRUMPET_NATURAL,
  'trombone':        TROMBONE,
  'sax-soprano':     SAX_SOPRANO,
  'sax-alto':        SAX_ALTO,
  'sax-tenor':       SAX_TENOR,
  'sax-bari':        SAX_BARI,
};

function loadSettings(): Settings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

interface PitchInfo {
  hz: number;
  label: string;
  cents: number;
}

function App() {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { notes, clef, transposition } = INSTRUMENTS[settings.instrument];

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  const activeNotes = useMemo(
    () => notes.filter((n) => n.midi >= settings.noteRange.min && n.midi <= settings.noteRange.max),
    [notes, settings.noteRange.min, settings.noteRange.max],
  );

  const [note, setNote] = useState(() => getRandomNote(activeNotes));
  const [progress, setProgress] = useState(0);
  const [pitchInfo, setPitchInfo] = useState<PitchInfo | null>(null);
  const [success, setSuccess] = useState(false);
  const [points, setPoints] = useState(0);
  const [flashPoints, setFlashPoints] = useState(false);

  const { detectedHzRef, state, errorMessage, start, stop } = usePitchDetector();

  const noteMidiRef = useRef(note.midi + transposition);
  const transpositionRef = useRef(transposition);
  const progressRef = useRef(0);
  const holdDurationRef = useRef(settings.holdDuration);

  useEffect(() => {
    holdDurationRef.current = settings.holdDuration;
  }, [settings.holdDuration]);

  useEffect(() => {
    transpositionRef.current = transposition;
  }, [transposition]);


  useEffect(() => {
    setNote(getRandomNote(activeNotes));
    progressRef.current = 0;
    setProgress(0);
  }, [activeNotes]);

  useEffect(() => {
    noteMidiRef.current = note.midi + transposition; // concert pitch
    progressRef.current = 0;
    setProgress(0);
    setPitchInfo(null);
  }, [note, transposition]);

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(false), 500);
    return () => clearTimeout(t);
  }, [success]);

  useEffect(() => {
    if (state === 'listening') setPoints(0);
  }, [state]);

  const handleNext = useCallback(() => {
    setNote((prev) => getRandomNote(activeNotes, prev));
  }, [activeNotes]);

  useEffect(() => {
    if (state !== 'listening') {
      setPitchInfo(null);
      return;
    }

    let rafId: number;
    let lastTime = performance.now();
    let frameCount = 0;

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      frameCount++;

      const hz = detectedHzRef.current;
      const match = hz !== null && isNoteMatch(hz, noteMidiRef.current);

      let next = match
        ? progressRef.current + dt / holdDurationRef.current
        : Math.max(0, progressRef.current - dt / holdDurationRef.current);

      if (next >= 1) {
        next = 0;
        setSuccess(true);
        setPoints((p) => p + 1);
        setFlashPoints(true);
        setNote((prev) => getRandomNote(activeNotes, prev));
      }

      progressRef.current = next;
      setProgress(next);

      if (frameCount % 4 === 0) {
        if (hz !== null) {
          const concertMidi = Math.round(12 * Math.log2(hz / 440) + 69);
          setPitchInfo({
            hz,
            label: midiToLabel(concertMidi - transpositionRef.current),
            cents: hzToCents(hz, noteMidiRef.current),
          });
        } else {
          setPitchInfo(null);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [state, detectedHzRef, activeNotes]);


  return (
    <div className="flex min-h-screen">
      <main className="flex flex-1 flex-col items-center justify-center gap-10 px-4">
        <div className="flex flex-col items-center gap-6">
          <p className={`text-2xl font-semibold tracking-widest transition-colors duration-300 ${success ? 'text-green-400' : 'text-(--color-text-muted)'}`}>
            {note.label}
          </p>

          <div className={`rounded-2xl bg-(--color-surface) px-6 py-4 ${success ? 'note-success' : ''}`}>
            <NoteDisplay key={settings.theme} note={note} clef={clef} />
          </div>

          {state === 'listening' && (
            <div className="flex w-82 flex-col items-center gap-3">
              <CentsIndicator cents={pitchInfo?.cents ?? 0} />

              <p className="h-5 text-sm text-(--color-text-muted)">
                {pitchInfo ? `${pitchInfo.label} · ${Math.round(pitchInfo.hz)} Hz` : '—'}
              </p>

              <div className="h-3 w-72 overflow-hidden rounded-full bg-(--color-surface-2)">
                <div
                  className="h-full rounded-full bg-(--color-accent)"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              <p className="text-(--color-text-muted)">
                <span className={`${flashPoints ? 'points-pop ' : ''}text-4xl font-bold text-(--color-text-primary)`} onAnimationEnd={() => setFlashPoints(false)}>{points}</span>
                {' '}<span className="text-sm">pts</span>
              </p>
            </div>
          )}

          {state === 'error' && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          {state === 'idle' || state === 'error' ? (
            <button
              onClick={start}
              className="w-72 rounded-2xl bg-(--color-surface) py-5 text-xl font-bold tracking-widest text-amber-100 transition-colors hover:bg-(--color-surface-2) active:scale-95"
            >
              START
            </button>
          ) : (
            <>
              <button
                onClick={handleNext}
                className="w-72 rounded-2xl bg-(--color-surface) py-5 text-xl font-bold tracking-widest text-amber-100 transition-colors hover:bg-(--color-surface-2) active:scale-95"
              >
                NEXT
              </button>
              <button
                onClick={stop}
                className="text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)"
              >
                stop
              </button>
            </>
          )}
        </div>
      </main>

      <span className="fixed left-4 top-4 flex items-center p-2 text-base font-bold tracking-widest text-(--color-text-primary)">
        SHANK
      </span>

      <button
        onClick={() => setSettingsOpen((o) => !o)}
        className="fixed right-4 top-4 rounded-lg p-2 text-(--color-text-muted) transition-colors hover:bg-(--color-surface) hover:text-amber-100"
        aria-label="Toggle settings"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      <div className="fixed bottom-0 left-0">
        <CatRive cents={pitchInfo?.cents ?? null} success={success} />
      </div>

      <>
        <div
          className={`fixed inset-0 transition-opacity duration-300 ${settingsOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
          onClick={() => setSettingsOpen(false)}
        />
        <aside
          style={{ transform: settingsOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 200ms ease-in-out' }}
          className="fixed right-0 top-0 h-full w-80 border-l border-(--color-border) bg-(--color-bg)"
        >
          <SettingsPanel
            settings={settings}
            onChange={setSettings}
            notes={notes}
            onClose={() => setSettingsOpen(false)}
          />
        </aside>
      </>
    </div>
  );
}

export default App;

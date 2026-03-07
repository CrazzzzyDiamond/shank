import { useCallback, useEffect, useRef, useState } from 'react';
import { TRUMPET, getRandomNote, isNoteMatch } from '@shank/music';
import { NoteDisplay } from './components/NoteDisplay';
import { usePitchDetector } from './hooks/usePitchDetector';

const { notes, clef } = TRUMPET;
const REQUIRED_SECONDS = 2;

function App() {
  const [note, setNote] = useState(() => getRandomNote(notes));
  const [progress, setProgress] = useState(0);

  const { detectedHzRef, state, errorMessage, start, stop } = usePitchDetector();

  // Refs to avoid stale closures in rAF loop
  const noteMidiRef = useRef(note.midi);
  const progressRef = useRef(0);

  useEffect(() => {
    noteMidiRef.current = note.midi;
    progressRef.current = 0;
    setProgress(0);
  }, [note]);

  const handleNext = useCallback(() => {
    setNote((prev) => getRandomNote(notes, prev));
  }, []);

  // Progress animation loop
  useEffect(() => {
    if (state !== 'listening') return;

    let rafId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const hz = detectedHzRef.current;
      const match = hz !== null && isNoteMatch(hz, noteMidiRef.current);

      let next = match
        ? progressRef.current + dt / REQUIRED_SECONDS
        : Math.max(0, progressRef.current - dt / REQUIRED_SECONDS);

      if (next >= 1) {
        next = 0;
        setNote((prev) => getRandomNote(notes, prev));
      }

      progressRef.current = next;
      setProgress(next);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [state, detectedHzRef]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 px-4">
      <div className="flex flex-col items-center gap-6">
        <p className="text-2xl font-semibold tracking-widest text-(--color-text-muted)">
          {note.label}
        </p>

        <div className="rounded-2xl bg-(--color-surface) px-6 py-4">
          <NoteDisplay note={note} clef={clef} />
        </div>

        {state === 'listening' && (
          <div className="h-3 w-72 overflow-hidden rounded-full bg-zinc-700">
            <div
              className="h-full rounded-full bg-(--color-accent)"
              style={{ width: `${progress * 100}%` }}
            />
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
            className="w-72 rounded-2xl bg-(--color-accent) py-5 text-xl font-bold tracking-widest text-zinc-900 transition-colors hover:bg-(--color-accent-hover) active:scale-95"
          >
            START
          </button>
        ) : (
          <>
            <button
              onClick={handleNext}
              className="w-72 rounded-2xl bg-(--color-surface) py-5 text-xl font-bold tracking-widest text-(--color-text-primary) transition-colors hover:bg-zinc-600 active:scale-95"
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
    </div>
  );
}

export default App;

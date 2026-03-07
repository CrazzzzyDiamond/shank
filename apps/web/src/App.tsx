import { useCallback, useState } from 'react';
import { TRUMPET, getRandomNote } from '@shank/music';
import { NoteDisplay } from './components/NoteDisplay';

const { notes, clef } = TRUMPET;

function App() {
  const [note, setNote] = useState(() => getRandomNote(notes));

  const handleNext = useCallback(() => {
    setNote((prev) => getRandomNote(notes, prev));
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 px-4">
      <div className="flex flex-col items-center gap-6">
        <p className="text-2xl font-semibold tracking-widest text-[var(--color-text-muted)]">
          {note.label}
        </p>

        <div className="rounded-2xl bg-[var(--color-surface)] px-6 py-4">
          <NoteDisplay note={note} clef={clef} />
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-72 rounded-2xl bg-[var(--color-accent)] py-5 text-xl font-bold tracking-widest text-zinc-900 transition-colors hover:bg-[var(--color-accent-hover)] active:scale-95"
      >
        NEXT
      </button>
    </div>
  );
}

export default App;

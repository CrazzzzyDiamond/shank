import { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } from 'vexflow';
import type { Note } from '@shank/music';

interface Props {
  note: Note;
  clef?: 'treble' | 'bass';
}

const WIDTH = 280;
const HEIGHT = 160;
const STAVE_X = 16;
const STAVE_Y = 24;
const STAVE_WIDTH = WIDTH - STAVE_X * 2;
export function NoteDisplay({ note, clef = 'treble' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const noteColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-note').trim() || '#e4e4e7';

    container.innerHTML = '';

    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(WIDTH, HEIGHT);

    const ctx = renderer.getContext();
    ctx.setFillStyle(noteColor);
    ctx.setStrokeStyle(noteColor);

    const stave = new Stave(STAVE_X, STAVE_Y, STAVE_WIDTH);
    stave.addClef(clef);
    stave.setContext(ctx).draw();

    const staveNote = new StaveNote({ keys: [note.key], duration: 'w', clef });

    if (note.accidental) {
      staveNote.addModifier(new Accidental(note.accidental), 0);
    }

    const voice = new Voice({ numBeats: 4, beatValue: 4 });
    voice.setStrict(false);
    voice.addTickables([staveNote]);

    new Formatter().joinVoices([voice]).format([voice], STAVE_WIDTH - 60);
    voice.draw(ctx, stave);

    // Apply color to all SVG paths (clef, note head, etc.)
    const svg = container.querySelector('svg');
    if (svg) {
      svg.querySelectorAll('path, rect, use').forEach((el) => {
        (el as SVGElement).style.fill = noteColor;
        (el as SVGElement).style.stroke = noteColor;
      });
    }
  }, [note, clef]);

  return <div ref={containerRef} />;
}

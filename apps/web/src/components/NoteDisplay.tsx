import { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } from 'vexflow';
import type { Note } from '@shank/music';

interface Props {
  note: Note;
  clef?: 'treble' | 'bass';
  compact?: boolean;
}

export function NoteDisplay({ note, clef = 'treble', compact = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const WIDTH       = compact ? 220 : 280;
    const HEIGHT      = compact ? 155 : 160;
    const STAVE_X     = compact ?  12 :  16;
    const STAVE_Y     = compact ?  16 :  24;
    const STAVE_WIDTH = WIDTH - STAVE_X * 2;

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
      svg.style.overflow = 'visible';
      svg.querySelectorAll('path, rect, use').forEach((el) => {
        (el as SVGElement).style.fill = noteColor;
        (el as SVGElement).style.stroke = noteColor;
      });
    }
  }, [note, clef, compact]);

  return <div ref={containerRef} />;
}

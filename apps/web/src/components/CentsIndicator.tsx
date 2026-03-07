interface Props {
  cents: number;
  tolerance?: number;
}

export function CentsIndicator({ cents, tolerance = 50 }: Props) {
  const clamped = Math.max(-tolerance, Math.min(tolerance, cents));
  const position = ((clamped + tolerance) / (tolerance * 2)) * 100;

  const markerColor =
    Math.abs(cents) <= 15
      ? 'bg-green-400'
      : Math.abs(cents) <= 35
        ? 'bg-yellow-400'
        : 'bg-red-400';

  return (
    <div className="flex w-72 flex-col gap-1">
      <div className="relative h-5">
        <div className="absolute inset-0 rounded-full bg-zinc-700" />
        <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-zinc-500" />
        <div
          className={`absolute top-1 h-3 w-3 -translate-x-1/2 rounded-full ${markerColor}`}
          style={{ left: `${position}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-(--color-text-muted)">
        <span>-{tolerance}</span>
        <span>0</span>
        <span>+{tolerance}</span>
      </div>
    </div>
  );
}

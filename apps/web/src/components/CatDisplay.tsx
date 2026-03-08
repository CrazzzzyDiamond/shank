export type CatMood = 'idle' | 'happy' | 'confused';

interface Props {
  mood: CatMood;
}

const FUR = '#a1a1aa';
const INNER_EAR = '#fda4af';
const NOSE = '#f472b6';
const DARK = '#27272a';
const MUTED = '#71717a';

export function CatDisplay({ mood }: Props) {
  return (
    <svg viewBox="0 0 120 140" width="120" height="140" aria-label={`Cat is ${mood}`}>
      {/* Tail */}
      <path
        d="M 86,116 Q 112,100 106,78 Q 102,66 91,72"
        fill="none"
        stroke={FUR}
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Body */}
      <ellipse cx="57" cy="116" rx="28" ry="19" fill={FUR} />
      {/* Head */}
      <circle cx="60" cy="65" r="33" fill={FUR} />
      {/* Left ear */}
      <polygon points="28,50 40,20 57,46" fill={FUR} />
      <polygon points="33,47 40,26 53,45" fill={INNER_EAR} />
      {/* Right ear */}
      <polygon points="63,46 80,20 92,50" fill={FUR} />
      <polygon points="67,45 80,26 87,47" fill={INNER_EAR} />

      {mood === 'idle' && (
        <g>
          {/* Half-open eyes with eyelid */}
          <ellipse cx="47" cy="64" rx="6" ry="5" fill={DARK} />
          <ellipse cx="73" cy="64" rx="6" ry="5" fill={DARK} />
          <ellipse cx="47" cy="60" rx="6.5" ry="2.5" fill={FUR} />
          <ellipse cx="73" cy="60" rx="6.5" ry="2.5" fill={FUR} />
          <circle cx="49" cy="64" r="1.5" fill="white" />
          <circle cx="75" cy="64" r="1.5" fill="white" />
          {/* Nose */}
          <polygon points="57,72 60,77 63,72" fill={NOSE} />
          {/* Calm mouth */}
          <path d="M 56,78 Q 60,81 64,78" fill="none" stroke={MUTED} strokeWidth="1.5" strokeLinecap="round" />
          {/* Whiskers */}
          <line x1="14" y1="69" x2="40" y2="71" stroke={MUTED} strokeWidth="1" />
          <line x1="14" y1="74" x2="40" y2="74" stroke={MUTED} strokeWidth="1" />
          <line x1="80" y1="71" x2="106" y2="69" stroke={MUTED} strokeWidth="1" />
          <line x1="80" y1="74" x2="106" y2="74" stroke={MUTED} strokeWidth="1" />
        </g>
      )}

      {mood === 'happy' && (
        <g>
          {/* Happy ^-^ eyes */}
          <path d="M 41,67 Q 47,59 53,67" fill="none" stroke={DARK} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 67,67 Q 73,59 79,67" fill="none" stroke={DARK} strokeWidth="2.5" strokeLinecap="round" />
          {/* Nose */}
          <polygon points="57,72 60,77 63,72" fill={NOSE} />
          {/* Big smile */}
          <path d="M 49,79 Q 60,91 71,79" fill="none" stroke={DARK} strokeWidth="2" strokeLinecap="round" />
          {/* Blush */}
          <ellipse cx="36" cy="76" rx="8" ry="5" fill={INNER_EAR} opacity="0.55" />
          <ellipse cx="84" cy="76" rx="8" ry="5" fill={INNER_EAR} opacity="0.55" />
          {/* Whiskers lifted with joy */}
          <line x1="14" y1="73" x2="40" y2="72" stroke={MUTED} strokeWidth="1" />
          <line x1="14" y1="78" x2="40" y2="76" stroke={MUTED} strokeWidth="1" />
          <line x1="80" y1="72" x2="106" y2="73" stroke={MUTED} strokeWidth="1" />
          <line x1="80" y1="76" x2="106" y2="78" stroke={MUTED} strokeWidth="1" />
        </g>
      )}

      {mood === 'confused' && (
        <g>
          {/* Asymmetric eyes */}
          <circle cx="47" cy="65" r="7" fill={DARK} />
          <circle cx="73" cy="65" r="5" fill={DARK} />
          <circle cx="49" cy="63" r="2" fill="white" />
          <circle cx="74" cy="63" r="1.5" fill="white" />
          {/* Furrowed brows */}
          <path d="M 41,55 Q 47,52 53,56" fill="none" stroke={DARK} strokeWidth="2" strokeLinecap="round" />
          <path d="M 67,56 Q 73,52 79,55" fill="none" stroke={DARK} strokeWidth="2" strokeLinecap="round" />
          {/* Nose */}
          <polygon points="57,72 60,77 63,72" fill={NOSE} />
          {/* Wavy mouth */}
          <path d="M 52,80 Q 56,76 60,80 Q 64,84 68,80" fill="none" stroke={MUTED} strokeWidth="1.5" strokeLinecap="round" />
          {/* Sweat drop */}
          <path d="M 90,36 Q 93,29 96,36 Q 96,43 93,43 Q 90,43 90,36 Z" fill="#93c5fd" opacity="0.85" />
          {/* Question mark */}
          <text x="100" y="30" fontSize="13" fill={MUTED} fontFamily="system-ui" fontWeight="bold">?</text>
          {/* Askew whiskers */}
          <line x1="14" y1="66" x2="40" y2="71" stroke={MUTED} strokeWidth="1" />
          <line x1="14" y1="74" x2="40" y2="70" stroke={MUTED} strokeWidth="1" />
          <line x1="80" y1="71" x2="106" y2="67" stroke={MUTED} strokeWidth="1" />
          <line x1="80" y1="70" x2="106" y2="75" stroke={MUTED} strokeWidth="1" />
        </g>
      )}
    </svg>
  );
}

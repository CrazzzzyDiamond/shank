const R = 88;
const NEEDLE_R = 74;
const MAX_DEG = 75; // degrees that correspond to ±tolerance cents
const ZONE_CENTS = 15; // "in tune" green zone

function polar(deg: number, r: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [Math.sin(rad) * r, -Math.cos(rad) * r];
}

function arc(fromDeg: number, toDeg: number, r: number): string {
  const [x1, y1] = polar(fromDeg, r);
  const [x2, y2] = polar(toDeg, r);
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

interface Props {
  cents: number;
  tolerance?: number;
}

export function CentsIndicator({ cents, tolerance = 50 }: Props) {
  const clamped = Math.max(-tolerance, Math.min(tolerance, cents));
  const needleAngle = (clamped / tolerance) * MAX_DEG;
  const zoneAngle = (ZONE_CENTS / tolerance) * MAX_DEG;
  const inTune = Math.abs(cents) <= ZONE_CENTS;

  const ticks = [-tolerance, -tolerance / 2, 0, tolerance / 2, tolerance];

  return (
    <svg
      viewBox="-110 -100 220 130"
      width="260"
      height="154"
      aria-label={`Tuner: ${Math.round(cents)} cents`}
    >
      {/* Background arc */}
      <path
        d={arc(-MAX_DEG, MAX_DEG, R)}
        fill="none"
        stroke="#3f3f46"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* In-tune zone */}
      <path
        d={arc(-zoneAngle, zoneAngle, R)}
        fill="none"
        stroke="#4ade80"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* Tick marks */}
      {ticks.map((c) => {
        const angle = (c / tolerance) * MAX_DEG;
        const [x1, y1] = polar(angle, R - 14);
        const [x2, y2] = polar(angle, R - 4);
        const [lx, ly] = polar(angle, R - 26);
        const label = c === 0 ? '0' : c > 0 ? `+${c}` : `${c}`;
        return (
          <g key={c}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#52525b" strokeWidth={c === 0 ? 2 : 1} />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="9"
              fill="#71717a"
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Needle */}
      <g
        style={{
          transform: `rotate(${needleAngle}deg)`,
          transformOrigin: '0px 0px',
          transition: 'transform 0.07s ease-out',
        }}
      >
        <line
          x1="0"
          y1="8"
          x2="0"
          y2={-NEEDLE_R}
          stroke={inTune ? '#4ade80' : '#e4e4e7'}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Center pivot */}
      <circle cx="0" cy="0" r="5" fill={inTune ? '#4ade80' : '#71717a'} />

      {/* Status text */}
      <text
        x="0"
        y="20"
        textAnchor="middle"
        fontSize="11"
        fill={inTune ? '#4ade80' : '#71717a'}
        fontWeight="600"
        letterSpacing="1"
      >
        {inTune ? 'TUNED' : Math.round(cents) > 0 ? 'SHARP' : 'FLAT'}
      </text>
    </svg>
  );
}

const THRESHOLD = 0.1;

/**
 * YIN pitch detection algorithm.
 * Returns the fundamental frequency in Hz, or null if not detected.
 */
export function detectPitch(buffer: Float32Array<ArrayBuffer>, sampleRate: number): number | null {
  const halfSize = Math.floor(buffer.length / 2);
  const ydf = new Float32Array(halfSize);

  ydf[0] = 1.0;
  let runningSum = 0.0;

  for (let tau = 1; tau < halfSize; tau++) {
    let diff = 0.0;
    for (let i = 0; i < halfSize; i++) {
      const d = (buffer[i] ?? 0) - (buffer[i + tau] ?? 0);
      diff += d * d;
    }
    runningSum += diff;
    ydf[tau] = runningSum > 0 ? (diff * tau) / runningSum : 0;
  }

  for (let tau = 2; tau < halfSize - 1; tau++) {
    if ((ydf[tau] ?? 1) < THRESHOLD && (ydf[tau] ?? 1) <= (ydf[tau + 1] ?? 1)) {
      const s0 = ydf[tau > 0 ? tau - 1 : 0] ?? 0;
      const s1 = ydf[tau] ?? 0;
      const s2 = ydf[tau < halfSize - 1 ? tau + 1 : halfSize - 1] ?? 0;
      const denom = 2 * s1 - s2 - s0;
      const betterTau = denom !== 0 ? tau + (s2 - s0) / (2 * denom) : tau;
      return sampleRate / betterTau;
    }
  }

  return null;
}

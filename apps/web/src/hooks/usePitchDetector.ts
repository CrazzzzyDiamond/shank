import { useCallback, useEffect, useRef, useState } from 'react';
import { detectPitch } from '@shank/pitch';

const FFT_SIZE = 2048;

export type ListeningState = 'idle' | 'listening' | 'error';

export interface UsePitchDetectorReturn {
  detectedHzRef: React.RefObject<number | null>;
  state: ListeningState;
  errorMessage: string | null;
  start: (deviceId?: string) => Promise<void>;
  stop: () => void;
}

export function usePitchDetector(): UsePitchDetectorReturn {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const bufferRef = useRef<Float32Array<ArrayBuffer>>(new Float32Array(FFT_SIZE));
  const detectedHzRef = useRef<number | null>(null);

  const [state, setState] = useState<ListeningState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close();
    streamRef.current = null;
    audioCtxRef.current = null;
    analyserRef.current = null;
    detectedHzRef.current = null;
    setState('idle');
  }, []);

  const start = useCallback(async (deviceId?: string) => {
    try {
      const audio = deviceId ? { deviceId: { exact: deviceId } } : true;
      const stream = await navigator.mediaDevices.getUserMedia({ audio, video: false });
      streamRef.current = stream;

      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = FFT_SIZE;
      analyserRef.current = analyser;
      bufferRef.current = new Float32Array(FFT_SIZE) as Float32Array<ArrayBuffer>;

      audioCtx.createMediaStreamSource(stream).connect(analyser);

      const loop = () => {
        analyser.getFloatTimeDomainData(bufferRef.current);
        detectedHzRef.current = detectPitch(bufferRef.current, audioCtx.sampleRate);
        rafRef.current = requestAnimationFrame(loop);
      };

      rafRef.current = requestAnimationFrame(loop);
      setState('listening');
      setErrorMessage(null);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Microphone access denied';
      setErrorMessage(msg);
      setState('error');
    }
  }, []);

  useEffect(() => () => stop(), [stop]);

  return { detectedHzRef, state, errorMessage, start, stop };
}

import React, { useEffect, useRef } from 'react';

interface AudioAtmosphereProps {
  isPlaying: boolean;
}

export const AudioAtmosphere: React.FC<AudioAtmosphereProps> = ({ isPlaying }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  useEffect(() => {
    if (isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioContextClass();
          audioCtxRef.current = ctx;

          // Gain master
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3); // Soft ambient whisper
          gain.connect(ctx.destination);
          gainNodeRef.current = gain;

          // Warm low-pass filter (subtle fashion runway resonance)
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(260, ctx.currentTime);
          filter.Q.setValueAtTime(2, ctx.currentTime);
          filter.connect(gain);
          filterRef.current = filter;

          // Deep root tone (55Hz / A1)
          const osc1 = ctx.createOscillator();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(55, ctx.currentTime);
          osc1.connect(filter);
          osc1.start();
          osc1Ref.current = osc1;

          // Subtle harmonic 5th (82.4Hz / E2) with slow phase
          const osc2 = ctx.createOscillator();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(82.4, ctx.currentTime);
          osc2.connect(filter);
          osc2.start();
          osc2Ref.current = osc2;
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
          if (gainNodeRef.current) {
            gainNodeRef.current.gain.exponentialRampToValueAtTime(0.04, audioCtxRef.current.currentTime + 2);
          }
        }
      } catch (e) {
        console.warn('Web Audio could not start', e);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        try {
          gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
          setTimeout(() => {
            if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
              audioCtxRef.current.suspend();
            }
          }, 1000);
        } catch {}
      }
    }

    return () => {
      // Cleanup on unmount
    };
  }, [isPlaying]);

  return null;
};

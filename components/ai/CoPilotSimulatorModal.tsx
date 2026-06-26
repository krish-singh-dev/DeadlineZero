'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Zap, AlertTriangle, Clock, ShieldAlert, Disc, Play, Pause, Mic } from 'lucide-react';
import { VoiceInput } from '@/components/ai/VoiceInput';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface CoPilotSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export function CoPilotSimulatorModal({ isOpen, onClose, userName = 'Krish' }: CoPilotSimulatorModalProps) {
  const [procrastinationHours, setProcrastinationHours] = useState<number>(0);
  const [isPlayingVibe, setIsPlayingVibe] = useState<boolean>(false);
  const [quickTaskTitle, setQuickTaskTitle] = useState<string>('');
  const audioCtxRef = useRef<AudioContext | null>(null);

  const simulatedVelocityDrift = (1.15 + procrastinationHours * 0.18).toFixed(2);
  const simulatedRiskSurge = Math.min(100, Math.round(procrastinationHours * 14));

  const toggleBinauralBeats = (play: boolean) => {
    setIsPlayingVibe(play);
    if (play) {
      toast('🎧 Engaging 200Hz/214Hz Alpha Neural Focus Beats in stereo...', { icon: '🎧' });
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Left ear tone: 200Hz
        const oscL = ctx.createOscillator();
        const gainL = ctx.createGain();
        oscL.type = 'sine';
        oscL.frequency.setValueAtTime(200, ctx.currentTime);
        gainL.gain.setValueAtTime(0.12, ctx.currentTime);

        // Right ear tone: 214Hz (Creates 14Hz Alpha focus binaural beat inside human brain)
        const oscR = ctx.createOscillator();
        const gainR = ctx.createGain();
        oscR.type = 'sine';
        oscR.frequency.setValueAtTime(214, ctx.currentTime);
        gainR.gain.setValueAtTime(0.12, ctx.currentTime);

        if (ctx.createStereoPanner) {
          const panL = ctx.createStereoPanner();
          panL.pan.setValueAtTime(-1, ctx.currentTime);
          oscL.connect(gainL).connect(panL).connect(ctx.destination);

          const panR = ctx.createStereoPanner();
          panR.pan.setValueAtTime(1, ctx.currentTime);
          oscR.connect(gainR).connect(panR).connect(ctx.destination);
        } else {
          oscL.connect(gainL).connect(ctx.destination);
          oscR.connect(gainR).connect(ctx.destination);
        }

        oscL.start();
        oscR.start();
      } catch (err) {
        console.warn('Web Audio synth failed:', err);
      }
    } else {
      toast('⏸️ Neural soundscape paused', { icon: '⏸️' });
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch (e) {}
        audioCtxRef.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  const handleQuickDictation = (text: string) => {
    setQuickTaskTitle(text);
    toast.success(`⚡ Captured via ear microphone: "${text}"`);
  };

  const handleCreateInstantTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTaskTitle.trim()) return;

    const toastId = toast.loading('Attaching Gemini Urgency Scorer & inserting into Matrix...');
    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer demo_token' },
        body: JSON.stringify({
          title: quickTaskTitle,
          deadline: new Date(Date.now() + 86400000).toISOString(),
          estimatedHours: 2,
          priority: 'high',
          category: 'Voice Capture',
        }),
      });
      toast.success('✨ Task created & synced to Eisenhower Matrix!', { id: toastId });
      setQuickTaskTitle('');
      window.dispatchEvent(new Event('dz_task_created'));
    } catch (err) {
      toast.error('Failed to dispatch task', { id: toastId });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          />

          <motion.div
            initial={{ y: '100%', scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: '100%', scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-full max-w-lg bg-[#12121A]/95 border border-indigo-500/30 rounded-3xl p-6 lg:p-8 shadow-[0_10px_50px_rgba(99,102,241,0.25)] z-50 text-white overflow-hidden backdrop-blur-xl space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image src="/logo.png" alt="DZ Nano Banana" width={44} height={44} className="rounded-2xl shadow-md animate-bounce" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full ring-4 ring-[#12121A] animate-ping" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg tracking-tight font-display flex items-center gap-1.5">
                    Nano Banana Co-Pilot <span className="text-xs uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Live Simulator</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">Interactive Telemetry Stress-Tester</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Procrastination Stress-Tester */}
            <div className="p-5 rounded-2xl bg-[#181824] border border-amber-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-amber-300 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> Procrastination Stress Simulation
                </span>
                <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                  +{procrastinationHours} Hours Delay
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={48}
                step={2}
                value={procrastinationHours}
                onChange={(e) => setProcrastinationHours(Number(e.target.value))}
                className="w-full accent-amber-400 h-2 bg-black/40 rounded-lg cursor-pointer"
              />

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Simulated Drift Factor</div>
                  <div className="text-lg font-black font-mono text-emerald-400 mt-0.5">{simulatedVelocityDrift}x</div>
                </div>
                <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Downstream Risk Surge</div>
                  <div className="text-lg font-black font-mono text-red-400 mt-0.5">+{simulatedRiskSurge}%</div>
                </div>
              </div>

              {procrastinationHours >= 12 && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 animate-pulse" />
                  CRITICAL: Slippage exceeds safety margin! Gemini will trigger emergency calendar lockdown.
                </motion.div>
              )}
            </div>

            {/* Instant Voice Dictation Creator */}
            <form onSubmit={handleCreateInstantTask} className="space-y-3">
              <label className="text-xs font-mono text-indigo-300 uppercase font-bold flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-indigo-400" /> Anywhere Voice Task Capture
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Speak or type quick task..."
                  value={quickTaskTitle}
                  onChange={(e) => setQuickTaskTitle(e.target.value)}
                  className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                />
                <VoiceInput onTranscript={handleQuickDictation} />
                <button type="submit" className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all active:scale-95 shadow-lg shadow-indigo-600/30 flex items-center gap-1 shrink-0">
                  <Zap className="w-3.5 h-3.5 fill-current" /> Add
                </button>
              </div>
            </form>

            {/* Ambient Vibe Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/30">
              <div className="flex items-center gap-3">
                <Disc className={`w-6 h-6 text-purple-400 ${isPlayingVibe ? 'animate-spin text-pink-400' : ''}`} />
                <div>
                  <h4 className="text-xs font-bold text-white">Lofi Neural Focus Soundscape</h4>
                  <p className="text-[10px] text-purple-300 font-mono">Binaural beats for deep sprint states</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleBinauralBeats(!isPlayingVibe)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                  isPlayingVibe ? 'bg-pink-500/20 border border-pink-500/50 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {isPlayingVibe ? <><Pause className="w-3.5 h-3.5" /> Active</> : <><Play className="w-3.5 h-3.5 fill-current" /> Vibe</>}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

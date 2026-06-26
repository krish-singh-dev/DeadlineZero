'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, CheckCircle2, Plus, Zap, Flame, X, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';

interface FocusSprintOverlayProps {
  blockTitle: string | null;
  onClose: () => void;
}

export function FocusSprintOverlay({ blockTitle, onClose }: FocusSprintOverlayProps) {
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(1500); // 25 mins
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (!blockTitle) return;
    setTimeLeftSeconds(1500);
    setIsActive(true);
  }, [blockTitle]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timeLeftSeconds === 0 && isActive) {
      setIsActive(false);
      toast.success('🏆 Focus Sprint Finished! Velocity reward unlocked!', { duration: 5000 });
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeftSeconds]);

  if (!blockTitle) return null;

  const mins = Math.floor(timeLeftSeconds / 60);
  const secs = timeLeftSeconds % 60;
  const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const progressPercent = ((1500 - timeLeftSeconds) / 1500) * 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-xl bg-[#161622]/95 border border-amber-500/50 rounded-2xl p-4 lg:p-5 shadow-[0_10px_40px_rgba(245,158,11,0.3)] z-40 text-white backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 overflow-hidden">
            <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0 animate-pulse">
              <Flame className="w-6 h-6 fill-current" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">⚡ Live Pomodoro Sprint</span>
              <h4 className="text-sm font-extrabold text-white truncate">{blockTitle}</h4>
            </div>
          </div>

          {/* Countdown Display */}
          <div className="text-3xl font-black font-mono tracking-tighter text-amber-300 px-3 py-1 bg-black/40 rounded-xl border border-white/5">
            {timeFormatted}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsActive(!isActive)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={isActive ? 'Pause timer' : 'Resume timer'}
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current text-emerald-400" />}
            </button>
            <button
              onClick={() => setTimeLeftSeconds((prev) => prev + 300)}
              className="px-2.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 font-bold transition-colors flex items-center gap-1"
              title="Add 5 minutes buffer"
            >
              <Plus className="w-3.5 h-3.5" />5m
            </button>
            <button
              onClick={() => {
                toast.success('Sprint logged completed!');
                onClose();
              }}
              className="p-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 transition-colors"
              title="Complete sprint now"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-500 hover:text-white transition-colors ml-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thin Progress Ring / Bar */}
        <div className="w-full bg-black/40 h-1.5 rounded-full mt-3 overflow-hidden border border-white/5">
          <motion.div
            className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full"
            style={{ width: `${progressPercent}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

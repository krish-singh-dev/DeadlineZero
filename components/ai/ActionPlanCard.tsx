'use client';

import React, { useState } from 'react';
import { DailyPlan, TimeBlock } from '@/types';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';

interface ActionPlanCardProps {
  plan: DailyPlan;
  onSyncCalendar: (blocks: TimeBlock[]) => Promise<void>;
}

export function ActionPlanCard({ plan, onSyncCalendar }: ActionPlanCardProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  const handlePushToCalendar = async () => {
    setIsSyncing(true);
    try {
      await onSyncCalendar(plan.scheduledBlocks);
      setIsSynced(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 lg:p-8 rounded-2xl bg-[#16161F] border border-indigo-500/30 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-500 animate-pulse" />
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              AI Generated Plan
            </span>
            <h2 className="text-xl font-bold text-white mt-1 font-display">Daily AI Morning Action Plan</h2>
          </div>
        </div>

        <button
          onClick={handlePushToCalendar}
          disabled={isSyncing || isSynced || plan.scheduledBlocks.length === 0}
          className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
            isSynced
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 active:scale-95 disabled:opacity-50'
          }`}
        >
          {isSynced ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Locked in Google Calendar</span>
            </>
          ) : isSyncing ? (
            <span>Pre-Blocking Slots...</span>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              <span>Push All to Google Calendar ⚡</span>
            </>
          )}
        </button>
      </div>

      {/* AI Synthesis Quote */}
      <div className="p-4 rounded-xl bg-[#0F1729] border border-indigo-500/20 mb-6 text-sm text-indigo-100 italic leading-relaxed">
        &ldquo;{plan.aiSummary}&rdquo;
      </div>

      {/* Scheduled Time Blocks */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Recommended Focus Blocks</h3>
        
        {plan.scheduledBlocks.length === 0 ? (
          <p className="text-xs text-slate-500 font-mono py-4">No focus blocks scheduled for today.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {plan.scheduledBlocks.map((block, idx) => {
              const startFormatted = block.start ? format(new Date(block.start), 'hh:mm a') : '09:00 AM';
              const endFormatted = block.end ? format(new Date(block.end), 'hh:mm a') : '11:00 AM';
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#1C1C28] border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 rounded-full bg-indigo-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{block.title}</h4>
                      <span className="text-[10px] font-mono text-indigo-300 inline-flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> Protected Slot
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-bold text-slate-200">{startFormatted}</div>
                    <div className="text-[10px] font-mono text-slate-500">to {endFormatted}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span>🤖 Generated by Gemini 1.5 Flash</span>
        <span className="text-indigo-400">Autonomous AI Execution</span>
      </div>
    </motion.div>
  );
}

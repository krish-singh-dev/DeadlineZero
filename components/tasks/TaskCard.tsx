'use client';

import React, { useState, useEffect } from 'react';
import { Task, SubTask } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, Clock, AlertTriangle, ChevronDown, ChevronUp, MoreHorizontal, Zap } from 'lucide-react';
import { formatDistanceToNowStrict, differenceInSeconds } from 'date-fns';

interface TaskCardProps {
  task: Task;
  view?: 'list' | 'kanban' | 'matrix' | 'calendar';
  onComplete: (id: string) => void;
  onDecompose: (id: string) => void;
  onSubtaskToggle?: (taskId: string, subtaskId: string) => void;
}

export function TaskCard({
  task,
  view = 'list',
  onComplete,
  onDecompose,
  onSubtaskToggle,
}: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isOverdue, setIsOverdue] = useState(false);

  // Live countdown timer ticking every second
  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = new Date(task.deadline);
      const diffSecs = differenceInSeconds(targetDate, new Date());

      if (diffSecs <= 0) {
        setIsOverdue(true);
        setTimeLeft('OVERDUE');
      } else {
        setIsOverdue(false);
        setTimeLeft(formatDistanceToNowStrict(targetDate));
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [task.deadline]);

  // Map 0-100 score to Rule 9 color semantics
  const getRiskSemantics = (score: number) => {
    if (score >= 86) return { level: 'critical', color: '#EF4444', text: 'text-red-400', border: 'border-red-500', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]' };
    if (score >= 61) return { level: 'high', color: '#F97316', text: 'text-orange-400', border: 'border-orange-500', glow: 'shadow-[0_0_16px_rgba(249,115,22,0.15)]' };
    if (score >= 31) return { level: 'medium', color: '#EAB308', text: 'text-amber-400', border: 'border-amber-500', glow: 'shadow-[0_0_12px_rgba(234,179,8,0.1)]' };
    return { level: 'low', color: '#22C55E', text: 'text-emerald-400', border: 'border-emerald-500', glow: 'shadow-[0_0_12px_rgba(34,197,94,0.08)]' };
  };

  const risk = getRiskSemantics(task.riskScore);

  const completedSubtasksCount = task.subtasks?.filter((st) => st.completed).length || 0;
  const totalSubtasksCount = task.subtasks?.length || 0;
  const subtaskProgressPercent = totalSubtasksCount > 0
    ? Math.round((completedSubtasksCount / totalSubtasksCount) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`task-card p-5 relative bg-[#16161F] border border-white/5 rounded-xl hover:border-white/10 transition-all ${risk.glow}`}
      style={{ borderLeft: `3px solid ${risk.color}` }}
      data-risk={risk.level}
    >
      {/* Top Header Row: Category & JetBrains Mono Risk Badge */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: risk.color }} />
          <span className="text-[11px] font-medium tracking-wider uppercase text-slate-400 px-2 py-0.5 rounded bg-[#1C1C28] border border-white/5 font-mono">
            {task.category || 'General'}
          </span>
          {task.aiDecomposed && (
            <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/20 font-mono inline-flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Decomposed
            </span>
          )}
        </div>

        {/* Risk Score Pill */}
        <div className={`px-2.5 py-0.5 rounded border text-xs font-mono font-bold flex items-center gap-1 ${risk.text} bg-[#1C1C28] border-white/10`}>
          {task.riskScore >= 86 && <Zap className="w-3 h-3 text-red-400 animate-bounce" />}
          RISK: {task.riskScore}
        </div>
      </div>

      {/* Task Title */}
      <h3 className={`text-lg font-bold tracking-tight text-white line-clamp-2 ${task.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
        {task.title}
      </h3>

      {task.description && (
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Metadata Row: Countdown & Remaining Work */}
      <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-white/5 text-xs font-mono text-slate-400">
        <div className={`flex items-center gap-1.5 ${isOverdue ? 'text-red-400 font-bold animate-pulse' : 'text-slate-300'}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>Due {isOverdue ? 'Overdue!' : `in ${timeLeft}`}</span>
        </div>

        <div className="text-slate-500">·</div>

        <div>
          ~{task.estimatedHours - task.actualHours > 0 ? task.estimatedHours - task.actualHours : 0}h remaining
        </div>
      </div>

      {/* Subtask Progress Bar */}
      {totalSubtasksCount > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center text-[11px] font-mono mb-1.5">
            <span className="text-slate-400">Subtask Execution</span>
            <span className="text-indigo-400 font-bold">{subtaskProgressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#1C1C28] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${subtaskProgressPercent}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full"
            />
          </div>
        </div>
      )}

      {/* Footer Action Controls Row */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onComplete(task.id)}
            disabled={task.status === 'completed'}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              task.status === 'completed'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/5'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {task.status === 'completed' ? 'Completed' : 'Mark Done'}
          </button>

          {!task.aiDecomposed && totalSubtasksCount === 0 && (
            <button
              onClick={() => onDecompose(task.id)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm shadow-indigo-500/10 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              AI Break Down
            </button>
          )}
        </div>

        {totalSubtasksCount > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-[#1C1C28] hover:bg-white/5 text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1 font-mono"
          >
            <span>{totalSubtasksCount} steps</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Expanded Subtasks Accordion */}
      <AnimatePresence>
        {isExpanded && totalSubtasksCount > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 pt-3 border-t border-white/5 space-y-2 overflow-hidden"
          >
            {task.subtasks.map((st) => (
              <div
                key={st.id}
                onClick={() => onSubtaskToggle && onSubtaskToggle(task.id, st.id)}
                className={`p-2.5 rounded-lg bg-[#1C1C28]/60 border border-white/5 flex items-center justify-between text-xs cursor-pointer hover:border-white/10 transition-colors ${
                  st.completed ? 'opacity-50 line-through text-slate-500' : 'text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${st.completed ? 'bg-indigo-600 border-indigo-500' : 'border-slate-500'}`}>
                    {st.completed && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span>{st.title}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">~{st.estimatedHours}h</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

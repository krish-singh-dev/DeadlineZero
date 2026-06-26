'use client';

import React from 'react';
import { SubTask } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Sparkles } from 'lucide-react';

interface SubtaskListProps {
  taskId: string;
  subtasks: SubTask[];
  onToggle: (taskId: string, subtaskId: string) => void;
}

export function SubtaskList({ taskId, subtasks, onToggle }: SubtaskListProps) {
  if (!subtasks || subtasks.length === 0) return null;

  const completedCount = subtasks.filter((st) => st.completed).length;
  const progressPercent = Math.round((completedCount / subtasks.length) * 100);

  return (
    <div className="space-y-3 pt-3 border-t border-white/5">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Sprint Steps ({completedCount}/{subtasks.length})</span>
        </span>
        <span className="text-indigo-400 font-bold">{progressPercent}%</span>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {subtasks.map((st) => (
            <motion.div
              key={st.id}
              layout
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => onToggle(taskId, st.id)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                st.completed
                  ? 'bg-indigo-600/10 border-indigo-500/20 text-slate-400 line-through'
                  : 'bg-[#1C1C28] border-white/5 text-slate-200 hover:border-white/15'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                    st.completed ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-500 hover:border-indigo-400'
                  }`}
                >
                  {st.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <span className="text-xs font-medium">{st.title}</span>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 shrink-0">
                <Clock className="w-3 h-3" />
                <span>~{st.estimatedHours}h</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

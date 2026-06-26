'use client';

import React from 'react';
import { ChatMessage } from '@/types';
import { motion } from 'framer-motion';
import { Sparkles, User, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { TaskCard } from '../tasks/TaskCard';

interface ChatBubbleProps {
  message: ChatMessage;
  onCompleteTask?: (id: string) => void;
  onDecomposeTask?: (id: string) => void;
}

export function ChatBubble({
  message,
  onCompleteTask = () => {},
  onDecomposeTask = () => {},
}: ChatBubbleProps) {
  const isAssistant = message.role === 'assistant';
  const timeFormatted = message.timestamp ? format(new Date(message.timestamp), 'hh:mm a') : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex items-start gap-3 my-4 ${isAssistant ? 'justify-start' : 'justify-end flex-row-reverse'}`}
    >
      {/* Avatar Icon */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-md ${
          isAssistant
            ? 'bg-indigo-600 text-white shadow-indigo-600/30'
            : 'bg-[#252538] text-slate-300 border border-white/10'
        }`}
      >
        {isAssistant ? <Sparkles className="w-4 h-4 animate-pulse text-indigo-200" /> : <User className="w-4 h-4" />}
      </div>

      {/* Bubble Container */}
      <div className={`max-w-2xl space-y-3 ${isAssistant ? 'items-start' : 'items-end'}`}>
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
            isAssistant
              ? 'bg-[#16161F] border border-white/5 text-slate-100 shadow-xl rounded-tl-none'
              : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 rounded-tr-none font-medium'
          }`}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>

        {/* Inline Rendered Task Cards (Rule 6 AI Action Showcase) */}
        {message.taskCards && message.taskCards.length > 0 && (
          <div className="mt-3 space-y-3 w-full pl-2 border-l-2 border-indigo-500/40">
            <div className="text-[10px] font-mono uppercase text-indigo-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Autonomously Mutated Records ({message.taskCards.length})</span>
            </div>
            {message.taskCards.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={onCompleteTask}
                onDecompose={onDecomposeTask}
              />
            ))}
          </div>
        )}

        {/* Timestamp Footer */}
        <div className={`text-[10px] font-mono text-slate-500 px-1 flex items-center gap-2 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
          <span>{isAssistant ? 'Gemini Co-Pilot' : 'You'}</span>
          <span>·</span>
          <span>{timeFormatted}</span>
        </div>
      </div>
    </motion.div>
  );
}

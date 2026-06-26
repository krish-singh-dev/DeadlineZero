'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ChatMessage } from '@/types';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ChatBubble } from '@/components/ai/ChatBubble';
import { VoiceInput } from '@/components/ai/VoiceInput';
import { Send, Sparkles, MessageSquareCode, ShieldCheck, Zap, Bot } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ChatPage() {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initSession = async () => {
      if (!user || user.uid === 'demo_krish_uid') return;
      const storedId = localStorage.getItem('dz_active_chat_session');
      if (storedId) {
        setSessionId(storedId);
        try {
          const snap = await getDoc(doc(db, 'chatSessions', storedId));
          if (snap.exists()) {
            setMessages((snap.data()?.messages || []) as ChatMessage[]);
          }
        } catch (err) {
          console.warn('Chat session sync offline');
        }
      }
    };
    initSession();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSendMessage = async (textToSend?: string) => {
    const finalMsg = textToSend || input;
    if (!finalMsg.trim() || isSending) return;

    if (!textToSend) setInput('');
    setIsSending(true);

    const tempUserMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      content: finalMsg,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const idToken = await auth.currentUser?.getIdToken();
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken || 'demo_token'}`,
        },
        body: JSON.stringify({
          message: finalMsg,
          sessionId: sessionId || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (!sessionId) {
          setSessionId(data.data.sessionId);
          localStorage.setItem('dz_active_chat_session', data.data.sessionId);
        }
        setMessages((prev) => [...prev, data.data.message]);

        if (data.data.actionTaken) {
          toast.success(`⚡ AI Action: ${data.data.actionTaken.description}`);
        }
      } else {
        throw new Error(data.error?.message || 'Chat rejection');
      }
    } catch (err: any) {
      toast.error('Co-Pilot communication failure');
    } finally {
      setIsSending(false);
    }
  };

  const handleVoiceTranscript = (dictatedText: string) => {
    setInput(dictatedText);
    toast.success('Voice transcribed! Press send or edit.');
  };

  const suggestionChips = [
    "⚡ Create task: Polish landing page by tomorrow 4pm",
    "✨ Decompose my highest risk sprint task",
    "📅 How looks my morning schedule buffer?",
  ];

  const handleCompleteTask = async (id: string) => {
    await updateDoc(doc(db, 'tasks', id), { status: 'completed', riskScore: 0 });
    toast.success('Task marked completed from chat feed!');
  };

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto p-4 lg:p-6 bg-[#0A0A0F]">
      {/* Top Telemetry Header */}
      <header className="p-4 rounded-2xl bg-[#111118] border border-white/5 flex items-center justify-between shrink-0 mb-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white font-display">Gemini Conversational Co-Pilot</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> AI Powered
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Natural language interface with full authority to mutate database records
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20">
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>Gemini 1.5 Flash</span>
        </div>
      </header>

      {/* Chat Message Stream */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 rounded-2xl bg-[#0E0E16]/50 border border-white/5 p-4 lg:p-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white">How can I assist your sprint today, {profile?.name}?</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              You can ask me to evaluate deadlines, break down daunting projects, or create tasks directly via voice or text.
            </p>

            {/* Quick Chips */}
            <div className="pt-4 flex flex-col gap-2 w-full">
              {suggestionChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="p-3 rounded-xl bg-[#16161F] hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/30 text-xs text-left text-slate-300 hover:text-white transition-all font-mono"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg}
              onCompleteTask={handleCompleteTask}
            />
          ))
        )}

        {isSending && (
          <div className="flex items-center gap-3 py-4 text-xs font-mono text-slate-400 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span>Gemini is synthesizing intent & executing DB actions...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Dictation & Text Bar */}
      <div className="pt-4 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-3 p-2 rounded-2xl bg-[#16161F] border border-white/10 focus-within:border-indigo-500 transition-colors shadow-2xl"
        >
          <VoiceInput onTranscript={handleVoiceTranscript} disabled={isSending} />

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSending}
            placeholder={`Ask Gemini Co-Pilot or speak your sprint goal...`}
            className="flex-1 bg-transparent px-2 py-3 text-sm text-white placeholder-slate-500 outline-none font-mono"
          />

          <button
            type="submit"
            disabled={!input.trim() || isSending}
            className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

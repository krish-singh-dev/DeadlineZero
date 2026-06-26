'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Task, TaskPriority } from '@/types';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { TaskCard } from '@/components/tasks/TaskCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LayoutGrid, List, Sparkles, Filter, X, ArrowRight, ShieldAlert, Zap, Flame } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'matrix' | 'grid'>('matrix');
  const [isCrunchMode, setIsCrunchMode] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(4);
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('high');
  const [category, setCategory] = useState('Development');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchApiTasks = async () => {
      try {
        const idToken = await auth.currentUser?.getIdToken();
        const res = await fetch('/api/tasks', {
          headers: { Authorization: `Bearer ${idToken || 'demo_token'}` }
        });
        const data = await res.json();
        if (data.success && data.data) {
          setTasks(data.data);
          setLoading(false);
        }
      } catch (err) {}
    };
    fetchApiTasks();

    if (user.uid === 'demo_krish_uid') return;

    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
      setTasks(fetched);
      setLoading(false);
    }, () => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !deadline) {
      toast.error('Title and Deadline are required');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Calibrating initial risk score...');
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const isoDeadline = new Date(deadline).toISOString();

      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken || 'demo_token'}`,
        },
        body: JSON.stringify({
          title,
          description,
          estimatedHours: Number(estimatedHours),
          deadline: isoDeadline,
          priority,
          category,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (user?.uid === 'demo_krish_uid' && data.data) {
          setTasks(prev => [data.data, ...prev]);
        }
        toast.success('Task created! Gemini Urgency Scorer attached.', { id: toastId });
        setIsModalOpen(false);
        setTitle('');
        setDescription('');
      } else {
        throw new Error(data.error?.message || 'Creation failed');
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteTask = async (id: string) => {
    if (user?.uid === 'demo_krish_uid') {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'completed', riskScore: 0 } : t));
      toast.success('Task marked completed!');
      return;
    }
    await updateDoc(doc(db, 'tasks', id), { status: 'completed', riskScore: 0 });
    toast.success('Task marked completed!');
  };

  const handleDecomposeTask = async (id: string) => {
    const toastId = toast.loading('Decomposing into sprint steps...');
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/tasks/${id}/decompose`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken || 'demo_token'}` },
      });
      const data = await res.json();
      if (data.success) toast.success('✨ Decomposed!', { id: toastId });
      else throw new Error(data.error?.message);
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    }
  };

  // Eisenhower Matrix Categorization with Crunch Simulation Drift
  const mappedTasks = tasks.map(t => isCrunchMode && t.status !== 'completed' ? { ...t, riskScore: Math.min(100, t.riskScore + 40) } : t);
  const urgentCritical = mappedTasks.filter(t => t.status !== 'completed' && t.riskScore >= 61);
  const highPriority = mappedTasks.filter(t => t.status !== 'completed' && t.riskScore < 61 && (t.priority === 'critical' || t.priority === 'high'));
  const steadyLow = mappedTasks.filter(t => t.status !== 'completed' && t.riskScore < 61 && (t.priority === 'medium' || t.priority === 'low'));
  const completedTasks = mappedTasks.filter(t => t.status === 'completed');

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Eisenhower Urgency Matrix</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            AI-Powered Matrix · Dynamic prioritization driven by AI risk telemetry
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#111118] p-1 rounded-xl border border-white/5 flex items-center">
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${viewMode === 'matrix' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Matrix
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <List className="w-3.5 h-3.5" /> All Tasks ({tasks.length})
            </button>
          </div>

          <button
            onClick={() => {
              setIsCrunchMode(!isCrunchMode);
              toast(isCrunchMode ? '✨ Crunch simulation ended' : '🔥 AI Bottleneck Crunch Simulated! Backlog drifted +40% risk.', { icon: isCrunchMode ? '✨' : '🔥' });
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              isCrunchMode ? 'bg-red-500/20 text-red-300 border-red-500 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
            }`}
            title="Simulate upstream deadline crunch"
          >
            <Flame className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>{isCrunchMode ? 'Crunch Active 🔥' : 'Simulate Crunch'}</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary inline-flex items-center gap-2 text-xs shrink-0"
          >
            <Plus className="w-4 h-4" /> New Sprint
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center font-mono text-xs text-slate-500">Loading Telemetry...</div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(t => (
            <TaskCard key={t.id} task={t} onComplete={handleCompleteTask} onDecompose={handleDecomposeTask} />
          ))}
        </div>
      ) : (
        /* Matrix View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quadrant 1: Urgent & Critical Risk */}
          <div className="p-6 rounded-2xl bg-[#111118]/80 border border-red-500/20 space-y-4">
            <div className="flex items-center justify-between border-b border-red-500/20 pb-3">
              <div className="flex items-center gap-2 text-red-400">
                <ShieldAlert className="w-4 h-4 animate-bounce" />
                <h3 className="font-bold text-sm uppercase font-mono tracking-wider">Q1: Do Immediately (Critical Risk)</h3>
              </div>
              <span className="text-xs font-mono font-bold bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">{urgentCritical.length}</span>
            </div>
            <div className="space-y-4">
              {urgentCritical.length === 0 ? <p className="text-xs text-slate-600 font-mono py-8 text-center">No critical risk tasks</p> : urgentCritical.map(t => <TaskCard key={t.id} task={t} onComplete={handleCompleteTask} onDecompose={handleDecomposeTask} />)}
            </div>
          </div>

          {/* Quadrant 2: Schedule & Deep Focus */}
          <div className="p-6 rounded-2xl bg-[#111118]/80 border border-orange-500/20 space-y-4">
            <div className="flex items-center justify-between border-b border-orange-500/20 pb-3">
              <div className="flex items-center gap-2 text-orange-400">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-bold text-sm uppercase font-mono tracking-wider">Q2: Schedule Focus (High Priority)</h3>
              </div>
              <span className="text-xs font-mono font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20">{highPriority.length}</span>
            </div>
            <div className="space-y-4">
              {highPriority.length === 0 ? <p className="text-xs text-slate-600 font-mono py-8 text-center">No high priority tasks</p> : highPriority.map(t => <TaskCard key={t.id} task={t} onComplete={handleCompleteTask} onDecompose={handleDecomposeTask} />)}
            </div>
          </div>

          {/* Quadrant 3: Steady Backlog */}
          <div className="p-6 rounded-2xl bg-[#111118]/80 border border-amber-500/20 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <h3 className="font-bold text-sm uppercase font-mono tracking-wider text-amber-400">Q3: Backlog & Delegate (Medium/Low)</h3>
              <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">{steadyLow.length}</span>
            </div>
            <div className="space-y-4">
              {steadyLow.length === 0 ? <p className="text-xs text-slate-600 font-mono py-8 text-center">No steady backlog tasks</p> : steadyLow.map(t => <TaskCard key={t.id} task={t} onComplete={handleCompleteTask} onDecompose={handleDecomposeTask} />)}
            </div>
          </div>

          {/* Quadrant 4: Shipped Archive */}
          <div className="p-6 rounded-2xl bg-[#111118]/80 border border-emerald-500/20 space-y-4 opacity-75">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <h3 className="font-bold text-sm uppercase font-mono tracking-wider text-emerald-400">Shipped Archive (Completed)</h3>
              <span className="text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">{completedTasks.length}</span>
            </div>
            <div className="space-y-4">
              {completedTasks.length === 0 ? <p className="text-xs text-slate-600 font-mono py-8 text-center">No completed tasks yet</p> : completedTasks.map(t => <TaskCard key={t.id} task={t} onComplete={handleCompleteTask} onDecompose={handleDecomposeTask} />)}
            </div>
          </div>
        </div>
      )}

      {/* Quick Task Creation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="max-w-lg w-full bg-[#16161F] border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-bold text-white mb-1 font-display">New Sprint Task</h2>
              <p className="text-xs text-slate-400 mb-6 font-mono">Gemini will autonomously evaluate urgency upon submission.</p>

              <form onSubmit={handleCreateTask} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Task Title</label>
                  <input required type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Implement Firestore indexing" className="w-full bg-[#1C1C28] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Description (Optional)</label>
                  <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Add technical notes..." className="w-full bg-[#1C1C28] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Estimated Hours</label>
                    <input required type="number" min={0.5} step={0.5} value={estimatedHours} onChange={e => setEstimatedHours(Number(e.target.value))} className="w-full bg-[#1C1C28] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Hard Deadline</label>
                    <input required type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} className="w-full bg-[#1C1C28] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 outline-none font-mono" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Priority Level</label>
                    <select value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} className="w-full bg-[#1C1C28] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 outline-none font-mono capitalize">
                      <option value="critical">🚨 Critical</option>
                      <option value="high">⚡ High</option>
                      <option value="medium">⚖️ Medium</option>
                      <option value="low">🌱 Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Category</label>
                    <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-[#1C1C28] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 outline-none font-mono" />
                  </div>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm mt-4">
                  {isSubmitting ? 'Calibrating...' : 'Dispatch Sprint Task'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

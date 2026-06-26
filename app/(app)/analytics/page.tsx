'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, AlertTriangle, Sparkles, ShieldCheck, Activity, BarChart3, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AnalyticsPage() {
  const { user, profile } = useAuth();
  const [telemetry, setTelemetry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTelemetry = async () => {
      if (!user) return;
      try {
        const idToken = await auth.currentUser?.getIdToken();
        const res = await fetch('/api/analytics', {
          headers: { Authorization: `Bearer ${idToken || 'demo_token'}` },
        });
        const data = await res.json();
        if (data.success) {
          setTelemetry(data.data);
        } else {
          throw new Error();
        }
      } catch (err) {
        toast.error('Telemetry sync failed');
      } finally {
        setLoading(false);
      }
    };
    fetchTelemetry();
  }, [user]);

  if (loading || !telemetry) {
    return <div className="py-24 text-center font-mono text-xs text-slate-500">Calibrating Velocity Telemetry...</div>;
  }

  const { metrics, behaviorProfile, categoryDistribution } = telemetry;
  const isHighDrift = behaviorProfile.avgEstimationError >= 1.4;

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">AI Behavior Telemetry & Drift</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Behavior Telemetry · Autonomous estimation factor recalibration for <span className="text-indigo-400 font-semibold">{profile?.name}</span>
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 inline-flex items-center gap-2">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>Real-time Velocity Loop Active</span>
        </div>
      </div>

      {/* Primary Drift Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 lg:p-8 rounded-2xl bg-[#16161F] border relative overflow-hidden ${
          isHighDrift ? 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)]' : 'border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className={`text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border ${isHighDrift ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'}`}>
              Historical Workload Drift
            </span>
            <h2 className="text-2xl font-bold text-white">
              {isHighDrift ? '⚡ Chronic Underestimation Detected' : '🌱 Estimation Velocity Balanced'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Gemini has learned that you typically require <span className="font-mono font-bold text-white">{behaviorProfile.avgEstimationError}x</span> more hours to complete sprints than initially logged. The Risk Analyzer Agent now multiplies all pending deadline buffer formulas by this exact coefficient.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111118] border border-white/5 text-center shrink-0 min-w-48">
            <div className="text-xs font-mono uppercase text-slate-400 mb-1">Drift Multiplier</div>
            <div className={`text-5xl font-black font-mono ${isHighDrift ? 'text-amber-400' : 'text-emerald-400'}`}>
              {behaviorProfile.avgEstimationError}x
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-1">AI Risk Modifier</div>
          </div>
        </div>
      </motion.div>

      {/* Telemetry Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Procrastination Gauge */}
        <div className="p-6 rounded-2xl bg-[#111118] border border-white/5 space-y-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Procrastination Index</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-black font-mono text-white">{behaviorProfile.procrastinationIndex}</span>
            <span className="text-xs font-mono text-slate-500">/ 100 max</span>
          </div>
          <div className="w-full h-2 bg-[#1C1C28] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: `${behaviorProfile.procrastinationIndex}%` }} />
          </div>
          <p className="text-[11px] text-slate-400">Percentage of tasks finished close to deadlines</p>
        </div>

        {/* Peak Completion Hours */}
        <div className="p-6 rounded-2xl bg-[#111118] border border-white/5 space-y-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Peak Flow Hours</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {behaviorProfile.mostProductiveHours.map((hour: number) => (
              <span key={hour} className="px-3 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-mono text-sm font-bold">
                {hour === 0 ? '12:00 AM' : hour === 12 ? '12:00 PM' : hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-400">Smart Scheduler locks these slots first</p>
        </div>

        {/* Burn-Down Completion Rate */}
        <div className="p-6 rounded-2xl bg-[#111118] border border-white/5 space-y-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Sprint Completion Rate</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-black font-mono text-emerald-400">{metrics.completionRatePercent}%</span>
            <span className="text-xs font-mono text-slate-500">{metrics.completedTasks}/{metrics.totalTasks} shipped</span>
          </div>
          <div className="w-full h-2 bg-[#1C1C28] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${metrics.completionRatePercent}%` }} />
          </div>
          <p className="text-[11px] text-slate-400">Zero-degradation architectural throughput</p>
        </div>
      </div>

      {/* Category Distribution Table */}
      <div className="p-6 lg:p-8 rounded-2xl bg-[#111118] border border-white/5 space-y-4">
        <h3 className="text-base font-bold text-white font-display">Sprint Allocation by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {Object.entries(categoryDistribution || {}).map(([cat, count]) => (
            <div key={cat} className="p-4 rounded-xl bg-[#16161F] border border-white/5 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300 truncate">{cat}</span>
              <span className="text-xs font-mono font-bold text-indigo-400 ml-2">{count as number}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useAuthStore } from '@/hooks/useAuth';
import { UserRole } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Zap, Clock, Calendar, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { user, profile, loading, needsOnboarding, loginWithGoogle, completeOnboarding } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Onboarding Modal State
  const [selectedRole, setSelectedRole] = useState<UserRole>('professional');
  const [workStart, setWorkStart] = useState('09:00');
  const [workEnd, setWorkEnd] = useState('18:00');
  const [focusDuration, setFocusDuration] = useState(120);
  const [connectCalendar, setConnectCalendar] = useState(true);

  useEffect(() => {
    if (!loading && user && !needsOnboarding && profile) {
      router.push('/dashboard');
    }
  }, [user, loading, needsOnboarding, profile, router]);

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      toast.success('Successfully signed in with Google!');
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await completeOnboarding(selectedRole, {
        workingHours: { start: workStart, end: workEnd },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        focusDuration,
        quietHours: { start: '22:00', end: '07:00' },
        emailDigestEnabled: true,
      });
      toast.success('🎉 Welcome to DeadlineZero!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to finish onboarding');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-mono text-sm animate-pulse">Engaging Agentic Core...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 flex flex-col justify-center relative overflow-hidden px-4 py-12">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Column: Hero Copy & Value Prop */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs uppercase font-mono tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            DeadlineZero — AI Deadline Co-Pilot
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            Don&apos;t just remind. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-500">
              Act Autonomously.
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
            DeadlineZero is an autonomous AI co-pilot that decomposes complex goals, pre-blocks Google Calendar focus windows, and proactively rescues tasks before deadlines are ever missed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#16161F]/80 border border-white/5">
              <Zap className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-sm text-white">Dynamic Risk Pulse</h3>
                <p className="text-xs text-slate-400 mt-1">Real-time color-coded glowing cards signal urgency at a glance.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#16161F]/80 border border-white/5">
              <Calendar className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-sm text-white">Smart Calendar Blocks</h3>
                <p className="text-xs text-slate-400 mt-1">AI auto-finds free slots and locks in protected focus sessions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Google OAuth Card */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-8 rounded-2xl bg-[#16161F] border border-white/10 shadow-2xl backdrop-blur-xl relative"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xl">
                DZ
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Get Started</h2>
                <p className="text-xs text-slate-400">Sync with Google to activate your AI Co-Pilot</p>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-all shadow-lg hover:shadow-white/10 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.8-.4-1.6-.4-2.8s.2-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/>
              </svg>
              {isSubmitting ? 'Connecting...' : 'Continue with Google'}
            </button>

            <button
              onClick={() => {
                const demoUser: any = { uid: 'demo_krish_uid', email: 'krish@deadlinezero.app', displayName: 'Krish' };
                useAuthStore.getState().setUser(demoUser);
                useAuthStore.getState().setProfile({
                  uid: 'demo_krish_uid',
                  name: 'Krish',
                  email: 'krish@deadlinezero.app',
                  role: 'entrepreneur',
                  createdAt: new Date().toISOString(),
                  preferences: { workingHours: { start: '09:00', end: '18:00' }, timezone: 'IST', focusDuration: 120, quietHours: { start: '22:00', end: '07:00' }, emailDigestEnabled: true },
                  behaviorProfile: { mostProductiveHours: [10, 14, 16], avgEstimationError: 1.25, procrastinationIndex: 35, strongestCategories: ['Core AI'] }
                });
                useAuthStore.getState().setLoading(false);
                useAuthStore.getState().setNeedsOnboarding(false);
                toast.success('⚡ Entered Instant Demo Mode!');
                router.push('/dashboard');
              }}
              className="w-full mt-3 py-3 px-6 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-300 hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>⚡ Instant Demo Login (Skip Google Auth)</span>
            </button>

            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <p className="text-[11px] text-slate-500 font-mono">
                🔒 Zero-Trust Enforced · 100% Google Cloud Native
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Persona Onboarding Modal */}
      <AnimatePresence>
        {user && needsOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-xl w-full bg-[#16161F] border border-indigo-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <h2 className="text-2xl font-bold text-white mb-2">Configure Your Co-Pilot</h2>
              <p className="text-sm text-slate-400 mb-6">
                Tell DeadlineZero about your workload so Gemini can calibrate your risk scores.
              </p>

              <form onSubmit={handleFinishOnboarding} className="space-y-6">
                {/* Role Selection */}
                <div>
                  <label className="block text-xs uppercase font-mono text-slate-400 mb-3">
                    Select Your Persona
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['student', 'professional', 'entrepreneur'] as UserRole[]).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`py-3 px-3 rounded-xl border text-center transition-all capitalize text-xs font-medium flex flex-col items-center gap-1.5 ${
                          selectedRole === role
                            ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                            : 'bg-[#1C1C28] border-white/5 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        {role === 'student' && '🎓 Student'}
                        {role === 'professional' && '💼 Professional'}
                        {role === 'entrepreneur' && '🚀 Entrepreneur'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Working Hours */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono text-slate-400 mb-2">
                      Work Start Time
                    </label>
                    <input
                      type="time"
                      value={workStart}
                      onChange={(e) => setWorkStart(e.target.value)}
                      className="w-full bg-[#1C1C28] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-mono text-slate-400 mb-2">
                      Work End Time
                    </label>
                    <input
                      type="time"
                      value={workEnd}
                      onChange={(e) => setWorkEnd(e.target.value)}
                      className="w-full bg-[#1C1C28] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Focus Session Length */}
                <div>
                  <label className="block text-xs uppercase font-mono text-slate-400 mb-2">
                    Preferred Focus Session (Minutes)
                  </label>
                  <select
                    value={focusDuration}
                    onChange={(e) => setFocusDuration(Number(e.target.value))}
                    className="w-full bg-[#1C1C28] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none font-mono"
                  >
                    <option value={60}>60 mins (Standard Sprint)</option>
                    <option value={90}>90 mins (Deep Work Block)</option>
                    <option value={120}>120 mins (Hackathon Marathon)</option>
                  </select>
                </div>

                {/* Calendar Sync Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#1C1C28] border border-white/5">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-indigo-400" />
                    <div>
                      <h4 className="text-sm font-medium text-white">Auto-Sync Google Calendar</h4>
                      <p className="text-[11px] text-slate-400">Enable AI to autonomously write focus blocks</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={connectCalendar}
                    onChange={(e) => setConnectCalendar(e.target.checked)}
                    className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {isSubmitting ? 'Saving...' : 'Launch DeadlineZero Co-Pilot'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, CheckSquare, Calendar, MessageSquareCode, LogOut, ShieldCheck, Sparkles, Bell } from 'lucide-react';
import { CoPilotSimulatorModal } from '@/components/ai/CoPilotSimulatorModal';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, loading, needsOnboarding, logout } = useAuth();
  const [isSimulatorOpen, setIsSimulatorOpen] = React.useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (needsOnboarding) {
        router.push('/login');
      }
    }
  }, [user, loading, needsOnboarding, router]);

  if (loading || !user || !profile) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-mono text-slate-400">Verifying Zero-Trust Session...</p>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasks & Matrix', href: '/tasks', icon: CheckSquare },
    { name: 'AI Schedule Lock', href: '/calendar', icon: Calendar },
    { name: 'Behavior Telemetry', href: '/analytics', icon: Sparkles },
    { name: 'AI Co-Pilot Chat', href: '/chat', icon: MessageSquareCode },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#111118] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between shrink-0 p-4 sticky top-0 z-40 h-auto md:h-screen">
        <div className="space-y-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 px-2">
            <Image
              src="/logo.png"
              alt="DeadlineZero Logo"
              width={36}
              height={36}
              className="rounded-xl shadow-lg shadow-indigo-600/30"
            />
            <div>
              <h1 className="font-bold text-sm text-white tracking-wide font-display">DeadlineZero</h1>
              <p className="text-[10px] text-indigo-400 font-mono flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> AI Deadline Co-Pilot
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Persona & Logout Footer */}
        <div className="pt-4 border-t border-white/5 space-y-3 mt-6 md:mt-0">
          <div className="p-3 rounded-xl bg-[#16161F] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-xs shrink-0 uppercase">
                {profile.name[0]}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-semibold text-white truncate">{profile.name}</h4>
                <p className="text-[10px] text-slate-400 font-mono capitalize">{profile.role} Persona</p>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto min-h-screen relative">
        {children}

        {/* Floating Nano Banana Mascot Orb Widget */}
        <button
          onClick={() => setIsSimulatorOpen(true)}
          className="fixed bottom-6 right-6 group flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-600/90 to-purple-600/90 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/40 shadow-[0_5px_25px_rgba(99,102,241,0.4)] text-white z-40 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          title="Launch Nano Banana Interactive Simulator"
        >
          <div className="relative">
            <Image src="/logo.png" alt="DZ Mascot" width={28} height={28} className="rounded-xl group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="font-mono text-xs font-bold tracking-wider uppercase">DZ Co-Pilot ⚡</span>
        </button>
      </main>

      <CoPilotSimulatorModal isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} userName={profile?.name || 'Krish'} />
    </div>
  );
}

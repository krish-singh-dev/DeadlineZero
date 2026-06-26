'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, CheckSquare, Calendar, MessageSquareCode, LogOut, Sparkles } from 'lucide-react';
import { CoPilotSimulatorModal } from '@/components/ai/CoPilotSimulatorModal';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, loading, needsOnboarding, logout } = useAuth();
  const [isSimulatorOpen, setIsSimulatorOpen] = React.useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || needsOnboarding) {
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
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Schedule', href: '/calendar', icon: Calendar },
    { name: 'Telemetry', href: '/analytics', icon: Sparkles },
    { name: 'Chat', href: '/chat', icon: MessageSquareCode },
  ];

  const isChatPage = pathname?.includes('/chat');
  const orbPositionClass = isChatPage ? 'top-16 right-4 md:top-6 md:right-6' : 'bottom-20 md:bottom-6 right-4 md:right-6';

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 flex flex-col md:flex-row pb-16 md:pb-0">
      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-[#111118]/95 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="DeadlineZero Logo" width={28} height={28} className="rounded-lg shadow-md" />
          <span className="font-bold text-sm tracking-wide font-display text-white">DeadlineZero</span>
        </div>
        <button onClick={logout} className="p-2 text-slate-400 hover:text-red-400 transition-colors" title="Sign Out">
          <LogOut className="w-4 h-4" />
        </button>
      </header>

      {/* Desktop Vertical Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#111118] border-r border-white/5 flex-col justify-between shrink-0 p-4 sticky top-0 z-40 h-screen">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Image src="/logo.png" alt="DeadlineZero Logo" width={36} height={36} className="rounded-xl shadow-lg shadow-indigo-600/30" />
            <div>
              <h1 className="font-bold text-sm text-white tracking-wide font-display">DeadlineZero</h1>
              <p className="text-[10px] text-indigo-400 font-mono flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> AI Deadline Co-Pilot
              </p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-white/5 space-y-3">
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

          <button onClick={logout} className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 text-xs font-medium flex items-center justify-center gap-2 transition-colors">
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-x-hidden min-h-screen relative">
        {children}

        {/* Dynamic Route-Aware Floating Nano Banana Orb Widget */}
        <button
          type="button"
          onClick={() => setIsSimulatorOpen(true)}
          className={`fixed ${orbPositionClass} group flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-full bg-gradient-to-r from-indigo-600/90 to-purple-600/90 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/40 shadow-[0_5px_25px_rgba(99,102,241,0.4)] text-white z-40 backdrop-blur-md transition-all active:scale-95`}
          title="Launch Nano Banana Interactive Simulator"
        >
          <div className="relative shrink-0">
            <Image src="/logo.png" alt="DZ Mascot" width={24} height={24} className="rounded-lg group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="font-mono text-[11px] font-bold tracking-wider uppercase whitespace-nowrap">Co-Pilot ⚡</span>
        </button>
      </main>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#111118]/95 backdrop-blur-md border-t border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                isActive ? 'text-indigo-400 font-bold scale-105' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-mono tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <CoPilotSimulatorModal isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} userName={profile?.name || 'Krish'} />
    </div>
  );
}

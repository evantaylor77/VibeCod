'use client';

import { useState } from 'react';
import { Sparkles, Bell, Settings, UserCircle2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RefactoringPage from '@/components/RefactoringPage';
import SecurityPage from '@/components/SecurityPage';
import MCPPage from '@/components/MCPPage';
import type { Tab } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('refactoring');

  return (
    <div className="flex min-h-screen text-[#2f3b2f]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="relative flex-1 min-w-0 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-120px] right-[-100px] h-72 w-72 rounded-full bg-[#0f766e]/20 blur-3xl" />
          <div className="absolute bottom-[-120px] left-[-100px] h-72 w-72 rounded-full bg-[#ea580c]/20 blur-3xl" />
        </div>

        <header className="glass-panel sticky top-0 z-20 mx-4 mt-4 flex h-20 items-center justify-between rounded-2xl px-5 md:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f766e] to-[#ea580c] text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold">VibeCod Studio</h1>
              <p className="text-xs text-[#556255]">Focused workflow for refactor, security and MCP</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button className="rounded-xl border border-[#d1d9c4] bg-white px-3 py-2 text-xs font-medium text-[#556255] transition hover:border-[#0f766e]/40 hover:text-[#1f2a1f] md:px-4 md:text-sm">
              Release 1.0.1
            </button>
            <button className="rounded-xl border border-[#d1d9c4] bg-white p-2.5 text-[#556255] transition hover:border-[#0f766e]/40 hover:text-[#0f766e]">
              <Bell className="h-4 w-4" />
            </button>
            <button className="rounded-xl border border-[#d1d9c4] bg-white p-2.5 text-[#556255] transition hover:border-[#0f766e]/40 hover:text-[#0f766e]">
              <Settings className="h-4 w-4" />
            </button>
            <button className="rounded-xl bg-[#1f2a1f] p-2.5 text-white">
              <UserCircle2 className="h-4 w-4" />
            </button>
          </div>
        </header>

        <section className="relative h-[calc(100vh-6.5rem)] overflow-auto p-4 md:p-6">
          <div className="animate-rise mx-auto max-w-6xl">
            {activeTab === 'refactoring' && <RefactoringPage />}
            {activeTab === 'security' && <SecurityPage />}
            {activeTab === 'mcp' && <MCPPage />}
          </div>
        </section>
      </main>
    </div>
  );
}

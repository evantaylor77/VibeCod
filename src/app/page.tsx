'use client';

import { useState } from 'react';
import { Sparkles, Command } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RefactoringPage from '@/components/RefactoringPage';
import SecurityPage from '@/components/SecurityPage';
import MCPPage from '@/components/MCPPage';
import type { Tab } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('refactoring');

  return (
    <div className="flex h-screen bg-[#0d0d12] text-[#f8fafc] overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Modern Header */}
        <header className="h-16 border-b border-white/[0.06] bg-[#0d0d12]/80 backdrop-blur-xl flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] shadow-lg shadow-indigo-500/20">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-xl blur opacity-20"></div>
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight">VibeCod</h1>
              <p className="text-[10px] text-[#64748b] -mt-0.5">AI-Powered Development</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-[#94a3b8] hover:bg-white/[0.06] hover:text-[#f8fafc] transition-all">
              <Command className="h-3 w-3" />
              <span>Quick actions</span>
              <kbd className="ml-1 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono">⌘K</kbd>
            </button>
            <span className="text-xs text-[#64748b] font-medium">v1.0.0</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto animate-fade-in">
            {activeTab === 'refactoring' && <RefactoringPage />}
            {activeTab === 'security' && <SecurityPage />}
            {activeTab === 'mcp' && <MCPPage />}
          </div>
        </div>
      </main>
    </div>
  );
}

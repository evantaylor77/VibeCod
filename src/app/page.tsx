'use client';

import { useState } from 'react';
import { Sparkles, Command, Bell, Settings, User } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RefactoringPage from '@/components/RefactoringPage';
import SecurityPage from '@/components/SecurityPage';
import MCPPage from '@/components/MCPPage';
import type { Tab } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('refactoring');

  return (
    <div className="flex h-screen bg-[#050508] text-[#f1f5f9] overflow-hidden relative">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#06b6d4]/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#ec4899]/5 rounded-full blur-[100px]" />
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" 
           style={{ 
             backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
             backgroundSize: '60px 60px'
           }} 
      />
      
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="relative flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Modern Header */}
        <header className="relative h-20 border-b border-white/[0.04] bg-[#050508]/70 backdrop-blur-2xl flex items-center justify-between px-8 shrink-0 z-20">
          {/* Header Gradient Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8b5cf6]/30 to-transparent" />
          
          <div className="flex items-center gap-4">
            {/* Logo Section */}
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b5cf6] via-[#6366f1] to-[#06b6d4] shadow-[0_0_40px_rgba(139,92,246,0.4)] animate-gradient">
                    <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-xl blur-lg opacity-50" />
                </div>
                <div>
                  <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-[#f1f5f9] to-[#a1a1aa] bg-clip-text text-transparent">
                    VibeCod
                  </h1>
                  <p className="text-[10px] text-[#52525b] font-medium tracking-wider -mt-0.5">AI DEVELOPMENT STUDIO</p>
                </div>
              </div>
            </div>
            
            {/* Divider */}
            <div className="h-10 w-px bg-white/[0.06]" />
            
            {/* Quick Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                </div>
                <span className="text-xs text-[#71717a] font-medium">System Ready</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Quick Actions Button */}
            <button className="group relative flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.06] hover:border-[#8b5cf6]/30 transition-all duration-300">
              <Command className="h-4 w-4 text-[#71717a] group-hover:text-[#a1a1aa] transition-colors" />
              <span className="text-sm text-[#71717a] group-hover:text-[#a1a1aa] font-medium transition-colors">Quick Actions</span>
              <kbd className="ml-1 px-2 py-1 rounded-lg bg-white/[0.06] text-[10px] text-[#52525b] font-mono font-semibold border border-white/[0.04]">⌘K</kbd>
            </button>
            
            {/* Notification */}
            <button className="relative p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.06] hover:border-[#8b5cf6]/30 transition-all duration-300">
              <Bell className="h-4 w-4 text-[#71717a]" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ec4899]" />
            </button>
            
            {/* Settings */}
            <button className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.06] hover:border-[#8b5cf6]/30 transition-all duration-300">
              <Settings className="h-4 w-4 text-[#71717a]" />
            </button>
            
            {/* User Avatar */}
            <button className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] p-0.5 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-300">
              <div className="h-full w-full rounded-lg bg-[#0a0a10] flex items-center justify-center">
                <User className="h-5 w-5 text-[#71717a]" />
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8 relative">
          {/* Gradient Fade at Top */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#050508] to-transparent pointer-events-none" />
          
          {/* Gradient Fade at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="animate-fade-in">
              {activeTab === 'refactoring' && <RefactoringPage />}
              {activeTab === 'security' && <SecurityPage />}
              {activeTab === 'mcp' && <MCPPage />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

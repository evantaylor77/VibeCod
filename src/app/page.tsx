'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RefactoringPage from '@/components/RefactoringPage';
import SecurityPage from '@/components/SecurityPage';
import MCPPage from '@/components/MCPPage';
import type { Tab } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('refactoring');

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-[#2a2a3a] bg-[#12121a] flex items-center px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">VibeCod</h1>
            </div>
          </div>
          <div className="ml-auto">
            <span className="text-xs text-[#a0a0b0]">v1.0.0</span>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'refactoring' && <RefactoringPage />}
          {activeTab === 'security' && <SecurityPage />}
          {activeTab === 'mcp' && <MCPPage />}
        </div>
      </main>
    </div>
  );
}

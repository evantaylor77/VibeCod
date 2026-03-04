'use client';

import { useState } from 'react';
import { Sparkles, Shield, Zap, GitBranch, Settings, FileCode } from 'lucide-react';

type Tab = 'refactoring' | 'mcp' | 'security' | 'tools' | 'ai' | 'settings';

const tabs = [
  { id: 'refactoring' as Tab, label: 'Refactoring', icon: GitBranch },
  { id: 'mcp' as Tab, label: 'One-Click MCP', icon: Zap },
  { id: 'security' as Tab, label: 'Project Security', icon: Shield },
  { id: 'tools' as Tab, label: 'Tools', icon: FileCode },
  { id: 'ai' as Tab, label: 'AI', icon: Sparkles },
  { id: 'settings' as Tab, label: 'Settings', icon: Settings },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('refactoring');

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="border-b border-[#2a2a3a] bg-[#12121a]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">VibeCod</h1>
              <p className="text-xs text-[#a0a0b0]">AI-Powered Development</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#1a1a25] px-3 py-1.5 text-xs text-[#a0a0b0]">
              v1.0.0
            </span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-[#2a2a3a] bg-[#12121a]">
        <div className="flex px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-[#a0a0b0] hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content Area */}
      <main className="p-6">
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-8">
          {activeTab === 'refactoring' && <RefactoringTab />}
          {activeTab === 'mcp' && <MCPTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'tools' && <ToolsTab />}
          {activeTab === 'ai' && <AITab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}

function RefactoringTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Refactoring</h2>
        <p className="mt-1 text-[#a0a0b0]">Kod yapınızı otomatik olarak iyileştirin ve yeniden düzenleyin.</p>
      </div>
      <div className="rounded-lg border border-dashed border-[#2a2a3a] p-12 text-center">
        <GitBranch className="mx-auto h-12 w-12 text-[#2a2a3a]" />
        <p className="mt-4 text-[#a0a0b0]">Bu özellik yakında eklenecek...</p>
      </div>
    </div>
  );
}

function MCPTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">One-Click MCP</h2>
        <p className="mt-1 text-[#a0a0b0]">MCP sunucularını tek tıklamayla kurun ve yönetin.</p>
      </div>
      <div className="rounded-lg border border-dashed border-[#2a2a3a] p-12 text-center">
        <Zap className="mx-auto h-12 w-12 text-[#2a2a3a]" />
        <p className="mt-4 text-[#a0a0b0]">Bu özellik yakında eklenecek...</p>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Project Security</h2>
        <p className="mt-1 text-[#a0a0b0]">Projenizin güvenliğini analiz edin ve zafiyetleri tespit edin.</p>
      </div>
      <div className="rounded-lg border border-dashed border-[#2a2a3a] p-12 text-center">
        <Shield className="mx-auto h-12 w-12 text-[#2a2a3a]" />
        <p className="mt-4 text-[#a0a0b0]">Bu özellik yakında eklenecek...</p>
      </div>
    </div>
  );
}

function ToolsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Tools</h2>
        <p className="mt-1 text-[#a0a0b0]">Geliştirme araçlarını keşfedin ve kullanın.</p>
      </div>
      <div className="rounded-lg border border-dashed border-[#2a2a3a] p-12 text-center">
        <FileCode className="mx-auto h-12 w-12 text-[#2a2a3a]" />
        <p className="mt-4 text-[#a0a0b0]">Bu özellik yakında eklenecek...</p>
      </div>
    </div>
  );
}

function AITab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">AI</h2>
        <p className="mt-1 text-[#a0a0b0]">AI destekli kod tamamlama ve öneriler.</p>
      </div>
      <div className="rounded-lg border border-dashed border-[#2a2a3a] p-12 text-center">
        <Sparkles className="mx-auto h-12 w-12 text-[#2a2a3a]" />
        <p className="mt-4 text-[#a0a0b0]">Bu özellik yakında eklenecek...</p>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="mt-1 text-[#a0a0b0]">Uygulama ayarlarını yapılandırın.</p>
      </div>
      <div className="rounded-lg border border-dashed border-[#2a2a3a] p-12 text-center">
        <Settings className="mx-auto h-12 w-12 text-[#2a2a3a]" />
        <p className="mt-4 text-[#a0a0b0]">Bu özellik yakında eklenecek...</p>
      </div>
    </div>
  );
}

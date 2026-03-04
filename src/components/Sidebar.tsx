'use client';

import { tabs, type Tab } from '@/types';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="glass-panel m-4 hidden w-[220px] shrink-0 rounded-2xl border border-white/90 p-4 md:block">
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-[#0f766e] to-[#ea580c] p-4 text-white shadow-lg">
        <p className="text-xs uppercase tracking-[0.18em] text-white/80">Workspace</p>
        <p className="mt-1 text-lg font-bold">VibeCod</p>
      </div>

      <nav className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
                isActive
                  ? 'border-[#0f766e]/30 bg-[#0f766e]/10 text-[#1f2a1f]'
                  : 'border-transparent text-[#556255] hover:border-[#d1d9c4] hover:bg-white'
              }`}
              title={tab.label}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  isActive ? 'bg-[#0f766e] text-white' : 'bg-[#e8eddc] text-[#556255]'
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="ribbon mt-6 rounded-xl border border-[#d1d9c4] p-3 text-xs text-[#334155]">
        <p className="font-semibold">Agent Status</p>
        <p className="mt-1">Online and ready for local analysis.</p>
      </div>
    </aside>
  );
}

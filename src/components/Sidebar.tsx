'use client';

import { tabs, type Tab } from '@/types';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-20 bg-[#15151c] border-r border-white/[0.06] flex flex-col items-center py-6 shrink-0">
      {/* Logo */}
      <div className="mb-8">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <span className="text-white font-bold text-lg">V</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="group relative flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl transition-all duration-200"
              title={tab.label}
            >
              {/* Active background */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20 rounded-2xl border border-[#6366f1]/30" />
              )}
              
              {/* Hover background */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-200 ${
                !isActive && 'bg-white/[0.04] opacity-0 group-hover:opacity-100'
              }`} />
              
              {/* Icon container */}
              <div className={`relative z-10 p-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white shadow-lg shadow-indigo-500/30' 
                  : 'text-[#64748b] group-hover:text-[#94a3b8]'
              }`}>
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2 : 1.5} />
              </div>
              
              {/* Label */}
              <span className={`relative z-10 text-[9px] font-medium transition-colors ${
                isActive ? 'text-[#6366f1]' : 'text-[#64748b] group-hover:text-[#94a3b8]'
              }`}>
                {tab.shortLabel || tab.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-gradient-to-b from-[#6366f1] to-[#8b5cf6]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto pt-4 border-t border-white/[0.06] w-full px-4">
        <div className="flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
        </div>
      </div>
    </aside>
  );
}

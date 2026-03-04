'use client';

import { tabs, type Tab } from '@/types';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="relative w-20 bg-[#050508]/80 backdrop-blur-2xl border-r border-white/[0.04] flex flex-col items-center py-6 shrink-0 overflow-hidden">
      {/* Ambient Glow Effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#8b5cf6]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#06b6d4]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Logo */}
      <div className="relative z-10 mb-8">
        <div className="relative">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#8b5cf6] via-[#6366f1] to-[#06b6d4] flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)] animate-gradient">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-2xl blur-xl opacity-40" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 flex flex-col gap-3 w-full px-3">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="group relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300"
              title={tab.label}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Active Background Glow */}
              {isActive && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/25 via-[#6366f1]/20 to-[#06b6d4]/15 rounded-2xl" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] opacity-0 blur-md transition-opacity duration-300" />
                </>
              )}

              {/* Hover Background */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                !isActive && 'bg-white/[0.03] opacity-0 group-hover:opacity-100'
              }`} />

              {/* Icon Container */}
              <div className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] text-white shadow-[0_0_30px_rgba(139,92,246,0.5)]'
                  : 'text-[#52525b] group-hover:text-[#a1a1aa]'
              }`}>
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 1.5} />
              </div>

              {/* Label */}
              <span className={`relative text-[9px] font-semibold tracking-wide transition-colors ${
                isActive
                  ? 'text-[#8b5cf6]'
                  : 'text-[#52525b] group-hover:text-[#71717a]'
              }`}>
                {tab.shortLabel || tab.label}
              </span>

              {/* Active Indicator - Animated Line */}
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-full bg-gradient-to-b from-[#8b5cf6] via-[#6366f1] to-[#06b6d4] shadow-[0_0_20px_rgba(139,92,246,0.6)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="relative z-10 mt-auto pt-5 border-t border-white/[0.04] w-full px-4">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.6)] animate-pulse" />
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping opacity-75" />
          </div>
        </div>
        <p className="text-[8px] text-[#52525b] text-center mt-2 font-medium tracking-wider">ONLINE</p>
      </div>
    </aside>
  );
}

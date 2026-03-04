'use client';

import { Tab, tabs } from '@/app/page';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#12121a] border-r border-[#2a2a3a] flex flex-col">
      <div className="p-4 border-b border-[#2a2a3a]">
        <h2 className="text-xs font-semibold text-[#a0a0b0] uppercase tracking-wider">
          Features
        </h2>
      </div>
      
      <nav className="flex-1 p-3 space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                  : 'text-[#a0a0b0] hover:bg-[#1a1a25] hover:text-white'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#606070]'}`} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#2a2a3a]">
        <div className="rounded-lg bg-[#1a1a25] p-3">
          <p className="text-xs text-[#606070]">
            VibeCod v1.0.0
          </p>
          <p className="text-xs text-[#505060] mt-1">
            AI-Powered Dev
          </p>
        </div>
      </div>
    </aside>
  );
}

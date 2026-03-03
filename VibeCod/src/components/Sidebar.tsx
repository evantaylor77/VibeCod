'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { AppTab } from '@/types';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderKanban,
  Server,
  Brain,
  Code2,
  Wand2,
  Wrench,
  Settings,
  Zap,
  PanelLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NavItem {
  id: AppTab;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'mcp', label: 'MCP Servers', icon: Server },
  { id: 'ai', label: 'AI Models', icon: Brain },
  { id: 'snippets', label: 'Snippets', icon: Code2 },
  { id: 'refactoring', label: 'Refactoring', icon: Wand2 },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const { 
    activeTab, 
    setActiveTab, 
    sidebarCollapsed, 
    toggleSidebar,
    getInstalledCount,
    projects,
    snippets 
  } = useAppStore();

  const getBadge = (id: AppTab): number | undefined => {
    switch (id) {
      case 'mcp':
        return getInstalledCount() || undefined;
      case 'projects':
        return projects.length || undefined;
      case 'snippets':
        return snippets.length || undefined;
      default:
        return undefined;
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col border-r border-border/50 bg-card/50 backdrop-blur-xl"
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/50">
        <motion.div 
          className="flex items-center gap-3"
          animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-gradient">VibeCod</h1>
              <p className="text-[10px] text-muted-foreground">v1.0.0</p>
            </div>
          )}
        </motion.div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 shrink-0"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const badge = getBadge(item.id);

          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'nav-item w-full relative group',
                isActive && 'active'
              )}
            >
              <Icon className={cn(
                'h-5 w-5 shrink-0 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
              )} />
              
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {badge !== undefined && badge > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary/20 px-1.5 text-[10px] font-bold text-primary">
                      {badge > 99 ? '99+' : badge}
                    </span>
                  )}
                </>
              )}

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Tooltip for collapsed state */}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 rounded-md bg-popover border border-border text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {item.label}
                  {badge !== undefined && badge > 0 && (
                    <span className="ml-2 text-primary">({badge})</span>
                  )}
                </div>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-border/50">
        <div className={cn(
          'glass-card p-3',
          sidebarCollapsed && 'p-2'
        )}>
          {!sidebarCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="status-dot online" />
                <span className="text-xs text-muted-foreground">System Ready</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary to-primary/70" />
              </div>
              <p className="text-[10px] text-muted-foreground">
                {getInstalledCount()} MCP servers installed
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="status-dot online" />
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

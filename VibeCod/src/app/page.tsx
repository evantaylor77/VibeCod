'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Sidebar } from '@/components/Sidebar';
import { DashboardPage } from '@/components/DashboardPage';
import { ProjectsPage } from '@/components/ProjectsPage';
import { MCPPage } from '@/components/MCPPage';
import { AIPage } from '@/components/AIPage';
import { SnippetsPage } from '@/components/SnippetsPage';
import { ToolsPage } from '@/components/ToolsPage';
import { SettingsPage } from '@/components/SettingsPage';
import { Zap } from 'lucide-react';

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-background"
  >
    <div className="flex flex-col items-center gap-6">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-2xl">
          <Zap className="h-10 w-10 text-primary-foreground" />
        </div>
      </motion.div>
      <div className="space-y-2 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-gradient"
        >
          VibeCod
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground"
        >
          Loading your workspace...
        </motion.p>
      </div>
    </div>
  </motion.div>
);

const pageComponents = {
  dashboard: DashboardPage,
  projects: ProjectsPage,
  mcp: MCPPage,
  ai: AIPage,
  snippets: SnippetsPage,
  tools: ToolsPage,
  settings: SettingsPage,
};

export default function Home() {
  const { activeTab, detectInstalledIDEs } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    const init = async () => {
      await detectInstalledIDEs();
      setTimeout(() => setIsLoading(false), 1000);
    };
    
    init();
  }, [detectInstalledIDEs]);

  const CurrentPage = pageComponents[activeTab] || DashboardPage;

  if (!mounted) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Title Bar */}
        <div className="titlebar-drag h-10 flex items-center px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="titlebar-no-drag flex items-center gap-2 text-xs text-muted-foreground">
            <div className="status-dot online" />
            <span className="capitalize">{activeTab}</span>
            <span className="text-border">/</span>
            <span>VibeCod</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-auto custom-scrollbar"
            >
              <CurrentPage />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

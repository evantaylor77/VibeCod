'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { IDE_TOOLS } from '@/data/ideTools';
import { cn } from '@/lib/utils';
import {
  Settings,
  Monitor,
  CheckCircle,
  FolderOpen,
  RefreshCw,
  ExternalLink,
  Info,
  Zap,
} from 'lucide-react';

export function SettingsPage() {
  const {
    selectedIDEs,
    toggleIDE,
    detectedIDEs,
    installedServers,
  } = useAppStore();

  const [activeSection, setActiveSection] = useState<'ide' | 'about'>('ide');
  const [generating, setGenerating] = useState<string | null>(null);

  const handleGenerateAll = async () => {
    if (typeof window === 'undefined' || !(window as any).electronAPI) return;
    
    const api = (window as any).electronAPI;
    const servers = Object.values(installedServers);
    
    if (servers.length === 0) return;

    for (const ide of selectedIDEs) {
      setGenerating(ide);
      try {
        await api.generateConfig(ide, servers);
      } catch (e) {
        console.error(`Failed to generate config for ${ide}:`, e);
      }
      await new Promise(r => setTimeout(r, 500));
    }
    setGenerating(null);
  };

  const openExternal = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).electronAPI) {
      (window as any).electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 border-r border-border/50 p-4">
        <nav className="space-y-1">
          <button
            onClick={() => setActiveSection('ide')}
            className={cn(
              'nav-item w-full',
              activeSection === 'ide' && 'active'
            )}
          >
            <Monitor className="h-4 w-4" />
            IDE Integration
          </button>
          <button
            onClick={() => setActiveSection('about')}
            className={cn(
              'nav-item w-full',
              activeSection === 'about' && 'active'
            )}
          >
            <Info className="h-4 w-4" />
            About
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-auto">
        {activeSection === 'ide' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">IDE Integration</h1>
              <p className="text-muted-foreground">
                Configure MCP servers for your code editors
              </p>
            </div>

            {/* IDE List */}
            <div className="space-y-3">
              {IDE_TOOLS.map((ide) => {
                const isSelected = selectedIDEs.includes(ide.id);
                const isDetected = detectedIDEs.includes(ide.id);
                const isGenerating = generating === ide.id;

                return (
                  <motion.div
                    key={ide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      'glass-card p-4 flex items-center gap-4',
                      isSelected && 'border-primary/50'
                    )}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleIDE(ide.id)}
                      className={cn(
                        'flex h-5 w-5 items-center justify-center rounded border transition-colors',
                        isSelected
                          ? 'bg-primary border-primary'
                          : 'border-border hover:border-primary'
                      )}
                    >
                      {isSelected && <CheckCircle className="h-3 w-3 text-primary-foreground" />}
                    </button>

                    {/* Icon */}
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${ide.color}20` }}
                    >
                      <Monitor className="h-5 w-5" style={{ color: ide.color }} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{ide.name}</h3>
                        {isDetected && (
                          <span className="tag tag-green text-[10px]">Detected</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{ide.description}</p>
                      <code className="text-[10px] text-muted-foreground font-mono">
                        {ide.configFile}
                      </code>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openExternal(ide.docsUrl)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Generate Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleGenerateAll}
                disabled={selectedIDEs.length === 0 || Object.keys(installedServers).length === 0 || !!generating}
              >
                {generating ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Settings className="mr-2 h-4 w-4" />
                )}
                Update All Selected
              </Button>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <h1 className="text-2xl font-bold">About VibeCod</h1>
              <p className="text-muted-foreground">
                Ultimate vibe coding assistant
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
                  <Zap className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gradient">VibeCod</h2>
                  <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                VibeCod is a powerful desktop application for managing MCP servers,
                AI models, and code projects. Built for developers who want to
                maximize their productivity.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="text-xs text-muted-foreground">Framework</div>
                  <div className="font-medium">Electron + Next.js</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="text-xs text-muted-foreground">UI</div>
                  <div className="font-medium">Tailwind CSS</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="text-xs text-muted-foreground">State</div>
                  <div className="font-medium">Zustand</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="text-xs text-muted-foreground">Platform</div>
                  <div className="font-medium">Windows x64</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => openExternal('https://modelcontextprotocol.io')}>
                <ExternalLink className="mr-2 h-4 w-4" />
                MCP Docs
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

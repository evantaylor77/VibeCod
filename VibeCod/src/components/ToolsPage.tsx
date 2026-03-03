'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import {
  Wrench,
  Terminal,
  CheckCircle,
  XCircle,
  RefreshCw,
  ExternalLink,
  Cpu,
  Zap,
} from 'lucide-react';

interface ToolStatus {
  name: string;
  command: string;
  available: boolean | null;
  description: string;
  installUrl: string;
}

const tools: ToolStatus[] = [
  { name: 'Node.js / npm', command: 'npm', available: null, description: 'Required for npm-based MCP servers', installUrl: 'https://nodejs.org' },
  { name: 'npx', command: 'npx', available: null, description: 'Required for running npm packages', installUrl: 'https://nodejs.org' },
  { name: 'Python / pip', command: 'pip', available: null, description: 'Required for Python-based MCP servers', installUrl: 'https://python.org' },
  { name: 'uv / uvx', command: 'uvx', available: null, description: 'Fast Python package runner', installUrl: 'https://docs.astral.sh/uv/' },
  { name: 'Go', command: 'go', available: null, description: 'Required for Go-based MCP servers', installUrl: 'https://go.dev' },
  { name: 'Docker', command: 'docker', available: null, description: 'Required for Docker-based MCP servers', installUrl: 'https://docker.com' },
];

export function ToolsPage() {
  const [toolStatuses, setToolStatuses] = useState<ToolStatus[]>(tools);
  const [checking, setChecking] = useState(false);

  const checkTools = async () => {
    setChecking(true);
    
    if (typeof window !== 'undefined' && (window as any).electronAPI) {
      const api = (window as any).electronAPI;
      const updated = await Promise.all(
        toolStatuses.map(async (tool) => ({
          ...tool,
          available: await api.checkCommand(tool.command)
        }))
      );
      setToolStatuses(updated);
    } else {
      setTimeout(() => {
        setToolStatuses(prev => prev.map(tool => ({
          ...tool,
          available: ['npm', 'npx'].includes(tool.command)
        })));
      }, 800);
    }
    
    setChecking(false);
  };

  useEffect(() => {
    checkTools();
  }, []);

  const openExternal = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).electronAPI) {
      (window as any).electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">System Tools</h1>
          <p className="text-muted-foreground">
            Check required tools for vibe coding
          </p>
        </div>
        <Button
          variant="outline"
          onClick={checkTools}
          disabled={checking}
        >
          {checking ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Recheck
        </Button>
      </div>

      {/* Tools List */}
      <div className="space-y-3">
        {toolStatuses.map((tool) => (
          <motion.div
            key={tool.command}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'glass-card p-4 flex items-center gap-4',
              tool.available === true && 'border-green-500/30 bg-green-500/5',
              tool.available === false && 'border-red-500/30 bg-red-500/5'
            )}
          >
            {/* Icon */}
            <div className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg',
              tool.available === true && 'bg-green-500/20',
              tool.available === false && 'bg-red-500/20',
              tool.available === null && 'bg-secondary'
            )}>
              <Terminal className={cn(
                'h-5 w-5',
                tool.available === true && 'text-green-500',
                tool.available === false && 'text-red-500',
                tool.available === null && 'text-muted-foreground'
              )} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-foreground">{tool.name}</h3>
                <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">{tool.command}</code>
              </div>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              {tool.available === null && checking && (
                <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
              {tool.available === true && (
                <div className="flex items-center gap-1 text-green-500 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>Available</span>
                </div>
              )}
              {tool.available === false && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>Not found</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openExternal(tool.installUrl)}
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Install
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="justify-start h-auto py-4">
            <Cpu className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">System Info</div>
              <div className="text-xs text-muted-foreground">View system specifications</div>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-4">
            <Zap className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Performance</div>
              <div className="text-xs text-muted-foreground">Check system performance</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

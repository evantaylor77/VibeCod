import { GitBranch, Shield, Zap } from 'lucide-react';

export type Tab = 'refactoring' | 'security' | 'mcp';

export const tabs = [
  { id: 'refactoring' as Tab, label: 'Refactoring', shortLabel: 'Refactor', icon: GitBranch },
  { id: 'security' as Tab, label: 'Project Security', shortLabel: 'Security', icon: Shield },
  { id: 'mcp' as Tab, label: 'One-Click MCP', shortLabel: 'MCP', icon: Zap },
];

import { GitBranch, Shield, Zap } from 'lucide-react';

export type Tab = 'refactoring' | 'security' | 'mcp';

export const tabs = [
  { id: 'refactoring' as Tab, label: 'Refactoring', icon: GitBranch },
  { id: 'security' as Tab, label: 'Project Security', icon: Shield },
  { id: 'mcp' as Tab, label: 'One-Click MCP', icon: Zap },
];

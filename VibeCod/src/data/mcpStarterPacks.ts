export interface MCPStarterPack {
  id: string;
  name: string;
  description: string;
  serverIds: string[];
}

export const mcpStarterPacks: MCPStarterPack[] = [
  {
    id: 'frontend-vibecoder',
    name: 'Frontend Vibecoder Pack',
    description: 'Web scraping, browser automation, git and memory tools for UI workflows.',
    serverIds: ['fetch', 'puppeteer', 'github', 'filesystem', 'memory', 'git'],
  },
  {
    id: 'backend-api',
    name: 'Backend API Pack',
    description: 'Database, API, and repo management for backend-heavy projects.',
    serverIds: ['postgres', 'sqlite', 'github', 'filesystem', 'git', 'time'],
  },
  {
    id: 'research-automation',
    name: 'Research Automation Pack',
    description: 'Search, note-taking, and structured thinking tools for deep research.',
    serverIds: ['brave-search', 'fetch', 'notion', 'memory', 'sequential-thinking'],
  },
];

export type InstallType = 'npm' | 'pip' | 'go' | 'uvx' | 'manual';

export type ServerTag =
  | 'Node.js'
  | 'Python'
  | 'Go'
  | 'Rust'
  | 'Docker'
  | 'AI'
  | 'Database'
  | 'Files'
  | 'Web'
  | 'DevTools'
  | 'Cloud'
  | 'Security'
  | 'Productivity'
  | 'Communication';

export interface EnvVarDefinition {
  key: string;
  description: string;
  required: boolean;
  default?: string;
  secret?: boolean;
}

export interface MCPServer {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  tags: ServerTag[];
  installType: InstallType;
  packageName: string;
  command: string;
  args: string[];
  envVars?: Record<string, string>;
  requiredEnvVars?: EnvVarDefinition[];
  installCount: number;
  author?: string;
  homepage?: string;
  repository?: string;
  version?: string;
  isCustom?: boolean;
  installed?: boolean;
  installedAt?: string;
}

export interface InstalledServer extends MCPServer {
  installed: true;
  installedAt: string;
  envVars: Record<string, string>;
}

export type IDEType = 'cursor' | 'vscode' | 'windsurf' | 'claudecode' | 'zed' | 'continue' | 'cline' | 'kilocode';

export interface IDEConfig {
  id: IDEType;
  name: string;
  description: string;
  configPath: string;
  icon: string;
}

export interface InstallProgress {
  serverName: string;
  output: string;
  status: 'installing' | 'success' | 'error';
  progress: number;
}

export type AIModelProvider = 'openai' | 'anthropic' | 'google' | 'ollama' | 'custom';

export interface AIModel {
  id: string;
  name: string;
  provider: AIModelProvider;
  description: string;
  maxTokens: number;
  supportsVision: boolean;
  supportsTools: boolean;
  contextWindow: number;
}

export interface AIConfig {
  provider: AIModelProvider;
  model: string;
  apiKey?: string;
  baseUrl?: string;
  temperature: number;
  maxTokens: number;
}

export interface CodeSnippet {
  id: string;
  name: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  path: string;
  techStack: string[];
  createdAt: string;
  updatedAt: string;
  lastOpened: string;
  settings?: ProjectSettings;
}

export interface ProjectSettings {
  ide?: IDEType;
  mcpServers: string[];
  aiModel?: string;
  customPrompts?: string[];
}

export type AppTab = 'dashboard' | 'projects' | 'mcp' | 'ai' | 'snippets' | 'refactoring' | 'tools' | 'settings';

export interface AppState {
  activeTab: AppTab;
  sidebarCollapsed: boolean;
  theme: 'dark' | 'light' | 'system';
}

export interface CommandResult {
  success: boolean;
  output?: string;
  error?: string;
}

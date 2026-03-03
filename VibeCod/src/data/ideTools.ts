import { IDEType } from '@/types';

export interface IDEToolInfo {
  id: IDEType;
  name: string;
  description: string;
  configFile: string;
  docsUrl: string;
  logo: string;
  color: string;
}

export const IDE_TOOLS: IDEToolInfo[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI code editor by Anysphere',
    configFile: '%USERPROFILE%\\.cursor\\mcp.json',
    docsUrl: 'https://docs.cursor.com/context/model-context-protocol',
    logo: 'logos/ides/cursor.svg',
    color: '#1a1a1a'
  },
  {
    id: 'vscode',
    name: 'VS Code',
    description: 'Visual Studio Code + GitHub Copilot',
    configFile: '%APPDATA%\\Code\\User\\mcp.json',
    docsUrl: 'https://code.visualstudio.com/docs/copilot/chat/mcp-servers',
    logo: 'logos/ides/vscode.png',
    color: '#007acc'
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    description: 'AI-native editor by Codeium',
    configFile: '%USERPROFILE%\\.codeium\\windsurf\\mcp_config.json',
    docsUrl: 'https://docs.codeium.com/windsurf/mcp',
    logo: 'logos/ides/windsurf.svg',
    color: '#6366f1'
  },
  {
    id: 'claudecode',
    name: 'Claude Code',
    description: "Anthropic's agentic CLI tool",
    configFile: '%USERPROFILE%\\.claude.json',
    docsUrl: 'https://docs.anthropic.com/en/docs/claude-code/mcp',
    logo: 'logos/ides/claudecode.svg',
    color: '#cc785c'
  },
  {
    id: 'zed',
    name: 'Zed',
    description: 'High-performance code editor',
    configFile: '%APPDATA%\\Zed\\settings.json',
    docsUrl: 'https://zed.dev/docs/assistant/model-context-protocol',
    logo: 'logos/ides/zed.svg',
    color: '#6753e8'
  },
  {
    id: 'continue',
    name: 'Continue',
    description: 'Open-source AI assistant',
    configFile: '%USERPROFILE%\\.continue\\mcpServers\\mcpmarket.json',
    docsUrl: 'https://docs.continue.dev/customize/mcp-and-rules',
    logo: 'logos/ides/continue.png',
    color: '#f59e0b'
  },
  {
    id: 'cline',
    name: 'Cline',
    description: 'Autonomous AI coding agent',
    configFile: '%APPDATA%\\Code\\User\\globalStorage\\saoudrizwan.claude-dev\\settings\\cline_mcp_settings.json',
    docsUrl: 'https://github.com/cline/cline/blob/main/docs/mcp/README.md',
    logo: 'logos/ides/cline.png',
    color: '#7c3aed'
  },
  {
    id: 'kilocode',
    name: 'Kilo Code',
    description: 'AI coding assistant extension',
    configFile: '%APPDATA%\\Code\\User\\globalStorage\\kilocode.kilo-code\\settings\\mcp_settings.json',
    docsUrl: 'https://kilocode.ai/docs/mcp',
    logo: 'logos/ides/kilocode.png',
    color: '#d4a82f'
  }
];

export const getIDETool = (id: IDEType): IDEToolInfo | undefined => {
  return IDE_TOOLS.find(tool => tool.id === id);
};

export const getIDEToolColor = (id: IDEType): string => {
  const tool = getIDETool(id);
  return tool?.color || '#666666';
};

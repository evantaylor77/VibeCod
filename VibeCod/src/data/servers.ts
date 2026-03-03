import { MCPServer } from '@/types';

export const mcpServers: MCPServer[] = [
  {
    id: 'filesystem',
    name: 'Filesystem',
    description: 'Read and write files, create directories, and manage your local filesystem with full path control.',
    longDescription: 'The Filesystem MCP server provides comprehensive file system access including reading, writing, creating, and deleting files and directories. Supports glob patterns and recursive operations.',
    tags: ['Node.js', 'Files'],
    installType: 'npm',
    packageName: '@modelcontextprotocol/server-filesystem',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', '%USERPROFILE%'],
    requiredEnvVars: [],
    installCount: 45230,
    author: 'Anthropic',
    homepage: 'https://modelcontextprotocol.io',
    repository: 'https://github.com/modelcontextprotocol/servers',
    version: '0.6.2'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Interact with GitHub repositories, issues, pull requests, and more via the GitHub API.',
    longDescription: 'Full GitHub integration allowing you to manage repositories, create issues, review pull requests, search code, and interact with the GitHub ecosystem.',
    tags: ['Node.js', 'DevTools', 'Web'],
    installType: 'npm',
    packageName: '@modelcontextprotocol/server-github',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-github'],
    requiredEnvVars: [
      { key: 'GITHUB_PERSONAL_ACCESS_TOKEN', description: 'GitHub Personal Access Token with repo permissions', required: true, secret: true }
    ],
    installCount: 38920,
    author: 'Anthropic',
    homepage: 'https://github.com/modelcontextprotocol/servers',
    repository: 'https://github.com/modelcontextprotocol/servers',
    version: '0.6.2'
  },
  {
    id: 'brave-search',
    name: 'Brave Search',
    description: 'Web and local search using Brave Search API with privacy-focused results.',
    longDescription: 'Integrate Brave Search for web searches, news, images, and local business searches. Privacy-focused alternative to Google Search.',
    tags: ['Node.js', 'Web', 'AI'],
    installType: 'npm',
    packageName: '@modelcontextprotocol/server-brave-search',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-brave-search'],
    requiredEnvVars: [
      { key: 'BRAVE_API_KEY', description: 'Brave Search API Key', required: true, secret: true }
    ],
    installCount: 29840,
    author: 'Anthropic',
    homepage: 'https://brave.com/search/api/',
    repository: 'https://github.com/modelcontextprotocol/servers',
    version: '0.6.2'
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    description: 'Connect to PostgreSQL databases, run queries, and explore schemas.',
    longDescription: 'Full PostgreSQL database integration with support for queries, schema exploration, table management, and data analysis.',
    tags: ['Node.js', 'Database'],
    installType: 'npm',
    packageName: '@modelcontextprotocol/server-postgres',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-postgres'],
    requiredEnvVars: [
      { key: 'POSTGRES_CONNECTION_STRING', description: 'PostgreSQL connection string (postgresql://user:pass@host:port/db)', required: true, secret: true }
    ],
    installCount: 22150,
    author: 'Anthropic',
    homepage: 'https://modelcontextprotocol.io',
    repository: 'https://github.com/modelcontextprotocol/servers',
    version: '0.6.2'
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    description: 'Interact with SQLite databases - query, create tables, and analyze data.',
    longDescription: 'SQLite database integration for local database management, data analysis, and schema exploration.',
    tags: ['Node.js', 'Database'],
    installType: 'npm',
    packageName: '@modelcontextprotocol/server-sqlite',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-sqlite', '--db-path', '%USERPROFILE%/database.db'],
    requiredEnvVars: [],
    installCount: 18760,
    author: 'Anthropic',
    homepage: 'https://modelcontextprotocol.io',
    repository: 'https://github.com/modelcontextprotocol/servers',
    version: '0.6.2'
  },
  {
    id: 'puppeteer',
    name: 'Puppeteer',
    description: 'Browser automation and web scraping using Puppeteer with screenshot capabilities.',
    longDescription: 'Control a headless Chrome browser for web scraping, taking screenshots, filling forms, and automating web interactions.',
    tags: ['Node.js', 'Web', 'DevTools'],
    installType: 'npm',
    packageName: '@modelcontextprotocol/server-puppeteer',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-puppeteer'],
    requiredEnvVars: [],
    installCount: 31200,
    author: 'Anthropic',
    homepage: 'https://modelcontextprotocol.io',
    repository: 'https://github.com/modelcontextprotocol/servers',
    version: '0.6.2'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send messages, read channels, and interact with Slack workspaces.',
    longDescription: 'Full Slack integration for reading messages, sending notifications, managing channels, and interacting with your team workspace.',
    tags: ['Node.js', 'Communication'],
    installType: 'npm',
    packageName: '@modelcontextprotocol/server-slack',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-slack'],
    requiredEnvVars: [
      { key: 'SLACK_BOT_TOKEN', description: 'Slack Bot Token (xoxb-...)', required: true, secret: true },
      { key: 'SLACK_TEAM_ID', description: 'Slack Team/Workspace ID', required: true, secret: false }
    ],
    installCount: 15430,
    author: 'Anthropic',
    homepage: 'https://api.slack.com',
    repository: 'https://github.com/modelcontextprotocol/servers',
    version: '0.6.2'
  },
  {
    id: 'google-maps',
    name: 'Google Maps',
    description: 'Search places, get directions, and explore geographic data with Google Maps API.',
    longDescription: 'Integrate Google Maps for location search, directions, place details, geocoding, and geographic data exploration.',
    tags: ['Node.js', 'Web'],
    installType: 'npm',
    packageName: '@modelcontextprotocol/server-google-maps',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-google-maps'],
    requiredEnvVars: [
      { key: 'GOOGLE_MAPS_API_KEY', description: 'Google Maps API Key', required: true, secret: true }
    ],
    installCount: 12890,
    author: 'Anthropic',
    homepage: 'https://developers.google.com/maps',
    repository: 'https://github.com/modelcontextprotocol/servers',
    version: '0.6.2'
  },
  {
    id: 'memory',
    name: 'Memory',
    description: 'Persistent memory storage for AI assistants using a knowledge graph.',
    longDescription: 'Store and retrieve information across conversations using a knowledge graph. Perfect for maintaining context and building long-term memory for AI assistants.',
    tags: ['Node.js', 'AI'],
    installType: 'npm',
    packageName: '@modelcontextprotocol/server-memory',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-memory'],
    requiredEnvVars: [],
    installCount: 27650,
    author: 'Anthropic',
    homepage: 'https://modelcontextprotocol.io',
    repository: 'https://github.com/modelcontextprotocol/servers',
    version: '0.6.2'
  },
  {
    id: 'sequential-thinking',
    name: 'Sequential Thinking',
    description: 'Enhanced reasoning through structured sequential thought processes.',
    longDescription: 'Improve AI reasoning by breaking down complex problems into sequential steps, enabling more structured and reliable problem-solving.',
    tags: ['Node.js', 'AI'],
    installType: 'npm',
    packageName: '@modelcontextprotocol/server-sequential-thinking',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-sequential-thinking'],
    requiredEnvVars: [],
    installCount: 19340,
    author: 'Anthropic',
    homepage: 'https://modelcontextprotocol.io',
    repository: 'https://github.com/modelcontextprotocol/servers',
    version: '0.6.2'
  },
  {
    id: 'fetch',
    name: 'Fetch',
    description: 'Fetch web content, convert HTML to markdown, and extract data from URLs.',
    longDescription: 'Retrieve web pages, convert HTML to readable markdown, extract specific content, and interact with web APIs.',
    tags: ['Node.js', 'Web'],
    installType: 'npm',
    packageName: '@modelcontextprotocol/server-fetch',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-fetch'],
    requiredEnvVars: [],
    installCount: 33780,
    author: 'Anthropic',
    homepage: 'https://modelcontextprotocol.io',
    repository: 'https://github.com/modelcontextprotocol/servers',
    version: '0.6.2'
  },
  {
    id: 'git',
    name: 'Git',
    description: 'Git repository operations - commit, branch, diff, log, and more.',
    longDescription: 'Full Git integration for repository management, viewing history, creating commits, managing branches, and analyzing code changes.',
    tags: ['Python', 'DevTools'],
    installType: 'uvx',
    packageName: 'mcp-server-git',
    command: 'uvx',
    args: ['mcp-server-git', '--repository', '.'],
    requiredEnvVars: [],
    installCount: 28940,
    author: 'Anthropic',
    homepage: 'https://modelcontextprotocol.io',
    repository: 'https://github.com/modelcontextprotocol/servers',
    version: '0.6.2'
  },
  {
    id: 'time',
    name: 'Time',
    description: 'Get current time, convert timezones, and perform date/time calculations.',
    longDescription: 'Time and timezone utilities for getting current time in any timezone, converting between timezones, and performing date arithmetic.',
    tags: ['Python', 'Productivity'],
    installType: 'uvx',
    packageName: 'mcp-server-time',
    command: 'uvx',
    args: ['mcp-server-time'],
    requiredEnvVars: [],
    installCount: 21430,
    author: 'Anthropic',
    homepage: 'https://modelcontextprotocol.io',
    repository: 'https://github.com/modelcontextprotocol/servers',
    version: '0.6.2'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Access OpenAI models, generate images with DALL-E, and use embeddings.',
    longDescription: 'Full OpenAI API integration including GPT models, DALL-E image generation, embeddings, and fine-tuning capabilities.',
    tags: ['Python', 'AI'],
    installType: 'pip',
    packageName: 'mcp-openai',
    command: 'python',
    args: ['-m', 'mcp_openai'],
    requiredEnvVars: [
      { key: 'OPENAI_API_KEY', description: 'OpenAI API Key', required: true, secret: true }
    ],
    installCount: 41200,
    author: 'Community',
    homepage: 'https://openai.com',
    repository: 'https://github.com/pierrebrunelle/mcp-server-openai',
    version: '1.0.0'
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Read and write Notion pages, databases, and blocks.',
    longDescription: 'Full Notion integration for reading and writing pages, managing databases, creating blocks, and organizing your workspace.',
    tags: ['Node.js', 'Productivity'],
    installType: 'npm',
    packageName: '@notionhq/notion-mcp-server',
    command: 'npx',
    args: ['-y', '@notionhq/notion-mcp-server'],
    requiredEnvVars: [
      { key: 'OPENAPI_MCP_HEADERS', description: 'Notion API headers as JSON: {"Authorization": "Bearer ntn_...", "Notion-Version": "2022-06-28"}', required: true, secret: true }
    ],
    installCount: 24560,
    author: 'Notion',
    homepage: 'https://notion.so',
    repository: 'https://github.com/makenotion/notion-mcp-server',
    version: '1.0.0'
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Manage Linear issues, projects, and teams for streamlined project management.',
    longDescription: 'Full Linear integration for creating and managing issues, projects, cycles, and team workflows.',
    tags: ['Node.js', 'Productivity', 'DevTools'],
    installType: 'npm',
    packageName: '@linear/mcp-server',
    command: 'npx',
    args: ['-y', '@linear/mcp-server'],
    requiredEnvVars: [
      { key: 'LINEAR_API_KEY', description: 'Linear API Key', required: true, secret: true }
    ],
    installCount: 11230,
    author: 'Linear',
    homepage: 'https://linear.app',
    repository: 'https://github.com/linear/linear-mcp',
    version: '1.0.0'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Manage Stripe payments, customers, subscriptions, and financial data.',
    longDescription: 'Full Stripe integration for managing payments, customers, subscriptions, invoices, and financial reporting.',
    tags: ['Node.js', 'Web'],
    installType: 'npm',
    packageName: '@stripe/agent-toolkit',
    command: 'npx',
    args: ['-y', '@stripe/agent-toolkit'],
    requiredEnvVars: [
      { key: 'STRIPE_SECRET_KEY', description: 'Stripe Secret Key (sk_...)', required: true, secret: true }
    ],
    installCount: 13450,
    author: 'Stripe',
    homepage: 'https://stripe.com',
    repository: 'https://github.com/stripe/agent-toolkit',
    version: '1.0.0'
  }
];

export const getTagColor = (tag: string): string => {
  const colors: Record<string, string> = {
    'Node.js': 'tag-gold',
    'Python': 'tag-blue',
    'Go': 'tag-blue',
    'Rust': 'tag-purple',
    'Docker': 'tag-blue',
    'AI': 'tag-purple',
    'Database': 'tag-green',
    'Files': 'tag-gold',
    'Web': 'tag-blue',
    'DevTools': 'tag-purple',
    'Cloud': 'tag-blue',
    'Security': 'tag-gold',
    'Productivity': 'tag-green',
    'Communication': 'tag-blue'
  };
  return colors[tag] || 'tag-gold';
};

export const formatInstallCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

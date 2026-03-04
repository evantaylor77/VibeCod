import { Zap, Server, Download, CheckCircle, ExternalLink, Sparkles, Globe, Code, Database, Terminal } from 'lucide-react';

const mcpServers = [
  {
    name: 'GitHub MCP',
    description: 'Full GitHub integration with repos, issues, PRs, and workflows',
    installed: false,
    version: 'v1.2.0',
    downloads: '12K',
    icon: Globe,
    category: 'Development'
  },
  {
    name: 'File System MCP',
    description: 'Complete file system access for reading, writing, and managing files',
    installed: true,
    version: 'v2.0.1',
    downloads: '45K',
    icon: Code,
    category: 'Core'
  },
  {
    name: 'Terminal MCP',
    description: 'Execute terminal commands and manage system processes',
    installed: false,
    version: 'v1.5.0',
    downloads: '28K',
    icon: Terminal,
    category: 'System'
  },
  {
    name: 'Database MCP',
    description: 'Connect and query SQLite, PostgreSQL, MySQL databases',
    installed: false,
    version: 'v1.1.0',
    downloads: '8K',
    icon: Database,
    category: 'Data'
  },
];

const categories = ['All', 'Core', 'Development', 'System', 'Data'];

export default function MCPPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f59e0b]/10 via-[#ec4899]/10 to-[#8b5cf6]/10 rounded-2xl blur-xl" />
        <div className="relative flex items-start justify-between p-6 rounded-2xl border border-white/[0.06] bg-[#0d0d14]/50 backdrop-blur-sm">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f1f5f9] via-[#a1a1aa] to-[#71717a] bg-clip-text text-transparent">
              One-Click MCP
            </h2>
            <p className="mt-2 text-[#71717a] text-sm max-w-xl">
              Install and configure Model Context Protocol servers instantly
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#f59e0b] to-[#ec4899] rounded-xl blur-lg opacity-30" />
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#f59e0b]/20 to-[#ec4899]/20 border border-[#f59e0b]/30">
                <Sparkles className="h-4 w-4 text-[#f59e0b]" />
                <span className="text-xs text-[#f59e0b] font-semibold tracking-wide">BETA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#8b5cf6]/10 via-[#ec4899]/10 to-[#f59e0b]/10 border border-white/[0.08] p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8b5cf6]/20 to-[#ec4899]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#f59e0b]/20 to-[#8b5cf6]/20 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#ec4899]/20">
                <Zap className="h-6 w-6 text-[#8b5cf6]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] rounded-xl blur-lg opacity-30" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#f1f5f9] text-lg mb-2">Model Context Protocol</h3>
              <p className="text-sm text-[#71717a] leading-relaxed max-w-2xl">
                MCP enables AI models to seamlessly integrate with external tools, data sources, and APIs.
                Install servers with a single click and expand your AI capabilities instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
              category === 'All'
                ? 'bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                : 'bg-[#0d0d14] border border-white/[0.06] text-[#71717a] hover:border-[#8b5cf6]/30 hover:text-[#a1a1aa]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Servers Grid */}
      <div>
        <h3 className="text-sm font-semibold text-[#71717a] mb-4 uppercase tracking-wider flex items-center gap-2">
          <div className="h-px flex-1 bg-white/[0.06]" />
          Available Servers
          <div className="h-px flex-1 bg-white/[0.06]" />
        </h3>
        <div className="grid gap-4">
          {mcpServers.map((server) => {
            const Icon = server.icon;
            return (
              <div
                key={server.name}
                className="group relative flex items-center justify-between p-5 rounded-xl border border-white/[0.06] bg-[#0d0d14] hover:border-[#8b5cf6]/30 hover:bg-[#11111a] transition-all duration-300 overflow-hidden"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative flex items-center gap-5">
                  {/* Icon */}
                  <div className={`relative h-14 w-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    server.installed
                      ? 'bg-[#10b981]/15 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                      : 'bg-[#1a1a24] group-hover:bg-[#8b5cf6]/15 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]'
                  }`}>
                    <Icon className={`h-7 w-7 transition-colors ${
                      server.installed ? 'text-[#10b981]' : 'text-[#52525b] group-hover:text-[#8b5cf6]'
                    }`} />
                    {server.installed && (
                      <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#10b981] border-2 border-[#0d0d14] flex items-center justify-center">
                        <CheckCircle className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[#f1f5f9] text-lg group-hover:text-[#a1a1aa] transition-colors">
                        {server.name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] text-[#52525b] border border-white/[0.04] font-mono">
                        {server.version}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20 font-semibold">
                        {server.category}
                      </span>
                    </div>
                    <p className="text-sm text-[#52525b] mb-2">{server.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Download className="h-3 w-3 text-[#52525b]" />
                        <span className="text-xs text-[#52525b]">{server.downloads} downloads</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="relative flex items-center gap-3">
                  {server.installed ? (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#10b981]/15 border border-[#10b981]/25 text-[#10b981]">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-semibold">Installed</span>
                      </div>
                      <button className="p-2.5 rounded-xl text-[#52525b] hover:text-[#f1f5f9] hover:bg-white/[0.06] transition-all">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button className="group/btn relative flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-sm font-bold text-white shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                        <Download className="h-4 w-4" />
                        Install
                      </button>
                      <button className="p-2.5 rounded-xl text-[#52525b] hover:text-[#f1f5f9] hover:bg-white/[0.06] transition-all">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/[0.08] bg-[#0d0d14]/50 p-8 text-center">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#8b5cf6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ec4899]/10 rounded-full blur-2xl" />
        <div className="relative">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#ec4899]/20 border border-[#8b5cf6]/20 mb-4">
            <Sparkles className="h-7 w-7 text-[#8b5cf6]" />
          </div>
          <h3 className="text-lg font-semibold text-[#f1f5f9] mb-2">Create Custom MCP Server</h3>
          <p className="text-sm text-[#52525b] max-w-md mx-auto mb-4">
            Build your own MCP server and share it with the community
          </p>
          <button className="px-6 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] hover:border-[#8b5cf6]/30 hover:bg-white/[0.08] text-sm font-medium text-[#71717a] hover:text-[#f1f5f9] transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

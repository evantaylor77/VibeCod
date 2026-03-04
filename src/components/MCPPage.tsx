import { Zap, Server, Download, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';

const mcpServers = [
  { 
    name: 'GitHub MCP', 
    description: 'GitHub repos, issues, PR entegrasyonu', 
    installed: false,
    version: 'v1.2.0',
    downloads: '12K'
  },
  { 
    name: 'File System MCP', 
    description: 'Dosya sistemi okuma/yazma erişimi', 
    installed: true,
    version: 'v2.0.1',
    downloads: '45K'
  },
  { 
    name: 'Terminal MCP', 
    description: 'Terminal komutları çalıştırma', 
    installed: false,
    version: 'v1.5.0',
    downloads: '28K'
  },
  { 
    name: 'Database MCP', 
    description: 'SQLite, PostgreSQL bağlantısı', 
    installed: false,
    version: 'v1.1.0',
    downloads: '8K'
  },
];

export default function MCPPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f8fafc] to-[#94a3b8] bg-clip-text text-transparent">
            One-Click MCP
          </h2>
          <p className="mt-1 text-[#64748b] text-sm">MCP sunucularını tek tıklamayla kurun ve yapılandırın</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20">
          <Sparkles className="h-3.5 w-3.5 text-[#f59e0b]" />
          <span className="text-xs text-[#f59e0b] font-medium">Beta</span>
        </div>
      </div>

      {/* Info Card */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#6366f1]/10 via-[#8b5cf6]/10 to-[#6366f1]/10 border border-[#6366f1]/20 p-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366f1]/10 rounded-full blur-3xl" />
        <div className="relative">
          <h3 className="font-semibold text-[#f8fafc] mb-1">Model Context Protocol</h3>
          <p className="text-sm text-[#94a3b8] leading-relaxed max-w-2xl">
            AI modellerinin harici araçlar ve veri kaynaklarıyla entegre olmasını sağlayan bir protokol. 
            One-Click MCP ile sunucuları kolayca kurun.
          </p>
        </div>
      </div>

      {/* Servers Grid */}
      <div>
        <h3 className="text-sm font-semibold text-[#94a3b8] mb-4 uppercase tracking-wider">Mevcut Sunucular</h3>
        <div className="grid gap-3">
          {mcpServers.map((server) => (
            <div
              key={server.name}
              className="group relative flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-[#15151c] hover:border-[#6366f1]/30 hover:bg-[#1c1c24] transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${
                  server.installed 
                    ? 'bg-[#10b981]/10' 
                    : 'bg-[#252532] group-hover:bg-[#6366f1]/10'
                }`}>
                  <Server className={`h-6 w-6 ${
                    server.installed ? 'text-[#10b981]' : 'text-[#64748b] group-hover:text-[#6366f1]'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-[#f8fafc]">{server.name}</h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-[#64748b]">
                      {server.version}
                    </span>
                  </div>
                  <p className="text-sm text-[#64748b]">{server.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-[#64748b]">{server.downloads} indirme</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {server.installed ? (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981]">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Kurulu</span>
                  </div>
                ) : (
                  <button className="group/btn relative flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-sm font-medium text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                    <Download className="h-4 w-4" />
                    Kur
                  </button>
                )}
                <button className="p-2 rounded-lg text-[#64748b] hover:text-[#f8fafc] hover:bg-white/[0.06] transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

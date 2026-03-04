import { Zap, Server, Download, CheckCircle } from 'lucide-react';

const mcpServers = [
  { name: 'GitHub MCP', description: 'GitHub entegrasyonu', installed: false },
  { name: 'File System MCP', description: 'Dosya sistemi erişimi', installed: false },
  { name: 'Terminal MCP', description: 'Terminal komutları', installed: false },
  { name: 'Database MCP', description: 'Veritabanı bağlantısı', installed: false },
];

export default function MCPPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
            <Zap className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">One-Click MCP</h2>
            <p className="text-[#a0a0b0]">MCP sunucularını tek tıklamayla kurun</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <h3 className="text-lg font-semibold mb-4">Mevcut MCP Sunucuları</h3>
          <div className="space-y-3">
            {mcpServers.map((server) => (
              <div
                key={server.name}
                className="flex items-center justify-between p-4 rounded-lg border border-[#2a2a3a] bg-[#0a0a0f]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a25]">
                    <Server className="h-5 w-5 text-[#606070]" />
                  </div>
                  <div>
                    <h4 className="font-medium">{server.name}</h4>
                    <p className="text-sm text-[#606070]">{server.description}</p>
                  </div>
                </div>
                <button
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    server.installed
                      ? 'bg-emerald-600/20 text-emerald-400 cursor-default'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                  disabled={server.installed}
                >
                  {server.installed ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Kurulu
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Kur
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <h3 className="text-lg font-semibold mb-2">MCP Nedir?</h3>
          <p className="text-sm text-[#a0a0b0] leading-relaxed">
            Model Context Protocol (MCP), AI modellerinin harici araçlar ve veri kaynaklarıyla 
            entegre olmasını sağlayan bir protokoldür. One-Click MCP ile bu sunucuları 
            kolayca kurabilir ve yapılandırabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}

import { CheckCircle2, Code, Database, Download, Globe, Server, Sparkles, Terminal } from 'lucide-react';

const mcpServers = [
  {
    name: 'GitHub MCP',
    description: 'Repo, issue ve PR akisini tek panelden yonetir.',
    installed: false,
    version: 'v1.2.0',
    downloads: '12K',
    icon: Globe,
    category: 'Development',
  },
  {
    name: 'File System MCP',
    description: 'Yerel dosya sistemi uzerinde guvenli okuma ve yazma.',
    installed: true,
    version: 'v2.0.1',
    downloads: '45K',
    icon: Code,
    category: 'Core',
  },
  {
    name: 'Terminal MCP',
    description: 'Komut calistirma ve surec yonetimi.',
    installed: false,
    version: 'v1.5.0',
    downloads: '28K',
    icon: Terminal,
    category: 'System',
  },
  {
    name: 'Database MCP',
    description: 'PostgreSQL, MySQL ve SQLite baglantisi.',
    installed: false,
    version: 'v1.1.0',
    downloads: '8K',
    icon: Database,
    category: 'Data',
  },
];

export default function MCPPage() {
  return (
    <div className="space-y-6">
      <div className="soft-card p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ea580c]">MCP</p>
        <h2 className="mt-2 text-3xl font-bold">One-Click MCP Catalog</h2>
        <p className="mt-2 text-sm text-[#556255]">Model Context Protocol sunucularini tek tikla kurun.</p>
      </div>

      <div className="soft-card ribbon p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white p-2.5 text-[#ea580c]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">What is MCP?</h3>
            <p className="mt-1 text-sm text-[#556255]">
              MCP, AI modelinizi harici araclara baglayan ortak protokoldur. Kurulum ve yonetim bu panelden yapilir.
            </p>
          </div>
        </div>
      </div>

      <div className="soft-card p-6">
        <div className="mb-4 flex items-center gap-2 text-[#556255]">
          <Server className="h-4 w-4" />
          <h3 className="text-lg font-bold text-[#1f2a1f]">Available Servers</h3>
        </div>

        <div className="space-y-3">
          {mcpServers.map((server) => {
            const Icon = server.icon;
            return (
              <div key={server.name} className="flex flex-col gap-4 rounded-xl border border-[#d1d9c4] bg-[#fbfcf8] p-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-white p-2.5 text-[#0f766e]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold text-[#1f2a1f]">{server.name}</h4>
                      <span className="rounded-md bg-[#e8eddc] px-2 py-0.5 text-[10px] font-semibold text-[#556255]">{server.version}</span>
                      <span className="rounded-md bg-[#fff1e8] px-2 py-0.5 text-[10px] font-semibold text-[#b45309]">{server.category}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#556255]">{server.description}</p>
                    <p className="mt-1 text-[11px] text-[#556255]">{server.downloads} downloads</p>
                  </div>
                </div>

                {server.installed ? (
                  <span className="inline-flex items-center gap-2 self-start rounded-lg bg-[#dcfce7] px-3 py-2 text-xs font-semibold text-[#15803d] md:self-center">
                    <CheckCircle2 className="h-4 w-4" /> Installed
                  </span>
                ) : (
                  <button className="inline-flex items-center gap-2 self-start rounded-lg bg-[#1f2a1f] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#ea580c] md:self-center">
                    <Download className="h-4 w-4" /> Install
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

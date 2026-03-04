import { ArrowRight, FolderOpen, GitBranch, Play, Sparkles, Wand2 } from 'lucide-react';

const refactoringOptions = [
  { id: 'simplify', label: 'Kodu Basitlestir', description: 'Karmasik akislarin okunurlugunu iyilestirir.', icon: Wand2 },
  { id: 'naming', label: 'Isimlendirme Iyilestirme', description: 'Daha acik degisken ve fonksiyon adlari onerir.', icon: Sparkles },
  { id: 'functions', label: 'Fonksiyon Bolme', description: 'Uzun fonksiyonlari daha kucuk bloklara ayirir.', icon: GitBranch },
];

const recentProjects = [
  { name: 'E-Commerce API', path: '/projects/ecommerce-api', lastModified: '2 saat once' },
  { name: 'Dashboard App', path: '/projects/dashboard', lastModified: '1 gun once' },
  { name: 'Mobile Backend', path: '/projects/mobile-backend', lastModified: '3 gun once' },
];

export default function RefactoringPage() {
  return (
    <div className="space-y-6">
      <div className="soft-card p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">Refactoring</p>
        <h2 className="mt-2 text-3xl font-bold">Code Refresh Console</h2>
        <p className="mt-2 text-sm text-[#556255]">Kodunuzu daha okunur, bakimi kolay ve hizli hale getirin.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="soft-card p-5">
          <p className="text-xs uppercase tracking-wider text-[#556255]">Projects Analyzed</p>
          <p className="mt-2 text-3xl font-bold text-[#1f2a1f]">24</p>
          <p className="mt-1 text-xs text-[#556255]">+3 this week</p>
        </div>
        <div className="soft-card p-5">
          <p className="text-xs uppercase tracking-wider text-[#556255]">Refactors Applied</p>
          <p className="mt-2 text-3xl font-bold text-[#1f2a1f]">156</p>
          <p className="mt-1 text-xs text-[#556255]">98% success rate</p>
        </div>
        <div className="soft-card p-5">
          <p className="text-xs uppercase tracking-wider text-[#556255]">Time Saved</p>
          <p className="mt-2 text-3xl font-bold text-[#1f2a1f]">12h</p>
          <p className="mt-1 text-xs text-[#556255]">This month</p>
        </div>
      </div>

      <div className="soft-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-[#0f766e]/10 p-2.5 text-[#0f766e]">
            <FolderOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Project Selection</h3>
            <p className="text-xs text-[#556255]">Refactor edilecek proje klasorunu secin.</p>
          </div>
        </div>

        <div className="space-y-2">
          {recentProjects.map((project) => (
            <button
              key={project.name}
              className="flex w-full items-center justify-between rounded-xl border border-[#d1d9c4] bg-[#fbfcf8] p-3 text-left transition hover:border-[#0f766e]/35"
            >
              <div>
                <p className="text-sm font-semibold text-[#1f2a1f]">{project.name}</p>
                <p className="text-xs text-[#556255]">{project.path}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#556255]">
                {project.lastModified}
                <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="soft-card p-6">
        <h3 className="mb-4 text-lg font-bold">Refactor Plan</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {refactoringOptions.map((option) => {
            const Icon = option.icon;
            return (
              <label key={option.id} className="rounded-xl border border-[#d1d9c4] bg-[#fbfcf8] p-4 hover:border-[#0f766e]/35">
                <div className="flex items-start gap-3">
                  <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 accent-[#0f766e]" />
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[#0f766e]" />
                      <p className="text-sm font-semibold text-[#1f2a1f]">{option.label}</p>
                    </div>
                    <p className="mt-1 text-xs text-[#556255]">{option.description}</p>
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        <div className="mt-5 flex justify-end">
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#1f2a1f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f766e]">
            <Play className="h-4 w-4" />
            Start Refactoring
          </button>
        </div>
      </div>
    </div>
  );
}

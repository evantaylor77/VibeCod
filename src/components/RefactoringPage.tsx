import { GitBranch, Play, FolderOpen, CheckCircle2, Wand2, Sparkles, ArrowRight } from 'lucide-react';

const refactoringOptions = [
  { id: 'simplify', label: 'Kodu Basitleştir', description: 'Karmaşık kod yapılarını optimize eder', icon: Wand2 },
  { id: 'naming', label: 'Değişken İsimlendirme', description: 'Anlamlı isimler önerir', icon: Sparkles },
  { id: 'functions', label: 'Fonksiyon Bölme', description: 'Uzun fonksiyonları parçalar', icon: GitBranch },
  { id: 'imports', label: 'Import Düzenleme', description: 'Kullanılmayan importları temizler', icon: CheckCircle2 },
];

const recentProjects = [
  { name: 'E-Commerce API', path: '/projects/ecommerce-api', lastModified: '2 saat önce' },
  { name: 'Dashboard App', path: '/projects/dashboard', lastModified: '1 gün önce' },
  { name: 'Mobile Backend', path: '/projects/mobile-backend', lastModified: '3 gün önce' },
];

export default function RefactoringPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/10 via-[#6366f1]/10 to-[#06b6d4]/10 rounded-2xl blur-xl" />
        <div className="relative flex items-start justify-between p-6 rounded-2xl border border-white/[0.06] bg-[#0d0d14]/50 backdrop-blur-sm">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f1f5f9] via-[#a1a1aa] to-[#71717a] bg-clip-text text-transparent">
              Code Refactoring
            </h2>
            <p className="mt-2 text-[#71717a] text-sm max-w-xl">
              AI-powered code analysis and intelligent refactoring suggestions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8b5cf6]/20 to-[#06b6d4]/20 border border-[#8b5cf6]/30">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                </div>
                <span className="text-xs text-[#8b5cf6] font-semibold tracking-wide">AI ENGINE ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="group relative overflow-hidden rounded-xl bg-[#0d0d14] border border-white/[0.06] p-5 hover:border-[#8b5cf6]/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#8b5cf6]/10 rounded-full blur-2xl group-hover:bg-[#8b5cf6]/20 transition-all" />
          <div className="relative">
            <p className="text-[#52525b] text-xs font-semibold tracking-wider uppercase">Projects Analyzed</p>
            <p className="mt-2 text-3xl font-bold text-[#f1f5f9]">24</p>
            <p className="mt-1 text-[#71717a] text-xs">+3 this week</p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl bg-[#0d0d14] border border-white/[0.06] p-5 hover:border-[#06b6d4]/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#06b6d4]/10 rounded-full blur-2xl group-hover:bg-[#06b6d4]/20 transition-all" />
          <div className="relative">
            <p className="text-[#52525b] text-xs font-semibold tracking-wider uppercase">Refactors Applied</p>
            <p className="mt-2 text-3xl font-bold text-[#f1f5f9]">156</p>
            <p className="mt-1 text-[#71717a] text-xs">98% success rate</p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl bg-[#0d0d14] border border-white/[0.06] p-5 hover:border-[#ec4899]/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#ec4899]/10 rounded-full blur-2xl group-hover:bg-[#ec4899]/20 transition-all" />
          <div className="relative">
            <p className="text-[#52525b] text-xs font-semibold tracking-wider uppercase">Time Saved</p>
            <p className="mt-2 text-3xl font-bold text-[#f1f5f9]">12h</p>
            <p className="mt-1 text-[#71717a] text-xs">This month</p>
          </div>
        </div>
      </div>

      {/* Project Selection */}
      <div className="group relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8b5cf6]/30 via-[#6366f1]/30 to-[#06b6d4]/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="relative bg-[#0d0d14] rounded-xl border border-white/[0.06] p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20">
                <FolderOpen className="h-6 w-6 text-[#8b5cf6]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] rounded-xl blur-lg opacity-20" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#f1f5f9] text-lg">Select Project</h3>
              <p className="text-xs text-[#52525b] mt-0.5">Choose a project to analyze and refactor</p>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="space-y-2 mb-4">
            {recentProjects.map((project, index) => (
              <button
                key={project.name}
                className="group/project w-full flex items-center justify-between p-3 rounded-lg bg-[#050508] border border-white/[0.04] hover:border-[#8b5cf6]/30 hover:bg-[#0a0a10] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center group-hover/project:bg-[#8b5cf6]/20 transition-colors">
                    <GitBranch className="h-4 w-4 text-[#8b5cf6]" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-[#f1f5f9] group-hover/project:text-[#a1a1aa] transition-colors">{project.name}</p>
                    <p className="text-xs text-[#52525b]">{project.path}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#52525b]">{project.lastModified}</span>
                  <ArrowRight className="h-4 w-4 text-[#52525b] group-hover/project:text-[#8b5cf6] group-hover/project:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Or enter a custom project path..."
                className="w-full rounded-xl border border-white/[0.08] bg-[#050508] px-4 py-3 text-sm text-[#f1f5f9] placeholder-[#52525b] focus:border-[#8b5cf6]/50 focus:outline-none focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#11111a] hover:bg-[#16161f] border border-white/[0.08] hover:border-[#8b5cf6]/30 text-sm font-medium text-[#71717a] hover:text-[#f1f5f9] transition-all duration-300">
              <FolderOpen className="h-4 w-4" />
              Browse
            </button>
          </div>
        </div>
      </div>

      {/* Refactoring Options */}
      <div>
        <h3 className="text-sm font-semibold text-[#71717a] mb-4 uppercase tracking-wider flex items-center gap-2">
          <div className="h-px flex-1 bg-white/[0.06]" />
          Refactoring Options
          <div className="h-px flex-1 bg-white/[0.06]" />
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {refactoringOptions.map((option) => {
            const Icon = option.icon;
            return (
              <label
                key={option.id}
                className="group/option relative flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-[#0d0d14] hover:border-[#8b5cf6]/30 hover:bg-[#11111a] cursor-pointer transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-transparent opacity-0 group-hover/option:opacity-100 transition-opacity" />
                <input
                  type="checkbox"
                  className="relative z-10 mt-0.5 h-4 w-4 rounded border-white/[0.15] bg-[#050508] text-[#8b5cf6] focus:ring-[#8b5cf6] focus:ring-offset-0 focus:ring-offset-[#0d0d14]"
                  defaultChecked
                />
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#8b5cf6]/10 group-hover/option:bg-[#8b5cf6]/20 transition-colors">
                      <Icon className="h-4 w-4 text-[#8b5cf6]" />
                    </div>
                    <span className="text-sm font-semibold text-[#f1f5f9] group-hover/option:text-[#a1a1aa] transition-colors">
                      {option.label}
                    </span>
                  </div>
                  <p className="text-xs text-[#52525b] mt-1.5 ml-8">{option.description}</p>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-4">
        <button className="group/btn relative flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#8b5cf6] via-[#6366f1] to-[#06b6d4] text-sm font-bold text-white shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] via-[#6366f1] to-[#06b6d4] animate-gradient" />
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          <Play className="relative h-5 w-5 fill-current" />
          <span className="relative">Start Refactoring</span>
          <ArrowRight className="relative h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

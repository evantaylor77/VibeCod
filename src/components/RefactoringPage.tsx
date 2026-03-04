import { GitBranch, Play, FolderOpen, CheckCircle2 } from 'lucide-react';

const refactoringOptions = [
  { id: 'simplify', label: 'Kodu Basitleştir', description: 'Karmaşık kod yapılarını optimize eder', icon: CheckCircle2 },
  { id: 'naming', label: 'Değişken İsimlendirme', description: 'Anlamlı isimler önerir', icon: CheckCircle2 },
  { id: 'functions', label: 'Fonksiyon Bölme', description: 'Uzun fonksiyonları parçalar', icon: CheckCircle2 },
  { id: 'imports', label: 'Import Düzenleme', description: 'Kullanılmayan importları temizler', icon: CheckCircle2 },
];

export default function RefactoringPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f8fafc] to-[#94a3b8] bg-clip-text text-transparent">
            Refactoring
          </h2>
          <p className="mt-1 text-[#64748b] text-sm">Kod yapınızı otomatik olarak iyileştirin ve temizleyin</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20">
          <div className="h-2 w-2 rounded-full bg-[#6366f1] animate-pulse" />
          <span className="text-xs text-[#6366f1] font-medium">AI Ready</span>
        </div>
      </div>

      {/* Project Selection Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="relative bg-[#15151c] rounded-xl border border-white/[0.06] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#6366f1]/10">
              <FolderOpen className="h-5 w-5 text-[#6366f1]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#f8fafc]">Proje Seçimi</h3>
              <p className="text-xs text-[#64748b]">Refactoring yapılacak projeyi seçin</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Proje klasörünü seçin veya sürükleyin..."
                className="w-full rounded-xl border border-white/[0.08] bg-[#0d0d12] px-4 py-3 text-sm text-[#f8fafc] placeholder-[#64748b] focus:border-[#6366f1]/50 focus:outline-none transition-all"
                readOnly
              />
            </div>
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#252532] hover:bg-[#2d2d3d] border border-white/[0.08] text-sm font-medium text-[#94a3b8] hover:text-[#f8fafc] transition-all">
              <FolderOpen className="h-4 w-4" />
              Gözat
            </button>
          </div>
        </div>
      </div>

      {/* Options Grid */}
      <div>
        <h3 className="text-sm font-semibold text-[#94a3b8] mb-4 uppercase tracking-wider">Refactoring Seçenekleri</h3>
        <div className="grid grid-cols-2 gap-3">
          {refactoringOptions.map((option) => (
            <label 
              key={option.id}
              className="group relative flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-[#15151c] hover:border-[#6366f1]/30 hover:bg-[#1c1c24] cursor-pointer transition-all duration-200"
            >
              <input 
                type="checkbox" 
                className="mt-0.5 h-4 w-4 rounded border-white/[0.1] bg-[#0d0d12] text-[#6366f1] focus:ring-[#6366f1] focus:ring-offset-0" 
                defaultChecked
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#f8fafc] group-hover:text-white transition-colors">
                    {option.label}
                  </span>
                </div>
                <p className="text-xs text-[#64748b] mt-0.5">{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-4">
        <button className="group relative flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
          <Play className="h-4 w-4 fill-current" />
          Refactoring Başlat
          <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
}

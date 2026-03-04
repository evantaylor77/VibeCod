import { GitBranch, Play, Settings } from 'lucide-react';

export default function RefactoringPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20">
            <GitBranch className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Refactoring</h2>
            <p className="text-[#a0a0b0]">Kod yapınızı otomatik olarak iyileştirin</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <h3 className="text-lg font-semibold mb-4">Proje Seçimi</h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Proje klasörünü seçin..."
              className="flex-1 rounded-lg border border-[#2a2a3a] bg-[#0a0a0f] px-4 py-2.5 text-sm text-white placeholder-[#505060] focus:border-indigo-500 focus:outline-none"
              readOnly
            />
            <button className="flex items-center gap-2 rounded-lg bg-[#1a1a25] border border-[#2a2a3a] px-4 py-2.5 text-sm font-medium text-[#a0a0b0] hover:bg-[#252530] transition-colors">
              <Settings className="h-4 w-4" />
              Gözat
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <h3 className="text-lg font-semibold mb-4">Refactoring Seçenekleri</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Kodu Basitleştir', 'Değişken İsimlendirme', 'Fonksiyon Bölme', 'Import Düzenleme'].map((option) => (
              <label key={option} className="flex items-center gap-3 p-3 rounded-lg border border-[#2a2a3a] bg-[#0a0a0f] cursor-pointer hover:border-[#3a3a4a] transition-colors">
                <input type="checkbox" className="h-4 w-4 rounded border-[#2a2a3a] bg-[#0a0a0f] text-indigo-600 focus:ring-indigo-600" />
                <span className="text-sm text-[#a0a0b0]">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
            <Play className="h-4 w-4" />
            Refactoring Başlat
          </button>
        </div>
      </div>
    </div>
  );
}

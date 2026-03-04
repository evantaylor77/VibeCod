import { Shield, Scan, Lock, AlertTriangle } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
            <Shield className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Project Security</h2>
            <p className="text-[#a0a0b0]">Projenizin güvenliğini analiz edin</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="h-5 w-5 text-emerald-400" />
              <span className="text-sm text-[#a0a0b0]">Güvenlik Skoru</span>
            </div>
            <p className="text-3xl font-bold">--</p>
          </div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <span className="text-sm text-[#a0a0b0]">Zafiyetler</span>
            </div>
            <p className="text-3xl font-bold">--</p>
          </div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5">
            <div className="flex items-center gap-3 mb-3">
              <Scan className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-[#a0a0b0]">Son Tarama</span>
            </div>
            <p className="text-lg font-medium text-[#a0a0b0]">Hiç yapılmadı</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <h3 className="text-lg font-semibold mb-4">Güvenlik Taraması</h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Proje klasörünü seçin..."
              className="flex-1 rounded-lg border border-[#2a2a3a] bg-[#0a0a0f] px-4 py-2.5 text-sm text-white placeholder-[#505060] focus:border-emerald-500 focus:outline-none"
              readOnly
            />
            <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
              <Scan className="h-4 w-4" />
              Tarama Başlat
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-dashed border-[#2a2a3a] bg-[#12121a] p-12 text-center">
          <Shield className="mx-auto h-12 w-12 text-[#2a2a3a]" />
          <p className="mt-4 text-[#606070]">Henüz bir tarama yapılmadı</p>
          <p className="text-sm text-[#505060]">Projenizi tarayarak güvenlik durumunu öğrenin</p>
        </div>
      </div>
    </div>
  );
}

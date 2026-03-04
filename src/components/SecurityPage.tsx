import { Shield, Scan, Lock, AlertTriangle, CheckCircle, Clock, ShieldCheck } from 'lucide-react';

const stats = [
  { label: 'Güvenlik Skoru', value: '--', icon: ShieldCheck, color: 'emerald' },
  { label: 'Zafiyetler', value: '--', icon: AlertTriangle, color: 'amber' },
  { label: 'Son Tarama', value: 'Hiç', icon: Clock, color: 'blue' },
];

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f8fafc] to-[#94a3b8] bg-clip-text text-transparent">
            Project Security
          </h2>
          <p className="mt-1 text-[#64748b] text-sm">Projenizin güvenliğini analiz edin ve zafiyetleri tespit edin</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/20">
          <Shield className="h-3.5 w-3.5 text-[#10b981]" />
          <span className="text-xs text-[#10b981] font-medium">Protected</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            emerald: 'from-[#10b981]/20 to-[#10b981]/5 border-[#10b981]/20 text-[#10b981]',
            amber: 'from-[#f59e0b]/20 to-[#f59e0b]/5 border-[#f59e0b]/20 text-[#f59e0b]',
            blue: 'from-[#3b82f6]/20 to-[#3b82f6]/5 border-[#3b82f6]/20 text-[#3b82f6]',
          };
          
          return (
            <div key={stat.label} className={`relative overflow-hidden rounded-xl border bg-gradient-to-br p-5 ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium opacity-80">{stat.label}</span>
              </div>
              <p className="mt-3 text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Scan Section */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#10b981]/20 to-[#3b82f6]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="relative bg-[#15151c] rounded-xl border border-white/[0.06] p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#10b981]/10">
                <Scan className="h-5 w-5 text-[#10b981]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#f8fafc]">Güvenlik Taraması</h3>
                <p className="text-xs text-[#64748b]">Projenizi derinlemesine analiz edin</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Proje klasörünü seçin..."
                className="w-full rounded-xl border border-white/[0.08] bg-[#0d0d12] px-4 py-3 text-sm text-[#f8fafc] placeholder-[#64748b] focus:border-[#10b981]/50 focus:outline-none transition-all"
                readOnly
              />
            </div>
            <button className="group/btn relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              <Scan className="h-4 w-4" />
              Tarama Başlat
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6366f1]/5 to-transparent rounded-2xl" />
        <div className="relative rounded-xl border border-dashed border-white/[0.08] bg-[#15151c]/50 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1c1c24] border border-white/[0.06] mb-4">
            <Lock className="h-7 w-7 text-[#64748b]" />
          </div>
          <h3 className="text-lg font-semibold text-[#f8fafc] mb-1">Henüz bir tarama yapılmadı</h3>
          <p className="text-sm text-[#64748b] max-w-sm mx-auto">
            Projenizi tarayarak güvenlik açıklarını, zafiyetleri ve önerileri görüntüleyin
          </p>
        </div>
      </div>
    </div>
  );
}

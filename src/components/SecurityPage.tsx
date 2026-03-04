import { Activity, AlertTriangle, CheckCircle2, Scan, Shield, ShieldCheck, Zap } from 'lucide-react';

const stats = [
  { label: 'Security Score', value: 'A+', icon: ShieldCheck },
  { label: 'Vulnerabilities', value: '0', icon: Shield },
  { label: 'Last Scan', value: 'Today', icon: Activity },
];

const securityChecks = [
  { name: 'Dependency Analysis', status: 'passed', issues: 0 },
  { name: 'Code Injection Scan', status: 'passed', issues: 0 },
  { name: 'API Security', status: 'passed', issues: 0 },
  { name: 'Data Encryption', status: 'warning', issues: 1 },
  { name: 'Input Validation', status: 'passed', issues: 0 },
];

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="soft-card p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#15803d]">Security</p>
        <h2 className="mt-2 text-3xl font-bold">Project Security Center</h2>
        <p className="mt-2 text-sm text-[#556255]">Kod tabanini risklere karsi tarayin ve aksiyon alin.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="soft-card p-5">
              <div className="flex items-center gap-2 text-[#15803d]">
                <Icon className="h-4 w-4" />
                <p className="text-xs uppercase tracking-wider text-[#556255]">{stat.label}</p>
              </div>
              <p className="mt-2 text-3xl font-bold text-[#1f2a1f]">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="soft-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#15803d]/10 p-2.5 text-[#15803d]">
              <Scan className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Live Scan</h3>
              <p className="text-xs text-[#556255]">Proje dizinini girip taramayi baslatin.</p>
            </div>
          </div>
          <span className="rounded-lg bg-[#15803d]/10 px-3 py-1 text-xs font-semibold text-[#15803d]">Ready</span>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            placeholder="Enter project path to scan..."
            className="w-full rounded-xl border border-[#d1d9c4] bg-[#fbfcf8] px-4 py-3 text-sm text-[#1f2a1f] outline-none transition focus:border-[#15803d]/45"
          />
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f2a1f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#15803d]">
            <Zap className="h-4 w-4" />
            Start Scan
          </button>
        </div>
      </div>

      <div className="soft-card p-6">
        <h3 className="mb-4 text-lg font-bold">Check Results</h3>
        <div className="space-y-3">
          {securityChecks.map((check) => {
            const isWarning = check.status === 'warning';
            const icon = isWarning ? (
              <AlertTriangle className="h-4 w-4 text-[#b45309]" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-[#15803d]" />
            );

            return (
              <div key={check.name} className="flex items-center justify-between rounded-xl border border-[#d1d9c4] bg-[#fbfcf8] p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white p-2">{icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-[#1f2a1f]">{check.name}</p>
                    <p className="text-xs text-[#556255]">
                      {check.issues === 0 ? 'No issues detected' : `${check.issues} issue found`}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                    isWarning ? 'bg-[#fef3c7] text-[#b45309]' : 'bg-[#dcfce7] text-[#15803d]'
                  }`}
                >
                  {isWarning ? 'Warning' : 'Pass'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

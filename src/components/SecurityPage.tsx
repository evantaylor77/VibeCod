import { Shield, Scan, Lock, AlertTriangle, CheckCircle, Clock, ShieldCheck, Activity, Zap } from 'lucide-react';

const stats = [
  { label: 'Security Score', value: 'A+', icon: ShieldCheck, color: 'from-[#10b981] to-[#059669]', bg: 'from-[#10b981]/20 to-[#059669]/10', border: '[#10b981]/30' },
  { label: 'Vulnerabilities', value: '0', icon: Shield, color: 'from-[#10b981] to-[#059669]', bg: 'from-[#10b981]/20 to-[#059669]/10', border: '[#10b981]/30' },
  { label: 'Last Scan', value: 'Today', icon: Clock, color: 'from-[#6366f1] to-[#8b5cf6]', bg: 'from-[#6366f1]/20 to-[#8b5cf6]/10', border: '[#6366f1]/30' },
];

const securityChecks = [
  { name: 'Dependency Analysis', status: 'passed', issues: 0 },
  { name: 'Code Injection Scan', status: 'passed', issues: 0 },
  { name: 'API Security', status: 'passed', issues: 0 },
  { name: 'Data Encryption', status: 'warning', issues: 1 },
  { name: 'Authentication Flow', status: 'passed', issues: 0 },
  { name: 'Input Validation', status: 'passed', issues: 0 },
];

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/10 via-[#059669]/10 to-[#047857]/10 rounded-2xl blur-xl" />
        <div className="relative flex items-start justify-between p-6 rounded-2xl border border-white/[0.06] bg-[#0d0d14]/50 backdrop-blur-sm">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f1f5f9] via-[#a1a1aa] to-[#71717a] bg-clip-text text-transparent">
              Project Security
            </h2>
            <p className="mt-2 text-[#71717a] text-sm max-w-xl">
              Advanced security analysis and vulnerability detection powered by AI
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-xl blur-lg opacity-30" />
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#10b981]/20 to-[#059669]/20 border border-[#10b981]/30">
                <Shield className="h-4 w-4 text-[#10b981]" />
                <span className="text-xs text-[#10b981] font-semibold tracking-wide">PROTECTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br p-6 hover:border-[#10b981]/30 transition-all duration-300"
              style={{ background: `linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.05) 100%)` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/10 rounded-full blur-2xl group-hover:bg-[#10b981]/20 transition-all" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#10b981]/15">
                    <Icon className="h-5 w-5 text-[#10b981]" />
                  </div>
                  <span className="text-xs font-semibold text-[#52525b] tracking-wider uppercase">{stat.label}</span>
                </div>
                <p className="mt-4 text-3xl font-bold text-[#f1f5f9]">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scan Section */}
      <div className="group relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#10b981]/30 via-[#059669]/30 to-[#047857]/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="relative bg-[#0d0d14] rounded-xl border border-white/[0.06] p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#10b981]/20 to-[#059669]/20">
                  <Scan className="h-6 w-6 text-[#10b981]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl blur-lg opacity-20" />
              </div>
              <div>
                <h3 className="font-semibold text-[#f1f5f9] text-lg">Security Scan</h3>
                <p className="text-xs text-[#52525b] mt-0.5">Deep security analysis of your project</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
              <Activity className="h-3 w-3 text-[#10b981]" />
              <span className="text-xs text-[#10b981] font-medium">Real-time</span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Enter project path to scan..."
                className="w-full rounded-xl border border-white/[0.08] bg-[#050508] px-4 py-3 text-sm text-[#f1f5f9] placeholder-[#52525b] focus:border-[#10b981]/50 focus:outline-none focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)] transition-all"
              />
            </div>
            <button className="group/btn relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-sm font-bold text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
              <Zap className="h-4 w-4 fill-current" />
              Start Scan
            </button>
          </div>
        </div>
      </div>

      {/* Security Checks */}
      <div>
        <h3 className="text-sm font-semibold text-[#71717a] mb-4 uppercase tracking-wider flex items-center gap-2">
          <div className="h-px flex-1 bg-white/[0.06]" />
          Security Checks
          <div className="h-px flex-1 bg-white/[0.06]" />
        </h3>
        <div className="grid gap-3">
          {securityChecks.map((check) => {
            const isWarning = check.status === 'warning';
            const isPassed = check.status === 'passed';

            return (
              <div
                key={check.name}
                className="group relative flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-[#0d0d14] hover:border-[#10b981]/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${isPassed ? 'bg-[#10b981]/15' : isWarning ? 'bg-[#f59e0b]/15' : 'bg-[#ef4444]/15'}`}>
                    {isPassed ? (
                      <CheckCircle className="h-5 w-5 text-[#10b981]" />
                    ) : isWarning ? (
                      <AlertTriangle className="h-5 w-5 text-[#f59e0b]" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-[#ef4444]" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f1f5f9]">{check.name}</h4>
                    <p className="text-xs text-[#52525b] mt-0.5">
                      {isPassed ? 'All checks passed' : isWarning ? `${check.issues} issue found` : `${check.issues} issues found`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {!isPassed && (
                    <button className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.06] hover:border-[#10b981]/30 text-xs font-medium text-[#71717a] hover:text-[#f1f5f9] transition-all">
                      View Details
                    </button>
                  )}
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    isPassed
                      ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25'
                      : isWarning
                        ? 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/25'
                        : 'bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/25'
                  }`}>
                    {check.status === 'passed' ? 'PASS' : check.status === 'warning' ? 'WARNING' : 'FAIL'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State - Recent Activity */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10b981]/5 to-transparent rounded-2xl" />
        <div className="relative rounded-xl border border-dashed border-white/[0.08] bg-[#0d0d14]/50 p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#11111a] border border-white/[0.06] mb-4">
            <Lock className="h-7 w-7 text-[#52525b]" />
          </div>
          <h3 className="text-lg font-semibold text-[#f1f5f9] mb-2">Security Dashboard Ready</h3>
          <p className="text-sm text-[#52525b] max-w-sm mx-auto">
            Start a security scan to identify vulnerabilities, analyze dependencies, and get AI-powered security recommendations
          </p>
        </div>
      </div>
    </div>
  );
}

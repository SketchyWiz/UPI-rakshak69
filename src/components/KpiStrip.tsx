import React from 'react';

interface KpiStripProps {
  defendedCapital: string;
  interceptedCount: number;
  accuracy: string;
  latencyMs: number;
}

export const KpiStrip: React.FC<KpiStripProps> = ({
  defendedCapital = '₹4.82 Cr',
  interceptedCount = 3842,
  accuracy = '98.4%',
  latencyMs = 38
}) => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Capital Defended */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>DEFENDED CAPITAL (24H)</span>
            <span className="inline-flex items-center gap-0.5 text-emerald-600 font-medium">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +14.6%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {defendedCapital}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-emerald-500">verified_user</span>
            <span>Prevented before beneficiary debit</span>
          </p>
        </div>

        {/* KPI 2: Intercepts Count */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>SCAMS INTERCEPTED</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700">
              Live
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {interceptedCount.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-blue-600">block</span>
            <span>Halted at pre-PIN gateway</span>
          </p>
        </div>

        {/* KPI 3: Model Accuracy */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>MODEL ACCURACY</span>
            <span className="text-slate-400 font-mono text-[11px]">&lt;0.42% FPR</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {accuracy}
            </span>
            <span className="text-xs font-medium text-slate-500">Precision</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-blue-600">psychology</span>
            <span>SHAP verified across 56 PSP switches</span>
          </p>
        </div>

        {/* KPI 4: Decision Latency */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>DECISION LATENCY</span>
            <span className="text-emerald-600 font-mono text-[11px] font-medium">SLA &lt;100ms</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-600 tracking-tight tabular-nums">
              {latencyMs}
              <span className="text-lg font-semibold text-slate-500 ml-0.5">ms</span>
            </span>
            <span className="text-xs font-medium text-slate-400">p99: 54ms</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-emerald-500">speed</span>
            <span>Zero impact on legit user UX</span>
          </p>
        </div>
      </div>
    </section>
  );
};

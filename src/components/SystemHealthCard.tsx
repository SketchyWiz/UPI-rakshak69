import React, { useState } from 'react';

export const SystemHealthCard: React.FC = () => {
  const [isRetraining, setIsRetraining] = useState(false);
  const [retrainProgress, setRetrainProgress] = useState(0);
  const [retrainNotice, setRetrainNotice] = useState<string | null>(null);
  const [tps, setTps] = useState(48219);
  const [latency, setLatency] = useState(4.1);

  const handleForceRetrain = () => {
    if (isRetraining) return;
    setIsRetraining(true);
    setRetrainProgress(12);
    setRetrainNotice('Ingesting latest 14,200 labeled zero-day telemetry payloads...');

    const interval = setInterval(() => {
      setRetrainProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRetraining(false);
            setRetrainProgress(0);
            setRetrainNotice('Heuristic model weights converged across 56 PSP switches. Zero false positive spike.');
            setTimeout(() => setRetrainNotice(null), 5000);
          }, 600);
          return 100;
        }
        return prev + 24;
      });
    }, 400);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex-1 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900">System Health &amp; Gateway Sync</h2>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Healthy
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">NPCI Central Switch Latency</span>
            <span className="font-mono font-semibold text-slate-800">{latency}ms</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Throughput (TPS)</span>
            <span className="font-mono font-semibold text-slate-800">
              {tps.toLocaleString('en-IN')} txn/sec
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Mule Registry Hash Sync</span>
            <span className="font-semibold text-emerald-600">Synchronized (12s ago)</span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-slate-500">I4C Cybercrime Exchange</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Direct Link Active
            </span>
          </div>
        </div>
      </div>

      {/* Retraining Progress Bar */}
      {isRetraining && (
        <div className="my-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-blue-900 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] animate-spin">sync</span>
              Retraining Sovereign SHAP Weights
            </span>
            <span className="font-mono font-bold text-blue-700">{retrainProgress}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${retrainProgress}%` }}
            ></div>
          </div>
          <div className="text-[11px] text-blue-700 mt-1 font-mono">{retrainNotice}</div>
        </div>
      )}

      {retrainNotice && !isRetraining && (
        <div className="my-2 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-[11px] flex items-center justify-between">
          <span>{retrainNotice}</span>
          <button onClick={() => setRetrainNotice(null)} className="font-bold ml-2">×</button>
        </div>
      )}

      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>Cluster: MUM-CORE-01</span>
        <button
          disabled={isRetraining}
          onClick={handleForceRetrain}
          className="text-blue-600 hover:text-blue-800 font-semibold text-xs flex items-center gap-1 transition disabled:opacity-50"
        >
          <span className={`material-symbols-outlined text-[14px] ${isRetraining ? 'animate-spin' : ''}`}>
            refresh
          </span>
          <span>{isRetraining ? 'Retraining...' : 'Force Retrain'}</span>
        </button>
      </div>
    </div>
  );
};

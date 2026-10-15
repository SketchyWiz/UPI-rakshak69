import React, { useState } from 'react';
import { FRAUD_VECTORS } from '../data/mockData';
import { FraudVector } from '../types';

interface EmergingVectorsCardProps {
  onSelectVector?: (vector: FraudVector) => void;
}

export const EmergingVectorsCard: React.FC<EmergingVectorsCardProps> = ({ onSelectVector }) => {
  const [selectedVector, setSelectedVector] = useState<FraudVector | null>(null);

  const handleVectorClick = (vec: FraudVector) => {
    setSelectedVector(vec);
    if (onSelectVector) onSelectVector(vec);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Emerging Fraud Vectors</h2>
            <p className="text-xs text-slate-500 mt-0.5">Top active zero-day attack taxonomy</p>
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Live Telemetry
          </span>
        </div>

        <div className="space-y-3">
          {FRAUD_VECTORS.map((vec) => (
            <div
              key={vec.id}
              onClick={() => handleVectorClick(vec)}
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                  {vec.title}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    vec.severity === 'critical'
                      ? 'bg-rose-100 text-rose-700'
                      : vec.severity === 'elevated'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {vec.badgeText}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                {vec.description}
              </p>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/70">
                <span>Avg Debit: {vec.avgDebit}</span>
                <span className="text-emerald-600 font-medium">{vec.autoInterceptRate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vector Threat Intelligence Modal */}
      {selectedVector && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{selectedVector.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedVector.severity === 'critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedVector.badgeText}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Zero-Day Attack Modus Operandi &amp; Switch Rules</p>
              </div>
              <button
                onClick={() => setSelectedVector(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Attack Pattern Signature</label>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {selectedVector.pattern}
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Pre-PIN Sovereign Countermeasure</label>
                <p className="text-slate-600 bg-emerald-50 text-emerald-900 p-2.5 rounded-lg border border-emerald-200">
                  {selectedVector.countermeasure}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-400 text-[11px]">Average Attempted Debit</div>
                  <div className="text-base font-mono font-bold text-slate-900 mt-0.5">{selectedVector.avgDebit}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-400 text-[11px]">Auto-Intercept Precision</div>
                  <div className="text-base font-mono font-bold text-emerald-600 mt-0.5">{selectedVector.autoInterceptRate}</div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Entity / Clustered Accounts</label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedVector.topTargetBanks.map((b, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-slate-100 text-slate-700 font-mono text-[11px]">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setSelectedVector(null)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition"
              >
                Close Threat Brief
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState } from 'react';

export const RulesEngineView: React.FC = () => {
  const [reverseCollectThreshold, setReverseCollectThreshold] = useState(70);
  const [screenShareKillswitch, setScreenShareKillswitch] = useState(true);
  const [muleAgeCutoffHours, setMuleAgeCutoffHours] = useState(6);
  const [digitalArrestExtortionFilter, setDigitalArrestExtortionFilter] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Pre-PIN Sovereign Rules &amp; Heuristic Thresholds</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Switch Layer Enforced
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Configure real-time sub-100ms algorithmic intercept criteria enforced across all 56 PSP switches.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            <span>Deploy to 56 Switches</span>
          </button>
        </div>

        {savedNotice && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              Rule configurations compiled and deployed to central NPCI switch cluster MUM-CORE-01.
            </span>
            <button onClick={() => setSavedNotice(false)} className="font-bold">×</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rule 1: Reverse Collect Intent */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-500 text-[20px]">swap_horiz</span>
              <span className="font-bold text-sm text-slate-900">Reverse Collect Intent Intercept</span>
            </div>
            <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Threshold: {reverseCollectThreshold}%
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-snug">
            Automatically halts transactions where the Payer App entered via a &ldquo;Refund/Claim&rdquo; context, but the switch instruction was framed as a debit collect request.
          </p>
          <div className="pt-2">
            <input
              type="range"
              min="40"
              max="95"
              value={reverseCollectThreshold}
              onChange={(e) => setReverseCollectThreshold(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>Strict (40%)</span>
              <span>Balanced (70%)</span>
              <span>Permissive (95%)</span>
            </div>
          </div>
        </div>

        {/* Rule 2: Remote Screen Mirroring Killswitch */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500 text-[20px]">screen_share</span>
              <span className="font-bold text-sm text-slate-900">Screen Mirroring Interlock</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={screenShareKillswitch}
                onChange={(e) => setScreenShareKillswitch(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <p className="text-xs text-slate-600 leading-snug">
            Mandatory block of PIN input screen if an active remote desktop session (AnyDesk, TeamViewer, RustDesk) or Android MediaProjection API is active.
          </p>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
            Status: {screenShareKillswitch ? <strong className="text-emerald-700">Enforced Pre-PIN</strong> : <span className="text-slate-400">Disabled</span>}
          </div>
        </div>

        {/* Rule 3: Ephemeral VPA Age Filter */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500 text-[20px]">timer</span>
              <span className="font-bold text-sm text-slate-900">Ephemeral Mule Quarantine</span>
            </div>
            <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Age &lt; {muleAgeCutoffHours} Hours
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-snug">
            Flag VPAs created within the threshold that exhibit sudden velocity spikes (e.g. &gt;10 inward transfers in the first hour of creation).
          </p>
          <div className="pt-2">
            <input
              type="range"
              min="1"
              max="24"
              value={muleAgeCutoffHours}
              onChange={(e) => setMuleAgeCutoffHours(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>1 Hour</span>
              <span>6 Hours</span>
              <span>24 Hours</span>
            </div>
          </div>
        </div>

        {/* Rule 4: Digital Arrest Extortion Detection */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-500 text-[20px]">video_camera_front</span>
              <span className="font-bold text-sm text-slate-900">Digital Arrest Extortion Filter</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={digitalArrestExtortionFilter}
                onChange={(e) => setDigitalArrestExtortionFilter(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <p className="text-xs text-slate-600 leading-snug">
            Applies deep heuristic scoring to detect video-call spoof extortion, large unprecedented debits, and claimed police/customs security deposit VPAs.
          </p>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
            Confidence requirement: <strong className="text-slate-800">0.85 SHAP</strong> (Zero false positive goal)
          </div>
        </div>
      </div>
    </div>
  );
};

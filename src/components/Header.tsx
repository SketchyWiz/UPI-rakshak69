import React, { useState } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeTab: 'command' | 'mule-graph' | 'rules' | 'compliance';
  onTabChange: (tab: 'command' | 'mule-graph' | 'rules' | 'compliance') => void;
  isLiveStreaming: boolean;
  onToggleStreaming: () => void;
  unreadAlertsCount: number;
  onSelectTxn: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  isLiveStreaming,
  onToggleStreaming,
  unreadAlertsCount,
  onSelectTxn
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showOfficerMenu, setShowOfficerMenu] = useState(false);

  const notifications = [
    { id: 'TXN-8841', time: '14:02:19', text: 'Critical: Fake Electricity Reverse Collect halted at pre-PIN gateway (₹4,999.00)', type: 'critical' },
    { id: 'TXN-8839', time: '14:02:16', text: 'High Risk: Defense Officer Impersonation intercepted (₹25,000.00)', type: 'high' },
    { id: 'TXN-8827', time: '14:01:58', text: 'Emergency: Law Enforcement Extortion / Digital Arrest freeze (₹1,45,000.00)', type: 'critical' },
    { id: 'SYS-01', time: '14:00:00', text: 'NPCI Mule Registry Hash Sync completed across 56 PSP switches', type: 'info' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Status */}
        <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
          <button 
            onClick={() => onTabChange('command')} 
            className="flex items-center gap-3 text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm hover:bg-blue-700 transition">
              <span className="material-symbols-outlined text-[20px]">shield</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-slate-900">UPI RAKSHA</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">AI</span>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">Pre-PIN Sovereign Intercept</span>
            </div>
          </button>

          <div className="h-6 w-px bg-slate-200 hidden lg:block"></div>

          {/* Live Status Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Protection Active</span>
            <span className="text-emerald-400 font-normal">|</span>
            <span className="font-mono text-[11px] font-normal text-emerald-800">NPCI Gateway 100% Synced</span>
          </div>
        </div>

        {/* Center Search / Context */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-400">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 text-xs rounded-lg bg-slate-100/70 border border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              placeholder="Search VPA, transaction hash, or account..."
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Action Controls & Officer Profile */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Live Stream Mode Toggle */}
          <button
            onClick={onToggleStreaming}
            title={isLiveStreaming ? "Pause incoming telemetry stream" : "Resume incoming telemetry stream"}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
              isLiveStreaming 
                ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' 
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLiveStreaming ? 'bg-rose-600 animate-ping' : 'bg-slate-400'}`}></span>
            <span>{isLiveStreaming ? 'Stream Active' : 'Stream Paused'}</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowOfficerMenu(false);
              }}
              className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {unreadAlertsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">High-Risk Intercept Feed</span>
                  <span className="text-[11px] font-mono text-emerald-600">Sub-second Alerting</span>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => {
                        if (n.id.startsWith('TXN')) {
                          onSelectTxn(n.id);
                          setShowNotifications(false);
                        }
                      }}
                      className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50/70 border border-slate-200 cursor-pointer transition text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-blue-600">{n.id}</span>
                        <span className="font-mono text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-slate-700 leading-snug">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-slate-200"></div>

          {/* Officer Profile & Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowOfficerMenu(!showOfficerMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2.5 text-left hover:opacity-90 transition focus:outline-none"
            >
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-slate-900">Officer V. Sharma</div>
                <div className="text-[11px] text-slate-500">Tier-1 Intercept Desk</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-semibold text-slate-700 text-xs">
                VS
              </div>
            </button>

            {/* Officer Menu */}
            {showOfficerMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 text-xs">
                <div className="pb-2 border-b border-slate-100 mb-2">
                  <div className="font-bold text-slate-900">Officer Vikramaditya Sharma</div>
                  <div className="text-slate-500 text-[11px]">NPCI Fraud Operations Unit #4</div>
                  <div className="mt-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                    Active Session: SOV-MUM-901
                  </div>
                </div>
                <div className="space-y-1">
                  <button 
                    onClick={() => { onTabChange('command'); setShowOfficerMenu(false); }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 flex items-center gap-2 text-slate-700"
                  >
                    <span className="material-symbols-outlined text-[16px] text-blue-600">dashboard</span>
                    Command Center
                  </button>
                  <button 
                    onClick={() => { onTabChange('mule-graph'); setShowOfficerMenu(false); }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 flex items-center gap-2 text-slate-700"
                  >
                    <span className="material-symbols-outlined text-[16px] text-indigo-600">hub</span>
                    Mule Network Tracer
                  </button>
                  <button 
                    onClick={() => { onTabChange('rules'); setShowOfficerMenu(false); }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 flex items-center gap-2 text-slate-700"
                  >
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">tune</span>
                    Heuristic Rule Engine
                  </button>
                  <button 
                    onClick={() => { onTabChange('compliance'); setShowOfficerMenu(false); }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 flex items-center gap-2 text-slate-700"
                  >
                    <span className="material-symbols-outlined text-[16px] text-amber-600">verified</span>
                    I4C Compliance &amp; Exports
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="border-t border-slate-100 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto text-xs py-1.5">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onTabChange('command')}
              className={`px-3 py-1 rounded-md font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'command'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">dashboard</span>
              <span>Command Center</span>
            </button>
            <button
              onClick={() => onTabChange('mule-graph')}
              className={`px-3 py-1 rounded-md font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'mule-graph'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">hub</span>
              <span>Mule Network Tracer</span>
            </button>
            <button
              onClick={() => onTabChange('rules')}
              className={`px-3 py-1 rounded-md font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'rules'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">tune</span>
              <span>Pre-PIN Sovereign Rules</span>
            </button>
            <button
              onClick={() => onTabChange('compliance')}
              className={`px-3 py-1 rounded-md font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'compliance'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">assignment</span>
              <span>I4C &amp; RBI Compliance</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Switch MUM-CORE-01
            </span>
            <span className="font-mono">Sync: 12s ago</span>
          </div>
        </div>
      </div>
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { KpiStrip } from './components/KpiStrip';
import { LiveInterceptCard } from './components/LiveInterceptCard';
import { EmergingVectorsCard } from './components/EmergingVectorsCard';
import { SystemHealthCard } from './components/SystemHealthCard';
import { RecentInterceptsTable } from './components/RecentInterceptsTable';
import { ForensicDrawer } from './components/ForensicDrawer';
import { MuleGraphView } from './components/MuleGraphView';
import { RulesEngineView } from './components/RulesEngineView';
import { ComplianceView } from './components/ComplianceView';
import { INITIAL_TRANSACTIONS } from './data/mockData';
import { InterceptTransaction } from './types';
import { exportTransactionsToCsv } from './utils/exportReport';

export default function App() {
  const [transactions, setTransactions] = useState<InterceptTransaction[]>(INITIAL_TRANSACTIONS);
  const [selectedTxnId, setSelectedTxnId] = useState<string>('TXN-8841');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'command' | 'mule-graph' | 'rules' | 'compliance'>('command');
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(false);
  const [unreadAlertsCount, setUnreadAlertsCount] = useState<number>(3);
  const [activeForensicTxn, setActiveForensicTxn] = useState<InterceptTransaction | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Metrics
  const [defendedCapital, setDefendedCapital] = useState<string>('₹4.82 Cr');
  const [interceptedCount, setInterceptedCount] = useState<number>(3842);
  const [latencyMs, setLatencyMs] = useState<number>(38);

  const currentSelectedTxn =
    transactions.find((t) => t.id === selectedTxnId) || transactions[0];

  // Live simulation ticker if streaming enabled
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      // Small jitter in decision latency between 36ms and 42ms
      const newLatency = Math.floor(Math.random() * 6) + 36;
      setLatencyMs(newLatency);

      // Increment count occasionally
      setInterceptedCount((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  // Handle action on transactions (Release, Escalate, Freeze)
  const handleAction = (actionType: 'release' | 'escalate' | 'freeze', txn: InterceptTransaction) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === txn.id) {
          return {
            ...t,
            status: actionType === 'freeze' ? 'frozen' : actionType === 'release' ? 'released' : 'escalated'
          };
        }
        return t;
      })
    );

    if (actionType === 'freeze') {
      setInterceptedCount((prev) => prev + 1);
    }
  };

  const handleExportReport = () => {
    exportTransactionsToCsv(transactions);
    setExportNotice('Forensic audit package exported to CSV with cryptographic hash seal.');
    setTimeout(() => setExportNotice(null), 4000);
  };

  // Filter transactions by search if provided
  const displayedTransactions = transactions.filter((t) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.id.toLowerCase().includes(q) ||
      t.victim.name.toLowerCase().includes(q) ||
      t.victim.vpa.toLowerCase().includes(q) ||
      t.payee.claimedName.toLowerCase().includes(q) ||
      t.payee.vpa.toLowerCase().includes(q) ||
      t.scamVector.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col font-sans">
      {/* Top Executive Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isLiveStreaming={isLiveStreaming}
        onToggleStreaming={() => setIsLiveStreaming(!isLiveStreaming)}
        unreadAlertsCount={unreadAlertsCount}
        onSelectTxn={(id) => {
          setSelectedTxnId(id);
          setActiveTab('command');
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Global Export Notice Toast */}
        {exportNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
              <span>{exportNotice}</span>
            </div>
            <button onClick={() => setExportNotice(null)} className="font-bold text-emerald-700 ml-4">
              Dismiss
            </button>
          </div>
        )}

        {/* View Switcher: Command Center is the primary pixel-perfect screen */}
        {activeTab === 'command' && (
          <>
            {/* Section 1: Executive KPI Strip */}
            <KpiStrip
              defendedCapital={defendedCapital}
              interceptedCount={interceptedCount}
              accuracy="98.4%"
              latencyMs={latencyMs}
            />

            {/* Section 2: Two-Column Focused Executive Workspace */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Priority Live Intercept Card (7 cols) */}
              <LiveInterceptCard
                transaction={currentSelectedTxn}
                onAction={handleAction}
                onOpenForensic={(t) => setActiveForensicTxn(t)}
              />

              {/* Right Column: Emerging Vectors & Gateway Health (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <EmergingVectorsCard />
                <SystemHealthCard />
              </div>
            </section>

            {/* Section 3: Clean Recent High-Risk Intercepts Table */}
            <RecentInterceptsTable
              transactions={displayedTransactions}
              selectedTxnId={selectedTxnId}
              onSelectTxn={(txn) => setSelectedTxnId(txn.id)}
              onOpenForensic={(txn) => setActiveForensicTxn(txn)}
              onExportReport={handleExportReport}
            />
          </>
        )}

        {activeTab === 'mule-graph' && <MuleGraphView />}

        {activeTab === 'rules' && <RulesEngineView />}

        {activeTab === 'compliance' && <ComplianceView onExportReport={handleExportReport} />}
      </main>

      {/* Deep-Dive Forensic Drawer / Modal */}
      {activeForensicTxn && (
        <ForensicDrawer
          transaction={activeForensicTxn}
          onClose={() => setActiveForensicTxn(null)}
          onAction={(type, txn) => {
            handleAction(type, txn);
            setActiveForensicTxn(null);
          }}
        />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { InterceptTransaction } from '../types';

interface RecentInterceptsTableProps {
  transactions: InterceptTransaction[];
  selectedTxnId: string;
  onSelectTxn: (txn: InterceptTransaction) => void;
  onOpenForensic: (txn: InterceptTransaction) => void;
  onExportReport: () => void;
}

export const RecentInterceptsTable: React.FC<RecentInterceptsTableProps> = ({
  transactions,
  selectedTxnId,
  onSelectTxn,
  onOpenForensic,
  onExportReport
}) => {
  const [filterType, setFilterType] = useState<string>('All Intercept Types');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const filteredTransactions = transactions.filter((txn) => {
    if (filterType === 'Critical Only (>90 Risk)') {
      return txn.riskScore >= 90;
    }
    if (filterType === 'Reverse Collect Scams') {
      return txn.scamVector.toLowerCase().includes('reverse collect');
    }
    if (filterType === 'Impersonation Scams') {
      return txn.scamVector.toLowerCase().includes('impersonation') || txn.scamVector.toLowerCase().includes('officer');
    }
    if (filterType === 'Extortion & Digital Arrest') {
      return txn.scamVector.toLowerCase().includes('extortion') || txn.scamVector.toLowerCase().includes('arrest');
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const getScamBadgeStyle = (vector: string) => {
    if (vector.includes('Reverse Collect') || vector.includes('Extortion')) {
      return 'bg-rose-50 text-rose-700';
    }
    if (vector.includes('Impersonation') || vector.includes('Defense')) {
      return 'bg-amber-50 text-amber-800';
    }
    return 'bg-slate-100 text-slate-700';
  };

  const getRiskScoreBadgeStyle = (score: number) => {
    if (score >= 90) {
      return 'bg-rose-100 text-rose-800';
    }
    if (score >= 80) {
      return 'bg-amber-100 text-amber-800';
    }
    return 'bg-amber-50 text-amber-700';
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Table Header & Controls */}
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Recent High-Risk Intercepts</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time audit log of pre-authorization actions across payment networks
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs rounded-lg border border-slate-300 text-slate-700 bg-white py-1.5 pl-3 pr-8 focus:ring-blue-600 focus:border-blue-600"
          >
            <option>All Intercept Types</option>
            <option>Critical Only (&gt;90 Risk)</option>
            <option>Reverse Collect Scams</option>
            <option>Impersonation Scams</option>
            <option>Extortion &amp; Digital Arrest</option>
          </select>
          <button
            onClick={onExportReport}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
              <th className="py-3.5 px-6">Timestamp</th>
              <th className="py-3.5 px-4">TXN ID</th>
              <th className="py-3.5 px-4">Claimed Entity vs Payee</th>
              <th className="py-3.5 px-4">Scam Vector</th>
              <th className="py-3.5 px-4 text-right">Amount</th>
              <th className="py-3.5 px-4 text-center">Risk Score</th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal">
            {currentItems.map((txn) => {
              const isSelected = txn.id === selectedTxnId;
              return (
                <tr
                  key={txn.id}
                  className={`transition-colors cursor-pointer ${
                    isSelected ? 'bg-blue-50/60 font-medium' : 'hover:bg-slate-50/80'
                  }`}
                  onClick={() => onSelectTxn(txn)}
                >
                  <td className="py-3.5 px-6 font-mono text-slate-500 whitespace-nowrap">
                    {txn.timestamp}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 whitespace-nowrap">
                    {txn.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-900">{txn.payee.claimedName}</div>
                    <div className="text-[11px] font-mono text-rose-600">{txn.payee.vpa}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${getScamBadgeStyle(
                        txn.scamVector
                      )}`}
                    >
                      {txn.scamVector}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                    ₹{txn.payee.attemptedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-extrabold ${getRiskScoreBadgeStyle(
                        txn.riskScore
                      )}`}
                    >
                      {txn.riskScore} / 100
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTxn(txn);
                          onOpenForensic(txn);
                        }}
                        className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Review →
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer / Pagination */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          Showing{' '}
          <span className="font-semibold text-slate-700">
            {startIndex + 1} to {Math.min(startIndex + itemsPerPage, 3842)}
          </span>{' '}
          of <span className="font-semibold text-slate-700">3,842</span> intercepts
        </div>
        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(1)}
            className={`px-2.5 py-1 rounded border font-medium ${
              currentPage === 1
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            1
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            className={`px-2.5 py-1 rounded border font-medium ${
              currentPage === 2
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            2
          </button>
          <button
            onClick={() => setCurrentPage(3)}
            className={`px-2.5 py-1 rounded border font-medium ${
              currentPage === 3
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button
            disabled={currentPage === 3}
            onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
            className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

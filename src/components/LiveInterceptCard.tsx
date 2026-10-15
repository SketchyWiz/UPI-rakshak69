import React, { useState } from 'react';
import { InterceptTransaction } from '../types';

interface LiveInterceptCardProps {
  transaction: InterceptTransaction;
  onAction: (actionType: 'release' | 'escalate' | 'freeze', txn: InterceptTransaction) => void;
  onOpenForensic: (txn: InterceptTransaction) => void;
}

export const LiveInterceptCard: React.FC<LiveInterceptCardProps> = ({
  transaction,
  onAction,
  onOpenForensic
}) => {
  const [actionFeedback, setActionFeedback] = useState<{
    type: 'release' | 'escalate' | 'freeze';
    message: string;
    subtext: string;
  } | null>(null);

  const handleActionClick = (type: 'release' | 'escalate' | 'freeze') => {
    let message = '';
    let subtext = '';

    if (type === 'freeze') {
      message = `VPA Frozen: ${transaction.payee.vpa} blocked across all 56 PSP switches.`;
      subtext = `${transaction.payee.bank} notified. Pre-authorization lock confirmed at switch level.`;
    } else if (type === 'release') {
      message = 'Override Confirmed: Transaction marked as legitimate.';
      subtext = 'Cleared for PIN authorization. Operator sign-off recorded in NPCI audit log.';
    } else if (type === 'escalate') {
      message = 'NPCI Escalation: Telemetry routed to Central Fraud Registry.';
      subtext = 'High-Priority zero-day audit package dispatched to I4C Cybercrime Exchange.';
    }

    setActionFeedback({ type, message, subtext });
    onAction(type, transaction);
  };

  return (
    <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
      <div>
        {/* Alert Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  {transaction.id}: {transaction.scamVector}
                </h2>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                  transaction.riskScore >= 90
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {transaction.riskLevel}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {transaction.latencyBeforePin}
              </p>
            </div>
          </div>

          {/* Risk Score Badge */}
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 ${
              transaction.riskScore >= 90 
                ? 'bg-rose-50 border-rose-200 text-rose-700' 
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}>
              <span className="text-xs font-semibold">Risk Score</span>
              <span className="font-mono text-base font-extrabold">
                {transaction.riskScore} / 100
              </span>
            </div>
          </div>
        </div>

        {/* Payer vs Payee Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          {/* Payer / Victim */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Debit Entity (Victim)
              </span>
              {transaction.victim.kyc && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  <span className="material-symbols-outlined text-[12px]">verified</span> KYC Verified
                </span>
              )}
            </div>
            <div className="text-sm font-bold text-slate-900">{transaction.victim.name}</div>
            <div className="text-xs font-mono text-slate-600 mt-0.5">{transaction.victim.vpa}</div>
            <div className="mt-3 text-xs text-slate-500 pt-2 border-t border-slate-200 flex items-center justify-between">
              <span>Account Type: <strong className="text-slate-700">{transaction.victim.accountType}</strong></span>
              <span>Normal: <strong className="text-slate-700">{transaction.victim.normalRange}</strong></span>
            </div>
          </div>

          {/* Deceptive Payee */}
          <div className="p-4 rounded-lg bg-rose-50/50 border border-rose-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                Target Mule (Payee)
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                {transaction.payee.ageBadge}
              </span>
            </div>
            <div className="text-sm font-bold text-slate-900">
              Claimed: &ldquo;{transaction.payee.claimedName}&rdquo;
            </div>
            <div className="text-xs font-mono text-rose-600 font-semibold mt-0.5">
              {transaction.payee.vpa}
            </div>
            <div className="mt-3 text-xs text-slate-600 pt-2 border-t border-rose-200/60 flex items-center justify-between">
              <span>Attempted Amount: <strong className="text-rose-700 font-bold">₹{transaction.payee.attemptedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong></span>
              {transaction.payee.flaggedIp && (
                <span className="text-[11px] text-rose-600 font-medium">Flagged IP</span>
              )}
            </div>
          </div>
        </div>

        {/* Top 3 Plain-Language Risk Drivers */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Key AI Intercept Drivers (SHAP Diagnostics)
            </h3>
            <button
              onClick={() => onOpenForensic(transaction)}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <span>Inspect Telemetry</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          {transaction.shapDrivers.map((driver) => (
            <div
              key={driver.id}
              className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className={`material-symbols-outlined text-[16px] ${
                    driver.barColor === 'bg-rose-500' ? 'text-rose-500' :
                    driver.barColor === 'bg-amber-500' ? 'text-amber-500' : 'text-blue-500'
                  }`}>
                    {driver.icon}
                  </span>
                  {driver.title}
                </span>
                <span className={`font-mono font-bold ${
                  driver.barColor === 'bg-rose-500' ? 'text-rose-600' :
                  driver.barColor === 'bg-amber-500' ? 'text-amber-600' : 'text-blue-600'
                }`}>
                  {driver.contribution}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`${driver.barColor} h-1.5 rounded-full transition-all duration-700`}
                  style={{ width: `${driver.percentWidth}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-500">{driver.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Analyst Primary Action Controls */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium">Analyst Action Required:</span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Action: False Positive / Release */}
            <button
              onClick={() => handleActionClick('release')}
              className="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 transition active:scale-95"
            >
              Release as Legitimate
            </button>
            {/* Action: Escalate */}
            <button
              onClick={() => handleActionClick('escalate')}
              className="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-blue-200 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition active:scale-95"
            >
              Escalate to NPCI
            </button>
            {/* Action: Freeze (Primary) */}
            <button
              onClick={() => handleActionClick('freeze')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">gavel</span>
              <span>Block &amp; Freeze Mule VPA</span>
            </button>
          </div>
        </div>

        {/* Dynamic Action Notification */}
        {actionFeedback && (
          <div
            className={`mt-3 p-3 rounded-lg text-xs border flex items-center justify-between animate-in fade-in duration-200 ${
              actionFeedback.type === 'freeze'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : actionFeedback.type === 'escalate'
                ? 'bg-blue-50 border-blue-200 text-blue-800'
                : 'bg-slate-100 border-slate-300 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                {actionFeedback.type === 'freeze' ? 'block' : actionFeedback.type === 'escalate' ? 'send' : 'check_circle'}
              </span>
              <div>
                <strong>{actionFeedback.message}</strong>
                <p className="text-[11px] opacity-90 mt-0.5">{actionFeedback.subtext}</p>
              </div>
            </div>
            <button
              onClick={() => setActionFeedback(null)}
              className="text-slate-500 hover:text-slate-800 font-bold ml-3"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

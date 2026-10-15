import React, { useState } from 'react';
import { InterceptTransaction } from '../types';

interface ForensicDrawerProps {
  transaction: InterceptTransaction | null;
  onClose: () => void;
  onAction: (actionType: 'release' | 'escalate' | 'freeze', txn: InterceptTransaction) => void;
}

export const ForensicDrawer: React.FC<ForensicDrawerProps> = ({
  transaction,
  onClose,
  onAction
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'iso8583' | 'device' | 'fir'>('timeline');
  const [copiedPayload, setCopiedPayload] = useState(false);

  if (!transaction) return null;

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(transaction, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200 overflow-hidden">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">fingerprint</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-slate-900">{transaction.id}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                  {transaction.riskLevel}
                </span>
                <span className="font-mono text-xs font-extrabold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                  Score: {transaction.riskScore}/100
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{transaction.scamVector} • Pre-PIN Sovereign Halt</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-5 pt-2 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`pb-2 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'timeline'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">timer</span>
            Sub-second Timeline (410ms)
          </button>
          <button
            onClick={() => setActiveTab('iso8583')}
            className={`pb-2 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'iso8583'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">data_object</span>
            ISO 8583 Packet
          </button>
          <button
            onClick={() => setActiveTab('device')}
            className={`pb-2 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'device'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">devices</span>
            Device &amp; SIM Intel
          </button>
          <button
            onClick={() => setActiveTab('fir')}
            className={`pb-2 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'fir'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">gavel</span>
            Cyber Cell Dossier
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          {/* TAB 1: Sub-second Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-blue-900 leading-relaxed">
                <strong>Pre-PIN Sovereign Intercept Architecture:</strong> Evaluation took place within <strong>38ms</strong> of switch routing, halting the transaction <strong>410ms before the victim could enter their UPI PIN</strong> on their mobile handset.
              </div>

              <div className="relative pl-6 border-l-2 border-slate-200 space-y-6 my-4">
                {transaction.timeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                      step.status === 'critical' ? 'border-rose-500 text-rose-500' :
                      step.status === 'warning' ? 'border-amber-500 text-amber-500' :
                      'border-emerald-500 text-emerald-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        step.status === 'critical' ? 'bg-rose-500' :
                        step.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                        +{step.ms}ms
                      </span>
                      <span className="font-bold text-slate-900">{step.title}</span>
                    </div>
                    <p className="text-slate-600 mt-1">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* SHAP Breakdown */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-3">
                  SHAP Explainability Waterfall Weights
                </h4>
                <div className="space-y-2.5">
                  {transaction.shapDrivers.map((driver) => (
                    <div key={driver.id} className="space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-700">{driver.title}</span>
                        <span className="font-mono text-rose-600">{driver.contribution}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div className={`${driver.barColor} h-1.5 rounded-full`} style={{ width: `${driver.percentWidth}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ISO 8583 Packet */}
          {activeTab === 'iso8583' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Decoded UPI 2.0 Switch Message</span>
                <button
                  onClick={handleCopyPayload}
                  className="px-2.5 py-1 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                  <span>{copiedPayload ? 'Copied!' : 'Copy JSON'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-400 text-[11px]">MTI (Message Type Identifier)</div>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">{transaction.isoTelemetry.mti}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-400 text-[11px]">RRN (Retrieval Reference Num)</div>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">{transaction.isoTelemetry.rrn}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-400 text-[11px]">Payer PSP</div>
                  <div className="font-mono font-semibold text-slate-900 mt-0.5">{transaction.isoTelemetry.payerPsp}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-400 text-[11px]">Payee PSP</div>
                  <div className="font-mono font-semibold text-rose-600 mt-0.5">{transaction.isoTelemetry.payeePsp}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-400 text-[11px]">Merchant Category Code (MCC)</div>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">{transaction.isoTelemetry.merchantCategoryCode}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-400 text-[11px]">NPCI Central Switch ID</div>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">{transaction.isoTelemetry.switchId}</div>
                </div>
              </div>

              <div className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed">
                <code>
                  {`{
  "protocol": "NPCI_UPI_2.0",
  "txn_id": "${transaction.id}",
  "channel": "${transaction.isoTelemetry.channel}",
  "payer_vpa": "${transaction.victim.vpa}",
  "payer_bank": "${transaction.victim.bank}",
  "payee_vpa": "${transaction.payee.vpa}",
  "payee_name": "${transaction.payee.claimedName}",
  "payee_mule_ip": "${transaction.payee.ipAddress}",
  "amount_inr": ${transaction.payee.attemptedAmount},
  "pre_auth_action": "SOVEREIGN_PIN_HALT",
  "decision_latency_ms": 38
}`}
                </code>
              </div>
            </div>
          )}

          {/* TAB 3: Device & SIM Intel */}
          {activeTab === 'device' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Victim Handset Telemetry
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Operating System</span>
                    <span className="font-semibold text-slate-800">{transaction.deviceIntel.os}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">UPI Client Application</span>
                    <span className="font-semibold text-slate-800">{transaction.deviceIntel.appVersion}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Remote Screen Mirroring</span>
                    <span className={`font-semibold ${transaction.deviceIntel.screenSharingApp ? 'text-rose-600 font-bold' : 'text-emerald-600'}`}>
                      {transaction.deviceIntel.screenSharingApp || 'None detected'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">SIM Age / Swap Anomaly</span>
                    <span className="font-semibold text-slate-800">{transaction.deviceIntel.simAgeDays} days old (Normal)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Device Integrity / Rooting</span>
                    <span className="font-semibold text-emerald-600">Pass (SafetyNet / Play Integrity Valid)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-200 space-y-2">
                <h4 className="font-bold text-rose-800 uppercase tracking-wider text-[11px]">
                  Payee Mule Intelligence
                </h4>
                <div className="text-slate-700 space-y-1">
                  <div><strong>Reported Location:</strong> {transaction.payee.location}</div>
                  <div><strong>Mule Routing IP:</strong> {transaction.payee.ipAddress}</div>
                  <div><strong>Account Lifespan:</strong> {transaction.payee.ageBadge}</div>
                  <div><strong>Beneficiary Bank:</strong> {transaction.payee.bank} ({transaction.payee.ifsc})</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Cyber Cell Dossier */}
          {activeTab === 'fir' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 leading-relaxed">
                <strong>I4C National Cybercrime Reporting Portal Draft:</strong> Automatically generated forensic evidence package ready for transmission to Ministry of Home Affairs (MHA) cyber cell.
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 space-y-2 whitespace-pre-wrap">
{`COMPLAINT DRAFT — SECTION 66D IT ACT & IPC 420
--------------------------------------------------
INCIDENT ID: ${transaction.id}
PRE-PIN INTERCEPT TIMESTAMP: ${transaction.timestamp} IST
INCIDENT CATEGORY: ${transaction.scamVector}

VICTIM DETAILS:
- Name: ${transaction.victim.name}
- Bank: ${transaction.victim.bank}
- Registered VPA: ${transaction.victim.vpa}
- City: ${transaction.victim.city}

MULE SUSPECT DETAILS:
- Fake Merchant Persona: "${transaction.payee.claimedName}"
- Mule VPA: ${transaction.payee.vpa}
- Bank Account: ${transaction.payee.bank}
- Geo IP Trace: ${transaction.payee.ipAddress}
- Attempted Fraud Amount: ₹${transaction.payee.attemptedAmount.toFixed(2)}

SOVEREIGN DEFENSE STATUS:
Debit halted before beneficiary credit. Funds 100% safeguarded.`}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => alert(`I4C Cybercrime FIR incident ${transaction.id} generated and dispatched.`)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
                >
                  Transmit to I4C Cybercrime Exchange
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Action Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => onAction('release', transaction)}
            className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 transition"
          >
            Release (False Positive)
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAction('escalate', transaction)}
              className="px-3 py-2 rounded-lg border border-blue-200 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
            >
              Escalate to NPCI
            </button>
            <button
              onClick={() => onAction('freeze', transaction)}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">gavel</span>
              <span>Block &amp; Freeze Mule VPA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

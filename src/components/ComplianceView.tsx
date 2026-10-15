import React, { useState } from 'react';

interface ComplianceViewProps {
  onExportReport: () => void;
}

export const ComplianceView: React.FC<ComplianceViewProps> = ({ onExportReport }) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (format: string) => {
    onExportReport();
    setDownloadSuccess(`Exported ${format} package with SHA-256 integrity seal.`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Regulatory Compliance &amp; I4C Sovereign Audit</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Statutory Audit Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Aligned with Reserve Bank of India (RBI) Master Circular on Fraud Risk Management and MHA I4C Exchange.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownload('STIX 2.1 Threat Intel')}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>Export STIX 2.1</span>
            </button>
            <button
              onClick={() => handleDownload('NPCI Regulatory CSV')}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Full Audit CSV</span>
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              {downloadSuccess}
            </span>
            <button onClick={() => setDownloadSuccess(null)} className="font-bold">×</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {/* Compliance Card 1 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">RBI Digital Payment Mandate</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              100% Compliant
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            All 3,842 intercepts occurred pre-authorization with cryptographic proof of zero user liability under RBI circular DPSS.CO.PD.No.262/02.14.003.
          </p>
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-slate-600">
            Audit Certification Hash: <br />
            <code className="text-[10px] font-mono font-bold text-slate-800">0x8a92f01...d8e19</code>
          </div>
        </div>

        {/* Compliance Card 2 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">I4C National Registry Sync</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
              Active Sync
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Automated bi-directional relay with the Indian Cyber Crime Coordination Centre (I4C) for real-time mule account blacklisting across public and private banks.
          </p>
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-slate-600">
            Last Relay: <strong className="text-emerald-700">12 seconds ago</strong><br />
            Synchronized Nodes: <strong className="text-slate-800">1,489,201 VPAs</strong>
          </div>
        </div>

        {/* Compliance Card 3 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">NPCI Switch Integrity SLA</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              38ms / &lt;100ms SLA
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Pre-PIN sovereign AI evaluation adds under 40ms of total switch latency, ensuring legitimate UPI payments complete with zero perceptible hesitation.
          </p>
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-slate-600">
            Total Throughput: <strong className="text-slate-800">48,219 TPS</strong><br />
            SLA Violations (24h): <strong className="text-emerald-700">0.000%</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

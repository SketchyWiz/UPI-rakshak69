import React, { useState } from 'react';

export const MuleGraphView: React.FC = () => {
  const [frozenNodes, setFrozenNodes] = useState<string[]>(['mule1']);
  const [selectedNode, setSelectedNode] = useState<string>('mule1');

  const toggleFreeze = (nodeId: string) => {
    if (frozenNodes.includes(nodeId)) {
      setFrozenNodes(frozenNodes.filter((id) => id !== nodeId));
    } else {
      setFrozenNodes([...frozenNodes, nodeId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Mule Hop &amp; Laundering Network Intelligence</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Multi-Switch Graph
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Visualizing downstream syndicate hops from <strong>fastag-mule-9821@airtel</strong> to offramp nodes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Syndicate Origin:</span>
            <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded border border-rose-200">
              Mewat-Bharatpur Cluster #08
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Hop Diagram */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
          Pre-Authorization Fund Flow Intercept Map
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Node 1: Victim */}
          <div
            onClick={() => setSelectedNode('victim')}
            className={`p-4 rounded-xl border-2 transition cursor-pointer ${
              selectedNode === 'victim' ? 'border-emerald-500 bg-emerald-50/40 shadow-sm' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100 px-2 py-0.5 rounded">
                Protected Origin
              </span>
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified_user</span>
            </div>
            <div className="font-bold text-slate-900 text-sm">Rameshwar Pendse</div>
            <div className="font-mono text-xs text-slate-600 mt-0.5">rameshwar.pendse@hdfcbank</div>
            <div className="mt-3 text-[11px] text-slate-500 pt-2 border-t border-slate-200 flex justify-between">
              <span>HDFC Bank A/C</span>
              <span className="font-bold text-slate-800">₹4,999 Safeguarded</span>
            </div>
          </div>

          {/* Node 2: Mule L1 */}
          <div
            onClick={() => setSelectedNode('mule1')}
            className={`p-4 rounded-xl border-2 transition cursor-pointer relative ${
              selectedNode === 'mule1' ? 'border-rose-500 bg-rose-50/40 shadow-sm' : 'border-rose-200 bg-rose-50/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-rose-700 uppercase bg-rose-100 px-2 py-0.5 rounded">
                Mule Layer 1 (Inbound)
              </span>
              <span className="material-symbols-outlined text-rose-600 text-[18px]">gavel</span>
            </div>
            <div className="font-bold text-slate-900 text-sm">fastag-mule-9821@airtel</div>
            <div className="font-mono text-xs text-rose-600 font-semibold mt-0.5">Airtel Payments Bank</div>
            <div className="mt-3 text-[11px] text-slate-500 pt-2 border-t border-rose-200 flex justify-between items-center">
              <span>Age: 2.8h</span>
              <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                frozenNodes.includes('mule1') ? 'bg-rose-600 text-white' : 'bg-amber-100 text-amber-800'
              }`}>
                {frozenNodes.includes('mule1') ? 'Lien Placed' : 'Active'}
              </span>
            </div>
          </div>

          {/* Node 3: Mule L2 */}
          <div
            onClick={() => setSelectedNode('mule2')}
            className={`p-4 rounded-xl border-2 transition cursor-pointer ${
              selectedNode === 'mule2' ? 'border-amber-500 bg-amber-50/40 shadow-sm' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-amber-800 uppercase bg-amber-100 px-2 py-0.5 rounded">
                Mule Layer 2 (Buffer)
              </span>
              <span className="material-symbols-outlined text-amber-600 text-[18px]">account_tree</span>
            </div>
            <div className="font-bold text-slate-900 text-sm">Canara Current A/C</div>
            <div className="font-mono text-xs text-slate-600 mt-0.5">CNRB0001092 • Kolkata</div>
            <div className="mt-3 text-[11px] text-slate-500 pt-2 border-t border-slate-200 flex justify-between items-center">
              <span>Velocity: 4.2s sweep</span>
              <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                frozenNodes.includes('mule2') ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {frozenNodes.includes('mule2') ? 'Lien Placed' : 'Monitoring'}
              </span>
            </div>
          </div>

          {/* Node 4: Off-ramp */}
          <div
            onClick={() => setSelectedNode('crypto')}
            className={`p-4 rounded-xl border-2 transition cursor-pointer ${
              selectedNode === 'crypto' ? 'border-indigo-500 bg-indigo-50/40 shadow-sm' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-indigo-700 uppercase bg-indigo-100 px-2 py-0.5 rounded">
                Offshore Exit
              </span>
              <span className="material-symbols-outlined text-indigo-600 text-[18px]">currency_exchange</span>
            </div>
            <div className="font-bold text-slate-900 text-sm">P2P Crypto OTC Exchanger</div>
            <div className="font-mono text-xs text-slate-600 mt-0.5">USDT Tron TRC-20 Wallet</div>
            <div className="mt-3 text-[11px] text-slate-500 pt-2 border-t border-slate-200 flex justify-between items-center">
              <span>I4C Flag: Yes</span>
              <span className="font-bold text-rose-600 text-[10px]">Blocked</span>
            </div>
          </div>
        </div>

        {/* Selected Node Details Box */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-bold text-slate-800">
              Selected Entity: {selectedNode.toUpperCase()}
            </span>
            <p className="text-slate-600 mt-0.5">
              NPCI Inter-Bank Lien Protocol allows immediate debit freeze instructions to be communicated to destination core banking systems.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFreeze(selectedNode)}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition ${
                frozenNodes.includes(selectedNode)
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-rose-600 text-white hover:bg-rose-700'
              }`}
            >
              {frozenNodes.includes(selectedNode) ? 'Remove Lien' : 'Place Instant Banking Lien'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

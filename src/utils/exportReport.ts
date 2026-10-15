import { InterceptTransaction } from '../types';

export const exportTransactionsToCsv = (transactions: InterceptTransaction[]) => {
  const headers = [
    'TXN_ID',
    'TIMESTAMP',
    'PAYER_NAME',
    'PAYER_VPA',
    'PAYER_BANK',
    'PAYEE_CLAIMED_NAME',
    'PAYEE_MULE_VPA',
    'PAYEE_BANK',
    'SCAM_VECTOR',
    'RISK_SCORE',
    'ATTEMPTED_AMOUNT_INR',
    'ACTION_STATUS',
    'SWITCH_ID',
    'PRE_AUTH_LATENCY'
  ];

  const rows = transactions.map((t) => [
    t.id,
    t.timestamp,
    `"${t.victim.name}"`,
    t.victim.vpa,
    t.victim.bank,
    `"${t.payee.claimedName}"`,
    t.payee.vpa,
    t.payee.bank,
    `"${t.scamVector}"`,
    t.riskScore,
    t.payee.attemptedAmount,
    t.status,
    t.isoTelemetry.switchId,
    t.latencyBeforePin
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `UPI_RAKSHA_FORENSIC_AUDIT_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export interface InterceptTransaction {
  id: string;
  timestamp: string;
  victim: {
    name: string;
    vpa: string;
    kyc: boolean;
    accountType: string;
    normalRange: string;
    bank: string;
    phone: string;
    city: string;
  };
  payee: {
    claimedName: string;
    vpa: string;
    ageBadge: string;
    ageHours: number;
    flaggedIp: boolean;
    attemptedAmount: number;
    bank: string;
    ifsc: string;
    ipAddress: string;
    location: string;
  };
  scamVector: string;
  riskScore: number;
  riskLevel: 'Critical Risk' | 'High Risk' | 'Elevated' | 'Monitoring';
  latencyBeforePin: string;
  shapDrivers: Array<{
    id: string;
    title: string;
    contribution: string;
    percentWidth: number;
    barColor: string;
    description: string;
    icon: string;
  }>;
  status: 'intercepted' | 'frozen' | 'released' | 'escalated';
  timeline: Array<{
    ms: number;
    title: string;
    desc: string;
    status: 'pass' | 'warning' | 'critical';
  }>;
  deviceIntel: {
    os: string;
    screenSharingApp: string | null;
    simAgeDays: number;
    callForwarding: boolean;
    rooted: boolean;
    appVersion: string;
  };
  isoTelemetry: {
    mti: string;
    rrn: string;
    switchId: string;
    payerPsp: string;
    payeePsp: string;
    merchantCategoryCode: string;
    channel: string;
  };
}

export interface FraudVector {
  id: string;
  title: string;
  badgeText: string;
  hits: number;
  description: string;
  avgDebit: string;
  autoInterceptRate: string;
  severity: 'critical' | 'elevated' | 'monitoring';
  pattern: string;
  countermeasure: string;
  topTargetBanks: string[];
}

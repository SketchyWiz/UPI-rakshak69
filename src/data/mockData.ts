import { InterceptTransaction, FraudVector } from '../types';

export const INITIAL_TRANSACTIONS: InterceptTransaction[] = [
  {
    id: 'TXN-8841',
    timestamp: '14:02:19',
    victim: {
      name: 'Rameshwar K. Pendse',
      vpa: 'rameshwar.pendse@hdfcbank',
      kyc: true,
      accountType: 'Salary',
      normalRange: '₹250 - ₹1.2k',
      bank: 'HDFC Bank',
      phone: '+91 98230 •••••',
      city: 'Pune, Maharashtra'
    },
    payee: {
      claimedName: 'MSEB Refund Desk',
      vpa: 'fastag-mule-9821@airtel',
      ageBadge: 'Ephemeral (2.8h Old)',
      ageHours: 2.8,
      flaggedIp: true,
      attemptedAmount: 4999.0,
      bank: 'Airtel Payments Bank',
      ifsc: 'AIRP0000001',
      ipAddress: '103.212.44.18 (Mewat Hub via NordVPN)',
      location: 'Nuh, Haryana'
    },
    scamVector: 'Reverse Collect Intent',
    riskScore: 94,
    riskLevel: 'Critical Risk',
    latencyBeforePin: 'Intercepted 410ms before PIN submission • Immediate Analyst Review Required',
    shapDrivers: [
      {
        id: 'driver-1',
        title: 'Reverse Collect Intent',
        contribution: '+38% Risk Contribution',
        percentWidth: 76,
        barColor: 'bg-rose-500',
        description: 'Victim was promised a refund payout, but the app received a collect debit instruction.',
        icon: 'swap_horiz'
      },
      {
        id: 'driver-2',
        title: 'Remote Screen Mirror Active',
        contribution: '+29% Risk Contribution',
        percentWidth: 58,
        barColor: 'bg-amber-500',
        description: 'Victim device has an active screen sharing session (AnyDesk signature detected).',
        icon: 'screen_share'
      },
      {
        id: 'driver-3',
        title: 'New Ephemeral Mule VPA',
        contribution: '+21% Risk Contribution',
        percentWidth: 42,
        barColor: 'bg-blue-600',
        description: 'Payee VPA was created less than 3 hours ago with immediate high velocity fan-out.',
        icon: 'timer'
      }
    ],
    status: 'intercepted',
    timeline: [
      { ms: 0, title: 'Inbound Collect Request Ingested', desc: 'Airtel Payments Bank gateway fired UPI 2.0 collect request.', status: 'pass' },
      { ms: 92, title: 'Victim Device Telemetry Packet Captured', desc: 'AnyDesk com.anydesk.adservice active on port 7070.', status: 'warning' },
      { ms: 214, title: 'AI Sovereign Intercept Model Evaluated', desc: 'SHAP ensemble confidence: 0.942 against zero-day dataset.', status: 'critical' },
      { ms: 388, title: 'Pre-PIN Switch Interlock Triggered', desc: 'NPCI switch flag PRE_AUTH_HALT emitted. Debit held in escrow.', status: 'critical' },
      { ms: 410, title: 'Intercept Freeze Broadcasted', desc: 'Victim app displayed sovereign protection modal. PIN prompt blocked.', status: 'critical' }
    ],
    deviceIntel: {
      os: 'Android 14 (OxygenOS 14.1)',
      screenSharingApp: 'AnyDesk v7.2.1 (Port 7070 active broadcast)',
      simAgeDays: 480,
      callForwarding: false,
      rooted: false,
      appVersion: 'PhonePe v24.08.12'
    },
    isoTelemetry: {
      mti: '0100 (Authorization Request)',
      rrn: '428800192841',
      switchId: 'NPCI-SW-MUM-04',
      payerPsp: 'HDFC Bank PSP',
      payeePsp: 'Airtel Payments Bank',
      merchantCategoryCode: '4900 (Utilities - Electric/Gas)',
      channel: 'UPI_COLLECT_INTENT'
    }
  },
  {
    id: 'TXN-8839',
    timestamp: '14:02:16',
    victim: {
      name: 'Sunita Rao',
      vpa: 'srao.axis@okaxis',
      kyc: true,
      accountType: 'Savings',
      normalRange: '₹500 - ₹3.5k',
      bank: 'Axis Bank',
      phone: '+91 97110 •••••',
      city: 'Secunderabad, Telangana'
    },
    payee: {
      claimedName: 'Army Canteen Vehicle Sale',
      vpa: 'subedar.sharma99@sbi',
      ageBadge: 'Mule Layer-1 (6.2h Old)',
      ageHours: 6.2,
      flaggedIp: true,
      attemptedAmount: 25000.0,
      bank: 'State Bank of India',
      ifsc: 'SBIN0004121',
      ipAddress: '117.205.81.19 (Bharatpur Hub)',
      location: 'Bharatpur, Rajasthan'
    },
    scamVector: 'Defense Officer Impersonation',
    riskScore: 88,
    riskLevel: 'High Risk',
    latencyBeforePin: 'Intercepted 365ms before PIN submission • Immediate Analyst Review Required',
    shapDrivers: [
      {
        id: 'driver-1',
        title: 'Defense Canteen Forgery Signature',
        contribution: '+34% Risk Contribution',
        percentWidth: 68,
        barColor: 'bg-amber-500',
        description: 'VPA naming pattern matches OLX defense transfer impersonation cluster.',
        icon: 'badge'
      },
      {
        id: 'driver-2',
        title: 'Rapid Beneficiary Outflow Pattern',
        contribution: '+28% Risk Contribution',
        percentWidth: 56,
        barColor: 'bg-rose-500',
        description: 'Target account exhausts incoming transfers within 90 seconds to crypto wallets.',
        icon: 'trending_up'
      },
      {
        id: 'driver-3',
        title: 'Geographic Entropy Deviation',
        contribution: '+26% Risk Contribution',
        percentWidth: 52,
        barColor: 'bg-blue-600',
        description: 'Victim in Hyderabad paying alleged canteen located in border transit.',
        icon: 'explore'
      }
    ],
    status: 'intercepted',
    timeline: [
      { ms: 0, title: 'Inbound P2P Transfer Initiated', desc: 'Payer scanned dynamic QR sent over WhatsApp.', status: 'pass' },
      { ms: 110, title: 'Mule Registry Cross-Check', desc: 'Account flagged in I4C Bharatpur defense cluster.', status: 'critical' },
      { ms: 290, title: 'Pre-PIN Sovereign Intercept Enforced', desc: 'Debit prevented before beneficiary settlement.', status: 'critical' }
    ],
    deviceIntel: {
      os: 'iOS 17.5.1 (iPhone 14)',
      screenSharingApp: null,
      simAgeDays: 720,
      callForwarding: false,
      rooted: false,
      appVersion: 'Google Pay v192.1'
    },
    isoTelemetry: {
      mti: '0200 (Financial Transaction Request)',
      rrn: '428800192839',
      switchId: 'NPCI-SW-HYD-01',
      payerPsp: 'Google Pay / Axis Bank',
      payeePsp: 'State Bank of India',
      merchantCategoryCode: '5511 (Car & Truck Dealers)',
      channel: 'UPI_QR_DYNAMIC'
    }
  },
  {
    id: 'TXN-8835',
    timestamp: '14:02:11',
    victim: {
      name: 'Vikramjeet Singh',
      vpa: 'lucky-draw-desk@ybl',
      kyc: true,
      accountType: 'Savings',
      normalRange: '₹1,000 - ₹8,000',
      bank: 'ICICI Bank',
      phone: '+91 94170 •••••',
      city: 'Amritsar, Punjab'
    },
    payee: {
      claimedName: 'KBC Prize Registration',
      vpa: 'lucky-draw-desk@ybl',
      ageBadge: 'Ephemeral (1.4h Old)',
      ageHours: 1.4,
      flaggedIp: false,
      attemptedAmount: 12499.0,
      bank: 'YES Bank',
      ifsc: 'YESB0000108',
      ipAddress: '157.41.98.204 (Patna Gateway)',
      location: 'Patna, Bihar'
    },
    scamVector: 'Lottery Advance Fee Scam',
    riskScore: 76,
    riskLevel: 'Elevated',
    latencyBeforePin: 'Intercepted 290ms before PIN submission • Immediate Analyst Review Required',
    shapDrivers: [
      {
        id: 'driver-1',
        title: 'Keyword Entropy in Payee Metadata',
        contribution: '+41% Risk Contribution',
        percentWidth: 82,
        barColor: 'bg-amber-500',
        description: 'VPA and handle match blacklisted "KBC / Kaun Banega Crorepati" scam dictionary.',
        icon: 'spellcheck'
      },
      {
        id: 'driver-2',
        title: 'Advance Fee Payment Loop',
        contribution: '+22% Risk Contribution',
        percentWidth: 44,
        barColor: 'bg-blue-600',
        description: 'Third consecutive payment attempt following previous unverified claims.',
        icon: 'repeat'
      },
      {
        id: 'driver-3',
        title: 'Velocity Fan-out',
        contribution: '+13% Risk Contribution',
        percentWidth: 26,
        barColor: 'bg-slate-500',
        description: 'Payee received 40+ inbound micro-debits in preceding 15 minutes.',
        icon: 'speed'
      }
    ],
    status: 'intercepted',
    timeline: [
      { ms: 0, title: 'Inbound UPI Intent Received', desc: 'Link opened from suspicious lottery SMS.', status: 'pass' },
      { ms: 140, title: 'Heuristic Scoring Triggered', desc: 'Keyword match detected in VPA handle descriptor.', status: 'warning' },
      { ms: 290, title: 'Pre-PIN Guard Activated', desc: 'User notified of lottery fraud threat.', status: 'pass' }
    ],
    deviceIntel: {
      os: 'Android 13 (Samsung OneUI 5.1)',
      screenSharingApp: null,
      simAgeDays: 310,
      callForwarding: false,
      rooted: false,
      appVersion: 'Paytm v10.42.0'
    },
    isoTelemetry: {
      mti: '0100 (Authorization Request)',
      rrn: '428800192835',
      switchId: 'NPCI-SW-DEL-02',
      payerPsp: 'Paytm Payments Bank',
      payeePsp: 'YES Bank',
      merchantCategoryCode: '7995 (Betting / Lottery)',
      channel: 'UPI_INTENT'
    }
  },
  {
    id: 'TXN-8827',
    timestamp: '14:01:58',
    victim: {
      name: 'Dr. Anandita Sen',
      vpa: 'anandita.sen@kotak',
      kyc: true,
      accountType: 'Current / Business',
      normalRange: '₹5,000 - ₹35,000',
      bank: 'Kotak Mahindra Bank',
      phone: '+91 98300 •••••',
      city: 'Kolkata, West Bengal'
    },
    payee: {
      claimedName: 'Digital Arrest Security Deposit',
      vpa: 'police-cyber-dept@okaxis',
      ageBadge: 'High Risk (4.1h Old)',
      ageHours: 4.1,
      flaggedIp: true,
      attemptedAmount: 145000.0,
      bank: 'Axis Bank',
      ifsc: 'UTIB0001844',
      ipAddress: '45.114.78.9 (Phnom Penh Cambodia Proxy)',
      location: 'Overseas Syndicate Hop'
    },
    scamVector: 'Law Enforcement Extortion',
    riskScore: 99,
    riskLevel: 'Critical Risk',
    latencyBeforePin: 'Intercepted 520ms before PIN submission • Immediate Analyst Review Required',
    shapDrivers: [
      {
        id: 'driver-1',
        title: 'Digital Arrest Video Spoof Signal',
        contribution: '+46% Risk Contribution',
        percentWidth: 92,
        barColor: 'bg-rose-500',
        description: 'Simultaneous long-duration video call ongoing with foreign VoIP carrier.',
        icon: 'video_call'
      },
      {
        id: 'driver-2',
        title: 'Full Balance Drain Outlier',
        contribution: '+31% Risk Contribution',
        percentWidth: 62,
        barColor: 'bg-rose-500',
        description: 'Amount equals 89% of available liquid savings, unprecedented in 4 years.',
        icon: 'account_balance_wallet'
      },
      {
        id: 'driver-3',
        title: 'I4C Interpol Red-Flagged Node',
        contribution: '+22% Risk Contribution',
        percentWidth: 44,
        barColor: 'bg-blue-600',
        description: 'Destination bank branch flagged for syndicated money mule laundering.',
        icon: 'security'
      }
    ],
    status: 'intercepted',
    timeline: [
      { ms: 0, title: 'Large Value Collect Request Triggered', desc: 'Victim under coercive duress in active video call.', status: 'pass' },
      { ms: 80, title: 'Emergency Anomaly Heuristic Alert', desc: 'Amount ₹1,45,000 exceeds 10x 90-day moving average.', status: 'critical' },
      { ms: 230, title: 'I4C Digital Arrest Blacklist Match', desc: 'Payee VPA string matches syndicated enforcement extortion.', status: 'critical' },
      { ms: 520, title: 'Sovereign Pre-PIN Freeze Enforced', desc: 'Immediate emergency alert sent to Kotak fraud desk.', status: 'critical' }
    ],
    deviceIntel: {
      os: 'Android 14 (Pixel 8 Pro)',
      screenSharingApp: 'Skype VoIP active call (Cam active)',
      simAgeDays: 980,
      callForwarding: true,
      rooted: false,
      appVersion: 'BHIM UPI v3.7'
    },
    isoTelemetry: {
      mti: '0200 (Financial Transaction Request)',
      rrn: '428800192827',
      switchId: 'NPCI-SW-KOL-01',
      payerPsp: 'BHIM / Kotak',
      payeePsp: 'Axis Bank',
      merchantCategoryCode: '9311 (Tax / Government)',
      channel: 'UPI_COLLECT_INTENT'
    }
  },
  {
    id: 'TXN-8821',
    timestamp: '14:01:22',
    victim: {
      name: 'Gaurav K. Chawla',
      vpa: 'gaurav.chawla@sbi',
      kyc: true,
      accountType: 'Savings',
      normalRange: '₹300 - ₹2,000',
      bank: 'State Bank of India',
      phone: '+91 99100 •••••',
      city: 'Delhi NCR'
    },
    payee: {
      claimedName: 'FedEx Customs Clearance Desk',
      vpa: 'customs-penalty-mule@icici',
      ageBadge: 'Ephemeral (3.5h Old)',
      ageHours: 3.5,
      flaggedIp: true,
      attemptedAmount: 38500.0,
      bank: 'ICICI Bank',
      ifsc: 'ICIC0000541',
      ipAddress: '103.151.12.98 (Delhi / Thai VPN)',
      location: 'New Delhi'
    },
    scamVector: 'Courier Customs Impersonation',
    riskScore: 92,
    riskLevel: 'Critical Risk',
    latencyBeforePin: 'Intercepted 380ms before PIN submission • Immediate Analyst Review Required',
    shapDrivers: [
      {
        id: 'driver-1',
        title: 'SMS Threat Courier Phish Link',
        contribution: '+40% Risk Contribution',
        percentWidth: 80,
        barColor: 'bg-rose-500',
        description: 'SMS click-through within 3 minutes of transaction initiation.',
        icon: 'link'
      },
      {
        id: 'driver-2',
        title: 'Unregistered Courier Merchant Account',
        contribution: '+30% Risk Contribution',
        percentWidth: 60,
        barColor: 'bg-amber-500',
        description: 'VPA claiming FedEx customs using individual savings beneficiary IFSC.',
        icon: 'domain_verification'
      },
      {
        id: 'driver-3',
        title: 'Fast In-and-Out Liquidity Velocity',
        contribution: '+22% Risk Contribution',
        percentWidth: 44,
        barColor: 'bg-blue-600',
        description: 'Payee node transfers credits within 45s of receipt to multiple mule accounts.',
        icon: 'sync_alt'
      }
    ],
    status: 'intercepted',
    timeline: [
      { ms: 0, title: 'Inbound Collect Request Initiated', desc: 'Customs fee debit instruction initiated.', status: 'pass' },
      { ms: 120, title: 'Brand Impersonation Classifier Hit', desc: 'FedEx corporate entity signature mismatch.', status: 'critical' },
      { ms: 380, title: 'Pre-PIN Gate Locked', desc: 'Transaction halted before authorization.', status: 'critical' }
    ],
    deviceIntel: {
      os: 'iOS 18.0 (iPhone 15)',
      screenSharingApp: null,
      simAgeDays: 540,
      callForwarding: false,
      rooted: false,
      appVersion: 'PhonePe v24.09.0'
    },
    isoTelemetry: {
      mti: '0100 (Authorization Request)',
      rrn: '428800192821',
      switchId: 'NPCI-SW-DEL-01',
      payerPsp: 'SBI Yono',
      payeePsp: 'ICICI Bank',
      merchantCategoryCode: '4215 (Courier Services)',
      channel: 'UPI_COLLECT_INTENT'
    }
  }
];

export const FRAUD_VECTORS: FraudVector[] = [
  {
    id: 'vector-1',
    title: 'Fake Electricity Refund Portal',
    badgeText: 'Critical • 412 hits',
    hits: 412,
    description: 'SMS claiming power cutoff; reverse collect intent initiated via forged utility merchant metadata.',
    avgDebit: '₹4,800',
    autoInterceptRate: '99.1% Auto-Intercept',
    severity: 'critical',
    pattern: 'Urgent electricity disconnection SMS with fraudulent support APK / Web link. Initiates UPI Collect instead of pay.',
    countermeasure: 'Pre-PIN semantic intent comparison: Alert if user intent is "Refund/Receive" but switch payload is "Debit Collect".',
    topTargetBanks: ['MSEDCL (MSEB)', 'BSES Yamuna', 'Tata Power', 'PSPCL Punjab']
  },
  {
    id: 'vector-2',
    title: 'Merchant QR Sticker Overlays',
    badgeText: 'Elevated • 289 hits',
    hits: 289,
    description: 'Physical counter QR replacement in metro transit zones pointing to private high-speed mule hops.',
    avgDebit: '₹2,100',
    autoInterceptRate: '96.4% Auto-Intercept',
    severity: 'elevated',
    pattern: 'Fraudsters overlay physical QR stickers at busy transit chai/snack counters with mule UPI IDs.',
    countermeasure: 'Merchant Geo-Fencing & Velocity Discontinuity: Halts payments if dynamic terminal distance diverges >500m from registered merchant shop.',
    topTargetBanks: ['Paytm Soundbox QR', 'BharatPe Merchant QR', 'PhonePe Merchant']
  },
  {
    id: 'vector-3',
    title: 'Remote Task & KYC Extortion',
    badgeText: 'Monitoring • 142 hits',
    hits: 142,
    description: 'Telegram part-time job lure leading to digital arrest impersonation via automated video spoof.',
    avgDebit: '₹48,000',
    autoInterceptRate: '97.8% Auto-Intercept',
    severity: 'monitoring',
    pattern: 'Part-time ratings/likes job escalates to high-yield investment scheme or extortion using fake CBI/Customs video calls.',
    countermeasure: 'Active Screen Mirror Detection & Background Calling State: Emits Pre-PIN lock whenever screen sharing or unverified VoIP stream is open.',
    topTargetBanks: ['Telegram VIP Group Mule accounts', 'Overseas P2P crypto gateways']
  }
];

export const MULE_NETWORK_NODES = [
  { id: 'victim', label: 'Victim: Rameshwar Pendse', type: 'victim', bank: 'HDFC Bank', amount: '₹4,999.00', status: 'Protected' },
  { id: 'mule1', label: 'fastag-mule-9821@airtel', type: 'mule_l1', bank: 'Airtel Payments Bank', status: 'Frozen', age: '2.8h old' },
  { id: 'mule2', label: 'Layer-2 Mule: Canara A/C 49102', type: 'mule_l2', bank: 'Canara Bank', status: 'Lien Placed', velocity: '4.2s transfer' },
  { id: 'crypto', label: 'Crypto P2P OTC Gateway (USDT)', type: 'offramp', bank: 'Binance P2P / Tron Wallet', status: 'Blacklisted', i4cFlagged: true }
];

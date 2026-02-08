// Exit type categories
export type ExitType =
  | 'Government Allotment'
  | 'Government Auction'
  | 'Land Pooling Return'
  | 'DMIC Tender'
  | 'Developer Buyback'
  | 'Port Tender'
  | 'Special Allotment'
  | 'Developer Offtake'
  | 'Leasehold Conversion';

export type RiskBand = 'Low' | 'Medium' | 'High';

export type AssetType =
  | 'Government Plot'
  | 'Industrial Plot'
  | 'Land Pooling Plot'
  | 'Developer Plot'
  | 'Leasehold Plot'
  | 'Special Allotment';

// Property interface — trust-first data model
export interface Property {
  id: string;
  title: string;
  city: string;
  locality: string;
  assetType: AssetType;
  sizeSqm: number;
  tenureType: 'Freehold' | 'Leasehold';
  allotmentRef: string;
  issuingAuthority: string;
  exitType: ExitType;
  buybackClausePresent: boolean;
  escrowAmountInr: number;
  escrowBankName: string;
  reraNumber: string;
  titleClearance: boolean;
  ecLast30Yrs: boolean;
  developerName: string;
  developerNetWorthInr: number;
  developerDebtToEquity: number;
  projectedHoldingPeriodYears: number;
  priceMinInr: number;
  priceMaxInr: number;
  riskScore: number;
  riskBand: RiskBand;
  docs: string[];
  siteLat: number;
  siteLng: number;
  shortRationale: string;
  image: string;
}

// Risk score component weights (for the "Why this score?" card)
export interface RiskBreakdown {
  legalClarity: number;       // out of 30
  exitEnforceability: number; // out of 25
  promoterStrength: number;   // out of 15
  regulatoryMaturity: number; // out of 15
  marketDemand: number;       // out of 15
}

// 12 credible dummy listings based on verifiable exit mechanisms
export const properties: Property[] = [
  {
    id: 'D1',
    title: 'CIDCO Residential Parcel \u2014 Sector 18',
    city: 'Navi Mumbai',
    locality: 'Sanpada',
    assetType: 'Government Plot',
    sizeSqm: 300,
    tenureType: 'Freehold',
    allotmentRef: 'CID/AL/2025/119',
    issuingAuthority: 'CIDCO',
    exitType: 'Government Allotment',
    buybackClausePresent: false,
    escrowAmountInr: 0,
    escrowBankName: '',
    reraNumber: '',
    titleClearance: true,
    ecLast30Yrs: true,
    developerName: '',
    developerNetWorthInr: 0,
    developerDebtToEquity: 0,
    projectedHoldingPeriodYears: 3,
    priceMinInr: 14000000,
    priceMaxInr: 18000000,
    riskScore: 78,
    riskBand: 'Medium',
    docs: ['allotment.pdf', 'ec.pdf', 'siteplan.pdf'],
    siteLat: 19.0330,
    siteLng: 73.0220,
    shortRationale: 'CIDCO allotment; transferable under CIDCO transfer rules; close to road/rail infrastructure.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  },
  {
    id: 'D2',
    title: 'Noida Authority Industrial Plot \u2014 Sector 96',
    city: 'Noida',
    locality: 'Sector 96',
    assetType: 'Industrial Plot',
    sizeSqm: 5000,
    tenureType: 'Freehold',
    allotmentRef: 'NOIDA-AU-2026-045',
    issuingAuthority: 'Noida Authority',
    exitType: 'Government Auction',
    buybackClausePresent: false,
    escrowAmountInr: 0,
    escrowBankName: '',
    reraNumber: '',
    titleClearance: true,
    ecLast30Yrs: true,
    developerName: '',
    developerNetWorthInr: 0,
    developerDebtToEquity: 0,
    projectedHoldingPeriodYears: 4,
    priceMinInr: 120000000,
    priceMaxInr: 160000000,
    riskScore: 72,
    riskBand: 'Medium',
    docs: ['noida_auction.pdf', 'ec.pdf', 'map.pdf'],
    siteLat: 28.5672,
    siteLng: 77.3240,
    shortRationale: 'Authority e-auction plot; expressway access; high logistics demand in Noida corridor.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  },
  {
    id: 'D3',
    title: 'HLPP Developed Parcel \u2014 Sector X',
    city: 'Peri-Delhi',
    locality: 'Haryana Belt',
    assetType: 'Land Pooling Plot',
    sizeSqm: 225,
    tenureType: 'Freehold',
    allotmentRef: 'HLPP-LEC-2024-888',
    issuingAuthority: 'Haryana Authority',
    exitType: 'Land Pooling Return',
    buybackClausePresent: false,
    escrowAmountInr: 0,
    escrowBankName: '',
    reraNumber: '',
    titleClearance: true,
    ecLast30Yrs: true,
    developerName: '',
    developerNetWorthInr: 0,
    developerDebtToEquity: 0,
    projectedHoldingPeriodYears: 3,
    priceMinInr: 7500000,
    priceMaxInr: 9500000,
    riskScore: 80,
    riskBand: 'Low',
    docs: ['hlpp_lec.pdf', 'ec.pdf', 'policy.pdf'],
    siteLat: 28.5950,
    siteLng: 76.9990,
    shortRationale: 'HLPP Land Entitlement Certificate; developed plot with transfer allowed per HLPP rules.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
  },
  {
    id: 'D4',
    title: 'DMIC Industrial Township Parcel',
    city: 'DMIC Node',
    locality: 'Industrial Zone',
    assetType: 'Industrial Plot',
    sizeSqm: 10000,
    tenureType: 'Freehold',
    allotmentRef: 'NICDC-TDR-2025-07',
    issuingAuthority: 'NICDC',
    exitType: 'DMIC Tender',
    buybackClausePresent: false,
    escrowAmountInr: 0,
    escrowBankName: '',
    reraNumber: '',
    titleClearance: true,
    ecLast30Yrs: true,
    developerName: '',
    developerNetWorthInr: 0,
    developerDebtToEquity: 0,
    projectedHoldingPeriodYears: 5,
    priceMinInr: 280000000,
    priceMaxInr: 350000000,
    riskScore: 70,
    riskBand: 'Medium',
    docs: ['nicdc_tender.pdf', 'ec.pdf', 'envclear.pdf'],
    siteLat: 25.6020,
    siteLng: 72.2760,
    shortRationale: 'NICDC tendered parcel; target for industrial/warehouse anchors along DMIC corridor.',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800',
  },
  {
    id: 'D5',
    title: 'Developer Buyback Plot \u2014 Phase A',
    city: 'Surat',
    locality: 'Varachha',
    assetType: 'Developer Plot',
    sizeSqm: 150,
    tenureType: 'Freehold',
    allotmentRef: 'DEV-BB-2026-252',
    issuingAuthority: 'Acuity Homes',
    exitType: 'Developer Buyback',
    buybackClausePresent: true,
    escrowAmountInr: 5200000,
    escrowBankName: 'ABC Bank',
    reraNumber: 'SRERA/2025/045',
    titleClearance: true,
    ecLast30Yrs: true,
    developerName: 'Acuity Homes',
    developerNetWorthInr: 600000000,
    developerDebtToEquity: 0.8,
    projectedHoldingPeriodYears: 2,
    priceMinInr: 4800000,
    priceMaxInr: 5500000,
    riskScore: 62,
    riskBand: 'Medium',
    docs: ['buyback_clause.pdf', 'escrow_conf.pdf', 'rera.pdf'],
    siteLat: 21.1702,
    siteLng: 72.8311,
    shortRationale: 'Developer signed 24-month buyback; escrow confirmed at ABC Bank; check promoter covenants.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
  },
  {
    id: 'D6',
    title: 'Municipal Auction Commercial Plot',
    city: 'Panchkula',
    locality: 'Sector 20',
    assetType: 'Government Plot',
    sizeSqm: 120,
    tenureType: 'Freehold',
    allotmentRef: 'MUN-AUC-2025-311',
    issuingAuthority: 'Panchkula MC',
    exitType: 'Government Auction',
    buybackClausePresent: false,
    escrowAmountInr: 0,
    escrowBankName: '',
    reraNumber: '',
    titleClearance: true,
    ecLast30Yrs: true,
    developerName: '',
    developerNetWorthInr: 0,
    developerDebtToEquity: 0,
    projectedHoldingPeriodYears: 3,
    priceMinInr: 9500000,
    priceMaxInr: 13000000,
    riskScore: 75,
    riskBand: 'Medium',
    docs: ['mun_auction.pdf', 'ec.pdf'],
    siteLat: 30.7346,
    siteLng: 76.8576,
    shortRationale: 'Municipal auction plot; retail strip location; high footfall area in Panchkula.',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800',
  },
  {
    id: 'D7',
    title: 'Leasehold Conversion Eligible Plot',
    city: 'Thane',
    locality: 'Mumbai Periphery',
    assetType: 'Leasehold Plot',
    sizeSqm: 100,
    tenureType: 'Leasehold',
    allotmentRef: 'CONV-APP-2025-402',
    issuingAuthority: 'Maharashtra State',
    exitType: 'Leasehold Conversion',
    buybackClausePresent: false,
    escrowAmountInr: 0,
    escrowBankName: '',
    reraNumber: '',
    titleClearance: true,
    ecLast30Yrs: true,
    developerName: '',
    developerNetWorthInr: 0,
    developerDebtToEquity: 0,
    projectedHoldingPeriodYears: 4,
    priceMinInr: 7500000,
    priceMaxInr: 9500000,
    riskScore: 60,
    riskBand: 'Medium',
    docs: ['conv_application.pdf', 'ec.pdf'],
    siteLat: 19.2183,
    siteLng: 72.9781,
    shortRationale: 'Leasehold with conversion application filed; conversion to freehold improves liquidity.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
  },
  {
    id: 'D8',
    title: 'RERA Township Plot with Institutional MOUs',
    city: 'Kochi',
    locality: 'Kakkanad',
    assetType: 'Developer Plot',
    sizeSqm: 180,
    tenureType: 'Freehold',
    allotmentRef: 'RERA-REG-2025-791',
    issuingAuthority: 'Kerala RERA',
    exitType: 'Developer Offtake',
    buybackClausePresent: false,
    escrowAmountInr: 0,
    escrowBankName: '',
    reraNumber: 'SRERA/2025/791',
    titleClearance: true,
    ecLast30Yrs: true,
    developerName: 'BlueStone Dev',
    developerNetWorthInr: 320000000,
    developerDebtToEquity: 0.6,
    projectedHoldingPeriodYears: 3,
    priceMinInr: 6500000,
    priceMaxInr: 8500000,
    riskScore: 68,
    riskBand: 'Medium',
    docs: ['rera.pdf', 'mou_institution.pdf', 'escrow.pdf'],
    siteLat: 9.9716,
    siteLng: 76.3090,
    shortRationale: 'RERA-registered project; MOUs with institutional anchor buyers; steady demand in IT corridor.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  },
  {
    id: 'D9',
    title: 'Vizag Port-Edge Tender Parcel',
    city: 'Visakhapatnam',
    locality: 'Madhurawada',
    assetType: 'Industrial Plot',
    sizeSqm: 6000,
    tenureType: 'Freehold',
    allotmentRef: 'PORT-TDR-2025-09',
    issuingAuthority: 'Visakhapatnam Port',
    exitType: 'Port Tender',
    buybackClausePresent: false,
    escrowAmountInr: 0,
    escrowBankName: '',
    reraNumber: '',
    titleClearance: true,
    ecLast30Yrs: true,
    developerName: '',
    developerNetWorthInr: 0,
    developerDebtToEquity: 0,
    projectedHoldingPeriodYears: 4,
    priceMinInr: 200000000,
    priceMaxInr: 270000000,
    riskScore: 74,
    riskBand: 'Medium',
    docs: ['port_tender.pdf', 'ec.pdf', 'envclear.pdf'],
    siteLat: 17.6868,
    siteLng: 83.2185,
    shortRationale: 'Port authority tender; strong logistics demand; industrial corridor linkage to hinterland.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
  },
  {
    id: 'D10',
    title: 'Naya Raipur Govt Township Plot',
    city: 'Naya Raipur',
    locality: 'New Capital Zone',
    assetType: 'Government Plot',
    sizeSqm: 250,
    tenureType: 'Freehold',
    allotmentRef: 'SPUC-AL-2024-11',
    issuingAuthority: 'State Urban Development',
    exitType: 'Government Allotment',
    buybackClausePresent: false,
    escrowAmountInr: 0,
    escrowBankName: '',
    reraNumber: '',
    titleClearance: true,
    ecLast30Yrs: true,
    developerName: '',
    developerNetWorthInr: 0,
    developerDebtToEquity: 0,
    projectedHoldingPeriodYears: 4,
    priceMinInr: 5500000,
    priceMaxInr: 7500000,
    riskScore: 77,
    riskBand: 'Medium',
    docs: ['allotment.pdf', 'ec.pdf', 'siteplan.pdf'],
    siteLat: 21.2358,
    siteLng: 81.6296,
    shortRationale: 'State allotment in planned new capital; steady public-sector demand; good infrastructure roadmap.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  },
  {
    id: 'D11',
    title: 'Short Term Developer Repurchase \u2014 Plot B',
    city: 'Surat',
    locality: 'Magdalla',
    assetType: 'Developer Plot',
    sizeSqm: 120,
    tenureType: 'Freehold',
    allotmentRef: 'DEV-RP-2026-018',
    issuingAuthority: 'Acuity Homes',
    exitType: 'Developer Buyback',
    buybackClausePresent: true,
    escrowAmountInr: 4150000,
    escrowBankName: 'XYZ Bank',
    reraNumber: 'SRERA/2024/022',
    titleClearance: true,
    ecLast30Yrs: true,
    developerName: 'Acuity Homes',
    developerNetWorthInr: 600000000,
    developerDebtToEquity: 0.8,
    projectedHoldingPeriodYears: 1.5,
    priceMinInr: 4200000,
    priceMaxInr: 5000000,
    riskScore: 59,
    riskBand: 'High',
    docs: ['buyback_clause.pdf', 'escrow_conf.pdf', 'rera.pdf'],
    siteLat: 21.1680,
    siteLng: 72.8200,
    shortRationale: '12\u201318 month buyback window; escrow partial coverage; promoter must meet solvency test.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  },
  {
    id: 'D12',
    title: 'Special Category Municipal Allotment',
    city: 'Noida',
    locality: 'Sector 15A',
    assetType: 'Special Allotment',
    sizeSqm: 302,
    tenureType: 'Freehold',
    allotmentRef: 'MUN-REL-2025-091',
    issuingAuthority: 'Noida Authority',
    exitType: 'Special Allotment',
    buybackClausePresent: false,
    escrowAmountInr: 0,
    escrowBankName: '',
    reraNumber: '',
    titleClearance: true,
    ecLast30Yrs: true,
    developerName: '',
    developerNetWorthInr: 0,
    developerDebtToEquity: 0,
    projectedHoldingPeriodYears: 3,
    priceMinInr: 2800000,
    priceMaxInr: 4000000,
    riskScore: 70,
    riskBand: 'Medium',
    docs: ['allotment.pdf', 'municipal_minutes.pdf'],
    siteLat: 28.5848,
    siteLng: 77.3425,
    shortRationale: 'Special category allotment; transfer rules are municipal; slower resale cadence expected.',
    image: 'https://images.unsplash.com/photo-1464938050520-ef2571e2e89f?w=800',
  },
];

// Risk score breakdowns (for "Why this score?" expandable card)
export const riskBreakdowns: Record<string, RiskBreakdown> = {
  D1:  { legalClarity: 28, exitEnforceability: 18, promoterStrength: 0, regulatoryMaturity: 14, marketDemand: 13 },
  D2:  { legalClarity: 27, exitEnforceability: 17, promoterStrength: 0, regulatoryMaturity: 13, marketDemand: 12 },
  D3:  { legalClarity: 30, exitEnforceability: 20, promoterStrength: 0, regulatoryMaturity: 15, marketDemand: 12 },
  D4:  { legalClarity: 26, exitEnforceability: 16, promoterStrength: 0, regulatoryMaturity: 13, marketDemand: 12 },
  D5:  { legalClarity: 22, exitEnforceability: 15, promoterStrength: 10, regulatoryMaturity: 8, marketDemand: 7 },
  D6:  { legalClarity: 27, exitEnforceability: 18, promoterStrength: 0, regulatoryMaturity: 14, marketDemand: 12 },
  D7:  { legalClarity: 20, exitEnforceability: 14, promoterStrength: 0, regulatoryMaturity: 12, marketDemand: 10 },
  D8:  { legalClarity: 24, exitEnforceability: 14, promoterStrength: 10, regulatoryMaturity: 10, marketDemand: 8 },
  D9:  { legalClarity: 27, exitEnforceability: 17, promoterStrength: 0, regulatoryMaturity: 13, marketDemand: 13 },
  D10: { legalClarity: 28, exitEnforceability: 18, promoterStrength: 0, regulatoryMaturity: 14, marketDemand: 13 },
  D11: { legalClarity: 22, exitEnforceability: 12, promoterStrength: 9, regulatoryMaturity: 8, marketDemand: 6 },
  D12: { legalClarity: 25, exitEnforceability: 16, promoterStrength: 0, regulatoryMaturity: 13, marketDemand: 12 },
};

// Format price in Indian notation (Lakhs / Crores)
export function formatPrice(amount: number): string {
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    return `\u20B9${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(1)} Cr`;
  }
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `\u20B9${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)} L`;
  }
  return `\u20B9${amount.toLocaleString('en-IN')}`;
}

// Exit type to short badge label
export function getExitBadgeLabel(exitType: ExitType): string {
  const map: Record<ExitType, string> = {
    'Government Allotment': 'Govt',
    'Government Auction': 'Govt Auction',
    'Land Pooling Return': 'Land Pool',
    'DMIC Tender': 'DMIC',
    'Developer Buyback': 'Buyback',
    'Port Tender': 'Port Tender',
    'Special Allotment': 'Special',
    'Developer Offtake': 'Offtake',
    'Leasehold Conversion': 'Leasehold',
  };
  return map[exitType];
}

// Risk band color class
export function getRiskColor(band: RiskBand): string {
  const map: Record<RiskBand, string> = {
    Low: 'risk-low',
    Medium: 'risk-medium',
    High: 'risk-high',
  };
  return map[band];
}

// ─────────────────────────────────────────────────────────────────────────────
// Vantage WMS — seeded data, single source of truth for every screen.
//
// THE DATA THREAD: SKU-88412 · Wireless Earbuds Pro
//   Copilot   → short-pick risk: demand 204 vs 64 on hand = short 140 units
//   Inbound   → replenishment on ASN-2291, PO 240 / packing doc 220 (−20 flag)
//   Slotting  → velocity +38% over 14 days, move C-11-07 → A-02-04
// Keep these numbers consistent everywhere.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  code: 'MNL-01',
  name: 'Cabuyao DC',
}

// Zones A–E run fast → slow. A = forward pick, E = deep reserve.
export const skus = [
  {
    sku: 'SKU-88412',
    name: 'Wireless Earbuds Pro',
    tier: 'A',
    bin: 'C-11-07',
    onHand: 64,
    demandToday: 204, // short 140 — the thread
    trend14d: [31, 29, 34, 33, 38, 41, 40, 44, 47, 46, 51, 54, 53, 58],
    velocityDelta: '+38%',
  },
  {
    sku: 'SKU-77103',
    name: 'Smart Watch Band 22mm',
    tier: 'A',
    bin: 'A-01-08',
    onHand: 412,
    demandToday: 96,
    trend14d: [44, 41, 45, 43, 46, 44, 47, 45, 44, 46, 48, 45, 47, 46],
    velocityDelta: '+4%',
  },
  {
    sku: 'SKU-66290',
    name: 'USB-C Wall Charger 65W',
    tier: 'A',
    bin: 'A-02-11',
    onHand: 358,
    demandToday: 88,
    trend14d: [39, 42, 40, 43, 41, 44, 42, 45, 43, 44, 46, 44, 45, 47],
    velocityDelta: '+9%',
  },
  {
    sku: 'SKU-43360',
    name: 'Clear Phone Case iPhone 15',
    tier: 'A',
    bin: 'A-03-14',
    onHand: 540,
    demandToday: 112,
    trend14d: [52, 50, 54, 51, 53, 55, 52, 54, 56, 53, 55, 54, 56, 55],
    velocityDelta: '+2%',
  },
  {
    sku: 'SKU-18526',
    name: 'Power Bank 10000mAh',
    tier: 'A',
    bin: 'B-04-02',
    onHand: 296,
    demandToday: 74,
    trend14d: [26, 28, 27, 30, 29, 32, 31, 33, 35, 34, 36, 35, 38, 37],
    velocityDelta: '+24%',
  },
  {
    sku: 'SKU-54871',
    name: 'Bluetooth Speaker Mini',
    tier: 'B',
    bin: 'B-04-03',
    onHand: 188,
    demandToday: 41,
    trend14d: [19, 21, 20, 22, 21, 20, 22, 23, 21, 22, 24, 22, 23, 24],
    velocityDelta: '+8%',
  },
  {
    sku: 'SKU-39215',
    name: 'Laptop Sleeve 14"',
    tier: 'B',
    bin: 'B-06-09',
    onHand: 174,
    demandToday: 28,
    trend14d: [14, 15, 13, 16, 14, 15, 16, 14, 15, 17, 15, 16, 15, 16],
    velocityDelta: '+3%',
  },
  {
    sku: 'SKU-31447',
    name: 'Screen Protector 2-pack',
    tier: 'B',
    bin: 'C-02-15',
    onHand: 630,
    demandToday: 57,
    trend14d: [21, 22, 24, 23, 25, 24, 26, 27, 26, 28, 27, 29, 28, 30],
    velocityDelta: '+18%',
  },
  {
    sku: 'SKU-28904',
    name: 'Wireless Mouse Compact',
    tier: 'B',
    bin: 'B-05-02',
    onHand: 220,
    demandToday: 33,
    trend14d: [16, 17, 15, 18, 16, 17, 18, 16, 17, 18, 17, 19, 17, 18],
    velocityDelta: '+5%',
  },
  {
    sku: 'SKU-07254',
    name: 'Charging Dock 3-in-1',
    tier: 'B',
    bin: 'C-08-07',
    onHand: 96,
    demandToday: 24,
    trend14d: [9, 10, 11, 10, 12, 11, 12, 13, 12, 13, 14, 13, 14, 15],
    velocityDelta: '+15%',
  },
  {
    sku: 'SKU-25118',
    name: 'HDMI Cable 2m',
    tier: 'C',
    bin: 'A-05-01',
    onHand: 410,
    demandToday: 12,
    trend14d: [18, 17, 16, 15, 15, 14, 13, 13, 12, 12, 11, 12, 11, 12],
    velocityDelta: '-31%',
  },
  {
    sku: 'SKU-21733',
    name: 'Webcam 1080p',
    tier: 'C',
    bin: 'D-07-12',
    onHand: 58,
    demandToday: 6,
    trend14d: [7, 6, 7, 5, 6, 7, 6, 5, 6, 6, 5, 6, 7, 6],
    velocityDelta: '-4%',
  },
  {
    sku: 'SKU-15092',
    name: 'Mechanical Keyboard TKL',
    tier: 'C',
    bin: 'D-03-08',
    onHand: 44,
    demandToday: 5,
    trend14d: [5, 4, 5, 6, 4, 5, 5, 4, 6, 5, 4, 5, 5, 4],
    velocityDelta: '0%',
  },
  {
    sku: 'SKU-12647',
    name: 'Foam Ear Tips 3-pair',
    tier: 'C',
    bin: 'E-08-01',
    onHand: 820,
    demandToday: 18,
    trend14d: [10, 11, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16],
    velocityDelta: '+22%',
  },
  {
    sku: 'SKU-09381',
    name: 'Tablet Stand Adjustable',
    tier: 'C',
    bin: 'E-02-10',
    onHand: 132,
    demandToday: 8,
    trend14d: [8, 7, 8, 9, 7, 8, 8, 7, 9, 8, 7, 8, 8, 9],
    velocityDelta: '+1%',
  },
]

export const getSku = (code) => skus.find((s) => s.sku === code)

// ── Inbound ──────────────────────────────────────────────────────────────────

export const asns = [
  {
    id: 'ASN-2291',
    po: 'PO-7716',
    supplier: 'Hua-Tech Electronics Mfg.',
    eta: 'Today 10:30',
    status: 'Processing',
    dock: 'Dock 2',
    lineCount: 4,
    unitCount: 1040,
    // The AI-extraction view. Confidence per line; the 71% line is the thread.
    lines: [
      {
        sku: 'SKU-12647',
        name: 'Foam Ear Tips 3-pair',
        poQty: 500,
        docQty: 500,
        confidence: 99,
        status: 'match',
      },
      {
        sku: 'SKU-07254',
        name: 'Charging Dock 3-in-1',
        poQty: 120,
        docQty: 120,
        confidence: 96,
        status: 'match',
      },
      {
        sku: 'SKU-18526',
        name: 'Power Bank 10000mAh',
        poQty: 180,
        docQty: 180,
        confidence: 94,
        status: 'match',
      },
      {
        sku: 'SKU-88412',
        name: 'Wireless Earbuds Pro',
        poQty: 240,
        docQty: 220,
        confidence: 71,
        status: 'flagged',
        flag: 'PO: 240 units / Doc: 220 — possible short shipment',
        aiReasoning:
          'The packing list shows 220 units against a purchase order of 240. The document quantity field scanned cleanly (71% match confidence on this line is driven by the quantity mismatch, not OCR quality). Two cartons may have been left off the shipment — supplier short-ships on this lane have happened twice in the last 90 days. This SKU is already flagged as a short-pick risk today, so 20 missing units matter. I can’t determine the cause from the documents alone, so this needs your call.',
        options: ['Approve as-is', 'Hold line', 'Contact supplier'],
      },
    ],
  },
  {
    id: 'ASN-2288',
    po: 'PO-7702',
    supplier: 'Pacific Components Co.',
    eta: 'Today 08:15',
    status: 'Receiving',
    dock: 'Dock 3',
    lineCount: 6,
    unitCount: 1880,
  },
  {
    id: 'ASN-2290',
    po: 'PO-7711',
    supplier: 'Apex Accessories Ltd.',
    eta: 'Today 09:45',
    status: 'Receiving',
    dock: 'Dock 3',
    lineCount: 3,
    unitCount: 940,
  },
  {
    id: 'ASN-2293',
    po: 'PO-7720',
    supplier: 'Mercury Cables Ltd.',
    eta: 'Today 13:00',
    status: 'Scheduled',
    dock: 'Dock 1',
    lineCount: 2,
    unitCount: 1200,
  },
  {
    id: 'ASN-2294',
    po: 'PO-7723',
    supplier: 'NovaTech OEM',
    eta: 'Today 15:30',
    status: 'Scheduled',
    dock: 'Dock 2',
    lineCount: 5,
    unitCount: 760,
  },
  {
    id: 'ASN-2295',
    po: 'PO-7724',
    supplier: 'PrimeCell Battery Co.',
    eta: 'Tomorrow 08:00',
    status: 'Scheduled',
    dock: '—',
    lineCount: 2,
    unitCount: 600,
  },
  {
    id: 'ASN-2287',
    po: 'PO-7698',
    supplier: 'Golden Harbor Trading',
    eta: 'Yesterday 16:20',
    status: 'Completed',
    dock: 'Dock 1',
    lineCount: 4,
    unitCount: 1320,
  },
  {
    id: 'ASN-2286',
    po: 'PO-7695',
    supplier: 'Soundline Audio Mfg.',
    eta: 'Yesterday 11:00',
    status: 'Completed',
    dock: 'Dock 2',
    lineCount: 3,
    unitCount: 480,
  },
]

export const inboundStats = {
  dockToStock: '3.2 hrs',
  dockToStockDelta: '↓41% vs manual baseline',
  asnsToday: 5,
  unitsExpectedToday: 5820,
  autoMatchedLines: '94%',
}

// ── Outbound ─────────────────────────────────────────────────────────────────

export const orders = [
  {
    id: 'SO-10482',
    customer: 'Abenson Megamall',
    cutoff: '14:30',
    status: 'Picking',
    risk: 'high',
    riskReason: 'Contains SKU-88412 — only 64 units on hand vs 204 demanded',
  },
  {
    id: 'SO-10485',
    customer: 'Kimstore Online',
    cutoff: '14:30',
    status: 'Allocated',
    risk: 'high',
    riskReason: 'Contains SKU-88412 — allocation short by 86 units',
  },
  {
    id: 'SO-10490',
    customer: 'DataBlitz SM North',
    cutoff: '16:00',
    status: 'Allocated',
    risk: 'medium',
    riskReason: 'Pick wave not released; 96 units across 3 zones',
  },
  {
    id: 'SO-10478',
    customer: 'Octagon Computer Superstore',
    cutoff: '12:00',
    status: 'Packed',
    risk: 'none',
  },
  {
    id: 'SO-10479',
    customer: 'PC Express Gilmore',
    cutoff: '12:00',
    status: 'Shipped',
    risk: 'none',
  },
  {
    id: 'SO-10484',
    customer: 'Silicon Valley Cubao',
    cutoff: '14:30',
    status: 'Picking',
    risk: 'none',
  },
  {
    id: 'SO-10487',
    customer: 'Villman Computers',
    cutoff: '16:00',
    status: 'Allocated',
    risk: 'none',
  },
  {
    id: 'SO-10491',
    customer: 'EasyPC Taft',
    cutoff: '16:00',
    status: 'Open',
    risk: 'low',
    riskReason: 'Awaiting payment confirmation',
  },
  {
    id: 'SO-10493',
    customer: 'TechWarehouse Direct',
    cutoff: '17:30',
    status: 'Open',
    risk: 'none',
  },
  {
    id: 'SO-10494',
    customer: 'Anson’s Ortigas',
    cutoff: '17:30',
    status: 'Open',
    risk: 'none',
  },
]

export const atRiskOrders = orders.filter((o) => o.risk === 'high' || o.risk === 'medium')

// ── Copilot ──────────────────────────────────────────────────────────────────

export const exceptions = [
  {
    id: 'EXC-01',
    severity: 'high',
    title: 'Short-pick risk: SKU-88412 Wireless Earbuds Pro',
    body: 'Demand today is 204 units against 64 on hand — short 140. Replenishment is on ASN-2291 (due 10:30), but the packing list shows 20 units fewer than the PO.',
    action: { label: 'Review ASN-2291 in Inbound', to: '/inbound' },
  },
  {
    id: 'EXC-02',
    severity: 'medium',
    title: 'Dock 3 receiving running 47 min behind',
    body: 'ASN-2288 and ASN-2290 are both queued on Dock 3. At current pace, putaway for both slips past the 14:30 pick wave.',
    action: { label: 'View receiving queue', to: '/inbound' },
  },
  {
    id: 'EXC-03',
    severity: 'low',
    title: 'Zone B cycle count variance',
    body: 'Yesterday’s cycle count found a 12-unit variance across 3 bins in Zone B (0.4%). Within tolerance, but the same bins varied last week.',
    action: { label: 'Planned for Phase 2', to: null },
  },
]

export const snapshot = {
  ordersDueToday: 38,
  unitsToPick: 4120,
  laborUtilization: '84%',
  openExceptions: 3,
}

// ── Slotting ─────────────────────────────────────────────────────────────────

export const zones = [
  { zone: 'A', label: 'Forward pick', picksPerDay: 1840, heat: 5 },
  { zone: 'B', label: 'Fast reserve', picksPerDay: 1120, heat: 4 },
  { zone: 'C', label: 'Mid reserve', picksPerDay: 610, heat: 3 },
  { zone: 'D', label: 'Slow reserve', picksPerDay: 240, heat: 2 },
  { zone: 'E', label: 'Deep storage', picksPerDay: 90, heat: 1 },
]

export const slottingSummary = {
  moveCount: 12,
  projected: 'projected 9% pick-path reduction this week',
}

// Each rec carries the evidence behind it — the drawer on the Slotting screen
// renders these so the AI's reasoning is inspectable, not just asserted.
export const slottingRecs = [
  {
    id: 'REC-01',
    sku: 'SKU-88412',
    name: 'Wireless Earbuds Pro',
    fromBin: 'C-11-07',
    toBin: 'A-02-04',
    reason: 'Velocity up 38% over 14 days — move to forward-pick',
    impact: 'saves ~210 pick-meters/day',
    metersPerDay: 210,
    confidence: 96,
    evidence: {
      facts: [
        'Velocity: ~31 → ~58 picks/day over 14 days (+38%)',
        'Forward-pick slot shortens each pick path by ~3.6 m',
        '58 picks/day × 3.6 m ≈ 210 pick-meters/day saved',
      ],
      cost: '~12 min · 1 associate · pallet jack · best window 13:00–14:00 lull',
    },
  },
  {
    id: 'REC-02',
    sku: 'SKU-18526',
    name: 'Power Bank 10000mAh',
    fromBin: 'B-04-02',
    toBin: 'A-04-06',
    reason: 'Velocity up 24% over 14 days — promote to forward-pick',
    impact: 'saves ~140 pick-meters/day',
    metersPerDay: 140,
    confidence: 94,
    evidence: {
      facts: [
        'Velocity: ~30 → ~37 picks/day over 14 days (+24%)',
        'Zone B → A cuts ~3.8 m per pick',
        '37 picks/day × 3.8 m ≈ 140 pick-meters/day saved',
      ],
      cost: '~10 min · 1 associate · best window 13:00–14:00 lull',
    },
  },
  {
    id: 'REC-03',
    sku: 'SKU-25118',
    name: 'HDMI Cable 2m',
    fromBin: 'A-05-01',
    toBin: 'D-05-09',
    reason: 'Velocity down 31% — release a prime forward-pick slot',
    impact: 'frees 1 forward-pick bin',
    metersPerDay: 0,
    confidence: 92,
    evidence: {
      facts: [
        'Velocity: 18 → 12 picks/day over 14 days (−31%)',
        'A-05-01 is prime forward-pick real estate next to pack-out',
        'Freed slot absorbs the next A-zone promotion in this list',
      ],
      cost: '~15 min · 1 associate · run during off-peak',
    },
  },
  {
    id: 'REC-04',
    sku: 'SKU-31447',
    name: 'Screen Protector 2-pack',
    fromBin: 'C-02-15',
    toBin: 'B-02-12',
    reason: 'Velocity up 18% — move one zone forward',
    impact: 'saves ~90 pick-meters/day',
    metersPerDay: 90,
    confidence: 91,
    evidence: {
      facts: [
        'Velocity: ~22 → ~30 picks/day over 14 days (+18%)',
        'One-zone promotion cuts ~3 m per pick',
        '30 picks/day × 3 m ≈ 90 pick-meters/day saved',
      ],
      cost: '~10 min · 1 associate',
    },
  },
  {
    id: 'REC-05',
    sku: 'SKU-12647',
    name: 'Foam Ear Tips 3-pair',
    fromBin: 'E-08-01',
    toBin: 'C-12-02',
    reason: 'Frequently kitted with SKU-88412 — stage nearer forward-pick',
    impact: 'saves ~45 pick-meters/day',
    metersPerDay: 45,
    confidence: 88,
    evidence: {
      facts: [
        'Kitted with SKU-88412 in 64% of its picks',
        'Staging near forward-pick cuts ~2.8 m per kit',
        '16 kits/day × 2.8 m ≈ 45 pick-meters/day saved',
      ],
      cost: '~14 min · 1 associate · deep-storage retrieval',
    },
  },
  {
    id: 'REC-06',
    sku: 'SKU-07254',
    name: 'Charging Dock 3-in-1',
    fromBin: 'C-08-07',
    toBin: 'B-08-04',
    reason: 'Velocity up 15% over 14 days — move one zone forward',
    impact: 'saves ~70 pick-meters/day',
    metersPerDay: 70,
    confidence: 87,
    evidence: {
      facts: [
        'Velocity: ~10 → ~15 picks/day over 14 days (+15%)',
        'Zone C → B cuts ~4.7 m per pick',
        '15 picks/day × 4.7 m ≈ 70 pick-meters/day saved',
      ],
      cost: '~10 min · 1 associate',
    },
  },
  {
    id: 'REC-07',
    sku: 'SKU-54871',
    name: 'Bluetooth Speaker Mini',
    fromBin: 'B-04-03',
    toBin: 'B-01-06',
    reason: 'Picked with SKU-77103 in 31% of orders — co-locate',
    impact: 'saves ~60 pick-meters/day',
    metersPerDay: 60,
    confidence: 85,
    evidence: {
      facts: [
        'Appears with SKU-77103 in 31% of multi-line orders',
        'Co-location merges two aisle visits into one stop',
        '~24 co-picks/day × 2.5 m ≈ 60 pick-meters/day saved',
      ],
      cost: '~9 min · 1 associate',
    },
  },
  {
    id: 'REC-08',
    sku: 'SKU-28904',
    name: 'Wireless Mouse Compact',
    fromBin: 'B-05-02',
    toBin: 'B-02-09',
    reason: 'Cluster with other desk accessories picked together',
    impact: 'saves ~40 pick-meters/day',
    metersPerDay: 40,
    confidence: 84,
    evidence: {
      facts: [
        'Desk-accessory cluster appears in 22% of multi-line orders',
        'Adjacency cuts ~2.2 m per multi-line order',
        '~18 orders/day × 2.2 m ≈ 40 pick-meters/day saved',
      ],
      cost: '~9 min · 1 associate',
    },
  },
  {
    id: 'REC-09',
    sku: 'SKU-39215',
    name: 'Laptop Sleeve 14"',
    fromBin: 'B-06-09',
    toBin: 'B-03-05',
    reason: 'Joins the laptop-accessory pick cluster in aisle B-03',
    impact: 'saves ~35 pick-meters/day',
    metersPerDay: 35,
    confidence: 82,
    evidence: {
      facts: [
        'Picked alongside the laptop-accessory cluster in aisle B-03',
        'Cuts ~2.2 m per multi-line pick',
        '16 picks/day × 2.2 m ≈ 35 pick-meters/day saved',
      ],
      cost: '~9 min · 1 associate',
    },
  },
  {
    id: 'REC-10',
    sku: 'SKU-15092',
    name: 'Mechanical Keyboard TKL',
    fromBin: 'D-03-08',
    toBin: 'D-06-01',
    reason: 'Bulky carton slotted above shoulder height — move to floor level',
    impact: 'reduces handling strain',
    metersPerDay: 0,
    confidence: 81,
    evidence: {
      facts: [
        '9.4 kg carton stored at 1.9 m shelf height',
        'Above-shoulder picks correlate with strain incidents',
        'Floor-level slot D-06-01 is open in the same aisle',
      ],
      cost: '~8 min · 1 associate',
    },
  },
  {
    id: 'REC-11',
    sku: 'SKU-21733',
    name: 'Webcam 1080p',
    fromBin: 'D-07-12',
    toBin: 'D-02-03',
    reason: 'Shortens travel within Zone D for weekly replenishment',
    impact: 'saves ~20 pick-meters/day',
    metersPerDay: 20,
    confidence: 79,
    evidence: {
      facts: [
        'Current slot sits at the far end of the Zone D aisle',
        'D-02-03 is at the aisle head, near the zone entry',
        '6 picks/day × 3.3 m ≈ 20 pick-meters/day saved',
      ],
      cost: '~8 min · 1 associate',
    },
  },
  {
    id: 'REC-12',
    sku: 'SKU-09381',
    name: 'Tablet Stand Adjustable',
    fromBin: 'E-02-10',
    toBin: 'E-06-02',
    reason: 'Consolidates inventory split across two deep-storage bins',
    impact: 'frees 1 storage bin',
    metersPerDay: 0,
    confidence: 78,
    evidence: {
      facts: [
        'On-hand is split across E-02-10 and E-06-02',
        'Consolidating frees one deep-storage bin',
        'Single-bin SKUs cut cycle-count time in Zone E',
      ],
      cost: '~12 min · 1 associate · run during off-peak',
    },
  },
]

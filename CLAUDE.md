# Vantage WMS — AI-First Warehouse Management System (Case Study Prototype)

## What this is
A high-fidelity clickable prototype for a Head-of-Product case study review.
It must look production-grade and demonstrate **product judgment**, not
engineering breadth. Restraint is a feature: three fully built screens, one
coherent data story, honest "Phase 2" states for everything else.

**Product thesis:** AI in the workflow, not a dashboard bolt-on. The AI's
reasoning is always legible — confidence scores, reason codes, explicit
human-in-the-loop moments. Never magic.

**Target user:** Operations manager at a mid-market 3PL or e-commerce brand
(not enterprise Manhattan-class, not SMB spreadsheet-replacement).

## Stack
- Vite + React + Tailwind CSS, React Router
- lucide-react for icons, Recharts if a chart is needed
- No backend, no API calls. Everything client-side, seeded from one module.
- Must pass `npm run build` clean and deploy to Vercel with zero config.
- Desktop-first, designed at 1440px. Graceful down to ~1024px is enough.

## Build order (do not deviate)
1. Scaffold + app shell + `src/data/seed.js`
2. Screen 1: `/copilot`
3. Screen 2: `/inbound`
4. Screen 3: `/slotting`
5. Polish pass: states, toasts, footer labels
Verify in the dev server after each step before moving on.

## Design system
Deliberately NOT the generic AI-demo look (no cream-and-terracotta, no
dark-mode-with-acid-green, no gradients, no glassmorphism).

- **Surfaces:** white cards on a cool light-gray canvas (#F6F7F9), 1px
  borders (#E4E7EC), 8px radius, shadows barely-there
- **Accent:** deep indigo #3538CD for primary actions and selected nav only.
  Severity colors: amber #B54708 / red #B42318 / green #067647 — used as
  text+border tints on light backgrounds, never loud fills
- **Type:** Inter for UI. **Signature detail:** all operational codes —
  SKUs, bin locations, ASN/PO/order numbers — render in a monospace face
  (IBM Plex Mono or JetBrains Mono via Google Fonts) inside subtle
  pill/token styling. Warehouse codes ARE the vernacular of this world;
  treating them as first-class tokens is what makes the UI read as real
  ops software. Numbers in tables use tabular figures.
- **Density:** dense but calm — 13–14px table text, generous section
  spacing, clear hierarchy. This is software people use 8 hours a day.
- **AI elements:** every AI output carries either a confidence badge
  (e.g., `96%`) or a plain-language reason chip. Reason chips are a
  reusable component — muted background, sparkle icon, one sentence.
- **Copy:** active voice, sentence case, plain verbs. Buttons say exactly
  what happens ("Confirm & generate putaway tasks", not "Submit").
  Errors and flags explain what's wrong and what to do next.

## App shell (persistent layout)
- Left sidebar: Dashboard, Copilot, Inbound, Inventory (with AI Slotting
  sub-item), Outbound, Insights
- Only Copilot, Inbound, and AI Slotting are fully built. Every other
  route renders a clean "Planned for Phase 2" state: icon, one sentence
  on what it will do, muted styling. This is deliberate scope restraint
  made visible in the product.
- Top bar: site selector ("MNL-01 · Cabuyao DC"), global search input
  (non-functional is fine), notifications bell with count badge, avatar
- Footer of each built screen, tiny muted text:
  "Phase 1 prototype · seeded data"

## Seed data — `src/data/seed.js` (single source of truth)
All screens import from this file only. Realistic everything: no lorem
ipsum, no placeholder boxes.

- ~15 SKUs: name, SKU code, velocity tier (A/B/C), bin location
  (format `A-03-14`), on-hand qty, 14-day velocity trend
- ~8 inbound ASNs/POs: supplier, ETA, status, line items
- ~10 outbound orders: customer, SLA cutoff time, status, risk flag

### THE DATA THREAD (most important requirement in this file)
One operational story must connect all three screens through
**SKU-88412 · Wireless Earbuds Pro**:
- **Copilot** surfaces it as a short-pick risk (demand exceeds available
  stock by 140 units)
- **Inbound** shows ASN-2291 containing the replenishment PO for it —
  with a 20-unit discrepancy flagged (PO: 240, document: 220)
- **Slotting** recommends moving it to forward-pick (velocity up 38%
  over 14 days)
One story, three angles. A reviewer clicking through should be able to
follow it. Keep every number consistent across screens.

## Screen 1 — `/copilot` (AI Operations Copilot)
- Split layout: chat panel left (~55%), live context panel right
- Pre-loaded conversation: user asked "Which orders are at risk of
  missing SLA today?" → Copilot replied in plain language AND rendered
  an inline data table (order #, customer, cutoff, risk reason) with a
  "Create pick wave" button (clicking shows a success toast)
- Input is functional: submitting a message shows an 800ms typing
  indicator, then a canned contextual answer from seed data. Implement
  3–4 keyword-matched responses ("where"/"locate" → bin location answer;
  "stock"/"inventory" → stock level answer with table; "labor"/"today" →
  utilization answer) plus a sensible default that offers suggestions.
- Above the chat: 3 proactive exception cards the AI surfaced unprompted:
  1. Short-pick risk on SKU-88412 (severity: high) — suggested action
     links to /inbound
  2. Dock 3 receiving running 47 min behind (medium)
  3. Zone B cycle count variance (low)
- Suggested prompt chips below the input
- Right context panel: today's snapshot — orders due, units to pick,
  labor utilization, open exceptions count

## Screen 2 — `/inbound` (Smart Inbound / AI Receiving)
- Left: receiving queue table (ASN #, supplier, ETA, status pills)
- Main panel: ASN-2291 selected/in processing:
  - Stylized document thumbnail of the uploaded packing list
  - AI extraction table: line items matched against the PO, each with a
    confidence score (99%, 96%, 94%, 71%), green check on clean matches
  - One amber flagged row: "PO: 240 units / Doc: 220 — possible short
    shipment" (this is the SKU-88412 line)
  - Clicking the flagged row opens a side panel: the AI's reasoning in
    plain language + three options: Approve as-is / Hold line / Contact
    supplier. This is the explicit human-in-the-loop moment — the AI
    defers, the human decides.
- Primary action "Confirm & generate putaway tasks" → success toast,
  ASN status updates in the queue
- Stat strip: "Dock-to-stock: 3.2 hrs (↓41% vs manual baseline)"

## Screen 3 — `/slotting` (AI Slotting & Replenishment)
- Left: simplified warehouse zone heatmap — zones A–E as an SVG or CSS
  grid colored by pick velocity, with a legend
- Right: ranked recommendation list. Each row: SKU token, current bin →
  recommended bin (monospace tokens with an arrow), reason chip in plain
  language ("Velocity up 38% over 14 days — move to forward-pick"),
  projected impact ("saves ~210 pick-meters/day"), Accept / Dismiss
- Accept/Dismiss actually update state: accepted rows collapse into an
  "Accepted today" group; header counter updates live
- Header summary: "12 recommended moves · projected 9% pick-path
  reduction this week"
- Top recommendation is the SKU-88412 move (closes the data thread)

## Quality bar
- One low-confidence AI case that explicitly defers to the human
  (the 71% inbound line) — a Head of Product will look for this
- Hover states on every actionable row; toasts confirm actions using the
  same verb as the button that triggered them
- Visible keyboard focus states; respect prefers-reduced-motion
- No dead-looking UI: every built screen has realistic data at rest
- Before calling any screen done, self-review against this file —
  especially the data thread and the design-system rules

# Vantage WMS — AI-first warehouse management

A high-fidelity clickable prototype of an AI-first WMS for mid-market 3PLs
and e-commerce brands. Phase 1: three fully built screens, one coherent
data story, honest "Planned for Phase 2" states for everything else.

**Product thesis:** AI in the workflow, not a dashboard bolt-on. Every AI
output carries a confidence score or a plain-language reason, and
low-confidence calls explicitly defer to a human.

## The data thread

One operational story connects all three screens through
`SKU-88412 · Wireless Earbuds Pro`:

1. **Copilot** (`/copilot`) surfaces it as a short-pick risk — demand
   exceeds available stock by 140 units.
2. **Inbound** (`/inbound`) shows its replenishment arriving on
   `ASN-2291` — with a 20-unit discrepancy the AI flags at 71%
   confidence and hands to the operator (approve / hold / contact
   supplier).
3. **AI Slotting** (`/slotting`) recommends moving it to forward-pick —
   velocity is up 38% over 14 days.

One story, three angles. Click through and follow it.

## Run it

```bash
npm install
npm run dev
```

Vite + React + Tailwind. No backend — everything is seeded from
[`src/data/seed.js`](src/data/seed.js), the single source of truth for
every number on every screen. Deploys to Vercel with zero config
(`vercel.json` handles SPA rewrites).

Designed desktop-first at 1440px.

---

Phase 1 prototype · seeded data

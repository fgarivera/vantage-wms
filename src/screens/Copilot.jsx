import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUp, Sparkles } from 'lucide-react'
import {
  atRiskOrders,
  exceptions,
  getSku,
  inboundStats,
  site,
  skus,
  snapshot,
} from '../data/seed'
import { CodeToken, PageFooter, ReasonChip, SeverityBadge, Sparkline } from '../components/ui'
import { useToast } from '../components/toast'

// ── Canned assistant responses (keyword-matched, all from seed data) ─────────

const earbuds = getSku('SKU-88412')

function matchResponse(text) {
  const t = text.toLowerCase()
  if (/(risk|sla|cutoff|late|miss)/.test(t)) {
    return [
      {
        kind: 'p',
        text: (
          <>
            3 orders are at risk of missing today’s cutoffs. Two share the same root cause —{' '}
            <CodeToken>SKU-88412</CodeToken> is short 140 units until{' '}
            <CodeToken>ASN-2291</CodeToken> is received.
          </>
        ),
      },
      { kind: 'ordersTable' },
    ]
  }
  if (/(supplier|vendor|hua-tech|short.?ship)/.test(t)) {
    return [
      {
        kind: 'p',
        text: (
          <>
            One supplier needs attention: Hua-Tech Electronics has short-shipped twice in the last
            90 days on this lane. Their current shipment <CodeToken>ASN-2291</CodeToken> (
            <CodeToken>PO-7716</CodeToken>) has a 20-unit discrepancy I flagged at 71% confidence —
            it’s waiting on a receiving decision now.
          </>
        ),
      },
      {
        kind: 'reason',
        text: 'This answer uses 90 days of receiving history. Full supplier scorecards are planned for Phase 2.',
      },
      { kind: 'link', label: 'Review ASN-2291 in Inbound', to: '/inbound' },
    ]
  }
  if (/(where|locate|find)/.test(t)) {
    return [
      {
        kind: 'p',
        text: (
          <>
            <CodeToken>SKU-88412</CodeToken> · Wireless Earbuds Pro is stocked in{' '}
            <CodeToken>C-11-07</CodeToken> (Zone C, mid reserve) with {earbuds.onHand} units on
            hand. Replenishment of 240 units is inbound on <CodeToken>ASN-2291</CodeToken>, due
            today 10:30 at Dock 2.
          </>
        ),
      },
      {
        kind: 'reason',
        text: 'Slotting recommends moving this SKU to A-02-04 — velocity is up 38% over 14 days.',
      },
      { kind: 'link', label: 'View slotting recommendation', to: '/slotting' },
    ]
  }
  if (/(stock|inventory|on.?hand)/.test(t)) {
    return [
      {
        kind: 'p',
        text: 'Here are current stock positions for your A-tier SKUs. One needs attention — Wireless Earbuds Pro is short 140 units against today’s demand.',
      },
      { kind: 'stockTable' },
      {
        kind: 'p',
        text: (
          <>
            The shortfall clears if <CodeToken>ASN-2291</CodeToken> is received on time, but its
            packing list shows 20 units fewer than the PO.
          </>
        ),
      },
      { kind: 'link', label: 'Review ASN-2291 in Inbound', to: '/inbound' },
    ]
  }
  if (/(labor|today|utilization|staffing)/.test(t)) {
    return [
      {
        kind: 'p',
        text: `Labor utilization is at ${snapshot.laborUtilization} across ${site.code}. ${snapshot.ordersDueToday} orders are due today (${snapshot.unitsToPick.toLocaleString()} units to pick). Picking is on pace, but Dock 3 receiving is running 47 minutes behind — if it slips past 11:30, consider shifting one putaway associate to picking ahead of the 14:30 cutoff.`,
      },
      {
        kind: 'reason',
        text: 'Dock-to-stock is averaging 3.2 hrs today, 41% faster than the manual baseline.',
      },
    ]
  }
  return [
    {
      kind: 'p',
      text: 'I can help with stock levels, item locations, labor, and today’s exceptions. Try asking:',
    },
    {
      kind: 'p',
      text: (
        <span className="text-ink-muted">
          “Where is SKU-88412 stocked?” · “Show stock levels” · “How’s labor today?”
        </span>
      ),
    },
  ]
}

const suggestedPrompts = [
  'Where is SKU-88412 stocked?',
  'Show stock levels for A-tier SKUs',
  'How’s labor utilization today?',
  'Which suppliers short-shipped recently?',
]

// ── Message blocks ───────────────────────────────────────────────────────────

function OrdersTable({ onCreateWave }) {
  return (
    <div className="mt-1 overflow-hidden rounded-card border border-line">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-line bg-canvas text-left text-[11px] font-medium uppercase tracking-wide text-ink-muted">
            <th className="px-3 py-2">Order</th>
            <th className="px-3 py-2">Customer</th>
            <th className="px-3 py-2">Cutoff</th>
            <th className="px-3 py-2">Risk reason</th>
          </tr>
        </thead>
        <tbody>
          {atRiskOrders.map((o) => (
            <tr key={o.id} className="border-b border-line last:border-0 hover:bg-canvas">
              <td className="px-3 py-2">
                <CodeToken>{o.id}</CodeToken>
              </td>
              <td className="px-3 py-2">{o.customer}</td>
              <td className="px-3 py-2 font-mono text-[12px] tabular">{o.cutoff}</td>
              <td className="px-3 py-2 text-ink-secondary">{o.riskReason}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-line bg-canvas px-3 py-2">
        <button
          type="button"
          onClick={onCreateWave}
          className="rounded-md bg-accent px-3 py-1.5 text-[12.5px] font-medium text-white hover:bg-[#2A2DB3]"
        >
          Create pick wave
        </button>
      </div>
    </div>
  )
}

function StockTable() {
  const aTier = skus.filter((s) => s.tier === 'A')
  return (
    <div className="mt-1 overflow-hidden rounded-card border border-line">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-line bg-canvas text-left text-[11px] font-medium uppercase tracking-wide text-ink-muted">
            <th className="px-3 py-2">SKU</th>
            <th className="px-3 py-2">Item</th>
            <th className="px-3 py-2 text-right">On hand</th>
            <th className="px-3 py-2 text-right">Demand today</th>
            <th className="px-3 py-2">14-day trend</th>
            <th className="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {aTier.map((s) => {
            const short = s.demandToday > s.onHand
            return (
              <tr key={s.sku} className="border-b border-line last:border-0 hover:bg-canvas">
                <td className="px-3 py-2">
                  <CodeToken>{s.sku}</CodeToken>
                </td>
                <td className="px-3 py-2">{s.name}</td>
                <td className="px-3 py-2 text-right font-mono text-[12px] tabular">{s.onHand}</td>
                <td className="px-3 py-2 text-right font-mono text-[12px] tabular">
                  {s.demandToday}
                </td>
                <td className="px-3 py-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkline data={s.trend14d} />
                    <span
                      className={`text-[11px] font-medium tabular ${
                        s.velocityDelta.startsWith('+')
                          ? 'text-sev-green'
                          : s.velocityDelta.startsWith('-')
                            ? 'text-sev-red'
                            : 'text-ink-muted'
                      }`}
                    >
                      {s.velocityDelta}
                    </span>
                  </span>
                </td>
                <td className="px-3 py-2">
                  {short ? (
                    <span className="text-[12px] font-medium text-sev-red">
                      Short {s.demandToday - s.onHand}
                    </span>
                  ) : (
                    <span className="text-[12px] text-sev-green">OK</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function MessageBlocks({ blocks, onCreateWave }) {
  return (
    <div className="flex flex-col gap-2">
      {blocks.map((b, i) => {
        if (b.kind === 'p') return <p key={i}>{b.text}</p>
        if (b.kind === 'reason')
          return (
            <div key={i}>
              <ReasonChip>{b.text}</ReasonChip>
            </div>
          )
        if (b.kind === 'ordersTable') return <OrdersTable key={i} onCreateWave={onCreateWave} />
        if (b.kind === 'stockTable') return <StockTable key={i} />
        if (b.kind === 'link')
          return (
            <Link
              key={i}
              to={b.to}
              className="inline-flex w-fit items-center gap-1 text-[13px] font-medium text-accent hover:underline"
            >
              {b.label}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )
        return null
      })}
    </div>
  )
}

function Message({ msg, onCreateWave }) {
  if (msg.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-card rounded-br-sm bg-accent px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white">
          {msg.text}
        </div>
      </div>
    )
  }
  return (
    <div className="flex gap-2.5">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft">
        <Sparkles size={14} className="text-accent" aria-hidden="true" />
      </div>
      <div className="min-w-0 max-w-[88%] text-[13.5px] leading-relaxed text-ink">
        <MessageBlocks blocks={msg.blocks} onCreateWave={onCreateWave} />
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft">
        <Sparkles size={14} className="text-accent" aria-hidden="true" />
      </div>
      <div className="flex items-center gap-1 rounded-card border border-line bg-white px-3 py-2.5">
        <span className="typing-dot" />
        <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
        <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
        <span className="sr-only">Copilot is typing</span>
      </div>
    </div>
  )
}

// ── Exception cards ──────────────────────────────────────────────────────────

function ExceptionCard({ exc }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-card border border-line bg-white p-3.5 shadow-card transition-shadow hover:shadow-panel">
      <div className="flex items-center justify-between gap-2">
        <SeverityBadge severity={exc.severity} />
      </div>
      <h3 className="text-[13px] font-semibold leading-snug">{exc.title}</h3>
      <p className="text-[12.5px] leading-relaxed text-ink-secondary">{exc.body}</p>
      {exc.action.to ? (
        <Link
          to={exc.action.to}
          className="mt-auto inline-flex w-fit items-center gap-1 pt-1 text-[12.5px] font-medium text-accent hover:underline"
        >
          {exc.action.label}
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      ) : (
        <span className="mt-auto pt-1 text-[12.5px] text-ink-faint">{exc.action.label}</span>
      )}
    </div>
  )
}

// ── Context panel ────────────────────────────────────────────────────────────

function ContextPanel() {
  const stats = [
    { label: 'Orders due today', value: snapshot.ordersDueToday },
    { label: 'Units to pick', value: snapshot.unitsToPick.toLocaleString() },
    { label: 'Labor utilization', value: snapshot.laborUtilization },
    { label: 'Open exceptions', value: snapshot.openExceptions },
  ]
  return (
    <div className="flex w-[300px] shrink-0 flex-col gap-4">
      <section className="rounded-card border border-line bg-white p-4 shadow-card">
        <h2 className="text-[13px] font-semibold">
          Today at <span className="font-mono text-[12px]">{site.code}</span>
        </h2>
        <dl className="mt-3 grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-md border border-line bg-canvas px-3 py-2.5">
              <dt className="text-[11px] text-ink-muted">{s.label}</dt>
              <dd className="mt-0.5 text-[18px] font-semibold tabular">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-card border border-line bg-white p-4 shadow-card">
        <h2 className="text-[13px] font-semibold">One story to follow</h2>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-secondary">
          <CodeToken>SKU-88412</CodeToken> Wireless Earbuds Pro is short 140 units against today’s
          demand. Its replenishment and a slotting fix are both in flight:
        </p>
        <div className="mt-2.5 flex flex-col gap-1.5">
          <Link to="/inbound" className="text-[12.5px] font-medium text-accent hover:underline">
            ASN-2291 · receiving discrepancy →
          </Link>
          <Link to="/slotting" className="text-[12.5px] font-medium text-accent hover:underline">
            Move to forward-pick · velocity +38% →
          </Link>
        </div>
      </section>

      <section className="rounded-card border border-line bg-white p-4 shadow-card">
        <h2 className="text-[13px] font-semibold">Receiving</h2>
        <p className="mt-1.5 text-[12.5px] text-ink-secondary">
          Dock-to-stock <span className="font-semibold text-ink">{inboundStats.dockToStock}</span>{' '}
          <span className="text-sev-green">({inboundStats.dockToStockDelta})</span>
        </p>
      </section>
    </div>
  )
}

// ── Screen ───────────────────────────────────────────────────────────────────

export default function Copilot() {
  const toast = useToast()
  const [messages, setMessages] = useState(() => [
    { role: 'user', text: 'Which orders are at risk of missing SLA today?' },
    {
      role: 'assistant',
      blocks: [
        {
          kind: 'p',
          text: (
            <>
              3 orders are at risk of missing today’s cutoffs. Two share the same root cause —{' '}
              <CodeToken>SKU-88412</CodeToken> is short 140 units until{' '}
              <CodeToken>ASN-2291</CodeToken> is received.
            </>
          ),
        },
        { kind: 'ordersTable' },
      ],
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, typing])

  function send(text) {
    const trimmed = text.trim()
    if (!trimmed || typing) return
    setMessages((m) => [...m, { role: 'user', text: trimmed }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', blocks: matchResponse(trimmed) }])
      setTyping(false)
    }, 800)
  }

  function onCreateWave() {
    toast('Pick wave created · 3 orders, 2 pickers assigned')
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 gap-5 px-6 pt-5">
        {/* Left: exceptions + chat */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <section aria-label="Exceptions surfaced by Copilot">
            <div className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-ink-muted">
              <Sparkles size={13} className="text-accent" aria-hidden="true" />
              Needs attention — surfaced by Copilot
            </div>
            <div className="grid grid-cols-3 gap-3">
              {exceptions.map((e) => (
                <ExceptionCard key={e.id} exc={e} />
              ))}
            </div>
          </section>

          <section
            aria-label="Copilot chat"
            className="flex min-h-0 flex-1 flex-col rounded-card border border-line bg-white shadow-card"
          >
            <div ref={scrollRef} className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <Message key={i} msg={m} onCreateWave={onCreateWave} />
              ))}
              {typing && <TypingIndicator />}
            </div>

            <div className="border-t border-line p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send(input)
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about stock, locations, labor, or exceptions…"
                  aria-label="Message Copilot"
                  className="flex-1 rounded-md border border-line bg-canvas px-3 py-2 text-[13.5px] placeholder:text-ink-faint focus:border-accent focus:bg-white"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!input.trim() || typing}
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-white hover:bg-[#2A2DB3] disabled:opacity-40"
                >
                  <ArrowUp size={16} />
                </button>
              </form>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => send(p)}
                    className="rounded-full border border-line bg-white px-2.5 py-1 text-[12px] text-ink-secondary hover:border-accent hover:text-accent"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        <ContextPanel />
      </div>
      <PageFooter />
    </div>
  )
}

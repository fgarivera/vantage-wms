import { useState } from 'react'
import { ArrowRight, Check, CheckCircle2, X } from 'lucide-react'
import { slottingRecs, slottingSummary, zones } from '../data/seed'
import { CodeToken, PageFooter, ReasonChip } from '../components/ui'
import { useToast } from '../components/toast'

// Indigo intensity by pick velocity. Calm, on-brand — not a traffic light.
const heatFill = {
  5: { fill: '#3538CD', opacity: 0.88, text: '#FFFFFF' },
  4: { fill: '#3538CD', opacity: 0.62, text: '#FFFFFF' },
  3: { fill: '#3538CD', opacity: 0.4, text: '#1D2178' },
  2: { fill: '#3538CD', opacity: 0.22, text: '#383D8F' },
  1: { fill: '#3538CD', opacity: 0.1, text: '#475467' },
}

// Simplified floor plan: docks at the bottom, Zone A (forward pick) beside
// them, reserve zones further back. The dashed arrow is the SKU-88412 move.
function ZoneHeatmap() {
  const z = Object.fromEntries(zones.map((x) => [x.zone, x]))
  const rects = [
    { zone: 'D', x: 16, y: 16, w: 152, h: 108 },
    { zone: 'E', x: 180, y: 16, w: 152, h: 108 },
    { zone: 'B', x: 16, y: 136, w: 152, h: 108 },
    { zone: 'C', x: 180, y: 136, w: 152, h: 108 },
    { zone: 'A', x: 16, y: 256, w: 316, h: 76 },
  ]
  return (
    <svg
      viewBox="0 0 348 400"
      role="img"
      aria-label="Warehouse zone heatmap, zones A through E colored by pick velocity"
      className="w-full"
    >
      {rects.map((r) => {
        const tone = heatFill[z[r.zone].heat]
        return (
          <g key={r.zone}>
            <rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              rx="6"
              fill={tone.fill}
              fillOpacity={tone.opacity}
              stroke="#E4E7EC"
            />
            <text
              x={r.x + 12}
              y={r.y + 26}
              fontSize="15"
              fontWeight="600"
              fill={tone.text}
              fontFamily="Inter, sans-serif"
            >
              Zone {r.zone}
            </text>
            <text
              x={r.x + 12}
              y={r.y + 44}
              fontSize="11"
              fill={tone.text}
              fillOpacity="0.85"
              fontFamily="Inter, sans-serif"
            >
              {z[r.zone].label} · {z[r.zone].picksPerDay.toLocaleString()} picks/day
            </text>
          </g>
        )
      })}

      {/* SKU-88412 recommended move: Zone C → Zone A */}
      <defs>
        <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#B54708" />
        </marker>
      </defs>
      <path
        d="M 256 200 C 256 240, 220 250, 200 270"
        fill="none"
        stroke="#B54708"
        strokeWidth="1.75"
        strokeDasharray="5 4"
        markerEnd="url(#arrowhead)"
      />
      <rect x="206" y="206" width="86" height="18" rx="9" fill="#FFFAEB" stroke="#FEDF89" />
      <text
        x="249"
        y="218.5"
        fontSize="10"
        fontWeight="600"
        fill="#B54708"
        textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
      >
        SKU-88412
      </text>

      {/* Docks */}
      {[1, 2, 3].map((d, i) => (
        <g key={d}>
          <rect
            x={16 + i * 108}
            y={348}
            width={100}
            height={36}
            rx="6"
            fill="#F6F7F9"
            stroke="#E4E7EC"
          />
          <text
            x={66 + i * 108}
            y={370}
            fontSize="11"
            fill="#667085"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
          >
            Dock {d}
          </text>
        </g>
      ))}
    </svg>
  )
}

function HeatLegend() {
  return (
    <div className="flex items-center gap-2 text-[11px] text-ink-muted">
      <span>Low</span>
      <div className="flex overflow-hidden rounded">
        {[1, 2, 3, 4, 5].map((h) => (
          <div
            key={h}
            className="h-2.5 w-7"
            style={{ backgroundColor: heatFill[h].fill, opacity: heatFill[h].opacity }}
          />
        ))}
      </div>
      <span>High pick velocity</span>
    </div>
  )
}

function RecRow({ rec, onAccept, onDismiss }) {
  return (
    <li className="flex items-center gap-4 border-b border-line px-4 py-3 last:border-b-0 hover:bg-canvas">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <CodeToken>{rec.sku}</CodeToken>
          <span className="text-[13px] font-medium">{rec.name}</span>
          <span className="flex items-center gap-1.5">
            <CodeToken>{rec.fromBin}</CodeToken>
            <ArrowRight size={13} className="text-ink-faint" aria-hidden="true" />
            <CodeToken className="border-accent/30 bg-accent-soft text-accent">
              {rec.toBin}
            </CodeToken>
          </span>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <ReasonChip>{rec.reason}</ReasonChip>
          <span className="text-[12px] text-ink-muted">{rec.impact}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => onAccept(rec.id)}
          className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-[12.5px] font-medium text-white hover:bg-[#2A2DB3]"
        >
          <Check size={14} aria-hidden="true" />
          Accept
        </button>
        <button
          type="button"
          onClick={() => onDismiss(rec.id)}
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink-secondary hover:border-ink-faint hover:text-ink"
        >
          <X size={14} aria-hidden="true" />
          Dismiss
        </button>
      </div>
    </li>
  )
}

export default function Slotting() {
  const toast = useToast()
  const [statuses, setStatuses] = useState({}) // id → 'accepted' | 'dismissed'

  const pending = slottingRecs.filter((r) => !statuses[r.id])
  const accepted = slottingRecs.filter((r) => statuses[r.id] === 'accepted')
  const dismissedCount = slottingRecs.filter((r) => statuses[r.id] === 'dismissed').length

  function accept(id) {
    setStatuses((s) => ({ ...s, [id]: 'accepted' }))
    toast('Move accepted · task queued for the replenishment team')
  }

  function dismiss(id) {
    setStatuses((s) => ({ ...s, [id]: 'dismissed' }))
    toast('Recommendation dismissed')
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col gap-4 px-6 pt-5">
        <header>
          <h1 className="text-[16px] font-semibold">AI Slotting &amp; Replenishment</h1>
          <p className="mt-0.5 text-[13px] text-ink-secondary">
            {pending.length} recommended move{pending.length === 1 ? '' : 's'} ·{' '}
            {slottingSummary.projected}
          </p>
        </header>

        <div className="flex min-h-0 flex-1 gap-4">
          <section
            aria-label="Warehouse zone heatmap"
            className="flex w-[380px] shrink-0 flex-col gap-3 self-start rounded-card border border-line bg-white p-4 shadow-card"
          >
            <h2 className="text-[13px] font-semibold">
              Pick velocity by zone · <span className="font-mono text-[12px]">MNL-01</span>
            </h2>
            <ZoneHeatmap />
            <HeatLegend />
            <p className="text-[12px] leading-relaxed text-ink-muted">
              Zone A sits beside the outbound docks. The dashed line is the top recommended move —{' '}
              <CodeToken>SKU-88412</CodeToken> from mid reserve into forward-pick.
            </p>
          </section>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto pb-2">
            <section
              aria-label="Recommended moves"
              className="overflow-hidden rounded-card border border-line bg-white shadow-card"
            >
              <h2 className="border-b border-line px-4 py-3 text-[13px] font-semibold">
                Recommended moves{' '}
                <span className="ml-1 rounded-full bg-canvas px-2 py-0.5 font-mono text-[11px] text-ink-secondary tabular">
                  {pending.length}
                </span>
                {dismissedCount > 0 && (
                  <span className="ml-2 text-[11.5px] font-normal text-ink-faint">
                    {dismissedCount} dismissed
                  </span>
                )}
              </h2>
              {pending.length > 0 ? (
                <ul>
                  {pending.map((r) => (
                    <RecRow key={r.id} rec={r} onAccept={accept} onDismiss={dismiss} />
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-6 text-center text-[13px] text-ink-muted">
                  All caught up — no open recommendations. The model re-ranks overnight.
                </p>
              )}
            </section>

            {accepted.length > 0 && (
              <section
                aria-label="Accepted today"
                className="overflow-hidden rounded-card border border-line bg-white shadow-card"
              >
                <h2 className="border-b border-line px-4 py-3 text-[13px] font-semibold">
                  Accepted today{' '}
                  <span className="ml-1 rounded-full bg-sev-green-bg px-2 py-0.5 font-mono text-[11px] text-sev-green tabular">
                    {accepted.length}
                  </span>
                </h2>
                <ul>
                  {accepted.map((r) => (
                    <li
                      key={r.id}
                      className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-b-0"
                    >
                      <CheckCircle2 size={15} className="shrink-0 text-sev-green" aria-hidden="true" />
                      <CodeToken>{r.sku}</CodeToken>
                      <span className="text-[13px] text-ink-secondary">{r.name}</span>
                      <span className="flex items-center gap-1.5">
                        <CodeToken>{r.fromBin}</CodeToken>
                        <ArrowRight size={13} className="text-ink-faint" aria-hidden="true" />
                        <CodeToken>{r.toBin}</CodeToken>
                      </span>
                      <span className="ml-auto text-[12px] text-ink-muted">{r.impact}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  )
}

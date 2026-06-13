import { Sparkles } from 'lucide-react'

// Operational codes — SKUs, bins, ASN/PO/order numbers — always render as
// monospace tokens. This is the signature detail of the design system.
export function CodeToken({ children, className = '' }) {
  return <span className={`code-token whitespace-nowrap ${className}`}>{children}</span>
}

export function ConfidenceBadge({ value }) {
  const tone =
    value >= 90
      ? 'border-sev-green-line bg-sev-green-bg text-sev-green'
      : value >= 80
        ? 'border-line bg-canvas text-ink-secondary'
        : 'border-sev-amber-line bg-sev-amber-bg text-sev-amber'
  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 font-mono text-[11px] font-medium tabular ${tone}`}
      title={`AI extraction confidence: ${value}%`}
    >
      {value}%
    </span>
  )
}

// Plain-language AI reasoning, one sentence, muted styling.
export function ReasonChip({ children }) {
  return (
    <span className="inline-flex items-start gap-1.5 rounded-full border border-line bg-canvas px-2.5 py-1 text-[12px] leading-snug text-ink-secondary">
      <Sparkles size={12} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
      <span>{children}</span>
    </span>
  )
}

const severityTones = {
  high: 'border-sev-red-line bg-sev-red-bg text-sev-red',
  medium: 'border-sev-amber-line bg-sev-amber-bg text-sev-amber',
  low: 'border-line bg-canvas text-ink-secondary',
}

export function SeverityBadge({ severity }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize ${severityTones[severity]}`}
    >
      {severity}
    </span>
  )
}

// Tiny inline trend chart for 14-day velocity data. Hand-rolled SVG — no
// charting library needed at this size.
export function Sparkline({ data, width = 64, height = 18 }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pad = 2
  const points = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (width - pad * 2)
      const y = height - pad - ((v - min) / range) * (height - pad * 2)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  const [lastX, lastY] = points.split(' ').pop().split(',')
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="inline-block align-middle"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke="#3538CD"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx={lastX} cy={lastY} r="1.75" fill="#3538CD" />
    </svg>
  )
}

export function PageFooter() {
  return (
    <p className="px-6 pb-4 pt-2 text-[11px] text-ink-faint">Phase 1 prototype · seeded data</p>
  )
}

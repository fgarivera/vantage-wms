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

export function PageFooter() {
  return (
    <p className="px-6 pb-4 pt-2 text-[11px] text-ink-faint">Phase 1 prototype · seeded data</p>
  )
}

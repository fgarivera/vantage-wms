import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  PauseCircle,
  Phone,
  ThumbsUp,
  X,
} from 'lucide-react'
import { asns, inboundStats } from '../data/seed'
import { CodeToken, ConfidenceBadge, PageFooter, ReasonChip } from '../components/ui'
import { useToast } from '../components/toast'

const statusTones = {
  Processing: 'border-accent/30 bg-accent-soft text-accent',
  Receiving: 'border-sev-amber-line bg-sev-amber-bg text-sev-amber',
  Scheduled: 'border-line bg-canvas text-ink-secondary',
  Completed: 'border-sev-green-line bg-sev-green-bg text-sev-green',
  Putaway: 'border-sev-green-line bg-sev-green-bg text-sev-green',
}

function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${statusTones[status] ?? statusTones.Scheduled}`}
    >
      {status}
    </span>
  )
}

function StatStrip() {
  const stats = [
    {
      label: 'Dock-to-stock',
      value: inboundStats.dockToStock,
      note: inboundStats.dockToStockDelta,
    },
    { label: 'ASNs today', value: inboundStats.asnsToday },
    { label: 'Units expected today', value: inboundStats.unitsExpectedToday.toLocaleString() },
    { label: 'Lines auto-matched', value: inboundStats.autoMatchedLines },
  ]
  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-card border border-line bg-white px-4 py-3 shadow-card">
          <div className="text-[11px] text-ink-muted">{s.label}</div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="text-[20px] font-semibold tabular">{s.value}</span>
            {s.note && <span className="text-[11.5px] font-medium text-sev-green">{s.note}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

function ReceivingQueue({ selectedId, onSelect, statusOverrides }) {
  return (
    <section
      aria-label="Receiving queue"
      className="flex w-[330px] shrink-0 flex-col overflow-hidden rounded-card border border-line bg-white shadow-card"
    >
      <h2 className="border-b border-line px-4 py-3 text-[13px] font-semibold">Receiving queue</h2>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {asns.map((a) => {
          const status = statusOverrides[a.id] ?? a.status
          const selected = a.id === selectedId
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => onSelect(a.id)}
              aria-current={selected ? 'true' : undefined}
              className={`flex w-full flex-col gap-1 border-b border-line px-4 py-3 text-left last:border-b-0 ${
                selected ? 'bg-accent-soft/60' : 'hover:bg-canvas'
              }`}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <CodeToken className={selected ? 'border-accent/30 text-accent' : ''}>
                  {a.id}
                </CodeToken>
                <StatusPill status={status} />
              </div>
              <div className="text-[13px] font-medium text-ink">{a.supplier}</div>
              <div className="text-[12px] text-ink-muted">
                ETA {a.eta} · {a.dock}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function DocumentThumbnail() {
  return (
    <figure className="w-[170px] shrink-0">
      <div className="rounded-md border border-line bg-white p-3 shadow-card">
        <div className="flex items-center gap-1.5 border-b border-line pb-2">
          <FileText size={13} className="text-ink-faint" aria-hidden="true" />
          <span className="text-[9px] font-semibold uppercase tracking-widest text-ink-secondary">
            Packing list
          </span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-1.5 w-3/4 rounded bg-gray-200" />
          <div className="h-1.5 w-1/2 rounded bg-gray-200" />
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="flex gap-1">
            <div className="h-1.5 flex-[2] rounded bg-gray-200" />
            <div className="h-1.5 flex-1 rounded bg-gray-200" />
          </div>
          <div className="flex gap-1">
            <div className="h-1.5 flex-[2] rounded bg-gray-200" />
            <div className="h-1.5 flex-1 rounded bg-gray-200" />
          </div>
          <div className="flex gap-1">
            <div className="h-1.5 flex-[2] rounded bg-gray-200" />
            <div className="h-1.5 flex-1 rounded bg-gray-200" />
          </div>
          <div className="flex gap-1">
            <div className="h-1.5 flex-[2] rounded bg-sev-amber-line" />
            <div className="h-1.5 flex-1 rounded bg-sev-amber-line" />
          </div>
        </div>
        <div className="mt-3 h-1.5 w-2/3 rounded bg-gray-200" />
      </div>
      <figcaption className="mt-1.5 text-center text-[11px] text-ink-faint">
        packing-list-2291.pdf · scanned 09:42
      </figcaption>
    </figure>
  )
}

const resolutionLabels = {
  approved: 'Approved as-is',
  held: 'Line held',
  contacted: 'Supplier contacted',
}

function ExtractionTable({ asn, resolution, onOpenFlag }) {
  return (
    <div className="min-w-0 flex-1 overflow-hidden rounded-card border border-line">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-line bg-canvas text-left text-[11px] font-medium uppercase tracking-wide text-ink-muted">
            <th className="px-3 py-2">SKU</th>
            <th className="px-3 py-2">Item</th>
            <th className="px-3 py-2 text-right">PO qty</th>
            <th className="px-3 py-2 text-right">Doc qty</th>
            <th className="px-3 py-2">Confidence</th>
            <th className="px-3 py-2">Match</th>
          </tr>
        </thead>
        <tbody>
          {asn.lines.map((line) => {
            const flagged = line.status === 'flagged'
            return (
              <tr
                key={line.sku}
                className={
                  flagged
                    ? 'border-b border-sev-amber-line bg-sev-amber-bg/60 last:border-b-0'
                    : 'border-b border-line last:border-b-0 hover:bg-canvas'
                }
              >
                <td className="px-3 py-2.5">
                  <CodeToken>{line.sku}</CodeToken>
                </td>
                <td className="px-3 py-2.5">{line.name}</td>
                <td className="px-3 py-2.5 text-right font-mono text-[12px] tabular">
                  {line.poQty}
                </td>
                <td
                  className={`px-3 py-2.5 text-right font-mono text-[12px] tabular ${flagged ? 'font-semibold text-sev-amber' : ''}`}
                >
                  {line.docQty}
                </td>
                <td className="px-3 py-2.5">
                  <ConfidenceBadge value={line.confidence} />
                </td>
                <td className="px-3 py-2.5">
                  {flagged ? (
                    resolution ? (
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-secondary">
                        <CheckCircle2 size={14} className="text-sev-green" aria-hidden="true" />
                        {resolutionLabels[resolution]}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={onOpenFlag}
                        className="inline-flex items-center gap-1.5 rounded-md text-left text-[12px] font-medium text-sev-amber hover:underline"
                      >
                        <AlertTriangle size={14} className="shrink-0" aria-hidden="true" />
                        {line.flag} — review
                      </button>
                    )
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-sev-green">
                      <CheckCircle2 size={14} aria-hidden="true" />
                      Matched
                    </span>
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

function FlagPanel({ line, onResolve, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const options = [
    {
      key: 'approved',
      label: 'Approve as-is',
      desc: 'Receive 220 units. The 20-unit gap posts as a supplier shortage claim.',
      icon: ThumbsUp,
    },
    {
      key: 'held',
      label: 'Hold line',
      desc: 'Quarantine this line for a physical count before it joins putaway.',
      icon: PauseCircle,
    },
    {
      key: 'contacted',
      label: 'Contact supplier',
      desc: 'Open a discrepancy case with Hua-Tech and request carton-level detail.',
      icon: Phone,
    },
  ]

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-ink/20"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-label="Review flagged line"
        className="fixed inset-y-0 right-0 z-50 flex w-[400px] flex-col border-l border-line bg-white shadow-panel"
      >
        <header className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <h2 className="text-[14px] font-semibold">Quantity mismatch on this line</h2>
            <div className="mt-1 flex items-center gap-2 text-[12.5px] text-ink-secondary">
              <CodeToken>{line.sku}</CodeToken>
              {line.name}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="rounded-md p-1 text-ink-muted hover:bg-canvas hover:text-ink"
          >
            <X size={16} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <div className="flex items-center gap-3 rounded-card border border-sev-amber-line bg-sev-amber-bg px-4 py-3">
            <div className="text-center">
              <div className="text-[11px] text-ink-muted">PO</div>
              <div className="font-mono text-[18px] font-semibold tabular">{line.poQty}</div>
            </div>
            <div className="text-ink-faint">→</div>
            <div className="text-center">
              <div className="text-[11px] text-ink-muted">Document</div>
              <div className="font-mono text-[18px] font-semibold tabular text-sev-amber">
                {line.docQty}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-[11px] text-ink-muted">Confidence</div>
              <ConfidenceBadge value={line.confidence} />
            </div>
          </div>

          <h3 className="mt-4 text-[12px] font-semibold uppercase tracking-wide text-ink-muted">
            Why the AI flagged this
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-secondary">{line.aiReasoning}</p>

          <div className="mt-3">
            <ReasonChip>
              Confidence is below the 80% auto-receive threshold, so this line needs a human
              decision.
            </ReasonChip>
          </div>

          <h3 className="mt-5 text-[12px] font-semibold uppercase tracking-wide text-ink-muted">
            Your decision
          </h3>
          <div className="mt-2 flex flex-col gap-2">
            {options.map((o) => (
              <button
                key={o.key}
                type="button"
                onClick={() => onResolve(o.key)}
                className="flex items-start gap-3 rounded-card border border-line bg-white px-4 py-3 text-left hover:border-accent hover:bg-accent-soft/40"
              >
                <o.icon size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <span className="block text-[13px] font-semibold">{o.label}</span>
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-secondary">
                    {o.desc}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

function AsnDetail({ asn, resolution, confirmed, onOpenFlag, onConfirm }) {
  const isProcessing = asn.id === 'ASN-2291'

  if (!isProcessing) {
    return (
      <section className="flex min-w-0 flex-1 flex-col rounded-card border border-line bg-white p-5 shadow-card">
        <header className="flex items-center gap-3">
          <CodeToken>{asn.id}</CodeToken>
          <CodeToken>{asn.po}</CodeToken>
          <h2 className="text-[15px] font-semibold">{asn.supplier}</h2>
          <StatusPill status={asn.status} />
        </header>
        <dl className="mt-4 grid w-fit grid-cols-4 gap-x-8 gap-y-1 text-[13px]">
          <dt className="text-ink-muted">ETA</dt>
          <dt className="text-ink-muted">Dock</dt>
          <dt className="text-ink-muted">Lines</dt>
          <dt className="text-ink-muted">Units</dt>
          <dd className="tabular">{asn.eta}</dd>
          <dd>{asn.dock}</dd>
          <dd className="tabular">{asn.lineCount}</dd>
          <dd className="tabular">{asn.unitCount.toLocaleString()}</dd>
        </dl>
        <div className="mt-8 flex flex-1 flex-col items-center justify-center text-center">
          <FileText size={22} className="text-ink-faint" aria-hidden="true" />
          <p className="mt-2 max-w-xs text-[13px] text-ink-muted">
            {asn.status === 'Completed'
              ? 'Received and put away. Documents are archived on the PO.'
              : 'AI extraction starts when shipping documents arrive at the dock.'}
          </p>
        </div>
      </section>
    )
  }

  const unresolvedFlag = !resolution

  return (
    <section className="flex min-w-0 flex-1 flex-col overflow-y-auto rounded-card border border-line bg-white p-5 shadow-card">
      <header className="flex flex-wrap items-center gap-3">
        <CodeToken>{asn.id}</CodeToken>
        <CodeToken>{asn.po}</CodeToken>
        <h2 className="text-[15px] font-semibold">{asn.supplier}</h2>
        <StatusPill status={confirmed ? 'Putaway' : asn.status} />
        <span className="ml-auto text-[12.5px] text-ink-muted">
          ETA {asn.eta} · {asn.dock}
        </span>
      </header>

      <div className="mt-2">
        <ReasonChip>
          4 lines extracted from the packing list — 3 matched the PO automatically, 1 needs your
          review.
        </ReasonChip>
      </div>

      <div className="mt-4 flex items-start gap-5">
        <DocumentThumbnail />
        <ExtractionTable asn={asn} resolution={resolution} onOpenFlag={onOpenFlag} />
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <button
          type="button"
          disabled={unresolvedFlag || confirmed}
          onClick={onConfirm}
          className="rounded-md bg-accent px-4 py-2 text-[13px] font-medium text-white hover:bg-[#2A2DB3] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Confirm &amp; generate putaway tasks
        </button>
        {unresolvedFlag && (
          <span className="text-[12.5px] text-ink-muted">
            Resolve the flagged line to continue — the AI won’t receive it for you.
          </span>
        )}
        {confirmed && (
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-sev-green">
            <CheckCircle2 size={14} aria-hidden="true" />
            Putaway tasks generated · 4 lines, 1,020 units
          </span>
        )}
      </div>
    </section>
  )
}

export default function Inbound() {
  const toast = useToast()
  const [selectedId, setSelectedId] = useState('ASN-2291')
  const [panelOpen, setPanelOpen] = useState(false)
  const [resolution, setResolution] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const selected = asns.find((a) => a.id === selectedId)
  const flaggedLine = asns[0].lines.find((l) => l.status === 'flagged')
  const statusOverrides = confirmed ? { 'ASN-2291': 'Putaway' } : {}

  function resolve(key) {
    setResolution(key)
    setPanelOpen(false)
    const messages = {
      approved: 'Line approved as-is · receiving 220 units, shortage claim posted',
      held: 'Line held · 220 units quarantined pending a physical count',
      contacted: 'Supplier contacted · discrepancy case opened with Hua-Tech',
    }
    toast(messages[key])
  }

  function confirm() {
    setConfirmed(true)
    toast('Putaway tasks generated · 4 lines, 1,020 units')
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col gap-4 px-6 pt-5">
        <StatStrip />
        <div className="flex min-h-0 flex-1 gap-4">
          <ReceivingQueue
            selectedId={selectedId}
            onSelect={setSelectedId}
            statusOverrides={statusOverrides}
          />
          <AsnDetail
            asn={selected}
            resolution={resolution}
            confirmed={confirmed}
            onOpenFlag={() => setPanelOpen(true)}
            onConfirm={confirm}
          />
        </div>
      </div>
      <PageFooter />
      {panelOpen && (
        <FlagPanel line={flaggedLine} onResolve={resolve} onClose={() => setPanelOpen(false)} />
      )}
    </div>
  )
}

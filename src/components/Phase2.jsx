export default function Phase2({ icon: Icon, title, description }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-card border border-line bg-white text-ink-faint shadow-card">
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <h1 className="mt-4 text-[15px] font-semibold text-ink-secondary">{title}</h1>
      <p className="mt-1 max-w-sm text-[13px] text-ink-muted">{description}</p>
      <span className="mt-4 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-medium text-ink-faint">
        Planned for Phase 2
      </span>
    </div>
  )
}

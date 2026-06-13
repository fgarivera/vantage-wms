import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Sparkles,
  ArrowDownToLine,
  Boxes,
  Grid2x2,
  Truck,
  BarChart3,
  Search,
  Bell,
  ChevronDown,
  Warehouse,
  Package,
  FileInput,
  ClipboardList,
  CornerDownLeft,
} from 'lucide-react'
import { site } from '../data/seed'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/copilot', label: 'Copilot', icon: Sparkles },
  { to: '/inbound', label: 'Inbound', icon: ArrowDownToLine },
  {
    to: '/inventory',
    label: 'Inventory',
    icon: Boxes,
    children: [{ to: '/slotting', label: 'AI Slotting', icon: Grid2x2 }],
  },
  { to: '/outbound', label: 'Outbound', icon: Truck },
  { to: '/insights', label: 'Insights', icon: BarChart3 },
]

// Command palette entries: screens plus the operational objects of the
// SKU-88412 story, so a reviewer can jump straight into the thread.
const paletteItems = [
  { label: 'Copilot', to: '/copilot', icon: Sparkles, hint: 'Screen' },
  { label: 'Inbound', to: '/inbound', icon: ArrowDownToLine, hint: 'Screen' },
  { label: 'AI Slotting', to: '/slotting', icon: Grid2x2, hint: 'Screen' },
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, hint: 'Screen' },
  { label: 'Outbound', to: '/outbound', icon: Truck, hint: 'Screen' },
  { label: 'Insights', to: '/insights', icon: BarChart3, hint: 'Screen' },
  {
    code: 'SKU-88412',
    label: 'Wireless Earbuds Pro',
    to: '/slotting',
    icon: Package,
    hint: 'SKU',
  },
  {
    code: 'ASN-2291',
    label: 'Hua-Tech Electronics Mfg.',
    to: '/inbound',
    icon: FileInput,
    hint: 'ASN',
  },
  {
    code: 'SO-10482',
    label: 'Abenson Megamall',
    to: '/copilot',
    icon: ClipboardList,
    hint: 'Order',
  },
]

function CommandPalette({ onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return paletteItems
    return paletteItems.filter((i) =>
      `${i.code ?? ''} ${i.label} ${i.hint}`.toLowerCase().includes(q),
    )
  }, [query])

  useEffect(() => setSel(0), [query])
  useEffect(() => inputRef.current?.focus(), [])

  function go(item) {
    onClose()
    navigate(item.to)
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSel((s) => Math.min(s + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSel((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter' && filtered[sel]) {
      e.preventDefault()
      go(filtered[sel])
    }
  }

  return (
    <div
      className="anim-fade fixed inset-0 z-50 flex items-start justify-center bg-ink/25 pt-[14vh]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-label="Command palette"
        className="anim-pop w-full max-w-lg overflow-hidden rounded-card border border-line bg-white shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
          <Search size={15} className="shrink-0 text-ink-faint" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Jump to a screen, SKU, ASN, or order…"
            aria-label="Search"
            className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-ink-faint"
          />
          <kbd>Esc</kbd>
        </div>
        <ul className="max-h-[320px] overflow-y-auto p-1.5">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center text-[13px] text-ink-muted">
              No matches — try a screen name, SKU, or ASN
            </li>
          )}
          {filtered.map((item, i) => (
            <li key={`${item.label}-${item.hint}`}>
              <button
                type="button"
                onClick={() => go(item)}
                onMouseEnter={() => setSel(i)}
                className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] ${
                  i === sel ? 'bg-accent-soft text-accent' : 'text-ink-secondary'
                }`}
              >
                <item.icon size={15} className="shrink-0" aria-hidden="true" />
                {item.code && <span className="code-token">{item.code}</span>}
                <span className="truncate font-medium">{item.label}</span>
                <span className="ml-auto flex items-center gap-2 text-[11px] text-ink-faint">
                  {item.hint}
                  {i === sel && <CornerDownLeft size={12} aria-hidden="true" />}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function NavItem({ to, label, icon: Icon, end, indent = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors',
          indent ? 'ml-7' : '',
          isActive
            ? 'bg-accent-soft text-accent'
            : 'text-ink-secondary hover:bg-gray-100 hover:text-ink',
        ].join(' ')
      }
    >
      <Icon size={16} strokeWidth={2} />
      {label}
    </NavLink>
  )
}

function Sidebar() {
  const { pathname } = useLocation()
  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-line bg-white">
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white">
          <Warehouse size={17} strokeWidth={2} />
        </div>
        <div>
          <div className="text-[14px] font-semibold leading-tight">Vantage WMS</div>
          <div className="text-[11px] text-ink-muted">Operations platform</div>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Main">
        {nav.map((item) => (
          <div key={item.to}>
            <NavItem {...item} />
            {item.children?.map((child) => (
              <NavItem key={child.to} {...child} indent />
            ))}
          </div>
        ))}
      </nav>
      <div className="border-t border-line p-3 text-[11px] text-ink-faint">
        v0.1 · {pathname.slice(1) || 'copilot'}
      </div>
    </aside>
  )
}

function TopBar({ onOpenPalette }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-line bg-white px-5">
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-[13px] font-medium text-ink-secondary transition-colors hover:bg-gray-50"
      >
        <span className="code-token border-0 bg-transparent p-0">{site.code}</span>
        <span className="text-ink-faint">·</span>
        {site.name}
        <ChevronDown size={14} className="text-ink-faint" />
      </button>

      <button
        type="button"
        onClick={onOpenPalette}
        className="ml-2 flex max-w-md flex-1 items-center gap-2 rounded-md border border-line bg-canvas py-1.5 pl-2.5 pr-2 text-[13px] text-ink-faint transition-colors hover:border-ink-faint/50 hover:text-ink-muted"
      >
        <Search size={15} aria-hidden="true" />
        Search orders, SKUs, bins…
        <span className="ml-auto flex gap-1">
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </span>
      </button>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications, 3 unread"
          className="relative rounded-md p-1.5 text-ink-secondary transition-colors hover:bg-gray-100"
        >
          <Bell size={18} strokeWidth={2} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
            3
          </span>
        </button>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-[12px] font-semibold text-accent"
          aria-label="Account: Francis Rivera"
        >
          FR
        </div>
      </div>
    </header>
  )
}

export default function AppShell() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      } else if (e.key === 'Escape') {
        setPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onOpenPalette={() => setPaletteOpen(true)} />
        <main className="min-w-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
    </div>
  )
}

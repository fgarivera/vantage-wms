import { NavLink, Outlet, useLocation } from 'react-router-dom'
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
} from 'lucide-react'
import { site } from '../data/seed'

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
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
        v0.1 · {pathname === '/' ? 'dashboard' : pathname.slice(1)}
      </div>
    </aside>
  )
}

function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-line bg-white px-5">
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-[13px] font-medium text-ink-secondary hover:bg-gray-50"
      >
        <span className="code-token border-0 bg-transparent p-0">{site.code}</span>
        <span className="text-ink-faint">·</span>
        {site.name}
        <ChevronDown size={14} className="text-ink-faint" />
      </button>

      <div className="relative ml-2 flex-1 max-w-md">
        <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-faint" />
        <input
          type="search"
          placeholder="Search orders, SKUs, bins…"
          className="w-full rounded-md border border-line bg-canvas py-1.5 pl-8 pr-3 text-[13px] placeholder:text-ink-faint focus:border-accent focus:bg-white"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications, 3 unread"
          className="relative rounded-md p-1.5 text-ink-secondary hover:bg-gray-100"
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
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="min-w-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowDownToLine,
  Boxes,
  Grid2x2,
  Truck,
  BarChart3,
} from 'lucide-react'
import AppShell from './components/AppShell'
import Phase2 from './components/Phase2'
import { ToastProvider } from './components/toast'
import Copilot from './screens/Copilot'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route
            index
            element={
              <Phase2
                icon={LayoutDashboard}
                title="Dashboard"
                description="A single-page operational summary: throughput, SLA health, and exceptions across the site."
              />
            }
          />
          <Route path="/copilot" element={<Copilot />} />
          <Route
            path="/inbound"
            element={
              <Phase2
                icon={ArrowDownToLine}
                title="Inbound"
                description="Screen 2 — building next. Smart receiving with AI document extraction."
              />
            }
          />
          <Route
            path="/inventory"
            element={
              <Phase2
                icon={Boxes}
                title="Inventory"
                description="Stock levels, cycle counts, and adjustments across every bin in the site."
              />
            }
          />
          <Route
            path="/slotting"
            element={
              <Phase2
                icon={Grid2x2}
                title="AI Slotting"
                description="Screen 3 — building next. Ranked slotting moves with projected pick-path impact."
              />
            }
          />
          <Route
            path="/outbound"
            element={
              <Phase2
                icon={Truck}
                title="Outbound"
                description="Order management, pick waves, packing, and carrier handoff with SLA tracking."
              />
            }
          />
          <Route
            path="/insights"
            element={
              <Phase2
                icon={BarChart3}
                title="Insights"
                description="Trend reporting on throughput, labor, accuracy, and cost-to-serve."
              />
            }
          />
        </Route>
      </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LayoutDashboard, Boxes, Truck, BarChart3 } from 'lucide-react'
import AppShell from './components/AppShell'
import Phase2 from './components/Phase2'
import { ToastProvider } from './components/toast'
import Copilot from './screens/Copilot'
import Inbound from './screens/Inbound'
import Slotting from './screens/Slotting'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/copilot" replace />} />
          <Route
            path="/dashboard"
            element={
              <Phase2
                icon={LayoutDashboard}
                title="Dashboard"
                description="A single-page operational summary: throughput, SLA health, and exceptions across the site."
              />
            }
          />
          <Route path="/copilot" element={<Copilot />} />
          <Route path="/inbound" element={<Inbound />} />
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
          <Route path="/slotting" element={<Slotting />} />
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

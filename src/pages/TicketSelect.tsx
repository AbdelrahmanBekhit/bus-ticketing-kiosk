import { useLocation, useNavigate } from 'react-router-dom'
import fares from '../data/fares.json'
import { useState, useEffect } from 'react'
import Modal from '../components/Modal'

export default function TicketSelect() {
  const nav = useNavigate()
  const loc = useLocation()

  const [adult, setAdult] = useState(0)
  const [youth, setYouth] = useState(0)
  const [senior, setSenior] = useState(0)
  const [err, setErr] = useState(false)

  // Retrieve route data if passed from previous page
  const routeData = loc.state?.routeData || {
    buses: [
      { id: 1, route: 'Bowness - Forest Lawn', stop: 'Brentwood Station', time: '10 min' },
      { id: 9, route: 'Brentwood - Heritage', stop: 'Albert Park', time: '35 min' },
    ],
  }

  const total =
    adult * fares.oneWay.adult +
    youth * fares.oneWay.youth +
    senior * fares.oneWay.senior

  const confirm = () => {
    if (adult + youth + senior < 1) {
      setErr(true)
      return
    }
    nav('/summary', { state: { items: { adult, youth, senior }, total } })
  }

  // 🟢 Update router state for dynamic progress (33% → 60%)
  useEffect(() => {
    const hasTickets = adult + youth + senior > 0
    const newProgress = hasTickets ? 60 : 33

    if (loc.state?.ticketProgress !== newProgress) {
      nav('.', {
        replace: true,
        state: { ...loc.state, ticketProgress: newProgress },
      })
    }
  }, [adult, youth, senior]) // intentionally minimal

  // 🧩 helper to safely increment/decrement with limits
  const adjustTicket = (setter: (n: number) => void, current: number, delta: number) => {
    const newValue = Math.min(10, Math.max(0, current + delta))
    setter(newValue)
  }

  return (
    <div className="space-y-4">
      {/* ===== Bus Summary Section ===== */}
      <div className="card space-y-2">
        <h3 className="text-center font-semibold text-gray-800">
          {routeData.buses.length} Buses Selected
        </h3>

        <div className="flex flex-col gap-2">
          {routeData.buses.map((bus: any) => (
            <div
              key={bus.id}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-2"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {bus.id} {bus.route}
                </p>
                <p className="text-sm text-gray-500">→ {bus.stop}</p>
              </div>
              <span className="text-orange-500 font-semibold">{bus.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Ticket Selection ===== */}
      <div className="card space-y-3">
        {[
          { label: 'Adult ticket (18–64)', v: adult, set: setAdult },
          { label: 'Youth ticket (10–18)', v: youth, set: setYouth },
          { label: 'Senior ticket (64+)', v: senior, set: setSenior },
        ].map((row) => {
          const isMax = row.v >= 10
          return (
            <div key={row.label} className="flex items-center justify-between">
              <div>{row.label}</div>
              <div className="flex items-center gap-3">
                <button
                  className="btn-secondary"
                  onClick={() => adjustTicket(row.set, row.v, -1)}
                >
                  –
                </button>
                <div className="w-8 text-center font-semibold">{row.v}</div>
                <button
                  onClick={() => adjustTicket(row.set, row.v, 1)}
                  disabled={isMax}
                  className={`btn transition ${
                    isMax
                      ? '!bg-gray-300 !text-gray-600 !border-gray-300 !cursor-not-allowed hover:!bg-gray-300 active:!bg-gray-300'
                      : ''
                  }`}
                >
                  +
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ===== Confirm Button ===== */}
      <div className="mt-4 text-center">
        <button className="btn" onClick={confirm}>
          Confirm
        </button>
      </div>

      {/* ===== Error Modal ===== */}
      <Modal open={err} onClose={() => setErr(false)}>
        <div className="text-center space-y-3">
          <p>Please select at least one ticket to proceed.</p>
          <button className="btn" onClick={() => setErr(false)}>
            OK
          </button>
        </div>
      </Modal>
    </div>
  )
}

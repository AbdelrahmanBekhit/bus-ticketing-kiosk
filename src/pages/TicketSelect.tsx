import { useLocation, useNavigate } from "react-router-dom"
import fares from "../data/fares.json"
import { useState, useEffect } from "react"
import Modal from "../components/Modal"
import type { BusLegSummary } from "./BusLegSummary"

export default function TicketSelect() {
  const nav = useNavigate()
  const loc = useLocation()

  const [adult, setAdult] = useState(0)
  const [youth, setYouth] = useState(0)
  const [senior, setSenior] = useState(0)
  const [err, setErr] = useState(false)

  const routeData: BusLegSummary[] =
    (loc.state?.routeData as BusLegSummary[] | undefined) ?? []

  const total =
    adult * fares.oneWay.adult +
    youth * fares.oneWay.youth +
    senior * fares.oneWay.senior

  const confirm = () => {
    if (adult + youth + senior < 1) {
      setErr(true)
      return
    }

    nav("/summary", {
      state: {
        items: { adult, youth, senior },
        total,
        routeData,
      },
    })
  }

  useEffect(() => {
    const hasTickets = adult + youth + senior > 0
    const newProgress = hasTickets ? 60 : 33

    if (loc.state?.ticketProgress !== newProgress) {
      nav(".", {
        replace: true,
        state: { ...loc.state, ticketProgress: newProgress },
      })
    }
  }, [adult, youth, senior])

  const adjustTicket = (
    setter: (n: number) => void,
    current: number,
    delta: number
  ) => {
    const newValue = Math.min(10, Math.max(0, current + delta))
    setter(newValue)
  }

  return (
    <div className="space-y-4">
      {/* ===== Bus Summary Section ===== */}
      <div className="card space-y-3">
        <h3 className="text-center font-semibold text-[20px] text-gray-900">
          {routeData.length > 0
            ? `${routeData.length} Buses Selected`
            : "No route selected"}
        </h3>

        {routeData.length > 0 && (
          <div className="flex flex-col gap-2">
            {routeData.map((bus, idx) => {
              const routeNumber =
                bus.routeShortName ?? String(idx + 1)

              const routeName =
                bus.routeLongName ??
                (bus.routeShortName ? `Route ${bus.routeShortName}` : "Bus route")

              const stopLabel =
                bus.toStop ||
                bus.fromStop ||
                "Stop not available"

              const timeLabel =
                bus.travelMinutes != null
                  ? `${bus.travelMinutes} min`
                  : bus.departureTimeText && bus.arrivalTimeText
                  ? `${bus.departureTimeText} – ${bus.arrivalTimeText}`
                  : bus.departureTimeText || bus.arrivalTimeText || ""

              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                >
                  {/* Left: route number */}
                  <div className="flex-shrink-0 w-6 text-lg font-bold text-orange-500 text-center">
                    {routeNumber}
                  </div>

                  {/* Middle: route name + stop */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {routeName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {`→ ${stopLabel}`}
                    </p>
                  </div>

                  {/* Right: time */}
                  {timeLabel && (
                    <div className="flex-shrink-0">
                      <span className="text-sm font-semibold text-orange-500 whitespace-nowrap">
                        {timeLabel}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ===== Ticket Selection ===== */}
      <div className="card space-y-3">
        {[
          { label: "Adult ticket (18-64)", v: adult, set: setAdult },
          { label: "Youth ticket (10-18)", v: youth, set: setYouth },
          { label: "Senior ticket (64+)", v: senior, set: setSenior },
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
                      ? "!bg-gray-300 !text-gray-600 !border-gray-300 !cursor-not-allowed hover:!bg-gray-300 active:!bg-gray-300"
                      : ""
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

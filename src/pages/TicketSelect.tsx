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
    <div className="flex flex-col h-full overflow-hidden">
      {/* Main content zone */}
      <div className="flex-1 overflow-hidden space-y-4 px-4 pt-2 pb-4">
        {/* ===== Bus Summary Section ===== */}
        <div className="card flex flex-col h-64">
          <h3 className="text-center font-semibold text-[20px] text-gray-900 mb-1">
            {routeData.length > 0
              ? `${routeData.length} Buses Selected`
              : "No route selected"}
          </h3>

          {routeData.length > 0 && (
            <div className="relative flex-1 min-h-0">
              {/* Top fade (overlay, no z so overlays can sit above it) */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white to-transparent" />

              {/* Scrollable list */}
              <div className="relative flex flex-col gap-2 h-full overflow-y-auto pr-2 pt-1 pb-3 scroll-no-bar">
                {routeData.map((bus, idx) => {
                  const routeNumber = bus.routeShortName ?? String(idx + 1)
                  const routeName =
                    bus.routeLongName ??
                    (bus.routeShortName
                      ? `Route ${bus.routeShortName}`
                      : "Bus route")

                  const stopLabel =
                    bus.toStop || bus.fromStop || "Stop not available"

                  const timeLabel =
                    bus.travelMinutes != null
                      ? `${bus.travelMinutes} min`
                      : bus.departureTimeText && bus.arrivalTimeText
                      ? `${bus.departureTimeText} – ${bus.arrivalTimeText}`
                      : bus.departureTimeText || bus.arrivalTimeText || ""

                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_5px_rgba(0,0,0,0.12)]"
                    >
                      {/* Left: route number / brand */}
                      <div className="flex-shrink-0 w-12 text-lg font-bold text-orange-500 text-center">
                        {routeNumber}
                      </div>

                      {/* Middle: route name + stop */}
                      <div className="flex-1 min-w-0 px-2">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {routeName}
                        </p>
                        <p className="text-xs text-gray-400">
                          → {stopLabel}
                        </p>
                      </div>

                      {/* Right: time */}
                      {timeLabel && (
                        <div className="flex-shrink-0 pl-2">
                          <span className="text-sm font-semibold text-orange-500 whitespace-nowrap">
                            {timeLabel}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Bottom fade (overlay, no z) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent" />
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
      </div>

      {/* ===== Confirm Button ===== */}
      <div className="mt-2 mb-4 text-center flex-shrink-0">
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

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from "../components/Modal"
import fares from "../data/fares.json"

export default function MonthlyPass() {
  const nav = useNavigate()
  const [adult, setAdult] = useState(0)
  const [youth, setYouth] = useState(0)
  const [senior, setSenior] = useState(0)
  const [err, setErr] = useState(false)

  const total =
    adult * fares.monthly.adult +
    youth * fares.monthly.youth +
    senior * fares.monthly.senior

  const confirm = () => {
    if (adult + youth + senior < 1) {
      setErr(true)
      return
    }
    nav("/passsummary", {
      state: { items: { adult, youth, senior }, total },
    })
  }

  const adjustTicket = (setter: (n: number) => void, current: number, delta: number) => {
    const newValue = Math.min(10, Math.max(0, current + delta))
    setter(newValue)
  }

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800">
        How many passes do you need
      </h2>

      <div className="card space-y-3">
        {[
          { label: 'Adult pass (18–64)', v: adult, set: setAdult },
          { label: 'Youth pass (10–18)', v: youth, set: setYouth },
          { label: 'Senior pass (64+)', v: senior, set: setSenior },
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

      <button className="btn mt-4" onClick={confirm}>
        Confirm
      </button>

      <Modal open={err} onClose={() => setErr(false)}>
        <div className="text-center space-y-3">
          <p>Please select at least one pass to proceed.</p>
          <button className="btn" onClick={() => setErr(false)}>
            OK
          </button>
        </div>
      </Modal>
    </div>
  )
}

import { useLocation, useNavigate } from "react-router-dom"
import fares from "../data/fares.json"
import { formatCurrency } from "../i18n/strings"

export default function PassSummary() {
  const nav = useNavigate()
  const loc = useLocation() as any
  const items = loc.state?.items || { adult: 0, youth: 0, senior: 0 }
  const { adult, youth, senior } = items

  // Calculate totals using monthly fare rates
  const subtotal =
    adult * fares.monthly.adult +
    youth * fares.monthly.youth +
    senior * fares.monthly.senior
  const tax = subtotal * fares.taxRate
  const total = subtotal + tax

  const confirm = () => {
    nav("/done", { state: { type: "monthly", items, total } })
  }

  return (
    <div className="space-y-6 text-center">
      {/* ====== Summary Card ====== */}
      <div className="card text-left space-y-4 max-w-sm mx-auto">
        <h3 className="font-semibold text-lg text-gray-800">Order summary:</h3>

        <div className="flex items-center gap-3">
          <img src="/assets/pass-icon.png" alt="Pass" className="w-6 h-6" />
          <span className="font-medium text-gray-700">Monthly Pass Summary</span>
        </div>

        <hr />

        <div className="space-y-1 text-sm">
          {adult > 0 && (
            <div className="flex justify-between">
              <span>Adult Pass</span>
              <span>{formatCurrency(adult * fares.monthly.adult)}</span>
            </div>
          )}
          {youth > 0 && (
            <div className="flex justify-between">
              <span>Youth Pass</span>
              <span>{formatCurrency(youth * fares.monthly.youth)}</span>
            </div>
          )}
          {senior > 0 && (
            <div className="flex justify-between">
              <span>Senior Pass</span>
              <span>{formatCurrency(senior * fares.monthly.senior)}</span>
            </div>
          )}
        </div>

        <hr />

        <div className="space-y-1 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Taxes & Other Fees</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* ====== Discount Input ====== */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Discount Code"
          className="border border-gray-300 rounded-full px-4 py-2 w-64 text-center text-gray-600 bg-gray-100 cursor-not-allowed"
          disabled
        />
      </div>

      {/* ====== Payment Button ====== */}
      <p className="text-gray-700">Please tap below to complete your payment</p>

      <button className="btn" onClick={confirm}>
        Tap to Pay
      </button>
    </div>
  )
}

import { useLocation, useNavigate } from "react-router-dom"
import fares from "../data/fares.json"
import { formatCurrency, STRINGS } from "../i18n/strings"
import { useState } from "react"
import KeyboardOverlay from "../components/KeyboardOverlay"
import { useLang } from "../App"

export default function PassSummary() {
  const nav = useNavigate()
  const loc = useLocation() as any
  const { lang } = useLang()
  const t = STRINGS[lang]
  const items = loc.state?.items || { adult: 0, youth: 0, senior: 0 }
  const { adult, youth, senior } = items

  // Calculate totals using monthly fare rates
  const subtotal =
    adult * fares.monthly.adult +
    youth * fares.monthly.youth +
    senior * fares.monthly.senior
  const [discountValue, setDiscountValue] = useState(0)
  const tax = subtotal * fares.taxRate
  const discountedAmount = subtotal * discountValue
  const total = subtotal + tax - discountedAmount

  const confirm = () => {
    nav("/completed", { state: { type: "monthly", items, total } })
  }

  const [discount, setDiscount] = useState("")
  const [showKeyboard, setShowKeyboard] = useState(false)

  const applyDiscount = () => {
    const code = discount.trim().toLowerCase()

    if (code === "save10") {
      setDiscountValue(0.10)       // 10 percent off
    } else if (code === "save20") {
      setDiscountValue(0.20)       // 20 percent off
    } else {
      setDiscountValue(0)          // invalid or empty code
    }
  }

  return (
    <div
      className={`space-y-6 text-center transition-all duration-300 ${showKeyboard ? "pb-56" : "pb-0"
        }`}
    >

      {/* ====== Summary Card ====== */}
      <div className="card text-left space-y-4 max-w-sm mx-auto">
        <h3 className="font-semibold text-lg text-gray-800">{t.orderSummary}</h3>

        <div className="flex items-center gap-1.5">
          <img src="/assets/pass-icon.png" alt="Pass" className="w-8 h-8" />
          <span className="font-medium text-gray-700">{t.monthlyPassSummary}</span>
        </div>

        <hr />

        <div className="space-y-1 text-sm">
          {adult > 0 && (
            <div className="flex justify-between">
              <span>{t.adultPassLabel}</span>
              <span>{formatCurrency(adult * fares.monthly.adult)}</span>
            </div>
          )}
          {youth > 0 && (
            <div className="flex justify-between">
              <span>{t.youthPassLabel}</span>
              <span>{formatCurrency(youth * fares.monthly.youth)}</span>
            </div>
          )}
          {senior > 0 && (
            <div className="flex justify-between">
              <span>{t.seniorPassLabel}</span>
              <span>{formatCurrency(senior * fares.monthly.senior)}</span>
            </div>
          )}
        </div>

        <hr />

        <div className="space-y-1 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>{t.subtotal}</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>{t.taxesAndFees}</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          {discountValue > 0 && (
            <div className="flex justify-between text-green-600">
              <span>{t.discount}</span>
              <span>- {formatCurrency(discountedAmount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg">
            <span>{t.total}</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* ====== Discount Input ====== */}
      <button onClick={() => {
        if (discount === "Discount Code") setDiscount("")
        setShowKeyboard(true)
      }}
        className="border border-gray-300 rounded-full px-4 py-2 w-64 text-center text-gray-600 bg-gray-100">
        <span>{discount === "" ? t.discountCode : discount}</span>
      </button>

      {/* ====== Payment Button ====== */}
      <p className="text-gray-700">{t.tapToPay}</p>

      <button className="btn" onClick={confirm}>
        {t.tapToPay2}
      </button>

      {/* ====== Keyboard Overlay ====== */}
      {showKeyboard && (
        <KeyboardOverlay
          onInsert={(key) => {
            // BACKSPACE
            if (key === "BACKSPACE") {
              if (discount.length === 0) return
              setDiscount(prev => prev.slice(0, -1))
              return
            }

            // SPACE
            if (key === " ") {
              setDiscount(prev => prev + " ")
              return
            }

            // Normal character
            setDiscount(prev => prev + key)
          }}

          onClose={() => {
            if (discount.trim() === "") setDiscount(t.discountCode)
            applyDiscount()
            setShowKeyboard(false)
          }}
        />
      )}
    </div>
  )
}

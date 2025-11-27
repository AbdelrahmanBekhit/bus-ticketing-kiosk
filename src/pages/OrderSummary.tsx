import { useLocation, useNavigate } from 'react-router-dom'
import fares from '../data/fares.json'
import { formatCurrency, STRINGS } from '../i18n/strings'
import { useLang } from '../App'

export default function OrderSummary() {
  const nav = useNavigate()
  const loc = useLocation() as any
  const { lang } = useLang()
  const t = STRINGS[lang]
  const items = loc.state?.items || { adult: 1, youth: 0, senior: 0 }
  const { adult, youth, senior } = items

  const subtotal = items.adult * fares.oneWay.adult + items.youth * fares.oneWay.youth + items.senior * fares.oneWay.senior
  const tax = subtotal * fares.taxRate
  const total = subtotal + tax

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="font-semibold mb-3">{t.orderSummary}</h3>
        <div className="space-y-1 text-sm">
          {items.adult > 0 && <div className="flex justify-between"><span>{t.adultTicketLabel}</span><span>{formatCurrency(items.adult * fares.oneWay.adult)}</span></div>}
          {items.youth > 0 && <div className="flex justify-between"><span>{t.youthTicketLabel}</span><span>{formatCurrency(items.youth * fares.oneWay.youth)}</span></div>}
          {items.senior > 0 && <div className="flex justify-between"><span>{t.seniorTicketLabel}</span><span>{formatCurrency(items.senior * fares.oneWay.senior)}</span></div>}
        </div>
        <hr className="my-3" />
        <div className="space-y-1">
          <div className="flex justify-between text-gray-600"><span>{t.subtotal}</span><span>{formatCurrency(subtotal)}</span></div>
          <div className="flex justify-between text-gray-600"><span>{t.taxesAndFees}</span><span>{formatCurrency(tax)}</span></div>
          <div className="flex justify-between font-bold text-lg"><span>{t.total}</span><span>{formatCurrency(total)}</span></div>
        </div>
      </div>
      <div className="text-center">
        <button
          className="btn"
          onClick={() =>
            nav("/done", {
              state: {
                total,
                items: { adult, youth, senior },
                routeData: loc.state?.routeData, // keep this consistent
              },
            })
          }
        >
          {t.tapToPay2}
        </button>

      </div>
    </div>
  )
}
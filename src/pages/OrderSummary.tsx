import { useLocation, useNavigate } from 'react-router-dom'
import fares from '../data/fares.json'
import { formatCurrency } from '../i18n/strings'

export default function OrderSummary(){
  const nav = useNavigate()
  const loc = useLocation() as any
  const items = loc.state?.items || { adult:1, youth:0, senior:0 }

  const subtotal = items.adult*fares.oneWay.adult + items.youth*fares.oneWay.youth + items.senior*fares.oneWay.senior
  const tax = subtotal * fares.taxRate
  const total = subtotal + tax

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="font-semibold mb-3">Order summary:</h3>
        <div className="space-y-1 text-sm">
          {items.adult>0 && <div className="flex justify-between"><span>Adult Ticket</span><span>{formatCurrency(items.adult*fares.oneWay.adult)}</span></div>}
          {items.youth>0 && <div className="flex justify-between"><span>Youth Ticket</span><span>{formatCurrency(items.youth*fares.oneWay.youth)}</span></div>}
          {items.senior>0 && <div className="flex justify-between"><span>Senior Ticket</span><span>{formatCurrency(items.senior*fares.oneWay.senior)}</span></div>}
        </div>
        <hr className="my-3"/>
        <div className="space-y-1">
          <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          <div className="flex justify-between text-gray-600"><span>Taxes & Other Fees</span><span>{formatCurrency(tax)}</span></div>
          <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{formatCurrency(total)}</span></div>
        </div>
      </div>
      <div className="text-center">
        <button className="btn" onClick={()=> nav('/done', { state: { total } })}>Tap to Pay</button>
      </div>
    </div>
  )
}
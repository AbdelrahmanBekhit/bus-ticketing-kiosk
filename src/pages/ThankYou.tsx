import { useLocation, useNavigate } from 'react-router-dom'

export default function ThankYou(){
  const nav = useNavigate()
  const loc = useLocation() as any
  const total = loc.state?.total
  return (
    <div className="text-center space-y-4">
      <img src="/assets/qr.png" alt="QR" className="mx-auto w-40 h-40"/>
      <h1 className="text-3xl font-extrabold text-orange-600">Thank you</h1>
      {total && <p>Your payment of ${total.toFixed(2)} was received.</p>}
      <p>Please collect your ticket below</p>
      <button className="btn" onClick={()=> nav('/')}>Finish</button>
    </div>
  )
}
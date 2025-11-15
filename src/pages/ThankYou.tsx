import { useLocation, useNavigate } from "react-router-dom"

export default function ThankYou() {
  const nav = useNavigate()
  const loc = useLocation() as any

  const total = loc.state?.total ?? 0
  const items = loc.state?.items ?? { adult: 0, youth: 0, senior: 0 }

  // Choose which QR code to show
  let qrSrc = "/assets/qr-adult.png" // default fallback

  if (items.adult > 0 && items.senior === 0 && items.youth === 0)
    qrSrc = "/assets/qr-adult.png"
  else if (items.senior > 0 && items.adult === 0 && items.youth === 0)
    qrSrc = "/assets/qr-senior.png"
  else if (items.youth > 0 && items.adult === 0 && items.senior === 0)
    qrSrc = "/assets/qr-youth.png"

  return (
    <div className="text-center space-y-4">
      <img
        src={qrSrc}
        alt="QR code"
        className="mx-auto w-40 h-40"
        onError={(e) => {
          // fallback if image not found
          (e.currentTarget as HTMLImageElement).src = "/assets/qr.png"
        }}
      />
      <p className="text-gray-500 text-sm">Add to Wallet</p>

      <h1 className="text-3xl font-extrabold text-orange-600">Thank you</h1>

      <p className="text-gray-800">
        Your payment of ${total.toFixed(2)} was received.
      </p>

      <p className="text-gray-700">Please collect your ticket below</p>

      <button className="btn" onClick={() => nav("/")}>
        Finish
      </button>
    </div>
  )
}

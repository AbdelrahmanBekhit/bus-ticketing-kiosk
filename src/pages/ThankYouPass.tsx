import { useLocation, useNavigate } from "react-router-dom"
import { useLang } from "../App"
import { STRINGS } from "../i18n/strings"

export default function ThankYou() {
    const nav = useNavigate()
    const loc = useLocation() as any
    const { lang } = useLang()
    const t = STRINGS[lang]

    const total = loc.state?.total ?? 0
    const items = loc.state?.items ?? { adult: 0, youth: 0, senior: 0 }

    let qrSrc = "/assets/qr-adultpass.png"

    if (items.adult > 0 && items.senior === 0 && items.youth === 0)
        qrSrc = "/assets/qr-adultpass.png"
    else if (items.senior > 0 && items.adult === 0 && items.youth === 0)
        qrSrc = "/assets/qr-seniorpass.png"
    else if (items.youth > 0 && items.adult === 0 && items.senior === 0)
        qrSrc = "/assets/qr-youthpass.png"

    return (
        <div className="text-center space-y-4">
            <img
                src={qrSrc}
                alt="QR code"
                className="mx-auto w-40 h-40"
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/assets/qr.png"
                }}
            />
            <p className="text-gray-500 text-sm">{t.addToWallet}</p>
            <h1 className="text-3xl font-extrabold text-orange-600">{t.thankYou}</h1>
            <p className="text-gray-800">
                {t.paymentReceived} ${total.toFixed(2)} {t.wasReceived}
            </p>
            <p className="text-gray-700">{t.pleaseCollectPass}</p>
            <button className="btn" onClick={() => nav("/trip-prompt")}>
                {t.finish}
            </button>
        </div>
    )

}
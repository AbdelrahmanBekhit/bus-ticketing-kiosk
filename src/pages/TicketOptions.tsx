import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../App'
import { STRINGS } from '../i18n/strings'

export default function TicketOptions() {
    const nav = useNavigate()
    const loc = useLocation() as any
    const routeData = loc.state?.routeData ?? []
    const { lang } = useLang()
    const t = STRINGS[lang]

    return (
        <div className="flex flex-col items-center justify-center h-full bg-white px-8 space-y-8">
            <h2 className="text-2xl font-bold text-center text-gray-800">
                {t.wouldYouLikeToPurchase}
            </h2>

            <div className="flex flex-col w-full max-w-md space-y-4">
                <button
                    onClick={() => nav('/tickets', { state: { routeData } })}
                    className="px-6 py-4 w-full bg-[#f28c28] text-white rounded-xl shadow-md
                     hover:brightness-110 active:scale-95 transition-all text-lg font-semibold"
                >
                    {t.purchaseOneWayTicket}
                </button>

                <button
                    onClick={() => nav('/ride-info', { state: { routeData } })}
                    className="px-6 py-4 w-full bg-[#f28c28] text-white rounded-xl shadow-md
                     hover:brightness-110 active:scale-95 transition-all text-lg font-semibold"
                >
                    {t.useMonthlyPass}
                </button>

                <button
                    onClick={() => nav('/')}
                    className="px-6 py-4 w-full border-2 border-gray-300 rounded-xl
                     text-gray-600 font-medium hover:bg-gray-50 active:bg-gray-100 
                     transition-all text-lg"
                >
                    {t.exit}
                </button>
            </div>
        </div>
    )
}

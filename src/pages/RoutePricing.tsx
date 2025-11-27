import { useLocation, useNavigate } from 'react-router-dom'
import type { BusLegSummary } from './BusLegSummary'
import { useLang } from '../App'
import { STRINGS } from '../i18n/strings'

export default function RoutePricing() {
    const nav = useNavigate()
    const loc = useLocation() as any
    const routeData = (loc.state?.routeData ?? []) as BusLegSummary[]
    const { lang } = useLang()
    const t = STRINGS[lang]

    // Ticket pricing
    const pricing = {
        adult: 3.50,
        youth: 2.50,
        senior: 2.50
    }

    return (
        <div className="flex flex-col items-center justify-start h-full bg-white px-6 py-4 overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                {t.selectedRoute}
            </h2>

            <div className="w-full max-w-lg space-y-3 mb-4 flex-1 overflow-y-auto">
                {routeData.map((leg, idx) => (
                    <div
                        key={idx}
                        className="flex items-start justify-between gap-4 px-5 py-4 bg-white border border-gray-200 rounded-xl shadow-sm"
                    >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                            <span className="text-2xl font-bold text-[#f28c28] flex-shrink-0">
                                {leg.routeShortName || ''}
                            </span>
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                                <span className="font-semibold text-gray-800 text-base leading-tight break-words">
                                    {leg.routeLongName || 'Bus'}
                                </span>
                                <span className="text-sm text-gray-400 leading-tight break-words">
                                    → {leg.toStop || leg.fromStop || ''}
                                </span>
                            </div>
                        </div>
                        <span className="text-xl font-semibold text-[#f28c28] flex-shrink-0 whitespace-nowrap">
                            {leg.travelMinutes ? `${leg.travelMinutes} min` : ''}
                        </span>
                    </div>
                ))}
            </div>

            <div className="w-full max-w-lg mb-3 p-4 bg-orange-50 rounded-xl border-2 border-[#f28c28] space-y-2">
                <p className="text-center text-lg font-bold text-gray-800 mb-2">
                    {t.oneWayTicketPrices}
                </p>

                <div className="flex justify-between items-center px-3">
                    <span className="text-base text-gray-700">{t.adult}</span>
                    <span className="text-xl font-bold text-[#f28c28]">${pricing.adult.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center px-3">
                    <span className="text-base text-gray-700">{t.youth}</span>
                    <span className="text-xl font-bold text-[#f28c28]">${pricing.youth.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center px-3">
                    <span className="text-base text-gray-700">{t.senior}</span>
                    <span className="text-xl font-bold text-[#f28c28]">${pricing.senior.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex flex-col w-full max-w-md space-y-3">
                <button
                    onClick={() => nav('/monthly-pass-upsell', { state: { routeData, pricing } })}
                    className="px-6 py-3 w-full bg-[#f28c28] text-white rounded-xl shadow-md
                     hover:brightness-110 active:scale-95 transition-all text-base font-semibold"
                >
                    {t.purchaseTicket}
                </button>

                <button
                    onClick={() => nav('/')}
                    className="px-6 py-3 w-full border-2 border-gray-300 rounded-xl
                     text-gray-600 font-medium hover:bg-gray-50 active:bg-gray-100 
                     transition-all text-base"
                >
                    {t.exit}
                </button>
            </div>
        </div>
    )
}

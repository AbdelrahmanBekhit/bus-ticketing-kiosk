import { useLocation, useNavigate } from 'react-router-dom'
import type { BusLegSummary } from './BusLegSummary'
import { useLang } from '../App'
import { STRINGS } from '../i18n/strings'

export default function RouteConfirmation() {
    const nav = useNavigate()
    const loc = useLocation() as any
    const routeData = (loc.state?.routeData ?? []) as BusLegSummary[]
    const { lang } = useLang()
    const t = STRINGS[lang]

    return (
        <div className="flex flex-col items-center justify-start h-full bg-white px-6 py-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                {t.selectedRoute}
            </h2>

            <div className="w-full max-w-lg space-y-4 mb-8 flex-1 overflow-y-auto">
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

            <button
                onClick={() => nav('/ticket-options', { state: { routeData } })}
                className="px-12 py-4 bg-[#f28c28] text-white rounded-xl font-semibold text-lg
                   shadow-md hover:brightness-110 active:scale-95 transition-all mt-auto"
            >
                {t.confirm}
            </button>
        </div>
    )
}

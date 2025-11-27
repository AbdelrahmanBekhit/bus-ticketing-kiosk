import { useLocation, useNavigate } from 'react-router-dom'
import type { BusLegSummary } from './BusLegSummary'
import { useLang } from '../App'
import { STRINGS } from '../i18n/strings'

export default function RideInfo() {
    const nav = useNavigate()
    const loc = useLocation() as any
    const routeData = (loc.state?.routeData ?? []) as BusLegSummary[]
    const { lang } = useLang()
    const t = STRINGS[lang]

    // Get the first bus leg for display
    const firstLeg = routeData[0]
    const location = firstLeg?.fromStop || 'your stop'
    const arrivalMinutes = firstLeg?.travelMinutes || 0

    return (
        <div className="flex flex-col items-center justify-center h-full bg-white px-8 space-y-8">
            <div className="text-center space-y-6 max-w-lg">
                <h2 className="text-3xl font-bold text-gray-800">
                    {t.findYourRide}
                </h2>

                <p className="text-2xl font-semibold text-[#f28c28]">
                    {location}
                </p>

                <p className="text-xl text-gray-700">
                    {t.arrivingIn} <span className="font-bold text-[#f28c28]">{arrivalMinutes} {t.mins}</span>
                </p>

                <div className="mt-8 p-6 bg-orange-50 rounded-xl border-2 border-[#f28c28]">
                    <p className="text-lg text-gray-800 font-medium">
                        {t.scanPass}
                    </p>
                </div>
            </div>

            <button
                onClick={() => nav('/')}
                className="px-12 py-4 bg-[#f28c28] text-white rounded-xl font-semibold text-lg
                   shadow-md hover:brightness-110 active:scale-95 transition-all mt-8"
            >
                {t.exit}
            </button>
        </div>
    )
}

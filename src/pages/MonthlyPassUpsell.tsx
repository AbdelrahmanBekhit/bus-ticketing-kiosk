import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../App'
import { STRINGS } from '../i18n/strings'

export default function MonthlyPassUpsell() {
    const nav = useNavigate()
    const loc = useLocation() as any
    const routeData = loc.state?.routeData ?? []
    const oneWayPrice = loc.state?.oneWayPrice ?? 3.50
    const { lang } = useLang()
    const t = STRINGS[lang]

    // Calculate savings
    const monthlyPassPrice = 100
    const tripsPerMonth = 20 // Average workdays
    const totalOneWayCost = oneWayPrice * tripsPerMonth * 2 // Round trip
    const savings = totalOneWayCost - monthlyPassPrice

    return (
        <div className="flex flex-col items-center justify-center h-full bg-white px-8 space-y-6">
            <div className="text-center space-y-4 max-w-lg">
                <h2 className="text-3xl font-bold text-gray-800">
                    {t.saveWithMonthlyPass}
                </h2>

                <div className="p-6 bg-green-50 rounded-xl border-2 border-green-500">
                    <p className="text-2xl font-bold text-green-700">
                        {t.savePerMonth} ${savings.toFixed(2)}{t.perMonth}
                    </p>
                </div>

                <div className="text-left space-y-3 p-6 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">{t.oneWayTicket}</span>
                        <span className="font-semibold text-gray-900">${oneWayPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">{t.roundTrips}</span>
                        <span className="font-semibold text-gray-900">${totalOneWayCost.toFixed(2)}</span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-bold">{t.monthlyPassPrice}</span>
                        <span className="font-bold text-[#f28c28] text-xl">${monthlyPassPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 italic">{t.unlimitedTrips}</p>
                </div>
            </div>

            <div className="flex flex-col w-full max-w-md space-y-4">
                <button
                    onClick={() => nav('/monthlyPass')}
                    className="px-6 py-4 w-full bg-green-600 text-white rounded-xl shadow-md
                     hover:brightness-110 active:scale-95 transition-all text-lg font-semibold"
                >
                    {t.getMonthlyPass}
                </button>

                <button
                    onClick={() => nav('/tickets', { state: { routeData } })}
                    className="px-6 py-4 w-full bg-[#f28c28] text-white rounded-xl shadow-md
                     hover:brightness-110 active:scale-95 transition-all text-lg font-semibold"
                >
                    {t.continueWithOneWay}
                </button>
            </div>
        </div>
    )
}

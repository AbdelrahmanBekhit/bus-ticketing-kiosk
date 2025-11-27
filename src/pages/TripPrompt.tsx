import { useNavigate } from 'react-router-dom'
import { MapPinIcon } from '@heroicons/react/24/solid'
import { useLang } from '../App'
import { STRINGS } from '../i18n/strings'

export default function TripPrompt() {
  const nav = useNavigate()
  const { lang } = useLang()
  const t = STRINGS[lang]

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white px-8 space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        {t.arePlanningTrip}
      </h2>

      <div className="flex flex-col w-full max-w-sm space-y-4">
        <button
          onClick={() => nav('/map', { state: { fromMonthlyPass: true } })}
          className="flex items-center justify-center gap-3 px-6 py-4 w-full 
                     bg-[#f28c28] text-white rounded-2xl shadow-md
                     hover:brightness-110 active:scale-95 transition-all text-lg font-semibold"
        >
          <MapPinIcon className="h-6 w-6" />
          <span>{t.enterDestination}</span>
        </button>

        <button
          onClick={() => nav('/')}
          className="px-6 py-4 w-full border-2 border-gray-200 rounded-2xl
                     text-gray-500 font-medium hover:bg-gray-50 active:bg-gray-100 
                     transition-all text-lg"
        >
          {t.noThanks}
        </button>
      </div>
    </div>
  )
}

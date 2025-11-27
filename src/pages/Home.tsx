import { useNavigate } from 'react-router-dom'
import { useLang } from '../App'
import { STRINGS } from '../i18n/strings'

export default function Home() {
  const nav = useNavigate()
  const { lang } = useLang()
  const t = STRINGS[lang]

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white relative">
      {/* Title */}
      <h1 className="text-[#f28c28] text-5xl font-extrabold mb-12 tracking-wider">
        GO BUS
      </h1>

      {/* Ticket Buttons */}
      <div className="flex flex-col space-y-6 w-[70%]">
        {/* One-Way Ticket */}
        <button
          onClick={() => nav('/destination')}
          className="bg-[#f28c28] text-white font-semibold text-lg py-5 rounded-md shadow-md
                     hover:brightness-110 active:bg-[#9ACD32] active:text-black
                     transition-all duration-150"
        >
          {t.oneWay}
        </button>

        {/* Monthly Pass */}
        <button
          onClick={() => nav('/monthlyPass')}
          className="bg-[#f28c28] text-white font-semibold text-lg py-5 rounded-md shadow-md
                     hover:brightness-110 active:bg-[#9ACD32] active:text-black
                     transition-all duration-150"
        >
          {t.monthly}
        </button>
      </div>

      <button
        onClick={() => nav('/map', { state: { viewRoutes: true } })}
        className="mt-8 px-12 py-3 border border-gray-300 rounded-full
                   text-black font-medium text-lg shadow-sm
                   hover:bg-gray-100 active:scale-95 transition-all"
      >
        {t.viewRoutes}
      </button>
    </div>
  )
}

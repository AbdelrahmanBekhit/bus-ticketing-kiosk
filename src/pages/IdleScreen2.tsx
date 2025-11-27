import { useNavigate } from 'react-router-dom'
import routes from '../data/routes.json'
import { useLang } from '../App'
import { STRINGS } from '../i18n/strings'

export default function IdleScreen2() {
  const nav = useNavigate()
  const { lang } = useLang()
  const t = STRINGS[lang]
  const visibleRoutes = routes.slice(0, 6)

  return (
    <div className="relative h-full w-full bg-white flex flex-col">
      {/* Route List */}
      <div className="flex flex-col px-6 pt-6 pb-24 space-y-3 flex-1">
        {visibleRoutes.map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl shadow-sm py-3 px-4"
          >
            <div className="flex flex-col leading-tight">
              <span className="text-[#f28c28] font-bold text-lg">{r.number}</span>
              <span className="text-sm font-medium text-gray-800">{r.destination}</span>
            </div>
            <div className="bg-[#f4f4f4] rounded-full px-4 py-1 text-sm font-semibold text-gray-800 border border-gray-300">
              {r.time} min
            </div>
          </div>
        ))}
      </div>

      {/* Touch to Start Bar */}
      <div
        onClick={() => nav("/home")}
        className="absolute bottom-0 left-0 right-0 bg-[#f28c28] text-white text-center text-2xl font-extrabold py-6 cursor-pointer rounded-b-[25px] tracking-wide shadow-lg"
      >
        {t.touchToStart}
      </div>
    </div>
  )
}

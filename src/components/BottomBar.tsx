import { useNavigate } from 'react-router-dom'
import { useLang } from '../App'
import { STRINGS } from '../i18n/strings'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

interface BottomBarProps {
  showProgress?: boolean
  progress?: number // 0 to 100
}

export default function BottomBar({ showProgress = false, progress = 0 }: BottomBarProps) {
  const nav = useNavigate()
  const { lang } = useLang()
  const t = STRINGS[lang]

  // Clamp value to prevent overflow
  const safeProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between">
        {/* Help Button */}
        <button
          className="w-10 h-10 rounded-full bg-[#f28c28] text-white flex items-center justify-center text-xl font-bold shadow-md hover:brightness-110 transition-all"
          onClick={() => nav('/help')}
        >
          ?
        </button>

        {/* Conditional Progress Bar */}
        {showProgress && (
          <div className="flex flex-col items-center w-1/2 mx-4">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${safeProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">{safeProgress}{t.percentDone}</p>
          </div>
        )}

        {/* Language Button */}
        <button
          className="w-10 h-10 rounded-full bg-[#f28c28] text-white flex items-center justify-center shadow-md hover:brightness-110 transition-all"
          onClick={() => nav('/language')}
        >
          <GlobeAltIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

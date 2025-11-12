import { useNavigate } from 'react-router-dom'
import { useLang } from '../App'

interface BottomBarProps {
  showProgress?: boolean
  progress?: number // 0 to 100
}

export default function BottomBar({ showProgress = false, progress = 0 }: BottomBarProps) {
  const nav = useNavigate()
  const { lang } = useLang()

  // Clamp value to prevent overflow
  const safeProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between">
        {/* Help Button */}
        <button
          className="btn-secondary"
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
            <p className="text-xs text-gray-500">{safeProgress}% done</p>
          </div>
        )}

        {/* Language Button */}
        <button
          className="btn-secondary"
          onClick={() => nav('/language')}
        >
          {lang.toUpperCase()}
        </button>
      </div>
    </div>
  )
}

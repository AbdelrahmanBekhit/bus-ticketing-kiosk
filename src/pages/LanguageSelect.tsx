import { useLang } from '../App'
import { CheckIcon } from '@heroicons/react/24/solid'

const languages = [
  { code: 'US', lang: 'en', label: 'English', native: 'English' },
  { code: 'ES', lang: 'es', label: 'Spanish', native: 'Español' },
  { code: 'FR', lang: 'fr', label: 'French', native: 'Français' },
  { code: 'AR', lang: 'ar', label: 'Arabic', native: 'العربية' },
  { code: 'DE', lang: 'de', label: 'German', native: 'Deutsch' },
  { code: 'ZH', lang: 'zh', label: 'Chinese', native: '中文' },
  { code: 'HI', lang: 'hi', label: 'Hindi', native: 'हिंदी' },
]

export default function LanguageSelect() {
  const { lang, setLang } = useLang()

  const handleLanguageSelect = (selectedLang: string) => {
    setLang(selectedLang as any)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Language List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
        {languages.map((language) => {
          const isSelected = lang === language.lang
          return (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.lang)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all ${isSelected
                ? 'border-[#f28c28] bg-orange-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-gray-900 w-10">{language.code}</span>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-base">{language.native}</div>
                  <div className="text-sm text-gray-400">{language.label}</div>
                </div>
              </div>
              {isSelected && (
                <CheckIcon className="h-6 w-6 text-[#f28c28]" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
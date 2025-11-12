import { useLang } from '../App'

const options = [
  { code:'US', lang:'en', label:'English' },
  { code:'ES', lang:'es', label:'Español' },
]

export default function LanguageSelect(){
  const { lang, setLang } = useLang()
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold mb-2">Select Language</h2>
      {options.map(o=> (
        <button key={o.code} className={`list-tile w-full ${lang===o.lang?'border-orange-400':''}`} onClick={()=> setLang(o.lang as any)}>
          <div className="flex items-center gap-3">
            <span className="font-semibold">{o.code}</span>
            <div>
              <div className="font-medium">{o.label}</div>
            </div>
          </div>
          {lang===o.lang && <span>✓</span>}
        </button>
      ))}
    </div>
  )
}
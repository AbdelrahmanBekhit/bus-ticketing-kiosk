import { useNavigate } from 'react-router-dom'
import { useLang } from '../App'
import { STRINGS } from '../i18n/strings'

export default function Home(){
  const nav = useNavigate()
  const { lang } = useLang()
  const t = STRINGS[lang]
  return (
    <div className="flex flex-col gap-4 mt-10">
      <h1 className="text-4xl font-extrabold text-center">GO BUS</h1>
      <button className="btn" onClick={()=> nav('/destination')}>{t.oneWay}</button>
      <button className="btn" onClick={()=> nav('/tickets')}>{t.monthly}</button>
      <button className="btn-secondary" onClick={()=> nav('/routes')}>{t.viewRoutes}</button>
    </div>
  )
}
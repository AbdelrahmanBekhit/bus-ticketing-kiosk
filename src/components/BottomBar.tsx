import { useNavigate } from 'react-router-dom'
import { useLang } from '../App'

export default function BottomBar(){
  const nav = useNavigate()
  const { lang } = useLang()
  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between">
        <button className="btn-secondary" onClick={()=> nav('/help')}>?</button>
        <div className="w-1/2 mx-4 h-2 bg-gray-200 rounded-full"><div className="h-2 w-1/3 bg-blue-500 rounded-full"/></div>
        <button className="btn-secondary" onClick={()=> nav('/language')}>{lang.toUpperCase()}</button>
      </div>
    </div>
  )
}
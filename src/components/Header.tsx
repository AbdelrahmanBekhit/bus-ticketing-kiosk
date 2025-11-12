import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header({ title }: { title?: string }){
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))
  const nav = useNavigate()
  const loc = useLocation()
  useEffect(()=>{ const id = setInterval(()=> setTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})), 1000); return ()=> clearInterval(id) }, [])
  const showBack = !['/','/idle2','/home'].includes(loc.pathname)
  return (
    <div className="header-bar">
      <div className="flex items-center gap-3">
        {showBack && (
          <button aria-label="Back" className="text-white text-2xl" onClick={()=> nav(-1)}>←</button>
        )}
        <div className="font-semibold">Wed Oct 12</div>
      </div>
      <div className="text-3xl font-extrabold">{time}</div>
    </div>
  )
}
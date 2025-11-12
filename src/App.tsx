import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header'
import BottomBar from './components/BottomBar'
import Modal from './components/Modal'
import { STRINGS, type Lang } from './i18n/strings'

// Language context
const LangCtx = createContext<{lang: Lang, setLang: (l: Lang)=>void}>({lang: 'en', setLang: ()=>{}})
export const useLang = () => useContext(LangCtx)

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [showTimeout, setShowTimeout] = useState(false)
  const nav = useNavigate()
  const loc = useLocation()

  // Inactivity timer
  const last = useRef<number>(Date.now())
  const warnAt = 60_000 // show modal at 25s
  const resetAt = 90_000 // go idle at 30s

  useEffect(()=>{
    const onAny = () => { last.current = Date.now(); setShowTimeout(false) }
    window.addEventListener('pointerdown', onAny)
    window.addEventListener('keydown', onAny)
    const id = setInterval(()=>{
      const d = Date.now() - last.current
      if (d > warnAt && d < resetAt && !loc.pathname.startsWith('/idle')) setShowTimeout(true)
      if (d >= resetAt) { setShowTimeout(false); nav('/') ; last.current = Date.now() }
    }, 500)
    return ()=>{ window.removeEventListener('pointerdown', onAny); window.removeEventListener('keydown', onAny); clearInterval(id) }
  }, [nav, loc.pathname])

  useEffect(()=>{
  if (loc.pathname === '/') {
    const id = setInterval(()=> nav('/idle2'), 10000)
    return ()=> clearInterval(id)
  }
  if (loc.pathname === '/idle2') {
    const id = setInterval(()=> nav('/'), 10000)
    return ()=> clearInterval(id)
  }
}, [loc.pathname, nav])

  const value = useMemo(()=>({lang, setLang}), [lang])
  const location = useLocation()
  const isIdle = location.pathname === '/' || location.pathname === '/idle2'
  const hideBottomBar = isIdle
    // decide when to show the progress bar
  const path = location.pathname

  // Pages where the progress bar is visible
  const showProgress = [
    '/destination',
    '/map',
    '/mapConfirm',
    '/tickets',
    '/summary',
    '/done'
  ].some(prefix => path.startsWith(prefix))

  // Default progress
  let progress = 0

  // Set percentage based on path
  if (path.startsWith('/destination')) progress = 0
  else if (path.startsWith('/map')) progress = 0
  else if (path.startsWith('/mapConfirm')) progress = 0
  else if (path.startsWith('/tickets')) progress = 33
  else if (path.startsWith('/summary')) progress = 80
  else if (path.startsWith('/done')) progress = 100


  return (
    <LangCtx.Provider value={value}>
      <div className="kiosk-card select-none relative">
        <Header title="GoBus" />

        {/* Remove padding for idle screens */}
        <div className={isIdle ? "relative h-full p-0" : "relative p-4 min-h-[400px]"}>
          <Outlet />
        </div>
       {!hideBottomBar && <BottomBar showProgress={showProgress} progress={progress} />}

      </div>

      <Modal open={showTimeout} onClose={()=>setShowTimeout(false)}>
        <div className="text-center space-y-2">
          <p className="font-semibold">This session will end in 30 seconds due to inactivity.</p>
          <button onClick={()=>setShowTimeout(false)} className="btn">I'm still here</button>
        </div>
      </Modal>
    </LangCtx.Provider>
  )
}

import { useLocation, useNavigate } from 'react-router-dom'

export default function MapConfirm(){
  const nav = useNavigate()
  const loc = useLocation() as any
  const addr = loc.state?.address || '2636 - 12 Avenue SE, Calgary'
  return (
    <div>
      <div className="input mb-3">{addr}</div>
      <div className="rounded-2xl overflow-hidden border">
        <img src="/assets/map-sample.png" alt="Map" className="w-full h-64 object-cover"/>
      </div>
      <div className="mt-4 text-center"><button className="btn" onClick={()=> nav('/tickets', { state: { address: addr } })}>Confirm</button></div>
    </div>
  )
}
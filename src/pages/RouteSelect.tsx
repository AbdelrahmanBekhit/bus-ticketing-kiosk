import routes from '../data/routes.json'
import { useNavigate } from 'react-router-dom'

export default function RouteSelect(){
  const nav = useNavigate()
  const pick = (r: any)=> nav('/tickets', { state: { route: r } })
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Selected route:</h2>
      <div className="space-y-3">
        {routes.slice(0,3).map(r=> (
          <button key={r.id} className="list-tile w-full text-left" onClick={()=> pick(r)}>
            <div className="flex items-center gap-3"><span className="font-bold text-orange-600">{r.code}</span>{r.name}</div>
            <div className="btn-secondary">{r.eta} min</div>
          </button>
        ))}
      </div>
      <div className="mt-4 text-center"><button className="btn" onClick={()=> nav(-1)}>Back</button></div>
    </div>
  )
}
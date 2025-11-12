import { useLocation, useNavigate } from 'react-router-dom'
import fares from '../data/fares.json'
import { useState } from 'react'
import Modal from '../components/Modal'

export default function TicketSelect(){
  const nav = useNavigate()
  const [adult, setAdult] = useState(1)
  const [youth, setYouth] = useState(0)
  const [senior, setSenior] = useState(0)
  const [err, setErr] = useState(false)

  const total = adult*fares.oneWay.adult + youth*fares.oneWay.youth + senior*fares.oneWay.senior

  const confirm = () => {
    if(adult+youth+senior < 1){ setErr(true); return }
    nav('/summary', { state: { items: { adult, youth, senior }, total } })
  }

  return (
    <div>
      <div className="card space-y-3">
        {[
          {label: 'Adult ticket (18-64)', v: adult, set: setAdult},
          {label: 'Youth ticket (10-18)', v: youth, set: setYouth},
          {label: 'Senior ticket (64+)', v: senior, set: setSenior}
        ].map(row=> (
          <div key={row.label} className="flex items-center justify-between">
            <div>{row.label}</div>
            <div className="flex items-center gap-3">
              <button className="btn-secondary" onClick={()=> row.set(Math.max(0,row.v-1))}>-</button>
              <div className="w-8 text-center font-semibold">{row.v}</div>
              <button className="btn" onClick={()=> row.set(row.v+1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center"><button className="btn" onClick={confirm}>Confirm</button></div>
      <Modal open={err} onClose={()=> setErr(false)}>
        <div className="text-center space-y-3">
          <p>Please select at least one ticket to proceed.</p>
          <button className="btn" onClick={()=> setErr(false)}>OK</button>
        </div>
      </Modal>
    </div>
  )
}
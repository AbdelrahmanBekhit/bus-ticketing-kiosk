import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import KeyboardOverlay from '../components/KeyboardOverlay'
import Modal from '../components/Modal'

export default function Destination(){
  const [value, setValue] = useState('')
  const [showErr, setShowErr] = useState(false)
  const nav = useNavigate()
  const goNext = ()=>{ if(!value.trim()) { setShowErr(true); return } nav('/map', { state: { address: value } }) }
  return (
    <div>
      <h2 className="text-center text-2xl font-semibold mb-4">Please Enter your Destination</h2>
      <input className="input" placeholder="Search for your destination" value={value} onChange={e=> setValue(e.target.value)} />
      <KeyboardOverlay onInsert={(c)=> c==='⌫'? setValue(s=> s.slice(0,-1)) : setValue(s=> s + (c==='⇧'?'':c))} />
      <div className="mt-4 text-center"><button className="btn" onClick={goNext}>Confirm</button></div>
      <Modal open={showErr} onClose={()=> setShowErr(false)}>
        <div className="text-center space-y-3">
          <p>Please enter your destination before continuing.</p>
          <button className="btn" onClick={()=> setShowErr(false)}>OK</button>
        </div>
      </Modal>
    </div>
  )
}
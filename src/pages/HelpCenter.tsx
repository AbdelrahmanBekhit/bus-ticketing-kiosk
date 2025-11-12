import faqs from '../data/faqs.json'
import { useState } from 'react'

export default function HelpCenter(){
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">How can we help you?</h2>
      <input className="input mb-3" placeholder="Search..." />
      <div className="space-y-2">
        {faqs.map((f, i)=> (
          <div key={i} className="border rounded-xl">
            <button className="w-full text-left px-4 py-3" onClick={()=> setOpen(open===i?null:i)}>
              <div className="flex justify-between items-center"><span>{f.q}</span><span>{open===i?'−':'+'}</span></div>
            </button>
            {open===i && <div className="px-4 pb-3 text-sm text-gray-700">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
const KEYS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['⇧','z','x','c','v','b','n','m','⌫'],
]

export default function KeyboardOverlay({ onInsert }:{ onInsert: (s:string)=>void }){
  return (
    <div className="mt-4 p-3 bg-gray-100 rounded-2xl">
      {KEYS.map((row, i)=>
        <div key={i} className="flex gap-2 justify-center mb-2">
          {row.map(k=>
            <button key={k} className="px-3 py-2 rounded-md border" onClick={()=> onInsert(k)}>{k}</button>
          )}
        </div>
      )}
    </div>
  )
}
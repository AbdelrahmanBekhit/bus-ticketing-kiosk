import React from 'react'

export default function Modal({ open, onClose, children }:{ open: boolean, onClose: ()=>void, children: React.ReactNode }){
  if(!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-[300px]" onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
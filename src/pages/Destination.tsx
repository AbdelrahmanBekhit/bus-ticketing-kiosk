import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Modal from '../components/Modal'
import { MapPinIcon } from '@heroicons/react/24/solid'

export default function Destination() {
  const [showErr, setShowErr] = useState(false)
  const [value, setValue] = useState('')
  const nav = useNavigate()

  const goNext = () => {
    if (!value.trim()) {
      setShowErr(true)
      return
    }
    nav('/map', { state: { address: value } })
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white px-8">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
        Please Enter your Destination
      </h2>

      {/* Search Button */}
      <button
        onClick={() => nav('/map')}
        className="flex items-center gap-3 px-5 py-4 w-full max-w-sm border border-gray-300 rounded-2xl shadow-sm
                   bg-white hover:bg-gray-50 active:bg-gray-100 transition-all text-gray-600 text-base"
      >
        <MapPinIcon className="h-6 w-6 text-[#f28c28]" />
        <span className="text-gray-400">Search for your destination</span>
      </button>

      {/* Error Modal */}
      <Modal open={showErr} onClose={() => setShowErr(false)}>
        <div className="text-center space-y-3">
          <p>Please enter your destination before continuing.</p>
          <button className="btn" onClick={() => setShowErr(false)}>
            OK
          </button>
        </div>
      </Modal>
    </div>
  )
}

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import KeyboardOverlay from "../components/KeyboardOverlay"

export default function Map() {
  const nav = useNavigate()
  const [showKeyboard, setShowKeyboard] = useState(false)
  const [address, setAddress] = useState("Please Enter Address")
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number } | null>(null)

  // Simulate selecting a point on the map
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setSelectedPoint({ x, y })
  }

  // Go to next step
  const handleConfirm = () => {
    if (address === "Please Enter Address" && !selectedPoint) return
    nav("/mapConfirm", { state: { address, point: selectedPoint } })
  }

  return (
    <div className="flex flex-col items-center gap-4 relative h-full bg-white">
      
      {/* Address Input */}
      <button
        onClick={() => {
          // Clear placeholder on focus
          if (address === "Please Enter Address") setAddress("")
          setShowKeyboard(true)
        }}
        className="flex items-center justify-between w-[90%] border border-gray-400 rounded-full px-4 py-2 text-gray-600 text-lg shadow-sm hover:shadow-md transition mt-4"
      >
        <span>{address === "" ? "Please Enter Address" : address}</span>
        <span className="text-xl font-semibold">{">"}</span>
      </button>

      {/* Map Area */}
      <div
        onClick={handleMapClick}
        className="relative w-[90%] h-[300px] border rounded-2xl overflow-hidden cursor-pointer"
      >
        <img
          src="/assets/map-sample.png"
          alt="Map"
          className="w-full h-full object-cover"
        />

        {/* Red marker when clicked */}
        {selectedPoint && (
          <div
            className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white"
            style={{
              left: selectedPoint.x - 8,
              top: selectedPoint.y - 8,
            }}
          ></div>
        )}
      </div>

      {/* Confirm Button */}
      <div className="mt-4 text-center">
        <button className="btn" onClick={() => nav('/mapConfirm')}>Confirm</button>
      </div>

      {/* Keyboard Overlay */}
      {showKeyboard && (
        <KeyboardOverlay
          onInsert={(key) => {
            // BACKSPACE
            if (key === "BACKSPACE") {
              if (address.length === 0) return
              setAddress(prev => prev.slice(0, -1))
              return
            }

            // SPACE
            if (key === " ") {
              setAddress(prev => prev + " ")
              return
            }

            // Normal character
            setAddress(prev => prev + key)
          }}

          onClose={() => {
            if (address.trim() === "") setAddress("Please Enter Address")
            setShowKeyboard(false)
          }}
        />
      )}
    </div>
  )
}

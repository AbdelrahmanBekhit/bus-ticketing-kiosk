import { useState } from "react"
import { useNavigate } from "react-router-dom"
import KeyboardOverlay from "../components/KeyboardOverlay"

export default function Map() {
  const nav = useNavigate()
  const [showKeyboard, setShowKeyboard] = useState(false)
  const [address, setAddress] = useState("Please Enter Address")
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number } | null>(null)

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Simulate selecting a point
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setSelectedPoint({ x, y })
  }

  const handleConfirm = () => {
    if (address === "Please Enter Address" && !selectedPoint) return
    nav("/mapConfirm", { state: { address, point: selectedPoint } })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Address Input */}
      <button
        className="flex items-center justify-between w-[90%] border border-gray-400 rounded-full px-4 py-2 text-gray-600 text-lg shadow-sm hover:shadow-md transition"
        onClick={() => setShowKeyboard(true)}
      >
        <span>{address}</span>
        <span className="text-xl font-semibold">{">"}</span>
      </button>

      {/* Map Container */}
      <div
        onClick={handleMapClick}
        className="relative w-[90%] h-[300px] border rounded-2xl overflow-hidden cursor-pointer"
      >
        <img
          src="/assets/map-sample.png"
          alt="Map"
          className="w-full h-full object-cover"
        />
        {/* Selected point indicator */}
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
      <button
        onClick={handleConfirm}
        className="flex items-center justify-between w-[60%] border border-gray-400 rounded-full px-4 py-2 text-gray-700 text-lg font-semibold mt-2 shadow-sm hover:bg-gray-100 transition"
      >
        <span>Confirm</span>
        <span className="text-xl font-semibold">{">"}</span>
      </button>

      {/* Keyboard Overlay */}
      {showKeyboard && (
        <KeyboardOverlay
          onInsert={(key) => {
            if (key === "⌫") setAddress((prev) => prev.slice(0, -1))
            else if (key === "⇧") return
            else setAddress((prev) =>
              prev === "Please Enter Address" ? key : prev + key
            )
          }}
        />
      )}
    </div>
  )
}

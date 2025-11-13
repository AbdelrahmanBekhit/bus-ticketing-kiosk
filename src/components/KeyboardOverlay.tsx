import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const KEYS = [
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l"],
  ["⇧","z","x","c","v","b","n","m","⌫"],
]

export default function KeyboardOverlay({
  onInsert,
  onClose,
}: {
  onInsert: (s: string) => void
  onClose?: () => void
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(timeout)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onClose?.(), 300)
  }

  // If kiosk-card exists, we’ll render inside it (so it overlays BottomBar)
  const kioskRoot = document.querySelector(".kiosk-card")

  const keyboardContent = (
    <>
      {/* dim background */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 z-40 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* keyboard panel */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full bg-[#f9f9f9] border-t border-gray-300 shadow-2xl rounded-t-3xl p-4 z-[999] transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-gray-700 font-semibold text-lg pl-2">Keyboard</h3>
          <button
            onClick={handleClose}
            className="text-sm font-semibold text-gray-600 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200 transition"
          >
            Close ✕
          </button>
        </div>

        <div className="flex flex-col gap-2 items-center">
          {KEYS.map((row, i) => (
            <div key={i} className="flex gap-2 justify-center">
              {row.map((k) => (
                <button
                  key={k}
                  className="min-w-[35px] px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 font-medium hover:bg-gray-100 active:bg-[#f28c28] active:text-white transition"
                  onClick={() => onInsert(k)}
                >
                  {k}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )

  // Render inside the kiosk-card layer so it overlays BottomBar correctly
  return kioskRoot ? createPortal(keyboardContent, kioskRoot) : keyboardContent
}

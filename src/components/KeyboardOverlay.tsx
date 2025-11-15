import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export default function KeyboardOverlay({
  onInsert,
  onClose,
}: {
  onInsert: (s: string) => void
  onClose?: () => void
}) {
  const [visible, setVisible] = useState(false)
  const [shift, setShift] = useState(false)
  const [mode, setMode] = useState<"letters" | "numbers">("letters")

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(timeout)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onClose?.(), 250)
  }

  const handleKeyPress = (k: string) => {
    if (k === "⇧") {
      setShift(s => !s)
      return
    }

    if (k === "⌫") {
      onInsert("BACKSPACE")
      return
    }

    if (k === "↵") {
      handleClose()
      return
    }

    if (k === "123") {
      setMode("numbers")
      return
    }

    if (k === "ABC") {
      setMode("letters")
      return
    }

    if (k === " ") {
      onInsert(" ")
      return
    }

    const out = shift ? k.toUpperCase() : k
    onInsert(out)
  }

  const row1 = ["q","w","e","r","t","y","u","i","o","p"]
  const row2 = ["a","s","d","f","g","h","j","k","l"]
  const row3 = ["⇧","z","x","c","v","b","n","m","⌫"]
  const row4 = ["123", "space", "↵"]

  const numRow1 = ["1","2","3","4","5","6","7","8","9","0"]
  const numRow2 = ["-","/",":",";","(",")","$","&","@"]
  const numRow3 = ["ABC",".",",","?","!","⌫"]

  const kioskRoot = document.querySelector(".kiosk-card")

  const keyboardContent = (
    <>
      {/* background dimmer */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/0 transition-opacity duration-300 z-40 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* keyboard container */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-300 shadow-2xl rounded-t-3xl p-4 px-3 z-[999] transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-3 px-2">
          <h3 className="text-gray-700 font-semibold text-lg">Keyboard</h3>
          <button
            onClick={handleClose}
            className="text-sm font-semibold text-gray-600 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200 transition"
          >
            Close ✕
          </button>
        </div>

        {/* LETTER MODE */}
        {mode === "letters" && (
          <div className="flex flex-col gap-3 items-center">
            <div className="flex gap-1 justify-center">
              {row1.map(k => (
                <KeyButton key={k} k={k} shift={shift} onPress={handleKeyPress} />
              ))}
            </div>

            <div className="flex gap-1 justify-center">
              {row2.map(k => (
                <KeyButton key={k} k={k} shift={shift} onPress={handleKeyPress} />
              ))}
            </div>

            <div className="flex gap-1 justify-center">
              {row3.map(k => (
                <KeyButton key={k} k={k} shift={shift} onPress={handleKeyPress} />
              ))}
            </div>

            <div className="flex gap-2 w-full justify-center">
              {row4.map(k => (
                <button
                  key={k}
                  onClick={() => {
                    if (k === "space") handleKeyPress(" ")
                    else handleKeyPress(k)
                  }}
                  className={`${k === "space" ? "flex-1" : "min-w-[60px]"} px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 font-medium hover:bg-gray-100 active:bg-orange-400 active:text-white transition`}
                >
                  {k === "space" ? "space" : k}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* NUMBER MODE */}
        {mode === "numbers" && (
          <div className="flex flex-col gap-3 items-center">
            <div className="flex gap-1 justify-center">
              {numRow1.map(k => (
                <KeyButton key={k} k={k} shift={false} onPress={handleKeyPress} />
              ))}
            </div>

            <div className="flex gap-1 justify-center">
              {numRow2.map(k => (
                <KeyButton key={k} k={k} shift={false} onPress={handleKeyPress} />
              ))}
            </div>

            <div className="flex gap-1 justify-center">
              {numRow3.map(k => (
                <KeyButton key={k} k={k} shift={false} onPress={handleKeyPress} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )

  return kioskRoot ? createPortal(keyboardContent, kioskRoot) : keyboardContent
}

function KeyButton({
  k,
  shift,
  onPress
}: {
  k: string
  shift: boolean
  onPress: (k: string) => void
}) {
  const label =
    k === "⇧"
      ? "⇧"
      : k === "⌫"
      ? "⌫"
      : shift
      ? k.toUpperCase()
      : k

  return (
    <button
      onClick={() => onPress(k)}
      className={`min-w-[34px] px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 font-medium hover:bg-gray-100 active:bg-orange-400 active:text-white transition ${
        k === "⇧" && shift ? "bg-gray-300" : ""
      }`}
    >
      {label}
    </button>
  )
}

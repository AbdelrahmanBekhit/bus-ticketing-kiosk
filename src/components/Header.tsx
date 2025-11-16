import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Header({ subtitle: override }: { subtitle?: string }) {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  )

  const [dateStr, setDateStr] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
    })
  )

  const nav = useNavigate()
  const loc = useLocation()

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date()

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      )

      setDateStr(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "2-digit",
        })
      )
    }, 1000)

    return () => clearInterval(id)
  }, [])

  const showBack = !["/", "/idle2", "/home"].includes(loc.pathname)

  const subtitleMap: Record<string, string> = {
    "/map": "One-Way Ticket",
    "/destination": "One-Way Ticket",
    "/tickets": "One-Way Ticket",
    "/summary": "One-Way Ticket",
    "/monthlyPass": "Monthly Pass",
    "/passsummary": "Monthly Pass",
  }

  const autoSubtitle = subtitleMap[loc.pathname]
  const subtitle = override ?? autoSubtitle

  const textShadow = { textShadow: "0px 1px 2px rgba(0,0,0,0.35)" }

  return (
    <div 
      className="header-bar flex justify-between items-center pl-3 pr-6 py-2"
      style={{boxShadow: "0px 6px 12px rgba(0,0,0,0.28)",
    }}>
      {/* Left side: arrow + date + subtitle */}
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            aria-label="Back"
            onClick={() => nav(-1)}
            className="flex items-center justify-center -ml-1"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={textShadow}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        <div className="flex flex-col leading-tight">
          {/* Date */}
          <div
            className="font-semibold text-[22px] text-white"
            style={textShadow}
          >
            {dateStr}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              className="mt-[2px] text-[16px] text-white"
              style={textShadow}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Right side: time */}
      <div
        className="font-extrabold text-[32px] text-white pr-1"
        style={textShadow}
      >
        {time}
      </div>
    </div>
  )
}

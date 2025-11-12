import { useNavigate } from "react-router-dom"

export default function IdleScreen1() {
  const nav = useNavigate()

  return (
    <div className="flex flex-col justify-between h-full bg-[#a7a7af] items-center">
      <div className="kiosk-card bg-[#f6f6f6] flex flex-col justify-between overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="bg-[#f28c28] text-white flex justify-between items-center px-5 py-3 rounded-t-kiosk">
          <div>
            <div className="text-sm font-semibold">Wed Oct 12</div>
            <div className="text-xs opacity-90">GoBus</div>
          </div>
          <div className="text-3xl font-extrabold">3:20</div>
        </div>

        {/* Title */}
        <div className="bg-[#f28c28] text-white text-center py-2 text-lg font-semibold">
          Bus Terminal Map
        </div>

        {/* Map */}
        <div className="flex-1 flex items-center justify-center bg-[#f6f6f6]">
          <img
            src="/assets/idle-map.png"
            alt="Bus Terminal Map"
            className="w-[85%] rounded-md shadow-md"
          />
        </div>

        {/* Footer */}
        <div
          className="bg-[#f28c28] text-white text-center text-lg font-semibold py-4 rounded-b-kiosk cursor-pointer"
          onClick={() => nav("/home")}
        >
          Touch to Start
        </div>
      </div>
    </div>
  )
}

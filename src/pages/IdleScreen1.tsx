import { useNavigate } from "react-router-dom"

export default function IdleScreen1() {
  const nav = useNavigate()

  return (
    <div className="relative h-full w-full bg-white flex flex-col">
        <div className="bg-[#f28c28] text-white text-center py-3 text-3xl font-bold tracking-wide">
          Bus Terminal Map
        </div>

        <div className="flex flex-center justify-center flex-1 pt-4 pb-24">
          <img
            src="/assets/idle-map.png"
            alt="Bus Terminal Map"
            className=""
          />
        </div>

      {/* Touch to Start Bar */}
      <div
        onClick={() => nav("/home")}
        className="absolute bottom-0 left-0 right-0 bg-[#f28c28] text-white text-center text-2xl font-extrabold py-6 cursor-pointer rounded-b-[25px] tracking-wide shadow-lg"
      >
        Touch to Start
      </div>
    </div>

  )
}

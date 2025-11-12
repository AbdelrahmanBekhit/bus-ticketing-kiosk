export default function ProgressBar({ value = 0 }:{ value?: number }){
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full"><div className="h-2 bg-blue-500 rounded-full" style={{ width: `${value}%` }}/></div>
  )
}
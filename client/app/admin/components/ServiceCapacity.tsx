"use client";

export function ServiceCapacity() {
  const percentage = 75;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-5 h-full flex flex-col">
      <p className="text-xs font-semibold tracking-widest text-white uppercase mb-1">
        Service Capacity
      </p>
      <p className="text-[10px] text-gray-500 tracking-widest uppercase mb-6">
        Workshop Load Factor
      </p>

      {/* Circular gauge */}
      <div className="flex justify-center items-center flex-1">
        <div className="relative">
          <svg width="140" height="140" className="-rotate-90">
            {/* Background circle */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#2a2a2a"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#dc2626"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{percentage}%</span>
            <span className="text-[9px] tracking-widest text-gray-500 uppercase">
              Optimized
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 space-y-2 border-t border-[#2a2a2a] pt-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-gray-500 tracking-wide uppercase">
            Current Queue
          </span>
          <span className="text-[11px] text-white font-semibold">
            14 Vehicles
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-gray-500 tracking-wide uppercase">
            Exp. Wait Time
          </span>
          <span className="text-[11px] text-white font-semibold">
            4.2 Hours
          </span>
        </div>
      </div>
    </div>
  );
}

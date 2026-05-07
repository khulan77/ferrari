"use client";

const technicians = [
  {
    initials: "MR",
    name: "Marcus Rossi",
    specialization: "V12 Powertrain",
    workload: 90,
    status: "IN SERVICE",
    statusColor: "bg-red-600",
    barColor: "bg-red-500",
  },
  {
    initials: "SC",
    name: "Sarah Chen",
    specialization: "Electronic Systems",
    workload: 35,
    status: "AVAILABLE",
    statusColor: "bg-green-700",
    barColor: "bg-green-500",
  },
  {
    initials: "JH",
    name: "Julian Hunt",
    specialization: "Chassis & Aero",
    workload: 65,
    status: "QUEUED",
    statusColor: "bg-yellow-700",
    barColor: "bg-yellow-500",
  },
];

export function TechniciansStatus() {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-5">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xs font-semibold tracking-widest text-white uppercase">
          Technicians Status
        </p>
        <button className="text-[9px] tracking-widest text-red-500 hover:text-red-400 uppercase transition-colors">
          View All Staff
        </button>
      </div>

      {/* Header */}
      <div className="grid grid-cols-4 mb-3">
        {["Expert", "Specialization", "Current Workload", "Status"].map((h) => (
          <p
            key={h}
            className="text-[9px] tracking-widest text-gray-600 uppercase"
          >
            {h}
          </p>
        ))}
      </div>

      {/* Rows */}
      <div className="space-y-4">
        {technicians.map((tech) => (
          <div
            key={tech.name}
            className="grid grid-cols-4 items-center py-3 border-t border-[#222]"
          >
            {/* Name */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                <span className="text-[9px] font-bold text-gray-300 tracking-wider">
                  {tech.initials}
                </span>
              </div>
              <span className="text-xs text-white font-medium">
                {tech.name}
              </span>
            </div>

            {/* Specialization */}
            <span className="text-[11px] text-gray-400">
              {tech.specialization}
            </span>

            {/* Workload bar */}
            <div className="pr-6">
              <div className="w-full h-1.5 bg-[#2a2a2a] rounded-full">
                <div
                  className={`h-1.5 rounded-full ${tech.barColor}`}
                  style={{ width: `${tech.workload}%` }}
                />
              </div>
              <span className="text-[9px] text-gray-600 mt-1 block">
                {tech.workload}%
              </span>
            </div>

            {/* Status badge */}
            <div>
              <span
                className={`text-[9px] tracking-widest px-2 py-1 rounded-sm font-bold text-white ${tech.statusColor}`}
              >
                {tech.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

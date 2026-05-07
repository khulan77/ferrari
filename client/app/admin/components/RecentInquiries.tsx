"use client";

const inquiries = [
  {
    name: "Dominic T.",
    time: "58m ago",
    message: "Requesting quote for stage 2 tune on 2023...",
  },
  {
    name: "Elena R.",
    time: "1h ago",
    message: "Brake squeal diagnosis following track day...",
  },
  {
    name: "Marcus V.",
    time: "4h ago",
    message: "Scheduling annual ceramic coating...",
  },
];

export function RecentInquiries() {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-5">
      <p className="text-xs font-semibold tracking-widest text-white uppercase mb-4">
        Recent Inquiries
      </p>

      <div className="space-y-4">
        {inquiries.map((inq, i) => (
          <div
            key={i}
            className="border-t border-[#222] pt-3 first:border-t-0 first:pt-0"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-white font-semibold">
                {inq.name}
              </span>
              <span className="text-[9px] text-gray-600">{inq.time}</span>
            </div>
            <p className="text-[10px] text-gray-500 italic leading-relaxed">
              "{inq.message}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

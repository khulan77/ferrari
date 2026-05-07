"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { month: "JAN", value: 38000 },
  { month: "FEB", value: 42000 },
  { month: "MAR", value: 35000 },
  { month: "APR", value: 50000 },
  { month: "MAY", value: 45000 },
  { month: "JUN", value: 48000 },
  { month: "JUL", value: 52000 },
  { month: "AUG", value: 47000 },
  { month: "SEP", value: 55000 },
  { month: "OCT", value: 49000 },
  { month: "NOV", value: 51000 },
  { month: "DEC", value: 78000 },
];

type ActiveTab = "30 DAYS" | "90 DAYS";

export function RevenueChart() {
  const [activeTab, setActiveTab] = (
    require("react") as typeof import("react")
  ).useState<ActiveTab>("90 DAYS");

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-5 h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-white uppercase">
            Revenue Performance
          </p>
          <p className="text-[10px] text-gray-500 tracking-widest uppercase mt-1">
            Monthly Technical Services Yield
          </p>
        </div>
        <div className="flex gap-1">
          {(["30 DAYS", "90 DAYS"] as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[9px] tracking-widest px-2 py-1 rounded-sm transition-colors ${
                activeTab === tab
                  ? "bg-red-600 text-white"
                  : "bg-[#2a2a2a] text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="30%">
          <XAxis
            dataKey="month"
            tick={{ fill: "#555", fontSize: 9, letterSpacing: 1 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Bar dataKey="value" radius={[2, 2, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.month === "DEC" ? "#dc2626" : "#2a2a2a"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

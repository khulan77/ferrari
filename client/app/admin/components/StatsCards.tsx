"use client";

import { TrendingUp, TrendingDown, Package, Users } from "lucide-react";

const stats = [
  {
    label: "TOTAL REVENUE",
    value: "$248,392",
    change: "+12.4% vs last month",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "APPOINTMENTS",
    value: "1,204",
    change: "-2.1% vs last month",
    trend: "down",
    icon: Users,
  },
  {
    label: "INVENTORY VALUE",
    value: "$1.2M",
    change: "824 SKU Active",
    trend: "neutral",
    icon: Package,
  },
  {
    label: "ACTIVE TECHS",
    value: "18 / 24",
    change: null,
    trend: "bar",
    icon: null,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-4 p-6 pb-0">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-5"
        >
          <p className="text-[10px] tracking-widest text-gray-500 uppercase mb-3">
            {stat.label}
          </p>
          <p className="text-3xl font-bold text-white tracking-tight mb-2">
            {stat.value}
          </p>
          {stat.trend === "up" && (
            <p className="text-[11px] text-green-400 flex items-center gap-1">
              <TrendingUp size={11} />
              {stat.change}
            </p>
          )}
          {stat.trend === "down" && (
            <p className="text-[11px] text-red-400 flex items-center gap-1">
              <TrendingDown size={11} />
              {stat.change}
            </p>
          )}
          {stat.trend === "neutral" && (
            <p className="text-[11px] text-gray-400 flex items-center gap-1">
              <Package size={11} />
              {stat.change}
            </p>
          )}
          {stat.trend === "bar" && (
            <div className="mt-2">
              <div className="w-full h-1 bg-[#2a2a2a] rounded-full">
                <div
                  className="h-1 bg-red-600 rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

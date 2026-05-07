"use client";

import { AlertTriangle } from "lucide-react";

const alerts = [
  {
    name: "Synthetic Performance Oil (5W-40)",
    remaining: "Remaining: 12 Liters",
    critical: true,
  },
  {
    name: "Ceramic Brake Pads (Front)",
    remaining: "Remaining: 2 Sets",
    critical: true,
  },
];

export function InventoryAlerts() {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-semibold tracking-widest text-white uppercase">
          Inventory Alerts
        </p>
        <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-sm tracking-widest font-bold">
          3 CRITICAL
        </span>
      </div>

      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.name}
            className="flex items-start gap-3 bg-[#1e1a1a] border border-red-900/40 rounded-sm p-3"
          >
            <AlertTriangle size={12} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] text-white font-medium leading-tight">
                {alert.name}
              </p>
              <p className="text-[9px] text-gray-500 mt-0.5 tracking-wide uppercase">
                {alert.remaining}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-3 w-full text-[9px] tracking-widest text-gray-400 hover:text-white uppercase py-2 border border-[#2a2a2a] rounded-sm transition-colors hover:border-gray-600">
        Access Master Inventory
      </button>
    </div>
  );
}

"use client";

import { StatsCards } from "./components/StatsCards";
import { RevenueChart } from "./components/RevenueChart";
import { ServiceCapacity } from "./components/ServiceCapacity";
import { TechniciansStatus } from "./components/TechniciansStatus";
import { InventoryAlerts } from "./components/InventoryAlerts";
import { RecentInquiries } from "./components/RecentInquiries";
import { HeroBanner } from "./components/HeroBanner";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Stats Row */}
      <StatsCards />

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-4 p-6">
        {/* Revenue Chart - 8 cols */}
        <div className="col-span-8">
          <RevenueChart />
        </div>

        {/* Service Capacity - 4 cols */}
        <div className="col-span-4">
          <ServiceCapacity />
        </div>

        {/* Technicians Status - 8 cols */}
        <div className="col-span-8">
          <TechniciansStatus />
        </div>

        {/* Right Column */}
        <div className="col-span-4 flex flex-col gap-4">
          <InventoryAlerts />
          <RecentInquiries />
        </div>
      </div>

      {/* Hero Banner */}
      <HeroBanner />
    </div>
  );
}

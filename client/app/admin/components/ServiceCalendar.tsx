"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Car,
  Clock,
  Plus,
  Home,
  Wrench,
  Calendar,
  BarChart2,
  Settings,
  Gauge,
  Fuel,
  Activity,
  Eye,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Appointment {
  id: number;
  type: "SCHEDULED" | "CONFIRMED";
  time: string;
  day: string;
  title: string;
  tech: string;
  car: string;
  duration: string;
  image: string;
  color: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    type: "SCHEDULED",
    time: "10:00 AM",
    day: "Friday, Oct 18",
    title: "Engine Performance Tuning",
    tech: "Lead: Marcus Vane",
    car: "Porsche 911 GT3",
    duration: "4.5 Hours Est.",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80",
    color: "#dc2626",
  },
  {
    id: 2,
    type: "CONFIRMED",
    time: "09:00 AM",
    day: "Wed, Oct 16",
    title: "Ceramic Brake Inspection",
    tech: "Tech: Sarah Stone",
    car: "Audi R8 V10",
    duration: "2.0 Hours Est.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    color: "#16a34a",
  },
];

const FLEET_STATS = [
  {
    label: "ENGINE HEALTH",
    value: "98%",
    unit: "",
    icon: Activity,
    bar: 98,
    color: "#dc2626",
  },
  {
    label: "BRAKE LIFE",
    value: "42%",
    unit: "",
    icon: Gauge,
    bar: 42,
    color: "#eab308",
  },
  {
    label: "NEXT OIL SERVICE",
    value: "1.2k",
    unit: "MILES",
    icon: Fuel,
    bar: null,
    color: "#dc2626",
  },
];

// ─── Calendar helpers ─────────────────────────────────────────────────────────
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

function buildCalendar(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(first).fill(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  return cells;
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function CalendarWidget() {
  const [date, setDate] = useState(new Date(2024, 9, 1)); // Oct 2024
  const cells = buildCalendar(date.getFullYear(), date.getMonth());
  const today = 10;

  const prev = () =>
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  const next = () =>
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));

  return (
    <div className="bg-[#161616] border border-[#222] rounded-lg p-4 mx-4">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-white text-base font-bold tracking-tight">
          {MONTHS[date.getMonth()]} {date.getFullYear()}
        </span>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="text-gray-500 hover:text-white transition-colors p-1"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={next}
            className="text-gray-500 hover:text-white transition-colors p-1"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d, i) => (
          <div
            key={i}
            className="text-center text-[9px] text-gray-600 tracking-widest py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((d, i) => (
          <div
            key={i}
            className={`h-7 flex items-center justify-center text-[11px] rounded-sm cursor-pointer transition-all ${
              d === today
                ? "bg-red-600 text-white font-bold"
                : d
                  ? "text-gray-300 hover:text-white hover:bg-[#2a2a2a]"
                  : ""
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Next service */}
      <div className="mt-3 pt-3 border-t border-[#222]">
        <p className="text-[8px] tracking-widest text-gray-600 uppercase mb-1">
          Next Service
        </p>
        <p className="text-[11px] text-red-400 font-semibold">
          Oct 16, 2024 — 09:00 AM
        </p>
        <p className="text-[9px] text-gray-500 mt-0.5">
          911 GT3 Engine Optimization
        </p>
      </div>
    </div>
  );
}

function AppointmentCard({ appt }: { appt: Appointment }) {
  return (
    <div className="mx-4 rounded-lg overflow-hidden border border-[#222] bg-[#161616]">
      {/* Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={appt.image}
          alt={appt.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[8px] tracking-widest font-bold px-2 py-0.5 rounded-sm"
            style={{ backgroundColor: appt.color, color: "#fff" }}
          >
            {appt.type}
          </span>
        </div>

        {/* Time */}
        <div className="absolute top-3 right-3 text-right">
          <p className="text-white text-sm font-black leading-none">
            {appt.time}
          </p>
          <p className="text-gray-400 text-[9px] tracking-wide">{appt.day}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white text-sm font-bold mb-2 leading-tight">
          {appt.title}
        </h3>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <User size={9} className="text-gray-600 shrink-0" />
            <span className="text-[10px] text-gray-400">{appt.tech}</span>
          </div>
          <div className="flex items-center gap-2">
            <Car size={9} className="text-gray-600 shrink-0" />
            <span className="text-[10px] text-gray-400">{appt.car}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={9} className="text-gray-600 shrink-0" />
            <span className="text-[10px] text-gray-400">{appt.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FleetStatus() {
  return (
    <div className="mx-4">
      <p className="text-[9px] tracking-widest text-gray-600 uppercase mb-3">
        Fleet Status Overview
      </p>
      <div className="space-y-4">
        {FLEET_STATS.map((stat) => (
          <div key={stat.label}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[9px] tracking-widest text-gray-500 uppercase">
                {stat.label}
              </p>
            </div>
            <div className="flex items-end gap-3">
              <p className="text-2xl font-black text-white leading-none">
                {stat.value}
                {stat.unit && (
                  <span className="text-[9px] text-gray-500 tracking-widest ml-1">
                    {stat.unit}
                  </span>
                )}
              </p>
              {stat.bar !== null && (
                <span style={{ color: stat.color }} className="mb-0.5">
                  <Activity size={12} />
                </span>
              )}
            </div>
            {stat.bar !== null && (
              <div className="mt-1.5 w-full h-0.5 bg-[#2a2a2a] rounded-full">
                <div
                  className="h-0.5 rounded-full transition-all"
                  style={{ width: `${stat.bar}%`, backgroundColor: stat.color }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 border border-[#2a2a2a] rounded-lg text-[9px] tracking-widest text-gray-500 hover:text-white hover:border-gray-600 transition-colors uppercase">
        <Eye size={10} />
        View Full Service History
      </button>
    </div>
  );
}

function BottomNav() {
  const [active, setActive] = useState("garage");
  const items = [
    { id: "home", icon: Home, label: "Home" },
    { id: "orders", icon: Wrench, label: "Orders" },
    { id: "garage", icon: Car, label: "Garage" },
    { id: "analytics", icon: BarChart2, label: "Stats" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-[#0f0f0f] border-t border-[#1e1e1e] flex justify-around items-center py-3 px-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
            active === item.id ? "text-red-500" : "text-gray-600"
          }`}
        >
          <item.icon size={18} />
          <span className="text-[7px] tracking-widest uppercase">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ServiceCalendarPage() {
  const [tab, setTab] = useState<"schedule" | "history">("schedule");

  return (
    <div className="min-h-screen bg-[#111111] text-white max-w-sm mx-auto relative pb-24 font-mono">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#111111] border-b border-[#1e1e1e]">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-xs font-black tracking-widest text-red-500 uppercase leading-tight">
            PRECISION
            <br />
            PERFORMANCE
          </p>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-[#2a2a2a]">
            <Car size={14} className="text-gray-400" />
          </button>
        </div>

        {/* Sub header */}
        <div className="px-4 pb-3">
          <p className="text-[8px] tracking-[0.25em] text-gray-600 uppercase">
            Management Hub
          </p>
          <p className="text-[9px] tracking-widest text-gray-400 uppercase mt-0.5">
            Service Calendar
          </p>
        </div>

        {/* Tabs */}
        <div className="flex px-4 gap-1 pb-3">
          {(["schedule", "history"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 text-[9px] tracking-widest uppercase rounded-sm font-bold transition-all ${
                tab === t
                  ? "bg-red-600 text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 pt-4">
        {/* Calendar */}
        <CalendarWidget />

        {/* Upcoming appointments */}
        <div>
          <div className="px-4 mb-3">
            <p className="text-[9px] tracking-widest text-gray-600 uppercase">
              Upcoming Appointments ({APPOINTMENTS.length})
            </p>
          </div>
          <div className="space-y-3">
            {APPOINTMENTS.map((appt) => (
              <AppointmentCard key={appt.id} appt={appt} />
            ))}
          </div>
        </div>

        {/* Fleet Status */}
        <FleetStatus />
      </div>

      {/* FAB */}
      <button className="fixed bottom-20 right-4 w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-900/40 transition-colors z-50">
        <Plus size={20} className="text-white" />
      </button>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}

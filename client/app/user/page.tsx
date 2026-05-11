"use client";

import { useState } from "react";
import Link from "next/link";

// ── Машины мэдээлэл ─────────────────────────────────────────
type Car = {
  id: number;
  name: string;
  year: number;
  plate: string;
  mileage: string;
  lastService: string;
  status: "good" | "service_due";
  img: string;
};

const initialFleet: Car[] = [
  {
    id: 1,
    name: "Toyota Camry",
    year: 2021,
    plate: "УБ-1234АА",
    mileage: "42,000 км",
    lastService: "2024 оны 10-р сар",
    status: "good",
    img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
  },
  {
    id: 2,
    name: "Hyundai Tucson",
    year: 2020,
    plate: "УБ-5678ББ",
    mileage: "67,500 км",
    lastService: "2024 оны 8-р сар",
    status: "service_due",
    img: "https://images.unsplash.com/photo-1633508800088-ac9bfc9c44e6?w=600&q=80",
  },
  {
    id: 3,
    name: "Mitsubishi Outlander",
    year: 2022,
    plate: "УБ-9012ВВ",
    mileage: "18,200 км",
    lastService: "2024 оны 11-р сар",
    status: "good",
    img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
  },
];

// ── Цаг товлолт ──────────────────────────────────────────────
const upcomingAppointments = [
  {
    id: 1,
    type: "Жилийн ерөнхий үзлэг",
    car: "Toyota Camry",
    date: "2024/10/24",
    time: "09:00",
    status: "confirmed",
  },
  {
    id: 2,
    type: "Тоормосны шалгалт",
    car: "Hyundai Tucson",
    date: "2024/10/31",
    time: "11:00",
    status: "pending",
  },
];

// ── Сүүлийн үйл ажиллагаа ────────────────────────────────────
const recentActivity = [
  {
    id: "ЗАХ-2401",
    type: "order",
    label: "Тос солих иж бүрдэл захиалсан",
    sub: "Mobil 1 Full Synthetic",
    status: "delivered",
    date: "10/10",
  },
  {
    id: "ЦАГ-0921",
    type: "appointment",
    label: "Жилийн ерөнхий үзлэгийн цаг товлосон",
    sub: "Toyota Camry",
    status: "confirmed",
    date: "10/08",
  },
  {
    id: "ЗАХ-2389",
    type: "order",
    label: "Тоормосны бүрхэвч захиалсан",
    sub: "Brembo",
    status: "processing",
    date: "10/05",
  },
  {
    id: "ЗАС-0188",
    type: "service",
    label: "Түдгэлзүүрийн тохиргоо хийгдсэн",
    sub: "Mitsubishi Outlander",
    status: "completed",
    date: "09/30",
  },
  {
    id: "ЗАХ-2371",
    type: "order",
    label: "Агаарын шүүлтүүр захиалсан",
    sub: "Mann Filter",
    status: "delivered",
    date: "09/28",
  },
];

// ── Статик өгөгдөл ───────────────────────────────────────────
const stats = [
  { label: "Засвар хийлгэсэн", value: "14", sub: "нийт удаа", icon: "🔧" },
  { label: "Захиалсан сэлбэг", value: "8", sub: "энэ жил", icon: "📦" },
];

const statusColor: Record<string, string> = {
  good: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  service_due: "text-[#E31B23] bg-[#E31B23]/10 border-[#E31B23]/20",
  confirmed: "text-emerald-400 bg-emerald-400/10",
  pending: "text-amber-400 bg-amber-400/10",
  delivered: "text-emerald-400 bg-emerald-400/10",
  processing: "text-sky-400 bg-sky-400/10",
  completed: "text-white/40 bg-white/5",
};

const statusLabel: Record<string, string> = {
  good: "Сайн",
  service_due: "Засвар хэрэгтэй",
  confirmed: "Батлагдсан",
  pending: "Хүлээгдэж байна",
  delivered: "Хүргэгдсэн",
  processing: "Боловсруулж байна",
  completed: "Дууссан",
};

const activityIcon: Record<string, string> = {
  order: "📦",
  appointment: "📅",
  service: "🔧",
};

// ── Машин бүртгэх маягт ──────────────────────────────────────
const emptyForm = { name: "", year: "", plate: "", mileage: "" };

export default function UserOverviewPage() {
  const [fleet, setFleet] = useState<Car[]>(initialFleet);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [hoveredCar, setHoveredCar] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleRegister = () => {
    if (!form.name || !form.year || !form.plate) return;
    const newCar: Car = {
      id: Date.now(),
      name: form.name,
      year: parseInt(form.year),
      plate: form.plate,
      mileage: form.mileage ? `${form.mileage} км` : "0 км",
      lastService: "—",
      status: "good",
      img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
    };
    setFleet((prev) => [...prev, newCar]);
    setForm(emptyForm);
    setShowModal(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Гарчиг ──────────────────────────────────────── */}
        <div className="flex items-end justify-between mb-10">
          <div>
            {/* Нарийн улаан шугам */}
            <div className="w-8 h-0.5 bg-[#E31B23] mb-3" />
            <h1 className="text-white font-black text-4xl tracking-tight">
              Хяналтын самбар
            </h1>
            <p className="text-white/35 text-sm mt-1.5 font-light tracking-wide">
              Сайн ирлээ, Батдорж
            </p>
          </div>

          {/* Статистик — товч хэлбэрээр гарчигт */}
          <div className="hidden md:flex items-center gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-right">
                <p className="text-white font-black text-2xl leading-none">{s.value}</p>
                <p className="text-white/30 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Амжилтын мэдэгдэл ───────────────────────────── */}
        {successMsg && (
          <div className="mb-6 flex items-center gap-3 bg-emerald-400/8 border border-emerald-400/20 rounded-xl px-5 py-3.5">
            <span className="text-emerald-400 text-lg">✓</span>
            <p className="text-emerald-400 text-sm">
              Машин амжилттай бүртгэгдлээ!
            </p>
          </div>
        )}

        {/* ── Гол агуулга: 3+2 баганат ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ══ ЗҮҮН БАГАНА ══════════════════════════════════ */}
          <div className="lg:col-span-3 space-y-5">

            {/* Миний машинууд */}
            <div className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-4 bg-[#E31B23] rounded-full inline-block" />
                  <h2 className="text-white font-bold text-sm uppercase tracking-[0.12em]">
                    Миний машин
                  </h2>
                  <span className="text-white/20 text-xs bg-white/5 px-2 py-0.5 rounded-full">
                    {fleet.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-1.5 text-xs text-[#E31B23] hover:text-white bg-[#E31B23]/10 hover:bg-[#E31B23] border border-[#E31B23]/20 hover:border-[#E31B23] px-3 py-1.5 rounded-lg transition-all duration-200"
                >
                  <span className="text-base leading-none">+</span>
                  Машин бүртгэх
                </button>
              </div>

              <div className="space-y-3">
                {fleet.map((car) => (
                  <div
                    key={car.id}
                    onMouseEnter={() => setHoveredCar(car.id)}
                    onMouseLeave={() => setHoveredCar(null)}
                    className={`relative bg-[#0a0a0a] border rounded-xl overflow-hidden flex transition-all duration-300 cursor-pointer ${
                      hoveredCar === car.id
                        ? "border-white/15 shadow-lg shadow-black/40"
                        : "border-white/[0.05]"
                    }`}
                  >
                    {/* Зураг */}
                    <div className="w-32 h-[72px] flex-shrink-0 relative overflow-hidden">
                      <img
                        src={car.img}
                        alt={car.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          hoveredCar === car.id ? "scale-110" : "scale-100"
                        }`}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/60" />
                    </div>

                    {/* Мэдээлэл */}
                    <div className="flex-1 px-4 flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold text-sm">{car.name}</p>
                        <p className="text-white/30 text-xs mt-0.5">
                          {car.year} · {car.plate} · {car.mileage}
                        </p>
                        <p className="text-white/15 text-xs mt-0.5">
                          Сүүлд засуулсан: {car.lastService}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium border ${statusColor[car.status]}`}
                      >
                        {statusLabel[car.status]}
                      </span>
                    </div>

                    {/* Засвар хэрэгтэй бол улаан шугам */}
                    {car.status === "service_due" && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#E31B23]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Ойрын цаг товлолтууд */}
            <div className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block" />
                  <h2 className="text-white font-bold text-sm uppercase tracking-[0.12em]">
                    Ойрын цаг товлолтууд
                  </h2>
                </div>
                <Link
                  href="/user/appointments"
                  className="text-white/30 hover:text-[#E31B23] text-xs transition-colors"
                >
                  Бүгдийг харах →
                </Link>
              </div>

              <div className="space-y-2.5">
                {upcomingAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="flex items-center justify-between bg-[#0a0a0a] border border-white/[0.05] rounded-xl px-4 py-3 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          appt.status === "confirmed" ? "bg-emerald-400" : "bg-amber-400"
                        }`}
                      />
                      <div>
                        <p className="text-white text-sm font-medium">{appt.type}</p>
                        <p className="text-white/25 text-xs mt-0.5">{appt.car}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/50 text-xs">{appt.date}</p>
                      <p className="text-white/25 text-xs">{appt.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">

            {/* Сүүлийн үйл ажиллагаа */}
            <div className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-1.5 h-4 bg-sky-400 rounded-full inline-block" />
                <h2 className="text-white font-bold text-sm uppercase tracking-[0.12em]">
                  Сүүлийн үйл ажиллагаа
                </h2>
              </div>

              <div className="space-y-1.5">
                {recentActivity.map((act, i) => (
                  <div
                    key={act.id}
                    className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-all hover:bg-white/[0.03] ${
                      i !== recentActivity.length - 1
                        ? "border-b border-white/[0.04]"
                        : ""
                    }`}
                  >
                    {/* Дүрс */}
                    <span className="text-base mt-0.5 flex-shrink-0">
                      {activityIcon[act.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-xs leading-snug truncate">
                        {act.label}
                      </p>
                      <p className="text-white/25 text-xs mt-0.5">{act.sub}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[act.status]}`}
                      >
                        {statusLabel[act.status]}
                      </span>
                      <p className="text-white/20 text-xs mt-1">{act.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Хурдан үйлдлүүд */}
            <div className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-1.5 h-4 bg-white/20 rounded-full inline-block" />
                <h2 className="text-white font-bold text-sm uppercase tracking-[0.12em]">
                  Хурдан үйлдлүүд
                </h2>
              </div>
              <div className="space-y-2">
                <Link
                  href="/user/appointments"
                  className="w-full flex items-center gap-3 py-3 px-4 bg-[#E31B23] text-white text-sm font-semibold rounded-xl hover:bg-[#c41620] transition-all duration-200 tracking-wide"
                >
                  <span>📅</span> Цаг товлох
                </Link>
                <Link
                  href="/user/parts"
                  className="w-full flex items-center gap-3 py-3 px-4 bg-white/[0.04] border border-white/[0.07] text-white/60 text-sm rounded-xl hover:bg-white/[0.08] hover:text-white transition-all duration-200"
                >
                  <span>🔧</span> Сэлбэг захиалах
                </Link>
                <Link
                  href="/user/services"
                  className="w-full flex items-center gap-3 py-3 px-4 bg-white/[0.04] border border-white/[0.07] text-white/60 text-sm rounded-xl hover:bg-white/[0.08] hover:text-white transition-all duration-200"
                >
                  <span>📋</span> Үйлчилгээ харах
                </Link>
           
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ МАШИН БҮРТГЭХ MODAL ══════════════════════════════ */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#111111] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal гарчиг */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="w-6 h-0.5 bg-[#E31B23] mb-2" />
                <h3 className="text-white font-bold text-lg">Машин бүртгэх</h3>
                <p className="text-white/30 text-xs mt-0.5">
                  Таны тээврийн хэрэгслийн мэдээллийг оруулна уу
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/20 hover:text-white/60 transition-colors text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Маягт */}
            <div className="space-y-4">
              <div>
                <label className="block text-white/30 text-xs uppercase tracking-widest mb-1.5">
                  Машины нэр <span className="text-[#E31B23]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="жш: Toyota Camry"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-[#E31B23]/40 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/30 text-xs uppercase tracking-widest mb-1.5">
                    Он <span className="text-[#E31B23]">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="2022"
                    min="1990"
                    max="2025"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-[#E31B23]/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/30 text-xs uppercase tracking-widest mb-1.5">
                    Дугаар <span className="text-[#E31B23]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="УБ-0000АА"
                    value={form.plate}
                    onChange={(e) => setForm({ ...form, plate: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-[#E31B23]/40 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/30 text-xs uppercase tracking-widest mb-1.5">
                  Явсан км
                </label>
                <input
                  type="text"
                  placeholder="жш: 35,000"
                  value={form.mileage}
                  onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-[#E31B23]/40 transition-colors"
                />
              </div>
            </div>

            {/* Товч */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleRegister}
                disabled={!form.name || !form.year || !form.plate}
                className="flex-1 py-3 bg-[#E31B23] text-white text-sm font-semibold rounded-xl hover:bg-[#c41620] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Бүртгэх
              </button>
              <button
                onClick={() => { setShowModal(false); setForm(emptyForm); }}
                className="flex-1 py-3 border border-white/10 text-white/40 text-sm rounded-xl hover:bg-white/5 hover:text-white/60 transition-all duration-200"
              >
                Цуцлах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
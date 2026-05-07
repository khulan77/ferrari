"use client";

import Link from "next/link";
import React from "react";

// --- Types ---
type StatusType = "good" | "service_due" | "confirmed" | "pending" | "delivered" | "processing";

interface DataItem {
  id: number | string;
  status: StatusType;
}

// --- Constants & Config ---
const STATUS_CONFIG: Record<StatusType, { label: string; color: string }> = {
  good: { label: "Сайн", color: "text-emerald-400 bg-emerald-400/10" },
  service_due: { label: "Засвар хэрэгтэй", color: "text-rose-500 bg-rose-500/10" },
  confirmed: { label: "Батлагдсан", color: "text-emerald-400 bg-emerald-400/10" },
  pending: { label: "Хүлээгдэж байна", color: "text-amber-400 bg-amber-400/10" },
  delivered: { label: "Хүргэгдсэн", color: "text-emerald-400 bg-emerald-400/10" },
  processing: { label: "Боловсруулж байна", color: "text-sky-400 bg-sky-400/10" },
};

// --- Mock Data (Ideally from an API) ---
const userFleet = [
  { id: 1, name: "Toyota Camry", year: 2021, plate: "УБ-1234АА", mileage: "42,000 км", lastService: "2024.10", status: "good" as StatusType, img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400" },
  { id: 2, name: "Hyundai Tucson", year: 2020, plate: "УБ-5678ББ", mileage: "67,500 км", lastService: "2024.08", status: "service_due" as StatusType, img: "https://images.unsplash.com/photo-1633508800088-ac9bfc9c44e6?w=400" },
  { id: 3, name: "Mitsubishi Outlander", year: 2022, plate: "УБ-9012ВВ", mileage: "18,200 км", lastService: "2024.11", status: "good" as StatusType, img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400" },
];

const stats = [
  { label: "Нийт зарлага", value: "₮4,820k", sub: "нийт дүн" },
  { label: "Засвар", value: "14", sub: "удаа" },
  { label: "Сэлбэг", value: "8", sub: "энэ жил" },
  { label: "Машин", value: "3", sub: "ширхэг" },
];

// --- Sub-components ---
const SectionHeader = ({ title, linkText, href }: { title: string; linkText?: string; href?: string }) => (
  <div className="flex items-center justify-between mb-5">
    <h2 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] opacity-70">
      {title}
    </h2>
    {linkText && href && (
      <Link href={href} className="text-[#E31B23] text-[11px] font-bold hover:opacity-80 transition-opacity">
        {linkText} <span className="ml-1">→</span>
      </Link>
    )}
  </div>
);

const Badge = ({ status }: { status: StatusType }) => (
  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${STATUS_CONFIG[status].color}`}>
    {STATUS_CONFIG[status].label}
  </span>
);

export default function UserOverviewPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 lg:p-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">
            Хяналтын <span className="text-[#E31B23]">Самбар</span>
          </h1>
          <div className="h-1 w-20 bg-[#E31B23] mb-4" />
          <p className="text-white/40 text-sm font-medium">
            Сайн байна уу? Өдрийн мэнд. Таны авто паркийн өнөөдрийн төлөв.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#111] border border-white/5 p-5 rounded-2xl hover:border-white/10 transition-colors">
              <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest mb-2">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black">{stat.value}</span>
                <span className="text-[10px] text-white/20 font-medium">{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* My Fleet Section */}
            <section className="bg-[#111] border border-white/5 rounded-3xl p-6 shadow-2xl">
              <SectionHeader title="Миний машинууд" linkText="Удирдах" href="/user/profile" />
              <div className="grid gap-4">
                {userFleet.map((car) => (
                  <div key={car.id} className="group flex items-center bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-[#E31B23]/30 transition-all duration-300">
                    <div className="relative w-32 h-24 overflow-hidden">
                      <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    </div>
                    <div className="flex-1 px-5 flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-bold text-white/90 mb-1">{car.name}</h3>
                        <p className="text-[11px] text-white/40 font-mono tracking-tight">
                          {car.year} • {car.plate} • {car.mileage}
                        </p>
                      </div>
                      <Badge status={car.status} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Section */}
            <section className="bg-[#111] border border-white/5 rounded-3xl p-6">
              <SectionHeader title="Ойрын цаг товлолт" linkText="Бүгд" href="/user/appointments" />
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Ерөнхий үзлэг", date: "10.24", time: "09:00", car: "Camry" },
                  { title: "Тоормос шалгалт", date: "10.31", time: "11:00", car: "Tucson" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#0a0a0a] border border-white/5 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-[#E31B23] font-black uppercase mb-1">{item.date} @ {item.time}</p>
                      <h4 className="text-sm font-bold">{item.title}</h4>
                      <p className="text-[11px] text-white/30">{item.car}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs opacity-50">🗓</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Content (Right) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Actions */}
            <section className="bg-[#E31B23] rounded-3xl p-6 shadow-[0_0_50px_-12px_rgba(227,27,35,0.3)]">
              <h2 className="text-white font-black text-xs uppercase tracking-widest mb-6">Хурдан үйлдлүүд</h2>
              <div className="space-y-3">
                <button className="w-full bg-white text-black py-3 rounded-xl text-xs font-black uppercase tracking-tighter hover:bg-black hover:text-white transition-all duration-300">
                  + Цаг товлох
                </button>
                <button className="w-full bg-black/20 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-tighter hover:bg-black/40 transition-all border border-white/10">
                  Сэлбэг захиалах
                </button>
              </div>
            </section>

            {/* Recent Orders */}
            <section className="bg-[#111] border border-white/5 rounded-3xl p-6">
              <SectionHeader title="Сүүлийн захиалга" />
              <div className="space-y-4">
                {[
                  { item: "Mobil 1 Oil", price: "₮85k", status: "delivered" },
                  { item: "Brembo Pads", price: "₮245k", status: "processing" }
                ].map((order, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <div>
                      <p className="text-xs font-bold group-hover:text-[#E31B23] transition-colors">{order.item}</p>
                      <p className="text-[10px] text-white/30">{order.price}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${order.status === 'delivered' ? 'bg-emerald-500' : 'bg-sky-500'}`} />
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
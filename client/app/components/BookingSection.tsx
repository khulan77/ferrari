"use client";

import Link from "next/link";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";

const SLOTS = [
  { day: "Даваа, 10 сарын 14", time: "08:00 AM", available: false },
  { day: "Даваа, 10 сарын 14", time: "11:30 AM", available: true },
  { day: "Мягмар, 10 сарын 15", time: "09:00 AM", available: true },
];

const PERKS = [
  "Оношилгоо болон гүйцэтгэлийн шалгалтанд",
  "Манай төвийн ачаалал одоогоор 85%",
  "Өнөөдөр цагаа баталгаажуулна уу",
];

export default function BookingSection() {
  return (
    <section className="bg-[#080808] py-8 px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-[#F97316] rounded-3xl overflow-hidden">

          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-black/10 translate-y-1/2 -translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Left */}
            <div className="p-10 lg:p-14">
              <p className="text-black/50 text-[10px] font-black uppercase tracking-[0.3em] mb-5">
                Засварт бэлэн үү?
              </p>
              <h2
                className="text-black font-black text-[clamp(28px,4vw,44px)] leading-tight tracking-tight mb-6"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                ОНОШИЛГОО БОЛОН ГҮЙЦЭТГЭЛИЙН ШАЛГАЛТАНД ЦАГ ЗАХИАЛААРАЙ.
              </h2>

              <div className="space-y-2.5 mb-8">
                {PERKS.map((p) => (
                  <div key={p} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-black/50 mt-0.5 flex-shrink-0" />
                    <p className="text-black/60 text-sm font-medium">{p}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href="/booking"
                  className="flex items-center gap-2.5 px-7 py-3.5 bg-black text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all duration-300 group"
                >
                  Цаг захиалах
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2.5 px-7 py-3.5 border-2 border-black/20 text-black font-black text-sm uppercase tracking-widest rounded-xl hover:border-black/40 transition-all duration-300"
                >
                  Инженертэй холбогдох
                </Link>
              </div>
            </div>

            {/* Right — slots */}
            <div className="p-10 lg:p-14 lg:border-l border-black/10">
              <div className="flex items-center gap-2 mb-6">
                <Clock size={14} className="text-black/50" />
                <p className="text-black/50 text-[11px] font-black uppercase tracking-[0.25em]">
                  Сул байгаа цагууд
                </p>
              </div>

              <div className="space-y-3">
                {SLOTS.map((slot, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all ${
                      slot.available
                        ? "bg-black/10 border-black/10 hover:bg-black/15 cursor-pointer"
                        : "bg-black/5 border-black/5"
                    }`}
                  >
                    <div>
                      <p className="text-black/70 text-xs font-semibold">{slot.day}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-sm font-black uppercase tracking-widest ${
                          slot.available ? "text-emerald-800" : "text-black/40"
                        }`}
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {slot.time} — {slot.available ? "БОЛОМЖТОЙ" : "ЗАХИАЛГАТАЙ"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-black/35 text-xs mt-5">
                * Цагийг баталгаажуулахын тулд урьдчилгаа төлбөр шаардлагатай
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
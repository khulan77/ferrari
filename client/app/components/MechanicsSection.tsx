"use client";

import Link from "next/link";
import { Star, ArrowRight, Award } from "lucide-react";

const MECHANICS = [
  {
    id: 1,
    name: "Marcus Vance",
    role: "Chief of Performance",
    specialty: "Porsche / GT3 Development",
    rating: 4.98,
    jobs: 340,
    years: 12,
    initials: "MV",
    color: "from-[#F97316]/20 to-[#F97316]/5",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "Systems Integration",
    specialty: "Hybrid & Electric Powertrains",
    rating: 4.95,
    jobs: 218,
    years: 8,
    initials: "ER",
    color: "from-sky-500/20 to-sky-500/5",
  },
  {
    id: 3,
    name: "Victor Emsden",
    role: "Chassis Fabrication",
    specialty: "Structural Rigidity & Custom Alloy",
    rating: 4.92,
    jobs: 195,
    years: 10,
    initials: "VE",
    color: "from-violet-500/20 to-violet-500/5",
  },
];

export default function MechanicsSection() {
  return (
    <section className="bg-[#080808] py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#F97316] text-[11px] font-black uppercase tracking-[0.35em] mb-3">
              Мэргэжилтнүүд
            </p>
            <h2
              className="text-white font-black text-[clamp(28px,4vw,48px)] tracking-tight leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              МАНАЙ ИНЖЕНЕРҮҮД
            </h2>
          </div>
          <Link
            href="/mechanics"
            className="hidden md:flex items-center gap-2 text-white/30 text-xs font-black uppercase tracking-widest hover:text-[#F97316] transition-colors"
          >
            Бүх инженерүүдийг харах <ArrowRight size={13} />
          </Link>
        </div>

        {/* Mechanics list */}
        <div className="space-y-3">
          {MECHANICS.map((m, i) => (
            <div
              key={m.id}
              className="group flex items-center gap-5 bg-[#0f0f0f] border border-white/[0.06] rounded-2xl px-6 py-5 hover:border-white/[0.12] hover:bg-[#111] transition-all duration-300 cursor-pointer"
            >
              {/* Index */}
              <span
                className="hidden md:block text-white/[0.06] font-black text-3xl w-8 flex-shrink-0 select-none"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Avatar */}
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${m.color} border border-white/[0.08] flex items-center justify-center flex-shrink-0`}>
                <span className="text-white/60 text-sm font-black">{m.initials}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-0.5">
                  <p className="text-white font-black text-base tracking-tight">{m.name}</p>
                  {i === 0 && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-[#F97316]/10 border border-[#F97316]/15 rounded-full">
                      <Award size={9} className="text-[#F97316]" />
                      <span className="text-[#F97316] text-[9px] font-black uppercase tracking-widest">Top</span>
                    </div>
                  )}
                </div>
                <p className="text-[#F97316] text-[10px] font-black uppercase tracking-widest">{m.role}</p>
                <p className="text-white/25 text-xs mt-0.5">Чиглэл: {m.specialty}</p>
              </div>

              {/* Stats */}
              <div className="hidden md:flex items-center gap-8 flex-shrink-0">
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center mb-0.5">
                    <Star size={11} className="text-[#F97316]" fill="currentColor" />
                    <span className="text-white font-black text-sm">{m.rating}</span>
                  </div>
                  <p className="text-white/25 text-[10px]">Үнэлгээ</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-black text-sm">{m.jobs}</p>
                  <p className="text-white/25 text-[10px]">Ажил</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-black text-sm">{m.years}жил</p>
                  <p className="text-white/25 text-[10px]">Туршлага</p>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight
                size={16}
                className="text-white/15 group-hover:text-[#F97316] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
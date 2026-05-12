"use client";

import Link from "next/link";
import { ArrowUpRight, Cpu, Disc, Gauge, Shield } from "lucide-react";

const SERVICES = [
  {
    id: "01",
    icon: <Cpu size={22} className="text-[#F97316]" />,
    title: "Хөдөлгүүрийн гүйцэтгэл",
    body: "Хөдөлгүүрийн программыг шинэчилж, хамгийн их хүчийг гаргаж авах засвар үйлчилгээ.",
    link: "/services/engine",
    featured: true,
  },
  {
    id: "02",
    icon: <Disc size={22} className="text-[#F97316]" />,
    title: "Нарийвчилсан тормозны систем",
    body: "Керамик болон өндөр даралтын гидравлик системүүдийн шинэчлэлт.",
    link: "/services/brakes",
    featured: false,
  },
  {
    id: "03",
    icon: <Gauge size={22} className="text-[#F97316]" />,
    title: "Оношилгоо тестүүд",
    body: "Орчин үеийн компьютер оношилгоогоор машины бүтцийн өөрчлөлтийг хянах.",
    link: "/services/diagnostics",
    featured: false,
  },
  {
    id: "04",
    icon: <Shield size={22} className="text-[#F97316]" />,
    title: "Аналитик хяналт",
    body: "Таны автомашины ECU-г бодит цаг хугацаанд хянах систем.",
    link: "/services/analytics",
    featured: false,
    wide: true,
  },
];

export default function ServiceIntroSection() {
  return (
    <section className="bg-[#080808] py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#F97316] text-[11px] font-black uppercase tracking-[0.35em] mb-4">
            Үндсэн үйлчилгээнүүд
          </p>
          <h2
            className="text-white font-black italic text-[clamp(36px,5vw,64px)] leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Core Capabilities
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Featured large card */}
          <div className="md:row-span-2 group bg-[#0f0f0f] border border-white/[0.06] rounded-3xl p-8 flex flex-col hover:border-[#F97316]/20 transition-all duration-300 relative overflow-hidden">
            {/* Number */}
            <span
              className="absolute top-6 right-8 text-[80px] font-black leading-none text-white/[0.03] select-none pointer-events-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {SERVICES[0].id}
            </span>

            <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 border border-[#F97316]/15 flex items-center justify-center mb-auto">
              {SERVICES[0].icon}
            </div>

            <div className="mt-16">
              <h3
                className="text-white font-black text-2xl mb-3 tracking-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {SERVICES[0].title.toUpperCase()}
              </h3>
              <p className="text-white/35 text-sm leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {SERVICES[0].body}
              </p>
              <Link
                href={SERVICES[0].link}
                className="inline-flex items-center gap-2 text-[#F97316] text-xs font-black uppercase tracking-widest hover:gap-4 transition-all duration-200"
              >
                Дэлгэрэнгүй <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </div>

          {/* Regular cards */}
          {SERVICES.slice(1, 3).map((svc) => (
            <Link
              key={svc.id}
              href={svc.link}
              className="group bg-[#0f0f0f] border border-white/[0.06] rounded-3xl p-7 hover:border-[#F97316]/20 transition-all duration-300 relative overflow-hidden"
            >
              <span
                className="absolute top-4 right-6 text-[60px] font-black leading-none text-white/[0.03] select-none pointer-events-none"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {svc.id}
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 border border-[#F97316]/15 flex items-center justify-center mb-5">
                {svc.icon}
              </div>
              <h3
                className="text-white font-black text-lg mb-2 tracking-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {svc.title.toUpperCase()}
              </h3>
              <p className="text-white/30 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {svc.body}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>
          ))}

          {/* Wide bottom card */}
          <div className="md:col-span-2 group bg-[#F97316]/[0.06] border border-[#F97316]/15 rounded-3xl px-8 py-6 flex items-center gap-6 hover:bg-[#F97316]/[0.09] hover:border-[#F97316]/25 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-[#F97316]/15 border border-[#F97316]/20 flex items-center justify-center flex-shrink-0">
              {SERVICES[3].icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="text-white font-black text-lg tracking-tight mb-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {SERVICES[3].title.toUpperCase()}
              </h3>
              <p className="text-white/35 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {SERVICES[3].body}
              </p>
            </div>
            {/* Live indicator */}
            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="hidden md:block w-32 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-[#F97316] rounded-full w-3/4 animate-pulse" />
              </div>
              <div className="flex items-center gap-3">
                <Link href="/services/analytics" className="text-[#F97316] text-xs font-black uppercase tracking-widest hover:underline">
                  Мэдээлэл
                </Link>
                <Link href="/contact" className="text-white/40 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                  Хэвийн
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import {
  ChevronRight, CheckCircle2, Star, ArrowLeft, CreditCard,
  CalendarDays, Info, X, Clock, Droplets, Filter, Disc3,
  Gauge, Wrench, Zap, Car,
} from "lucide-react";

// ─── Types & Data ─────────────────────────────────────────────────────────────

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  icon: React.ReactNode;
  popular?: boolean;
  category: string;
}

const SERVICES: Service[] = [
  { id: "oil",        name: "Тос солих",                description: "Бүрэн синтетик болон хагас синтетик тос солих",              price: 85000,  duration: 45, icon: <Droplets size={18} />, popular: true,  category: "Тос" },
  { id: "brake",      name: "Тоормосны бүрхэвч",        description: "Тоормосны бүрхэвч болон диск шалгах, солих",                price: 245000, duration: 90, icon: <Disc3 size={18} />,    category: "Тоормос" },
  { id: "filter",     name: "Агаарын шүүлтүүр",         description: "Агаарын болон дотоод агааржуулагчийн шүүлтүүр солих",       price: 38000,  duration: 20, icon: <Filter size={18} />,   category: "Шүүлтүүр" },
  { id: "diag",       name: "Хөдөлгүүрийн оношилгоо",   description: "OBD-II оношилгоо болон алдааны кодын шинжилгээ",           price: 38000,  duration: 30, icon: <Gauge size={18} />,    category: "Оношилгоо" },
  { id: "tire",       name: "Дугуй эргүүлэх",           description: "Дугуй эргүүлэх болон тэнцвэржүүлэх",                      price: 45000,  duration: 45, icon: <Car size={18} />,      category: "Дугуй" },
  { id: "inspection", name: "Ерөнхий үзлэг",            description: "50 цэгийн иж бүрэн үзлэг болон тайлан",                   price: 65000,  duration: 60, icon: <Wrench size={18} />,   category: "Үзлэг" },
  { id: "spark",      name: "Свеч солих",                description: "Иридиум болон платин свеч солих",                          price: 120000, duration: 60, icon: <Zap size={18} />,      category: "Хөдөлгүүр" },
];

const CATS = ["Бүгд", "Тос", "Тоормос", "Шүүлтүүр", "Оношилгоо", "Дугуй", "Үзлэг", "Хөдөлгүүр"];

const MECHANICS = [
  { id: "m1", name: "Б. Дорж",  avatar: "Д", speciality: "Хөдөлгүүр, Тос",           rating: 4.9, reviews: 142, available: true,  slots: ["10:00","10:30","11:00","13:00","14:30","15:30"] },
  { id: "m2", name: "Г. Мөнх",  avatar: "М", speciality: "Тоормос, Дугуй",            rating: 4.7, reviews: 98,  available: true,  slots: ["09:30","10:00","11:30","13:30","16:00"] },
  { id: "m3", name: "О. Батаа", avatar: "Б", speciality: "Оношилгоо, Цахилгаан",      rating: 4.8, reviews: 211, available: false, slots: [] },
];

const ALL_SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:30","16:00"];

const DATES = [
  { label: "Өнөөдөр", date: "05/07", day: "Лха" },
  { label: "Маргааш", date: "05/08", day: "Баасан" },
  { label: "", date: "05/09", day: "Бямба" },
  { label: "", date: "05/10", day: "Ням" },
  { label: "", date: "05/12", day: "Даваа" },
  { label: "", date: "05/13", day: "Мягмар" },
  { label: "", date: "05/14", day: "Лха" },
];

const fmt = (n: number) => n.toLocaleString("mn-MN");

// ─── Booking Modal ────────────────────────────────────────────────────────────

function BookingModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const [step, setStep] = useState<2 | 3 | 4 | 5>(2); // step1 = service (already chosen)
  const [dateIdx, setDateIdx] = useState(0);
  const [mechanic, setMechanic] = useState<(typeof MECHANICS)[0] | null>(null);
  const [slot, setSlot] = useState("");
  const [payMethod, setPayMethod] = useState<"qpay" | "socialpay" | "card">("qpay");
  const [done, setDone] = useState(false);
  const deposit = Math.round(service.price * 0.3);
  const orderId = "ЗАХ-" + Math.floor(2400 + Math.random() * 999);

  const stepLabels = ["Огноо", "Механик", "Цаг", "Төлбөр"];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative z-10 w-full sm:w-[460px] bg-[#0d0d0d] border border-white/[0.08] sm:rounded-2xl rounded-t-2xl flex flex-col shadow-2xl"
        style={{ height: "min(92vh, 740px)" }}
      >
        {/* Top bar */}
        <div className="flex-none px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-1">
            {stepLabels.map((label, i) => {
              const s = i + 2;
              const active = s === step;
              const passed = s < step;
              return (
                <div key={i} className="flex items-center gap-1">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-black transition-all ${
                    passed ? "bg-[#E31B23] border-[#E31B23] text-white"
                    : active ? "border-[#E31B23] text-[#E31B23]"
                    : "border-white/10 text-white/15"
                  }`}>
                    {passed ? "✓" : i + 1}
                  </div>
                  <span className={`text-[9px] font-medium hidden sm:block mr-1 ${active ? "text-white/50" : "text-white/15"}`}>{label}</span>
                  {i < stepLabels.length - 1 && <div className={`w-3 h-px mr-1 ${passed ? "bg-[#E31B23]/40" : "bg-white/[0.06]"}`} />}
                </div>
              );
            })}
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/[0.05] hover:bg-white/10 flex items-center justify-center text-white/25 hover:text-white transition-all">
            <X size={13} />
          </button>
        </div>

        {/* Service summary strip */}
        <div className="flex-none flex items-center gap-3 px-5 py-3 border-b border-white/[0.04] bg-white/[0.01]">
          <div className="w-7 h-7 rounded-lg bg-[#E31B23]/15 text-[#E31B23] flex items-center justify-center flex-shrink-0">
            {service.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{service.name}</p>
            <p className="text-white/25 text-[10px]">₮{fmt(service.price)} · {service.duration} мин</p>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-5">

          {/* ── DONE ── */}
          {done && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-5 py-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-emerald-900/20 border border-emerald-600/20 flex items-center justify-center">
                  <CheckCircle2 size={36} className="text-emerald-400" />
                </div>
                <div className="absolute inset-0 rounded-full bg-emerald-400/5 animate-ping" />
              </div>
              <div>
                <div className="w-5 h-0.5 bg-emerald-400 mx-auto mb-2" />
                <h2 className="text-white font-black text-xl">Баталгаажлаа!</h2>
                <p className="text-white/30 text-sm mt-1">Захиалга амжилттай бүртгэгдлээ</p>
              </div>
              <div className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-left space-y-2">
                {[
                  ["Дугаар", orderId],
                  ["Үйлчилгээ", service.name],
                  ["Огноо · Цаг", `${DATES[dateIdx].date} · ${slot}`],
                  ["Механик", mechanic?.name ?? ""],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-white/30">{k}</span>
                    <span className={k === "Дугаар" ? "text-[#E31B23] font-bold" : "text-white font-medium"}>{v}</span>
                  </div>
                ))}
                <div className="border-t border-white/[0.06] pt-2 flex justify-between items-center">
                  <span className="text-white/30 text-sm">Урьдчилгаа</span>
                  <span className="text-emerald-400 font-semibold text-sm flex items-center gap-1"><CheckCircle2 size={11} /> Төлөгдсөн</span>
                </div>
              </div>
              <div className="bg-amber-950/20 border border-amber-800/20 rounded-xl p-3.5 w-full">
                <p className="text-amber-300/70 text-xs">📍 Цагаасаа <strong className="text-amber-300">15 минут өмнө</strong> ирнэ үү</p>
              </div>
              <button onClick={onClose} className="w-full py-3 bg-[#E31B23] text-white rounded-xl text-sm font-bold hover:bg-[#c41620] transition-all">
                Дуусгах
              </button>
            </div>
          )}

          {/* ── STEP 2: ОГНОО ── */}
          {!done && step === 2 && (
            <div className="space-y-5">
              <div>
                <div className="w-5 h-0.5 bg-[#E31B23] mb-2" />
                <h2 className="text-white font-black text-xl tracking-tight">Огноо сонгох</h2>
                <p className="text-white/30 text-xs mt-0.5">Хэдэн дор очих вэ?</p>
              </div>

              <div className="bg-amber-950/20 border border-amber-800/20 rounded-xl p-3 flex items-start gap-2">
                <Info size={11} className="text-amber-400/80 mt-0.5 flex-shrink-0" />
                <p className="text-amber-300/70 text-xs leading-relaxed">
                  Цаг захиалснаар хүлээхгүй шууд үйлчлүүлэх боломжтой. Хүлээлт <strong className="text-amber-300">30–40 мин</strong>.
                </p>
              </div>

              {/* 7 хоногийн grid */}
              <div>
                <p className="text-white/25 text-[10px] uppercase tracking-widest mb-3">Долоо хоног</p>
                <div className="grid grid-cols-7 gap-1.5">
                  {DATES.map((d, i) => (
                    <button key={i} onClick={() => setDateIdx(i)}
                      className={`flex flex-col items-center py-3 rounded-xl border transition-all ${
                        dateIdx === i
                          ? "bg-[#E31B23] border-[#E31B23] text-white shadow-lg shadow-[#E31B23]/25"
                          : "border-white/[0.07] text-white/30 hover:border-white/18 hover:text-white/60"
                      }`}>
                      <span className="text-[8px] font-bold uppercase tracking-wide mb-1 opacity-70">{d.day.slice(0,2)}</span>
                      <span className="text-sm font-black">{d.date.split("/")[1]}</span>
                    </button>
                  ))}
                </div>

                {/* Сонгосон огноо */}
                <div className="mt-3 flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                  <CalendarDays size={13} className="text-[#E31B23]" />
                  <span className="text-white/60 text-sm">
                    {DATES[dateIdx].label ? `${DATES[dateIdx].label}, ` : `${DATES[dateIdx].day}, `}{DATES[dateIdx].date} — 2025
                  </span>
                </div>
              </div>

              <button onClick={() => setStep(3)}
                className="w-full py-3.5 bg-[#E31B23] text-white rounded-xl font-bold text-sm hover:bg-[#c41620] transition-all shadow-lg shadow-[#E31B23]/20 flex items-center justify-center gap-2">
                Механик сонгох <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── STEP 3: МЕХАНИК ── */}
          {!done && step === 3 && (
            <div className="space-y-5">
              <div>
                <button onClick={() => setStep(2)} className="flex items-center gap-1 text-white/25 hover:text-white/60 text-xs mb-3 transition-colors">
                  <ArrowLeft size={11} /> Буцах
                </button>
                <div className="w-5 h-0.5 bg-[#E31B23] mb-2" />
                <h2 className="text-white font-black text-xl tracking-tight">Механик сонгох</h2>
                <p className="text-white/30 text-xs mt-0.5">
                  {DATES[dateIdx].label || DATES[dateIdx].day}, {DATES[dateIdx].date} — боломжтой механикууд
                </p>
              </div>

              <div className="space-y-2.5">
                {MECHANICS.map((m) => (
                  <button key={m.id} onClick={() => m.available && setMechanic(m)} disabled={!m.available}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                      !m.available ? "border-white/[0.03] opacity-25 cursor-not-allowed"
                      : mechanic?.id === m.id ? "border-[#E31B23]/35 bg-[#E31B23]/[0.06] shadow-md shadow-[#E31B23]/10"
                      : "border-white/[0.06] hover:border-white/14 hover:bg-white/[0.02]"
                    }`}>
                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-black flex-shrink-0 transition-all ${
                      mechanic?.id === m.id ? "bg-[#E31B23] text-white" : "bg-white/[0.07] text-white/40"
                    }`}>
                      {m.avatar}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm">{m.name}</p>
                      <p className="text-white/30 text-xs mt-0.5">{m.speciality}</p>
                      {m.available && (
                        <p className="text-white/20 text-xs mt-1 flex items-center gap-1">
                          <Clock size={9} /> {m.slots.length} цаг боломжтой
                        </p>
                      )}
                      {!m.available && (
                        <p className="text-white/20 text-xs mt-1">Өнөөдөр завгүй</p>
                      )}
                    </div>
                    {/* Rating */}
                    <div className="flex-shrink-0 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Star size={11} className="text-amber-400" fill="currentColor" />
                        <span className="text-white/70 text-xs font-bold">{m.rating}</span>
                      </div>
                      <p className="text-white/20 text-[10px] mt-0.5">{m.reviews} үнэлгээ</p>
                    </div>
                  </button>
                ))}
              </div>

              <button onClick={() => setStep(4)} disabled={!mechanic}
                className="w-full py-3.5 bg-[#E31B23] text-white rounded-xl font-bold text-sm disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#c41620] transition-all shadow-lg shadow-[#E31B23]/20 flex items-center justify-center gap-2">
                Цаг харах <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── STEP 4: ЦАГ ── */}
          {!done && step === 4 && mechanic && (
            <div className="space-y-5">
              <div>
                <button onClick={() => setStep(3)} className="flex items-center gap-1 text-white/25 hover:text-white/60 text-xs mb-3 transition-colors">
                  <ArrowLeft size={11} /> Буцах
                </button>
                <div className="w-5 h-0.5 bg-[#E31B23] mb-2" />
                <h2 className="text-white font-black text-xl tracking-tight">Цаг сонгох</h2>
                <p className="text-white/30 text-xs mt-0.5">{mechanic.name}-ийн боломжит цагууд</p>
              </div>

              {/* Механикийн мэдээлэл */}
              <div className="flex items-center gap-3 p-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#E31B23] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                  {mechanic.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">{mechanic.name}</p>
                  <p className="text-white/30 text-xs">{mechanic.speciality}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={11} className="text-amber-400" fill="currentColor" />
                  <span className="text-white/70 text-xs font-bold">{mechanic.rating}</span>
                </div>
              </div>

              {/* Огноо reminder */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/[0.04] rounded-lg">
                <CalendarDays size={12} className="text-[#E31B23]" />
                <span className="text-white/40 text-xs">{DATES[dateIdx].label || DATES[dateIdx].day}, {DATES[dateIdx].date}</span>
                <button onClick={() => setStep(2)} className="ml-auto text-[#E31B23] text-[10px] hover:underline">Өөрчлөх</button>
              </div>

              {/* Цагийн grid — механикийн slot-ууд гарна, бусад нь бүдэг */}
              <div>
                <p className="text-white/25 text-[10px] uppercase tracking-widest mb-2.5">
                  {mechanic.slots.length} цаг боломжтой
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {ALL_SLOTS.map((t) => {
                    const avail = mechanic.slots.includes(t);
                    const selected = slot === t;
                    return (
                      <button key={t} onClick={() => avail && setSlot(t)} disabled={!avail}
                        className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          !avail ? "border-white/[0.03] text-white/10 cursor-not-allowed bg-white/[0.01]"
                          : selected ? "border-[#E31B23] bg-[#E31B23] text-white shadow-lg shadow-[#E31B23]/25"
                          : "border-white/[0.08] text-white/50 hover:border-white/20 hover:text-white"
                        }`}>
                        {t}
                      </button>
                    );
                  })}
                </div>
                <p className="text-white/15 text-[10px] mt-2.5 text-center">Бүдэг цагууд захиалагдсан</p>
              </div>

              {/* Хураангуй */}
              {slot && (
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-2">
                  <p className="text-white/25 text-[10px] uppercase tracking-widest mb-2">Захиалгын хураангуй</p>
                  {[
                    ["Үйлчилгээ", service.name],
                    ["Огноо", `${DATES[dateIdx].label || DATES[dateIdx].day}, ${DATES[dateIdx].date}`],
                    ["Механик", mechanic.name],
                    ["Цаг", slot],
                    ["Нийт", `₮${fmt(service.price)}`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="text-white/30">{k}</span>
                      <span className="text-white font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              )}

              <button onClick={() => setStep(5 as 5)} disabled={!slot}
                className="w-full py-3.5 bg-[#E31B23] text-white rounded-xl font-bold text-sm disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#c41620] transition-all shadow-lg shadow-[#E31B23]/20 flex items-center justify-center gap-2">
                Төлбөр руу <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── STEP 5: ТӨЛБӨР ── */}
          {!done && step === (5 as 5) && mechanic && slot && (
            <div className="space-y-5">
              <div>
                <button onClick={() => setStep(4)} className="flex items-center gap-1 text-white/25 hover:text-white/60 text-xs mb-3 transition-colors">
                  <ArrowLeft size={11} /> Буцах
                </button>
                <div className="w-5 h-0.5 bg-[#E31B23] mb-2" />
                <h2 className="text-white font-black text-xl tracking-tight">Урьдчилгаа</h2>
                <p className="text-white/30 text-xs mt-0.5">Захиалгаа баталгаажуулах 30% урьдчилгаа</p>
              </div>

              {/* Summary */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-2">
                {[
                  ["Үйлчилгээ", service.name],
                  ["Цаг", `${DATES[dateIdx].date} · ${slot}`],
                  ["Механик", mechanic.name],
                  ["Нийт", `₮${fmt(service.price)}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-white/30">{k}</span>
                    <span className="text-white/70 font-medium">{v}</span>
                  </div>
                ))}
                <div className="border-t border-white/[0.06] pt-2 flex justify-between items-center">
                  <span className="text-[#E31B23] text-sm font-bold">Урьдчилгаа (30%)</span>
                  <span className="text-[#E31B23] text-2xl font-black">₮{fmt(deposit)}</span>
                </div>
              </div>

              {/* Payment method */}
              <div>
                <p className="text-white/25 text-[10px] uppercase tracking-widest mb-2.5">Төлбөрийн хэрэгсэл</p>
                <div className="grid grid-cols-3 gap-2">
                  {(["qpay", "socialpay", "card"] as const).map((m) => (
                    <button key={m} onClick={() => setPayMethod(m)}
                      className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                        payMethod === m
                          ? "border-[#E31B23] bg-[#E31B23]/10 text-white"
                          : "border-white/[0.08] text-white/30 hover:border-white/20 hover:text-white/60"
                      }`}>
                      {m === "qpay" ? "QPay" : m === "socialpay" ? "SocialPay" : "Карт"}
                    </button>
                  ))}
                </div>
              </div>

              {payMethod === "qpay" && (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-36 h-36 bg-white rounded-2xl flex items-center justify-center p-3 shadow-xl">
                    <div className="w-full h-full grid grid-cols-9 gap-px">
                      {Array.from({ length: 81 }).map((_, i) => (
                        <div key={i} className={`${Math.random() > 0.5 ? "bg-black" : "bg-white"} rounded-sm`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/25 text-xs">QPay апп-аар уншуулна уу</p>
                  <p className="text-white font-black text-2xl">₮{fmt(deposit)}</p>
                </div>
              )}
              {payMethod === "card" && (
                <div className="space-y-2.5">
                  <div className="relative">
                    <CreditCard size={13} className="absolute left-3.5 top-3 text-white/20" />
                    <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-white/15 focus:outline-none focus:border-white/20 transition-colors" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/15 focus:outline-none focus:border-white/20 transition-colors" placeholder="MM / YY" />
                    <input className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/15 focus:outline-none focus:border-white/20 transition-colors" placeholder="CVV" />
                  </div>
                </div>
              )}
              {payMethod === "socialpay" && (
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center">
                  <p className="text-white/30 text-sm">SocialPay апп руу шилжүүлэх...</p>
                  <p className="text-white font-black text-2xl mt-2">₮{fmt(deposit)}</p>
                </div>
              )}

              <button onClick={() => setDone(true)}
                className="w-full py-3.5 bg-[#E31B23] text-white rounded-xl font-bold text-sm hover:bg-[#c41620] transition-all shadow-lg shadow-[#E31B23]/20 flex items-center justify-center gap-2">
                <CreditCard size={15} /> ₮{fmt(deposit)} төлөх
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [cat, setCat] = useState("Бүгд");
  const [selected, setSelected] = useState<Service | null>(null);

  const filtered = cat === "Бүгд" ? SERVICES : SERVICES.filter((s) => s.category === cat);

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      {selected && <BookingModal service={selected} onClose={() => setSelected(null)} />}

      <div className="max-w-5xl mx-auto">

        {/* Гарчиг */}
        <div className="mb-10">
          <div className="w-8 h-0.5 bg-[#E31B23] mb-3" />
          <h1 className="text-white font-black text-4xl tracking-tight">Үйлчилгээнүүд</h1>
          <p className="text-white/30 text-sm mt-1.5 font-light">
            Мэргэжлийн механикуудын үзүүлэх бүх үйлчилгээ
          </p>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-7">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all tracking-wide ${
                cat === c
                  ? "bg-[#E31B23] text-white shadow-lg shadow-[#E31B23]/20"
                  : "bg-[#0f0f0f] border border-white/[0.07] text-white/35 hover:text-white/70 hover:border-white/15"
              }`}>
              {c}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((svc) => (
            <div key={svc.id}
              className="group bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-5 flex flex-col hover:border-white/12 transition-all duration-200">

              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#E31B23]/10 text-[#E31B23] flex items-center justify-center flex-shrink-0">
                  {svc.icon}
                </div>
                {svc.popular && (
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#E31B23]/10 text-[#E31B23] border border-[#E31B23]/20">
                    Эрэлттэй
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-white font-bold text-[15px] leading-snug">{svc.name}</p>
                <p className="text-white/30 text-xs mt-1.5 leading-relaxed">{svc.description}</p>
              </div>

              {/* Duration + price */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.05]">
                <div>
                  <p className="text-white font-black text-xl">₮{fmt(svc.price)}</p>
                  <p className="text-white/25 text-xs mt-0.5 flex items-center gap-1">
                    <Clock size={9} /> {svc.duration} мин
                  </p>
                </div>
                <button
                  onClick={() => setSelected(svc)}
                  className="px-4 py-2 bg-[#E31B23] text-white text-xs font-bold rounded-xl hover:bg-[#c41620] transition-all shadow-md shadow-[#E31B23]/20"
                >
                  Цаг товлох
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
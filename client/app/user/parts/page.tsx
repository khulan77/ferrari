"use client";

import { useState } from "react";
import {
  ChevronRight,
  X,
  ShoppingCart,
  CheckCircle2,
  Star,
  ArrowLeft,
  CalendarDays,
  CreditCard,
  Info,
  Package,
  Search,
  Clock,
} from "lucide-react";

type Part = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: string;
  priceNum: number;
  compatibility: string[];
  inStock: boolean;
  badge?: string;
};

interface TimeSlot {
  time: string;
  available: boolean;
  waitMins: number;
}

interface Mechanic {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  speciality: string;
  available: boolean;
  avatar: string;
  // per-date slots: dateIdx → TimeSlot[]
  slots: Record<number, TimeSlot[]>;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const categories = ["Бүгд", "Хөдөлгүүр", "Тоормос", "Түдгэлзүүр", "Дугуй", "Цахилгаан"];

const parts: Part[] = [
  { id: 1, name: "Бүрэн нийлэг тосны иж бүрдэл", brand: "Mobil 1 Full Synthetic", category: "Хөдөлгүүр", price: "₮85,000", priceNum: 85000, compatibility: ["Toyota Camry", "Hyundai Tucson"], inStock: true, badge: "Эрэлттэй" },
  { id: 2, name: "Агаарын шүүлтүүр", brand: "Mann Filter", category: "Хөдөлгүүр", price: "₮38,000", priceNum: 38000, compatibility: ["Toyota Camry", "Mitsubishi Outlander"], inStock: true },
  { id: 3, name: "Хөдөлгүүрийн гэрэл дамжуулагч", brand: "NGK", category: "Хөдөлгүүр", price: "₮62,000", priceNum: 62000, compatibility: ["Hyundai Tucson", "Toyota Camry"], inStock: true, badge: "Шинэ" },
  { id: 4, name: "Тоормосны бүрхэвч — урд", brand: "Brembo", category: "Тоормос", price: "₮145,000", priceNum: 145000, compatibility: ["Toyota Camry", "Hyundai Tucson"], inStock: true, badge: "Чанарын" },
  { id: 5, name: "Тоормосны диск — арын", brand: "Brembo", category: "Тоормос", price: "₮198,000", priceNum: 198000, compatibility: ["Mitsubishi Outlander"], inStock: false },
  { id: 6, name: "Түдгэлзүүрийн тулгуур", brand: "KYB Excel-G", category: "Түдгэлзүүр", price: "₮320,000", priceNum: 320000, compatibility: ["Hyundai Tucson", "Mitsubishi Outlander"], inStock: true },
  { id: 7, name: "Michelin Primacy 4 — 205/55R16", brand: "Michelin", category: "Дугуй", price: "₮285,000", priceNum: 285000, compatibility: ["Toyota Camry", "Hyundai Tucson"], inStock: true, badge: "Эрэлттэй" },
  { id: 8, name: "Аккумлятор 60Ah", brand: "Bosch Silver", category: "Цахилгаан", price: "₮195,000", priceNum: 195000, compatibility: ["Toyota Camry", "Hyundai Tucson", "Mitsubishi Outlander"], inStock: true },
  { id: 9, name: "Хөргөлтийн шингэн 5L", brand: "Toyota Genuine", category: "Хөдөлгүүр", price: "₮45,000", priceNum: 45000, compatibility: ["Toyota Camry"], inStock: true },
  { id: 10, name: "Жолооны хүч дамжуулах бүс", brand: "Gates", category: "Хөдөлгүүр", price: "₮78,000", priceNum: 78000, compatibility: ["Hyundai Tucson", "Mitsubishi Outlander"], inStock: false },
];

const DATES = [
  { label: "Өнөөдөр", date: "05/11", day: "Даваа" },
  { label: "Маргааш", date: "05/12", day: "Мягмар" },
  { label: "", date: "05/13", day: "Лхагва" },
  { label: "", date: "05/14", day: "Пүрэв" },
  { label: "", date: "05/15", day: "Баасан" },
  { label: "", date: "05/17", day: "Даваа" },
];

const MECHANICS: Mechanic[] = [
  {
    id: "m1", name: "Б. Дорж", rating: 4.9, reviews: 142,
    speciality: "Хөдөлгүүр · Тос солих", available: true, avatar: "Д",
    slots: {
      0: [
        { time: "10:00", available: true, waitMins: 0 },
        { time: "11:00", available: false, waitMins: 0 },
        { time: "13:00", available: true, waitMins: 0 },
        { time: "14:00", available: true, waitMins: 0 },
        { time: "15:30", available: false, waitMins: 0 },
        { time: "16:00", available: true, waitMins: 0 },
      ],
      1: [
        { time: "09:00", available: true, waitMins: 0 },
        { time: "10:30", available: true, waitMins: 0 },
        { time: "11:00", available: false, waitMins: 0 },
        { time: "14:00", available: true, waitMins: 0 },
        { time: "15:00", available: true, waitMins: 0 },
      ],
      2: [
        { time: "09:30", available: true, waitMins: 0 },
        { time: "11:00", available: true, waitMins: 0 },
        { time: "13:30", available: false, waitMins: 0 },
        { time: "14:30", available: true, waitMins: 0 },
      ],
      3: [
        { time: "10:00", available: false, waitMins: 0 },
        { time: "11:30", available: true, waitMins: 0 },
        { time: "13:00", available: true, waitMins: 0 },
        { time: "15:00", available: false, waitMins: 0 },
        { time: "16:00", available: true, waitMins: 0 },
      ],
      4: [
        { time: "09:00", available: true, waitMins: 0 },
        { time: "10:00", available: true, waitMins: 0 },
        { time: "13:00", available: true, waitMins: 0 },
        { time: "14:30", available: false, waitMins: 0 },
        { time: "16:00", available: true, waitMins: 0 },
      ],
      5: [
        { time: "10:30", available: true, waitMins: 0 },
        { time: "13:00", available: true, waitMins: 0 },
        { time: "15:00", available: true, waitMins: 0 },
      ],
    },
  },
  {
    id: "m2", name: "Г. Мөнх", rating: 4.7, reviews: 98,
    speciality: "Тоормос · Дугуй", available: true, avatar: "М",
    slots: {
      0: [
        { time: "09:00", available: false, waitMins: 0 },
        { time: "10:30", available: true, waitMins: 0 },
        { time: "12:00", available: false, waitMins: 0 },
        { time: "13:30", available: true, waitMins: 0 },
        { time: "15:00", available: true, waitMins: 0 },
      ],
      1: [
        { time: "09:30", available: true, waitMins: 0 },
        { time: "11:00", available: true, waitMins: 0 },
        { time: "14:00", available: false, waitMins: 0 },
        { time: "15:30", available: true, waitMins: 0 },
        { time: "16:00", available: false, waitMins: 0 },
      ],
      2: [
        { time: "10:00", available: true, waitMins: 0 },
        { time: "11:30", available: false, waitMins: 0 },
        { time: "13:00", available: true, waitMins: 0 },
        { time: "14:30", available: true, waitMins: 0 },
        { time: "16:00", available: true, waitMins: 0 },
      ],
      3: [],
      4: [
        { time: "09:00", available: true, waitMins: 0 },
        { time: "11:00", available: false, waitMins: 0 },
        { time: "13:30", available: true, waitMins: 0 },
        { time: "15:00", available: true, waitMins: 0 },
      ],
      5: [
        { time: "10:00", available: true, waitMins: 0 },
        { time: "14:00", available: true, waitMins: 0 },
        { time: "15:30", available: false, waitMins: 0 },
      ],
    },
  },
  {
    id: "m3", name: "О. Батаа", rating: 4.8, reviews: 211,
    speciality: "Оношилгоо · Цахилгаан", available: false, avatar: "Б",
    slots: {},
  },
];

const badgeStyle: Record<string, string> = {
  Эрэлттэй: "bg-[#E31B23]/10 text-[#E31B23] border border-[#E31B23]/20",
  Шинэ: "bg-sky-400/10 text-sky-400 border border-sky-400/20",
  Чанарын: "bg-amber-400/10 text-amber-400 border border-amber-400/20",
};

const fmt = (n: number) => n.toLocaleString("mn-MN");

// ─── Checkout overlay ─────────────────────────────────────────────────────────

function CheckoutOverlay({ cart, onClose }: { cart: number[]; onClose: () => void }) {
  const cartParts = parts.filter((p) => cart.includes(p.id));
  const cartTotal = cartParts.reduce((s, p) => s + p.priceNum, 0);
  const deposit = Math.round(cartTotal * 0.3);

  const [step, setStep] = useState<2 | 3 | 4>(2);
  const [dateIdx, setDateIdx] = useState(0);
  const [mechanic, setMechanic] = useState<Mechanic | null>(null);
  const [slot, setSlot] = useState<TimeSlot | null>(null);
  const [payMethod, setPayMethod] = useState<"qpay" | "socialpay" | "card">("qpay");
  const [orderId] = useState("ЗАХ-" + Math.floor(2400 + Math.random() * 100));

  // When mechanic or date changes, reset slot
  const selectMechanic = (m: Mechanic) => {
    setMechanic(m);
    setSlot(null);
  };
  const selectDate = (i: number) => {
    setDateIdx(i);
    setSlot(null);
  };

  const currentSlots = mechanic ? (mechanic.slots[dateIdx] ?? []) : [];
  const availableCount = currentSlots.filter(s => s.available).length;

  const stepLabel: Record<number, string> = { 2: "Цаг захиалах", 3: "Урьдчилгаа", 4: "Баталгааж." };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative z-10 w-full sm:w-[460px] bg-[#0d0d0d] border border-white/[0.08] sm:rounded-2xl rounded-t-2xl flex flex-col shadow-2xl"
        style={{ height: "min(92vh, 760px)" }}
      >
        {/* Top bar */}
        <div className="flex-none px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {[2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all ${
                  s < step ? "bg-[#E31B23] border-[#E31B23] text-white"
                  : s === step ? "border-[#E31B23] text-[#E31B23]"
                  : "border-white/10 text-white/20"
                }`}>
                  {s < step ? "✓" : s - 1}
                </div>
                <span className={`text-[10px] font-medium hidden sm:block ${s === step ? "text-white/50" : "text-white/15"}`}>
                  {stepLabel[s]}
                </span>
                {s < 4 && <div className={`w-5 h-px ${s < step ? "bg-[#E31B23]/50" : "bg-white/8"}`} />}
              </div>
            ))}
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all">
            <X size={13} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">

          {/* ── STEP 2: Огноо → Механик → Цаг ── */}
          {step === 2 && (
            <div className="p-5 space-y-6">
              <div>
                <button onClick={onClose} className="flex items-center gap-1 text-white/25 hover:text-white/60 text-xs mb-4 transition-colors">
                  <ArrowLeft size={11} /> Буцах
                </button>
                <div className="w-5 h-0.5 bg-[#E31B23] mb-2" />
                <h2 className="text-white font-black text-xl tracking-tight">Цаг Захиалах</h2>
                <p className="text-white/30 text-xs mt-0.5">Механик сонгоод, цагаа тогтооно уу</p>
              </div>

              {/* Cart summary */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                <p className="text-white/25 text-[10px] uppercase tracking-widest flex items-center gap-1.5 mb-3">
                  <Package size={9} /> Сагсны бараанууд
                </p>
                <div className="space-y-1.5">
                  {cartParts.map((p) => (
                    <div key={p.id} className="flex justify-between items-center">
                      <span className="text-white/50 text-sm truncate mr-2">{p.name}</span>
                      <span className="text-white/35 text-sm flex-shrink-0">{p.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/[0.06] mt-3 pt-3 flex justify-between">
                  <span className="text-white/30 text-sm">Нийт</span>
                  <span className="text-white font-bold">₮{fmt(cartTotal)}</span>
                </div>
              </div>

              {/* ── 1. Огноо сонгох ── */}
              <div>
                <p className="text-white/25 text-[10px] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#E31B23] text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">1</span>
                  Огноо сонгох
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {DATES.map((d, i) => (
                    <button key={i} onClick={() => selectDate(i)}
                      className={`flex flex-col items-center px-3.5 py-2.5 rounded-xl border min-w-[60px] transition-all text-xs flex-shrink-0 ${
                        dateIdx === i
                          ? "bg-[#E31B23] border-[#E31B23] text-white shadow-lg shadow-[#E31B23]/20"
                          : "border-white/[0.08] text-white/35 hover:border-white/20"
                      }`}>
                      {d.label && <span className="text-[8px] font-black uppercase mb-0.5 tracking-widest">{d.label}</span>}
                      <span className="font-bold text-sm">{d.date}</span>
                      <span className="opacity-50 text-[10px] mt-0.5">{d.day}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── 2. Механик сонгох ── */}
              <div>
                <p className="text-white/25 text-[10px] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#E31B23] text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">2</span>
                  Механик сонгох
                </p>
                <div className="space-y-2">
                  {MECHANICS.map((m) => {
                    const mSlots = m.slots[dateIdx] ?? [];
                    const freeCount = mSlots.filter(s => s.available).length;
                    const isSelected = mechanic?.id === m.id;

                    return (
                      <button key={m.id}
                        onClick={() => m.available && selectMechanic(m)}
                        disabled={!m.available}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${
                          !m.available
                            ? "border-white/[0.03] opacity-25 cursor-not-allowed"
                            : isSelected
                            ? "border-[#E31B23]/40 bg-[#E31B23]/[0.06]"
                            : "border-white/[0.06] hover:border-white/15 hover:bg-white/[0.02]"
                        }`}>

                        {/* Avatar */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 transition-all ${
                          isSelected ? "bg-[#E31B23] text-white" : "bg-white/[0.06] text-white/40"
                        }`}>
                          {m.avatar}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-white text-sm font-semibold">{m.name}</p>
                            {isSelected && <span className="text-[9px] bg-[#E31B23]/20 text-[#E31B23] px-1.5 py-0.5 rounded-full font-bold">Сонгосон</span>}
                          </div>
                          <p className="text-white/25 text-xs mt-0.5">{m.speciality}</p>
                        </div>

                        {/* Right: rating + free slots */}
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <div className="flex items-center gap-1">
                            <Star size={10} className="text-amber-400" fill="currentColor" />
                            <span className="text-white/60 text-xs font-bold">{m.rating}</span>
                          </div>
                          {m.available && (
                            <span className={`text-[10px] font-semibold ${freeCount > 0 ? "text-emerald-400/70" : "text-white/20"}`}>
                              {freeCount > 0 ? `${freeCount} цаг` : "Цаг дүүрэн"}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── 3. Цаг сонгох — гарч ирнэ ── */}
              {mechanic && (
                <div>
                  <p className="text-white/25 text-[10px] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#E31B23] text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">3</span>
                    {mechanic.name}-ийн сул цагнууд
                  </p>

                  {currentSlots.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-6 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                      <Clock size={20} className="text-white/15" />
                      <p className="text-white/20 text-xs">Энэ өдөр цаг байхгүй байна</p>
                      <p className="text-white/15 text-[10px]">Өөр огноо сонгоно уу</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {currentSlots.map((s) => (
                        <button key={s.time}
                          onClick={() => s.available && setSlot(s)}
                          disabled={!s.available}
                          className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                            !s.available
                              ? "border-white/[0.04] text-white/12 cursor-not-allowed line-through"
                              : slot?.time === s.time
                              ? "border-[#E31B23] bg-[#E31B23] text-white shadow-lg shadow-[#E31B23]/20"
                              : "border-white/[0.08] text-white/50 hover:border-white/20 hover:text-white hover:bg-white/[0.03]"
                          }`}>
                          {s.time}
                          {!s.available && (
                            <span className="block text-[8px] text-white/20 mt-0.5 no-underline" style={{textDecoration:"none"}}>Захиалагдсан</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Available count */}
                  {availableCount > 0 && (
                    <div className="mt-3 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <p className="text-white/25 text-[10px]">{availableCount} сул цаг байна</p>
                    </div>
                  )}
                </div>
              )}

              {/* Wait notice */}
              <div className="bg-amber-950/20 border border-amber-800/20 rounded-xl p-3 flex items-start gap-2">
                <Info size={11} className="text-amber-400/70 mt-0.5 flex-shrink-0" />
                <p className="text-amber-300/60 text-xs leading-relaxed">
                  Цаг захиалсанаар хүлээлгүй орно. Өнөөдрийн хүлээлт <strong className="text-amber-300/80">30–40 мин</strong>.
                </p>
              </div>

              <button onClick={() => setStep(3)} disabled={!slot || !mechanic}
                className="w-full py-3.5 bg-[#E31B23] text-white rounded-xl font-bold text-sm disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#c41620] transition-all shadow-lg shadow-[#E31B23]/15 flex items-center justify-center gap-2">
                Төлбөр руу <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── STEP 3: Payment ── */}
          {step === 3 && slot && mechanic && (
            <div className="p-5 space-y-5">
              <div>
                <button onClick={() => setStep(2)} className="flex items-center gap-1 text-white/25 hover:text-white/60 text-xs mb-4 transition-colors">
                  <ArrowLeft size={11} /> Буцах
                </button>
                <div className="w-5 h-0.5 bg-[#E31B23] mb-2" />
                <h2 className="text-white font-black text-xl tracking-tight">Урьдчилгаа</h2>
                <p className="text-white/30 text-xs mt-0.5">Захиалгаа баталгаажуулах 30% урьдчилгаа</p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-2">
                {cartParts.map((p) => (
                  <div key={p.id} className="flex justify-between">
                    <span className="text-white/45 text-sm truncate mr-2">{p.name}</span>
                    <span className="text-white/35 text-sm flex-shrink-0">{p.price}</span>
                  </div>
                ))}
                <div className="border-t border-white/[0.06] pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/30">Механик</span>
                    <span className="text-white/60 font-medium">{mechanic.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/30">Цаг</span>
                    <span className="text-white/60 font-medium">{DATES[dateIdx].date} · {slot.time}</span>
                  </div>
                  <div className="border-t border-white/[0.06] pt-2 flex justify-between">
                    <span className="text-white/30 text-sm">Нийт</span>
                    <span className="text-white/60 text-sm">₮{fmt(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#E31B23] text-sm font-bold">Урьдчилгаа (30%)</span>
                    <span className="text-[#E31B23] text-2xl font-black">₮{fmt(deposit)}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-white/25 text-[10px] uppercase tracking-widest mb-2.5">Төлбөрийн хэрэгсэл</p>
                <div className="grid grid-cols-3 gap-2">
                  {(["qpay", "socialpay", "card"] as const).map((m) => (
                    <button key={m} onClick={() => setPayMethod(m)}
                      className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                        payMethod === m ? "border-[#E31B23] bg-[#E31B23]/10 text-white" : "border-white/[0.08] text-white/30 hover:border-white/20 hover:text-white/60"
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
                    <CreditCard size={14} className="absolute left-3.5 top-3 text-white/20" />
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

              <button onClick={() => setStep(4)}
                className="w-full py-3.5 bg-[#E31B23] text-white rounded-xl font-bold text-sm hover:bg-[#c41620] transition-all shadow-lg shadow-[#E31B23]/15 flex items-center justify-center gap-2">
                <CreditCard size={15} /> ₮{fmt(deposit)} төлөх
              </button>
            </div>
          )}

          {/* ── STEP 4: Confirmed ── */}
          {step === 4 && slot && mechanic && (
            <div className="p-5 flex flex-col items-center text-center gap-5 pt-10">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-emerald-900/20 border border-emerald-600/20 flex items-center justify-center">
                  <CheckCircle2 size={36} className="text-emerald-400" />
                </div>
              </div>
              <div>
                <div className="w-5 h-0.5 bg-emerald-400 mx-auto mb-2" />
                <h2 className="text-white font-black text-xl tracking-tight">Баталгаажлаа!</h2>
                <p className="text-white/30 text-sm mt-0.5">Захиалга амжилттай бүртгэгдлээ</p>
              </div>

              <div className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-left space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/30">Дугаар</span>
                  <span className="text-[#E31B23] font-bold">{orderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/30">Механик</span>
                  <span className="text-white font-medium">{mechanic.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/30">Цаг</span>
                  <span className="text-white font-medium">{DATES[dateIdx].date} · {slot.time}</span>
                </div>
                <div className="border-t border-white/[0.06] pt-2 space-y-1.5">
                  {cartParts.map((p) => (
                    <div key={p.id} className="flex justify-between text-sm">
                      <span className="text-white/35 truncate mr-2">{p.name}</span>
                      <span className="text-white/35 flex-shrink-0">{p.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/[0.06] pt-2 flex justify-between items-center">
                  <span className="text-white/30 text-sm">Урьдчилгаа</span>
                  <span className="text-emerald-400 font-semibold text-sm flex items-center gap-1">
                    <CheckCircle2 size={12} /> Төлөгдсөн
                  </span>
                </div>
              </div>

              <div className="bg-amber-950/20 border border-amber-800/20 rounded-xl p-3.5 w-full">
                <p className="text-amber-300/70 text-xs">
                  📍 Цагаасаа <strong className="text-amber-300">15 минут өмнө</strong> ирнэ үү
                </p>
              </div>

              <div className="flex gap-2.5 w-full">
                <button className="flex-1 py-3 border border-white/[0.08] text-white/35 rounded-xl text-sm hover:border-white/15 hover:text-white/60 transition-all flex items-center justify-center gap-1.5">
                  <CalendarDays size={13} /> Нэмэх
                </button>
                <button onClick={onClose}
                  className="flex-1 py-3 bg-[#E31B23] text-white rounded-xl text-sm font-bold hover:bg-[#c41620] transition-all">
                  Дуусгах
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PartsShopPage() {
  const [activeCategory, setActiveCategory] = useState("Бүгд");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const filtered = parts.filter((p) => {
    const matchCat = activeCategory === "Бүгд" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (id: number) => {
    setCart((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const cartTotal = parts.filter((p) => cart.includes(p.id)).reduce((s, p) => s + p.priceNum, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      {checkoutOpen && cart.length > 0 && (
        <CheckoutOverlay cart={cart} onClose={() => { setCheckoutOpen(false); setCart([]); }} />
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="w-8 h-0.5 bg-[#E31B23] mb-3" />
            <h1 className="text-white font-black text-4xl tracking-tight">Сэлбэг дэлгүүр</h1>
            <p className="text-white/30 text-sm mt-1.5 font-light">Таны машинд тохирох сэлбэг, материалууд</p>
          </div>
          {cart.length > 0 && (
            <button onClick={() => setCheckoutOpen(true)}
              className="flex items-center gap-3 px-5 py-3 bg-[#E31B23] text-white rounded-xl text-sm font-bold hover:bg-[#c41620] transition-all shadow-xl shadow-[#E31B23]/25 group">
              <div className="relative">
                <ShoppingCart size={16} />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-[#E31B23] text-[9px] font-black rounded-full flex items-center justify-center">{cart.length}</span>
              </div>
              <span>₮{fmt(cartTotal)}</span>
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Сэлбэг эсвэл брэнд хайх..."
              className="w-full bg-[#0f0f0f] border border-white/[0.07] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-white/15 transition-colors" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all tracking-wide ${
                  activeCategory === cat ? "bg-[#E31B23] text-white shadow-lg shadow-[#E31B23]/20" : "bg-[#0f0f0f] border border-white/[0.07] text-white/35 hover:text-white/70 hover:border-white/15"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {cart.length > 0 && (
          <div className="mb-6 flex items-center justify-between bg-[#E31B23]/[0.07] border border-[#E31B23]/15 rounded-xl px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <ShoppingCart size={14} className="text-[#E31B23]" />
              <p className="text-[#E31B23] text-sm font-semibold">
                {cart.length} бараа · <span className="text-white">₮{fmt(cartTotal)}</span>
              </p>
            </div>
            <button onClick={() => setCheckoutOpen(true)} className="flex items-center gap-1.5 text-[#E31B23] text-xs font-bold hover:text-white transition-colors">
              Цаг захиалах <ChevronRight size={12} />
            </button>
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((part) => {
              const inCart = cart.includes(part.id);
              return (
                <div key={part.id}
                  className={`bg-[#0f0f0f] border rounded-2xl p-5 flex flex-col transition-all duration-200 ${
                    inCart ? "border-[#E31B23]/30 shadow-lg shadow-[#E31B23]/5" : "border-white/[0.06] hover:border-white/12"
                  }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {part.badge && <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wide ${badgeStyle[part.badge]}`}>{part.badge}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      {!part.inStock && <span className="text-[10px] text-white/20 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full">Дууссан</span>}
                      {inCart && <div className="w-5 h-5 rounded-full bg-[#E31B23] flex items-center justify-center"><span className="text-white text-[10px] font-black">✓</span></div>}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold leading-snug text-[15px]">{part.name}</p>
                    <p className="text-white/30 text-sm mt-1">{part.brand}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {part.compatibility.map((c) => (
                        <span key={c} className="text-[10px] text-white/20 bg-white/[0.04] px-2 py-0.5 rounded-md">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.05]">
                    <p className="text-white font-black text-xl">{part.price}</p>
                    <button onClick={() => addToCart(part.id)} disabled={!part.inStock}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                        !part.inStock ? "bg-white/[0.03] text-white/15 cursor-not-allowed"
                        : inCart ? "bg-[#E31B23]/15 text-[#E31B23] border border-[#E31B23]/25"
                        : "bg-[#E31B23] text-white hover:bg-[#c41620] shadow-md shadow-[#E31B23]/20"
                      }`}>
                      {!part.inStock ? "Байхгүй" : inCart ? "✓ Нэмэгдсэн" : "Сагсанд нэмэх"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
              <Search size={20} className="text-white/15" />
            </div>
            <p className="text-white/20 text-sm">"{search}" гэсэн сэлбэг олдсонгүй</p>
            <button onClick={() => setSearch("")} className="text-[#E31B23] text-xs hover:underline">Хайлт цэвэрлэх</button>
          </div>
        )}
      </div>
    </div>
  );
}
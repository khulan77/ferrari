"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  X,
  ShoppingCart,
  Clock,
  CheckCircle2,
  Star,
  ArrowLeft,
  CalendarDays,
  CreditCard,
  Info,
  Package,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

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
}

// ─── Static data ──────────────────────────────────────────────────────────────

const categories = ["Бүгд", "Хөдөлгүүр", "Тоормос", "Түдгэлзүүр", "Ялгаруулагч", "Дугуй", "Цахилгаан"];

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

const myOrders = [
  { id: "ЗАХ-2401", item: "Бүрэн нийлэг тосны иж бүрдэл", date: "10/10", status: "Хүргэгдсэн", total: "₮85,000" },
  { id: "ЗАХ-2389", item: "Тоормосны бүрхэвч — урд", date: "10/05", status: "Боловсруулж байна", total: "₮145,000" },
  { id: "ЗАХ-2371", item: "Агаарын шүүлтүүр", date: "09/28", status: "Хүргэгдсэн", total: "₮38,000" },
  { id: "ЗАХ-2355", item: "Michelin Primacy 4 x2", date: "09/10", status: "Хүргэгдсэн", total: "₮570,000" },
];

const MECHANICS: Mechanic[] = [
  { id: "m1", name: "Б. Дорж", rating: 4.9, reviews: 142, speciality: "Хөдөлгүүр, Тос", available: true },
  { id: "m2", name: "Г. Мөнх", rating: 4.7, reviews: 98, speciality: "Тоормос, Дугуй", available: true },
  { id: "m3", name: "О. Батаа", rating: 4.8, reviews: 211, speciality: "Оношилгоо, Цахилгаан", available: false },
];

const TIME_SLOTS: TimeSlot[] = [
  { time: "09:00", available: false, waitMins: 0 },
  { time: "09:30", available: false, waitMins: 0 },
  { time: "10:00", available: true, waitMins: 35 },
  { time: "10:30", available: true, waitMins: 30 },
  { time: "11:00", available: true, waitMins: 30 },
  { time: "11:30", available: false, waitMins: 0 },
  { time: "13:00", available: true, waitMins: 30 },
  { time: "13:30", available: true, waitMins: 30 },
  { time: "14:00", available: true, waitMins: 40 },
  { time: "14:30", available: true, waitMins: 35 },
  { time: "15:30", available: true, waitMins: 30 },
  { time: "16:00", available: true, waitMins: 30 },
];

const DATES = [
  { label: "Өнөөдөр", date: "05/07", day: "Пүрэв" },
  { label: "Маргааш", date: "05/08", day: "Баасан" },
  { label: "", date: "05/09", day: "Бямба" },
  { label: "", date: "05/10", day: "Ням" },
  { label: "", date: "05/12", day: "Даваа" },
  { label: "", date: "05/13", day: "Мягмар" },
];

const badgeStyle: Record<string, string> = {
  Эрэлттэй: "bg-[#E31B23]/10 text-[#E31B23] border border-[#E31B23]/20",
  Шинэ: "bg-blue-400/10 text-blue-400 border border-blue-400/20",
  Чанарын: "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20",
};

const fmt = (n: number) => n.toLocaleString("mn-MN");

// ─── Checkout overlay: step 2 – time booking ──────────────────────────────────

function BookingStep({
  cartParts,
  cartTotal,
  onBack,
  onNext,
  slot,
  setSlot,
  mechanic,
  setMechanic,
  dateIdx,
  setDateIdx,
}: {
  cartParts: Part[];
  cartTotal: number;
  onBack: () => void;
  onNext: () => void;
  slot: TimeSlot | null;
  setSlot: (s: TimeSlot) => void;
  mechanic: Mechanic | null;
  setMechanic: (m: Mechanic) => void;
  dateIdx: number;
  setDateIdx: (i: number) => void;
}) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-6 border-b border-white/5">
        <button onClick={onBack} className="flex items-center gap-1 text-white/40 text-sm mb-4 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Буцах
        </button>
        <h2 className="text-white font-black text-xl uppercase tracking-widest">Цаг Захиалах</h2>
        <p className="text-white/30 text-xs mt-1">Сэлбэгийг суурилуулах цагаа сонгоно уу</p>
      </div>

      <div className="p-6 flex-1 space-y-6">
        {/* Selected parts summary */}
        <div className="bg-white/[0.03] border border-white/5 rounded-lg p-4">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Package size={11} /> Захиалсан сэлбэгүүд
          </p>
          <div className="space-y-2">
            {cartParts.map((p) => (
              <div key={p.id} className="flex justify-between items-center">
                <span className="text-white/70 text-sm">{p.name}</span>
                <span className="text-white/40 text-sm">{p.price}</span>
              </div>
            ))}
            <div className="border-t border-white/5 pt-2 flex justify-between">
              <span className="text-white/40 text-sm">Нийт</span>
              <span className="text-white font-bold text-sm">₮{fmt(cartTotal)}</span>
            </div>
          </div>
        </div>

        {/* Wait time notice */}
        <div className="bg-amber-950/30 border border-amber-800/30 rounded-lg p-3 flex items-start gap-2">
          <Info size={13} className="text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-amber-300/80 text-xs leading-relaxed">
            Одоогийн ачаалал өндөр. Хүлээлтийн хугацаа <strong className="text-amber-300">30–40 минут</strong>. Цагаа тогтоосноор хүлээхгүй.
          </p>
        </div>

        {/* Date */}
        <div>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Огноо</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {DATES.map((d, i) => (
              <button
                key={i}
                onClick={() => setDateIdx(i)}
                className={`flex flex-col items-center px-3 py-2 rounded-lg border min-w-[56px] transition-all text-xs ${
                  dateIdx === i ? "bg-[#E31B23] border-[#E31B23] text-white" : "border-white/10 text-white/40 hover:border-white/20"
                }`}
              >
                {d.label && <span className="text-[9px] font-bold uppercase mb-0.5 opacity-80">{d.label}</span>}
                <span className="font-semibold">{d.date}</span>
                <span className="opacity-60">{d.day}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time slots */}
        <div>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Цаг</p>
          <div className="grid grid-cols-4 gap-1.5">
            {TIME_SLOTS.map((s) => (
              <button
                key={s.time}
                onClick={() => s.available && setSlot(s)}
                disabled={!s.available}
                className={`py-2 rounded-md border text-xs font-medium relative transition-all ${
                  !s.available
                    ? "border-white/[0.03] text-white/15 cursor-not-allowed bg-white/[0.02]"
                    : slot?.time === s.time
                    ? "border-[#E31B23] bg-[#E31B23] text-white"
                    : "border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                }`}
              >
                {s.time}
                {s.available && s.waitMins > 0 && (
                  <span className="absolute -top-1.5 -right-1 text-[9px] bg-amber-500 text-black rounded-full px-1 font-bold leading-tight">
                    {s.waitMins}м
  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mechanic */}
        <div>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Механик</p>
          <div className="space-y-2">
            {MECHANICS.map((m) => (
              <button
                key={m.id}
                onClick={() => m.available && setMechanic(m)}
                disabled={!m.available}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                  !m.available
                    ? "border-white/[0.03] opacity-30 cursor-not-allowed"
                    : mechanic?.id === m.id
                    ? "border-[#E31B23]/50 bg-[#E31B23]/5"
                    : "border-white/5 hover:border-white/10"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {m.name.split(".")[1]?.trim()[0] || m.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{m.name}</p>
                  <p className="text-white/30 text-xs truncate">{m.speciality}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-400 flex-shrink-0">
                  <Star size={11} fill="currentColor" />
                  <span className="text-xs font-semibold">{m.rating}</span>
                  <span className="text-white/20 text-xs">({m.reviews})</span>
                </div>
                {!m.available && <span className="text-[10px] text-white/20 ml-1">Завгүй</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-white/5">
        <button
          onClick={onNext}
          disabled={!slot || !mechanic}
          className="w-full py-3.5 bg-[#E31B23] text-white rounded-lg font-bold text-sm disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#c41620] transition-colors flex items-center justify-center gap-2"
        >
          Төлбөр руу <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Checkout overlay: step 3 – payment ──────────────────────────────────────

function PaymentStep({
  cartParts,
  cartTotal,
  slot,
  mechanic,
  dateIdx,
  onBack,
  onNext,
}: {
  cartParts: Part[];
  cartTotal: number;
  slot: TimeSlot;
  mechanic: Mechanic;
  dateIdx: number;
  onBack: () => void;
  onNext: () => void;
}) {
  const deposit = Math.round(cartTotal * 0.3);
  const [method, setMethod] = useState<"qpay" | "socialpay" | "card">("qpay");

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-6 border-b border-white/5">
        <button onClick={onBack} className="flex items-center gap-1 text-white/40 text-sm mb-4 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Буцах
        </button>
        <h2 className="text-white font-black text-xl uppercase tracking-widest">Урьдчилгаа</h2>
        <p className="text-white/30 text-xs mt-1">Захиалгаа баталгаажуулах урьдчилгаа</p>
      </div>

      <div className="p-6 flex-1 space-y-5">
        {/* Summary */}
        <div className="bg-white/[0.03] border border-white/5 rounded-lg p-4 space-y-2">
          {cartParts.map((p) => (
            <div key={p.id} className="flex justify-between">
              <span className="text-white/50 text-sm truncate mr-2">{p.name}</span>
              <span className="text-white/50 text-sm flex-shrink-0">{p.price}</span>
            </div>
          ))}
          <div className="border-t border-white/5 pt-2 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Цаг</span>
              <span className="text-white/70">{DATES[dateIdx].date} · {slot.time}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Механик</span>
              <span className="text-white/70">{mechanic.name}</span>
            </div>
            <div className="border-t border-white/5 pt-2 flex justify-between">
              <span className="text-white/40 text-sm">Нийт үнэ</span>
              <span className="text-white text-sm">₮{fmt(cartTotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#E31B23] text-sm font-semibold">Урьдчилгаа (30%)</span>
              <span className="text-[#E31B23] text-xl font-black">₮{fmt(deposit)}</span>
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Төлбөрийн хэрэгсэл</p>
          <div className="grid grid-cols-3 gap-2">
            {(["qpay", "socialpay", "card"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`py-2.5 rounded-lg border text-xs font-bold transition-all ${
                  method === m ? "border-[#E31B23] bg-[#E31B23]/10 text-white" : "border-white/10 text-white/30 hover:border-white/20"
                }`}
              >
                {m === "qpay" ? "QPay" : m === "socialpay" ? "SocialPay" : "Карт"}
              </button>
            ))}
          </div>
        </div>

        {method === "qpay" && (
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="w-28 h-28 bg-white rounded-lg flex items-center justify-center p-2">
              <div className="w-full h-full grid grid-cols-7 gap-px">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div key={i} className={`${Math.random() > 0.5 ? "bg-black" : "bg-white"} rounded-sm`} />
                ))}
              </div>
            </div>
            <p className="text-white/30 text-xs text-center">QPay апп-аар QR код уншуулна уу</p>
            <p className="text-white font-black">₮{fmt(deposit)}</p>
          </div>
        )}

        {method === "card" && (
          <div className="space-y-2">
            <input className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20" placeholder="Картын дугаар" />
            <div className="grid grid-cols-2 gap-2">
              <input className="bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20" placeholder="MM/YY" />
              <input className="bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20" placeholder="CVV" />
            </div>
          </div>
        )}

        {method === "socialpay" && (
          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-4 text-center">
            <p className="text-white/40 text-sm">SocialPay апп руу шилжүүлэх...</p>
            <p className="text-white font-black text-lg mt-1">₮{fmt(deposit)}</p>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-white/5">
        <button
          onClick={onNext}
          className="w-full py-3.5 bg-[#E31B23] text-white rounded-lg font-bold text-sm hover:bg-[#c41620] transition-colors flex items-center justify-center gap-2"
        >
          <CreditCard size={16} /> ₮{fmt(deposit)} төлөх
        </button>
      </div>
    </div>
  );
}

// ─── Checkout overlay: step 4 – confirmed ────────────────────────────────────

function ConfirmedStep({
  cartParts,
  slot,
  mechanic,
  dateIdx,
  onDone,
}: {
  cartParts: Part[];
  slot: TimeSlot;
  mechanic: Mechanic;
  dateIdx: number;
  onDone: () => void;
}) {
  const orderId = "ЗАХ-" + Math.floor(2400 + Math.random() * 100);
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center gap-5">
      <div className="w-16 h-16 rounded-full bg-green-900/30 border border-green-600/30 flex items-center justify-center">
        <CheckCircle2 size={32} className="text-green-400" />
      </div>
      <div>
        <h2 className="text-white font-black text-xl uppercase tracking-widest mb-1">Баталгаажлаа!</h2>
        <p className="text-white/30 text-sm">Захиалга амжилттай бүртгэгдлээ</p>
      </div>

      <div className="w-full bg-white/[0.03] border border-white/5 rounded-lg p-4 text-left space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Дугаар</span>
          <span className="text-[#E31B23] font-bold">{orderId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Цаг</span>
          <span className="text-white">{DATES[dateIdx].date} · {slot.time}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Механик</span>
          <span className="text-white">{mechanic.name}</span>
        </div>
        <div className="border-t border-white/5 pt-2">
          {cartParts.map((p) => (
            <div key={p.id} className="flex justify-between text-sm">
              <span className="text-white/50 truncate mr-2">{p.name}</span>
              <span className="text-white/50 flex-shrink-0">{p.price}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm pt-1">
          <span className="text-white/40">Урьдчилгаа</span>
          <span className="text-green-400 font-semibold">Төлөгдсөн ✓</span>
        </div>
      </div>

      <div className="bg-amber-950/30 border border-amber-800/30 rounded-lg p-3 w-full">
        <p className="text-amber-300/80 text-xs">
          📍 Цагаасаа <strong className="text-amber-300">15 минут өмнө</strong> ирнэ үү
        </p>
      </div>

      <div className="flex gap-3 w-full">
        <button className="flex-1 py-2.5 border border-white/10 text-white/40 rounded-lg text-sm hover:border-white/20 hover:text-white transition-colors flex items-center justify-center gap-1">
          <CalendarDays size={13} /> Нэмэх
        </button>
        <button
          onClick={onDone}
          className="flex-1 py-2.5 bg-[#E31B23] text-white rounded-lg text-sm font-bold hover:bg-[#c41620] transition-colors"
        >
          Дуусгах
        </button>
      </div>
    </div>
  );
}

// ─── Checkout overlay shell ───────────────────────────────────────────────────

function CheckoutOverlay({
  cart,
  onClose,
}: {
  cart: number[];
  onClose: () => void;
}) {
  const cartParts = parts.filter((p) => cart.includes(p.id));
  const cartTotal = cartParts.reduce((s, p) => s + p.priceNum, 0);

  // checkout steps: 2=booking, 3=payment, 4=confirmed
  const [step, setStep] = useState(2);
  const [slot, setSlot] = useState<TimeSlot | null>(null);
  const [mechanic, setMechanic] = useState<Mechanic | null>(null);
  const [dateIdx, setDateIdx] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* panel */}
      <div className="relative z-10 w-full sm:w-[480px] sm:max-h-[90vh] h-[92vh] sm:h-auto bg-[#0f0f0f] border border-white/10 sm:rounded-2xl rounded-t-2xl flex flex-col overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            {[2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1 rounded-full transition-all ${
                  s <= step ? "bg-[#E31B23]" : "bg-white/10"
                } ${s === 2 ? "w-8" : "w-6"}`}
              />
            ))}
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* content */}
        <div className="flex-1 overflow-hidden">
          {step === 2 && (
            <BookingStep
              cartParts={cartParts}
              cartTotal={cartTotal}
              onBack={onClose}
              onNext={() => setStep(3)}
              slot={slot}
              setSlot={setSlot}
              mechanic={mechanic}
              setMechanic={setMechanic}
              dateIdx={dateIdx}
              setDateIdx={setDateIdx}
            />
          )}
          {step === 3 && slot && mechanic && (
            <PaymentStep
              cartParts={cartParts}
              cartTotal={cartTotal}
              slot={slot}
              mechanic={mechanic}
              dateIdx={dateIdx}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          )}
          {step === 4 && slot && mechanic && (
            <ConfirmedStep
              cartParts={cartParts}
              slot={slot}
              mechanic={mechanic}
              dateIdx={dateIdx}
              onDone={onClose}
            />
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
  const [tab, setTab] = useState<"shop" | "orders">("shop");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const filtered = parts.filter((p) => {
    const matchCat = activeCategory === "Бүгд" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (id: number) => {
    setCart((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const cartTotal = parts.filter((p) => cart.includes(p.id)).reduce((s, p) => s + p.priceNum, 0);

  const handleCheckoutDone = () => {
    setCheckoutOpen(false);
    setCart([]);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Checkout overlay */}
      {checkoutOpen && cart.length > 0 && (
        <CheckoutOverlay cart={cart} onClose={handleCheckoutDone} />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-white font-black text-3xl uppercase tracking-widest">Сэлбэг дэлгүүр</h1>
          <p className="text-white/40 text-sm mt-1">Таны машинд зориулсан сэлбэг, материалууд</p>
        </div>
        {/* Floating cart button */}
        {cart.length > 0 && (
          <button
            onClick={() => setCheckoutOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#E31B23] text-white rounded-lg text-sm font-bold hover:bg-[#c41620] transition-all"
          >
            <ShoppingCart size={15} />
            {cart.length} бараа · ₮{fmt(cartTotal)}
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-[#111111] border border-white/5 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("shop")}
          className={`px-4 py-2 text-sm rounded-md transition-all ${tab === "shop" ? "bg-[#E31B23] text-white font-medium" : "text-white/40 hover:text-white"}`}
        >
          Сэлбэг харах
        </button>
        <button
          onClick={() => setTab("orders")}
          className={`px-4 py-2 text-sm rounded-md transition-all ${tab === "orders" ? "bg-[#E31B23] text-white font-medium" : "text-white/40 hover:text-white"}`}
        >
          Миний захиалгууд
        </button>
      </div>

      {tab === "shop" ? (
        <>
          {/* Cart banner */}
          {cart.length > 0 && (
            <div className="mb-6 bg-[#E31B23]/10 border border-[#E31B23]/20 rounded-lg p-4 flex items-center justify-between">
              <p className="text-[#E31B23] text-sm font-medium">
                {cart.length} бараа сагсанд · <span className="text-white">₮{fmt(cartTotal)}</span>
              </p>
              <button
                onClick={() => setCheckoutOpen(true)}
                className="px-4 py-1.5 bg-[#E31B23] text-white text-sm rounded-md hover:bg-[#c41620] transition-all flex items-center gap-1"
              >
                Цаг захиалах <ChevronRight size={13} />
              </button>
            </div>
          )}

          {/* Search + categories */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Сэлбэг эсвэл брэнд хайх..."
              className="flex-1 bg-[#111111] border border-white/10 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/20 placeholder:text-white/20 transition-colors"
            />
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-2 text-xs rounded-md transition-all ${
                    activeCategory === cat
                      ? "bg-[#E31B23] text-white"
                      : "bg-[#111111] border border-white/10 text-white/50 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Parts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((part) => {
              const inCart = cart.includes(part.id);
              return (
                <div
                  key={part.id}
                  className={`bg-[#111111] border rounded-lg p-5 flex flex-col transition-all duration-200 ${
                    inCart ? "border-[#E31B23]/40" : "border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      {part.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeStyle[part.badge]}`}>
                          {part.badge}
                        </span>
                      )}
                    </div>
                    {!part.inStock && (
                      <span className="text-xs text-white/20 bg-white/5 px-2 py-0.5 rounded-full">Дууссан</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium leading-snug">{part.name}</p>
                    <p className="text-white/40 text-sm mt-0.5">{part.brand}</p>
                    <p className="text-white/20 text-xs mt-2">Тохирох: {part.compatibility.join(", ")}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <p className="text-white font-black text-lg">{part.price}</p>
                    <button
                      onClick={() => addToCart(part.id)}
                      disabled={!part.inStock}
                      className={`px-4 py-2 text-sm rounded-md transition-all font-medium ${
                        !part.inStock
                          ? "bg-white/5 text-white/20 cursor-not-allowed"
                          : inCart
                          ? "bg-[#E31B23]/20 text-[#E31B23] border border-[#E31B23]/30"
                          : "bg-[#E31B23] text-white hover:bg-[#c41620]"
                      }`}
                    >
                      {!part.inStock ? "Байхгүй" : inCart ? "✓ Нэмэгдсэн" : "Сагсанд нэмэх"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/20 text-sm">"{search}" гэсэн сэлбэг олдсонгүй</p>
            </div>
          )}
        </>
      ) : (
        /* Orders tab */
        <div className="bg-[#111111] border border-white/5 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-white/30 text-xs uppercase tracking-widest font-medium">Захиалга</th>
                <th className="text-left px-5 py-3 text-white/30 text-xs uppercase tracking-widest font-medium">Бараа</th>
                <th className="text-left px-5 py-3 text-white/30 text-xs uppercase tracking-widest font-medium">Огноо</th>
                <th className="text-left px-5 py-3 text-white/30 text-xs uppercase tracking-widest font-medium">Төлөв</th>
                <th className="text-right px-5 py-3 text-white/30 text-xs uppercase tracking-widest font-medium">Дүн</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order, i) => (
                <tr key={order.id} className={`${i !== myOrders.length - 1 ? "border-b border-white/5" : ""} hover:bg-white/[0.02] transition-colors`}>
                  <td className="px-5 py-4 text-white/40 text-sm font-mono">{order.id}</td>
                  <td className="px-5 py-4 text-white text-sm">{order.item}</td>
                  <td className="px-5 py-4 text-white/40 text-sm">{order.date}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      order.status === "Хүргэгдсэн" ? "bg-green-400/10 text-green-400" : "bg-blue-400/10 text-blue-400"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white text-sm font-medium text-right">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
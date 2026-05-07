"use client";

import { useState } from "react";
import {
  ChevronRight,
  Clock,
  CheckCircle2,
  Wrench,
  Droplets,
  Filter,
  Disc3,
  Gauge,
  Zap,
  Car,
  ArrowLeft,
  CreditCard,
  CalendarDays,
  Info,
  Star,
  X,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  duration: number; // minutes
  icon: React.ReactNode;
  popular?: boolean;
  category: string;
}

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

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES: Service[] = [
  {
    id: "oil",
    name: "Тос солих",
    nameEn: "Oil Change",
    description: "Бүрэн синтетик болон хагас синтетик тос солих",
    price: 85000,
    duration: 45,
    icon: <Droplets size={20} />,
    popular: true,
    category: "Тос",
  },
  {
    id: "brake",
    name: "Тоормосны бүрхэвч",
    nameEn: "Brake Pads",
    description: "Тоормосны бүрхэвч болон диск шалгах, солих",
    price: 245000,
    duration: 90,
    icon: <Disc3 size={20} />,
    category: "Тоормос",
  },
  {
    id: "filter",
    name: "Агаарын шүүлтүүр",
    nameEn: "Air Filter",
    description: "Агаарын болон дотоод агааржуулагчийн шүүлтүүр солих",
    price: 38000,
    duration: 20,
    icon: <Filter size={20} />,
    category: "Шүүлтүүр",
  },
  {
    id: "diag",
    name: "Хөдөлгүүрийн оношилгоо",
    nameEn: "Engine Diagnostic",
    description: "OBD-II оношилгоо болон алдааны кодын шинжилгээ",
    price: 38000,
    duration: 30,
    icon: <Gauge size={20} />,
    category: "Оношилгоо",
  },
  {
    id: "tire",
    name: "Дугуй эргүүлэх",
    nameEn: "Tire Rotation",
    description: "Дугуй эргүүлэх болон тэнцвэржүүлэх",
    price: 45000,
    duration: 45,
    icon: <Car size={20} />,
    category: "Дугуй",
  },
  {
    id: "inspection",
    name: "Ерөнхий үзлэг",
    nameEn: "Full Inspection",
    description: "50 цэгийн иж бүрэн үзлэг болон тайлан",
    price: 65000,
    duration: 60,
    icon: <Wrench size={20} />,
    category: "Үзлэг",
  },
  {
    id: "spark",
    name: "Свеч солих",
    nameEn: "Spark Plugs",
    description: "Иридиум болон платин свеч солих",
    price: 120000,
    duration: 60,
    icon: <Zap size={20} />,
    category: "Хөдөлгүүр",
  },
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
  { time: "12:00", available: false, waitMins: 0 },
  { time: "13:00", available: true, waitMins: 30 },
  { time: "13:30", available: true, waitMins: 30 },
  { time: "14:00", available: true, waitMins: 40 },
  { time: "14:30", available: true, waitMins: 35 },
  { time: "15:00", available: false, waitMins: 0 },
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number) => n.toLocaleString("mn-MN");

// ─── Step components ─────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  const steps = ["Үйлчилгээ", "Цаг захиалах", "Төлбөр", "Баталгаа"];
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i + 1 < step
                  ? "bg-red-600 text-white"
                  : i + 1 === step
                  ? "bg-red-600 text-white ring-4 ring-red-100"
                  : "bg-[#2a2a2a] text-gray-500"
              }`}
            >
              {i + 1 < step ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span
              className={`text-[10px] mt-1 whitespace-nowrap ${
                i + 1 === step ? "text-red-500 font-semibold" : "text-gray-500"
              }`}
            >
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-[1px] w-12 sm:w-20 mb-4 mx-1 transition-all ${
                i + 1 < step ? "bg-red-600" : "bg-[#2a2a2a]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── STEP 1: Service selection ────────────────────────────────────────────────

function Step1({
  selected,
  onSelect,
  onNext,
  history,
}: {
  selected: Service | null;
  onSelect: (s: Service) => void;
  onNext: () => void;
  history: { serviceId: string; date: string; parts: string[] }[];
}) {
  const [cat, setCat] = useState("Бүгд");
  const cats = ["Бүгд", ...Array.from(new Set(SERVICES.map((s) => s.category)))];
  const filtered = cat === "Бүгд" ? SERVICES : SERVICES.filter((s) => s.category === cat);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">ҮЙЛЧИЛГЭЭ СОНГОХ</h1>
      <p className="text-gray-400 text-sm mb-6">Засварын төрлөө сонгоно уу</p>

      {/* Past services highlight */}
      {history.length > 0 && (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 mb-6">
          <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
            <Clock size={12} /> Сүүлийн засварууд
          </p>
          <div className="flex gap-2 flex-wrap">
            {history.slice(0, 3).map((h, i) => {
              const svc = SERVICES.find((s) => s.id === h.serviceId);
              return svc ? (
                <button
                  key={i}
                  onClick={() => onSelect(svc)}
                  className="text-xs bg-[#2a2a2a] text-gray-300 px-3 py-1.5 rounded-full hover:bg-red-600 hover:text-white transition-colors"
                >
                  {svc.name}
                </button>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`text-xs px-4 py-1.5 rounded-full border whitespace-nowrap transition-all ${
              cat === c
                ? "bg-red-600 border-red-600 text-white"
                : "border-[#2a2a2a] text-gray-400 hover:border-gray-500"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Service grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {filtered.map((svc) => (
          <button
            key={svc.id}
            onClick={() => onSelect(svc)}
            className={`relative text-left p-4 rounded-xl border transition-all ${
              selected?.id === svc.id
                ? "border-red-600 bg-[#1f0f0f]"
                : "border-[#2a2a2a] bg-[#141414] hover:border-[#3a3a3a]"
            }`}
          >
            {svc.popular && (
              <span className="absolute top-3 right-3 text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
                ЭРЭЛТТЭЙ
              </span>
            )}
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  selected?.id === svc.id ? "bg-red-600 text-white" : "bg-[#2a2a2a] text-gray-400"
                }`}
              >
                {svc.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{svc.name}</p>
                <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{svc.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-red-400 font-bold text-sm">₮{fmt(svc.price)}</span>
                  <span className="text-gray-600 text-xs flex items-center gap-1">
                    <Clock size={10} /> {svc.duration} мин
                  </span>
                </div>
              </div>
            </div>
            {selected?.id === svc.id && (
              <div className="absolute top-3 left-3">
                <CheckCircle2 size={16} className="text-red-500" />
              </div>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
      >
        Цаг сонгох <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ─── STEP 2: Time booking ─────────────────────────────────────────────────────

function Step2({
  service,
  onBack,
  onNext,
  selectedSlot,
  setSelectedSlot,
  selectedMechanic,
  setSelectedMechanic,
  selectedDate,
  setSelectedDate,
}: {
  service: Service;
  onBack: () => void;
  onNext: () => void;
  selectedSlot: TimeSlot | null;
  setSelectedSlot: (s: TimeSlot) => void;
  selectedMechanic: Mechanic | null;
  setSelectedMechanic: (m: Mechanic) => void;
  selectedDate: number;
  setSelectedDate: (d: number) => void;
}) {
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-gray-400 text-sm mb-4 hover:text-white transition-colors">
        <ArrowLeft size={14} /> Буцах
      </button>
      <h1 className="text-2xl font-bold text-white mb-1">ЦАГ ЗАХИАЛАХ</h1>
      <p className="text-gray-400 text-sm mb-6">
        {service.name} · ₮{fmt(service.price)} · {service.duration} мин
      </p>

      {/* Wait time notice */}
      <div className="bg-amber-950/40 border border-amber-800/40 rounded-xl p-3 mb-6 flex items-start gap-2">
        <Info size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-amber-300 text-xs leading-relaxed">
          Одоогийн ачаалал өндөр байна. Хүлээлтийн хугацаа <strong>30–40 минут</strong> байна. Цагаа тогтоосноор хүлээхгүй.
        </p>
      </div>

      {/* Date selector */}
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Огноо сонгох</p>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {DATES.map((d, i) => (
          <button
            key={i}
            onClick={() => setSelectedDate(i)}
            className={`flex flex-col items-center px-4 py-2.5 rounded-xl border min-w-[60px] transition-all ${
              selectedDate === i
                ? "bg-red-600 border-red-600 text-white"
                : "border-[#2a2a2a] text-gray-400 hover:border-gray-500"
            }`}
          >
            {d.label && <span className="text-[9px] font-bold uppercase mb-0.5">{d.label}</span>}
            <span className="text-xs font-semibold">{d.date}</span>
            <span className="text-[10px] opacity-70">{d.day}</span>
          </button>
        ))}
      </div>

      {/* Time slots */}
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Цаг сонгох</p>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-6">
        {TIME_SLOTS.map((slot) => (
          <button
            key={slot.time}
            onClick={() => slot.available && setSelectedSlot(slot)}
            disabled={!slot.available}
            className={`py-2.5 px-1 rounded-lg border text-xs font-medium transition-all relative ${
              !slot.available
                ? "border-[#1a1a1a] text-gray-700 cursor-not-allowed bg-[#0f0f0f]"
                : selectedSlot?.time === slot.time
                ? "border-red-600 bg-red-600 text-white"
                : "border-[#2a2a2a] text-gray-300 hover:border-gray-500"
            }`}
          >
            {slot.time}
            {slot.available && slot.waitMins > 0 && (
              <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-amber-500 text-black rounded-full px-1 font-bold">
                {slot.waitMins}м
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Mechanic selection */}
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Механик сонгох</p>
      <div className="flex flex-col gap-2 mb-6">
        {MECHANICS.map((m) => (
          <button
            key={m.id}
            onClick={() => m.available && setSelectedMechanic(m)}
            disabled={!m.available}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
              !m.available
                ? "border-[#1a1a1a] opacity-40 cursor-not-allowed"
                : selectedMechanic?.id === m.id
                ? "border-red-600 bg-[#1f0f0f]"
                : "border-[#2a2a2a] hover:border-[#3a3a3a]"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {m.name.split(".")[1]?.trim()[0] || m.name[0]}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">{m.name}</p>
              <p className="text-gray-500 text-xs">{m.speciality}</p>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={12} fill="currentColor" />
              <span className="text-xs font-semibold">{m.rating}</span>
              <span className="text-gray-600 text-xs">({m.reviews})</span>
            </div>
            {!m.available && (
              <span className="text-[10px] bg-[#1a1a1a] text-gray-600 px-2 py-0.5 rounded-full">Завгүй</span>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selectedSlot || !selectedMechanic}
        className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
      >
        Төлбөр руу <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ─── STEP 3: Prepayment ───────────────────────────────────────────────────────

function Step3({
  service,
  slot,
  mechanic,
  date,
  onBack,
  onNext,
}: {
  service: Service;
  slot: TimeSlot;
  mechanic: Mechanic;
  date: number;
  onBack: () => void;
  onNext: () => void;
}) {
  const deposit = Math.round(service.price * 0.3);
  const [method, setMethod] = useState<"card" | "qpay" | "socialpay">("qpay");

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-gray-400 text-sm mb-4 hover:text-white transition-colors">
        <ArrowLeft size={14} /> Буцах
      </button>
      <h1 className="text-2xl font-bold text-white mb-1">УРЬДЧИЛГАА ТӨЛБӨР</h1>
      <p className="text-gray-400 text-sm mb-6">Захиалгаа баталгаажуулахын тулд урьдчилгаа төлнө үү</p>

      {/* Order summary */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 mb-6">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Захиалгын мэдээлэл</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Үйлчилгээ</span>
            <span className="text-white text-sm font-semibold">{service.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Огноо, цаг</span>
            <span className="text-white text-sm">{DATES[date].date} {slot.time}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Механик</span>
            <span className="text-white text-sm">{mechanic.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Хүлээлт</span>
            <span className="text-amber-400 text-sm">{slot.waitMins} мин</span>
          </div>
          <div className="border-t border-[#2a2a2a] pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Нийт үнэ</span>
              <span className="text-white text-sm">₮{fmt(service.price)}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-red-400 text-sm font-semibold">Урьдчилгаа (30%)</span>
              <span className="text-red-400 text-lg font-bold">₮{fmt(deposit)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Төлбөрийн хэрэгсэл</p>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {(["qpay", "socialpay", "card"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            className={`py-3 rounded-xl border text-xs font-bold transition-all ${
              method === m ? "border-red-600 bg-[#1f0f0f] text-white" : "border-[#2a2a2a] text-gray-400 hover:border-gray-500"
            }`}
          >
            {m === "qpay" ? "QPay" : m === "socialpay" ? "SocialPay" : "Карт"}
          </button>
        ))}
      </div>

      {method === "qpay" && (
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 mb-6 flex flex-col items-center gap-3">
          <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
            <div className="w-28 h-28 grid grid-cols-7 gap-0.5">
              {Array.from({ length: 49 }).map((_, i) => (
                <div key={i} className={`${Math.random() > 0.5 ? "bg-black" : "bg-white"} rounded-sm`} />
              ))}
            </div>
          </div>
          <p className="text-gray-400 text-xs text-center">QPay апп ашиглан QR код уншуулна уу</p>
          <p className="text-white font-bold">₮{fmt(deposit)}</p>
        </div>
      )}

      {method === "card" && (
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 mb-6 space-y-3">
          <input className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-600" placeholder="Картын дугаар" />
          <div className="grid grid-cols-2 gap-2">
            <input className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-600" placeholder="MM/YY" />
            <input className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-600" placeholder="CVV" />
          </div>
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
      >
        <CreditCard size={16} /> ₮{fmt(deposit)} төлөх
      </button>
    </div>
  );
}

// ─── STEP 4: Confirmation ─────────────────────────────────────────────────────

function Step4({
  service,
  slot,
  mechanic,
  date,
  onDone,
}: {
  service: Service;
  slot: TimeSlot;
  mechanic: Mechanic;
  date: number;
  onDone: () => void;
}) {
  const orderId = "ЗАХ-" + Math.floor(2400 + Math.random() * 100);
  return (
    <div className="flex flex-col items-center text-center py-4">
      <div className="w-20 h-20 rounded-full bg-green-900/40 border border-green-600/40 flex items-center justify-center mb-6">
        <CheckCircle2 size={40} className="text-green-400" />
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">БАТАЛГААЖЛАА!</h1>
      <p className="text-gray-400 text-sm mb-8">Таны цаг захиалга амжилттай бүртгэгдлээ</p>

      <div className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl p-5 mb-6 text-left space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Захиалгын дугаар</span>
          <span className="text-red-400 font-bold text-sm">{orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Үйлчилгээ</span>
          <span className="text-white text-sm">{service.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Цаг</span>
          <span className="text-white text-sm">{DATES[date].date} · {slot.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Механик</span>
          <span className="text-white text-sm">{mechanic.name}</span>
        </div>
        <div className="border-t border-[#2a2a2a] pt-3 flex justify-between">
          <span className="text-gray-400 text-sm">Урьдчилгаа</span>
          <span className="text-green-400 font-bold text-sm">Төлөгдсөн ✓</span>
        </div>
      </div>

      <div className="bg-amber-950/30 border border-amber-800/30 rounded-xl p-3 w-full mb-6">
        <p className="text-amber-300 text-xs">
          📍 Цагаасаа <strong>15 минут өмнө</strong> ирнэ үү. Хожимдвол цагийг дахин захиалах шаардлагатай болно.
        </p>
      </div>

      <div className="flex gap-3 w-full">
        <button className="flex-1 py-3 border border-[#2a2a2a] text-gray-300 rounded-xl text-sm hover:border-gray-500 transition-colors">
          <CalendarDays size={14} className="inline mr-1" /> Нэмэх
        </button>
        <button
          onClick={onDone}
          className="flex-1 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors"
        >
          Дуусгах
        </button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);
  const [selectedDate, setSelectedDate] = useState(0);

  // Mock history from past orders
  const mockHistory = [
    { serviceId: "oil", date: "2024-10-24", parts: ["Mobil 1 Full Synthetic"] },
    { serviceId: "brake", date: "2024-08-15", parts: ["Brembo"] },
    { serviceId: "filter", date: "2024-09-01", parts: ["Mann Filter"] },
  ];

  const reset = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedSlot(null);
    setSelectedMechanic(null);
    setSelectedDate(0);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <StepIndicator step={step} />

        {step === 1 && (
          <Step1
            selected={selectedService}
            onSelect={setSelectedService}
            onNext={() => setStep(2)}
            history={mockHistory}
          />
        )}
        {step === 2 && selectedService && (
          <Step2
            service={selectedService}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            selectedMechanic={selectedMechanic}
            setSelectedMechanic={setSelectedMechanic}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
        {step === 3 && selectedService && selectedSlot && selectedMechanic && (
          <Step3
            service={selectedService}
            slot={selectedSlot}
            mechanic={selectedMechanic}
            date={selectedDate}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}
        {step === 4 && selectedService && selectedSlot && selectedMechanic && (
          <Step4
            service={selectedService}
            slot={selectedSlot}
            mechanic={selectedMechanic}
            date={selectedDate}
            onDone={reset}
          />
        )}
      </div>
    </div>
  );
}
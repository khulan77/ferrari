"use client";

import { useState } from "react";

const services = [
  {
    icon: "💧",
    name: "Тос солих",
    desc: "Синтетик болон хагас синтетик тос, шүүлтүүр солих",
    price: "₮45,000-аас",
    popular: true,
  },
  {
    icon: "🛞",
    name: "Тормос засах",
    desc: "Бэлдэц, диск, шингэн шалгах, солих",
    price: "₮120,000-аас",
    popular: false,
  },
  {
    icon: "⚙️",
    name: "Дугуй солих",
    desc: "Улирлын дугуй солих, тэнцвэржүүлэх",
    price: "₮60,000-аас",
    popular: false,
  },
  {
    icon: "🔋",
    name: "Батерей шалгах",
    desc: "Зарядын систем, батерей солих",
    price: "₮35,000-аас",
    popular: false,
  },
  {
    icon: "🔍",
    name: "Хөдөлгүүр оношлох",
    desc: "Компьютер оношлогоо, алдааны код унших",
    price: "₮25,000-аас",
    popular: false,
  },
  {
    icon: "❄️",
    name: "Агааржуулалт",
    desc: "AC цэнэглэх, систем цэвэрлэх",
    price: "₮80,000-аас",
    popular: false,
  },
];

const packages = [
  {
    icon: "⭐",
    name: "Стандарт үйлчилгээ",
    items: "Тос + Шүүлтүүр + Тормос шалгах + Тохируулга",
    price: "₮185,000",
    duration: "~2 цаг",
    popular: true,
  },
  {
    icon: "🛡️",
    name: "Бүрэн үзлэг",
    items: "Стандарт + Дугуй + Батерей + AC + Хөдөлгүүр",
    price: "₮320,000",
    duration: "~4 цаг",
    popular: false,
  },
  {
    icon: "✨",
    name: "Гадаад цэвэрлэгээ",
    items: "Угаалга + Интерьер + Гадна полировка + Хамгаалалт",
    price: "₮95,000",
    duration: "~3 цаг",
    popular: false,
  },
];

export default function ServicesPage() {
  const [bookedPackage, setBookedPackage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#111] text-white p-8 md:p-10">
      {/* Header */}
      <h1 className="text-3xl font-extrabold tracking-widest  mb-1">
        Үйлчилгээнүүд
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Таны машинд тохирох засвар үйлчилгээг сонгоно уу.
      </p>



      {/* Services Grid */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">
          Үндсэн үйлчилгээнүүд
        </h2>
        <span className="text-xs text-red-500 cursor-pointer hover:underline">
          Бүгдийг харах →
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {services.map((s) => (
          <div
            key={s.name}
            className="bg-[#1c1c1c] border border-[#2a2a2a] hover:border-red-600 rounded-xl p-5 cursor-pointer transition-all hover:-translate-y-0.5 group"
          >
            <div className="w-10 h-10 bg-[#2a2a2a] rounded-lg flex items-center justify-center text-xl mb-3">
              {s.icon}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-gray-100">
                {s.name}
              </span>
              {s.popular && (
                <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold tracking-wide">
                  Түгээмэл
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
              {s.desc}
            </p>
            <span className="text-sm font-bold text-red-500">{s.price}</span>
          </div>
        ))}
      </div>

      {/* Packages */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">
          Иж бүрдэл багцууд
        </h2>
        <span className="text-xs text-red-500 cursor-pointer hover:underline">
          Бүгдийг харах →
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`bg-[#1c1c1c] border rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
              pkg.popular
                ? "border-red-600 bg-[#1f1414]"
                : "border-[#2a2a2a] hover:border-red-600"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#2a2a2a] rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                {pkg.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-gray-100">
                    {pkg.name}
                  </span>
                  {pkg.popular && (
                    <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold tracking-wide">
                      Алдартай
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500">{pkg.items}</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 ml-14 sm:ml-0">
              <span className="text-base font-bold text-white">
                {pkg.price}
              </span>
              <span className="text-[11px] text-gray-500">{pkg.duration}</span>
              <button
                onClick={() => setBookedPackage(pkg.name)}
                className="mt-1 bg-red-600 hover:bg-red-700 transition-colors text-white text-xs font-semibold px-4 py-1.5 rounded-md"
              >
                {bookedPackage === pkg.name ? "✓ Захиалсан" : "Захиалах"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";

const userFleet = [
  {
    id: 1,
    name: "Toyota Camry",
    year: 2021,
    plate: "УБ-1234АА",
    mileage: "42,000 км",
    lastService: "2024 оны 10-р сар",
    status: "good",
    img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&q=80",
  },
  {
    id: 2,
    name: "Hyundai Tucson",
    year: 2020,
    plate: "УБ-5678ББ",
    mileage: "67,500 км",
    lastService: "2024 оны 8-р сар",
    status: "service_due",
    img: "https://images.unsplash.com/photo-1633508800088-ac9bfc9c44e6?w=400&q=80",
  },
  {
    id: 3,
    name: "Mitsubishi Outlander",
    year: 2022,
    plate: "УБ-9012ВВ",
    mileage: "18,200 км",
    lastService: "2024 оны 11-р сар",
    status: "good",
    img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80",
  },
];

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

const recentOrders = [
  {
    id: "ЗАХ-2401",
    item: "Тос солих иж бүрдэл",
    brand: "Mobil 1 Full Synthetic",
    price: "₮85,000",
    status: "delivered",
    date: "10/10",
  },
  {
    id: "ЗАХ-2389",
    item: "Тоормосны бүрхэвч",
    brand: "Brembo",
    price: "₮245,000",
    status: "processing",
    date: "10/05",
  },
  {
    id: "ЗАХ-2371",
    item: "Агаарын шүүлтүүр",
    brand: "Mann Filter",
    price: "₮38,000",
    status: "delivered",
    date: "09/28",
  },
];

const stats = [
  { label: "Нийт зарлага", value: "₮4,820,000", sub: "нийт дүн" },
  { label: "Засвар хийлгэсэн", value: "14", sub: "удаа" },
  { label: "Захиалсан сэлбэг", value: "8", sub: "энэ жил" },
  { label: "Бүртгэлтэй машин", value: "3", sub: "ширхэг" },
];

const statusColor: Record<string, string> = {
  good: "text-green-400 bg-green-400/10",
  service_due: "text-[#E31B23] bg-[#E31B23]/10",
  confirmed: "text-green-400 bg-green-400/10",
  pending: "text-yellow-400 bg-yellow-400/10",
  delivered: "text-green-400 bg-green-400/10",
  processing: "text-blue-400 bg-blue-400/10",
};

const statusLabel: Record<string, string> = {
  good: "Сайн",
  service_due: "Засвар хэрэгтэй",
  confirmed: "Батлагдсан",
  pending: "Хүлээгдэж байна",
  delivered: "Хүргэгдсэн",
  processing: "Боловсруулж байна",
};

export default function UserOverviewPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Гарчиг */}
      <div className="mb-8">
        <h1 className="text-white font-black text-3xl uppercase tracking-widest">
          Хяналтын самбар
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Сайн ирлээ, Батдорж. Таны машинуудын мэдээлэл.
        </p>
      </div>

      {/* Статистик */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#111111] border border-white/5 rounded-lg p-4"
          >
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <p className="text-white font-black text-2xl">{stat.value}</p>
            <p className="text-white/20 text-xs mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Хоёр баганат */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Зүүн */}
        <div className="lg:col-span-3 space-y-6">
          {/* Миний машинууд */}
          <div className="bg-[#111111] border border-white/5 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-sm uppercase tracking-widest">
                Миний машинууд
              </h2>
              <Link href="/user/profile" className="text-[#E31B23] text-xs hover:underline">
                Удирдах →
              </Link>
            </div>
            <div className="space-y-3">
              {userFleet.map((car) => (
                <div
                  key={car.id}
                  className="bg-[#0a0a0a] border border-white/5 rounded-md overflow-hidden flex items-center hover:border-white/10 transition-all"
                >
                  <div className="w-28 h-20 flex-shrink-0 overflow-hidden">
                    <img
                      src={car.img}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-3 flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm">{car.name}</p>
                      <p className="text-white/30 text-xs mt-0.5">
                        {car.year} · {car.plate}
                      </p>
                      <p className="text-white/20 text-xs mt-0.5">
                        {car.mileage} · Сүүлд: {car.lastService}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[car.status]}`}>
                      {statusLabel[car.status]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ойрын цаг товлолтууд */}
          <div className="bg-[#111111] border border-white/5 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-sm uppercase tracking-widest">
                Ойрын цаг товлолтууд
              </h2>
              <Link href="/user/appointments" className="text-[#E31B23] text-xs hover:underline">
                Бүгдийг харах →
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-[#0a0a0a] border border-white/5 rounded-md p-4 flex items-start justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          appt.status === "confirmed" ? "bg-green-400" : "bg-yellow-400"
                        }`}
                      />
                      <p className="text-white text-sm font-medium">{appt.type}</p>
                    </div>
                    <p className="text-white/30 text-xs">{appt.car}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-xs">{appt.date}</p>
                    <p className="text-white/40 text-xs">{appt.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/user/appointments"
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 border border-[#E31B23]/30 text-[#E31B23] text-sm rounded-md hover:bg-[#E31B23] hover:text-white transition-all duration-200"
            >
              + Цаг товлох
            </Link>
          </div>
        </div>

        {/* Баруун */}
        <div className="lg:col-span-2 space-y-6">
          {/* Захиалгийн түүх */}
          <div className="bg-[#111111] border border-white/5 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-sm uppercase tracking-widest">
                Захиалгийн түүх
              </h2>
              <Link href="/user/parts" className="text-[#E31B23] text-xs hover:underline">
                Дэлгүүр →
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="bg-[#0a0a0a] border border-white/5 rounded-md p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white text-xs font-medium">{order.item}</p>
                      <p className="text-white/30 text-xs mt-0.5">{order.brand}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[order.status]}`}>
                      {statusLabel[order.status]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-white/50 text-xs">{order.id}</p>
                    <p className="text-white font-medium text-xs">{order.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/user/parts"
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 border border-white/10 text-white/50 text-sm rounded-md hover:bg-white/5 hover:text-white transition-all duration-200"
            >
              Сэлбэг дэлгүүр үзэх
            </Link>
          </div>

          {/* Хурдан үйлдлүүд */}
          <div className="bg-[#111111] border border-white/5 rounded-lg p-6">
            <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Хурдан үйлдлүүд
            </h2>
            <div className="space-y-2">
              <Link
                href="/user/appointments"
                className="w-full flex items-center gap-3 py-3 px-4 bg-[#E31B23] text-white text-sm font-medium rounded-md hover:bg-[#c41620] transition-all"
              >
                <span>📅</span> Цаг товлох
              </Link>
              <Link
                href="/user/parts"
                className="w-full flex items-center gap-3 py-3 px-4 bg-[#0a0a0a] border border-white/10 text-white/70 text-sm rounded-md hover:border-white/20 hover:text-white transition-all"
              >
                <span>🔧</span> Сэлбэг захиалах
              </Link>
              <Link
                href="/user/services"
                className="w-full flex items-center gap-3 py-3 px-4 bg-[#0a0a0a] border border-white/10 text-white/70 text-sm rounded-md hover:border-white/20 hover:text-white transition-all"
              >
                <span>📋</span> Үйлчилгээ харах
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
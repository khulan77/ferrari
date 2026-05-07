"use client";

import { useState } from "react";

const serviceTypes = [
  "Хөдөлгүүрийн тааруулалт",
  "Тоормосны шалгалт",
  "Тос солих",
  "Дугуй эргүүлэх",
  "Иж бүрэн оношилгоо",
  "Агаар хэмжигч шалгах",
  "Тоног төхөөрөмжийн тохиргоо",
  "Компьютерийн оношилгоо",
];

const userCars = [
  "Toyota Camry (2021) — УБ-1234АА",
  "Hyundai Tucson (2020) — УБ-5678ББ",
  "Mitsubishi Outlander (2022) — УБ-9012ВВ",
];

const upcomingAppointments = [
  {
    id: 1,
    type: "Жилийн ерөнхий үзлэг",
    car: "Toyota Camry",
    date: "2024/10/24",
    time: "09:00",
    mechanic: "Мөнхбаяр",
    status: "confirmed",
    notes: "Иж бүрэн ECU шалгалт орно",
  },
  {
    id: 2,
    type: "Тоормосны шалгалт",
    car: "Hyundai Tucson",
    date: "2024/10/31",
    time: "11:00",
    mechanic: "Оюунцэцэг",
    status: "pending",
    notes: "",
  },
];

const pastAppointments = [
  {
    id: 3,
    type: "Түдгэлзүүрийн тохиргоо",
    car: "Toyota Camry",
    date: "2024/08/15",
    status: "completed",
    cost: "₮240,000",
  },
  {
    id: 4,
    type: "Компьютерийн оношилгоо + Тааруулалт",
    car: "Hyundai Tucson",
    date: "2024/06/03",
    status: "completed",
    cost: "₮120,000",
  },
  {
    id: 5,
    type: "Жилийн иж бүрэн үйлчилгээ",
    car: "Toyota Camry",
    date: "2024/03/12",
    status: "completed",
    cost: "₮380,000",
  },
  {
    id: 6,
    type: "Тос, шүүлтүүр солих",
    car: "Mitsubishi Outlander",
    date: "2024/01/20",
    status: "completed",
    cost: "₮85,000",
  },
];

const statusBorder: Record<string, string> = {
  confirmed: "text-green-400 bg-green-400/10 border-green-400/20",
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  completed: "text-white/40 bg-white/5 border-white/10",
};

const statusLabel: Record<string, string> = {
  confirmed: "Батлагдсан",
  pending: "Хүлээгдэж байна",
  completed: "Дууссан",
};

export default function AppointmentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    car: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!formData.car || !formData.service || !formData.date) return;
    setSubmitted(true);
    setShowForm(false);
    setFormData({ car: "", service: "", date: "", time: "", notes: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Гарчиг */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-white font-black text-3xl uppercase tracking-widest">
            Цаг товлолт
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Засварын хуваарийг удирдах
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#E31B23] text-white text-sm font-medium rounded-md hover:bg-[#c41620] transition-all"
        >
          + Цаг товлох
        </button>
      </div>

      {/* Амжилтын мэдэгдэл */}
      {submitted && (
        <div className="mb-6 bg-green-400/10 border border-green-400/20 rounded-md px-4 py-3 text-green-400 text-sm">
          ✓ Цаг товлолтын хүсэлт илгээгдлээ! 24 цагийн дотор баталгаажуулна.
        </div>
      )}

      {/* Товлолтын маягт */}
      {showForm && (
        <div className="bg-[#111111] border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
            Шинэ цаг товлолт
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
                Машин сонгох
              </label>
              <select
                value={formData.car}
                onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#E31B23]/50 transition-colors"
              >
                <option value="">Машин сонгоно уу...</option>
                {userCars.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
                Үйлчилгээний төрөл
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#E31B23]/50 transition-colors"
              >
                <option value="">Үйлчилгээ сонгоно уу...</option>
                {serviceTypes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
                Огноо
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#E31B23]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
                Цаг
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#E31B23]/50 transition-colors"
              >
                <option value="">Цаг сонгоно уу...</option>
                {["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
                Нэмэлт тайлбар (заавал биш)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Тусгай хүсэлт эсвэл асуудлын тайлбар..."
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#E31B23]/50 transition-colors resize-none placeholder:text-white/20"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-[#E31B23] text-white text-sm font-medium rounded-md hover:bg-[#c41620] transition-all"
            >
              Хүсэлт илгээх
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 border border-white/10 text-white/50 text-sm rounded-md hover:bg-white/5 transition-all"
            >
              Цуцлах
            </button>
          </div>
        </div>
      )}

      {/* Ойрын товлолтууд */}
      <div className="mb-8">
        <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
          Ойрын товлолтууд
        </h2>
        {upcomingAppointments.length === 0 ? (
          <div className="bg-[#111111] border border-white/5 rounded-lg p-8 text-center">
            <p className="text-white/30 text-sm">Цаг товлолт байхгүй.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingAppointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-[#111111] border border-white/5 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-md flex items-center justify-center border ${
                      appt.status === "confirmed"
                        ? "border-green-400/20 bg-green-400/10 text-green-400"
                        : "border-yellow-400/20 bg-yellow-400/10 text-yellow-400"
                    }`}
                  >
                    📅
                  </div>
                  <div>
                    <p className="text-white font-medium">{appt.type}</p>
                    <p className="text-white/40 text-sm mt-0.5">{appt.car}</p>
                    <p className="text-white/20 text-xs mt-0.5">
                      Механик: {appt.mechanic}
                    </p>
                    {appt.notes && (
                      <p className="text-white/20 text-xs mt-1 italic">{appt.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-white text-sm">{appt.date}</p>
                    <p className="text-white/40 text-xs">{appt.time}</p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium ${statusBorder[appt.status]}`}
                  >
                    {statusLabel[appt.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Засварын түүх */}
      <div>
        <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
          Засварын түүх
        </h2>
        <div className="bg-[#111111] border border-white/5 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-white/30 text-xs uppercase tracking-widest font-medium">Үйлчилгээ</th>
                <th className="text-left px-5 py-3 text-white/30 text-xs uppercase tracking-widest font-medium">Машин</th>
                <th className="text-left px-5 py-3 text-white/30 text-xs uppercase tracking-widest font-medium">Огноо</th>
                <th className="text-right px-5 py-3 text-white/30 text-xs uppercase tracking-widest font-medium">Үнэ</th>
              </tr>
            </thead>
            <tbody>
              {pastAppointments.map((appt, i) => (
                <tr
                  key={appt.id}
                  className={`${i !== pastAppointments.length - 1 ? "border-b border-white/5" : ""} hover:bg-white/[0.02] transition-colors`}
                >
                  <td className="px-5 py-3 text-white text-sm">{appt.type}</td>
                  <td className="px-5 py-3 text-white/50 text-sm">{appt.car}</td>
                  <td className="px-5 py-3 text-white/50 text-sm">{appt.date}</td>
                  <td className="px-5 py-3 text-white text-sm text-right font-medium">{appt.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
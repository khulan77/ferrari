import Link from "next/link";
import {  Mail, MapPin, Phone } from "lucide-react";

const LINKS = {
  Үйлчилгээ: [
    { label: "ECU Tuning", href: "/services/ecu" },
    { label: "Хөдөлгүүр", href: "/services/engine" },
    { label: "Тоормос", href: "/services/brakes" },
    { label: "Аналитик", href: "/services/analytics" },
  ],
  Компани: [
    { label: "Бидний тухай", href: "/about" },
    { label: "Инженерүүд", href: "/mechanics" },
    { label: "Гараж", href: "/garage" },
    { label: "Ажлын байр", href: "/careers" },
  ],
  Дэмжлэг: [
    { label: "Цаг захиалах", href: "/booking" },
    { label: "Дэлгүүр", href: "/shop" },
    { label: "Баталгаа", href: "/warranty" },
    { label: "Холбоо барих", href: "/contact" },
  ],
};



export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.06] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 bg-[#F97316] rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-sm">P</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-white font-black text-lg tracking-tighter">PRECISION</span>
                <span className="text-[#F97316] font-black text-lg tracking-tighter">MOTO</span>
              </div>
            </div>

            <p className="text-white/30 text-sm leading-relaxed mb-8 max-w-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Өндөр хүчин чадалтай автомашины засвар, үйлчилгээний дээд зэрэглэлийн төв. Инженерийн төгс байдал.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              {[
                { icon: <MapPin size={12} />, text: "Улаанбаатар, Сүхбаатар дүүрэг" },
                { icon: <Phone size={12} />, text: "+976 7700 0000" },
                { icon: <Mail size={12} />, text: "info@precisionmoto.mn" },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-2.5 text-white/25">
                  <span className="text-[#F97316]/60 flex-shrink-0">{c.icon}</span>
                  <span className="text-xs">{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <p className="text-white text-[11px] font-black uppercase tracking-[0.25em] mb-5">
                {section}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/30 text-sm hover:text-[#F97316] transition-colors duration-200"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/[0.06] pt-10 mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-white font-black text-sm uppercase tracking-widest mb-1">Мэдэгдэл авах</p>
              <p className="text-white/25 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Шинэ бүтээгдэхүүн, үйлчилгээний мэдээллийг хүлээн авна уу
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                placeholder="И-мэйл хаяг..."
                className="flex-1 md:w-64 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#F97316]/30 transition-colors"
              />
              <button className="px-5 py-2.5 bg-[#F97316] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-colors flex-shrink-0">
                Бүртгэх
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/15 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            © 2024 Precision Moto. Бүх эрх хуулиар хамгаалагдсан.
          </p>

        </div>
      </div>
    </footer>
  );
}
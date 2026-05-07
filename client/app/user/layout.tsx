"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/user", label: "Хяналтын самбар", icon: "⬡" },
  { href: "/user/appointments", label: "Цаг товлолт", icon: "📅" },
  { href: "/user/parts", label: "Сэлбэг дэлгүүр", icon: "🔧" },
  { href: "/user/services", label: "Үйлчилгээнүүд", icon: "🚗" },
  { href: "/user/profile", label: "Профайл", icon: "👤" },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111111] border-r border-white/5 flex flex-col fixed h-full z-10">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/5">
          <span className="text-[#E31B23] font-black tracking-widest text-sm uppercase">
            Precision
          </span>
          <span className="text-white font-black tracking-widest text-sm uppercase ml-1">
            Moto
          </span>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E31B23]/20 border border-[#E31B23]/30 flex items-center justify-center">
              <span className="text-[#E31B23] text-xs font-bold">БД</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Батдорж</p>
              <p className="text-white/40 text-xs">Гишүүн</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/user"
                ? pathname === "/user"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#E31B23] text-white font-medium"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-white/30 hover:text-white/60 transition-all"
          >
            <span>←</span>
            Нүүр хуудас
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
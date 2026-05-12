"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X, Zap } from "lucide-react";

const NAV = [
  { label: "Дэлгүүр", href: "/shop" },
  { label: "Засварчид", href: "/mechanics" },
  { label: "Гараж", href: "/garage" },
  { label: "Аналитик", href: "/analytics" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 bg-[#F97316] rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow">
              <span className="text-black font-black text-sm tracking-tighter">P</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-black text-lg tracking-tighter">PRECISION</span>
              <span className="text-[#F97316] font-black text-lg tracking-tighter">MOTO</span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-[13px] font-semibold text-white/50 hover:text-white uppercase tracking-widest transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-[#F97316] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search */}
            <div className={`hidden md:flex items-center transition-all duration-300 ${searchOpen ? "w-56" : "w-40"}`}>
              <div className="relative w-full">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => setSearchOpen(false)}
                  placeholder="Сэлбэг хайх..."
                  className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-white/25 focus:outline-none focus:border-[#F97316]/40 focus:bg-white/[0.08] transition-all"
                />
              </div>
            </div>

            {/* Cart */}
            <button className="relative w-9 h-9 flex items-center justify-center text-white/50 hover:text-white transition-colors group">
              <ShoppingCart size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#F97316] rounded-full text-[9px] font-black text-black flex items-center justify-center">
                3
              </span>
            </button>

            {/* Admin badge */}
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#F97316]/10 border border-[#F97316]/20 rounded-lg text-[#F97316] text-xs font-black uppercase tracking-widest hover:bg-[#F97316]/20 transition-colors"
            >
              <Zap size={11} />
              Admin
            </Link>

            {/* Login */}
            <Link
              href="/login"
              className="hidden md:block px-4 py-2 bg-white text-black text-xs font-black uppercase tracking-widest rounded-lg hover:bg-[#F97316] transition-colors duration-200"
            >
              Нэвтрэх
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-xl flex flex-col pt-24 px-6">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-4 text-2xl font-black uppercase tracking-tight text-white/60 hover:text-white border-b border-white/[0.06] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/login" className="w-full py-3.5 bg-[#F97316] text-black font-black uppercase tracking-widest text-sm rounded-xl text-center">
              Нэвтрэх
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
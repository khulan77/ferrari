"use client";

import Link from "next/link";
import { ShoppingCart, ArrowRight, Zap } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Carbon Fiber Stage 2 Intake",
    category: "Оролтын систем",
    price: 2499,
    badge: "Бэлэн байгаа",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/15",
    hot: false,
  },
  {
    id: 2,
    name: "Titanium Valved Exhaust",
    category: "Яндангийн систем",
    price: 5850,
    badge: "Цөөн байгаа",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/15",
    hot: true,
  },
  {
    id: 3,
    name: "Track-Spec Adjustable Coilovers",
    category: "Амортизатор",
    price: 3200,
    badge: "Дууссан",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/15",
    hot: false,
    soldOut: true,
  },
  {
    id: 4,
    name: "Forged Lightweight Piston Set",
    category: "Хөдөлгүүрийн эд анги",
    price: 1950,
    badge: "Бэлэн байгаа",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/15",
    hot: false,
  },
];

const fmt = (n: number) => `$${n.toLocaleString()}.00`;

export default function ShopSection() {
  return (
    <section className="bg-[#080808] py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#F97316] text-[11px] font-black uppercase tracking-[0.35em] mb-3">
              Сэлбэг & Тос (Shop)
            </p>
            <h2
              className="text-white font-black text-[clamp(28px,4vw,48px)] tracking-tight leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              ШИЛДЭГ БҮТЭЭГДЭХҮҮН
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-white/30 text-xs font-black uppercase tracking-widest hover:text-[#F97316] transition-colors"
          >
            Бүх бараг үзэх <ArrowRight size={13} />
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className={`group relative bg-[#0f0f0f] border rounded-2xl overflow-hidden transition-all duration-300 ${
                product.soldOut
                  ? "border-rose-500/20"
                  : "border-white/[0.06] hover:border-[#F97316]/25 hover:-translate-y-1"
              }`}
            >
              {/* Image area */}
              <div className="relative h-44 bg-[#111] flex items-center justify-center overflow-hidden">
                {/* Placeholder graphic */}
                <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  product.soldOut ? "border-rose-500/20" : "border-[#F97316]/20 group-hover:border-[#F97316]/50"
                }`}>
                  <ShoppingCart size={22} className={product.soldOut ? "text-rose-500/30" : "text-[#F97316]/40 group-hover:text-[#F97316]"} />
                </div>

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest border ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                </div>

                {/* Hot badge */}
                {product.hot && (
                  <div className="absolute top-3 right-3 w-7 h-7 bg-[#F97316] rounded-full flex items-center justify-center">
                    <Zap size={12} className="text-black" fill="currentColor" />
                  </div>
                )}

                {/* Overlay on hover */}
                {!product.soldOut && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F97316]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1.5">
                  {product.category}
                </p>
                <h3
                  className="text-white font-black text-sm leading-snug mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {product.name.toUpperCase()}
                </h3>
                <div className="flex items-center justify-between">
                  <span
                    className={`font-black text-lg ${product.soldOut ? "text-white/20 line-through" : "text-[#F97316]"}`}
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {fmt(product.price)}
                  </span>
                  <button
                    disabled={product.soldOut}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      product.soldOut
                        ? "bg-white/[0.03] cursor-not-allowed"
                        : "bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] hover:bg-[#F97316] hover:text-black"
                    }`}
                  >
                    <ShoppingCart size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden mt-6 text-center">
          <Link href="/shop" className="text-[#F97316] text-xs font-black uppercase tracking-widest hover:underline">
            Бүх бараг үзэх →
          </Link>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";

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

const categories = ["Бүгд", "Хөдөлгүүр", "Тоормос", "Түдгэлзүүр", "Ялгаруулагч", "Дугуй", "Цахилгаан"];

const parts: Part[] = [
  {
    id: 1,
    name: "Бүрэн нийлэг тосны иж бүрдэл",
    brand: "Mobil 1 Full Synthetic",
    category: "Хөдөлгүүр",
    price: "₮85,000",
    priceNum: 85000,
    compatibility: ["Toyota Camry", "Hyundai Tucson"],
    inStock: true,
    badge: "Эрэлттэй",
  },
  {
    id: 2,
    name: "Агаарын шүүлтүүр",
    brand: "Mann Filter",
    category: "Хөдөлгүүр",
    price: "₮38,000",
    priceNum: 38000,
    compatibility: ["Toyota Camry", "Mitsubishi Outlander"],
    inStock: true,
  },
  {
    id: 3,
    name: "Хөдөлгүүрийн гэрэл дамжуулагч",
    brand: "NGK",
    category: "Хөдөлгүүр",
    price: "₮62,000",
    priceNum: 62000,
    compatibility: ["Hyundai Tucson", "Toyota Camry"],
    inStock: true,
    badge: "Шинэ",
  },
  {
    id: 4,
    name: "Тоормосны бүрхэвч — урд",
    brand: "Brembo",
    category: "Тоормос",
    price: "₮145,000",
    priceNum: 145000,
    compatibility: ["Toyota Camry", "Hyundai Tucson"],
    inStock: true,
    badge: "Чанарын",
  },
  {
    id: 5,
    name: "Тоормосны диск — арын",
    brand: "Brembo",
    category: "Тоормос",
    price: "₮198,000",
    priceNum: 198000,
    compatibility: ["Mitsubishi Outlander"],
    inStock: false,
  },
  {
    id: 6,
    name: "Түдгэлзүүрийн тулгуур",
    brand: "KYB Excel-G",
    category: "Түдгэлзүүр",
    price: "₮320,000",
    priceNum: 320000,
    compatibility: ["Hyundai Tucson", "Mitsubishi Outlander"],
    inStock: true,
  },
  {
    id: 7,
    name: "Michelin Primacy 4 — 205/55R16",
    brand: "Michelin",
    category: "Дугуй",
    price: "₮285,000",
    priceNum: 285000,
    compatibility: ["Toyota Camry", "Hyundai Tucson"],
    inStock: true,
    badge: "Эрэлттэй",
  },
  {
    id: 8,
    name: "Аккумлятор 60Ah",
    brand: "Bosch Silver",
    category: "Цахилгаан",
    price: "₮195,000",
    priceNum: 195000,
    compatibility: ["Toyota Camry", "Hyundai Tucson", "Mitsubishi Outlander"],
    inStock: true,
  },
  {
    id: 9,
    name: "Хөргөлтийн шингэн 5L",
    brand: "Toyota Genuine",
    category: "Хөдөлгүүр",
    price: "₮45,000",
    priceNum: 45000,
    compatibility: ["Toyota Camry"],
    inStock: true,
  },
  {
    id: 10,
    name: "Жолооны хүч дамжуулах бүс",
    brand: "Gates",
    category: "Хөдөлгүүр",
    price: "₮78,000",
    priceNum: 78000,
    compatibility: ["Hyundai Tucson", "Mitsubishi Outlander"],
    inStock: false,
  },
];

const badgeStyle: Record<string, string> = {
  Эрэлттэй: "bg-[#E31B23]/10 text-[#E31B23] border border-[#E31B23]/20",
  Шинэ: "bg-blue-400/10 text-blue-400 border border-blue-400/20",
  Чанарын: "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20",
};

const myOrders = [
  {
    id: "ЗАХ-2401",
    item: "Бүрэн нийлэг тосны иж бүрдэл",
    date: "10/10",
    status: "Хүргэгдсэн",
    total: "₮85,000",
  },
  {
    id: "ЗАХ-2389",
    item: "Тоормосны бүрхэвч — урд",
    date: "10/05",
    status: "Боловсруулж байна",
    total: "₮145,000",
  },
  {
    id: "ЗАХ-2371",
    item: "Агаарын шүүлтүүр",
    date: "09/28",
    status: "Хүргэгдсэн",
    total: "₮38,000",
  },
  {
    id: "ЗАХ-2355",
    item: "Michelin Primacy 4 x2",
    date: "09/10",
    status: "Хүргэгдсэн",
    total: "₮570,000",
  },
];

export default function PartsShopPage() {
  const [activeCategory, setActiveCategory] = useState("Бүгд");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [tab, setTab] = useState<"shop" | "orders">("shop");

  const filtered = parts.filter((p) => {
    const matchCat = activeCategory === "Бүгд" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (id: number) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const cartTotal = parts
    .filter((p) => cart.includes(p.id))
    .reduce((sum, p) => sum + p.priceNum, 0);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Гарчиг */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-white font-black text-3xl uppercase tracking-widest">
            Сэлбэг дэлгүүр
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Таны машинд зориулсан сэлбэг, материалууд
          </p>
        </div>
      </div>

      {/* Табууд */}
      <div className="flex gap-1 mb-6 bg-[#111111] border border-white/5 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("shop")}
          className={`px-4 py-2 text-sm rounded-md transition-all ${
            tab === "shop"
              ? "bg-[#E31B23] text-white font-medium"
              : "text-white/40 hover:text-white"
          }`}
        >
          Сэлбэг харах
        </button>
        <button
          onClick={() => setTab("orders")}
          className={`px-4 py-2 text-sm rounded-md transition-all ${
            tab === "orders"
              ? "bg-[#E31B23] text-white font-medium"
              : "text-white/40 hover:text-white"
          }`}
        >
          Миний захиалгууд
        </button>
      </div>

      {tab === "shop" ? (
        <>
          {/* Сагсны мэдэгдэл */}
          {cart.length > 0 && (
            <div className="mb-6 bg-[#E31B23]/10 border border-[#E31B23]/20 rounded-lg p-4 flex items-center justify-between">
              <p className="text-[#E31B23] text-sm font-medium">
                {cart.length} бараа сагсанд байна ·{" "}
                <span className="text-white">
                  ₮{cartTotal.toLocaleString()}
                </span>
              </p>
              <button className="px-4 py-1.5 bg-[#E31B23] text-white text-sm rounded-md hover:bg-[#c41620] transition-all">
                Захиалах →
              </button>
            </div>
          )}

          {/* Хайлт + Ангилал */}
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

          {/* Сэлбэгийн grid */}
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
                      <span className="text-xs text-white/20 bg-white/5 px-2 py-0.5 rounded-full">
                        Дууссан
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-white font-medium leading-snug">{part.name}</p>
                    <p className="text-white/40 text-sm mt-0.5">{part.brand}</p>
                    <p className="text-white/20 text-xs mt-2">
                      Тохирох: {part.compatibility.join(", ")}
                    </p>
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
        /* Захиалгын таб */
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
                <tr
                  key={order.id}
                  className={`${i !== myOrders.length - 1 ? "border-b border-white/5" : ""} hover:bg-white/[0.02] transition-colors`}
                >
                  <td className="px-5 py-4 text-white/40 text-sm font-mono">{order.id}</td>
                  <td className="px-5 py-4 text-white text-sm">{order.item}</td>
                  <td className="px-5 py-4 text-white/40 text-sm">{order.date}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        order.status === "Хүргэгдсэн"
                          ? "bg-green-400/10 text-green-400"
                          : "bg-blue-400/10 text-blue-400"
                      }`}
                    >
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
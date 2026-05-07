"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart2,
  FileText,
  Settings,
  HelpCircle,
  FileBarChart,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Inventory", icon: Package, href: "/admin/inventory" },
  { label: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  { label: "Customers", icon: Users, href: "/admin/customers" },
  { label: "Analytics", icon: BarChart2, href: "/admin/analytics" },
  { label: "Reports", icon: FileText, href: "/admin/reports" },
];

const bottomItems = [
  { label: "Settings", icon: Settings, href: "/admin/settings" },
  { label: "Support", icon: HelpCircle, href: "/admin/support" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-42 min-h-screen bg-[#0f0f0f] border-r border-[#1e1e1e] flex flex-col fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#1e1e1e]">
        <p className="text-[10px] font-bold tracking-widest text-white uppercase">
          Admin Console
        </p>
        <p className="text-[8px] tracking-widest text-gray-600 uppercase mt-0.5">
          Management Suite
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-2.5 text-[11px] tracking-widest uppercase transition-colors relative ${
                active
                  ? "text-white bg-[#1a1a1a]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-0 h-full w-0.5 bg-red-600" />
              )}
              <item.icon
                size={13}
                className={active ? "text-red-500" : "text-gray-600"}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Generate Report */}
      <div className="px-4 py-3">
        <button className="w-full bg-red-600 hover:bg-red-700 text-white text-[9px] tracking-widest uppercase py-2.5 rounded-sm font-bold transition-colors flex items-center justify-center gap-2">
          <FileBarChart size={11} />
          Generate Report
        </button>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-[#1e1e1e] py-3">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-5 py-2 text-[11px] tracking-widest uppercase text-gray-500 hover:text-gray-300 transition-colors"
          >
            <item.icon size={13} className="text-gray-600" />
            {item.label}
          </Link>
        ))}
      </div>

      {/* User */}
      <div className="px-4 py-3 border-t border-[#1e1e1e] flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0">
          <span className="text-[8px] text-gray-300 font-bold">CE</span>
        </div>
        <div>
          <p className="text-[10px] text-white font-semibold tracking-wide">
            Chief Engineer
          </p>
          <p className="text-[8px] text-gray-600 tracking-widest uppercase">
            Super Admin
          </p>
        </div>
      </div>
    </aside>
  );
}

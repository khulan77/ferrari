import { Sidebar } from "./components/Sidebar";
import { Search, Bell, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#111111]">
      <Sidebar />

      {/* Main content */}
      <div className="ml-[168px] flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-12 border-b border-[#1e1e1e] flex items-center justify-between px-6 sticky top-0 bg-[#111111] z-40">
          {/* Brand */}
          <p className="text-sm font-black tracking-widest text-red-500 uppercase">
            Precision Performance
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-white transition-colors">
              <Search size={15} />
            </button>
            <button className="text-gray-500 hover:text-white transition-colors">
              <Bell size={15} />
            </button>
            <button className="text-gray-500 hover:text-white transition-colors">
              <Settings size={15} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-[#1e1e1e] px-6 py-4 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-white uppercase">
              Precision Moto
            </p>
            <p className="text-[8px] text-gray-600 tracking-wide mt-0.5">
              © 2024 Precision Moto. High Performance Automotive.
            </p>
          </div>
          <div className="flex gap-6">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Shipping",
              "Returns",
              "Contact",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[9px] text-gray-500 hover:text-white tracking-wide transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

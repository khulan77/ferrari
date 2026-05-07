import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/10">
        <div className="text-[#e63231] font-bold tracking-tighter text-xl">
          PRECISION PERFORMANCE
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/services" className="hover:text-white transition">Services</Link>
          <Link href="/parts" className="hover:text-white transition">Parts</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/user" className="text-sm border border-white/20 px-5 py-2 hover:bg-white hover:text-black transition">
            User Dashboard
          </Link>
          <Link href="/admin" className="text-sm bg-[#e63231] px-5 py-2 hover:bg-[#c12625] transition">
            Admin Panel
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
           {/* Энд машины сүүдэр эсвэл гоё background зураг байж болно */}
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl">
          <h2 className="text-[#e63231] text-xs font-bold tracking-[0.3em] uppercase">
            Excellence in Motion
          </h2>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
            PRECISION <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              PERFORMANCE.
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            High-end automotive maintenance and precision tuning for the next generation of supercars.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-10">
            <Link href="/user" className="w-full md:w-auto bg-[#e63231] text-white px-10 py-4 font-bold text-sm hover:scale-105 transition-transform">
              GET STARTED
            </Link>
            <Link href="/services" className="w-full md:w-auto border border-white/20 px-10 py-4 font-bold text-sm hover:bg-white/10 transition">
              VIEW SERVICES
            </Link>
          </div>
        </div>
      </main>

      {/* Доор нь үйлчилгээнүүдийн картуудыг нэмж болно */}
    </div>
  );
}
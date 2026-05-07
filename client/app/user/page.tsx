import Hero from "./components/Hero";
// Services болон бусад компонентуудаа хийснийхээ дараа энд import хийнэ

export default function UserHomePage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {/* 1. Hero Section - Түрүүний бичсэн Framer Motion-той хэсэг */}
      <Hero />

      {/* 2. Services Section - Үйлчилгээнүүдийн жагсаалт */}
      <section className="py-24 px-6 container mx-auto">
        <div className="flex flex-col mb-12">
          <h2 className="text-[#E31B23] font-bold tracking-widest uppercase text-sm mb-2">
            Our Expertise
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase">
            Specialized Services
          </h3>
        </div>
        
        {/* Энд Services компонентоо байршуулна */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Түр зуур хоосон картууд үүсгэж үзье */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-[#141414] border border-white/5 p-8 h-64 hover:border-[#E31B23]/50 transition-all group">
               <div className="w-12 h-[2px] bg-[#E31B23] mb-6 group-hover:w-full transition-all duration-500"></div>
               <h4 className="text-xl font-bold text-white mb-4">Performance Tuning</h4>
               <p className="text-gray-500">Engine remapping and mechanical adjustments for maximum torque.</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Call to Action / Booking Section */}
      <section className="py-20 bg-[#E31B23]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-8">
            Ready to enhance <br /> your drive?
          </h2>
          <button className="bg-black text-white px-12 py-5 font-bold uppercase tracking-tighter hover:bg-white hover:text-black transition-all">
            Schedule a Service
          </button>
        </div>
      </section>
    </main>
  );
}
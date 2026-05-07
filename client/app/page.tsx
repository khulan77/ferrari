import Hero from "./user/components/Hero";
// Хэрэв Services компонентоо тусад нь салгасан бол энд импортлоно

export default function LandingPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Hero />

      <section className="py-20 px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-[#E31B23] font-bold tracking-widest uppercase text-sm mb-4">
              Our Philosophy
            </h2>
            <h3 className="text-4xl font-black text-white uppercase mb-6">
              Where Precision <br /> Meets Passion
            </h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Every curve, every bolt, and every tune-up is handled with the 
              utmost care. We don't just fix cars; we optimize your driving 
              experience to reach peak performance.
            </p>
            <button className="border-b-2 border-[#E31B23] text-white font-bold py-2 hover:text-[#E31B23] transition-colors">
              Learn More About Our Process
            </button>
          </div>
          
          <div className="relative h-[400px] bg-[#141414] border border-white/5 overflow-hidden">
             {/* Энд нэмэлт зураг эсвэл видео байрлуулж болно */}
             <div className="absolute inset-0 flex items-center justify-center text-white/10 text-8xl font-black">
               AUTO
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
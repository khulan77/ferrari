"use client"; // Motion ашиглах тул заавал "use client" бичнэ
import { motion } from "framer-motion";

export default function Hero() {
  // Элементүүд орж ирэх хувилбарууд (variants)
  const fadeInRight = {
    hidden: { opacity: 0, x: -50 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center bg-[#0a0a0a]">
      {/* 1. Background Image - Зөөлөн томорч харагдах эффект */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/hero-car.jpg')" }} // Өөрийн зургийн замыг тавиарай
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
      </motion.div>

      {/* 2. Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Улаан дэд гарчиг */}
          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
      
            className="text-[#E31B23] font-bold tracking-[0.3em] mb-4 uppercase text-sm"
          >
            Precision Performance
          </motion.p>

          {/* Үндсэн том гарчиг */}
          <motion.h1
            custom={2}
            initial="hidden"
            animate="visible"
           
            className="text-6xl md:text-8xl font-black text-white mb-6 uppercase leading-none"
          >
            Engineered <br />
            <span className="text-white/40 italic">for Power</span>
          </motion.h1>

          {/* Тайлбар текст */}
          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            
            className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed"
          >
            Experience unparalleled automotive excellence. Our specialized 
            technicians ensure your high-performance vehicle runs at its peak.
          </motion.p>

          {/* Товчлуурууд */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
           
            className="flex flex-wrap gap-5"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#E31B23] text-white px-10 py-4 font-bold uppercase tracking-wider transition-colors hover:bg-red-700"
            >
              Book Appointment
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 text-white px-10 py-4 font-bold uppercase tracking-wider transition-all"
            >
              Our Services
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Доошоо заасан хөдөлгөөнтэй дүрс */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </motion.div>
    </section>
  );
}
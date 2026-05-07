import React from 'react'

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden flex items-center">
      {/* 1. Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/images/hero-car.jpg')" }} // Машины зургаа public/images дотор хийгээрэй
      >
        {/* Зургийг арай бараан болгох overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 2. Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-[#E31B23] font-bold tracking-widest mb-2 uppercase">
            Precision Performance
          </h2>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase leading-tight">
            Engineered <br /> 
            <span className="text-white/80">for Power</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-lg">
            High-end automotive services for luxury and performance vehicles. 
            Experience the next level of precision.
          </p>
          
          <div className="flex gap-4">
            <button className="bg-[#E31B23] text-white px-8 py-4 font-bold uppercase hover:bg-red-700 transition">
              Book Appointment
            </button>
            <button className="border border-white/30 text-white px-8 py-4 font-bold uppercase hover:bg-white/10 transition">
              View Specs
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
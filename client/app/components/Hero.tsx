import React from 'react';
import { Search, ShoppingCart, ArrowRight,ChevronRight } from 'lucide-react';

const HeroSection = () => {
  return (
  <main className="max-w-7xl mx-auto px-12 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-[0.3em]">Инженерийн төгс байдал</p>
            <h1 className="text-7xl font-light leading-[1.1]">
              <i className="font-serif italic block">PRECISION</i>
              <span className="text-orange-500 font-black block mt-2">PERFORMANCE</span>
              <i className="font-serif italic block mt-2">ENGINEERING</i>
            </h1>
            
            <p className="text-gray-400 max-w-md leading-relaxed text-sm font-light">
              Өндөр хүчин чадалтай автомашины засвар, үйлчилгээний дээд зэрэглэлийн төв. 
              Шилдэг инженерүүд орчин үеийн оношилгооны төхөөрөмжөөр таны машины 
              бүрэн хүчин чадлыг нээх болно.
            </p>

            <div className="flex gap-4 pt-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 px-8 rounded-full flex items-center gap-2 transition-transform active:scale-95 text-xs uppercase tracking-widest">
                Цаг захиалах <ChevronRight className="w-4 h-4" />
              </button>
              <button className="border border-gray-700 hover:bg-white/5 py-4 px-8 rounded-full text-xs uppercase tracking-widest transition-colors font-bold">
                Сэлбэг харах
              </button>
            </div>
          </div>

          {/* Right Cards */}
          <div className="flex gap-4 h-[400px]">
            <div className="flex-1 bg-[#111] rounded-2xl border border-white/5 p-6 relative overflow-hidden group">
              <div className="absolute bottom-6 left-6">
                <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest mb-1">Aerodynamics</p>
                <div className="w-32 h-[2px] bg-gray-800">
                  <div className="w-2/3 h-full bg-orange-500"></div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex-1 bg-[#111] rounded-2xl border border-white/5 p-8">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mb-4">Stage 3</p>
                <h3 className="text-xl font-bold tracking-tight">ECU TUNING</h3>
              </div>
              <div className="flex-1 bg-[#111] rounded-2xl border border-white/5 flex items-center justify-center p-8">
                <div className="relative w-20 h-20 border-2 border-gray-800 rounded-full flex items-center justify-center">
                   <div className="absolute inset-0 border-2 border-orange-500 rounded-full border-t-transparent animate-spin-slow"></div>
                   <div className="w-12 h-12 bg-orange-500/10 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-4 gap-8 mt-32 py-10 border-t border-white/5">
          <div>
            <p className="text-[10px] text-orange-500 font-bold uppercase mb-1">Хүчин чадал</p>
            <p className="text-sm font-medium">Дунджаар +15-20%</p>
          </div>
          <div>
            <p className="text-[10px] text-orange-500 font-bold uppercase mb-1">Үйлчилгээний нарийвчлал</p>
            <p className="text-sm font-medium">99.8% БАТАЛГААТАЙ</p>
          </div>
          <div>
            <p className="text-[10px] text-orange-500 font-bold uppercase mb-1">Мэргэшсэн инженерүүд</p>
            <p className="text-sm font-medium">42 МЭРГЭЖИЛТЭН</p>
          </div>
          <div>
            <p className="text-[10px] text-orange-500 font-bold uppercase mb-1">Баталгаат хугацаа</p>
            <p className="text-sm font-medium">БҮХ НАСНЫ БАТАЛГАА</p>
          </div>
        </div>
      </main>
  );
}

export default HeroSection;
"use client";

export function HeroBanner() {
  return (
    <div className="mx-6 mb-6 relative rounded-sm overflow-hidden min-h-[280px] flex items-end">
      {/* Dark overlay background (replace bg with actual image via CSS/next/image) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%)",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-8">
        <p className="text-[9px] tracking-[0.3em] text-red-500 uppercase mb-3">
          Engineering Excellence
        </p>
        <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none mb-4">
          Uncompromising Precision.
        </h2>
        <p className="text-sm text-gray-400 max-w-md leading-relaxed">
          Every component, every service, and every diagnostic is executed to
          the highest standards of automotive engineering. Our facility is the
          intersection of passion and technical mastery.
        </p>
      </div>
    </div>
  );
}
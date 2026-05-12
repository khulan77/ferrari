// app/page.tsx  (эсвэл app/(public)/page.tsx)
// Google Fonts-ийг layout.tsx дотор нэмнэ үү — доор харуулсан
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServiceIntroSection from "./components/ServiceIntroSection";
import ShopSection from "./components/ShopSection";
import MechanicsSection from "./components/MechanicsSection";
import BookingSection from "./components/BookingSection";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="bg-[#080808]">
      <Header />
      <Hero />
      <ServiceIntroSection />
      <ShopSection />
      <MechanicsSection />
      <BookingSection />
      <Footer />
    </main>
  );
}

/*
─────────────────────────────────────────
  layout.tsx дотор font нэмэх:
─────────────────────────────────────────

import { Barlow_Condensed, DM_Sans } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="mn" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body className="bg-[#080808] antialiased">
        {children}
      </body>
    </html>
  );
}

─────────────────────────────────────────
  tailwind.config.ts дотор:
─────────────────────────────────────────

theme: {
  extend: {
    fontFamily: {
      barlow: ["var(--font-barlow)", "sans-serif"],
      dm: ["var(--font-dm)", "sans-serif"],
    },
  },
},
*/
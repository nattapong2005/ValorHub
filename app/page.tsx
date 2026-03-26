import Link from "next/link";
import Image from "next/image";
import { getAgents } from "@/lib/api";

import CategoryCard from "@/components/CategoryCard";
import HeroSection from "@/components/HeroSection";

export default async function Home() {
  const agents = await getAgents();
  const featuredAgents = agents.slice(0, 4);

  const categories = [
    { title: "เอเจนท์", href: "/agents", desc: "เรียกดูเอเจนท์ที่เล่นได้และความสามารถที่เป็นเอกลักษณ์", color: "text-accent" },
    { title: "บันเดิล", href: "/bundles", desc: "ติดตามคอลเลกชันสกินล่าสุด", color: "text-accent" },
    { title: "อาวุธ", href: "/weapons", desc: "ค้นพบทุกสกินอาวุธที่มีในเกม", color: "text-accent" },
    { title: "แผนที่", href: "/maps", desc: "สำรวจจุดยุทธศาสตร์ในสมรภูมิต่างๆ", color: "text-accent" },
    { title: "แรงก์", href: "/ranks", desc: "ดูอันดับแรงก์และคะแนนระดับต่างๆ", color: "text-accent" },
    { title: "โหมดเกม", href: "/modes", desc: "รูปแบบการเล่นที่หลากหลายใน Valorant", color: "text-accent" },
    { title: "อีเวนต์", href: "/events", desc: "ติดตามกิจกรรมและอีเวนต์พิเศษภายในเกม", color: "text-accent" },
  ];

  const features = [
    { title: "Minimal Design", desc: "ออกแบบมาเพื่อความเรียบง่าย ตัดสิ่งที่ไม่จำเป็นออก เพื่อให้คุณเข้าถึงข้อมูลที่ต้องการได้เร็วที่สุด" },
    { title: "Real-time Data", desc: "ข้อมูลส่งตรงจาก Valorant API เพื่อความแม่นยำและอัปเดตสม่ำเสมอ" },
    { title: "Responsive", desc: "รองรับการใช้งานทุกอุปกรณ์ ไม่ว่าจะเป็นมือถือ แท็บเล็ต หรือคอมพิวเตอร์" },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - Truly Full Width and Height */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-6 pb-20 md:pb-40">
        {/* Featured Agents Section */}
      <div className="mt-32 md:mt-40 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-accent font-bold text-xs md:text-sm tracking-[0.3em] uppercase">FEATURED AGENTS</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">ตัวอย่างเอเจนท์</h2>
          </div>
          <Link href="/agents" className="text-foreground/50 hover:text-accent transition-colors uppercase font-bold text-sm tracking-widest pb-2 border-b border-white/10 hover:border-accent">
            ดูทั้งหมด →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {featuredAgents.map((agent: any) => (
            <Link 
              key={agent.uuid} 
              href="/agents" 
              className="group relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/10 hover:border-accent/50 transition-all duration-500"
            >
              <Image
                src={agent.fullPortrait || agent.displayIcon}
                alt={agent.displayName}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-transform">{agent.displayName}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mt-32 md:mt-40 space-y-12">
        <div className="space-y-4">
          <span className="text-accent font-bold text-xs md:text-sm tracking-[0.3em] uppercase">DATABASE CATEGORIES</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter md:text-right">หมวดหมู่ทั้งหมด</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((item, i) => (
            <CategoryCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Why ValorHub / Features */}
      <div className="mt-32 md:mt-40 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="space-y-8 order-2 lg:order-1">
          <div className="space-y-4">
            <span className="text-accent font-bold text-xs md:text-sm tracking-[0.3em] uppercase">OUR PHILOSOPHY</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">ทำไมต้อง ValorHub?</h2>
          </div>
          <p className="text-base md:text-xl text-foreground/60 leading-relaxed font-light">
            เราเชื่อว่าข้อมูลที่ซับซ้อนควรถูกนำเสนออย่างเรียบง่ายที่สุด เพื่อให้ผู้เล่น Valorant 
            สามารถโฟกัสกับเกมเพลย์และการวางแผนได้อย่างเต็มที่
          </p>
          <div className="space-y-6 pt-4">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 md:gap-6 items-start">
                <div className="w-8 md:w-12 h-0.5 bg-accent mt-3 md:mt-4 shrink-0" />
                <div className="space-y-2">
                  <h4 className="text-base md:text-xl font-bold uppercase">{f.title}</h4>
                  <p className="text-foreground/50 font-light text-sm md:text-base">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative aspect-square order-1 lg:order-2 max-w-[280px] sm:max-w-md mx-auto lg:max-w-none w-full">
          <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse-gentle" />
          <div className="absolute inset-4 border border-accent/20 rounded-full animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <h2 className="text-8xl md:text-[12rem] font-black text-accent opacity-5 select-none transform scale-150 lg:scale-100">VH</h2>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/2 h-1/2 relative">
               <Image 
                src={agents[0]?.displayIcon} 
                alt="Logo" 
                fill 
                className="object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
               />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-32 md:mt-60 py-16 md:py-24 border-y border-white/10 text-center space-y-8 px-4">
        <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-none">พร้อมจะสำรวจหรือยัง?</h2>
        <p className="max-w-xl mx-auto text-foreground/50 text-sm md:text-lg font-light">
          เจาะลึกทุกรายละเอียดของเกมที่คุณรัก ค้นหาสกินที่ใช่ และเอเจนท์ที่ชอบได้แล้ววันนี้
        </p>
        <Link 
          href="/agents" 
          className="inline-block w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all hover:scale-105"
        >
          เริ่มต้นเลย
        </Link>
      </div>
      </div>
    </div>
  );
}

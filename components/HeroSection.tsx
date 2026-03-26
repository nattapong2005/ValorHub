"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />
})


export default function HeroSection() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-center relative z-10 mx-auto">
        {/* Left Side: Text Content */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative flex flex-col items-start text-left space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 z-10"
        >

          {/* Tagline Badge */}
          <motion.div
            style={{ transform: "translateZ(80px)" }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-accent/5 border border-accent/20 backdrop-blur-md shadow-[0_0_20px_rgba(255,70,85,0.1)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-green-400 text-[11px] font-black tracking-[0.25em] uppercase">SERVER ONLINE</span>
          </motion.div>

          {/* Typography */}
          <h1
            style={{ transform: "translateZ(50px)" }}
            className="text-5xl sm:text-7xl md:text-[6.5rem] font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 filter drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] select-none">
            VALOR<span className="relative inline-block ml-2">
              <span className="absolute -inset-2 bg-accent/20 blur-2xl rounded-full" />
              <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-accent to-[#ff7a85] drop-shadow-[0_0_20px_rgba(255,70,85,0.4)]">HUB</span>
            </span>
          </h1>

          <p
            style={{ transform: "translateZ(30px)" }}
            className="max-w-md text-base md:text-lg text-foreground/50 leading-relaxed font-light mt-6 pt-6 border-t border-white/5 relative">
            <span className="absolute top-0 left-0 w-20 h-0.5 bg-accent" />
            เข้าถึงแหล่งรวมข้อมูลเอเจนท์ สกินอาวุธ และบันเดิลล่าสุดของ Valorant
            ผ่านอินเทอร์เฟซที่เรียบหรูและรวดเร็วที่สุด
            <strong className="text-foreground/90 font-bold tracking-[0.1em] uppercase block mt-4 text-sm">
              Minimal. Seamless. Accurate.
            </strong>
          </p>

          {/* Call to Actions */}
          <div
            style={{ transform: "translateZ(70px)" }}
            className="flex flex-col sm:flex-row justify-start gap-6 pt-10 w-full sm:w-auto">

            <Link
              href="/agents"
              className="group relative px-10 py-5 bg-accent text-white font-black uppercase tracking-[0.2em] text-sm skew-x-[-15deg] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,70,85,0.2)] hover:shadow-[0_0_40px_rgba(255,70,85,0.5)] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <span className="inline-block skew-x-[15deg]">สำรวจเอเจนท์</span>
            </Link>

            <Link
              href="/weapons"
              className="group relative px-10 py-5 bg-transparent text-foreground font-black uppercase tracking-[0.2em] text-sm skew-x-[-15deg] transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-white/20 hover:border-white/60 hover:bg-white/5 flex items-center justify-center overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <span className="inline-block skew-x-[15deg]">ดูสกินอาวุธ</span>
            </Link>
          </div>
        </motion.div>

        {/* Right Side: 3D Scene */}
        <div className="relative h-[50vh] md:h-[75vh] w-full animate-in fade-in zoom-in duration-1000 delay-300">
          <Scene />
        </div>
      </div>
    </section>
  );
}

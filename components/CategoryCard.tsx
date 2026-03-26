"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface CategoryCardProps {
  item: {
    title: string;
    href: string;
    desc: string;
  };
  index: number;
}

export default function CategoryCard({ item, index }: CategoryCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["10deg", "-10deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-10deg", "10deg"]
  );

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
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="w-full"
    >
      <Link
        href={item.href}
        className="p-6 md:p-8 bg-white/[0.02] border border-white/10 hover:border-accent/50 transition-colors group relative overflow-hidden h-full flex flex-col"
        style={{ transform: "translateZ(8px)", transformStyle: "preserve-3d" }}
      >
        <div 
          className="relative z-10 space-y-4"
          style={{ transform: "translateZ(40px)" }}
        >
          <span className="text-accent font-bold text-sm tracking-widest uppercase">
            0{index + 1}
          </span>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:text-accent transition-colors">
            {item.title}
          </h3>
          <p className="text-foreground/50 font-light leading-relaxed text-sm md:text-base pr-8">
            {item.desc}
          </p>
        </div>
        <div 
          className="absolute top-0 right-0 p-6 md:p-8 text-accent/5 group-hover:text-accent/20 transition-colors pointer-events-none"
          style={{ transform: "translateZ(20px)" }}
        >
          <span className="text-7xl md:text-8xl font-black select-none">
            {index + 1}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

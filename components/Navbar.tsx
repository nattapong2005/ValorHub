"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Menu, X, Swords, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const categorizedLinks = [
  {
    label: "Game Content",
    links: [
      { name: "Agents", href: "/agents", desc: "Abilities & Roles" },
      { name: "Maps", href: "/maps", desc: "Tactical Overviews" },
      { name: "Modes", href: "/modes", desc: "Ways to Play" },
    ]
  },
  {
    label: "Competitive",
    links: [
      { name: "Ranks", href: "/ranks", desc: "Tier Progression" },
      { name: "Events", href: "/events", desc: "Special Missions" },
    ]
  },
  {
    label: "Collection",
    links: [
      { name: "Bundles", href: "/bundles", desc: "Latest Skins" },
      { name: "Weapons", href: "/weapons", desc: "Arsenal Data" },
      { name: "Cards", href: "/playercards", desc: "Identity Assets" },
    ]
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Handle scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group hidden sm:flex items-center gap-3 relative z-[110]"
        >
          <div className="relative">
            <div className="w-10 h-10 bg-accent transform -rotate-12 flex items-center justify-center transition-all duration-500 group-hover:rotate-0 group-hover:scale-110">
              <Swords className="text-white transition-transform duration-500 group-hover:scale-90" size={20} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white/20 transform rotate-45" />
          </div>
          <span className="text-2xl font-black tracking-[-0.05em] text-foreground uppercase hidden sm:block">
            VALOR<span className="text-accent">HUB</span>
          </span>
        </Link>

        {/* Desktop Links (Categorized Dropdowns) */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
          {/* Home Standalone */}
          <Link
            href="/"
            className={cn(
              "px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group truncate",
              pathname === "/" ? "text-accent" : "text-foreground/60 hover:text-foreground"
            )}
          >
            Home
            {pathname === "/" && <motion.div layoutId="nav-underline" className="absolute bottom-0 left-5 right-5 h-[2px] bg-accent" />}
          </Link>

          {categorizedLinks.map((cat) => (
            <div
              key={cat.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(cat.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={cn(
                  "px-5 py-2 text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 flex items-center gap-2 group",
                  activeDropdown === cat.label || cat.links.some(l => l.href === pathname) ? "text-accent" : "text-foreground/60 hover:text-foreground"
                )}
              >
                {cat.label}
                <ChevronDown size={12} className={cn("transition-transform duration-300", activeDropdown === cat.label && "rotate-180")} />
              </button> 

              <AnimatePresence>
                {activeDropdown === cat.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-64 bg-background/95 backdrop-blur-2xl border border-white/10 p-4 shadow-2xl rounded-sm backdrop-saturate-150"
                  >
                    <div className="space-y-1">
                      {cat.links.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={cn(
                            "flex flex-col p-3 transition-all duration-300 hover:bg-white/5 border-l-2 border-transparent hover:border-accent group/item",
                            pathname === link.href && "bg-white/5 border-accent"
                          )}
                        >
                          <span className={cn("text-xs font-black uppercase tracking-widest", pathname === link.href ? "text-accent" : "text-foreground group-hover/item:text-accent")}>
                            {link.name}
                          </span>
                          <span className="text-[9px] text-foreground/40 font-bold uppercase tracking-tight mt-1 transition-colors group-hover/item:text-accent/70">
                            {link.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right Section: Action & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="https://playvalorant.com"
            target="new"
            className="hidden md:flex px-6 py-2.5 bg-foreground text-background font-black text-[10px] uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all duration-500 skew-x-[-15deg] group border-r-4 border-accent/0 hover:border-accent"
          >
            <span className="inline-block skew-x-[15deg] group-hover:translate-x-1 transition-transform">
              Play Now
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Toggle Menu"
            className="lg:hidden relative z-[110] p-2 bg-white/5 border border-white/10 rounded-sm text-foreground/70 hover:text-accent transition-all active:scale-90"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-background lg:hidden flex flex-col transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-y-auto",
          isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-start min-h-screen gap-10 p-12 pt-32">
          {/* Home link for mobile */}
          <Link
            href="/"
            className={cn(
              "text-3xl font-black uppercase tracking-tight transition-all duration-500",
              pathname === "/" ? "text-accent" : "text-foreground/40"
            )}
          >
            Home
          </Link>

          {categorizedLinks.map((cat, i) => (
            <div key={cat.label} className="flex flex-col items-center gap-4 w-full">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/50">{cat.label}</span>
              <div className="flex flex-col items-center gap-4">
                {cat.links.map((link, j) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-2xl font-black uppercase tracking-tight transition-all duration-500 hover:text-accent",
                      pathname === link.href ? "text-accent" : "text-foreground/40",
                      isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
                    )}
                    style={{ transitionDelay: `${(i * 3 + j) * 40 + 200}ms` }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-10 mb-10 text-center opacity-20 text-[10px] font-bold uppercase tracking-[0.5em]">
            VALORHUB DATABASE PROJECT © 2024
          </div>
        </div>
      </div>
    </nav>
  );
}


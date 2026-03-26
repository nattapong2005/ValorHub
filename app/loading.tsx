export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="relative w-24 h-24 mb-8">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-2 border-white/5 rounded-full"></div>
        {/* Spinning Ring */}
        <div className="absolute inset-0 border-t-2 border-accent rounded-full animate-spin"></div>
        {/* Pulsing Logo/Shape */}
        <div className="absolute inset-4 bg-accent/20 rounded-full flex items-center justify-center animate-pulse-gentle">
          <div className="w-4 h-4 bg-accent rotate-45"></div>
        </div>
      </div>
      
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-black uppercase tracking-[0.2em] text-accent animate-pulse">
          กำลังโหลดข้อมูล
        </h2>
        <p className="text-foreground/30 text-xs uppercase tracking-[0.3em]">
          โปรดรอสักครู่...
        </p>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-12 h-[1px] bg-accent/20"></div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-12 h-[1px] bg-accent/20"></div>
    </div>
  );
}

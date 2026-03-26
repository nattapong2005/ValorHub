import Image from "next/image";
import { getEvents } from "@/lib/api";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <div className="mb-20">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-accent">อีเวนต์</h1>
        <p className="text-foreground/50 mt-4 max-w-xl text-lg font-light leading-relaxed">สำรวจและติดตามกิจกรรมพิเศษ รวมถึงอีเวนต์ต่างๆ ที่เกิดขึ้นในโลกของ Valorant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event: any) => (
          <div key={event.uuid} className="group relative p-10 bg-white/[0.02] border border-white/5 hover:border-accent/40 transition-all duration-500 flex flex-col items-start overflow-hidden">
             {/* Background glow when hover */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />
             
            <div className="relative z-10 space-y-4">
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground group-hover:text-accent transition-colors leading-none">
                {event.displayName}
              </h3>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Start Date</span>
                  <span className="text-foreground/60 text-sm font-mono">{new Date(event.startDate).toLocaleDateString('th-TH')}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-accent font-bold uppercase tracking-widest">End Date</span>
                  <span className="text-foreground/60 text-sm font-mono">{new Date(event.endDate).toLocaleDateString('th-TH')}</span>
                </div>
              </div>
              <p className="mt-8 text-foreground/40 text-sm font-light leading-relaxed border-t border-white/5 pt-6 max-w-md italic">
                {event.shortDescription || "ไม่มีรายละเอียดเพิ่มเติมสำหรับอีเวนต์นี้"}
              </p>
            </div>
            
            <div className="absolute bottom-6 right-10 text-[6rem] font-black text-white/[0.02] pointer-events-none select-none uppercase group-hover:text-accent/[0.02] transition-colors leading-none">
              VAL
            </div>
          </div>
        ))}
      </div>
      
      {events.length === 0 && (
        <div className="py-40 text-center">
            <h3 className="text-2xl font-bold opacity-30 uppercase tracking-[0.5em]">No Active Events Found</h3>
        </div>
      )}
    </div>
  );
}

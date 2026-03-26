import Image from "next/image";
import Link from "next/link";
import { getMap } from "@/lib/api";
import { ChevronLeft, MapPin } from "lucide-react";

export default async function MapDetailPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  const map = await getMap(uuid);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Back Button */}
      <Link 
        href="/maps" 
        className="inline-flex items-center gap-2 text-foreground/50 hover:text-accent transition-colors mb-12 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="uppercase font-bold tracking-widest text-sm">กลับไปหน้าแผนที่</span>
      </Link>

      <div className="space-y-16">
        {/* Header & Splash */}
        <div className="relative aspect-[21/9] w-full overflow-hidden border border-white/10 group">
          <Image
            src={map.splash}
            alt={map.displayName}
            fill
            className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-10 left-10">
            <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm mb-4">
              <MapPin size={16} />
              {map.coordinates || "ไม่ทราบพิกัด"}
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              {map.displayName}
            </h1>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Map View */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/[0.02] border border-white/10 p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/[0.02] uppercase italic pointer-events-none">
                LAYOUT
              </div>
              
              <h2 className="text-3xl font-black uppercase tracking-tight mb-8 flex items-center before:content-[''] before:w-8 before:h-1 before:bg-accent before:mr-4">
                ผังเมือง (Map Layout)
              </h2>
              
              <div className="relative aspect-square w-full max-w-2xl mx-auto bg-zinc-900/50 backdrop-blur-sm border border-white/5 p-8 transition-transform duration-700 group-hover:scale-[1.02]">
                {map.displayIcon ? (
                  <Image
                    src={map.displayIcon}
                    alt={`${map.displayName} Layout`}
                    fill
                    className="object-contain p-4 drop-shadow-[0_0_30px_rgba(255,70,85,0.2)]"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-foreground/20 uppercase font-bold tracking-widest">
                    ไม่พบข้อมูลผังเมือง
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-white/[0.02] border border-white/10 p-8">
              <h3 className="text-xl font-black uppercase tracking-tight mb-6 text-accent">ข้อมูลเบื้องต้น</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-foreground/30 uppercase text-xs font-bold tracking-widest mb-1">ชื่อเรียก</p>
                  <p className="text-2xl font-black uppercase">{map.displayName}</p>
                </div>
                <div>
                  <p className="text-foreground/30 uppercase text-xs font-bold tracking-widest mb-1">พิกัดทางภูมิศาสตร์</p>
                  <p className="text-lg font-medium text-foreground/80">{map.coordinates || "N/A"}</p>
                </div>
                {map.narrativeDescription && (
                  <div>
                    <p className="text-foreground/30 uppercase text-xs font-bold tracking-widest mb-1">คำอธิบาย</p>
                    <p className="text-foreground/60 leading-relaxed italic">
                      "{map.narrativeDescription}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tactical View - Decorative */}
            <div className="bg-accent/10 border border-accent/20 p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-accent">มุมมองยุทธศาสตร์</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  วิเคราะห์จุดวางระเบิดและเส้นทางการปะทะเพื่อสร้างความได้เปรียบในสมรภูมิ {map.displayName}
                </p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

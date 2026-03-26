import Image from "next/image";
import Link from "next/link";
import { getMaps } from "@/lib/api";

export default async function MapsPage() {
  const allMaps = await getMaps();
  // Filter out the tutorial map if it doesn't have a splash
  const maps = allMaps.filter((m: any) => m.splash);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-20">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-accent">แผนที่</h1>
        <p className="text-foreground/50 mt-4 max-w-xl">สำรวจสมรภูมิต่างๆ ใน Valorant แต่ละแผนที่มีจุดยุทธศาสตร์และกลยุทธ์ที่แตกต่างกัน</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {maps.map((map: any) => (
          <Link 
            key={map.uuid} 
            href={`/maps/${map.uuid}`}
            className="group relative overflow-hidden bg-white/[0.02] border border-white/10 aspect-[16/9]"
          >
            <Image
              src={map.splash}
              alt={map.displayName}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="text-xs font-bold tracking-widest text-accent uppercase mb-2 block">{map.coordinates || "ไม่ทราบพิกัด"}</span>
              <h3 className="text-4xl font-black uppercase tracking-tighter group-hover:text-accent transition-colors">{map.displayName}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

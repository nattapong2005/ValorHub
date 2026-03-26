import Image from "next/image";
import { getBundles } from "@/lib/api";

export default async function BundlesPage() {
  const allBundles = await getBundles();
  const bundles = allBundles.filter((b: any) => b.displayIcon).reverse();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-20">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-accent">บันเดิล</h1>
        <p className="text-foreground/50 mt-4 max-w-xl">คอลเลกชันบันเดิลสกิน Valorant ที่สมบูรณ์ ตั้งแต่ Prime สุดคลาสสิกไปจนถึงรุ่นล่าสุด</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {bundles.map((bundle: any) => (
          <div key={bundle.uuid} className="group overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-500 bg-white/[0.02]">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={bundle.displayIcon}
                alt={bundle.displayName}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8">
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">{bundle.displayName}</h3>
                <p className="text-foreground/50 mt-2 font-light uppercase tracking-[0.2em] text-xs">คอลเลกชัน</p>
              </div>
            </div>
            {bundle.description && (
              <div className="p-8 border-t border-white/10">
                <p className="text-foreground/60 text-sm leading-relaxed max-w-lg">{bundle.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

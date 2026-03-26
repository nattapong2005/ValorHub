import Image from "next/image";
import { getRanks } from "@/lib/api";

export default async function RanksPage() {
  const tierData = await getRanks();
  // Filter out tiers that don't have icons (like unranked placeholder with no icon)
  const tiers = tierData.tiers.filter((t: any) => t.largeIcon);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-20">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-accent">แรงก์</h1>
        <p className="text-foreground/50 mt-4 max-w-xl">ระดับความสามารถในการเล่นแบบจัดอันดับ จาก Iron ไปจนถึง Radiant อันทรงเกียรติ</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {tiers.map((tier: any) => (
          <div key={tier.tier} className="group flex flex-col items-center text-center space-y-4 p-6 bg-white/[0.02] border border-white/10 hover:border-accent/50 transition-all duration-300">
            <div className="relative w-24 h-24 transition-transform group-hover:scale-110 duration-500">
              <Image
                src={tier.largeIcon}
                alt={tier.tierName}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-accent transition-colors leading-tight">
              {tier.tierName}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

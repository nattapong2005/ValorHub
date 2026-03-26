import Image from "next/image";
import { getGameModes } from "@/lib/api";

export default async function GameModesPage() {
  const allModes = await getGameModes();
  const modes = allModes.filter((m: any) => m.displayIcon);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-20">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-accent">โหมดเกม</h1>
        <p className="text-foreground/50 mt-4 max-w-xl">รูปแบบการเล่นที่หลากหลาย ตั้งแต่การแข่งขันที่เข้มข้นไปจนถึงโหมดผ่อนคลาย</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modes.map((mode: any) => (
          <div key={mode.uuid} className="group p-10 bg-white/[0.02] border border-white/10 hover:border-accent/50 transition-all duration-300 flex flex-col items-center text-center">
            <div className="relative w-24 h-24 mb-8 transition-transform group-hover:scale-110 duration-500">
              <Image
                src={mode.displayIcon}
                alt={mode.displayName}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-foreground group-hover:text-accent transition-colors">
              {mode.displayName}
            </h3>
            <p className="mt-4 text-foreground/40 text-sm font-light leading-relaxed">
              สัมผัสประสบการณ์การเล่นในรูปแบบ {mode.displayName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

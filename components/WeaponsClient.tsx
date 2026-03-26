"use client";

import Image from "next/image";
import Link from "next/link";

export default function WeaponsClient({ groupedWeapons, categoryMap, categoryOrder }: { 
  groupedWeapons: any, 
  categoryMap: any,
  categoryOrder: string[]
}) {
  return (
    <div className="space-y-24">
      {categoryOrder.map((catKey) => {
        const weapons = groupedWeapons[catKey];
        if (!weapons) return null;

        return (
          <div key={catKey} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">
                {categoryMap[catKey] || catKey.split("::")[1]}
              </h2>
              <div className="h-[1px] flex-grow bg-white/10"></div>
              <span className="text-accent font-bold tabular-nums">{weapons.length}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {weapons.map((weapon: any) => (
                <Link 
                  key={weapon.uuid} 
                  href={`/weapons/${weapon.uuid}`}
                  className="group relative p-8 bg-white/[0.02] border border-white/10 hover:border-accent/50 transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  {/* Background Name (Decorative) */}
                  <div className="absolute -bottom-4 -right-4 text-7xl font-black text-white/[0.02] uppercase italic pointer-events-none group-hover:text-accent/[0.05] transition-colors">
                    {weapon.displayName}
                  </div>

                  <div className="relative z-10">
                    <div className="relative w-full aspect-[2/1] mb-8 transition-transform group-hover:scale-110 duration-700 ease-out">
                      <Image
                        src={weapon.displayIcon}
                        alt={weapon.displayName}
                        fill
                        className="object-contain"
                      />
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-accent transition-colors">
                          {weapon.displayName}
                        </h3>
                        <p className="text-foreground/40 text-xs uppercase tracking-widest mt-1">
                          {weapon.shopData?.categoryText || (catKey === "EEquippableCategory::Melee" ? "Melee" : "")}
                        </p>
                      </div>
                      
                      {weapon.shopData?.cost && (
                        <div className="text-right">
                          <span className="text-accent font-bold text-lg tabular-nums">¤{weapon.shopData.cost}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

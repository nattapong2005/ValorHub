import Image from "next/image";
import Link from "next/link";
import { getWeapon } from "@/lib/api";
import { ChevronLeft } from "lucide-react";

export default async function WeaponDetailPage({ params }: { params: { uuid: string } }) {
  const weapon = await getWeapon(params.uuid);
  
  const categoryMap: { [key: string]: string } = {
    "EEquippableCategory::Sidearm": "ปืนพก (Sidearms)",
    "EEquippableCategory::SMG": "ปืนกลเบา (SMGs)",
    "EEquippableCategory::Shotgun": "ลูกซอง (Shotguns)",
    "EEquippableCategory::Rifle": "ปืนไรเฟิล (Rifles)",
    "EEquippableCategory::Sniper": "ปืนสไนเปอร์ (Snipers)",
    "EEquippableCategory::Heavy": "ปืนกลหนัก (Heavy)",
    "EEquippableCategory::Melee": "มีด (Melee)",
  };

  const filteredSkins = weapon.skins.filter((skin: any) => 
    skin.displayIcon && 
    !skin.displayName.includes("Random") && 
    !skin.displayName.includes("สุ่ม")
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Back Button */}
      <Link 
        href="/weapons" 
        className="inline-flex items-center gap-2 text-foreground/50 hover:text-accent transition-colors mb-12 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="uppercase font-bold tracking-widest text-sm">กลับไปหน้าอาวุธ</span>
      </Link>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-12 items-center mb-32">
        <div className="w-full md:w-1/2 relative aspect-[2/1] bg-white/[0.02] border border-white/10 p-12 flex items-center justify-center overflow-hidden group">
          <div className="absolute -bottom-10 -right-10 text-[10rem] font-black text-white/[0.02] uppercase italic pointer-events-none group-hover:text-accent/[0.05] transition-all duration-1000">
            {weapon.displayName}
          </div>
          <div className="relative w-full h-full transition-transform duration-1000 group-hover:scale-110">
            <Image
              src={weapon.displayIcon}
              alt={weapon.displayName}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-sm">
              {categoryMap[weapon.category] || weapon.shopData?.categoryText || "อาวุธ"}
            </span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mt-2">
              {weapon.displayName}
            </h1>
          </div>

          <div className="flex gap-8 pt-4">
            {weapon.shopData?.cost && (
              <div>
                <p className="text-foreground/30 uppercase text-xs font-bold tracking-widest mb-1">ราคา</p>
                <p className="text-3xl font-black text-accent tabular-nums">¤{weapon.shopData.cost}</p>
              </div>
            )}
            {weapon.weaponStats?.fireRate && (
              <div>
                <p className="text-foreground/30 uppercase text-xs font-bold tracking-widest mb-1">อัตราการยิง</p>
                <p className="text-3xl font-black text-foreground tabular-nums">{weapon.weaponStats.fireRate}</p>
              </div>
            )}
            {weapon.weaponStats?.magazineSize && (
              <div>
                <p className="text-foreground/30 uppercase text-xs font-bold tracking-widest mb-1">ขนาดแม็กกาซีน</p>
                <p className="text-3xl font-black text-foreground tabular-nums">{weapon.weaponStats.magazineSize}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Skins Section */}
      <div>
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tight">สกินทั้งหมด ({filteredSkins.length})</h2>
          <div className="h-[1px] flex-grow bg-white/10"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkins.map((skin: any) => (
            <div 
              key={skin.uuid} 
              className="group p-8 bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-all duration-500 flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <div className="relative w-full aspect-[2/1] mb-8 transition-transform group-hover:scale-110 duration-700 ease-out">
                <Image
                  src={skin.displayIcon}
                  alt={skin.displayName}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/40 group-hover:text-accent transition-colors duration-300">
                {skin.displayName}
              </h3>
              
              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

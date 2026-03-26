import { getWeapons } from "@/lib/api";
import WeaponsClient from "@/components/WeaponsClient";

export default async function WeaponsPage() {
  const allWeapons = await getWeapons();
  
  // Thai translations for categories
  const categoryMap: { [key: string]: string } = {
    "EEquippableCategory::Sidearm": "ปืนพก (Sidearms)",
    "EEquippableCategory::SMG": "ปืนกลเบา (SMGs)",
    "EEquippableCategory::Shotgun": "ลูกซอง (Shotguns)",
    "EEquippableCategory::Rifle": "ปืนไรเฟิล (Rifles)",
    "EEquippableCategory::Sniper": "ปืนสไนเปอร์ (Snipers)",
    "EEquippableCategory::Heavy": "ปืนกลหนัก (Heavy)",
    "EEquippableCategory::Melee": "มีด (Melee)",
  };

  // Group weapons by category
  const groupedWeapons = allWeapons.reduce((acc: any, weapon: any) => {
    const category = weapon.category || "Melee";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(weapon);
    return acc;
  }, {});

  // Order of categories
  const categoryOrder = [
    "EEquippableCategory::Sidearm",
    "EEquippableCategory::SMG",
    "EEquippableCategory::Shotgun",
    "EEquippableCategory::Rifle",
    "EEquippableCategory::Sniper",
    "EEquippableCategory::Heavy",
    "EEquippableCategory::Melee",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-20">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-accent">อาวุธ</h1>
        <p className="text-foreground/50 mt-4 max-w-xl">ข้อมูลอาวุธทั้งหมดใน Valorant แบ่งตามประเภทการใช้งาน คลิกที่อาวุธเพื่อดูสกินทั้งหมด</p>
      </div>

      <WeaponsClient 
        groupedWeapons={groupedWeapons} 
        categoryMap={categoryMap} 
        categoryOrder={categoryOrder} 
      />
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { getPlayerCards } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function PlayerCardsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams.page === "string" ? parseInt(resolvedSearchParams.page, 10) : 1;
  const limit = 24;
  
  const allCards = await getPlayerCards();
  
  const totalItems = allCards.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const cards = allCards.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-accent leading-none">เพลเยอร์การ์ด</h1>
          <p className="text-foreground/50 max-w-xl text-lg font-light leading-relaxed">
            สะสมและเลือกใช้งานการ์ดประจำตัวเพื่อแสดงตัวตนของคุณในสมรภูมิ Valorant 
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card: any) => (
          <div key={card.uuid} className="group relative bg-white/[0.02] border border-white/5 hover:border-accent/40 transition-all duration-500 flex flex-col overflow-hidden">
            {/* Wide Art Preview */}
            <div className="relative aspect-[16/6] overflow-hidden border-b border-white/5">
              <Image
                src={card.wideArt}
                alt={card.displayName}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            <div className="p-6 relative flex items-center gap-6">
                {/* Square Icon */}
                <div className="relative w-16 h-16 shrink-0 border border-white/10 group-hover:border-accent/40 transition-colors bg-black/40">
                    <Image
                        src={card.displayIcon}
                        alt={card.displayName}
                        fill
                        className="object-cover"
                    />
                </div>
                
                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-foreground truncate group-hover:text-accent transition-colors">
                        {card.displayName}
                    </h3>
                    <span className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest block mt-1">Player Card Asset</span>
                </div>
            </div>
            
            {/* View Large Art Overlay (Hidden by default) */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-8 h-8 bg-accent text-white flex items-center justify-center skew-x-[-15deg]">
                    <span className="skew-x-[15deg] font-bold text-xs">+</span>
                 </div>
            </div>
          </div>
        ))}
      </div>
      
      {cards.length === 0 && (
        <div className="py-40 text-center">
            <h3 className="text-2xl font-bold opacity-30 uppercase tracking-[0.5em]">No Player Cards Found</h3>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-4">
          <Link
            href={`?page=${Math.max(1, page - 1)}`}
            className={`p-3 border border-white/10 hover:border-accent/50 hover:text-accent transition-all duration-300 bg-white/[0.02] flex items-center justify-center ${page <= 1 ? "opacity-50 pointer-events-none" : ""}`}
            aria-disabled={page <= 1}
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{page}</span>
            <span className="text-foreground/50">/</span>
            <span className="text-foreground/50">{totalPages}</span>
          </div>

          <Link
            href={`?page=${Math.min(totalPages, page + 1)}`}
            className={`p-3 border border-white/10 hover:border-accent/50 hover:text-accent transition-all duration-300 bg-white/[0.02] flex items-center justify-center ${page >= totalPages ? "opacity-50 pointer-events-none" : ""}`}
            aria-disabled={page >= totalPages}
          >
            <ChevronRight className="w-6 h-6" />
          </Link>
        </div>
      )}
    </div>
  );
}

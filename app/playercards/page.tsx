import Link from "next/link";
import Image from "next/image";
import { getPlayerCards } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function PlayerCardsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const allCards = await getPlayerCards();
  
  const page = Math.max(1, parseInt(params.page || "1"));
  const pageSize = 24;
  const totalPages = Math.ceil(allCards.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  const cards = allCards.slice(start, end);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-accent leading-none">เพลเยอร์การ์ด</h1>
          <p className="text-foreground/50 max-w-xl text-lg font-light leading-relaxed">
            สะสมและเลือกใช้งานการ์ดประจำตัวเพื่อแสดงตัวตนของคุณในสมรภูมิ Valorant 
            <span className="block mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Showing {start + 1}-{Math.min(end, allCards.length)} of {allCards.length} Cards</span>
          </p>
        </div>
        
        {/* Top Pagination for easy access */}
        <PaginationControls currentPage={page} totalPages={totalPages} />
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

      {/* Bottom Pagination */}
      <div className="mt-20 pt-10 border-t border-white/5 flex justify-center">
        <PaginationControls currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}

function PaginationControls({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  return (
    <div className="flex items-center gap-4">
      <Link
        href={currentPage > 1 ? `/playercards?page=${currentPage - 1}` : "#"}
        className={cn(
          "p-4 bg-white/5 border border-white/10 transition-all hover:bg-accent hover:border-accent group",
          currentPage <= 1 && "opacity-20 pointer-events-none"
        )}
      >
        <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
      </Link>
      
      <div className="flex flex-col items-center min-w-[100px]">
        <span className="text-2xl font-black italic tracking-tighter leading-none">
          {currentPage < 10 ? `0${currentPage}` : currentPage}
        </span>
        <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20 mt-1">Of {totalPages} Pages</span>
      </div>

      <Link
        href={currentPage < totalPages ? `/playercards?page=${currentPage + 1}` : "#"}
        className={cn(
          "p-4 bg-white/5 border border-white/10 transition-all hover:bg-accent hover:border-accent group",
          currentPage >= totalPages && "opacity-20 pointer-events-none"
        )}
      >
        <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
      </Link>
    </div>
  );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}

import Image from "next/image";
import Link from "next/link";
import { getBundles } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function BundlesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams.page === "string" ? parseInt(resolvedSearchParams.page, 10) : 1;
  const limit = 10;

  const allBundles = await getBundles();
  const validBundles = allBundles.filter((b: any) => b.displayIcon).reverse();
  
  const totalItems = validBundles.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const bundles = validBundles.slice(startIndex, endIndex);

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

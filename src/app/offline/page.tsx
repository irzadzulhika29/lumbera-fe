import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sedang Offline | Lumbera",
  description: "Halaman fallback saat koneksi internet tidak tersedia.",
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-[#f2f6f5] px-6 py-10">
      <section className="w-full max-w-[420px] rounded-[32px] bg-white px-6 py-8 text-center shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/58">
          Offline
        </p>
        <h1 className="mt-4 text-[2rem] font-bold leading-[1.04] tracking-[-0.05em] text-primary">
          Koneksi lagi tidak tersedia
        </h1>
        <p className="mt-4 text-sm leading-6 text-text/70">
          Lumbera masih bisa menampilkan halaman dasar yang sudah tersimpan,
          tapi data terbaru butuh internet untuk dimuat ulang.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-center rounded-[18px] bg-primary px-5 py-3.5 text-sm font-semibold text-white"
          >
            Buka lagi landing
          </Link>
          <Link
            href="/install"
            className="flex items-center justify-center rounded-[18px] border border-primary/18 px-5 py-3.5 text-sm font-semibold text-primary"
          >
            Install PWA
          </Link>
        </div>
      </section>
    </main>
  );
}

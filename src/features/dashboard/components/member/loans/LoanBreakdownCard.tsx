"use client";

export default function LoanBreakdownCard() {
  return (
    <section className="rounded-[12px] border border-border bg-white px-4 py-4 shadow-sm">
      <div className="flex items-center justify-between gap-3 text-[0.88rem]">
        <span className="font-medium text-text/68">Cicilan/bulan</span>
        <span className="font-bold text-text/82">Rp 612.000</span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-[0.88rem]">
        <span className="font-medium text-text/68">Bunga (1.5%/bln)</span>
        <span className="font-bold text-text/82">Rp 52.500</span>
      </div>
    </section>
  );
}

"use client";

export default function LoanEligibilityBanner() {
  return (
    <section className="rounded-[12px] bg-[#eaf1fb] px-3 py-3.5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#2f67a7] text-[1rem] font-bold text-white">
          AA
        </div>

        <div className="min-w-0">
          <p className="text-[0.88rem] font-bold leading-none text-[#2f67a7]">
            Anda memenuhi syarat
          </p>
          <p className="mt-1 text-[0.72rem] font-medium text-[#2f67a7]/82">
            MCS 780 - Batas kredit Rp 15.000.000
          </p>
        </div>
      </div>
    </section>
  );
}

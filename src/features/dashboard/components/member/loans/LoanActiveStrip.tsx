"use client";

export default function LoanActiveStrip({
  reference,
  amount,
  installmentLabel,
  tenorLabel,
  dueDateLabel,
  paidProgressPercent,
  paidProgressLabel,
}: {
  reference: string;
  amount: string;
  installmentLabel: string;
  tenorLabel: string;
  dueDateLabel: string;
  paidProgressPercent: number;
  paidProgressLabel: string;
}) {
  return (
    <section className="bg-[linear-gradient(45deg,var(--color-primary-shadow)_0%,var(--color-primary-shadow)_42%,#7BB4B2_100%)] px-5 pb-5 pt-3 text-white">
      <p className="text-[0.78rem] font-semibold text-white/88">{reference}</p>
      <strong className="mt-1 block text-[1.95rem] font-bold leading-none tracking-[-0.045em]">
        {amount}
      </strong>

      <div className="-ml-5 mt-3 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.34)_62%,rgba(255,255,255,0)_100%)]" />

      <div className="mt-3 grid grid-cols-3 gap-5">
        <div>
          <p className="text-[0.76rem] font-medium text-white/84">
            Cicilan bulanan
          </p>
          <p className="mt-1 text-[0.98rem] font-bold">{installmentLabel}</p>
        </div>
        <div>
          <p className="text-[0.76rem] font-medium text-white/84">Tenor</p>
          <p className="mt-1 text-[0.98rem] font-bold">{tenorLabel}</p>
        </div>
        <div>
          <p className="text-[0.76rem] font-medium text-white/84">
            Jatuh tempo
          </p>
          <p className="mt-1 text-[0.98rem] font-bold">{dueDateLabel}</p>
        </div>
      </div>

      <div className="mt-6 h-[6px] overflow-hidden rounded-full bg-white/92">
        <div
          className="h-full rounded-full bg-warning transition-[width] duration-300"
          style={{ width: `${Math.max(0, Math.min(paidProgressPercent, 100))}%` }}
        />
      </div>

      <p className="mt-3 text-[0.78rem] font-medium text-white/92">
        {paidProgressLabel}
      </p>
    </section>
  );
}

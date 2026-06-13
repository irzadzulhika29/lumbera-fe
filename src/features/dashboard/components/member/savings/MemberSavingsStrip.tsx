"use client";

export default function MemberSavingsStrip({
  total,
  incoming,
  outgoing,
}: {
  total: string;
  incoming: string;
  outgoing: string;
}) {
  return (
    <section className="bg-[linear-gradient(45deg,var(--color-primary-shadow)_0%,var(--color-primary-shadow)_42%,#7BB4B2_100%)] px-5 pb-5 pt-3 text-white">
      <p className="text-[0.75rem] font-semibold text-white/90">
        Total Saldo Tabungan
      </p>
      <strong className="mt-1 block text-[1.9rem] font-bold leading-none tracking-[-0.045em]">
        {total}
      </strong>

      <div className="-ml-5 mt-3 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.34)_62%,rgba(255,255,255,0)_100%)]" />

      <div className="mt-3 grid grid-cols-2 gap-6">
        <div>
          <p className="text-[0.78rem] font-medium text-white/86">Pemasukan</p>
          <p className="mt-1 text-[0.98rem] font-bold">{incoming}</p>
        </div>
        <div>
          <p className="text-[0.78rem] font-medium text-white/86">Pengeluaran</p>
          <p className="mt-1 text-[0.98rem] font-bold">{outgoing}</p>
        </div>
      </div>
    </section>
  );
}

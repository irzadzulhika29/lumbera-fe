import type {
  OfficerMember,
  OfficerTransactionTypeConfig,
} from "@/src/features/dashboard/transactionFlow";

function formatCurrency(value: string) {
  return new Intl.NumberFormat("id-ID").format(Number(value || "0"));
}

function extractAccountNumber(meta: string) {
  return meta.match(/\d+/)?.[0] ?? "0012";
}

type TransactionConfirmationCardProps = {
  amount: string;
  keterangan: string;
  member: OfficerMember;
  option: string;
  transaction: OfficerTransactionTypeConfig;
};

export default function TransactionConfirmationCard({
  amount,
  keterangan,
  member,
  option,
  transaction,
}: TransactionConfirmationCardProps) {
  const selectedOption = option || transaction.amountOptions?.[0] || "-";
  const summaryTitle =
    transaction.slug === "savings"
      ? "Ringkasan Simpanan"
      : transaction.slug === "loans"
        ? "Ringkasan Pinjaman"
        : "Ringkasan Angsuran";
  const amountLabel =
    transaction.slug === "savings"
      ? "Jumlah setoran"
      : transaction.slug === "loans"
        ? "Jumlah pinjaman"
        : "Jumlah angsuran";

  return (
    <section className="rounded-[14px] bg-white px-5 py-5">
      <h2 className="text-[1rem] font-bold tracking-[-0.03em] text-primary">
        {summaryTitle}
      </h2>

      <div className="mt-5 space-y-4 text-[1rem] leading-tight">
        <div className="flex items-start justify-between gap-4">
          <span className="text-text/72">Nama</span>
          <span className="text-right font-bold text-text/72">
            {member.name} - {extractAccountNumber(member.meta)}
          </span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-text/72">Jenis</span>
          <span className="text-right font-bold text-text/72">
            {transaction.title} {selectedOption}
          </span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-text/72">Dicatat oleh</span>
          <span className="text-right font-bold text-text/72">Jamaludin</span>
        </div>
        {keterangan ? (
          <div className="flex items-start justify-between gap-4">
            <span className="text-text/72">Keterangan</span>
            <span className="text-right font-bold text-text/72">{keterangan}</span>
          </div>
        ) : null}
        <div className="flex items-start justify-between gap-4">
          <span className="text-text/72">Tanggal</span>
          <span className="text-right font-bold text-text/72">
            11 Jun 2026, 09:08
          </span>
        </div>
        <div className="pt-5" />
        <div className="flex items-start justify-between gap-4">
          <span className="font-bold text-text/72">{amountLabel}</span>
          <span className="text-right text-[1.05rem] font-bold text-primary">
            Rp {formatCurrency(amount)}
          </span>
        </div>
        <div className="pt-5" />
        <div className="flex items-start justify-between gap-4">
          <span className="font-bold text-text/72">Hash</span>
          <span className="text-right text-text/28">
            SHA-256: a3f7b2e1...
          </span>
        </div>
      </div>
    </section>
  );
}

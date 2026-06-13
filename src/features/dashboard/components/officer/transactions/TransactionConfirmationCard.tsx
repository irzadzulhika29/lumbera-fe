import type {
  OfficerMember,
  OfficerTransactionTypeConfig,
} from "@/src/features/dashboard/transactionFlow";

function formatCurrency(value: string) {
  return new Intl.NumberFormat("id-ID").format(Number(value || "0"));
}

function formatAmount(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
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
  const rawAmount = Number(amount || "0");
  const remainingLoan = member.financialSummary?.remainingLoan ?? 0;
  const savingsBalance = member.financialSummary?.savingsBalance ?? 0;
  const remainingAfterDisbursement = Math.max(remainingLoan - rawAmount, 0);
  const remainingAfterInstallment = Math.max(remainingLoan - rawAmount, 0);
  const remainingSavingsBalance = Math.max(savingsBalance - rawAmount, 0);
  const summaryTitle =
    transaction.slug === "savings"
      ? "Ringkasan Simpanan"
      : transaction.slug === "loans"
        ? "Ringkasan Transaksi"
        : "Ringkasan Angsuran";
  const amountLabel =
    transaction.slug === "savings"
      ? "Jumlah setoran"
      : transaction.slug === "loans"
        ? "Jumlah pencairan"
        : "Jumlah angsuran";

  if (transaction.slug === "loans") {
    return (
      <section className="rounded-[14px] bg-white px-5 py-5">
        <h2 className="text-[1rem] font-bold tracking-[-0.03em] text-primary">
          {summaryTitle}
        </h2>

        <div className="mt-5 space-y-4 text-[1rem] leading-tight">
          <div className="flex items-start justify-between gap-4">
            <span className="text-text/72">Nama</span>
            <span className="text-right font-bold text-text/72">
              {member.name} · {extractAccountNumber(member.meta)}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-text/72">Jenis</span>
            <span className="text-right font-bold text-text/72">
              Pencairan Pinjaman
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-text/72">Dicatat oleh</span>
            <span className="text-right font-bold text-text/72">
              Jamaludin
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-text/72">Tanggal</span>
            <span className="text-right font-bold text-text/72">
              11 Jun 2026, 09:08
            </span>
          </div>

          <div className="pt-3" />

          <div className="flex items-start justify-between gap-4">
            <span className="font-bold text-text/72">{amountLabel}</span>
            <span className="text-right text-[1.05rem] font-bold text-primary">
              Rp {formatCurrency(amount)}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="font-bold text-text/72">Sisa pinjaman</span>
            <span className="text-right text-[1.05rem] font-bold text-primary">
              Rp {formatAmount(remainingAfterDisbursement)}
            </span>
          </div>
          {keterangan ? (
            <div className="flex items-start justify-between gap-4">
              <span className="font-bold text-text/72">Keterangan</span>
              <span className="text-right text-text/72">{keterangan}</span>
            </div>
          ) : null}

          <div className="pt-3" />

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

  if (transaction.slug === "installments") {
    return (
      <section className="rounded-[14px] bg-white px-5 py-5">
        <h2 className="text-[1rem] font-bold tracking-[-0.03em] text-primary">
          Ringkasan Transaksi
        </h2>

        <div className="mt-5 space-y-4 text-[1rem] leading-tight">
          <div className="flex items-start justify-between gap-4">
            <span className="text-text/72">Nama</span>
            <span className="text-right font-bold text-text/72">
              {member.name} · {extractAccountNumber(member.meta)}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-text/72">Jenis</span>
            <span className="text-right font-bold text-text/72">
              Angsuran Pinjaman
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-text/72">Dicatat oleh</span>
            <span className="text-right font-bold text-text/72">
              Jamaludin
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-text/72">Tanggal</span>
            <span className="text-right font-bold text-text/72">
              11 Jun 2026, 09:08
            </span>
          </div>

          <div className="pt-3" />

          <div className="flex items-start justify-between gap-4">
            <span className="font-bold text-text/72">Jumlah pembayaran</span>
            <span className="text-right text-[1.05rem] font-bold text-primary">
              Rp {formatCurrency(amount)}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="font-bold text-text/72">Sisa Utang</span>
            <span className="text-right text-[1.05rem] font-bold text-primary">
              Rp {formatAmount(remainingAfterInstallment)}
            </span>
          </div>
          {keterangan ? (
            <div className="flex items-start justify-between gap-4">
              <span className="font-bold text-text/72">Keterangan</span>
              <span className="text-right text-text/72">{keterangan}</span>
            </div>
          ) : null}

          <div className="pt-3" />

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

  if (transaction.slug === "stock-mutations") {
    return (
      <section className="rounded-[14px] bg-white px-5 py-5">
        <h2 className="text-[1rem] font-bold tracking-[-0.03em] text-primary">
          Ringkasan Transaksi
        </h2>

        <div className="mt-5 space-y-4 text-[1rem] leading-tight">
          <div className="flex items-start justify-between gap-4">
            <span className="text-text/72">Nama</span>
            <span className="text-right font-bold text-text/72">
              {member.name} · {extractAccountNumber(member.meta)}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-text/72">Jenis</span>
            <span className="text-right font-bold text-text/72">
              Tarik Tunai
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-text/72">Dicatat oleh</span>
            <span className="text-right font-bold text-text/72">
              Jamaludin
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-text/72">Tanggal</span>
            <span className="text-right font-bold text-text/72">
              11 Jun 2026, 09:08
            </span>
          </div>

          <div className="pt-3" />

          <div className="flex items-start justify-between gap-4">
            <span className="font-bold text-text/72">Nominal</span>
            <span className="text-right text-[1.05rem] font-bold text-primary">
              Rp {formatCurrency(amount)}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="font-bold text-text/72">Saldo total</span>
            <span className="text-right text-[1.05rem] font-bold text-primary">
              Rp {formatAmount(remainingSavingsBalance)}
            </span>
          </div>
          {keterangan ? (
            <div className="flex items-start justify-between gap-4">
              <span className="font-bold text-text/72">Keterangan</span>
              <span className="text-right text-text/72">{keterangan}</span>
            </div>
          ) : null}

          <div className="pt-3" />

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
            <span className="text-right font-bold text-text/72">
              {keterangan}
            </span>
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

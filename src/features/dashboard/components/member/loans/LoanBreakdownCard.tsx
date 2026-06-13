"use client";

function formatCurrency(amount: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`;
}

export default function LoanBreakdownCard({
  monthlyInstallment,
  totalInterestAmount,
  interestRateLabel,
}: {
  monthlyInstallment: number;
  totalInterestAmount: number;
  interestRateLabel: string;
}) {
  return (
    <section className="rounded-[12px] border border-border bg-white px-4 py-4 shadow-sm">
      <div className="flex items-center justify-between gap-3 text-[0.88rem]">
        <span className="font-medium text-text/68">Cicilan/bulan</span>
        <span className="font-bold text-text/82">
          {formatCurrency(monthlyInstallment)}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-[0.88rem]">
        <span className="font-medium text-text/68">
          Bunga ({interestRateLabel}/bln)
        </span>
        <span className="font-bold text-text/82">
          {formatCurrency(totalInterestAmount)}
        </span>
      </div>
    </section>
  );
}

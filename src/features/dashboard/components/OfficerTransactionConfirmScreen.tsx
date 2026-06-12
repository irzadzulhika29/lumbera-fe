import Link from "next/link";

import MobileScreen from "@/src/features/onboarding/components/MobileScreen";
import type {
  OfficerMember,
  OfficerTransactionTypeConfig,
} from "@/src/features/dashboard/transactionFlow";

import BackFilledIconClient from "./BackFilledIconClient";

type OfficerTransactionConfirmScreenProps = {
  amount: string;
  member: OfficerMember;
  option: string;
  transaction: OfficerTransactionTypeConfig;
};

function formatCurrency(value: string) {
  const numeric = Number(value || "0");

  return new Intl.NumberFormat("id-ID").format(numeric);
}

function extractAccountNumber(meta: string) {
  return meta.match(/\d+/)?.[0] ?? "0012";
}

export default function OfficerTransactionConfirmScreen({
  amount,
  member,
  option,
  transaction,
}: OfficerTransactionConfirmScreenProps) {
  const selectedOption = option || transaction.amountOptions?.[0] || "-";
  const formattedAmount = formatCurrency(amount);
  const accountNumber = extractAccountNumber(member.meta);
  const successParams = new URLSearchParams({
    memberId: member.id,
  });

  if (selectedOption && selectedOption !== "-") {
    successParams.set("option", selectedOption);
  }

  const successHref = `/dashboard/officer/transactions/${transaction.slug}/success?${successParams.toString()}`;
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
    <MobileScreen className="bg-white">
      <section className="flex h-[100svh] w-full flex-none flex-col overflow-hidden bg-white sm:h-[860px]">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:rgba(18,148,144,0.35)_transparent]">
          <header className="relative bg-primary px-7 pb-24 pt-[calc(1.3rem+env(safe-area-inset-top))] text-white">
            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard/officer/transactions/${transaction.slug}/create?memberId=${member.id}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <BackFilledIconClient className="text-[1.35rem] text-primary" />
              </Link>

              <div className="min-w-0">
                <h1 className="text-[1.68rem] font-bold leading-none tracking-[-0.045em] text-white">
                  Konfirmasi input
                </h1>
                <p className="mt-1 text-xs font-medium text-white/82">
                  Transaksi / {transaction.title} / Input / Konfirmasi
                </p>
              </div>
            </div>

            <div className="absolute inset-x-5 top-30 rounded-[18px] border border-[#dfe5ea] bg-white shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
              <section className="rounded-[14px] bg-white px-5 py-5">
                <h2 className="text-[1rem] font-bold tracking-[-0.03em] text-primary">
                  {summaryTitle}
                </h2>

                <div className="mt-5 space-y-4 text-[1rem] leading-tight">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-text/72">Nama</span>
                    <span className="text-right font-bold text-text/72">
                      {member.name} - {accountNumber}
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

                  <div className="pt-5" />

                  <div className="flex items-start justify-between gap-4">
                    <span className="font-bold text-text/72">{amountLabel}</span>
                    <span className="text-right text-[1.05rem] font-bold text-primary">
                      Rp {formattedAmount}
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
            </div>
          </header>

          <div className="bg-white px-5 pb-8 pt-[332px]">
            <Link
              href={successHref}
              className="block w-full rounded-[10px] bg-primary px-4 py-4 text-center text-[1rem] font-bold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5"
            >
              Simpan
            </Link>
          </div>
        </div>
      </section>
    </MobileScreen>
  );
}

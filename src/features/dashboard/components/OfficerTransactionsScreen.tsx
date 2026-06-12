import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

import MobileScreen from "@/src/features/onboarding/components/MobileScreen";
import { getDashboardData } from "@/src/features/dashboard/data";
import type { DashboardIconName } from "@/src/features/dashboard/types";
import { officerTransactionMenus } from "@/src/features/dashboard/transactionFlow";

import BackFilledIconClient from "./BackFilledIconClient";
import NextIconClient from "./NextIconClient";

const ornamentMap: Record<DashboardIconName, string> = {
  savings: "/ornament/savings.svg",
  loan: "/ornament/loan.svg",
  installment: "/ornament/installment.svg",
  reports: "/ornament/report.svg",
  home: "/ornament/transaction.svg",
  members: "/ornament/transaction.svg",
  profile: "/ornament/transaction.svg",
  notification: "/ornament/transaction.svg",
};

const toneClasses = {
  teal: "bg-[linear-gradient(180deg,#EEF4F9_0%,#E2EEF7_100%)] text-[#3868a8]",
  blue: "bg-[linear-gradient(180deg,#EEF4F9_0%,#E2EEF7_100%)] text-[#38559d]",
  green: "bg-[linear-gradient(180deg,#EEF4F9_0%,#E2EEF7_100%)] text-[#3a6791]",
  orange: "bg-[linear-gradient(180deg,#EEF4F9_0%,#E2EEF7_100%)] text-[#5a6a8f]",
} as const;

const filterChips = [
  { label: "Semua", active: true },
  { label: "Simpanan", active: false },
  { label: "Pinjaman", active: false },
  { label: "Angsuran", active: false },
] as const;

function SearchIcon() {
  return (
    <Icon
      icon="solar:magnifer-linear"
      className="h-5 w-5 text-text/55"
      aria-hidden="true"
    />
  );
}

export default function OfficerTransactionsScreen() {
  const dashboard = getDashboardData("officer");

  return (
    <MobileScreen className="bg-white">
      <section className="flex h-[100svh] w-full flex-none flex-col overflow-hidden bg-white sm:h-[860px]">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:rgba(18,148,144,0.35)_transparent]">
          <header className="bg-primary px-7 pb-24 pt-[calc(1.3rem+env(safe-area-inset-top))] text-white">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <BackFilledIconClient className="text-[1.35rem] text-primary" />
              </Link>

              <div className="min-w-0">
                <h1 className="text-[1.68rem] font-bold leading-none tracking-[-0.045em] text-white">
                  Transaksi
                </h1>
              </div>
            </div>

            <p className="mt-6 text-[1rem] font-medium text-white/88">
              Pilih jenis transaksi yang akan dicatat
            </p>

            <div className="mt-5 rounded-[18px] border border-[#dfe5ea] bg-white px-5 py-3.5 shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-3">
                <SearchIcon />
                <input
                  type="text"
                  value=""
                  readOnly
                  placeholder="Cari transaksi"
                  aria-label="Cari transaksi"
                  className="min-w-0 flex-1 border-0 bg-transparent text-[0.98rem] font-medium text-text placeholder:text-text/28 outline-none"
                />
              </div>
            </div>
          </header>

          <div className="bg-white px-5 pb-7 pt-0">
            <div className="mt-12 -mx-5 overflow-x-auto px-5 [scrollbar-width:none]">
              <div className="flex w-max gap-4">
                {officerTransactionMenus.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex w-[100px] shrink-0 flex-col items-center rounded-[22px] bg-[#EEF4F9] px-3 pb-5 pt-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <span
                      className={`flex h-[62px] w-[62px] items-center justify-center rounded-[18px] ${toneClasses[action.tone]}`}
                    >
                      <Image
                        src={ornamentMap[action.icon]}
                        alt=""
                        width={30}
                        height={30}
                        className="h-[30px] w-[30px]"
                      />
                    </span>
                    <strong className="mt-5 text-center text-[0.96rem] font-bold tracking-[-0.03em] text-secondary">
                      {action.label}
                    </strong>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 -mx-5 flex items-center justify-between bg-[#FFF0F0] px-5 py-2.5">
              <p className="text-[0.82rem] font-medium text-[#ef4444]">
                3 transaksi menunggu sinkronisasi
              </p>
              <Link
                href="/dashboard/officer/transactions"
                className="inline-flex items-center gap-2 text-[0.9rem] font-bold text-[#ef4444] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4444]"
              >
                Lihat
                <NextIconClient className="text-[1rem] text-[#ef4444]" />
              </Link>
            </div>

            <section className="mt-8">
              <h2 className="text-[1.05rem] font-bold  text-primary">
                Semua transaksi
              </h2>

              <div className="mt-4 -mx-1 overflow-x-auto px-1 [scrollbar-width:none]">
                <div className="flex w-max gap-2.5">
                  {filterChips.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      className={`rounded-full px-4 py-2 text-[0.92rem] font-bold ${
                        chip.active
                          ? "bg-[#DDF2F0] text-primary"
                          : "bg-[#F2F3F5] text-text/28"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7 space-y-7">
                {dashboard.transactions.map((transaction) => (
                  <article
                    key={transaction.id}
                    className="flex items-start gap-3.5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.92rem] font-bold text-white">
                      {transaction.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[0.98rem] font-bold tracking-[-0.03em] text-text">
                        {transaction.name}
                      </h3>
                      <p className="mt-1 truncate text-[0.78rem] font-medium text-text/82">
                        {transaction.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-[0.96rem] font-bold text-text/66">
                        {transaction.amount}
                      </p>
                      <p
                        className={`mt-2 text-[0.76rem] font-semibold ${
                          transaction.statusTone === "success"
                            ? "text-primary"
                            : "text-warning"
                        }`}
                      >
                        {transaction.status}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </MobileScreen>
  );
}

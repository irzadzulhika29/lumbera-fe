import Image from "next/image";
import Link from "next/link";

import { getDashboardData } from "@/src/features/dashboard/data";
import type { DashboardIconName } from "@/src/features/dashboard/types";
import { officerTransactionMenus } from "@/src/features/dashboard/transactionFlow";

import DashboardSearchField from "../common/DashboardSearchField";
import FilterChips from "../common/FilterChips";
import NextIcon from "../common/NextIcon";
import TransactionList from "../common/TransactionList";
import DashboardScreenShell from "../layout/DashboardScreenShell";
import OfficerFlowHeader from "../layout/OfficerFlowHeader";

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

const filterChips = ["Semua", "Simpanan", "Pinjaman", "Angsuran"].map(
  (value) => ({ label: value, value }),
);

export default function OfficerTransactionsScreen() {
  const dashboard = getDashboardData("officer");

  return (
    <DashboardScreenShell background="bg-white">
      <OfficerFlowHeader
        backHref="/dashboard"
        title="Transaksi"
        subtitle="Pilih jenis transaksi yang akan dicatat"
        floatingContent={
          <DashboardSearchField
            ariaLabel="Cari transaksi"
            value=""
            placeholder="Cari transaksi"
            iconClassName="text-text/55"
          />
        }
      />

      <div className="bg-white px-5 pb-7 pt-0">
        <div className="mt-12">
          <div className="grid grid-cols-3 gap-4">
            {officerTransactionMenus.slice(0, 3).map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex min-w-0 flex-col items-center rounded-[22px] bg-[#EEF4F9] px-3 pb-5 pt-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
                <strong className="mt-2 text-center text-[0.96rem] font-bold tracking-[-0.03em] text-secondary">
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
            <NextIcon className="text-[1rem] text-[#ef4444]" />
          </Link>
        </div>

        <section className="mt-8">
          <h2 className="text-[1.05rem] font-bold text-primary">
            Semua transaksi
          </h2>
          <FilterChips
            activeValue="Semua"
            className="mt-4"
            options={filterChips}
          />
          <div className="mt-7">
            <TransactionList transactions={dashboard.transactions} />
          </div>
        </section>
      </div>
    </DashboardScreenShell>
  );
}

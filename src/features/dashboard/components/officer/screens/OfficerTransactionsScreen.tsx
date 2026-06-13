 "use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  getOfficerTransactions,
  mapOfficerTransactionToDashboardTransaction,
} from "@/src/features/dashboard/api";
import { getDashboardData } from "@/src/features/dashboard/data";
import type { DashboardIconName } from "@/src/features/dashboard/types";
import { officerTransactionMenus } from "@/src/features/dashboard/transactionFlow";

import DashboardSearchField from "../../common/DashboardSearchField";
import FilterChips from "../../common/FilterChips";
import NextIcon from "../../common/NextIcon";
import TransactionList from "../../common/TransactionList";
import DashboardScreenShell from "../../layout/DashboardScreenShell";
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
  withdraw: "/ornament/withdraw.svg",
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
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("Semua");
  const [transactions, setTransactions] = useState(dashboard.transactions);

  const queryType = useMemo(() => {
    if (activeType === "Simpanan") return "SIMPANAN";
    if (activeType === "Pinjaman") return "PINJAMAN";
    if (activeType === "Angsuran") return "ANGSURAN";
    return "";
  }, [activeType]);

  useEffect(() => {
    let cancelled = false;

    getOfficerTransactions({
      limit: 10,
      page: 1,
      search: search.trim() || undefined,
      type: queryType || undefined,
    })
      .then((response) => {
        if (cancelled) return;

        setTransactions(
          response.data.items.map(mapOfficerTransactionToDashboardTransaction),
        );
      })
      .catch(() => {
        if (!cancelled) {
          setTransactions(dashboard.transactions);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dashboard.transactions, queryType, search]);

  return (
    <DashboardScreenShell background="bg-white">
      <OfficerFlowHeader
        backHref="/dashboard"
        title="Transaksi"
        subtitle="Pilih jenis transaksi yang akan dicatat"
        floatingContent={
          <DashboardSearchField
            ariaLabel="Cari transaksi"
            value={search}
            placeholder="Cari transaksi"
            iconClassName="text-text/55"
            onChange={setSearch}
          />
        }
      />

      <div className="bg-white px-5 pb-7 pt-0">
        <div className="mt-12">
          <div className="flex gap-4 overflow-x-auto overscroll-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {officerTransactionMenus.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex min-w-[110px] flex-col items-center rounded-[18px] bg-[#EEF4F9] px-2 pb-3.5 pt-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span
                  className={`flex h-[48px] w-[48px] items-center justify-center rounded-[14px] ${toneClasses[action.tone]}`}
                >
                  <Image
                    src={ornamentMap[action.icon]}
                    alt=""
                    width={24}
                    height={24}
                    className="h-[24px] w-[24px]"
                  />
                </span>
                <strong className="mt-1.5 text-center text-[0.82rem] font-bold tracking-[-0.03em] text-secondary">
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
            activeValue={activeType}
            className="mt-4"
            onChange={setActiveType}
            options={filterChips}
          />
          <div className="mt-7">
            <TransactionList transactions={transactions} />
          </div>
        </section>
      </div>
    </DashboardScreenShell>
  );
}

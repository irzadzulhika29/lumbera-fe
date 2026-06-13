"use client";

import { useMemo, useState } from "react";

import { getDashboardData, getDashboardNavigation } from "@/src/features/dashboard/data";
import FilterChips from "@/src/features/dashboard/components/common/FilterChips";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import MemberSavingsStrip from "@/src/features/dashboard/components/member/savings/MemberSavingsStrip";
import SavingsExportCard from "@/src/features/dashboard/components/member/savings/SavingsExportCard";
import SavingsHistoryList from "@/src/features/dashboard/components/member/savings/SavingsHistoryList";

const filterOptions = [
  { label: "Semua", value: "all" },
  { label: "Pemasukan", value: "incoming" },
  { label: "Pengeluaran", value: "outgoing" },
] as const;

type SavingsFilter = (typeof filterOptions)[number]["value"];

export default function MemberSavingsScreen() {
  const dashboard = getDashboardData("member");
  const [selectedMonth, setSelectedMonth] = useState<string>("this-month");
  const [activeFilter, setActiveFilter] = useState<SavingsFilter>("all");

  const filteredGroups = useMemo(() => {
    const groups = dashboard.savingsHistory ?? [];

    if (activeFilter === "all") {
      return groups;
    }

    return groups
      .map((group) => ({
        ...group,
        transactions: group.transactions.filter((transaction) =>
          activeFilter === "incoming"
            ? transaction.direction === "incoming"
            : transaction.direction === "outgoing",
        ),
      }))
      .filter((group) => group.transactions.length > 0);
  }, [activeFilter, dashboard.savingsHistory]);

  return (
    <DashboardScreenShell
      background="bg-white"
      navigationItems={getDashboardNavigation("member", "Tabungan")}
    >
      <div className="bg-white px-5 pb-6 pt-[calc(1.5rem+env(safe-area-inset-top))]">
        <header>
          <h1 className="text-[1.68rem] font-bold leading-none tracking-[-0.04em] text-primary">
            Buku Tabungan
          </h1>
          <p className="mt-2 text-[0.78rem] font-medium text-primary/78">
            Broto Leksmana - No. 0012
          </p>
        </header>
      </div>

      <MemberSavingsStrip
        total={dashboard.memberSummary?.totalAmount ?? "Rp 0"}
        incoming={dashboard.memberSummary?.primaryMetricValue ?? "Rp0"}
        outgoing={dashboard.memberSummary?.secondaryMetricValue ?? "Rp0"}
      />

      <div className="bg-white px-4 pb-7 pt-5">
        <SavingsExportCard
          month={selectedMonth}
          onMonthChange={setSelectedMonth}
        />

        <FilterChips
          activeValue={activeFilter}
          className="mt-5"
          options={filterOptions}
          onChange={setActiveFilter}
        />

        <SavingsHistoryList groups={filteredGroups} />
      </div>
    </DashboardScreenShell>
  );
}

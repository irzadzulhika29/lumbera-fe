"use client";

import { useEffect, useMemo, useState } from "react";

import {
  downloadMemberSavingsBookExport,
  downloadMemberSavingsBookPdfExport,
  getMemberSavingsBook,
} from "@/src/features/dashboard/api";
import { getDashboardData, getDashboardNavigation } from "@/src/features/dashboard/data";
import FilterChips from "@/src/features/dashboard/components/common/FilterChips";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import MemberSavingsStrip from "@/src/features/dashboard/components/member/savings/MemberSavingsStrip";
import SavingsExportCard from "@/src/features/dashboard/components/member/savings/SavingsExportCard";
import SavingsHistoryList from "@/src/features/dashboard/components/member/savings/SavingsHistoryList";
import type { DashboardSavingsMonthGroup } from "@/src/features/dashboard/types";

const filterOptions = [
  { label: "Semua", value: "all" },
  { label: "Pemasukan", value: "incoming" },
  { label: "Pengeluaran", value: "outgoing" },
] as const;

type SavingsFilter = (typeof filterOptions)[number]["value"];

function formatCurrency(amount: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`;
}

function resolvePeriod(value: string) {
  const now = new Date();
  const baseDate =
    value === "last-month"
      ? new Date(now.getFullYear(), now.getMonth() - 1, 1)
      : new Date(now.getFullYear(), now.getMonth(), 1);

  return `${baseDate.getFullYear()}-${String(baseDate.getMonth() + 1).padStart(2, "0")}`;
}

function mapApiType(value: SavingsFilter) {
  if (value === "incoming") return "IN";
  if (value === "outgoing") return "OUT";
  return undefined;
}

function buildSavingsGroups(
  items: Array<{
    transaction_id: string;
    transaction_type_label: string;
    direction: "IN" | "OUT";
    amount: number;
    description: string;
    recorded_at: string;
  }>,
): DashboardSavingsMonthGroup[] {
  const grouped = new Map<string, DashboardSavingsMonthGroup>();

  for (const item of items) {
    const date = new Date(item.recorded_at);
    const monthLabel = new Intl.DateTimeFormat("id-ID", {
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }).format(date);
    const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`;
    const existing =
      grouped.get(monthKey) ??
      ({
        id: monthKey,
        label: monthLabel.toUpperCase(),
        transactions: [],
      } satisfies DashboardSavingsMonthGroup);

    existing.transactions.push({
      id: item.transaction_id,
      title: item.transaction_type_label,
      dateLabel: new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      }).format(date),
      actorLabel: item.description,
      dayLabel: new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        timeZone: "Asia/Jakarta",
      }).format(date),
      monthLabel: new Intl.DateTimeFormat("id-ID", {
        month: "short",
        timeZone: "Asia/Jakarta",
      })
        .format(date)
        .toUpperCase(),
      amount: `${item.direction === "OUT" ? "-" : "+"}${formatCurrency(
        Math.abs(item.amount),
      ).replace("Rp ", "Rp")}`,
      direction: item.direction === "OUT" ? "outgoing" : "incoming",
    });

    grouped.set(monthKey, existing);
  }

  return Array.from(grouped.values());
}

export default function MemberSavingsScreen() {
  const dashboard = getDashboardData("member");
  const [selectedMonth, setSelectedMonth] = useState<string>("this-month");
  const [activeFilter, setActiveFilter] = useState<SavingsFilter>("all");
  const [memberIdentity, setMemberIdentity] = useState({
    fullName: dashboard.userName,
    memberNumber: dashboard.period,
  });
  const [groups, setGroups] = useState<DashboardSavingsMonthGroup[]>(
    dashboard.savingsHistory ?? [],
  );
  const [summary, setSummary] = useState({
    total: dashboard.memberSummary?.totalAmount ?? "Rp 0",
    incoming: dashboard.memberSummary?.primaryMetricValue ?? "Rp0",
    outgoing: dashboard.memberSummary?.secondaryMetricValue ?? "Rp0",
  });
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getMemberSavingsBook({
      limit: 20,
      page: 1,
      period: resolvePeriod(selectedMonth),
      type: mapApiType(activeFilter),
    })
      .then((response) => {
        if (cancelled) return;

        setMemberIdentity({
          fullName: response.data.profile.full_name,
          memberNumber: response.data.profile.member_number,
        });
        setSummary({
          total: formatCurrency(response.data.summary.total_balance),
          incoming: formatCurrency(response.data.summary.total_income),
          outgoing: formatCurrency(response.data.summary.total_expense),
        });
        setGroups(buildSavingsGroups(response.data.items));
      })
      .catch(() => {
        if (cancelled) return;
        setMemberIdentity({
          fullName: dashboard.userName,
          memberNumber: dashboard.period,
        });
        setSummary({
          total: dashboard.memberSummary?.totalAmount ?? "Rp 0",
          incoming: dashboard.memberSummary?.primaryMetricValue ?? "Rp0",
          outgoing: dashboard.memberSummary?.secondaryMetricValue ?? "Rp0",
        });
        setGroups(dashboard.savingsHistory ?? []);
      });

    return () => {
      cancelled = true;
    };
  }, [
    activeFilter,
    dashboard.memberSummary?.primaryMetricValue,
    dashboard.memberSummary?.secondaryMetricValue,
    dashboard.memberSummary?.totalAmount,
    dashboard.period,
    dashboard.savingsHistory,
    dashboard.userName,
    selectedMonth,
  ]);

  const filteredGroups = useMemo(() => {
    return groups;
  }, [groups]);

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
            {memberIdentity.fullName} - No. {memberIdentity.memberNumber}
          </p>
        </header>
      </div>

      <MemberSavingsStrip
        total={summary.total}
        incoming={summary.incoming}
        outgoing={summary.outgoing}
      />

      <div className="bg-white px-4 pb-7 pt-5">
        <SavingsExportCard
          month={selectedMonth}
          onMonthChange={setSelectedMonth}
          isExportingExcel={isExportingExcel}
          isExportingPdf={isExportingPdf}
          onExportExcel={async () => {
            setIsExportingExcel(true);
            try {
              await downloadMemberSavingsBookExport();
            } finally {
              setIsExportingExcel(false);
            }
          }}
          onExportPdf={async () => {
            setIsExportingPdf(true);
            try {
              await downloadMemberSavingsBookPdfExport();
            } finally {
              setIsExportingPdf(false);
            }
          }}
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

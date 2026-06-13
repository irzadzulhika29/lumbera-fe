"use client";

import { useEffect, useState } from "react";

import { getMemberLoanDashboard } from "@/src/features/dashboard/api";
import DashboardDataTable, {
  type DashboardDataTableRow,
} from "@/src/features/dashboard/components/common/DashboardDataTable";
import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import LoanActiveStrip from "@/src/features/dashboard/components/member/loans/LoanActiveStrip";
import { getDashboardData, getDashboardNavigation } from "@/src/features/dashboard/data";
import type {
  DashboardActiveLoanSummary,
  DashboardLoanHistoryItem,
  DashboardLoanScheduleRow,
} from "@/src/features/dashboard/types";
import {
  mapMemberLoanDashboardToActiveLoan,
  mapMemberLoanDashboardToHistoryItems,
  mapMemberLoanDashboardToScheduleRows,
} from "@/src/features/dashboard/utils/memberLoanDashboardMapper";

function buildScheduleRows(
  rows: DashboardLoanScheduleRow[],
  remainingCount = 0,
): DashboardDataTableRow[] {
  const mappedRows: DashboardDataTableRow[] = rows.map((row) => ({
      label: row.numberLabel,
      type: "row" as const,
      cells: [
        { content: row.scheduleLabel, align: "left" as const },
        { content: row.amountLabel, align: "left" as const },
        {
          content: (
            <span
              className={`inline-flex rounded-[6px] px-2.5 py-1 text-[0.82rem] font-semibold ${
                row.statusTone === "success"
                  ? "bg-[#dff3ea] text-primary"
                  : "bg-[#eef2f5] text-text/58"
              }`}
            >
              {row.statusLabel}
            </span>
          ),
          align: "left" as const,
        },
      ],
    }));

  if (remainingCount > 0) {
    mappedRows.push({
      key: "schedule-summary-row",
      label: "Angsuran berikutnya",
      labelColumnSpan: 3,
      type: "summary" as const,
      cells: [
        { content: `+${remainingCount} cicilan`, align: "left" as const },
      ],
    });
  }

  return mappedRows;
}

function LoanHistoryList({
  items,
}: {
  items: DashboardLoanHistoryItem[];
}) {
  return (
    <section className="mt-7">
      <h2 className="text-[0.98rem] font-bold tracking-[-0.02em] text-primary">
        Riwayat Pinjaman
      </h2>

      <div className="mt-4 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-[14px] border border-border bg-white px-4 py-5 text-[0.84rem] font-medium text-text/56 shadow-sm">
            Belum ada riwayat pinjaman untuk ditampilkan.
          </div>
        ) : null}

        {items.map((item) => (
          <article key={item.id} className="border-t-[3px] border-warning pt-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-[1rem] font-bold leading-tight tracking-[-0.03em] text-text">
                  {item.title}
                </h3>
                <p className="mt-1 text-[0.78rem] font-medium text-text/72">
                  {item.subtitle}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-[6px] px-3 py-1 text-[0.78rem] font-semibold ${
                  item.statusTone === "success"
                    ? "bg-[#dff3ea] text-primary"
                    : "bg-[#e7f2f3] text-primary"
                }`}
              >
                {item.statusLabel}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function MemberLoanHistoryScreen() {
  const dashboard = getDashboardData("member");
  const [activeLoan, setActiveLoan] = useState<DashboardActiveLoanSummary | undefined>(
    dashboard.activeLoanSummary,
  );
  const [scheduleRows, setScheduleRows] = useState<DashboardLoanScheduleRow[]>(
    dashboard.loanSchedule ?? [],
  );
  const [historyItems, setHistoryItems] = useState<DashboardLoanHistoryItem[]>(
    dashboard.loanHistory ?? [],
  );
  const [remainingInstallmentCount, setRemainingInstallmentCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    getMemberLoanDashboard()
      .then((response) => {
        if (cancelled) return;

        setActiveLoan(mapMemberLoanDashboardToActiveLoan(response.data));
        setScheduleRows(mapMemberLoanDashboardToScheduleRows(response.data));
        setHistoryItems(mapMemberLoanDashboardToHistoryItems(response.data));
        setRemainingInstallmentCount(response.data.installment_meta.remaining_count);
      })
      .catch(() => {
        if (cancelled) return;
        setActiveLoan(dashboard.activeLoanSummary);
        setScheduleRows(dashboard.loanSchedule ?? []);
        setHistoryItems(dashboard.loanHistory ?? []);
        setRemainingInstallmentCount(0);
      });

    return () => {
      cancelled = true;
    };
  }, [dashboard.activeLoanSummary, dashboard.loanHistory, dashboard.loanSchedule]);

  return (
    <DashboardScreenShell
      background="bg-white"
      navigationItems={getDashboardNavigation("member", "Pinjaman")}
    >
      <div className="bg-white px-4 pb-6 pt-[calc(0.6rem+env(safe-area-inset-top))]">
        <DashboardPageHeader
          backHref="/dashboard/member/loans"
          title="Riwayat Pinjaman"
          subtitle="Lihat riwayat peminjaman anda"
          titleClassName="text-[1.18rem]"
          variant="compact"
        />
      </div>

      {activeLoan ? (
        <LoanActiveStrip
          reference={activeLoan.reference}
          amount={activeLoan.amount}
          installmentLabel={activeLoan.installmentLabel}
          tenorLabel={activeLoan.tenorLabel}
          dueDateLabel={activeLoan.dueDateLabel}
          paidProgressPercent={activeLoan.paidProgressPercent}
          paidProgressLabel={activeLoan.paidProgressLabel}
        />
      ) : (
        <section className="mx-4 rounded-[24px] border border-primary/10 bg-[#f4fbfb] px-5 py-6 text-center">
          <h3 className="text-[1rem] font-bold tracking-[-0.025em] text-primary">
            Belum ada pinjaman aktif
          </h3>
          <p className="mt-2 text-[0.82rem] leading-relaxed text-text/68">
            Jadwal angsuran akan muncul di sini setelah pengajuan Anda disetujui
            dan dana dicairkan.
          </p>
        </section>
      )}

      <div className="bg-white px-3 pb-7 pt-5">
        <section>
          <h2 className="text-[0.98rem] font-bold tracking-[-0.02em] text-primary">
            Jadwal Angsuran
          </h2>

          <DashboardDataTable
            columns={["JADWAL", "NOMINAL", "STATUS"]}
            headerLabel="NO"
            labelColumnWidth={64}
            columnWidths={[152, 138, 116]}
            rows={buildScheduleRows(scheduleRows, remainingInstallmentCount)}
            bodyMaxHeightClassName="max-h-[310px] overflow-y-auto"
            showScrollIndicator={false}
            stickyLastColumn
            emptyMessage="Belum ada jadwal angsuran."
          />
        </section>

        <LoanHistoryList items={historyItems} />
      </div>
    </DashboardScreenShell>
  );
}

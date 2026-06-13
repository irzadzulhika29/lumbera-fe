"use client";

import DashboardDataTable, {
  type DashboardDataTableRow,
} from "@/src/features/dashboard/components/common/DashboardDataTable";
import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import { getDashboardData, getDashboardNavigation } from "@/src/features/dashboard/data";

function LoanActiveStrip({
  reference,
  amount,
  installmentLabel,
  tenorLabel,
  dueDateLabel,
  paidProgressPercent,
  paidProgressLabel,
}: {
  reference: string;
  amount: string;
  installmentLabel: string;
  tenorLabel: string;
  dueDateLabel: string;
  paidProgressPercent: number;
  paidProgressLabel: string;
}) {
  return (
    <section className="bg-[linear-gradient(45deg,var(--color-primary-shadow)_0%,var(--color-primary-shadow)_42%,#7BB4B2_100%)] px-5 pb-5 pt-3 text-white">
      <p className="text-[0.78rem] font-semibold text-white/88">{reference}</p>
      <strong className="mt-1 block text-[1.95rem] font-bold leading-none tracking-[-0.045em]">
        {amount}
      </strong>

      <div className="-ml-5 mt-3 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.34)_62%,rgba(255,255,255,0)_100%)]" />

      <div className="mt-3 grid grid-cols-3 gap-5">
        <div>
          <p className="text-[0.76rem] font-medium text-white/84">Cicilan bulanan</p>
          <p className="mt-1 text-[0.98rem] font-bold">{installmentLabel}</p>
        </div>
        <div>
          <p className="text-[0.76rem] font-medium text-white/84">Tenor</p>
          <p className="mt-1 text-[0.98rem] font-bold">{tenorLabel}</p>
        </div>
        <div>
          <p className="text-[0.76rem] font-medium text-white/84">Jatuh tempo</p>
          <p className="mt-1 text-[0.98rem] font-bold">{dueDateLabel}</p>
        </div>
      </div>

      <div className="mt-6 h-[6px] overflow-hidden rounded-full bg-white/92">
        <div
          className="h-full rounded-full bg-warning transition-[width] duration-300"
          style={{ width: `${Math.max(0, Math.min(paidProgressPercent, 100))}%` }}
        />
      </div>

      <p className="mt-3 text-[0.78rem] font-medium text-white/92">
        {paidProgressLabel}
      </p>
    </section>
  );
}

function buildScheduleRows(
  rows: NonNullable<ReturnType<typeof getDashboardData>["loanSchedule"]>,
): DashboardDataTableRow[] {
  return [
    ...rows.slice(0, 3).map((row) => ({
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
    })),
    {
      key: "schedule-summary-row",
      label: "Dan seterusnya s.d. Des 2026",
      labelColumnSpan: 3,
      type: "summary",
      cells: [
        { content: "+3 cicilan", align: "left" },
      ],
    },
  ];
}

function LoanHistoryList({
  items,
}: {
  items: NonNullable<ReturnType<typeof getDashboardData>["loanHistory"]>;
}) {
  return (
    <section className="mt-7">
      <h2 className="text-[0.98rem] font-bold tracking-[-0.02em] text-primary">
        Riwayat Pinjaman
      </h2>

      <div className="mt-4 space-y-4">
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
  const activeLoan = dashboard.activeLoanSummary;
  const scheduleRows = dashboard.loanSchedule ?? [];
  const historyItems = dashboard.loanHistory ?? [];

  if (!activeLoan) {
    return null;
  }

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

      <LoanActiveStrip
        reference={activeLoan.reference}
        amount={activeLoan.amount}
        installmentLabel={activeLoan.installmentLabel}
        tenorLabel={activeLoan.tenorLabel}
        dueDateLabel={activeLoan.dueDateLabel}
        paidProgressPercent={activeLoan.paidProgressPercent}
        paidProgressLabel={activeLoan.paidProgressLabel}
      />

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
            rows={buildScheduleRows(scheduleRows)}
            bodyMaxHeightClassName="max-h-[310px] overflow-y-auto"
            showScrollIndicator={false}
            stickyLastColumn
          />
        </section>

        <LoanHistoryList items={historyItems} />
      </div>
    </DashboardScreenShell>
  );
}

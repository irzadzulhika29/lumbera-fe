"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import {
  getFinanceReportConfig,
  type FinanceReportPeriod,
} from "@/src/features/dashboard/reportData";
import MobileScreen from "@/src/features/onboarding/components/MobileScreen";

import BackFilledIconClient from "./BackFilledIconClient";

type FinanceReportType = "balance" | "profit-loss" | "cash-flow";

type FinanceReportScreenProps = {
  period: FinanceReportPeriod;
  type: FinanceReportType;
};

type TableCell = {
  amount: number;
  prefix?: "" | "+" | "-";
  tone?: "positive" | "negative" | "neutral";
};

type TableRow = {
  label: string;
  type: "section" | "row" | "summary" | "total";
  tone?: "positive" | "negative";
  values?: Array<number | TableCell>;
};

type TableConfig = {
  exportLabel: string;
  rows: TableRow[];
  title: string;
};

const tableConfigs: Record<FinanceReportType, TableConfig> = {
  balance: {
    title: "Neraca",
    exportLabel: "Export .XLSX",
    rows: [
      { label: "AKTIVA", type: "section" },
      { label: "Uang Kas", type: "row", values: [1_000_000, 1_000_000, 1_000_000] },
      {
        label: "Simpanan di Bank",
        type: "row",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
      {
        label: "Total Aktiva Lancar",
        type: "summary",
        tone: "positive",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
      {
        label: "TOTAL AKTIVA",
        type: "total",
        tone: "positive",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
      { label: "KEWAJIBAN & MODAL", type: "section" },
      {
        label: "Utang Belum Lunas",
        type: "row",
        tone: "negative",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
      {
        label: "Modal Koperasi",
        type: "row",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
      {
        label: "TOTAL",
        type: "total",
        tone: "positive",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
    ],
  },
  "profit-loss": {
    title: "Laba Rugi",
    exportLabel: "Export .XLSX",
    rows: [
      { label: "PENDAPATAN USAHA", type: "section" },
      {
        label: "Pendapatan Bunga Pinjaman",
        type: "row",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
      {
        label: "Pendapatan Administrasi",
        type: "row",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
      {
        label: "Pendapatan Lain-lain",
        type: "row",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
      {
        label: "Total Pendapatan",
        type: "summary",
        tone: "positive",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
      { label: "BEBAN USAHA", type: "section" },
      {
        label: "Beban Operasional",
        type: "row",
        tone: "negative",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
      {
        label: "Beban Gaji Pengurus",
        type: "row",
        tone: "negative",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
      {
        label: "Beban Penyusutan",
        type: "row",
        tone: "negative",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
      {
        label: "Beban ATK & Umum",
        type: "row",
        tone: "negative",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
      {
        label: "TOTAL",
        type: "total",
        tone: "negative",
        values: [1_000_000, 1_000_000, 1_000_000],
      },
    ],
  },
  "cash-flow": {
    title: "Arus Kas",
    exportLabel: "Export .XLSX",
    rows: [
      { label: "AKTIVITAS OPERASI", type: "section" },
      {
        label: "Penerimaan Simpanan",
        type: "row",
        values: [
          { amount: 1_000_000, prefix: "+", tone: "positive" },
          { amount: 1_000_000, prefix: "+", tone: "positive" },
          { amount: 1_000_000, prefix: "+", tone: "positive" },
        ],
      },
      {
        label: "Penerimaan Angsuran",
        type: "row",
        values: [
          { amount: 1_000_000, prefix: "+", tone: "positive" },
          { amount: 1_000_000, prefix: "+", tone: "positive" },
          { amount: 1_000_000, prefix: "+", tone: "positive" },
        ],
      },
      {
        label: "Pembayaran Pinjaman",
        type: "row",
        values: [
          { amount: 1_000_000, prefix: "-", tone: "negative" },
          { amount: 1_000_000, prefix: "-", tone: "negative" },
          { amount: 1_000_000, prefix: "-", tone: "negative" },
        ],
      },
      {
        label: "Beban Operasional",
        type: "row",
        values: [
          { amount: 1_000_000, prefix: "-", tone: "negative" },
          { amount: 1_000_000, prefix: "-", tone: "negative" },
          { amount: 1_000_000, prefix: "-", tone: "negative" },
        ],
      },
      {
        label: "Bersih Operasi",
        type: "summary",
        tone: "positive",
        values: [
          { amount: 1_000_000, prefix: "+", tone: "positive" },
          { amount: 1_000_000, prefix: "+", tone: "positive" },
          { amount: 1_000_000, prefix: "+", tone: "positive" },
        ],
      },
      { label: "AKTIVITAS INVESTASI", type: "section" },
      {
        label: "Pembelian Inventaris",
        type: "row",
        values: [
          { amount: 1_000_000, prefix: "-", tone: "negative" },
          { amount: 1_000_000, tone: "negative" },
          { amount: 1_000_000, tone: "negative" },
        ],
      },
      {
        label: "Bersih Investasi",
        type: "total",
        tone: "negative",
        values: [
          { amount: 1_000_000, prefix: "-", tone: "negative" },
          { amount: 1_000_000, prefix: "-", tone: "negative" },
          { amount: 1_000_000, prefix: "-", tone: "negative" },
        ],
      },
      { label: "AKTIVITAS PENDANAAN", type: "section" },
      {
        label: "Penambahan Modal",
        type: "row",
        values: [
          { amount: 1_000_000, prefix: "+", tone: "positive" },
          { amount: 1_000_000, prefix: "+", tone: "positive" },
          { amount: 1_000_000, prefix: "+", tone: "positive" },
        ],
      },
      {
        label: "Bersih Pendanaan",
        type: "summary",
        tone: "positive",
        values: [
          { amount: 1_000_000, prefix: "+", tone: "positive" },
          { amount: 1_000_000, prefix: "+", tone: "positive" },
          { amount: 1_000_000, prefix: "+", tone: "positive" },
        ],
      },
    ],
  },
};

const reportTabs: Array<{ label: string; value: FinanceReportType }> = [
  { label: "Neraca", value: "balance" },
  { label: "Laba Rugi", value: "profit-loss" },
  { label: "Arus Kas", value: "cash-flow" },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
}

function getCellToneClass(row: TableRow) {
  if (row.tone === "negative") return "text-[#FF3B30]";
  if (row.tone === "positive") return "text-primary";
  return "text-text/80";
}

function getExplicitCellToneClass(tone: TableCell["tone"]) {
  if (tone === "negative") return "text-[#FF3B30]";
  if (tone === "positive") return "text-primary";
  return "text-text/80";
}

function resolveRowValues(row: TableRow, columnCount: number): TableCell[] {
  if (row.values && row.values.length >= columnCount) {
    return row.values.slice(0, columnCount).map((value) =>
      typeof value === "number" ? { amount: value } : value,
    );
  }

  const fallbackValue =
    row.tone === "negative" || row.tone === "positive" ? 1_000_000 : 0;

  return Array.from({ length: columnCount }, () => ({ amount: fallbackValue }));
}

export default function FinanceReportScreen({
  period,
  type,
}: FinanceReportScreenProps) {
  const report = getFinanceReportConfig(period);
  const activeTable = useMemo(() => tableConfigs[type], [type]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setScrollProgress(maxScroll <= 0 ? 0 : el.scrollLeft / maxScroll);
  };

  const firstColumnLabel =
    activeTable.rows.find((row) => row.type === "section")?.label ?? "LAPORAN";
  const columnWidth = 160;
  const labelColumnWidth = 230;
  const indicatorThumbWidth = Math.max(
    20,
    130 / Math.max(1.5, report.columns.length + 0.5),
  );

  return (
    <MobileScreen className="bg-[#f7f8f9]">
      <section className="flex h-[100svh] w-full flex-none flex-col overflow-hidden bg-[#f7f8f9] sm:h-[860px]">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:rgba(18,148,144,0.35)_transparent]">
          <div className="px-6 pb-6 pt-[calc(1.4rem+env(safe-area-inset-top))]">
            <header className="flex items-start gap-4">
              <Link
                href={`/dashboard/reports?period=${period}`}
                className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[14px] bg-primary text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <BackFilledIconClient className="text-[1.55rem]" />
              </Link>

              <div className="min-w-0 pt-1">
                <h1 className="text-[1.95rem] font-bold leading-none tracking-[-0.04em] text-primary">
                  Laporan Keuangan
                </h1>
                <p className="mt-2 text-xs font-medium text-primary/88">
                  Lihat pertumbuhan keuangan koperasi
                </p>
              </div>
            </header>

            <p className="mt-8 text-[1rem] font-bold text-primary">
              {report.label}
            </p>

            <div className="mt-4 flex gap-2">
              {reportTabs.map((tab) => {
                const isActive = tab.value === type;

                return (
                  <Link
                    key={tab.value}
                    href={`/dashboard/reports/finance?period=${period}&type=${tab.value}`}
                    className={`rounded-full px-4 py-2 text-[0.92rem] font-bold transition-colors ${
                      isActive
                        ? "bg-[#DDF0EF] text-primary"
                        : "bg-[#EFEFEF] text-text/26"
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="mt-6 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div
                className="rounded-[14px] border border-[#dbe4ea] bg-white shadow-[0_8px_22px_rgba(15,23,42,0.05)]"
                style={{
                  minWidth: `${labelColumnWidth + report.columns.length * columnWidth}px`,
                }}
              >
                <div
                  className="grid rounded-t-[14px] bg-[#157D78] text-white"
                  style={{
                    gridTemplateColumns: `${labelColumnWidth}px repeat(${report.columns.length}, ${columnWidth}px)`,
                  }}
                >
                  <div className="px-4 py-4 text-[0.98rem] font-bold">
                    {firstColumnLabel}
                  </div>
                  {report.columns.map((column) => (
                    <div
                      key={column}
                      className="px-4 py-4 text-center text-[0.98rem] font-bold"
                    >
                      {column}
                    </div>
                  ))}
                </div>

                {activeTable.rows.slice(1).map((row) => {
                  const isSection = row.type === "section";
                  const isSummary = row.type === "summary";
                  const isTotal = row.type === "total";
                  const rowValues = resolveRowValues(row, report.columns.length);

                  if (isSection) {
                    return (
                      <div
                        key={row.label}
                        className="grid bg-[#157D78] text-white"
                        style={{
                          gridTemplateColumns: `${labelColumnWidth}px repeat(${report.columns.length}, ${columnWidth}px)`,
                        }}
                      >
                        <div className="col-span-full px-4 py-4 text-[0.98rem] font-bold">
                          {row.label}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={row.label}
                      className={`grid border-t border-[#e5edf1] ${
                        isTotal
                          ? row.tone === "negative"
                            ? "bg-[#FBE9E9]"
                            : "bg-[#E5F2F3]"
                          : isSummary
                            ? "bg-[#E5F2F3]"
                            : ""
                      }`}
                      style={{
                        gridTemplateColumns: `${labelColumnWidth}px repeat(${report.columns.length}, ${columnWidth}px)`,
                      }}
                    >
                      <div
                        className={`px-4 py-4 text-[0.98rem] ${
                          isSummary
                            ? "font-bold text-text"
                            : isTotal
                              ? "font-bold text-text/86"
                              : "font-medium text-text/82"
                        }`}
                      >
                        {row.label}
                      </div>
                      {rowValues.map((value, index) => (
                        <div
                          key={`${row.label}-${report.columns[index]}`}
                          className={`px-4 py-4 text-center text-[0.98rem] ${
                            isSummary || isTotal ? "font-bold" : "font-medium"
                          }`}
                        >
                          <span
                            className={
                              value.tone
                                ? getExplicitCellToneClass(value.tone)
                                : getCellToneClass(row)
                            }
                          >
                            {value.prefix ?? ""}Rp {formatCurrency(value.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative mx-auto mt-2 flex h-2 w-[130px] overflow-hidden rounded-full bg-[#D3E1EC]">
              <div
                className="h-full rounded-full bg-primary/55 transition-transform duration-75"
                style={{
                  width: `${indicatorThumbWidth}px`,
                  transform: `translateX(${scrollProgress * (130 - indicatorThumbWidth)}px)`,
                }}
              />
            </div>

            <div className="mt-8">
              <button
                type="button"
                className="w-full rounded-[14px] bg-primary px-4 py-5 text-[1rem] font-bold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)]"
              >
                {activeTable.exportLabel}
              </button>
            </div>
          </div>
        </div>
      </section>
    </MobileScreen>
  );
}

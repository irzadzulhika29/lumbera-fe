import Link from "next/link";
import { useRef, useState } from "react";

import MobileScreen from "@/src/features/onboarding/components/MobileScreen";
import { getFinanceReportConfig, type FinanceReportPeriod } from "@/src/features/dashboard/reportData";

import BackFilledIconClient from "./BackFilledIconClient";

type FinanceReportScreenProps = {
  period: FinanceReportPeriod;
};

type BalanceRow = {
  label: string;
  type: "section" | "row" | "summary" | "total";
  tone?: "positive" | "negative";
};

const balanceRows: BalanceRow[] = [
  { label: "AKTIVA", type: "section" },
  { label: "Uang Kas", type: "row" },
  { label: "Simpanan di Bank", type: "row" },
  { label: "Total Aktiva Lancar", type: "summary", tone: "positive" },
  { label: "TOTAL AKTIVA", type: "total", tone: "positive" },
  { label: "KEWAJIBAN & MODAL", type: "section" },
  { label: "Utang Belum Lunas", type: "row", tone: "negative" },
  { label: "Modal Koperasi", type: "row" },
  { label: "TOTAL", type: "total", tone: "positive" },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
}

function getValueForRow(row: BalanceRow) {
  if (row.label === "Utang Belum Lunas") return 1_000_000;
  return 1_000_000;
}

function CellValue({ row }: { row: BalanceRow }) {
  const value = getValueForRow(row);
  const colorClass =
    row.tone === "negative"
      ? "text-[#FF3B30]"
      : row.tone === "positive"
        ? "text-primary"
        : "text-text/80";

  return <span className={`font-medium ${colorClass}`}>Rp {formatCurrency(value)}</span>;
}

export default function FinanceReportScreen({
  period,
}: FinanceReportScreenProps) {
  const report = getFinanceReportConfig(period);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setScrollProgress(el.scrollLeft / (el.scrollWidth - el.clientWidth));
  };

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
                <p className="mt-2 text-[1rem] font-medium text-primary/88">
                  Lihat pertumbuhan keuangan koperasi
                </p>
              </div>
            </header>

            <p className="mt-8 text-[1rem] font-bold text-primary">
              {report.label}
            </p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="rounded-full bg-[#DDF0EF] px-4 py-2 text-[0.92rem] font-bold text-primary"
              >
                Neraca
              </button>
              <button
                type="button"
                className="rounded-full bg-[#EFEFEF] px-4 py-2 text-[0.92rem] font-bold text-text/26"
              >
                Laba Rugi
              </button>
              <button
                type="button"
                className="rounded-full bg-[#EFEFEF] px-4 py-2 text-[0.92rem] font-bold text-text/26"
              >
                Arus Kas
              </button>
            </div>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="mt-6 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div
                className="rounded-[14px] border border-[#dbe4ea] bg-white shadow-[0_8px_22px_rgba(15,23,42,0.05)]"
                style={{
                  minWidth: `${176 + report.columns.length * 160}px`,
                }}
              >
                <div
                  className="grid rounded-t-[14px] bg-[#157D78] text-white"
                  style={{
                    gridTemplateColumns: `176px repeat(${report.columns.length}, 160px)`,
                  }}
                >
                  <div className="px-4 py-4 text-[0.98rem] font-bold">AKTIVA</div>
                  {report.columns.map((column) => (
                    <div
                      key={column}
                      className="px-4 py-4 text-center text-[0.98rem] font-bold"
                    >
                      {column}
                    </div>
                  ))}
                </div>

                {balanceRows.slice(1).map((row) => {
                  const isSection = row.type === "section";
                  const isSummary = row.type === "summary";
                  const isTotal = row.type === "total";

                  if (isSection) {
                    return (
                      <div
                        key={row.label}
                        className="grid bg-[#157D78] text-white"
                        style={{
                          gridTemplateColumns: `176px repeat(${report.columns.length}, 160px)`,
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
                        isTotal ? "bg-[#E5F2F3]" : ""
                      }`}
                      style={{
                        gridTemplateColumns: `176px repeat(${report.columns.length}, 160px)`,
                      }}
                    >
                      <div
                        className={`px-4 py-4 text-[0.98rem] ${
                          isSummary ? "font-bold text-text" : isTotal ? "font-bold text-text/86" : "font-medium text-text/82"
                        }`}
                      >
                        {row.label}
                      </div>
                      {report.columns.map((column) => (
                        <div
                          key={`${row.label}-${column}`}
                          className={`px-4 py-4 text-center text-[0.98rem] ${
                            isSummary || isTotal ? "font-bold" : ""
                          }`}
                        >
                          <CellValue row={row} />
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="relative mx-auto mt-2 flex h-2 w-[130px] overflow-hidden rounded-full bg-[#D3E1EC]"
            >
              <div
                className="h-full rounded-full bg-primary/55 transition-transform duration-75"
                style={{
                  width: `${Math.max(20, 130 / (report.columns.length + 0.5))}px`,
                  transform: `translateX(${scrollProgress * (130 - Math.max(20, 130 / (report.columns.length + 0.5)))}px)`,
                }}
              />
            </div>

            <div className="pt-52">
              <button
                type="button"
                className="w-full rounded-[14px] bg-primary px-4 py-5 text-[1rem] font-bold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)]"
              >
                Export .XLSX
              </button>
            </div>
          </div>
        </div>
      </section>
    </MobileScreen>
  );
}

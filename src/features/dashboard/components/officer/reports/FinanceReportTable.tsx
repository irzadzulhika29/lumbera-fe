"use client";

import { useRef, useState } from "react";

import type { FinanceReportConfig } from "@/src/features/dashboard/reportData";

import type {
  FinanceTableCell,
  FinanceTableConfig,
  FinanceTableRow,
} from "./financeReportConfig";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
}

function getCellToneClass(row: FinanceTableRow) {
  if (row.tone === "negative") return "text-[#FF3B30]";
  if (row.tone === "positive") return "text-primary";
  return "text-text/80";
}

function getExplicitCellToneClass(tone: FinanceTableCell["tone"]) {
  if (tone === "negative") return "text-[#FF3B30]";
  if (tone === "positive") return "text-primary";
  return "text-text/80";
}

function resolveRowValues(
  row: FinanceTableRow,
  columnCount: number,
): FinanceTableCell[] {
  if (row.values && row.values.length >= columnCount) {
    return row.values
      .slice(0, columnCount)
      .map((value) => (typeof value === "number" ? { amount: value } : value));
  }

  return Array.from({ length: columnCount }, () => ({
    amount: 0,
  }));
}

export default function FinanceReportTable({
  report,
  table,
}: {
  report: FinanceReportConfig;
  table: FinanceTableConfig;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const firstColumnLabel =
    table.rows.find((row) => row.type === "section")?.label ?? table.title;
  const columnWidth = 160;
  const labelColumnWidth = 230;
  const indicatorThumbWidth = Math.max(
    20,
    130 / Math.max(1.5, report.columns.length + 0.5),
  );

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;

    const maxScroll = element.scrollWidth - element.clientWidth;
    setScrollProgress(
      maxScroll <= 0 ? 0 : element.scrollLeft / maxScroll,
    );
  };

  return (
    <>
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

          {table.rows.slice(1).map((row) => {
            if (row.type === "section") {
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

            const isSummary = row.type === "summary";
            const isTotal = row.type === "total";
            const rowValues = resolveRowValues(row, report.columns.length);

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
    </>
  );
}

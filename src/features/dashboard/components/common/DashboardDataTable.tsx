"use client";

import { useRef, useState } from "react";

export type DashboardDataTableCell = {
  align?: "left" | "center" | "right";
  content: React.ReactNode;
  tone?: "positive" | "negative" | "neutral";
};

export type DashboardDataTableRow = {
  cells?: DashboardDataTableCell[];
  labelColumnSpan?: number;
  key?: string;
  label: string;
  tone?: "positive" | "negative";
  type: "section" | "row" | "summary" | "total";
};

type DashboardDataTableProps = {
  bodyCellClassName?: string;
  bodyMaxHeightClassName?: string;
  columnWidth?: number;
  columnWidths?: number[];
  columns: string[];
  emptyMessage?: string;
  headerLabel: string;
  headerCellClassName?: string;
  isLoading?: boolean;
  labelColumnWidth?: number;
  loadingMessage?: string;
  rows: DashboardDataTableRow[];
  showScrollIndicator?: boolean;
  stickyLastColumn?: boolean;
};

function getCellToneClass(
  tone?: DashboardDataTableCell["tone"] | DashboardDataTableRow["tone"],
) {
  if (tone === "negative") return "text-[#FF3B30]";
  if (tone === "positive") return "text-primary";
  return "text-text/80";
}

export default function DashboardDataTable({
  bodyCellClassName,
  bodyMaxHeightClassName,
  columnWidth = 160,
  columnWidths,
  columns,
  emptyMessage = "Tidak ada data untuk ditampilkan.",
  headerLabel,
  headerCellClassName,
  isLoading = false,
  labelColumnWidth = 230,
  loadingMessage = "Memuat data...",
  rows,
  showScrollIndicator = true,
  stickyLastColumn = false,
}: DashboardDataTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const resolvedColumnWidths = columns.map(
    (_, index) => columnWidths?.[index] ?? columnWidth,
  );
  const totalWidth =
    labelColumnWidth +
    resolvedColumnWidths.reduce((sum, width) => sum + width, 0);
  const gridTemplateColumns = `${labelColumnWidth}px ${resolvedColumnWidths
    .map((width) => `${width}px`)
    .join(" ")}`;
  const indicatorThumbWidth = Math.max(
    20,
    130 / Math.max(1.5, columns.length + 0.5),
  );
  const outerScrollableClassName = stickyLastColumn
    ? bodyMaxHeightClassName
    : undefined;
  const bodyScrollableClassName = stickyLastColumn
    ? undefined
    : bodyMaxHeightClassName;

  const getStickyCellClassName = (rowType: DashboardDataTableRow["type"]) => {
    if (!stickyLastColumn) return "";
    if (rowType === "section") {
      return "sticky right-0 z-20 bg-[#147b78] shadow-[-10px_0_14px_rgba(6,44,43,0.16)]";
    }
    if (rowType === "summary") {
      return "sticky right-0 z-10 bg-[#E5F2F3] shadow-[-10px_0_14px_rgba(15,23,42,0.08)]";
    }
    if (rowType === "total") {
      return "sticky right-0 z-10 shadow-[-10px_0_14px_rgba(15,23,42,0.08)]";
    }
    return "sticky right-0 z-10 bg-white shadow-[-10px_0_14px_rgba(15,23,42,0.08)]";
  };

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;

    const maxScroll = element.scrollWidth - element.clientWidth;
    setScrollProgress(maxScroll <= 0 ? 0 : element.scrollLeft / maxScroll);
  };

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={`mt-6 overflow-x-auto rounded-[18px] border border-[#d8e0e6] bg-white shadow-[0_8px_18px_rgba(15,23,42,0.05)] [scrollbar-color:rgba(18,148,144,0.2)_transparent] [scrollbar-width:thin] ${
          outerScrollableClassName ?? ""
        }`}
      >
        <div
          className="bg-white"
          style={{
            minWidth: `${totalWidth}px`,
          }}
        >
          <div
            className="grid bg-[#147b78] text-white"
            style={{
              gridTemplateColumns,
            }}
          >
            <div
              className={`px-4 py-3 font-bold uppercase tracking-[-0.02em] ${
                headerCellClassName ?? "text-xs"
              }`}
            >
              {headerLabel}
            </div>
            {columns.map((column, index) => (
              <div
                key={column}
                className={`px-4 py-3 font-bold uppercase tracking-[-0.02em] ${
                  headerCellClassName ?? "text-xs text-center"
                } ${
                  stickyLastColumn && index === columns.length - 1
                    ? "sticky right-0 z-20 bg-[#147b78] shadow-[-10px_0_14px_rgba(6,44,43,0.16)]"
                    : ""
                }`}
              >
                {column}
              </div>
            ))}
          </div>

          <div className={bodyScrollableClassName}>
            {isLoading ? (
              <div
                className="flex min-h-28 items-center justify-center border-t border-[#e7ebef] bg-white px-4 text-sm font-medium text-[#7c8a9b]"
                style={{ width: `${totalWidth}px` }}
              >
                {loadingMessage}
              </div>
            ) : rows.length === 0 ? (
              <div
                className="flex min-h-28 items-center justify-center border-t border-[#e7ebef] bg-white px-4 text-sm font-medium text-[#7c8a9b]"
                style={{ width: `${totalWidth}px` }}
              >
                {emptyMessage}
              </div>
            ) : (
              rows.map((row) => {
              const rowKey = row.key ?? row.label;
              const labelColumnSpan = Math.min(
                columns.length + 1,
                Math.max(1, row.labelColumnSpan ?? 1),
              );
              const remainingColumnOffset = Math.max(0, labelColumnSpan - 1);
              if (row.type === "section") {
                return (
                  <div
                    key={rowKey}
                    className="grid bg-[#147b78] text-white"
                    style={{
                      gridTemplateColumns,
                    }}
                  >
                    <div className="col-span-full px-4 py-3 text-xs font-bold uppercase tracking-[-0.02em]">
                      {row.label}
                    </div>
                  </div>
                );
              }

              const isSummary = row.type === "summary";
              const isTotal = row.type === "total";

              return (
                <div
                  key={rowKey}
                  className={`grid border-t border-[#e7ebef] ${
                    isTotal
                      ? row.tone === "negative"
                        ? "bg-[#FBE9E9]"
                        : "bg-[#E5F2F3]"
                      : isSummary
                        ? "bg-[#E5F2F3]"
                        : "bg-white"
                  }`}
                  style={{
                    gridTemplateColumns,
                  }}
                >
                  <div
                    className={`px-4 py-5 ${
                      bodyCellClassName ?? "text-xs"
                    } ${
                      isSummary
                        ? "font-bold text-text"
                        : isTotal
                          ? "font-bold text-text/86"
                          : "font-medium text-[#2f3744]"
                    }`}
                    style={{ gridColumn: `span ${labelColumnSpan} / span ${labelColumnSpan}` }}
                  >
                    {row.label}
                  </div>

                  {row.cells?.map((cell, index) => {
                    const columnIndex = index + remainingColumnOffset;
                    return (
                    <div
                      key={`${rowKey}-${columns[columnIndex]}`}
                      className={`px-4 py-5 ${
                        bodyCellClassName ?? "text-xs"
                      } ${
                        isSummary || isTotal ? "font-bold" : "font-medium"
                      } ${
                        cell.align === "left"
                          ? "text-left"
                          : cell.align === "right"
                            ? "text-right"
                            : "text-center"
                      } ${
                        stickyLastColumn && columnIndex === columns.length - 1
                          ? getStickyCellClassName(row.type)
                          : ""
                      }`}
                    >
                      <div className={getCellToneClass(cell.tone ?? row.tone)}>
                        {cell.content}
                      </div>
                    </div>
                    );
                  })}
                </div>
              );
            })
            )}
          </div>
        </div>
      </div>

      {showScrollIndicator ? (
        <div className="relative mx-auto mt-2 flex h-2 w-[130px] overflow-hidden rounded-full bg-[#D3E1EC]">
          <div
            className="h-full rounded-full bg-primary/55 transition-transform duration-75"
            style={{
              width: `${indicatorThumbWidth}px`,
              transform: `translateX(${scrollProgress * (130 - indicatorThumbWidth)}px)`,
            }}
          />
        </div>
      ) : null}
    </>
  );
}

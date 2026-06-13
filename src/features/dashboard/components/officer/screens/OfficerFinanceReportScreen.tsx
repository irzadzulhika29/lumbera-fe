"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getOfficerFinancialReport,
  type OfficerFinancialReportData,
} from "@/src/features/dashboard/api";
import {
  getFinanceReportConfig,
  type FinanceReportPeriod,
} from "@/src/features/dashboard/reportData";

import DashboardScreenShell from "../../layout/DashboardScreenShell";
import OfficerFlowHeader from "../layout/OfficerFlowHeader";
import FinanceReportTable from "../reports/FinanceReportTable";
import FinanceReportTabs from "../reports/FinanceReportTabs";
import {
  buildFinanceTableConfig,
  type FinanceReportType,
} from "../reports/financeReportConfig";

type FinanceReportScreenProps = {
  period: FinanceReportPeriod;
  type: FinanceReportType;
};

type FinancialReportState = {
  data: OfficerFinancialReportData | null;
  errorMessage: string | null;
  isLoading: boolean;
  period: string;
};

export default function OfficerFinanceReportScreen({
  period,
  type,
}: FinanceReportScreenProps) {
  const fallbackReport = getFinanceReportConfig(period);
  const [reportState, setReportState] = useState<FinancialReportState>({
    data: null,
    errorMessage: null,
    isLoading: true,
    period,
  });
  const isStalePeriod = reportState.period !== period;
  const financialReport = isStalePeriod ? null : reportState.data;
  const errorMessage = isStalePeriod ? null : reportState.errorMessage;
  const isLoading = isStalePeriod || reportState.isLoading;
  const activeTable = useMemo(
    () => buildFinanceTableConfig(type, financialReport),
    [financialReport, type],
  );
  const periodColumns = financialReport?.period_columns ?? [];
  const report = {
    ...fallbackReport,
    columns:
      periodColumns.length > 0
        ? periodColumns.map((column) => column.label)
        : fallbackReport.columns,
    label:
      periodColumns.length > 1
        ? `Periode ${periodColumns[0].label} - ${
            periodColumns[periodColumns.length - 1].label
          }`
        : fallbackReport.label,
  };

  useEffect(() => {
    let isMounted = true;

    getOfficerFinancialReport(period)
      .then((response) => {
        if (!isMounted) return;
        setReportState({
          data: response.data,
          errorMessage: null,
          isLoading: false,
          period,
        });
      })
      .catch((error: unknown) => {
        if (!isMounted) return;

        setReportState({
          data: null,
          errorMessage:
            error instanceof Error
              ? error.message
              : "Gagal mengambil laporan keuangan. Silakan coba lagi.",
          isLoading: false,
          period,
        });
      });

    return () => {
      isMounted = false;
    };
  }, [period]);

  return (
    <DashboardScreenShell background="bg-[#f7f8f9]">
      <OfficerFlowHeader
          backHref={`/dashboard/reports?period=${period}`}
          title="Laporan Keuangan"
          subtitle="Lihat pertumbuhan keuangan koperasi"
      />

      <div className="px-6 pb-6 pt-6">
        <p className="mt-8 text-[1rem] font-bold text-primary">
          {report.label}
        </p>

        <FinanceReportTabs period={period} type={type} />

        {isLoading ? (
          <div className="mt-6 rounded-[14px] border border-[#dbe4ea] bg-white px-5 py-8 text-center text-[0.95rem] font-semibold text-text/60 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
            Memuat laporan keuangan...
          </div>
        ) : errorMessage ? (
          <div className="mt-6 rounded-[14px] border border-[#f2c9c9] bg-[#fff5f5] px-5 py-5 text-[0.95rem] font-semibold text-[#c62828]">
            {errorMessage}
          </div>
        ) : activeTable.rows.length === 0 || report.columns.length === 0 ? (
          <div className="mt-6 rounded-[14px] border border-[#dbe4ea] bg-white px-5 py-8 text-center text-[0.95rem] font-semibold text-text/60 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
            Data laporan belum tersedia.
          </div>
        ) : (
          <FinanceReportTable report={report} table={activeTable} />
        )}

        <div className="mt-8">
          <button
            type="button"
            className="w-full rounded-[14px] bg-primary px-4 py-5 text-[1rem] font-bold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)]"
          >
            {activeTable.exportLabel}
          </button>
        </div>
      </div>
    </DashboardScreenShell>
  );
}

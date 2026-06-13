"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getOfficerFinancialReport } from "@/src/features/dashboard/api";
import { getDashboardNavigation } from "@/src/features/dashboard/data";
import { financePeriodOptions } from "@/src/features/dashboard/reportData";
import SelectField from "@/src/shared/components/ui/SelectField";

import DashboardScreenShell from "../../layout/DashboardScreenShell";
import OfficerFlowHeader from "../layout/OfficerFlowHeader";

const reportTypeOptions = [
  { label: "Neraca", value: "balance", checked: true },
  { label: "Laba Rugi", value: "profit-loss", checked: true },
  { label: "Arus Kas", value: "cash-flow", checked: false },
] as const;

const qrPattern = [
  "111111101001001111111",
  "100000100111101000001",
  "101110100010101011101",
  "101110101100001011101",
  "101110100011101011101",
  "100000101010101000001",
  "111111101010101111111",
  "000000001101100000000",
  "111001111001111010111",
  "001011000100001010010",
  "101110111011101111001",
  "010001001000101001101",
  "111111100111001101010",
  "000000001010011000100",
  "111111100010111010011",
  "100000101110001000101",
  "101110100011101111101",
  "101110101010100100001",
  "101110101101011011101",
  "100000100000110010001",
  "111111101101011111111",
] as const;

const cooperativeHealthItems = [
  { label: "Keuangan (35%)", value: "87", tone: "text-[#159A97]" },
  { label: "Operasional (25%)", value: "75", tone: "text-[#F59E0B]" },
  { label: "Data (20%)", value: "80", tone: "text-[#159A97]" },
  { label: "Kepatuhan (20%)", value: "72", tone: "text-[#F59E0B]" },
] as const;

function ReportTypeToggle({
  checked,
  label,
}: {
  checked: boolean;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-[8px] border transition-colors ${
          checked ? "border-primary bg-primary" : "border-[#d9dee4] bg-white"
        }`}
      >
        <span
          className={`block h-[10px] w-[6px] rotate-45 border-b-2 border-r-2 ${
            checked ? "border-white" : "border-transparent"
          }`}
        />
      </span>
      <span className="text-[12px] font-medium text-text/82">{label}</span>
    </label>
  );
}

function SecurityQr() {
  return (
    <div className="grid h-[118px] w-[118px] grid-cols-21 overflow-hidden rounded-[4px] bg-white p-[6px] shadow-[0_0_0_1px_rgba(15,23,42,0.08)]">
      {qrPattern.flatMap((row, rowIndex) =>
        row
          .split("")
          .map((cell, cellIndex) => (
            <span
              key={`${rowIndex}-${cellIndex}`}
              className={cell === "1" ? "bg-[#111111]" : "bg-white"}
            />
          )),
      )}
    </div>
  );
}

type ReportScreenProps = {
  initialPeriod?: string;
};

type ReportSummaryState = {
  data: Awaited<ReturnType<typeof getOfficerFinancialReport>>["data"] | null;
  errorMessage: string | null;
  isLoading: boolean;
  period: string;
};

export default function OfficerReportScreen({
  initialPeriod = "2026-06",
}: ReportScreenProps) {
  const navigation = getDashboardNavigation("officer", "Laporan");
  const [period, setPeriod] = useState(initialPeriod);
  const [summaryState, setSummaryState] = useState<ReportSummaryState>({
    data: null,
    errorMessage: null,
    isLoading: true,
    period: initialPeriod,
  });
  const isStalePeriod = summaryState.period !== period;
  const reportData = isStalePeriod ? null : summaryState.data;

  useEffect(() => {
    let isMounted = true;

    getOfficerFinancialReport(period)
      .then((response) => {
        if (!isMounted) return;

        setSummaryState({
          data: response.data,
          errorMessage: null,
          isLoading: false,
          period,
        });
      })
      .catch((error: unknown) => {
        if (!isMounted) return;

        setSummaryState({
          data: null,
          errorMessage:
            error instanceof Error
              ? error.message
              : "Gagal mengambil ringkasan laporan.",
          isLoading: false,
          period,
        });
      });

    return () => {
      isMounted = false;
    };
  }, [period]);

  const latestPeriod = reportData?.period_columns.at(-1);
  const latestPeriodLabel = latestPeriod?.label ?? period;

  return (
    <DashboardScreenShell
      background="bg-[#f7f8f9]"
      navigationItems={navigation}
    >
      <OfficerFlowHeader
        backHref="/dashboard"
        title="Laporan"
        subtitle="Pantau kinerja operasional koperasi"
      />

      <div className="px-6 pb-4">
        <section>
          <div className="flex items-start justify-center gap-3">
            <div className="min-w-0 basis-[40%] space-y-[1rem] pt-5">
              <h2 className="text-[13px] font-bold tracking-[-0.03em] text-primary">
                Kesehatan Koperasi
              </h2>
              {cooperativeHealthItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 text-[0.92rem]"
                >
                  <span className="font-medium text-[11px]">{item.label}</span>
                  <span className={`text-[11px] font-bold ${item.tone}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="basis-[60%] shrink-0 pt-1">
              <div className="relative mx-auto h-[176px] w-[176px]">
                <svg
                  viewBox="0 0 160 160"
                  className="absolute inset-0 h-full w-full overflow-visible"
                  aria-hidden="true"
                >
                  <circle
                    cx="80"
                    cy="80"
                    r="55"
                    fill="none"
                    stroke="#f1f6f8"
                    strokeWidth="25"
                  />
                  <path
                    d="M 128 107 A 55 55 0 0 1 52 128"
                    fill="none"
                    stroke="#FF9D1A"
                    strokeLinecap="round"
                    strokeWidth="25"
                  />
                  <path
                    d="M 52 128 A 55 55 0 0 1 27 58"
                    fill="none"
                    stroke="#147DDB"
                    strokeLinecap="round"
                    strokeWidth="25"
                  />
                  <path
                    d="M 104 30 A 55 55 0 0 1 128 107"
                    fill="none"
                    stroke="#10AF4A"
                    strokeLinecap="round"
                    strokeWidth="25"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[2.9rem] font-bold leading-none tracking-[-0.08em] text-text">
                    A
                  </span>
                  <span className="mt-2 text-[1rem] font-semibold tracking-[-0.04em] text-text/82">
                    87/100
                  </span>
                </div>
              </div>

              <p className="text-center text-[12px] font-medium text-text/68">
                Cooperative Health Score
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[18px] border border-[#dde2e7] bg-white px-6 py-6 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
          <h2 className="text-[1rem] font-bold tracking-[-0.03em] text-primary">
            Laporan Keuangan
          </h2>

          <div className="mt-6">
            <SelectField
              value={period}
              options={financePeriodOptions.map((option) => ({ ...option }))}
              onChange={setPeriod}
              placeholder="Pilih periode"
              fieldClassName="rounded-[14px] border border-[#dfe3e8] bg-white px-5 py-5 text-[1.18rem] font-medium shadow-[inset_0_0_0_2px_rgba(240,242,245,0.55)]"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
            {reportTypeOptions.map((option) => (
              <ReportTypeToggle
                key={option.value}
                checked={option.checked}
                label={option.label}
              />
            ))}
          </div>

          <Link
            href={`/dashboard/reports/finance?period=${period}`}
            className="mt-3 block w-full rounded-[14px] bg-primary px-4 py-3 text-center text-[1rem] font-bold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5"
          >
            Lihat Laporan
          </Link>
        </section>

        <section className="mt-5 flex items-start gap-5">
          <div className="shrink-0">
            <SecurityQr />
            <p className="mt-4 text-xs font-medium text-primary">
              Terakhir di cek
            </p>
            <p className=" text-xs font-medium text-primary">
              {latestPeriodLabel}
            </p>
          </div>

          <div className="min-w-0 pt-3">
            <h2 className="text-[1rem] font-bold leading-snug tracking-[-0.03em] text-primary">
              Cek keamanan
              <br />
              dan Sertifikat Koperasi
            </h2>

            <Link
              href="/dashboard/reports/security"
              className="block mt-5 rounded-[14px] bg-primary px-6 py-3 text-[1rem] font-bold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5"
            >
              Cek sekarang
            </Link>
          </div>
        </section>
      </div>
    </DashboardScreenShell>
  );
}

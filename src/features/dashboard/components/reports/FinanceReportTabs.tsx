import Link from "next/link";

import type { FinanceReportPeriod } from "@/src/features/dashboard/reportData";

import {
  financeReportTabs,
  type FinanceReportType,
} from "./financeReportConfig";

export default function FinanceReportTabs({
  period,
  type,
}: {
  period: FinanceReportPeriod;
  type: FinanceReportType;
}) {
  return (
    <div className="mt-4 flex gap-2">
      {financeReportTabs.map((tab) => (
        <Link
          key={tab.value}
          href={`/dashboard/reports/finance?period=${period}&type=${tab.value}`}
          className={`rounded-full px-4 py-2 text-[0.92rem] font-bold transition-colors ${
            tab.value === type
              ? "bg-[#DDF0EF] text-primary"
              : "bg-[#EFEFEF] text-text/26"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

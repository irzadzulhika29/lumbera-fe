import {
  getFinanceReportConfig,
  type FinanceReportPeriod,
} from "@/src/features/dashboard/reportData";

import DashboardPageHeader from "../../layout/DashboardPageHeader";
import DashboardScreenShell from "../../layout/DashboardScreenShell";
import FinanceReportTable from "../reports/FinanceReportTable";
import FinanceReportTabs from "../reports/FinanceReportTabs";
import {
  financeTableConfigs,
  type FinanceReportType,
} from "../reports/financeReportConfig";

type FinanceReportScreenProps = {
  period: FinanceReportPeriod;
  type: FinanceReportType;
};

export default function OfficerFinanceReportScreen({
  period,
  type,
}: FinanceReportScreenProps) {
  const report = getFinanceReportConfig(period);
  const activeTable = financeTableConfigs[type];

  return (
    <DashboardScreenShell background="bg-[#f7f8f9]">
      <div className="px-6 pb-6 pt-[calc(1.4rem+env(safe-area-inset-top))]">
        <DashboardPageHeader
          backHref={`/dashboard/reports?period=${period}`}
          title="Laporan Keuangan"
          subtitle="Lihat pertumbuhan keuangan koperasi"
        />

        <p className="mt-8 text-[1rem] font-bold text-primary">
          {report.label}
        </p>

        <FinanceReportTabs period={period} type={type} />
        <FinanceReportTable report={report} table={activeTable} />

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

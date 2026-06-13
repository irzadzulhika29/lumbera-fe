import { getDashboardData } from "@/src/features/dashboard/data";
import type { DashboardRole } from "@/src/features/dashboard/types";

import DashboardHeader from "../home/DashboardHeader";
import DashboardStats from "../home/DashboardStats";
import QuickActions from "../home/QuickActions";
import RecentTransactions from "../home/RecentTransactions";
import DashboardScreenShell from "../layout/DashboardScreenShell";

export default function DashboardScreen({ role }: { role: DashboardRole }) {
  const dashboard = getDashboardData(role);

  return (
    <DashboardScreenShell
      background="bg-[#f7f8f9]"
      navigationItems={dashboard.navigation}
    >
      <DashboardHeader
        greeting={dashboard.greeting}
        userName={dashboard.userName}
        cooperativeName={dashboard.cooperativeName}
        period={dashboard.period}
        syncLabel={dashboard.syncLabel}
        stats={<DashboardStats metrics={dashboard.metrics} />}
      />

      <div className="bg-[#f7f8f9] px-5 pb-5 pt-[58px]">
        <QuickActions actions={dashboard.actions} />
        <RecentTransactions initialTransactions={dashboard.transactions.slice(0, 5)} />
      </div>
    </DashboardScreenShell>
  );
}

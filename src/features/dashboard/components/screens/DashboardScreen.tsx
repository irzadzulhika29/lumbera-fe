import { getDashboardData } from "@/src/features/dashboard/data";
import type { DashboardRole } from "@/src/features/dashboard/types";

import DashboardHeader from "../home/DashboardHeader";
import DashboardStats from "../home/DashboardStats";
import MemberDashboardContent from "../home/MemberDashboardContent";
import OfficerDashboardSummaryHeader from "../home/OfficerDashboardSummaryHeader";
import QuickActions from "../home/QuickActions";
import RecentTransactions from "../home/RecentTransactions";
import DashboardScreenShell from "../layout/DashboardScreenShell";

export default function DashboardScreen({ role }: { role: DashboardRole }) {
  const dashboard = getDashboardData(role);
  const memberDashboard = role === "member";

  return (
    <DashboardScreenShell
      background="bg-[#f7f8f9]"
      navigationItems={dashboard.navigation}
    >
      {memberDashboard ? (
        dashboard.memberSummary && dashboard.creditProfile ? (
          <MemberDashboardContent
            initialCooperativeName={dashboard.cooperativeName}
            initialCreditProfile={dashboard.creditProfile}
            initialPeriod={dashboard.period}
            initialSummary={dashboard.memberSummary}
            initialTransactions={dashboard.transactions}
            initialUserName={dashboard.userName}
          />
        ) : null
      ) : (
        <OfficerDashboardSummaryHeader
          greeting={dashboard.greeting}
          userName={dashboard.userName}
          cooperativeName={dashboard.cooperativeName}
          initialPeriod={dashboard.period}
          syncLabel={dashboard.syncLabel}
          initialMetrics={dashboard.metrics}
        />
      )}

      {memberDashboard ? null : (
        <div className="bg-[#f7f8f9] px-5 pb-5 pt-[58px]">
          <QuickActions actions={dashboard.actions} />
          <RecentTransactions
            initialTransactions={dashboard.transactions.slice(0, 5)}
            variant="compact"
            viewAllHref="/dashboard/officer/transactions"
          />
        </div>
      )}
    </DashboardScreenShell>
  );
}

import { getDashboardData } from "@/src/features/dashboard/data";
import type { DashboardRole } from "@/src/features/dashboard/types";

import DashboardHeader from "../home/DashboardHeader";
import DashboardStats from "../home/DashboardStats";
import MemberCreditProfileCard from "../home/MemberCreditProfileCard";
import MemberSavingsSummary from "../home/MemberSavingsSummary";
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
      <DashboardHeader
        greeting={dashboard.greeting}
        userName={dashboard.userName}
        cooperativeName={dashboard.cooperativeName}
        period={dashboard.period}
        syncLabel={dashboard.syncLabel}
        backgroundClassName={
          memberDashboard ? "bg-primary-deep" : undefined
        }
        titleClassName={memberDashboard ? "text-[1.5rem]" : undefined}
        statsOffsetClassName={memberDashboard ? "-bottom-[78px]" : undefined}
        stats={
          memberDashboard && dashboard.memberSummary ? (
            <MemberSavingsSummary summary={dashboard.memberSummary} />
          ) : (
            <DashboardStats metrics={dashboard.metrics} />
          )
        }
      />

      <div
        className={`bg-[#f7f8f9] px-5 pb-5 ${
          memberDashboard ? "pt-[104px]" : "pt-[58px]"
        }`}
      >
        {memberDashboard && dashboard.creditProfile ? (
          <MemberCreditProfileCard profile={dashboard.creditProfile} />
        ) : null}

        <QuickActions actions={dashboard.actions} />
        <RecentTransactions
          initialTransactions={
            memberDashboard
              ? dashboard.transactions
              : dashboard.transactions.slice(0, 5)
          }
          variant={memberDashboard ? "member" : "compact"}
          viewAllHref={
            memberDashboard ? "/dashboard/member" : "/dashboard/transactions"
          }
        />
      </div>
    </DashboardScreenShell>
  );
}

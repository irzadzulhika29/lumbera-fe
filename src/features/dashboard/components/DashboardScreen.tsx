import MobileScreen from "@/src/features/onboarding/components/MobileScreen";
import { getDashboardData } from "@/src/features/dashboard/data";
import type { DashboardRole } from "@/src/features/dashboard/types";

import DashboardBottomNavigation from "./DashboardBottomNavigation";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";
import RecentTransactions from "./RecentTransactions";

export default function DashboardScreen({ role }: { role: DashboardRole }) {
  const dashboard = getDashboardData(role);

  return (
    <MobileScreen className="bg-[#f7f8f9]">
      <div className="flex h-[100svh] w-full flex-none flex-col overflow-hidden bg-[#f7f8f9] sm:h-[860px]">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:rgba(18,148,144,0.35)_transparent]">
          <DashboardHeader
            greeting={dashboard.greeting}
            userName={dashboard.userName}
            cooperativeName={dashboard.cooperativeName}
            period={dashboard.period}
            syncLabel={dashboard.syncLabel}
            notificationCount={dashboard.notificationCount}
          />

          <main className="relative -mt-5 rounded-t-[28px] bg-[#f7f8f9] px-5 pb-5 pt-5">
            <DashboardStats metrics={dashboard.metrics} />
            <QuickActions actions={dashboard.actions} />
            <RecentTransactions transactions={dashboard.transactions} />
          </main>
        </div>

        <DashboardBottomNavigation items={dashboard.navigation} />
      </div>
    </MobileScreen>
  );
}

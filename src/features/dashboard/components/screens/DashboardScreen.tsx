 "use client";

import { useEffect, useState } from "react";

import { getOfficerCooperativeHealthScore } from "@/src/features/dashboard/api";
import { getDashboardData } from "@/src/features/dashboard/data";
import type { DashboardMetric, DashboardRole } from "@/src/features/dashboard/types";

import DashboardHeader from "../home/DashboardHeader";
import DashboardStats from "../home/DashboardStats";
import QuickActions from "../home/QuickActions";
import RecentTransactions from "../home/RecentTransactions";
import DashboardScreenShell from "../layout/DashboardScreenShell";

export default function DashboardScreen({ role }: { role: DashboardRole }) {
  const dashboard = getDashboardData(role);
  const [metrics, setMetrics] = useState<DashboardMetric[]>(dashboard.metrics);

  useEffect(() => {
    setMetrics(dashboard.metrics);
  }, [dashboard.metrics]);

  useEffect(() => {
    if (role !== "officer") {
      return;
    }

    let cancelled = false;

    getOfficerCooperativeHealthScore()
      .then((response) => {
        if (cancelled) return;

        const chsMetric: DashboardMetric = {
          label: "CHS Score",
          value: String(response.data.display_score),
          badge: `Grade ${response.data.grade}`,
          caption: response.data.category,
          tone:
            response.data.grade === "A" || response.data.grade === "B"
              ? "success"
              : "muted",
        };

        setMetrics((currentMetrics) =>
          currentMetrics.map((metric, index) =>
            index === 0 || metric.label === "CHS Score" ? chsMetric : metric,
          ),
        );
      })
      .catch(() => {
        if (!cancelled) {
          setMetrics(dashboard.metrics);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dashboard.metrics, role]);

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
        stats={<DashboardStats metrics={metrics} />}
      />

      <div className="bg-[#f7f8f9] px-5 pb-5 pt-[58px]">
        <QuickActions actions={dashboard.actions} />
        <RecentTransactions initialTransactions={dashboard.transactions.slice(0, 5)} />
      </div>
    </DashboardScreenShell>
  );
}

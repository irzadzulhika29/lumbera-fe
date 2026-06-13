"use client";

import { useEffect, useState } from "react";

import { getOfficerDashboardSummary } from "@/src/features/dashboard/api";
import { getDashboardData } from "@/src/features/dashboard/data";
import type { DashboardMetric, DashboardRole } from "@/src/features/dashboard/types";

import DashboardHeader from "../home/DashboardHeader";
import DashboardStats from "../home/DashboardStats";
import MemberCreditProfileCard from "../home/MemberCreditProfileCard";
import MemberSavingsSummary from "../home/MemberSavingsSummary";
import QuickActions from "../home/QuickActions";
import RecentTransactions from "../home/RecentTransactions";
import DashboardScreenShell from "../layout/DashboardScreenShell";

export default function DashboardScreen({ role }: { role: DashboardRole }) {
  const dashboard = getDashboardData(role);
  const [metrics, setMetrics] = useState<DashboardMetric[]>(dashboard.metrics);
  const [periodLabel, setPeriodLabel] = useState(dashboard.period);

  useEffect(() => {
    setMetrics(dashboard.metrics);
    setPeriodLabel(dashboard.period);
  }, [dashboard.metrics]);

  useEffect(() => {
    if (role !== "officer") {
      return;
    }

    let cancelled = false;

    getOfficerDashboardSummary()
      .then((response) => {
        if (cancelled) return;

        const chsMetric: DashboardMetric = {
          label: "CHS Score",
          value: String(response.data.chs.display_score),
          badge: `Grade ${response.data.chs.grade}`,
          caption: response.data.chs.category,
          tone:
            response.data.chs.grade === "A" || response.data.chs.grade === "B"
              ? "success"
              : "muted",
        };
        const activeMembersMetric: DashboardMetric = {
          label: "Anggota Aktif",
          value: `${response.data.members.active} Anggota`,
          caption: `dari ${response.data.members.registered} terdaftar`,
          tone: "muted",
        };

        setMetrics([chsMetric, activeMembersMetric]);
        setPeriodLabel(`KSP · ${response.data.period_label}`);
      })
      .catch(() => {
        if (!cancelled) {
          setMetrics(dashboard.metrics);
          setPeriodLabel(dashboard.period);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dashboard.metrics, role]);
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
        period={periodLabel}
        syncLabel={dashboard.syncLabel}
        stats={<DashboardStats metrics={metrics} />}
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

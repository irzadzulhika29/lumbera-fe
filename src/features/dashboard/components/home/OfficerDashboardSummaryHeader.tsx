"use client";

import { useEffect, useState } from "react";

import {
  getOfficerDashboardSummary,
  getUserProfile,
} from "@/src/features/dashboard/api";
import type { DashboardMetric } from "@/src/features/dashboard/types";
import {
  formatDashboardName,
  getProfileSubtitle,
} from "@/src/features/dashboard/utils/profileMapper";

import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";

type OfficerDashboardSummaryHeaderProps = {
  cooperativeName: string;
  greeting: string;
  initialMetrics: DashboardMetric[];
  initialPeriod: string;
  syncLabel?: string;
  userName: string;
};

export default function OfficerDashboardSummaryHeader({
  cooperativeName,
  greeting,
  initialMetrics,
  initialPeriod,
  syncLabel,
  userName,
}: OfficerDashboardSummaryHeaderProps) {
  const [dashboardCooperativeName, setDashboardCooperativeName] =
    useState(cooperativeName);
  const [dashboardUserName, setDashboardUserName] = useState(userName);
  const [metrics, setMetrics] = useState<DashboardMetric[]>(initialMetrics);
  const [periodLabel, setPeriodLabel] = useState(initialPeriod);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getOfficerDashboardSummary(), getUserProfile()])
      .then(([summaryResponse, profileResponse]) => {
        if (cancelled) return;

        setDashboardUserName(
          formatDashboardName(profileResponse.data.profile.full_name),
        );
        setDashboardCooperativeName(
          profileResponse.data.profile.cooperative_name?.trim() ||
            getProfileSubtitle(profileResponse.data),
        );
        setMetrics([
          {
            label: "CHS Score",
            value: String(summaryResponse.data.chs.display_score),
            badge: `Grade ${summaryResponse.data.chs.grade}`,
            caption: summaryResponse.data.chs.category,
            tone:
              summaryResponse.data.chs.grade === "A" ||
              summaryResponse.data.chs.grade === "B"
                ? "success"
                : "muted",
          },
          {
            label: "Anggota Aktif",
            value: `${summaryResponse.data.members.active} Anggota`,
            caption: `dari ${summaryResponse.data.members.registered} terdaftar`,
            tone: "muted",
          },
        ]);
        setPeriodLabel(`KSP · ${summaryResponse.data.period_label}`);
      })
      .catch(() => {
        if (cancelled) return;
        setDashboardCooperativeName(cooperativeName);
        setDashboardUserName(userName);
        setMetrics(initialMetrics);
        setPeriodLabel(initialPeriod);
      });

    return () => {
      cancelled = true;
    };
  }, [cooperativeName, initialMetrics, initialPeriod, userName]);

  return (
    <DashboardHeader
      greeting={greeting}
      userName={dashboardUserName}
      cooperativeName={dashboardCooperativeName}
      period={periodLabel}
      syncLabel={syncLabel ?? ""}
      stats={<DashboardStats metrics={metrics} />}
    />
  );
}

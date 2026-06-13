"use client";

import { useEffect, useState } from "react";

import { getOfficerDashboardSummary } from "@/src/features/dashboard/api";
import type { DashboardMetric } from "@/src/features/dashboard/types";

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
  const [metrics, setMetrics] = useState<DashboardMetric[]>(initialMetrics);
  const [periodLabel, setPeriodLabel] = useState(initialPeriod);

  useEffect(() => {
    let cancelled = false;

    getOfficerDashboardSummary()
      .then((response) => {
        if (cancelled) return;

        setMetrics([
          {
            label: "CHS Score",
            value: String(response.data.chs.display_score),
            badge: `Grade ${response.data.chs.grade}`,
            caption: response.data.chs.category,
            tone:
              response.data.chs.grade === "A" || response.data.chs.grade === "B"
                ? "success"
                : "muted",
          },
          {
            label: "Anggota Aktif",
            value: `${response.data.members.active} Anggota`,
            caption: `dari ${response.data.members.registered} terdaftar`,
            tone: "muted",
          },
        ]);
        setPeriodLabel(`KSP · ${response.data.period_label}`);
      })
      .catch(() => {
        if (cancelled) return;
        setMetrics(initialMetrics);
        setPeriodLabel(initialPeriod);
      });

    return () => {
      cancelled = true;
    };
  }, [initialMetrics, initialPeriod]);

  return (
    <DashboardHeader
      greeting={greeting}
      userName={userName}
      cooperativeName={cooperativeName}
      period={periodLabel}
      syncLabel={syncLabel ?? ""}
      stats={<DashboardStats metrics={metrics} />}
    />
  );
}

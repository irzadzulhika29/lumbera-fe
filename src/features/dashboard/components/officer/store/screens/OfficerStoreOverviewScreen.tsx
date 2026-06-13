"use client";

import { useEffect, useMemo, useState } from "react";

import FilterChips from "@/src/features/dashboard/components/common/FilterChips";
import TransactionList from "@/src/features/dashboard/components/common/TransactionList";
import { getOfficerStoreDashboard } from "@/src/features/dashboard/api";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import OfficerFlowHeader from "@/src/features/dashboard/components/officer/layout/OfficerFlowHeader";
import StoreActionGrid from "@/src/features/dashboard/components/officer/store/common/StoreActionGrid";
import StoreStatsCard from "@/src/features/dashboard/components/officer/store/common/StoreStatsCard";
import StoreWarningBanner from "@/src/features/dashboard/components/officer/store/common/StoreWarningBanner";
import { getDashboardNavigation } from "@/src/features/dashboard/data";
import { storeDashboardData } from "@/src/features/dashboard/storeData";
import type { StoreMutationFilter } from "@/src/features/dashboard/storeTypes";
import {
  mapOfficerStoreDashboardToAlertLabel,
  mapOfficerStoreDashboardToMutations,
  mapOfficerStoreDashboardToStats,
} from "@/src/features/dashboard/utils/officerStoreMapper";

export default function OfficerStoreOverviewScreen() {
  const [activeFilter, setActiveFilter] = useState<StoreMutationFilter>("all");
  const [stats, setStats] = useState(storeDashboardData.stats);
  const [alertLabel, setAlertLabel] = useState(storeDashboardData.alertLabel);
  const [mutations, setMutations] = useState(storeDashboardData.mutations);

  useEffect(() => {
    let cancelled = false;

    getOfficerStoreDashboard()
      .then((response) => {
        if (cancelled) return;

        setStats(mapOfficerStoreDashboardToStats(response.data));
        setAlertLabel(mapOfficerStoreDashboardToAlertLabel(response.data));
        setMutations(mapOfficerStoreDashboardToMutations(response.data));
      })
      .catch(() => {
        if (cancelled) return;
        setStats(storeDashboardData.stats);
        setAlertLabel(storeDashboardData.alertLabel);
        setMutations(storeDashboardData.mutations);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredMutations = useMemo(() => {
    if (activeFilter === "all") {
      return mutations;
    }

    return mutations.filter(
      (mutation) => mutation.mutationType === activeFilter,
    );
  }, [activeFilter, mutations]);

  return (
    <DashboardScreenShell
      background="bg-white"
      navigationItems={getDashboardNavigation("officer", "Beranda")}
    >
      <OfficerFlowHeader
        backHref="/dashboard"
        title="Toko & Stok"
        subtitle="Kelola stok produk koperasi anda"
        floatingContent={<StoreStatsCard stats={stats} />}
        floatingClassName="px-0 py-0"
      />

      <div className="bg-white px-5 pb-7 pt-0">
        <div className="mt-12">
          <StoreWarningBanner
            href={storeDashboardData.alertHref}
            label={alertLabel}
          />
        </div>

        {storeDashboardData.sections.map((section) => (
          <StoreActionGrid
            key={section.title}
            title={section.title}
            actions={section.actions}
          />
        ))}

        <section className="mt-8">
          <h2 className="text-[1.05rem] font-bold tracking-[-0.03em] text-primary">
            Mutasi terbaru
          </h2>

          <FilterChips
            activeValue={activeFilter}
            className="mt-4"
            onChange={(value) => setActiveFilter(value as StoreMutationFilter)}
            options={storeDashboardData.mutationFilters}
          />

          <div className="mt-6">
            {filteredMutations.length > 0 ? (
              <TransactionList transactions={filteredMutations} />
            ) : (
              <div className="rounded-[14px] border border-border bg-white px-4 py-5 text-[0.84rem] font-medium text-text/56 shadow-sm">
                Belum ada mutasi stok yang tercatat.
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardScreenShell>
  );
}

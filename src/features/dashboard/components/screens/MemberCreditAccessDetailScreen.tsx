"use client";

import { useState } from "react";

import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import AccessInfoBanner from "@/src/features/dashboard/components/member/credit-access/AccessInfoBanner";
import CreditAccessDurationOptions from "@/src/features/dashboard/components/member/credit-access/CreditAccessDurationOptions";
import CreditAccessProviderCard from "@/src/features/dashboard/components/member/credit-access/CreditAccessProviderCard";
import CreditSharedDataCard from "@/src/features/dashboard/components/member/credit-access/CreditSharedDataCard";
import { getDashboardData, getDashboardNavigation } from "@/src/features/dashboard/data";
import PressButton from "@/src/shared/components/ui/PressButton";

type MemberCreditAccessDetailScreenProps = {
  accessId: string;
  initialState: "pending" | "active";
};

export default function MemberCreditAccessDetailScreen({
  accessId,
  initialState,
}: MemberCreditAccessDetailScreenProps) {
  const dashboard = getDashboardData("member");
  const detail = dashboard.creditAccessDetails?.find((item) => item.id === accessId);
  const [state, setState] = useState<"pending" | "active">(initialState);
  const [selectedDuration, setSelectedDuration] = useState(
    detail?.defaultDuration ?? "7 Hari",
  );

  if (!detail) {
    return null;
  }

  const isActive = state === "active";

  return (
    <DashboardScreenShell
      background="bg-white"
      navigationItems={getDashboardNavigation("member", "Pinjaman")}
    >
      <div className="bg-white px-4 pb-8 pt-[calc(0.75rem+env(safe-area-inset-top))]">
        <DashboardPageHeader
          backHref="/dashboard/member/loans/access"
          title="Permintaan Akses Kredit"
          subtitle="Kelola permintaan akses data untuk akseleran"
          titleClassName="text-[1.18rem]"
          variant="compact"
        />

        <div className="mt-6 space-y-5">
          <CreditAccessProviderCard
            initials={detail.initials}
            title={detail.title}
            subtitle={detail.subtitle}
            providerLabel={detail.providerLabel}
          />

          <AccessInfoBanner
            title={detail.infoTitle}
            description={detail.infoDescription}
          />

          <CreditSharedDataCard
            sharedDataItems={detail.sharedDataItems}
            hiddenDataItems={detail.hiddenDataItems}
          />

          <section>
            <h2 className="text-[1.52rem] font-medium leading-none tracking-[-0.03em] text-text">
              Durasi Akses
            </h2>
            <CreditAccessDurationOptions
              options={detail.durationOptions}
              selected={selectedDuration}
              disabled={isActive}
              onSelect={setSelectedDuration}
            />
          </section>

          {isActive ? (
            <PressButton
              type="button"
              variant="reject"
              className="w-full rounded-[10px] py-3.5 text-[0.96rem] font-bold"
              onClick={() => setState("pending")}
            >
              Cabut Akses
            </PressButton>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <PressButton
                type="button"
                variant="reject"
                className="rounded-[10px] py-3.5 text-[0.96rem] font-bold"
              >
                Tolak
              </PressButton>
              <PressButton
                type="button"
                className="rounded-[10px] py-3.5 text-[0.96rem] font-bold"
                onClick={() => setState("active")}
              >
                Berikan akses
              </PressButton>
            </div>
          )}
        </div>
      </div>
    </DashboardScreenShell>
  );
}

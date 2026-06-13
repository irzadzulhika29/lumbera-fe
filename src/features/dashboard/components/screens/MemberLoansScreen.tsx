"use client";

import { useMemo } from "react";

import { getDashboardData, getDashboardNavigation } from "@/src/features/dashboard/data";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import CreditScoreCard from "@/src/features/dashboard/components/member/loans/CreditScoreCard";
import LoanActiveStrip from "@/src/features/dashboard/components/member/loans/LoanActiveStrip";
import LoanQuickActions from "@/src/features/dashboard/components/member/loans/LoanQuickActions";

export default function MemberLoansScreen() {
  const dashboard = getDashboardData("member");
  const profile = useMemo(() => dashboard.loanCreditProfile, [dashboard]);
  const activeLoan = useMemo(() => dashboard.activeLoanSummary, [dashboard]);

  if (!profile || !activeLoan) {
    return null;
  }

  return (
    <DashboardScreenShell
      background="bg-white"
      navigationItems={getDashboardNavigation("member", "Pinjaman")}
    >
      <div className="bg-white px-5 pb-6 pt-[calc(1.5rem+env(safe-area-inset-top))]">
        <header>
          <h1 className="text-[1.68rem] font-bold leading-none tracking-[-0.04em] text-primary">
            Pinjaman
          </h1>
          <p className="mt-2 text-[0.78rem] font-medium text-primary/78">
            Kelola permodalan dan cek profil kelayakan Anda di sini.
          </p>
        </header>

        <div className="mt-6">
          <CreditScoreCard profile={profile} />
        </div>
      </div>

      <div className="bg-white">
        <div className="px-5">
          <h2 className="text-[0.98rem] font-bold tracking-[-0.02em] text-primary">
            Pinjaman
          </h2>
        </div>

        <div className="mt-4">
          <LoanActiveStrip
            reference={activeLoan.reference}
            amount={activeLoan.amount}
            installmentLabel={activeLoan.installmentLabel}
            tenorLabel={activeLoan.tenorLabel}
            dueDateLabel={activeLoan.dueDateLabel}
            paidProgressPercent={activeLoan.paidProgressPercent}
            paidProgressLabel={activeLoan.paidProgressLabel}
          />
        </div>

        <div className="bg-white px-4 pb-7 pt-6">
          <LoanQuickActions />
        </div>
      </div>
    </DashboardScreenShell>
  );
}

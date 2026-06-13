"use client";

import { useEffect, useState } from "react";

import { getMemberLoanDashboard } from "@/src/features/dashboard/api";
import { getDashboardData, getDashboardNavigation } from "@/src/features/dashboard/data";
import type {
  DashboardActiveLoanSummary,
  DashboardLoanCreditProfile,
} from "@/src/features/dashboard/types";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import CreditScoreCard from "@/src/features/dashboard/components/member/loans/CreditScoreCard";
import LoanActiveStrip from "@/src/features/dashboard/components/member/loans/LoanActiveStrip";
import LoanQuickActions from "@/src/features/dashboard/components/member/loans/LoanQuickActions";
import {
  mapMemberLoanDashboardToActiveLoan,
  mapMemberLoanDashboardToCreditProfile,
} from "@/src/features/dashboard/utils/memberLoanDashboardMapper";

export default function MemberLoansScreen() {
  const dashboard = getDashboardData("member");
  const [profile, setProfile] = useState<DashboardLoanCreditProfile | undefined>(
    dashboard.loanCreditProfile,
  );
  const [activeLoan, setActiveLoan] = useState<
    DashboardActiveLoanSummary | undefined
  >(dashboard.activeLoanSummary);
  const [actionsState, setActionsState] = useState({
    history_enabled: true,
    loan_application_enabled: true,
    credit_access_enabled: true,
  });

  useEffect(() => {
    let cancelled = false;

    getMemberLoanDashboard()
      .then((response) => {
        if (cancelled) return;

        setProfile(mapMemberLoanDashboardToCreditProfile(response.data));
        setActiveLoan(mapMemberLoanDashboardToActiveLoan(response.data));
        setActionsState(response.data.actions);
      })
      .catch(() => {
        if (cancelled) return;
        setProfile(dashboard.loanCreditProfile);
        setActiveLoan(dashboard.activeLoanSummary);
      });

    return () => {
      cancelled = true;
    };
  }, [dashboard.activeLoanSummary, dashboard.loanCreditProfile]);

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
          {activeLoan ? (
            <LoanActiveStrip
              reference={activeLoan.reference}
              amount={activeLoan.amount}
              installmentLabel={activeLoan.installmentLabel}
              tenorLabel={activeLoan.tenorLabel}
              dueDateLabel={activeLoan.dueDateLabel}
              paidProgressPercent={activeLoan.paidProgressPercent}
              paidProgressLabel={activeLoan.paidProgressLabel}
            />
          ) : (
            <section className="mx-4 rounded-[24px] border border-primary/10 bg-[#f4fbfb] px-5 py-6 text-center">
              <h3 className="text-[1rem] font-bold tracking-[-0.025em] text-primary">
                Belum ada pinjaman aktif
              </h3>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-text/68">
                Anda belum memiliki cicilan berjalan. Ajukan pinjaman baru atau
                cek akses kredit untuk melihat opsi yang tersedia.
              </p>
            </section>
          )}
        </div>

        <div className="bg-white px-4 pb-7 pt-6">
          <LoanQuickActions actionsState={actionsState} />
        </div>
      </div>
    </DashboardScreenShell>
  );
}

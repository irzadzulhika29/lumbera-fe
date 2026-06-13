"use client";

import { useEffect, useState } from "react";

import { getMemberDashboard } from "@/src/features/dashboard/api";
import type {
  DashboardCreditProfile,
  DashboardMemberSummary,
  DashboardTransaction,
} from "@/src/features/dashboard/types";

import DashboardHeader from "./DashboardHeader";
import MemberCreditProfileCard from "./MemberCreditProfileCard";
import MemberSavingsSummary from "./MemberSavingsSummary";
import RecentTransactions from "./RecentTransactions";

type MemberDashboardContentProps = {
  initialCooperativeName: string;
  initialCreditProfile: DashboardCreditProfile;
  initialPeriod: string;
  initialSummary: DashboardMemberSummary;
  initialTransactions: DashboardTransaction[];
  initialUserName: string;
};

function formatCurrency(amount: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`;
}

function formatUpdatedLabel(value: string) {
  const date = new Date(value);

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  })
    .format(date)
    .replace(".", ":");
}

function mapMemberTransactionHref(transactionType: string, direction: "IN" | "OUT") {
  if (transactionType.includes("PINJAMAN") || direction === "OUT") {
    return "/dashboard/member/loans";
  }

  return "/dashboard/member/savings";
}

function mapMemberTransactions(
  transactions: MemberDashboardContentProps["initialTransactions"],
) {
  return transactions;
}

export default function MemberDashboardContent({
  initialCooperativeName,
  initialCreditProfile,
  initialPeriod,
  initialSummary,
  initialTransactions,
  initialUserName,
}: MemberDashboardContentProps) {
  const [cooperativeName, setCooperativeName] = useState(initialCooperativeName);
  const [creditProfile, setCreditProfile] = useState(initialCreditProfile);
  const [period, setPeriod] = useState(initialPeriod);
  const [summary, setSummary] = useState(initialSummary);
  const [transactions, setTransactions] = useState(
    mapMemberTransactions(initialTransactions),
  );
  const [userName, setUserName] = useState(initialUserName);

  useEffect(() => {
    let cancelled = false;

    getMemberDashboard()
      .then((response) => {
        if (cancelled) return;

        setUserName(response.data.profile.full_name);
        setCooperativeName(response.data.profile.cooperative_name);
        setPeriod(response.data.profile.member_number);
        setSummary({
          title: "Total Saldo Tabungan",
          totalAmount: formatCurrency(response.data.savings.total_balance),
          primaryMetricLabel: "Simpanan wajib",
          primaryMetricValue: formatCurrency(response.data.savings.mandatory_balance),
          secondaryMetricLabel: "Simpanan Sukarela",
          secondaryMetricValue: formatCurrency(response.data.savings.voluntary_balance),
        });
        setCreditProfile({
          initials: response.data.mcs.grade,
          title: `Profil Kredit: ${response.data.mcs.label}`,
          scoreLabel: `MCS ${response.data.mcs.score}`,
          updatedLabel: `Diperbarui ${formatUpdatedLabel(
            response.data.mcs.last_score_updated_at,
          )}`,
        });
        setTransactions(
          response.data.recent_transactions.map((transaction) => ({
            id: transaction.transaction_id,
            href: mapMemberTransactionHref(
              transaction.transaction_type,
              transaction.direction,
            ),
            initials: transaction.direction === "OUT" ? "OUT" : "IN",
            name: transaction.transaction_type_label,
            description: transaction.description,
            amount: `${transaction.signed_amount < 0 ? "-" : "+"}${formatCurrency(
              Math.abs(transaction.amount),
            ).replace("Rp ", "Rp")}`,
            status: transaction.direction === "OUT" ? "Keluar" : "Masuk",
            statusTone:
              transaction.direction === "OUT" ? "warning" : "success",
            avatarTone: "teal",
            direction:
              transaction.direction === "OUT" ? "outgoing" : "incoming",
          })),
        );
      })
      .catch(() => {
        if (cancelled) return;
        setUserName(initialUserName);
        setCooperativeName(initialCooperativeName);
        setPeriod(initialPeriod);
        setSummary(initialSummary);
        setCreditProfile(initialCreditProfile);
        setTransactions(mapMemberTransactions(initialTransactions));
      });

    return () => {
      cancelled = true;
    };
  }, [
    initialCooperativeName,
    initialCreditProfile,
    initialPeriod,
    initialSummary,
    initialTransactions,
    initialUserName,
  ]);

  return (
    <>
      <DashboardHeader
        greeting="Selamat Pagi,"
        userName={userName}
        cooperativeName={cooperativeName}
        period={period}
        backgroundClassName="bg-primary-deep"
        titleClassName="text-[1.5rem]"
        statsOffsetClassName="-bottom-[78px]"
        stats={<MemberSavingsSummary summary={summary} />}
      />

      <div className="bg-[#f7f8f9] px-5 pb-5 pt-[104px]">
        <MemberCreditProfileCard profile={creditProfile} />
        <RecentTransactions
          initialTransactions={transactions}
          variant="member"
          viewAllHref="/dashboard/member"
        />
      </div>
    </>
  );
}

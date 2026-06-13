import type { Metadata } from "next";
import { notFound } from "next/navigation";

import OfficerTransactionConfirmScreen from "@/src/features/dashboard/components/officer/screens/OfficerTransactionConfirmScreen";
import {
  getOfficerMemberById,
  getOfficerTransactionTypeConfig,
  type OfficerMember,
} from "@/src/features/dashboard/transactionFlow";

type PageProps = {
  params: Promise<{ type: string }>;
  searchParams: Promise<{
    amount?: string;
    initials?: string;
    keterangan?: string;
    loanId?: string;
    memberId?: string;
    memberName?: string;
    meta?: string;
    option?: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type } = await params;
  const config = getOfficerTransactionTypeConfig(type);

  return {
    title: config
      ? `Konfirmasi ${config.title} | Lumbera`
      : "Konfirmasi Transaksi | Lumbera",
    description: "Langkah konfirmasi transaksi officer.",
  };
}

export default async function OfficerTransactionConfirmPage({
  params,
  searchParams,
}: PageProps) {
  const [
    { type },
    { amount, initials, loanId, memberId, memberName, meta, option, keterangan },
  ] = await Promise.all([params, searchParams]);

  const transaction = getOfficerTransactionTypeConfig(type);
  const fixtureMember = memberId ? getOfficerMemberById(memberId) : null;
  const member =
    fixtureMember ??
    (memberId && memberName
      ? ({
          id: memberId,
          initials: initials || memberName.slice(0, 2).toUpperCase(),
          name: memberName,
          meta: meta ?? "",
        } satisfies OfficerMember)
      : null);

  if (!transaction || !member || !amount) {
    notFound();
  }

  const resolvedLoanId =
    loanId ?? fixtureMember?.financialSummary?.loanId;

  return (
    <OfficerTransactionConfirmScreen
      amount={amount}
      loanId={resolvedLoanId}
      member={member}
      option={option ?? ""}
      keterangan={keterangan ?? ""}
      transaction={transaction}
    />
  );
}

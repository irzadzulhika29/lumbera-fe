import type { Metadata } from "next";
import { notFound } from "next/navigation";

import OfficerTransactionCreateScreen from "@/src/features/dashboard/components/officer/screens/OfficerTransactionCreateScreen";
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
      ? `Input Nominal ${config.title} | Lumbera`
      : "Input Nominal | Lumbera",
    description: "Langkah input nominal transaksi officer.",
  };
}

export default async function OfficerTransactionCreatePage({
  params,
  searchParams,
}: PageProps) {
  const [{ type }, { amount, initials, keterangan, loanId, memberId, memberName, meta, option }] =
    await Promise.all([params, searchParams]);

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

  if (!transaction || !member || !memberId) {
    notFound();
  }

  const resolvedLoanId =
    loanId ?? fixtureMember?.financialSummary?.loanId;

  return (
    <OfficerTransactionCreateScreen
      initialAmount={amount ?? ""}
      initialKeterangan={keterangan ?? ""}
      initialOption={option ?? ""}
      loanId={resolvedLoanId}
      memberId={memberId}
      member={member}
      transaction={transaction}
    />
  );
}

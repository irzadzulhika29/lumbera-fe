import type { Metadata } from "next";
import { notFound } from "next/navigation";

import OfficerTransactionCreateScreen from "@/src/features/dashboard/components/screens/OfficerTransactionCreateScreen";
import {
  getOfficerMemberById,
  getOfficerTransactionTypeConfig,
} from "@/src/features/dashboard/transactionFlow";

type PageProps = {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ memberId?: string }>;
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
  const [{ type }, { memberId }] = await Promise.all([params, searchParams]);

  const transaction = getOfficerTransactionTypeConfig(type);
  const member = memberId ? getOfficerMemberById(memberId) : null;

  if (!transaction || !member || !memberId) {
    notFound();
  }

  return (
    <OfficerTransactionCreateScreen
      memberId={memberId}
      member={member}
      transaction={transaction}
    />
  );
}

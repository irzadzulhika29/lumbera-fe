import type { Metadata } from "next";
import { notFound } from "next/navigation";

import OfficerTransactionConfirmScreen from "@/src/features/dashboard/components/screens/OfficerTransactionConfirmScreen";
import {
  getOfficerMemberById,
  getOfficerTransactionTypeConfig,
} from "@/src/features/dashboard/transactionFlow";

type PageProps = {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ amount?: string; memberId?: string; option?: string }>;
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
  const [{ type }, { amount, memberId, option }] = await Promise.all([
    params,
    searchParams,
  ]);

  const transaction = getOfficerTransactionTypeConfig(type);
  const member = memberId ? getOfficerMemberById(memberId) : null;

  if (!transaction || !member || !amount) {
    notFound();
  }

  return (
    <OfficerTransactionConfirmScreen
      amount={amount}
      member={member}
      option={option ?? ""}
      transaction={transaction}
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import OfficerTransactionSuccessScreen from "@/src/features/dashboard/components/OfficerTransactionSuccessScreen";
import {
  getOfficerMemberById,
  getOfficerTransactionTypeConfig,
} from "@/src/features/dashboard/transactionFlow";

type PageProps = {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ memberId?: string; option?: string }>;
};

function buildSuccessTitle(type: string) {
  if (type === "savings") return "Simpanan tersimpan!";
  if (type === "loans") return "Pinjaman tersimpan!";
  return "Angsuran tersimpan!";
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type } = await params;
  const config = getOfficerTransactionTypeConfig(type);

  return {
    title: config
      ? `${config.title} Tersimpan | Lumbera`
      : "Transaksi Tersimpan | Lumbera",
    description: "Status sukses pencatatan transaksi officer.",
  };
}

export default async function OfficerTransactionSuccessPage({
  params,
  searchParams,
}: PageProps) {
  const [{ type }, { memberId, option }] = await Promise.all([
    params,
    searchParams,
  ]);

  const transaction = getOfficerTransactionTypeConfig(type);
  const member = memberId ? getOfficerMemberById(memberId) : null;

  if (!transaction || !member) {
    notFound();
  }

  const transactionLabel = option
    ? `${transaction.title} ${option}`
    : transaction.title;

  return (
    <OfficerTransactionSuccessScreen
      hash="SHA-256: a3f7b2e1..."
      memberName={member.name}
      title={buildSuccessTitle(transaction.slug)}
      transactionLabel={transactionLabel}
    />
  );
}

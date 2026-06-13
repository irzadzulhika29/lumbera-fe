import type { Metadata } from "next";
import { notFound } from "next/navigation";

import OfficerTransactionSuccessScreen from "@/src/features/dashboard/components/officer/screens/OfficerTransactionSuccessScreen";
import {
  getOfficerMemberById,
  getOfficerTransactionTypeConfig,
} from "@/src/features/dashboard/transactionFlow";

type PageProps = {
  params: Promise<{ type: string }>;
  searchParams: Promise<{
    hash?: string;
    memberId?: string;
    memberName?: string;
    option?: string;
  }>;
};

function buildSuccessTitle(type: string) {
  if (type === "savings") return "Simpanan tersimpan!";
  if (type === "loans") return "Pencairan tercatat!";
  if (type === "stock-mutations") return "Penarikan tercatat!";
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
  const [{ type }, { hash, memberId, memberName, option }] = await Promise.all([
    params,
    searchParams,
  ]);

  const transaction = getOfficerTransactionTypeConfig(type);
  const member = memberId ? getOfficerMemberById(memberId) : null;

  if (!transaction || !member) {
    notFound();
  }

  const transactionLabel =
    transaction.slug === "loans"
      ? "Pencairan Pinjaman"
      : transaction.slug === "stock-mutations"
        ? "Tarik Tunai"
      : option
        ? `${transaction.title} ${option}`
        : transaction.title;

  return (
    <OfficerTransactionSuccessScreen
      hash={hash ?? "SHA-256: a3f7b2e1..."}
      memberName={memberName ?? member.name}
      title={buildSuccessTitle(transaction.slug)}
      transactionLabel={transactionLabel}
    />
  );
}

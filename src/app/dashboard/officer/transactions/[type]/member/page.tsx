import type { Metadata } from "next";

import OfficerTransactionMemberScreen from "@/src/features/dashboard/components/OfficerTransactionMemberScreen";
import {
  getOfficerTransactionTypeConfig,
  type OfficerTransactionType,
} from "@/src/features/dashboard/transactionFlow";

type PageProps = {
  params: Promise<{ type: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type } = await params;
  const config = getOfficerTransactionTypeConfig(type);

  return {
    title: config
      ? `Pilih Anggota ${config.title} | Lumbera`
      : "Pilih Anggota | Lumbera",
    description: "Langkah pertama pencatatan transaksi officer.",
  };
}

export default async function OfficerTransactionMemberPage({
  params,
}: PageProps) {
  const { type } = await params;

  return (
    <OfficerTransactionMemberScreen type={type as OfficerTransactionType} />
  );
}

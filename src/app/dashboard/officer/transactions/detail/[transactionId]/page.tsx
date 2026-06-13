import type { Metadata } from "next";
import { notFound } from "next/navigation";

import OfficerTransactionDetailScreen from "@/src/features/dashboard/components/officer/screens/OfficerTransactionDetailScreen";

type PageProps = {
  params: Promise<{ transactionId: string }>;
  searchParams: Promise<{
    amount?: string;
    description?: string;
    hash?: string;
    memberName?: string;
    memberNumber?: string;
    officerName?: string;
    recordedAt?: string;
    status?: string;
    transactionGroup?: "SIMPANAN" | "PINJAMAN" | "ANGSURAN" | "PENARIKAN";
    transactionTypeLabel?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { transactionTypeLabel } = await searchParams;

  return {
    title: transactionTypeLabel
      ? `${transactionTypeLabel} | Detail Transaksi | Lumbera`
      : "Detail Transaksi | Lumbera",
    description: "Ringkasan detail transaksi officer koperasi.",
  };
}

export default async function OfficerTransactionDetailPage({
  params,
  searchParams,
}: PageProps) {
  const [
    { transactionId },
    {
      amount,
      description,
      hash,
      memberName,
      memberNumber,
      officerName,
      recordedAt,
      status,
      transactionGroup,
      transactionTypeLabel,
    },
  ] = await Promise.all([params, searchParams]);

  const numericAmount = Number(amount);

  if (
    !transactionId ||
    !description ||
    !hash ||
    !memberName ||
    !memberNumber ||
    !officerName ||
    !recordedAt ||
    !status ||
    !transactionGroup ||
    !transactionTypeLabel ||
    !Number.isFinite(numericAmount)
  ) {
    notFound();
  }

  return (
    <OfficerTransactionDetailScreen
      amount={numericAmount}
      description={description}
      hash={hash}
      memberName={memberName}
      memberNumber={memberNumber}
      officerName={officerName}
      recordedAt={recordedAt}
      status={status}
      transactionGroup={transactionGroup}
      transactionId={transactionId}
      transactionTypeLabel={transactionTypeLabel}
    />
  );
}

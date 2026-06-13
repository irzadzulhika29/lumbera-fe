"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  createOfficerSavingsTransaction,
  type OfficerSavingsType,
} from "@/src/features/dashboard/api";
import type {
  OfficerMember,
  OfficerTransactionTypeConfig,
} from "@/src/features/dashboard/transactionFlow";

import DashboardScreenShell from "../../layout/DashboardScreenShell";
import OfficerFlowHeader from "../layout/OfficerFlowHeader";
import TransactionConfirmationCard from "../transactions/TransactionConfirmationCard";

type OfficerTransactionConfirmScreenProps = {
  amount: string;
  keterangan: string;
  member: OfficerMember;
  option: string;
  transaction: OfficerTransactionTypeConfig;
};

const savingsTypeByOption: Record<string, OfficerSavingsType> = {
  Pokok: "POKOK",
  Wajib: "WAJIB",
  Sukarela: "SUKARELA",
};

function formatRecordedAt(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  const offsetMinutes = -date.getTimezoneOffset();
  const offsetSign = offsetMinutes >= 0 ? "+" : "-";
  const absoluteOffset = Math.abs(offsetMinutes);
  const offsetHours = pad(Math.floor(absoluteOffset / 60));
  const offsetRemainder = pad(absoluteOffset % 60);

  return [
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`,
    `${offsetSign}${offsetHours}:${offsetRemainder}`,
  ].join("");
}

export default function OfficerTransactionConfirmScreen({
  amount,
  keterangan,
  member,
  option,
  transaction,
}: OfficerTransactionConfirmScreenProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const hasKeterangan = keterangan.trim().length > 0;
  const contentTopPadding =
    transaction.slug === "stock-mutations"
      ? hasKeterangan
        ? "pt-[408px]"
        : "pt-[352px]"
      : transaction.slug === "installments"
        ? hasKeterangan
          ? "pt-[408px]"
          : "pt-[352px]"
        : hasKeterangan
          ? "pt-[388px]"
          : "pt-[332px]";
  const selectedOption = option || transaction.amountOptions?.[0] || "-";
  const successParams = new URLSearchParams({ memberId: member.id });

  if (selectedOption !== "-") {
    successParams.set("option", selectedOption);
  }

  const successHref = `/dashboard/officer/transactions/${transaction.slug}/success?${successParams.toString()}`;

  const handleSavingsSubmit = async () => {
    const savingsType = savingsTypeByOption[selectedOption];
    const numericAmount = Number(amount);

    if (!savingsType || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setSubmitError("Data transaksi simpanan tidak valid.");
      return;
    }

    try {
      setSubmitError("");
      setIsSubmitting(true);
      const response = await createOfficerSavingsTransaction({
        member_id: member.id,
        savings_type: savingsType,
        amount: numericAmount,
        description:
          keterangan.trim() ||
          `Simpanan ${selectedOption.toLowerCase()} ${member.name}`,
        recorded_at: formatRecordedAt(new Date()),
        is_offline_created: false,
        client_transaction_id: crypto.randomUUID(),
      });
      const params = new URLSearchParams({
        memberId: response.data.member_id,
        memberName: response.data.member_name,
        option: selectedOption,
        hash:
          response.data.hash_preview ||
          `SHA-256: ${response.data.current_hash.slice(0, 8)}...`,
      });

      router.push(
        `/dashboard/officer/transactions/${transaction.slug}/success?${params.toString()}`,
      );
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Gagal menyimpan transaksi simpanan.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardScreenShell background="bg-white">
      <OfficerFlowHeader
        backHref={`/dashboard/officer/transactions/${transaction.slug}/create?memberId=${member.id}`}
        title="Konfirmasi input"
        subtitle={`Transaksi / ${transaction.title} / Input / Konfirmasi`}
        floatingClassName="top-30 bottom-auto p-0"
        floatingContent={
          <TransactionConfirmationCard
            amount={amount}
            keterangan={keterangan}
            member={member}
            option={option}
            transaction={transaction}
          />
        }
      />

      <div className={`bg-white px-5 pb-8 ${contentTopPadding}`}>
        {submitError ? (
          <p className="mb-4 text-center text-[0.9rem] font-medium text-[#e74c3c]">
            {submitError}
          </p>
        ) : null}

        {transaction.slug === "savings" ? (
          <button
            type="button"
            onClick={handleSavingsSubmit}
            disabled={isSubmitting}
            className="block w-full rounded-[10px] bg-primary px-4 py-4 text-center text-[1rem] font-bold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
        ) : (
          <Link
            href={successHref}
            className="block w-full rounded-[10px] bg-primary px-4 py-4 text-center text-[1rem] font-bold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5"
          >
            Simpan
          </Link>
        )}
      </div>
    </DashboardScreenShell>
  );
}

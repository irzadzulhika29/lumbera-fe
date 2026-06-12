import Link from "next/link";

import type {
  OfficerMember,
  OfficerTransactionTypeConfig,
} from "@/src/features/dashboard/transactionFlow";

import DashboardScreenShell from "../layout/DashboardScreenShell";
import OfficerFlowHeader from "../layout/OfficerFlowHeader";
import TransactionConfirmationCard from "../transactions/TransactionConfirmationCard";

type OfficerTransactionConfirmScreenProps = {
  amount: string;
  member: OfficerMember;
  option: string;
  transaction: OfficerTransactionTypeConfig;
};

export default function OfficerTransactionConfirmScreen({
  amount,
  member,
  option,
  transaction,
}: OfficerTransactionConfirmScreenProps) {
  const selectedOption = option || transaction.amountOptions?.[0] || "-";
  const successParams = new URLSearchParams({ memberId: member.id });

  if (selectedOption !== "-") {
    successParams.set("option", selectedOption);
  }

  const successHref = `/dashboard/officer/transactions/${transaction.slug}/success?${successParams.toString()}`;

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
            member={member}
            option={option}
            transaction={transaction}
          />
        }
      />

      <div className="bg-white px-5 pb-8 pt-[332px]">
        <Link
          href={successHref}
          className="block w-full rounded-[10px] bg-primary px-4 py-4 text-center text-[1rem] font-bold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5"
        >
          Simpan
        </Link>
      </div>
    </DashboardScreenShell>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type {
  OfficerMember,
  OfficerTransactionTypeConfig,
} from "@/src/features/dashboard/transactionFlow";
import CurrencyInput from "@/src/shared/components/ui/CurrencyInput";

import MemberSummary from "../common/MemberSummary";
import DashboardScreenShell from "../layout/DashboardScreenShell";
import OfficerFlowHeader from "../layout/OfficerFlowHeader";

type OfficerTransactionCreateScreenProps = {
  memberId: string;
  member: OfficerMember;
  transaction: OfficerTransactionTypeConfig;
};

export default function OfficerTransactionCreateScreen({
  memberId,
  member,
  transaction,
}: OfficerTransactionCreateScreenProps) {
  const [selectedOption, setSelectedOption] = useState(
    transaction.amountOptions?.[0] ?? "",
  );
  const [amount, setAmount] = useState("");

  const confirmHref = useMemo(() => {
    const params = new URLSearchParams({ memberId, amount });

    if (selectedOption) {
      params.set("option", selectedOption);
    }

    return `/dashboard/officer/transactions/${transaction.slug}/confirm?${params.toString()}`;
  }, [amount, memberId, selectedOption, transaction.slug]);

  return (
    <DashboardScreenShell background="bg-white">
      <OfficerFlowHeader
        backHref={`/dashboard/officer/transactions/${transaction.slug}/member`}
        title="Input nominal"
        subtitle={`Transaksi / ${transaction.title} / Input`}
        floatingClassName="bottom-[-22px] px-4"
        floatingContent={<MemberSummary member={member} size="compact" />}
      />

      <div className="bg-white px-5 pb-8 pt-[54px]">
        {transaction.amountOptions?.length ? (
          <section>
            <h2 className="text-[1rem] font-medium text-text">
              {transaction.inputLabel}
            </h2>

            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {transaction.amountOptions.map((option) => {
                const active = selectedOption === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedOption(option)}
                    className={`rounded-[10px] px-3 py-3 text-[0.96rem] font-bold transition-colors ${
                      active
                        ? "bg-primary text-white"
                        : "bg-[#ACD5D4] text-white/95"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="mt-5">
          <CurrencyInput
            label="Nominal"
            aria-label="Nominal transaksi"
            value={amount}
            onValueChange={setAmount}
            startAdornment={
              <span className="text-[1rem] font-bold text-text/66">Rp</span>
            }
            labelClassName="text-[1rem] font-medium text-text"
            fieldClassName="rounded-[10px] border-[#d7dbe0] bg-white px-4 py-3.5 shadow-none"
            inputClassName="text-[1rem] font-medium"
          />
        </section>

        <Link
          href={confirmHref}
          aria-disabled={amount.length === 0}
          className={`mt-6 block w-full rounded-[10px] px-4 py-4 text-center text-[1rem] font-bold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)] transition-transform duration-150 ${
            amount.length === 0
              ? "pointer-events-none bg-primary/45 shadow-none"
              : "bg-primary hover:-translate-y-0.5 active:translate-y-0.5"
          }`}
        >
          Lanjut
        </Link>
      </div>
    </DashboardScreenShell>
  );
}

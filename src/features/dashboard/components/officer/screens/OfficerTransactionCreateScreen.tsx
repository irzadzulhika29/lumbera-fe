"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type {
  OfficerMember,
  OfficerTransactionTypeConfig,
} from "@/src/features/dashboard/transactionFlow";
import CurrencyInput from "@/src/shared/components/ui/CurrencyInput";

import MemberSummary from "../../common/MemberSummary";
import DashboardScreenShell from "../../layout/DashboardScreenShell";
import OfficerFlowHeader from "../layout/OfficerFlowHeader";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function LoanMemberSummaryCard({ member }: { member: OfficerMember }) {
  const savingsBalance = member.financialSummary?.savingsBalance ?? 0;
  const remainingLoan = member.financialSummary?.remainingLoan ?? 0;

  return (
    <div className="rounded-[15px] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.08)]">
      <MemberSummary member={member} size="compact" />

      <div className="mt-3 border-t border-[#e4e9ed] pt-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[0.95rem] font-medium text-text">Saldo</p>
            <p className="mt-1 text-[1rem] font-bold text-text">
              Rp{formatCurrency(savingsBalance)}
            </p>
          </div>

          <div>
            <p className="text-[0.95rem] font-medium text-text">
              Sisa Pinjaman
            </p>
            <p className="mt-1 text-[1rem] font-bold text-text">
              Rp{formatCurrency(remainingLoan)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstallmentMemberSummaryCard({ member }: { member: OfficerMember }) {
  const currentInstallment = member.financialSummary?.currentInstallment ?? 0;
  const loanNumber = member.financialSummary?.loanNumber ?? "P-000";
  const remainingLoan = member.financialSummary?.remainingLoan ?? 0;

  return (
    <div className="rounded-[15px] bg-white">
      <MemberSummary member={member} size="compact" />

      <div className="mt-3 border-t border-[#e4e9ed] pt-3">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-[0.84rem] font-medium text-text/82">
              No. Pinjaman
            </p>
            <p className="mt-1 text-[0.92rem] font-bold text-text">
              {loanNumber}
            </p>
          </div>

          <div>
            <p className="text-[0.84rem] font-medium text-text/82">
              Sisa Utang
            </p>
            <p className="mt-1 text-[0.92rem] font-bold text-text">
              Rp{formatCurrency(remainingLoan)}
            </p>
          </div>

          <div>
            <p className="text-[0.84rem] font-medium text-text/82">
              Tagihan Bulan Ini
            </p>
            <p className="mt-1 text-[0.92rem] font-bold text-text">
              Rp{formatCurrency(currentInstallment)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WithdrawMemberSummaryCard({ member }: { member: OfficerMember }) {
  const savingsBalance = member.financialSummary?.savingsBalance ?? 0;

  return (
    <div className="">
      <MemberSummary member={member} size="compact" />

      <div className="mt-3 border-t border-[#e4e9ed] pt-3">
        <div>
          <p className="text-[0.95rem] font-medium text-text">Saldo</p>
          <p className="mt-1 text-[1rem] font-bold text-text">
            Rp {formatCurrency(savingsBalance)}
          </p>
        </div>
      </div>
    </div>
  );
}

type OfficerTransactionCreateScreenProps = {
  loanId?: string;
  memberId: string;
  member: OfficerMember;
  transaction: OfficerTransactionTypeConfig;
};

export default function OfficerTransactionCreateScreen({
  loanId,
  memberId,
  member,
  transaction,
}: OfficerTransactionCreateScreenProps) {
  const [selectedOption, setSelectedOption] = useState(
    transaction.amountOptions?.[0] ?? "",
  );
  const [amount, setAmount] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const confirmHref = useMemo(() => {
    const params = new URLSearchParams({
      memberId,
      amount,
      memberName: member.name,
      initials: member.initials,
      meta: member.meta,
    });

    if (loanId) {
      params.set("loanId", loanId);
    }

    if (selectedOption) {
      params.set("option", selectedOption);
    }

    if (keterangan) {
      params.set("keterangan", keterangan);
    }

    return `/dashboard/officer/transactions/${transaction.slug}/confirm?${params.toString()}`;
  }, [
    amount,
    keterangan,
    loanId,
    member.initials,
    member.meta,
    member.name,
    memberId,
    selectedOption,
    transaction.slug,
  ]);

  const usesLoanSummaryCard = transaction.slug === "loans";
  const usesInstallmentSummaryCard = transaction.slug === "installments";
  const usesWithdrawSummaryCard = transaction.slug === "stock-mutations";
  const usesExtendedSummaryCard =
    usesLoanSummaryCard ||
    usesInstallmentSummaryCard ||
    usesWithdrawSummaryCard;

  return (
    <DashboardScreenShell background="bg-white">
      <OfficerFlowHeader
        backHref={`/dashboard/officer/transactions/${transaction.slug}/member`}
        title="Input nominal"
        subtitle={`Transaksi / ${transaction.title} / Input`}
        floatingClassName={
          usesExtendedSummaryCard
            ? "bottom-[-92px] px-4"
            : "bottom-[-22px] px-4"
        }
        floatingContent={
          usesInstallmentSummaryCard ? (
            <InstallmentMemberSummaryCard member={member} />
          ) : usesWithdrawSummaryCard ? (
            <WithdrawMemberSummaryCard member={member} />
          ) : usesLoanSummaryCard ? (
            <LoanMemberSummaryCard member={member} />
          ) : (
            <MemberSummary member={member} size="compact" />
          )
        }
      />

      <div
        className={`bg-white px-5 pb-8 ${
          usesExtendedSummaryCard ? "pt-[126px]" : "pt-[54px]"
        }`}
      >
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

        <section className="mt-5">
          <label
            className="text-[1rem] font-medium text-text"
            htmlFor="keterangan"
          >
            Keterangan (opsional)
          </label>
          <input
            id="keterangan"
            type="text"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            className="mt-3 w-full rounded-[10px] border border-[#d7dbe0] bg-white px-4 py-3.5 text-[1rem] font-medium outline-none transition-colors focus:border-primary"
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

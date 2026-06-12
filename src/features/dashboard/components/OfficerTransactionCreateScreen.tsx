"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import MobileScreen from "@/src/features/onboarding/components/MobileScreen";
import type {
  OfficerMember,
  OfficerTransactionTypeConfig,
} from "@/src/features/dashboard/transactionFlow";

import BackFilledIconClient from "./BackFilledIconClient";

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

  const normalizedAmount = amount.replace(/[^\d]/g, "");

  const displayAmount = useMemo(() => {
    if (!normalizedAmount) return "";
    return new Intl.NumberFormat("id-ID").format(Number(normalizedAmount));
  }, [normalizedAmount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    setAmount(raw);
  };

  const confirmHref = useMemo(() => {
    const params = new URLSearchParams({
      memberId,
      amount: normalizedAmount,
    });

    if (selectedOption) {
      params.set("option", selectedOption);
    }

    return `/dashboard/officer/transactions/${transaction.slug}/confirm?${params.toString()}`;
  }, [memberId, normalizedAmount, selectedOption, transaction.slug]);

  return (
    <MobileScreen className="bg-white">
      <section className="flex h-[100svh] w-full flex-none flex-col overflow-hidden bg-white sm:h-[860px]">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:rgba(18,148,144,0.35)_transparent]">
          <header className="relative bg-primary px-7 pb-24 pt-[calc(1.3rem+env(safe-area-inset-top))] text-white">
            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard/officer/transactions/${transaction.slug}/member`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <BackFilledIconClient className="text-[1.35rem] text-primary" />
              </Link>

              <div className="min-w-0">
                <h1 className="text-[1.68rem] font-bold leading-none tracking-[-0.045em] text-white">
                  Input nominal
                </h1>
                <p className="mt-1 text-xs font-medium text-white/82">
                  Transaksi / {transaction.title} / Input
                </p>
              </div>
            </div>

            <div className="absolute inset-x-5 bottom-[-22px] rounded-[18px] border border-[#dfe5ea] bg-white px-4 py-3.5 shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.92rem] font-bold text-white">
                  {member.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-[0.98rem] font-bold tracking-[-0.03em] text-text">
                    {member.name}
                  </h2>
                  <p className="mt-1 truncate text-[0.78rem] font-medium text-text/82">
                    {member.meta}
                  </p>
                </div>
              </div>
            </div>
          </header>

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
              <h2 className="text-[1rem] font-medium text-text">Nominal</h2>

              <div className="mt-3 flex items-center rounded-[10px] border border-[#d7dbe0] bg-white px-4 py-3.5">
                <span className="text-[1rem] font-bold text-text/66">Rp</span>
                <span className="mx-3 h-8 w-px bg-[#e2e5e9]" />
                <input
                  type="text"
                  inputMode="numeric"
                  value={displayAmount}
                  onChange={handleAmountChange}
                  aria-label="Nominal transaksi"
                  className="min-w-0 flex-1 border-0 bg-transparent text-[1rem] font-medium text-text outline-none"
                />
              </div>
            </section>

            <Link
              href={confirmHref}
              aria-disabled={normalizedAmount.length === 0}
              className={`mt-6 block w-full rounded-[10px] px-4 py-4 text-center text-[1rem] font-bold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)] transition-transform duration-150 ${
                normalizedAmount.length === 0
                  ? "pointer-events-none bg-primary/45 shadow-none"
                  : "bg-primary hover:-translate-y-0.5 active:translate-y-0.5"
              }`}
            >
              Lanjut
            </Link>
          </div>
        </div>
      </section>
    </MobileScreen>
  );
}

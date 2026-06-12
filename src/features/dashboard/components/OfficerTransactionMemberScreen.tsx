import Link from "next/link";
import { notFound } from "next/navigation";

import MobileScreen from "@/src/features/onboarding/components/MobileScreen";
import {
  getOfficerTransactionTypeConfig,
  officerMembers,
  type OfficerTransactionType,
} from "@/src/features/dashboard/transactionFlow";

import BackFilledIconClient from "./BackFilledIconClient";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4.2 4.2L19 6.5" />
    </svg>
  );
}

export default function OfficerTransactionMemberScreen({
  type,
}: {
  type: OfficerTransactionType;
}) {
  const transaction = getOfficerTransactionTypeConfig(type);

  if (!transaction) {
    notFound();
  }

  return (
    <MobileScreen className="bg-[#f7f8f9]">
      <section className="flex h-[100svh] w-full flex-none flex-col overflow-hidden bg-[#f7f8f9] sm:h-[860px]">
        <div className="bg-white px-4 pb-8 pt-[calc(1.25rem+env(safe-area-inset-top))]">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/officer/transactions"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#f4f5f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <BackFilledIconClient className="text-[1.05rem] text-text" />
            </Link>

            <div className="min-w-0">
              <h1 className="text-[1.4rem] font-bold leading-none tracking-[-0.04em] text-text">
                Pilih Anggota
              </h1>
              <p className="mt-2 text-sm font-semibold text-primary">
                {transaction.title} · {transaction.subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="relative -mt-4 min-h-0 flex-1 overflow-y-auto bg-[#f7f8f9] px-4 pb-6 pt-4 [scrollbar-width:thin] [scrollbar-color:rgba(18,148,144,0.35)_transparent]">
          <div className="flex items-center gap-3 rounded-[18px] border-2 border-primary bg-white px-4 py-4 shadow-[0_8px_22px_rgba(18,148,144,0.08)]">
            <SearchIcon />
            <input
              type="text"
              value="Lestari"
              readOnly
              aria-label="Cari anggota"
              className="min-w-0 flex-1 border-0 bg-transparent text-[0.98rem] font-bold text-text outline-none"
            />
            <span className="h-8 w-px bg-primary/65" />
          </div>

          <p className="mt-3 text-[0.82rem] font-medium text-[#9aa4b2]">
            3 anggota ditemukan
          </p>

          <div className="mt-4 space-y-3">
            {officerMembers.map((member) => (
              <Link
                key={member.id}
                href={`/dashboard/officer/transactions/${type}/create?memberId=${member.id}`}
                className={`flex items-center gap-4 rounded-[20px] border bg-white px-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  member.selected
                    ? "border-primary shadow-[0_8px_20px_rgba(18,148,144,0.08)]"
                    : "border-[#e5e7eb]"
                }`}
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[1.02rem] font-bold ${
                    member.selected
                      ? "bg-primary text-white"
                      : "bg-[#eff1f4] text-[#818999]"
                  }`}
                >
                  {member.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-[0.98rem] font-bold tracking-[-0.03em] text-text">
                    {member.name}
                  </h2>
                  <p className="mt-1 truncate text-[0.84rem] font-medium text-[#7f8795]">
                    {member.meta}
                  </p>
                </div>

                {member.selected ? (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
                    <CheckIcon />
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </MobileScreen>
  );
}

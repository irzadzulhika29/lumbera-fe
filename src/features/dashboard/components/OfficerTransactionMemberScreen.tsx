"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, useMemo } from "react";

import MobileScreen from "@/src/features/onboarding/components/MobileScreen";
import {
  getOfficerTransactionTypeConfig,
  officerMembers,
  type OfficerTransactionType,
} from "@/src/features/dashboard/transactionFlow";

import BackFilledIconClient from "./BackFilledIconClient";
import NextIconClient from "./NextIconClient";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 text-text/55"
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

export default function OfficerTransactionMemberScreen({
  type,
}: {
  type: OfficerTransactionType;
}) {
  const transaction = getOfficerTransactionTypeConfig(type);

  if (!transaction) {
    notFound();
  }

  const [query, setQuery] = useState("");

  const filteredMembers = useMemo(
    () =>
      query.trim()
        ? officerMembers.filter(
            (m) =>
              m.name.toLowerCase().includes(query.toLowerCase()) ||
              m.meta.toLowerCase().includes(query.toLowerCase()),
          )
        : officerMembers,
    [query],
  );

  return (
    <MobileScreen className="bg-white">
      <section className="flex h-[100svh] w-full flex-none flex-col overflow-hidden bg-white sm:h-[860px]">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:rgba(18,148,144,0.35)_transparent]">
          <header className="relative bg-primary px-7 pb-24 pt-[calc(1.3rem+env(safe-area-inset-top))] text-white">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/officer/transactions"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <BackFilledIconClient className="text-[1.35rem] text-primary" />
              </Link>

              <div className="min-w-0">
                <h1 className="text-[1.68rem] font-bold leading-none tracking-[-0.045em] text-white">
                  Pilih anggota
                </h1>
                <p className="mt-1 text-xs font-medium text-white/82">
                  transaksi / {transaction.title.toLowerCase()}
                </p>
              </div>
            </div>

            <div className="absolute inset-x-5 bottom-[-20px] rounded-[18px] border border-[#dfe5ea] bg-white px-5 py-3.5 shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-3">
                <SearchIcon />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari anggota"
                  aria-label="Cari anggota"
                  className="min-w-0 flex-1 border-0 bg-transparent text-[0.98rem] font-medium text-text placeholder:text-text/28 outline-none"
                />
              </div>
            </div>
          </header>

          <div className="bg-white px-5 pb-8 pt-[46px]">
            <p className="text-[0.92rem] font-medium text-text/78">
              Menampilkan {filteredMembers.length} anggota koperasi.
            </p>

            <div className="mt-8 space-y-6">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <Link
                    key={member.id}
                    href={`/dashboard/officer/transactions/${type}/create?memberId=${member.id}`}
                    className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
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

                    <NextIconClient className="text-[1.05rem] text-secondary" />
                  </Link>
                ))
              ) : (
                <p className="pt-10 text-center text-[0.92rem] font-medium text-text/55">
                  Anggota tidak ditemukan
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </MobileScreen>
  );
}

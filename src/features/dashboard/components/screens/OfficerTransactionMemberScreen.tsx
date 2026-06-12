"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useMemo, useState } from "react";

import {
  getOfficerTransactionTypeConfig,
  officerMembers,
  type OfficerTransactionType,
} from "@/src/features/dashboard/transactionFlow";

import DashboardSearchField from "../common/DashboardSearchField";
import MemberSummary from "../common/MemberSummary";
import NextIcon from "../common/NextIcon";
import DashboardScreenShell from "../layout/DashboardScreenShell";
import OfficerFlowHeader from "../layout/OfficerFlowHeader";

export default function OfficerTransactionMemberScreen({
  type,
}: {
  type: OfficerTransactionType;
}) {
  const [query, setQuery] = useState("");
  const transaction = getOfficerTransactionTypeConfig(type);

  const filteredMembers = useMemo(
    () =>
      query.trim()
        ? officerMembers.filter(
            (member) =>
              member.name.toLowerCase().includes(query.toLowerCase()) ||
              member.meta.toLowerCase().includes(query.toLowerCase()),
          )
        : officerMembers,
    [query],
  );

  if (!transaction) {
    notFound();
  }

  return (
    <DashboardScreenShell background="bg-white">
      <OfficerFlowHeader
        backHref="/dashboard/officer/transactions"
        title="Pilih anggota"
        subtitle={`transaksi / ${transaction.title.toLowerCase()}`}
        floatingContent={
          <DashboardSearchField
            ariaLabel="Cari anggota"
            value={query}
            onChange={setQuery}
            placeholder="Cari anggota"
            iconClassName="text-primary"
          />
        }
      />

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
                <MemberSummary
                  member={member}
                  size="compact"
                  trailing={
                    <NextIcon className="text-[1.05rem] text-secondary" />
                  }
                />
              </Link>
            ))
          ) : (
            <p className="pt-10 text-center text-[0.92rem] font-medium text-text/55">
              Anggota tidak ditemukan
            </p>
          )}
        </div>
      </div>
    </DashboardScreenShell>
  );
}

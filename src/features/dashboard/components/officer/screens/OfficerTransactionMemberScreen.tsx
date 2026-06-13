"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getOfficerMembers,
  type OfficerMemberItem,
} from "@/src/features/dashboard/api/officerMemberApi";
import {
  getOfficerTransactionTypeConfig,
  type OfficerMember,
  type OfficerTransactionType,
} from "@/src/features/dashboard/transactionFlow";

import DashboardSearchField from "../../common/DashboardSearchField";
import MemberSummary from "../../common/MemberSummary";
import NextIcon from "../../common/NextIcon";
import DashboardScreenShell from "../../layout/DashboardScreenShell";
import OfficerFlowHeader from "../layout/OfficerFlowHeader";

export default function OfficerTransactionMemberScreen({
  type,
}: {
  type: OfficerTransactionType;
}) {
  const [query, setQuery] = useState("");
  const [members, setMembers] = useState<OfficerMemberItem[]>([]);
  const [memberTotal, setMemberTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const transaction = getOfficerTransactionTypeConfig(type);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getOfficerMembers({
        search: query.trim() || undefined,
        page: 1,
        limit: 20,
      });

      setMembers(response.data.items ?? []);
      setMemberTotal(response.data.total ?? 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data anggota");
      setMembers([]);
      setMemberTotal(0);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMembers();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchMembers]);

  const formattedMembers = useMemo<OfficerMember[]>(
    () =>
      members.map((member) => ({
        id: member.member_id,
        initials: member.initials,
        name: member.full_name,
        meta: `No. Ang. ${member.member_number} - KSP - Grade ${member.mcs_grade}`,
      })),
    [members],
  );

  const buildCreateHref = useCallback(
    (member: OfficerMember) => {
      const params = new URLSearchParams({
        memberId: member.id,
        memberName: member.name,
        initials: member.initials,
        meta: member.meta,
      });

      return `/dashboard/officer/transactions/${type}/create?${params.toString()}`;
    },
    [type],
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
          {loading
            ? "Memuat anggota koperasi..."
            : `Menampilkan ${formattedMembers.length} dari ${memberTotal} anggota koperasi.`}
        </p>

        <div className="mt-8 space-y-6">
          {loading ? (
            <p className="pt-10 text-center text-[0.92rem] font-medium text-text/55">
              Memuat data...
            </p>
          ) : error ? (
            <p className="pt-10 text-center text-[0.92rem] font-medium text-red-500">
              {error}
            </p>
          ) : formattedMembers.length > 0 ? (
            formattedMembers.map((member) => (
              <Link
                key={member.id}
                href={buildCreateHref(member)}
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

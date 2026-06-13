"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getOfficerMembers,
  type OfficerMemberItem,
} from "@/src/features/dashboard/api/officerMemberApi";
import { getDashboardNavigation } from "@/src/features/dashboard/data";

import DashboardSearchField from "../../common/DashboardSearchField";
import FilterChips from "../../common/FilterChips";
import MemberSummary from "../../common/MemberSummary";
import DashboardScreenShell from "../../layout/DashboardScreenShell";

function PlusIcon() {
  return (
    <Icon
      icon="ph:plus"
      className="h-[1.35rem] w-[1.35rem] text-primary"
      aria-hidden="true"
    />
  );
}

const grades = ["Semua", "AA", "A", "B", "C", "D"].map((grade) => ({
  label: grade,
  value: grade,
}));

export default function OfficerMembersScreen() {
  const [query, setQuery] = useState("");
  const [activeGrade, setActiveGrade] = useState("Semua");
  const [members, setMembers] = useState<OfficerMemberItem[]>([]);
  const [memberTotal, setMemberTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigationItems = getDashboardNavigation("officer", "Anggota");

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getOfficerMembers({
        search: query.trim() || undefined,
        grade: activeGrade !== "Semua" ? activeGrade : undefined,
        page: 1,
        limit: 20,
      });

      setMembers(response.data.items ?? []);
      setMemberTotal(response.data.total ?? 0);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal memuat data anggota";
      setError(message);
      setMembers([]);
      setMemberTotal(0);
    } finally {
      setLoading(false);
    }
  }, [query, activeGrade]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMembers();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchMembers]);

  const formattedMembers = useMemo(
    () =>
      members.map((member) => ({
        id: member.member_id,
        initials: member.initials,
        name: member.full_name,
        meta: `No. Ang. ${member.member_number} - ${member.membership_years} tahun`,
        grade: member.mcs_grade,
        mcs: `MCS ${member.current_mcs_score}`,
      })),
    [members],
  );

  return (
    <DashboardScreenShell
      background="bg-[#fafafa]"
      navigationItems={navigationItems}
    >
      <header className="relative bg-primary px-5 pb-20 pt-[calc(2rem+env(safe-area-inset-top))] text-white">
        <div className="flex items-center justify-between">
          <div className="min-w-0 pr-4">
            <h1 className="text-[1.85rem] font-bold leading-tight tracking-[-0.04em] text-white">
              Daftar anggota
            </h1>
            <p className="mt-1 text-xs font-medium text-white/90">
              Kelola anggota dalam koperasi anda
            </p>
          </div>
          <Link
            href="/dashboard/officer/members/add"
            className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-[14px] bg-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Tambah anggota"
          >
            <PlusIcon />
          </Link>
        </div>

        <div className="absolute inset-x-5 bottom-[-24px] rounded-[14px] border border-[#f1f5f9] bg-white px-5 py-[1.15rem] shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
          <DashboardSearchField
            ariaLabel="Cari anggota"
            value={query}
            onChange={setQuery}
            placeholder="Cari anggota"
          />
        </div>
      </header>

      <div className="px-5 pb-10 pt-[52px]">
        <FilterChips
          activeValue={activeGrade}
          mode="wrap"
          onChange={setActiveGrade}
          options={grades}
        />

        <div className="mt-[2.15rem] space-y-[1.65rem]">
          {loading ? (
            <p className="pt-10 text-center text-[0.92rem] font-medium text-text/50">
              Memuat data...
            </p>
          ) : error ? (
            <p className="pt-10 text-center text-[0.92rem] font-medium text-red-500">
              {error}
            </p>
          ) : formattedMembers.length > 0 ? (
            <>
              <p className="-mt-3 text-[0.86rem] font-medium text-text/55">
                Menampilkan {formattedMembers.length} dari {memberTotal} anggota
              </p>
              {formattedMembers.map((member) => (
                <MemberSummary
                  key={member.id}
                  member={{
                    id: member.id,
                    initials: member.initials,
                    name: member.name,
                    meta: member.meta,
                  }}
                  trailing={
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex h-6 items-center justify-center rounded-[6px] bg-[#e5f3f3] px-2.5 text-[0.72rem] font-bold text-[#118B87]">
                        {member.grade}
                      </div>
                      <span className="text-[0.82rem] font-bold tracking-[-0.02em] text-text/60">
                        {member.mcs}
                      </span>
                    </div>
                  }
                />
              ))}
            </>
          ) : (
            <p className="pt-10 text-center text-[0.92rem] font-medium text-text/50">
              Anggota tidak ditemukan
            </p>
          )}
        </div>
      </div>
    </DashboardScreenShell>
  );
}

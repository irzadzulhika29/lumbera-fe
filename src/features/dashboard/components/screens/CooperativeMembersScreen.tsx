"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { getDashboardNavigation } from "@/src/features/dashboard/data";

import DashboardSearchField from "../common/DashboardSearchField";
import FilterChips from "../common/FilterChips";
import MemberSummary from "../common/MemberSummary";
import DashboardScreenShell from "../layout/DashboardScreenShell";

function PlusIcon() {
  return (
    <Icon
      icon="ph:plus"
      className="h-[1.35rem] w-[1.35rem] text-primary"
      aria-hidden="true"
    />
  );
}

const members = [
  { id: "m1", initials: "BS", name: "Budi Setiawan", no: "0012", years: "8 tahun", grade: "AA", mcs: "MCS 780" },
  { id: "m2", initials: "BY", name: "Broto Yudistira", no: "0235", years: "3 tahun", grade: "A", mcs: "MCS 780" },
  { id: "m3", initials: "DS", name: "Dewi Sartika", no: "0458", years: "1 tahun", grade: "B", mcs: "MCS 790" },
  { id: "m4", initials: "RF", name: "Rizky Firmansyah", no: "0123", years: "5 tahun", grade: "C", mcs: "MCS 805" },
  { id: "m5", initials: "SL", name: "Sari Lestari", no: "0678", years: "2 tahun", grade: "A", mcs: "MCS 812" },
  { id: "m6", initials: "AP", name: "Agus Prasetyo", no: "0345", years: "4 tahun", grade: "B", mcs: "MCS 823" },
  { id: "m7", initials: "LM", name: "Lina Marlina", no: "0890", years: "3 tahun", grade: "C", mcs: "MCS 834" },
];

const grades = ["Semua", "AA", "A", "B", "C", "D"].map((grade) => ({
  label: grade,
  value: grade,
}));

export default function CooperativeMembersScreen() {
  const [query, setQuery] = useState("");
  const [activeGrade, setActiveGrade] = useState("Semua");
  const navigationItems = getDashboardNavigation("officer", "Anggota");

  const filteredMembers = useMemo(
    () =>
      members.filter((member) => {
        const matchesQuery = member.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesGrade =
          activeGrade === "Semua" || member.grade === activeGrade;

        return matchesQuery && matchesGrade;
      }),
    [activeGrade, query],
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
            <p className="mt-1 text-[0.92rem] font-medium text-white/90">
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
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <MemberSummary
                key={member.id}
                member={{
                  id: member.id,
                  initials: member.initials,
                  name: member.name,
                  meta: `${member.no} · ${member.years}`,
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
            ))
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

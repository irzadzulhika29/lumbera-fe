"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState, useMemo } from "react";

import MobileScreen from "@/src/features/onboarding/components/MobileScreen";
import DashboardBottomNavigation from "./DashboardBottomNavigation";
import { getDashboardNavigation } from "@/src/features/dashboard/data";

function SearchIcon() {
  return (
    <Icon
      icon="solar:magnifer-linear"
      className="h-5 w-5 text-text/40"
      aria-hidden="true"
    />
  );
}

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
  {
    id: "m1",
    initials: "BS",
    name: "Budi Setiawan",
    no: "0012",
    years: "8 tahun",
    grade: "AA",
    mcs: "MCS 780",
  },
  {
    id: "m2",
    initials: "BY",
    name: "Broto Yudistira",
    no: "0235",
    years: "3 tahun",
    grade: "A",
    mcs: "MCS 780",
  },
  {
    id: "m3",
    initials: "DS",
    name: "Dewi Sartika",
    no: "0458",
    years: "1 tahun",
    grade: "B",
    mcs: "MCS 790",
  },
  {
    id: "m4",
    initials: "RF",
    name: "Rizky Firmansyah",
    no: "0123",
    years: "5 tahun",
    grade: "C",
    mcs: "MCS 805",
  },
  {
    id: "m5",
    initials: "SL",
    name: "Sari Lestari",
    no: "0678",
    years: "2 tahun",
    grade: "A",
    mcs: "MCS 812",
  },
  {
    id: "m6",
    initials: "AP",
    name: "Agus Prasetyo",
    no: "0345",
    years: "4 tahun",
    grade: "B",
    mcs: "MCS 823",
  },
  {
    id: "m7",
    initials: "LM",
    name: "Lina Marlina",
    no: "0890",
    years: "3 tahun",
    grade: "C",
    mcs: "MCS 834",
  },
];

const grades = ["Semua", "AA", "A", "B", "C", "D"];

export default function CooperativeMembersScreen() {
  const [query, setQuery] = useState("");
  const [activeGrade, setActiveGrade] = useState("Semua");
  
  const navigationItems = getDashboardNavigation("officer", "Anggota");

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchesQuery = m.name.toLowerCase().includes(query.toLowerCase());
      const matchesGrade = activeGrade === "Semua" || m.grade === activeGrade;
      return matchesQuery && matchesGrade;
    });
  }, [query, activeGrade]);

  return (
    <MobileScreen className="bg-[#fafafa]">
      <section className="flex h-[100svh] w-full flex-none flex-col overflow-hidden bg-[#fafafa] sm:h-[860px]">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:rgba(18,148,144,0.35)_transparent]">
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
              <div className="flex items-center gap-3">
                <SearchIcon />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari anggota"
                  aria-label="Cari anggota"
                  className="min-w-0 flex-1 border-0 bg-transparent text-[1.02rem] font-medium text-text placeholder:text-[#cbd5e1] outline-none"
                />
              </div>
            </div>
          </header>

          <div className="px-5 pb-10 pt-[52px]">
            {/* Filter Badges */}
            <div className="flex flex-wrap gap-[0.65rem]">
              {grades.map((grade) => {
                const isActive = activeGrade === grade;
                return (
                  <button
                    key={grade}
                    onClick={() => setActiveGrade(grade)}
                    className={`flex h-9 items-center justify-center rounded-full px-4 text-[0.88rem] font-bold transition-colors ${
                      isActive
                        ? "bg-[#e5f3f3] text-[#118B87]" // Similar to primary but slightly adjusted for contrast
                        : "bg-[#f1f5f9] text-[#94a3b8]"
                    }`}
                  >
                    {grade}
                  </button>
                );
              })}
            </div>

            <div className="mt-[2.15rem] space-y-[1.65rem]">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-4">
                    <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-secondary text-[1.05rem] font-bold text-white">
                      {member.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-[1.05rem] font-bold tracking-[-0.03em] text-text">
                        {member.name}
                      </h2>
                      <p className="mt-[0.15rem] truncate text-[0.85rem] font-medium text-text/60">
                        {member.no} · {member.years}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex h-6 items-center justify-center rounded-[6px] bg-[#e5f3f3] px-2.5 text-[0.72rem] font-bold text-[#118B87]">
                        {member.grade}
                      </div>
                      <span className="text-[0.82rem] font-bold tracking-[-0.02em] text-text/60">
                        {member.mcs}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="pt-10 text-center text-[0.92rem] font-medium text-text/50">
                  Anggota tidak ditemukan
                </p>
              )}
            </div>
          </div>
        </div>
        
        <DashboardBottomNavigation items={navigationItems} />
      </section>
    </MobileScreen>
  );
}

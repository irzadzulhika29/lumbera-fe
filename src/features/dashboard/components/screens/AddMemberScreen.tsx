"use client";

import { useState } from "react";

import DashboardPageHeader from "../layout/DashboardPageHeader";
import DashboardScreenShell from "../layout/DashboardScreenShell";
import ManualMemberForm from "../members/ManualMemberForm";
import MemberImportForm from "../members/MemberImportForm";

type Mode = "manual" | "import";

export default function AddMemberScreen() {
  const [mode, setMode] = useState<Mode>("manual");

  return (
    <DashboardScreenShell
      background="bg-[#fafafa]"
      contentClassName="flex flex-col"
      scrollable={false}
    >
      <div className="px-5 pb-6 pt-[calc(1.5rem+env(safe-area-inset-top))]">
        <DashboardPageHeader
          backHref="/dashboard/officer/members"
          title="Tambah anggota"
          subtitle="Lihat pertumbuhan keuangan koperasi"
          titleClassName="text-[1.4rem]"
          variant="form"
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-10 [scrollbar-color:rgba(18,148,144,0.35)_transparent] [scrollbar-width:thin]">
        {mode === "manual" ? (
          <ManualMemberForm onSwitchMode={() => setMode("import")} />
        ) : (
          <MemberImportForm onSwitchMode={() => setMode("manual")} />
        )}
      </div>
    </DashboardScreenShell>
  );
}

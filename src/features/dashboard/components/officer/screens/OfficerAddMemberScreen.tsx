"use client";

import { useState } from "react";

import type { OfficerMemberImportData } from "@/src/features/dashboard/api";
import DashboardPageHeader from "../../layout/DashboardPageHeader";
import DashboardScreenShell from "../../layout/DashboardScreenShell";
import OfficerManualMemberForm from "../members/OfficerManualMemberForm";
import OfficerMemberImportForm from "../members/OfficerMemberImportForm";
import OfficerMemberImportPreview from "../members/OfficerMemberImportPreview";
import OfficerMemberSubmitSuccess from "../members/OfficerMemberSubmitSuccess";

type Mode = "manual" | "import" | "preview" | "success";

export default function OfficerAddMemberScreen() {
  const [mode, setMode] = useState<Mode>("manual");
  const [importPreview, setImportPreview] =
    useState<OfficerMemberImportData | null>(null);
  const [savedCount, setSavedCount] = useState(1);

  const handleImportSuccess = (data: OfficerMemberImportData) => {
    setImportPreview(data);
    setMode("preview");
  };

  const handleManualSubmit = () => {
    setSavedCount(1);
    setMode("success");
  };

  const handleImportSubmit = (importedRows: number) => {
    setSavedCount(importedRows);
    setMode("success");
  };

  const handleAddAgain = () => {
    setImportPreview(null);
    setSavedCount(1);
    setMode("manual");
  };

  if (mode === "success") {
    return (
      <OfficerMemberSubmitSuccess
        memberCount={savedCount}
        onAddAgain={handleAddAgain}
      />
    );
  }

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
          <OfficerManualMemberForm
            onSubmit={handleManualSubmit}
            onSwitchMode={() => setMode("import")}
          />
        ) : mode === "import" ? (
          <OfficerMemberImportForm
            onSwitchMode={() => setMode("manual")}
            onImportSuccess={handleImportSuccess}
          />
        ) : importPreview ? (
          <OfficerMemberImportPreview
            initialData={importPreview}
            onSubmitSuccess={handleImportSubmit}
            onBackToImport={() => setMode("import")}
          />
        ) : null}
      </div>
    </DashboardScreenShell>
  );
}

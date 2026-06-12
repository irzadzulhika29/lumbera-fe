"use client";

import { useState } from "react";

import DashboardPageHeader from "../layout/DashboardPageHeader";
import DashboardScreenShell from "../layout/DashboardScreenShell";
import ManualMemberForm from "../members/ManualMemberForm";
import MemberImportForm from "../members/MemberImportForm";
import MemberImportPreview from "../members/MemberImportPreview";

type ImportPreviewStatus = "success" | "error";

type ImportPreviewRow = {
  address: string;
  joinedAt: string;
  phoneNumber: string;
  id: string;
  name: string;
  nik: string;
  status: ImportPreviewStatus;
};

type ImportPreviewData = {
  fileName: string;
  rows: ImportPreviewRow[];
};

type Mode = "manual" | "import" | "preview";

const mockImportRows: ImportPreviewRow[] = [
  {
    id: "row-1",
    name: "Bara Hermawan",
    nik: "1234567890123456",
    phoneNumber: "081234567890",
    address: "Jl. Bunga Kenari No.1, Kota Malang, Jawa Timur",
    joinedAt: "11 Juni 2024",
    status: "success",
  },
  {
    id: "row-2",
    name: "Dewi Lestari",
    nik: "4433221100998877",
    phoneNumber: "081298765432",
    address: "Jl. Anggrek Putih No.9, Kota Yogyakarta, DI Yogyakarta",
    joinedAt: "20 Juni 2024",
    status: "success",
  },
  {
    id: "row-3",
    name: "Linda Susanti",
    nik: "6677889900112233",
    phoneNumber: "085512345678",
    address: "Jl. Kenanga Sari No.7, Kota Medan, Sumatera Utara",
    joinedAt: "25 Juni 2024",
    status: "success",
  },
  {
    id: "row-4",
    name: "Budi Hartono",
    nik: "9988776655443322",
    phoneNumber: "083456789012",
    address: "Jl. Flamboyan No.15, Kota Palembang, Sumatera Selatan",
    joinedAt: "28 Juni 2024",
    status: "success",
  },
  {
    id: "row-5",
    name: "Rani Permata",
    nik: "1234432112344321",
    phoneNumber: "081322334455",
    address: "NIK duplikat dengan anggota aktif",
    joinedAt: "03 Juli 2024",
    status: "error",
  },
  {
    id: "row-6",
    name: "Sinta Ayu",
    nik: "9988123411223344",
    phoneNumber: "081277788899",
    address: "Format tanggal bergabung tidak valid",
    joinedAt: "2024/07/12",
    status: "error",
  },
  {
    id: "row-7",
    name: "Agus Wibowo",
    nik: "1111222233334444",
    phoneNumber: "081300112233",
    address: "Alamat wajib diisi lengkap",
    joinedAt: "15 Juli 2024",
    status: "error",
  },
];

export default function AddMemberScreen() {
  const [mode, setMode] = useState<Mode>("manual");
  const [importPreview, setImportPreview] = useState<ImportPreviewData | null>(
    null,
  );

  const handleImportSuccess = (fileName: string) => {
    setImportPreview({
      fileName,
      rows: mockImportRows,
    });
    setMode("preview");
  };

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
        ) : mode === "import" ? (
          <MemberImportForm
            onSwitchMode={() => setMode("manual")}
            onImportSuccess={handleImportSuccess}
          />
        ) : (
          <MemberImportPreview
            fileName={importPreview?.fileName ?? "data.xlsx"}
            rows={importPreview?.rows ?? []}
            onBackToImport={() => setMode("import")}
          />
        )}
      </div>
    </DashboardScreenShell>
  );
}

"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

import {
  downloadOfficerMemberImportTemplate,
  type OfficerMemberImportData,
  uploadOfficerMemberImport,
} from "@/src/features/dashboard/api";
import PressButton from "@/src/shared/components/ui/PressButton";

export default function OfficerMemberImportForm({
  onImportSuccess,
  onSwitchMode,
}: {
  onImportSuccess: (data: OfficerMemberImportData) => void;
  onSwitchMode: () => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [downloadError, setDownloadError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setUploadError("");
    setSelectedFile(file ?? null);
  };

  const handleTemplateDownload = async () => {
    try {
      setDownloadError("");
      setIsDownloadingTemplate(true);
      await downloadOfficerMemberImportTemplate();
    } catch (error) {
      setDownloadError(
        error instanceof Error
          ? error.message
          : "Gagal mengunduh template. Coba lagi.",
      );
    } finally {
      setIsDownloadingTemplate(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Pilih file Excel terlebih dahulu.");
      return;
    }

    try {
      setUploadError("");
      setIsUploading(true);
      const response = await uploadOfficerMemberImport(selectedFile);
      onImportSuccess(response.data);
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "Gagal mengunggah file anggota. Coba lagi.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="mb-6 mt-2">
        <h2 className="text-[1.5rem] font-extrabold tracking-[-0.03em] text-[#2c3e50]">
          Impor data anggota
        </h2>
        <p className="mt-1 text-[0.92rem] font-medium text-[#475569]">
          Impor data anggota dari file excel
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="file-upload"
          className="text-[0.95rem] font-medium text-[#475569]"
        >
          Upload file <span className="text-[#e74c3c]">*</span>
        </label>

        <div className="relative flex h-[3.25rem] w-full items-center overflow-hidden rounded-[8px] border border-[#cbd5e1] bg-white">
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 cursor-pointer opacity-0"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
          />
          <div className="pointer-events-none flex h-full items-center bg-[#118B87] px-4 text-white">
            <Icon
              icon="solar:upload-linear"
              className="mr-2 text-[1.1rem]"
              aria-hidden="true"
            />
            <span className="text-[0.92rem] font-bold">Upload file excel</span>
          </div>
          <div className="min-w-0 flex-1 truncate px-4 text-[0.95rem] text-[#94a3b8]">
            {selectedFile?.name ?? "Pilih file Excel"}
          </div>
        </div>
        {uploadError ? (
          <p className="mt-1 text-[0.88rem] font-medium text-[#e74c3c]">
            {uploadError}
          </p>
        ) : null}
      </div>

      <div className="my-6 flex items-center justify-center">
        <span className="text-[0.9rem] italic text-[#475569]">atau</span>
      </div>

      <PressButton
        onClick={handleTemplateDownload}
        disabled={isDownloadingTemplate}
        className="h-12 w-full rounded-[8px] text-[0.95rem] font-bold"
      >
        {isDownloadingTemplate ? "Mengunduh template..." : "Unduh template"}
      </PressButton>
      {downloadError ? (
        <p className="mt-3 text-center text-[0.88rem] font-medium text-[#e74c3c]">
          {downloadError}
        </p>
      ) : null}

      <div className="mt-auto flex flex-col gap-4 pt-24">
        <PressButton
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="h-14 w-full rounded-[12px] text-[1.05rem] font-bold"
        >
          {isUploading ? "Mengunggah..." : "Lanjut"}
        </PressButton>
        <button
          type="button"
          onClick={onSwitchMode}
          className="flex h-12 w-full items-center justify-center text-[0.95rem] font-bold text-[#118B87] transition-colors hover:text-[#0f7a76]"
        >
          atau input data manual
        </button>
      </div>
    </>
  );
}

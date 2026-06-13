"use client";

import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";

import {
  getOfficerMemberImportPreview,
  type OfficerMemberImportData,
  type OfficerMemberImportRow,
  type OfficerMemberImportRowStatus,
  submitOfficerMemberImport,
} from "@/src/features/dashboard/api";
import PressButton from "@/src/shared/components/ui/PressButton";
import FilterChips from "../../common/FilterChips";

const statusTabs = [
  { label: "Berhasil", value: "VALID" },
  { label: "Error", value: "ERROR" },
] as const;

const formatJoinedDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

function SummaryCard({
  label,
  toneClassName,
  value,
}: {
  label: string;
  toneClassName?: string;
  value: number;
}) {
  return (
    <div className="flex-1 border-r border-[#edf0f3] px-5 py-4 last:border-r-0">
      <p className="text-[0.9rem] font-bold text-[#b9b9b9]">{label}</p>
      <p
        className={`mt-2 text-[1.2rem] font-bold text-[#2b2b2b] ${toneClassName ?? ""}`}
      >
        {value}
      </p>
    </div>
  );
}

export default function OfficerMemberImportPreview({
  initialData,
  onSubmitSuccess,
  onBackToImport,
}: {
  initialData: OfficerMemberImportData;
  onSubmitSuccess: (importedRows: number) => void;
  onBackToImport: () => void;
}) {
  const uploadedValidRows = useMemo(
    () => initialData.rows.filter((row) => row.status === "VALID"),
    [initialData.rows],
  );
  const uploadedErrorRows = useMemo(
    () => initialData.rows.filter((row) => row.status === "ERROR"),
    [initialData.rows],
  );
  const initialTab: OfficerMemberImportRowStatus =
    uploadedValidRows.length > 0 ? "VALID" : "ERROR";
  const [activeTab, setActiveTab] =
    useState<OfficerMemberImportRowStatus>(initialTab);
  const [rows, setRows] = useState<OfficerMemberImportRow[]>(
    initialTab === "VALID" ? uploadedValidRows : uploadedErrorRows,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const summary = initialData.summary;
  const successCount =
    summary.success_rows > 0
      ? summary.success_rows
      : uploadedValidRows.length;
  const errorCount =
    summary.error_rows > 0 ? summary.error_rows : uploadedErrorRows.length;
  const totalCount = Math.max(
    summary.total_rows,
    successCount + errorCount,
    initialData.rows.length,
  );
  const isErrorTab = activeTab === "ERROR";

  useEffect(() => {
    let isActive = true;

    const loadPreview = async () => {
      try {
        setErrorMessage("");
        setIsLoading(true);
        const response = await getOfficerMemberImportPreview(
          summary.import_batch_id,
          {
            status: activeTab,
            page: 1,
            limit: 20,
          },
        );

        if (isActive) {
          const uploadedRowsForStatus =
            activeTab === "VALID" ? uploadedValidRows : uploadedErrorRows;
          setRows(
            response.data.rows.length > 0
              ? response.data.rows
              : uploadedRowsForStatus,
          );
        }
      } catch (error) {
        if (isActive) {
          setRows(
            activeTab === "VALID" ? uploadedValidRows : uploadedErrorRows,
          );
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Gagal mengambil pratinjau data anggota.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadPreview();

    return () => {
      isActive = false;
    };
  }, [
    activeTab,
    summary.import_batch_id,
    uploadedErrorRows,
    uploadedValidRows,
  ]);

  const handleSubmit = async () => {
    try {
      setErrorMessage("");
      setIsSubmitting(true);
      const response = await submitOfficerMemberImport(
        summary.import_batch_id,
      );
      onSubmitSuccess(response.data.imported_rows);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal menyimpan data anggota.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-6 mt-2">
        <h2 className="text-[1.8rem] font-extrabold tracking-[-0.03em] text-[#2c2c2c]">
          Pratinjau data anggota
        </h2>
        <p className="mt-1 text-[0.92rem] font-medium text-[#475569]">
          Tinjau data anggota sebelum didaftarkan
        </p>
      </div>

      <div className="overflow-hidden rounded-[22px] border border-[#e3e4e7] bg-white shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
        <div className="flex">
          <SummaryCard label="Total" value={totalCount} />
          <SummaryCard
            label="Berhasil"
            value={successCount}
            toneClassName="text-primary"
          />
          <SummaryCard
            label="Gagal"
            value={errorCount}
            toneClassName="text-[#e53935]"
          />
        </div>
      </div>

      <FilterChips
        activeValue={activeTab}
        className="mt-4"
        mode="scroll"
        onChange={setActiveTab}
        options={statusTabs.map((tab) => ({
          label: tab.label,
          value: tab.value,
        }))}
      />

      <div className="mt-3 overflow-x-auto rounded-[18px] border border-[#d8e0e6] bg-white shadow-[0_8px_18px_rgba(15,23,42,0.05)] [scrollbar-color:rgba(18,148,144,0.2)_transparent] [scrollbar-width:thin]">
        <div className="min-w-[1180px]">
          <div className="grid grid-cols-[1.1fr_1fr_0.9fr_2.4fr_1fr_0.8fr] bg-[#147b78] text-white">
            <div className="px-4 py-3 text-xs font-bold uppercase tracking-[-0.02em]">
              Nama lengkap
            </div>
            <div className="px-4 py-3 text-xs font-bold uppercase tracking-[-0.02em]">
              NIK
            </div>
            <div className="px-4 py-3 text-xs font-bold uppercase tracking-[-0.02em]">
              No. handphone
            </div>
            <div className="px-4 py-3 text-xs font-bold uppercase tracking-[-0.02em]">
              Alamat
            </div>
            <div className="px-4 py-3 text-xs font-bold uppercase tracking-[-0.02em]">
              Tanggal bergabung
            </div>
            <div className="px-4 py-3 text-xs font-bold uppercase tracking-[-0.02em]">
              {isErrorTab ? "Action" : "Status"}
            </div>
          </div>

          <div className="max-h-[310px] overflow-y-auto">
            {isLoading ? (
              <div className="flex min-h-28 items-center justify-center text-sm font-medium text-[#7c8a9b]">
                Memuat pratinjau...
              </div>
            ) : rows.length === 0 ? (
              <div className="flex min-h-28 items-center justify-center text-sm font-medium text-[#7c8a9b]">
                Tidak ada data pada status ini.
              </div>
            ) : (
              rows.map((row) => (
                <div
                  key={row.import_row_id}
                  className="grid grid-cols-[1.1fr_1fr_0.9fr_2.4fr_1fr_0.8fr] border-t border-[#e7ebef] bg-white"
                >
                  <div className="px-4 py-5 text-xs font-medium text-[#2f3744]">
                    {row.full_name}
                  </div>
                  <div className="px-4 py-5 text-xs font-medium text-[#2f3744]">
                    {row.nik_masked}
                  </div>
                  <div className="px-4 py-5 text-xs font-medium text-[#2f3744]">
                    {row.phone_number}
                  </div>
                  <div className="px-4 py-5 text-xs font-medium text-[#2f3744]">
                    {row.address}
                    {row.error_message ? (
                      <p className="mt-1 font-semibold text-[#e53935]">
                        {row.error_message}
                      </p>
                    ) : null}
                  </div>
                  <div className="px-4 py-5 text-xs font-medium text-[#2f3744]">
                    {formatJoinedDate(row.joined_date)}
                  </div>
                  <div className="px-4 py-4">
                    {isErrorTab ? (
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          aria-label={`Edit ${row.full_name}`}
                          className="inline-flex h-10 w-[54px] items-center justify-center rounded-[8px] bg-[#f6a313] text-white"
                        >
                          <Icon
                            icon="solar:pen-linear"
                            className="text-[1.2rem]"
                          />
                        </button>
                        <button
                          type="button"
                          aria-label={`Hapus ${row.full_name}`}
                          className="inline-flex h-10 w-[54px] items-center justify-center rounded-[8px] bg-[#eb2b2b] text-white"
                        >
                          <Icon
                            icon="solar:trash-bin-trash-linear"
                            className="text-[1.2rem]"
                          />
                        </button>
                      </div>
                    ) : (
                      <span className="inline-flex rounded-[10px] bg-[#d8f5d9] px-3 py-2 text-xs font-bold text-[#20a84e]">
                        Berhasil
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <p className="mt-3 text-[0.82rem] font-medium text-[#7c8a9b]">
        File aktif: {summary.file_name}
      </p>
      {errorMessage ? (
        <p className="mt-3 text-center text-[0.88rem] font-medium text-[#e74c3c]">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-12 flex flex-col gap-4">
        <PressButton
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || successCount === 0}
          className="h-14 w-full rounded-[12px] text-[1.05rem] font-bold"
        >
          {isSubmitting ? "Menyimpan..." : "Submit"}
        </PressButton>
        <button
          type="button"
          onClick={onBackToImport}
          className="flex h-12 w-full items-center justify-center text-[0.95rem] font-bold text-[#118B87] transition-colors hover:text-[#0f7a76]"
        >
          ganti file impor
        </button>
      </div>
    </>
  );
}

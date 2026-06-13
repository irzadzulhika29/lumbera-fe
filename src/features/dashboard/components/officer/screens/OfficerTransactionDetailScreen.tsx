"use client";

import { useState } from "react";

import ConfirmationModal from "@/src/shared/components/ui/ConfirmationModal";

import DashboardScreenShell from "../../layout/DashboardScreenShell";
import OfficerFlowHeader from "../layout/OfficerFlowHeader";

type OfficerTransactionDetailScreenProps = {
  amount: number;
  description: string;
  hash: string;
  memberName: string;
  memberNumber: string;
  officerName: string;
  recordedAt: string;
  status: string;
  transactionGroup: "SIMPANAN" | "PINJAMAN" | "ANGSURAN" | "PENARIKAN";
  transactionId: string;
  transactionTypeLabel: string;
};

function formatCurrency(amount: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`;
}

function formatRecordedAt(value: string) {
  const date = new Date(value);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  })
    .format(date)
    .replace(".", ":")
    .replace(",", "");
}

function getAmountLabel(group: OfficerTransactionDetailScreenProps["transactionGroup"]) {
  if (group === "PINJAMAN") return "Jumlah pencairan";
  if (group === "ANGSURAN") return "Jumlah angsuran";
  if (group === "PENARIKAN") return "Jumlah penarikan";
  return "Jumlah simpanan";
}

function getAmountTone(group: OfficerTransactionDetailScreenProps["transactionGroup"]) {
  return group === "PENARIKAN" ? "text-[#ef4444]" : "text-primary";
}

function getStatusLabel(status: string) {
  return status === "SYNCED" ? "Sinkron" : "Pending";
}

function buildHashPreview(hash: string) {
  return hash.startsWith("SHA-256:") ? hash : `SHA-256: ${hash}`;
}

export default function OfficerTransactionDetailScreen({
  amount,
  description,
  hash,
  memberName,
  memberNumber,
  officerName,
  recordedAt,
  status,
  transactionGroup,
  transactionId,
  transactionTypeLabel,
}: OfficerTransactionDetailScreenProps) {
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const detailRows = [
    { label: "Nama", value: `${memberName} · ${memberNumber}` },
    { label: "Jenis", value: transactionTypeLabel },
    { label: "Dicatat oleh", value: officerName },
    { label: "Tanggal", value: formatRecordedAt(recordedAt) },
    {
      label: getAmountLabel(transactionGroup),
      value: formatCurrency(amount),
      valueClassName: getAmountTone(transactionGroup),
    },
    { label: "Keterangan", value: description },
    { label: "Status", value: getStatusLabel(status) },
    {
      label: "Hash",
      value: buildHashPreview(hash),
      valueClassName: "text-text/36",
    },
  ];

  return (
    <DashboardScreenShell background="bg-[#f7f8f9]">
      <OfficerFlowHeader
        backHref="/dashboard/officer/transactions"
        title="Detail transaksi"
        subtitle={`Transaksi / ${buildHashPreview(hash).replace("SHA-256: ", "")}`}
      />

      <div className="relative z-10 px-6 pb-8 pt-0">
        <section className="relative z-10 mt-[-42px] rounded-[18px] border border-[#dde2e7] bg-white px-6 py-6 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
          <h2 className="text-[1rem] font-bold tracking-[-0.03em] text-primary">
            Ringkasan Transaksi
          </h2>

          <div className="mt-6 space-y-6">
            {detailRows.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-6">
                <span className="text-[0.9rem] font-medium text-text/72">
                  {row.label}
                </span>
                <span
                  className={`max-w-[58%] text-right text-[0.92rem] font-bold tracking-[-0.02em] text-text/76 ${row.valueClassName ?? ""}`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => setIsCancelModalOpen(true)}
            className="w-full rounded-[14px] bg-[#E52525] px-4 py-5 text-[1rem] font-bold text-white shadow-[0_6px_0_0_#B91C1C]"
          >
            Batalkan
          </button>
        </div>

        <p className="mt-5 text-center text-[0.8rem] font-medium text-text/35">
          ID transaksi: {transactionId}
        </p>
      </div>

      <ConfirmationModal
        actionLabel="Batalkan transaksi"
        description={
          <>
            <strong>Apakah kamu yakin ingin membatalkan transaksi ini?</strong>{" "}
            Transaksi pembatalan ini akan dicatat di buku besar secara permanen
          </>
        }
        iconAlt="Konfirmasi pembatalan transaksi"
        iconSrc="/status/confirm-icon.svg"
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() => setIsCancelModalOpen(false)}
        onReasonChange={setCancelReason}
        reasonPlaceholder="Masukkan alasan"
        reasonValue={cancelReason}
        title="Confirmation"
      />
    </DashboardScreenShell>
  );
}

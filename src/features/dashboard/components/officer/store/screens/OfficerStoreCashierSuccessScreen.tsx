"use client";

import { motion } from "framer-motion";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import StoreCashierHeader from "@/src/features/dashboard/components/officer/store/common/StoreCashierHeader";
import type { StoreCashierDraft } from "@/src/features/dashboard/storeTypes";
import { getStoreCashierDraft } from "@/src/features/dashboard/utils/storeCashierDraftStorage";
import PressButton from "@/src/shared/components/ui/PressButton";
import { formatThousandGroupedNumber } from "@/src/shared/utils/numberFormatting";
import Image from "next/image";
import Link from "next/link";

const fallbackDraft: StoreCashierDraft = {
  cashReceived: "150000",
  changeAmount: "10000",
  createdAtLabel: "11 Jun 2026, 09:08",
  hashPreview: "SHA-256: a3f7b2e1...",
  items: [
    {
      id: "cashier-001",
      initials: "BP",
      name: "Beras Premium",
      price: 70000,
      quantity: 2,
    },
  ],
  receiptNumber: "INV-0001",
  recordedBy: "Jamaludin",
  totalAmount: "140000",
};

function formatRupiah(value: string) {
  return `Rp ${formatThousandGroupedNumber(value)}`;
}

export default function OfficerStoreCashierSuccessScreen() {
  const draft = getStoreCashierDraft() ?? fallbackDraft;
  const primaryItem = draft.items[0];

  return (
    <DashboardScreenShell background="bg-white" scrollable={false}>
      <motion.main
        className="flex min-h-full flex-col bg-white"
        initial={{ opacity: 0, scale: 0.992, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.26, ease: "easeOut" }}
      >
        <StoreCashierHeader
          actionHref="/dashboard/officer/store"
          title="Kasir Padiwangi"
          subtitle="Kelola penjualan produk koperasi anda"
        />

        <div className="relative flex flex-1 flex-col px-4 pb-8 pt-5">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mx-auto flex w-full max-w-[320px] flex-1 flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.55, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                delay: 0.08,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="mt-[-18px] flex h-[9.8rem] w-[9.8rem] items-center justify-center"
            >
              <Image
                src="/status/success-icon.svg"
                alt=""
                aria-hidden="true"
                width={168}
                height={168}
                className="h-[9.8rem] w-[9.8rem]"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.3, ease: "easeOut" }}
              className="mt-3 text-center"
            >
              <h1 className="text-[2rem] font-bold leading-none tracking-[-0.045em] text-text">
              Hooray!
              </h1>
              <p className="mt-3 text-[1rem] leading-snug text-text/72">
                Pembayaran telah berhasil!
              </p>
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
              className="mt-7 w-full rounded-[14px] border border-border bg-white px-4 py-4 text-left shadow-sm"
            >
              <h2 className="text-[1.02rem] font-bold tracking-[-0.025em] text-primary">
                Ringkasan pembelian
              </h2>

              <div className="mt-4 space-y-3.5">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                  <span className="text-[0.96rem] font-medium text-text/72">No. Nota</span>
                  <span className="text-right text-[0.96rem] font-bold text-text/78">
                    {draft.receiptNumber}
                  </span>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                  <span className="text-[0.96rem] font-medium text-text/72">Dicatat oleh</span>
                  <span className="text-right text-[0.96rem] font-bold text-text/78">
                    {draft.recordedBy}
                  </span>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                  <span className="text-[0.96rem] font-medium text-text/72">Tanggal</span>
                  <span className="text-right text-[0.96rem] font-bold text-text/78">
                    {draft.createdAtLabel}
                  </span>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                  <span className="text-[0.96rem] font-medium text-text/72">
                    {`${primaryItem?.name ?? "Beras Premium"} x ${primaryItem?.quantity ?? 2}`}
                  </span>
                  <span className="text-right text-[0.96rem] font-bold text-text/78">
                    {formatRupiah(draft.totalAmount)}
                  </span>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                  <span className="text-[0.96rem] font-medium text-text/72">Total</span>
                  <span className="text-right text-[1.5rem] font-bold leading-none tracking-[-0.04em] text-text">
                    {formatRupiah(draft.totalAmount)}
                  </span>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                  <span className="text-[0.96rem] font-medium text-text/72">Hash</span>
                  <span className="max-w-[11rem] truncate text-right text-[0.96rem] text-text/28">
                    {draft.hashPreview}
                  </span>
                </div>
              </div>
            </motion.section>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.3, ease: "easeOut" }}
              className="mt-6 grid w-full grid-cols-2 gap-3"
            >
              <PressButton
                variant="outline"
                className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
              >
                Cetak Struk
              </PressButton>

              <Link href="/dashboard/officer/store/cashier" className="block">
                <PressButton className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold">
                  Transaksi Baru
                </PressButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </DashboardScreenShell>
  );
}

"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import { getStoreStockAdjustmentDraft } from "@/src/features/dashboard/utils/storeStockAdjustmentDraftStorage";
import PressButton from "@/src/shared/components/ui/PressButton";

const fallbackMutation = {
  productName: "Beras Premium",
  totalQuantity: "40 Kg",
};

export default function OfficerStoreStockAdjustmentSuccessScreen() {
  const mutation = getStoreStockAdjustmentDraft() ?? fallbackMutation;

  return (
    <DashboardScreenShell background="bg-white" scrollable={false}>
      <motion.main
        className="flex min-h-full flex-col px-4 pb-8 pt-[calc(1.2rem+env(safe-area-inset-top))] text-text"
        initial={{ opacity: 0, scale: 0.992, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.26, ease: "easeOut" }}
      >
        <div className="flex w-full flex-1 flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full flex-col items-center"
          >
            <div className="relative flex h-[8.75rem] w-[8.75rem] items-center justify-center">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [0.7, 1.08, 1.12], opacity: [0, 0.42, 0] }}
                transition={{ delay: 0.32, duration: 0.7, ease: "easeOut" }}
                className="absolute inset-[0.85rem] rounded-full border-[12px] border-primary-light"
              />
              <motion.div
                initial={{ opacity: 0, scaleX: 0.2 }}
                animate={{ opacity: [0, 1, 0], scaleX: [0.2, 1, 1.05] }}
                transition={{ delay: 0.5, duration: 0.9, ease: "easeInOut" }}
                className="absolute inset-[-0.15rem] rounded-full border border-primary/16"
              />
              <motion.div
                initial={{ scale: 0.55, rotate: -10, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                  delay: 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="relative z-10"
              >
                <Image
                  src="/status/success-icon.svg"
                  alt=""
                  aria-hidden="true"
                  width={140}
                  height={140}
                  className="h-[8.75rem] w-[8.75rem]"
                  priority
                />
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.3, ease: "easeOut" }}
              className="mt-10 text-[2rem] font-bold leading-none tracking-[-0.045em]"
            >
              Hooray!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.28, ease: "easeOut" }}
              className="mt-3 text-[1rem] leading-snug text-text/72"
            >
              Anda berhasil menyesuaikan stok
            </motion.p>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
              className="mt-5 w-full rounded-[14px] border border-border bg-white px-4 py-4 text-left shadow-sm"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                  <span className="text-[0.96rem] font-semibold text-text/72">Produk</span>
                  <span className="text-right text-[0.96rem] font-bold text-text/82">
                    {mutation.productName}
                  </span>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                  <span className="text-[0.96rem] font-semibold text-text/72">
                    Kuantitas Total
                  </span>
                  <span className="text-right text-[0.96rem] font-bold text-text/82">
                    {mutation.totalQuantity}
                  </span>
                </div>
              </div>
            </motion.section>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.3, ease: "easeOut" }}
              className="mt-8 w-full"
            >
              <Link
                href="/dashboard/officer/store/stock-adjustment"
                className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <PressButton className="w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold">
                  Tambah produk lagi
                </PressButton>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56, duration: 0.28, ease: "easeOut" }}
            >
              <Link
                href="/dashboard"
                className="mt-7 inline-flex items-center justify-center gap-2 text-[1.02rem] font-bold text-primary transition-colors hover:text-primary/85"
              >
                <Icon
                  icon="solar:alt-arrow-left-linear"
                  className="text-[1.15rem]"
                />
                <span>Kembali ke beranda</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </DashboardScreenShell>
  );
}

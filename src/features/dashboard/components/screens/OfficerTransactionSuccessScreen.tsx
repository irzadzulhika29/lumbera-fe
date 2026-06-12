"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import DashboardScreenShell from "../layout/DashboardScreenShell";

type OfficerTransactionSuccessScreenProps = {
  hash: string;
  memberName: string;
  title: string;
  transactionLabel: string;
};

export default function OfficerTransactionSuccessScreen({
  hash,
  memberName,
  title,
  transactionLabel,
}: OfficerTransactionSuccessScreenProps) {
  return (
    <DashboardScreenShell
      background="bg-white"
      contentClassName="flex flex-col px-6 pb-8 pt-7 text-text"
    >
          <div className="flex flex-1 flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-[16svh] flex flex-col items-center"
            >
              <div className="relative flex h-[10rem] w-[10rem] items-center justify-center">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: [0.7, 1.08, 1.12], opacity: [0, 0.42, 0] }}
                  transition={{ delay: 0.32, duration: 0.7, ease: "easeOut" }}
                  className="absolute inset-[0.7rem] rounded-[2rem] bg-primary-light/60"
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
                    width={160}
                    height={160}
                    priority
                    className="h-[10rem] w-[10rem]"
                  />
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.3, ease: "easeOut" }}
                className="mt-12 text-[2rem] font-bold leading-none tracking-[-0.04em]"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.3, ease: "easeOut" }}
                className="mt-3 max-w-[22rem] text-[1.12rem] leading-snug text-text/76"
              >
                {transactionLabel} - {memberName}
              </motion.p>
            </motion.div>

            <div className="mt-8 w-full rounded-[12px] border-2 border-[#d9dde2] bg-white px-5 py-4 text-left">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[1rem] font-bold text-text/72">Hash</span>
                <span className="text-right text-[1rem] text-text/28">
                  {hash}
                </span>
              </div>
            </div>

            <div className="mt-8 inline-flex rounded-full bg-[#FFF4E6] px-5 py-2 text-[0.92rem] font-medium text-[#F59E0B]">
              Offline - Sinkron otomatis saat online
            </div>

            <div className="mt-auto w-full pt-6">
              <Link
                href="/dashboard/officer/transactions"
                className="block w-full rounded-[10px] bg-primary px-4 py-4 text-center text-[1rem] font-bold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5"
              >
                Catat transaksi lagi
              </Link>

              <Link
                href="/dashboard"
                className="mt-6 block text-center text-[1.02rem] font-bold text-primary"
              >
                &lt; Kembali ke beranda
              </Link>
            </div>
          </div>
    </DashboardScreenShell>
  );
}

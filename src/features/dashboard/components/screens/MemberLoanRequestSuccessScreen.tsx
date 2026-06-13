"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";

const submissionStages = [
  {
    id: "submitted",
    title: "Pengajuan diterima",
    subtitle: "11 Jun 2026, 10:22",
    status: "completed",
  },
  {
    id: "score-verified",
    title: "Skor kredit terverifikasi",
    subtitle: "11 Jun 2026, 10:23 · MCS 780",
    status: "completed",
  },
  {
    id: "review",
    title: "Peninjauan Akseleran",
    subtitle: "Estimasi 1-2 jam",
    status: "pending",
  },
  {
    id: "disbursement",
    title: "Dana cair ke Virtual Account",
    subtitle: "Menunggu persetujuan",
    status: "pending",
  },
] as const;

function StageStatusIcon({
  status,
}: {
  status: (typeof submissionStages)[number]["status"];
}) {
  return (
    <span
      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white ${
        status === "completed" ? "bg-primary" : "bg-[#CFCFCF]"
      }`}
    >
      <Icon icon="solar:check-read-linear" className="text-[0.9rem]" />
    </span>
  );
}

export default function MemberLoanRequestSuccessScreen() {
  return (
    <DashboardScreenShell background="bg-white" scrollable={false}>
      <motion.main
        className="flex min-h-full flex-col px-3 pb-8 pt-[calc(1.2rem+env(safe-area-inset-top))] text-text"
        initial={{ opacity: 0, scale: 0.992, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.26, ease: "easeOut" }}
      >
        <div className="mx-auto flex w-full max-w-[444px] flex-1 flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center"
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
              className="mt-12 text-[2rem] font-bold leading-none tracking-[-0.045em]"
            >
              Pengajuan berhasil!
            </motion.h1>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.3, ease: "easeOut" }}
              className="mt-5 w-full rounded-[14px] border border-border bg-white px-4 py-4 text-left shadow-sm"
            >
              <h2 className="text-[1.08rem] font-bold tracking-[-0.025em] text-primary">
                Tahapan Pengajuan
              </h2>

              <div className="mt-4 space-y-4">
                {submissionStages.map((stage) => (
                  <div key={stage.id} className="flex items-start gap-3">
                    <StageStatusIcon status={stage.status} />

                    <div className="min-w-0">
                      <p
                        className={`text-[1rem] font-bold leading-snug tracking-[-0.02em] ${
                          stage.status === "completed"
                            ? "text-text"
                            : "text-text/88"
                        }`}
                      >
                        {stage.title}
                      </p>
                      <p
                        className={`mt-1 text-[0.84rem] font-medium ${
                          stage.status === "completed"
                            ? "text-text/34"
                            : "text-text/26"
                        }`}
                      >
                        {stage.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.28, ease: "easeOut" }}
            >
              <Link
                href="/dashboard/member"
                className="mt-10 inline-flex items-center justify-center gap-2 text-[1.02rem] font-bold text-primary transition-colors hover:text-primary/85"
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

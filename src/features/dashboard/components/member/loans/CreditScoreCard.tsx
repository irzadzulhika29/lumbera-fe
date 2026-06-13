"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import type { DashboardLoanCreditProfile } from "@/src/features/dashboard/types";

import CreditFactors from "./CreditFactors";
import ScoreRing from "./ScoreRing";

export default function CreditScoreCard({
  profile,
}: {
  profile: DashboardLoanCreditProfile;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="overflow-hidden rounded-[16px] border border-border bg-white shadow-sm">
      <div className="bg-[linear-gradient(90deg,var(--color-primary-shadow)_0%,#255c99_100%)] px-4 pb-4 pt-4 text-white">
        <h2 className="text-[1.28rem] font-bold tracking-[-0.03em]">
          Skor Kredit Saya
        </h2>
        <p className="mt-1 text-[0.9rem] font-medium text-white/82">
          {profile.subtitle}
        </p>

        <div className="mt-5 flex items-center gap-4">
          <ScoreRing score={profile.score} maxScore={profile.maxScore} />

          <div className="min-w-0 flex-1">
            <div className="inline-flex rounded-[8px] bg-white px-5 py-2 text-[1.3rem] font-bold leading-none tracking-[-0.03em] text-primary">
              {profile.gradeLabel}
            </div>
            <p className="mt-4 text-[0.94rem] font-bold leading-snug tracking-[-0.02em] text-white">
              {profile.title}
            </p>
            <p className="mt-2 text-[0.82rem] font-medium text-white/82">
              {profile.updatedLabel}
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden bg-white"
          >
            <CreditFactors factors={profile.factors} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        className="flex w-full items-center justify-center gap-2 bg-white px-4 py-2.5 text-[0.9rem] font-semibold text-text/38"
      >
        {expanded ? "Sembunyikan" : "Lihat selengkapnya"}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="inline-flex"
        >
          <Icon icon="solar:alt-arrow-down-linear" className="text-[1.1rem]" />
        </motion.span>
      </button>
    </section>
  );
}

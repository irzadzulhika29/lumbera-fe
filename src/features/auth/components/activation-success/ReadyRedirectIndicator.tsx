"use client";

import { motion } from "framer-motion";

type ReadyRedirectIndicatorProps = {
  isExiting: boolean;
  shouldReduceMotion: boolean;
  label: string;
};

export default function ReadyRedirectIndicator({
  isExiting,
  shouldReduceMotion,
  label,
}: ReadyRedirectIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.46, duration: 0.28, ease: "easeOut" }}
      className="mt-7 flex w-full max-w-[16.5rem] flex-col items-center gap-3"
    >
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-light/80">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: isExiting ? "100%" : "100%" }}
          transition={{
            delay: shouldReduceMotion ? 0.05 : 0.5,
            duration: shouldReduceMotion ? 0.35 : 1.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full rounded-full bg-primary"
        />
      </div>
      <p className="text-sm font-medium text-primary/82">{label}</p>
    </motion.div>
  );
}

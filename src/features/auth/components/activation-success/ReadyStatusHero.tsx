"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ReadyStatusHeroProps = {
  isExiting: boolean;
  shouldAutoRedirect: boolean;
};

export default function ReadyStatusHero({
  isExiting,
  shouldAutoRedirect,
}: ReadyStatusHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mt-[18svh] flex flex-col items-center"
    >
      <div className="relative flex h-[8.75rem] w-[8.75rem] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: isExiting ? 0.12 : 0.24, scale: isExiting ? 1.18 : 1 }}
          transition={{ delay: 0.12, duration: 0.5, ease: "easeOut" }}
          className="absolute inset-[0.35rem] rounded-full bg-primary-light/60 blur-[3px]"
        />
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={
            shouldAutoRedirect
              ? { scale: [0.7, 1.08, 1.12, 1.12], opacity: [0, 0.42, 0, 0] }
              : { scale: [0.7, 1.08, 1.12], opacity: [0, 0.42, 0] }
          }
          transition={{
            delay: 0.32,
            duration: shouldAutoRedirect ? 1.05 : 0.7,
            ease: "easeOut",
          }}
          className="absolute inset-[0.85rem] rounded-full border-[12px] border-primary-light"
        />
        <motion.div
          initial={{ opacity: 0, scaleX: 0.2 }}
          animate={
            shouldAutoRedirect
              ? { opacity: [0, 1, 1, 0], scaleX: [0.2, 1, 1, 1.05] }
              : { opacity: 0 }
          }
          transition={{ delay: 0.52, duration: 1.15, ease: "easeInOut" }}
          className="absolute inset-[-0.25rem] rounded-full border border-primary/20"
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
            width={140}
            height={140}
            priority
            className="h-[8.75rem] w-[8.75rem]"
          />
        </motion.div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.3, ease: "easeOut" }}
        className="mt-12 text-[2.25rem] font-bold leading-none tracking-[-0.04em]"
      >
        Koperasi Siap!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36, duration: 0.3, ease: "easeOut" }}
        className="mt-4 max-w-[22rem] text-[1.12rem] leading-snug text-text/76"
      >
        Koperasi berhasil dikonfigurasi dan siap beroperasi
      </motion.p>
    </motion.div>
  );
}

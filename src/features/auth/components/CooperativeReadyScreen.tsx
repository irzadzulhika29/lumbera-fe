"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import PressButton from "@/src/shared/components/ui/PressButton";

export default function CooperativeReadyScreen() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <main className="min-h-[100svh] w-full bg-white text-text">
      <section className="mx-auto flex min-h-[100svh] w-full max-w-[430px] flex-col bg-white px-6 pb-8 pt-7">
        <div className="flex flex-1 flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-[18svh] flex flex-col items-center"
          >
            <div className="relative flex h-[8.75rem] w-[8.75rem] items-center justify-center">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [0.7, 1.08, 1.12], opacity: [0, 0.42, 0] }}
                transition={{ delay: 0.32, duration: 0.7, ease: "easeOut" }}
                className="absolute inset-[0.85rem] rounded-full border-[12px] border-primary-light"
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

          <div className="mt-auto w-full pt-12">
            <PressButton
              type="button"
              className="h-14 w-full text-base font-semibold"
              disabled={isPending}
              onClick={() =>
                startTransition(() => {
                  router.push("/transactions");
                })
              }
            >
              Mulai transaksi
            </PressButton>

            <div className="pt-6 text-center text-[0.82rem] text-text/22">
              Diawasi OJK - Sesuai UU PDP No.27/2022
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import type { ReactNode } from "react";

import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { TESTIMONIAL_CARDS } from "./landingData";

export function DesktopSectionLabel({
  children,
  inverse = false,
}: {
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <span
      className={twMerge(
        "inline-flex rounded-[12px] px-4 py-2 text-[1.02rem] font-semibold tracking-[-0.02em]",
        inverse ? "bg-white text-[#156f70]" : "bg-[#edf7f5] text-primary",
      )}
    >
      {children}
    </span>
  );
}

export function DesktopReveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{
        delay,
        duration: shouldReduceMotion ? 0.2 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function DesktopTestimonialCard({
  card,
  className,
}: {
  card: (typeof TESTIMONIAL_CARDS)[number];
  className?: string;
}) {
  return (
    <article
      className={twMerge(
        "rounded-[22px] bg-[#ebf6f8] px-8 py-7 text-[#183e47] ring-1 ring-white/24",
        className,
      )}
    >
      <div className="flex items-center gap-1 text-[#f5af00]">
        {Array.from({ length: 5 }, (_, index) => (
          <Icon key={`${card.id}-${index}`} icon="solar:star-bold" className="h-4 w-4" />
        ))}
      </div>

      <p className="mt-6 max-w-[25ch] text-[0.96rem] leading-[1.65]">
        &quot;{card.quote}&quot;
      </p>

      <div className="mt-8 flex items-center gap-3 border-t border-[#d3e6e8] pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2c66a5] text-xs font-semibold text-white">
          R
        </span>
        <div>
          <p className="text-[0.82rem] font-semibold leading-none">{card.name}</p>
          <p className="mt-1 text-[0.73rem] leading-none text-[#6a7f86]">
            {card.role}
          </p>
        </div>
      </div>
    </article>
  );
}

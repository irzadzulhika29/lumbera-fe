"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import {
  getPressButtonMotion,
  getPressButtonVariant,
  type PressButtonVariant,
} from "./pressButtonConfig";

type PressButtonProps = HTMLMotionProps<"button"> & {
  variant?: PressButtonVariant;
};

export default function PressButton({
  variant = "primary",
  children,
  className,
  disabled = false,
  type = "button",
  ...props
}: PressButtonProps) {
  const resolvedVariant = getPressButtonVariant(variant);
  const motionState = getPressButtonMotion(variant, disabled);

  return (
    <motion.button
      type={type}
      disabled={disabled}
      style={{ boxShadow: resolvedVariant.shadow }}
      whileHover={motionState.whileHover}
      whileTap={motionState.whileTap}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={twMerge(
        "cursor-pointer rounded-lg px-5 py-2.5 text-sm font-semibold",
        "transition-colors duration-150",
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none",
        resolvedVariant.base,
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

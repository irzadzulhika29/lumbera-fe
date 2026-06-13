"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type FormProgressHeaderProps = {
  currentStep: number;
  totalSteps: number;
  estimatedTimeLabel?: string;
};

export default function FormProgressHeader({
  currentStep,
  totalSteps,
  estimatedTimeLabel,
}: FormProgressHeaderProps) {
  const previousStepRef = useRef(currentStep);
  const [direction, setDirection] = useState(1);
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;

  useEffect(() => {
    const previousStep = previousStepRef.current;

    if (previousStep !== currentStep) {
      setDirection(currentStep > previousStep ? 1 : -1);
      previousStepRef.current = currentStep;
    }
  }, [currentStep]);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between text-[0.95rem] leading-none">
        <div className="relative h-5 min-w-[8.4rem] overflow-hidden">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.span
              key={currentStep}
              custom={direction}
              initial={{ y: direction > 0 ? 18 : -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction > 0 ? -18 : 18, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 block whitespace-nowrap font-semibold text-primary"
            >
              Langkah {currentStep} dari {totalSteps}
            </motion.span>
          </AnimatePresence>
        </div>
        {estimatedTimeLabel ? (
          <span className="text-text/60">{estimatedTimeLabel}</span>
        ) : null}
      </div>
      <div className="mt-4 h-1 w-full rounded-full bg-border">
        <motion.div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          initial={false}
          animate={{ width: progressWidth }}
          transition={{ type: "spring", stiffness: 180, damping: 28 }}
        />
      </div>
    </div>
  );
}

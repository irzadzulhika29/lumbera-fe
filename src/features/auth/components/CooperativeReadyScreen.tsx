"use client";

import { motion } from "framer-motion";

import type { RoleOptionId } from "@/src/features/onboarding/content";
import PressButton from "@/src/shared/components/ui/PressButton";

import AuthFooterNote from "./common/AuthFooterNote";
import ReadyRedirectIndicator from "./activation-success/ReadyRedirectIndicator";
import ReadyStatusHero from "./activation-success/ReadyStatusHero";
import { useCooperativeReadyTransition } from "../hooks/useCooperativeReadyTransition";

type CooperativeReadyScreenProps = {
  roleId: RoleOptionId;
};

export default function CooperativeReadyScreen({
  roleId,
}: CooperativeReadyScreenProps) {
  const {
    isPending,
    isExiting,
    shouldReduceMotion,
    shouldAutoRedirect,
    buttonLabel,
    redirectLabel,
    navigateToDestination,
  } = useCooperativeReadyTransition(roleId);

  return (
    <motion.main
      className="min-h-[100svh] w-full bg-white text-text"
      animate={
        isExiting
          ? shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.985, y: -10 }
          : { opacity: 1, scale: 1, y: 0 }
      }
      transition={{ duration: shouldReduceMotion ? 0.12 : 0.24, ease: "easeOut" }}
    >
      <section className="mx-auto flex min-h-[100svh] w-full max-w-[430px] flex-col bg-white px-6 pb-8 pt-7">
        <div className="flex flex-1 flex-col items-center text-center">
          <ReadyStatusHero
            isExiting={isExiting}
            shouldAutoRedirect={shouldAutoRedirect}
          />

          {shouldAutoRedirect ? (
            <ReadyRedirectIndicator
              isExiting={isExiting}
              shouldReduceMotion={shouldReduceMotion}
              label={redirectLabel}
            />
          ) : null}

          <div className="mt-auto w-full pt-12">
            <PressButton
              type="button"
              className="h-14 w-full text-base font-semibold"
              disabled={isPending}
              onClick={navigateToDestination}
            >
              {buttonLabel}
            </PressButton>
            <AuthFooterNote />
          </div>
        </div>
      </section>
    </motion.main>
  );
}

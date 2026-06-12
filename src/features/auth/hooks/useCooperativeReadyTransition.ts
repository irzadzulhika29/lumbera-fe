"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";

import {
  getPostActivationHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";

export function useCooperativeReadyTransition(roleId: RoleOptionId) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [isPending, startTransition] = useTransition();
  const [isExiting, setIsExiting] = useState(false);
  const navigateTimeoutRef = useRef<number | null>(null);
  const destinationHref = getPostActivationHref(roleId);
  const shouldAutoRedirect = roleId === "officer";
  const buttonLabel = roleId === "officer" ? "Masuk ke Dashboard" : "Mulai transaksi";
  const redirectLabel =
    roleId === "officer" ? "Mengarahkan ke dashboard..." : "Mengarahkan...";

  const navigateToDestination = useCallback(() => {
    if (navigateTimeoutRef.current !== null) {
      return;
    }

    setIsExiting(true);
    navigateTimeoutRef.current = window.setTimeout(() => {
      startTransition(() => {
        router.push(destinationHref);
      });
    }, shouldReduceMotion ? 0 : 220);
  }, [destinationHref, router, shouldReduceMotion]);

  useEffect(() => {
    if (!shouldAutoRedirect) {
      return;
    }

    const autoRedirectTimeout = window.setTimeout(() => {
      navigateToDestination();
    }, shouldReduceMotion ? 900 : 1650);

    return () => {
      window.clearTimeout(autoRedirectTimeout);

      if (navigateTimeoutRef.current !== null) {
        window.clearTimeout(navigateTimeoutRef.current);
      }
    };
  }, [navigateToDestination, shouldAutoRedirect, shouldReduceMotion]);

  return {
    isPending,
    isExiting,
    shouldReduceMotion,
    shouldAutoRedirect,
    buttonLabel,
    redirectLabel,
    navigateToDestination,
  };
}

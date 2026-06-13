"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getAuthPinHref,
  type PinSetupStep,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import { isApiError } from "@/src/shared/api";

import {
  getPendingPinStorageKey,
  validatePinConfirmation,
} from "../utils/pinSetupFlow";
import { getPinSetupBackHref, getPinSetupCopy } from "../utils/pinSetupScreenConfig";
import {
  submitMemberPinActivation,
  submitOnboardingPinSetup,
  submitPinLogin,
} from "../utils/pinSetupRequests";

export function usePinSetupScreen(roleId: RoleOptionId, step: PinSetupStep) {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoginStep = step === "login";
  const isMemberPinActivationFlow = roleId === "member" && !isLoginStep;

  useEffect(() => {
    if (step !== "create") {
      return;
    }

    window.sessionStorage.removeItem(getPendingPinStorageKey(roleId));
  }, [roleId, step]);

  useEffect(() => {
    if (step !== "create" || pin.length !== 6) {
      return;
    }

    window.sessionStorage.setItem(getPendingPinStorageKey(roleId), pin);
    startTransition(() => {
      router.push(getAuthPinHref(roleId, "confirm"));
    });
  }, [pin, roleId, router, step]);

  const backHref = useMemo(
    () =>
      getPinSetupBackHref({
        roleId,
        step,
        isLoginStep,
        isMemberPinActivationFlow,
      }),
    [isLoginStep, isMemberPinActivationFlow, roleId, step],
  );

  const { title, description } = useMemo(
    () => getPinSetupCopy(step, isLoginStep),
    [isLoginStep, step],
  );

  const handlePinChange = (nextPin: string) => {
    setPin(nextPin);

    if (error) {
      setError("");
    }
  };

  const handleLogin = async () => {
    if (pin.length !== 6) {
      setError("PIN harus terdiri dari 6 digit");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const destinationHref = await submitPinLogin(roleId, pin);
      startTransition(() => {
        router.push(destinationHref);
      });
    } catch (requestError) {
      setError(
        isApiError(requestError)
          ? requestError.message
          : "Terjadi kesalahan saat masuk ke akun",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmPin = async () => {
    const originalPin = window.sessionStorage.getItem(getPendingPinStorageKey(roleId)) ?? "";
    const validationError = validatePinConfirmation(originalPin, pin);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const destinationHref = isMemberPinActivationFlow
        ? await submitMemberPinActivation(roleId, originalPin, pin)
        : await submitOnboardingPinSetup(roleId, originalPin, pin);

      startTransition(() => {
        router.push(destinationHref);
      });
    } catch (requestError) {
      setError(
        isApiError(requestError)
          ? requestError.message
          : isMemberPinActivationFlow
            ? "Terjadi kesalahan saat menyimpan PIN anggota"
            : "Terjadi kesalahan saat menyimpan PIN",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    pin,
    error,
    title,
    description,
    isLoginStep,
    isSubmitting,
    backHref,
    handlePinChange,
    handleContinue: isLoginStep ? handleLogin : handleConfirmPin,
  };
}

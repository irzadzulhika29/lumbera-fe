"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { login, setOnboardingPin } from "@/src/features/auth/api/authApi";
import {
  getAuthPhoneHref,
  getAuthOtpHref,
  getAuthPinHref,
  getAuthProfileHref,
  getPostLoginHref,
  type PinSetupStep,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import { isApiError } from "@/src/shared/api";

import { saveAuthSession } from "../utils/authSessionStorage";
import {
  getOnboardingDraftSession,
  saveOnboardingDraftSession,
} from "../utils/onboardingDraftStorage";
import {
  getPendingLoginPhoneStorageKey,
  getPendingPinStorageKey,
  validatePinConfirmation,
} from "../utils/pinSetupFlow";

export function usePinSetupScreen(roleId: RoleOptionId, step: PinSetupStep) {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoginStep = step === "login";

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

  const backHref = useMemo(() => {
    if (isLoginStep) {
      return getAuthPhoneHref(roleId);
    }

    return step === "confirm"
      ? getAuthPinHref(roleId, "create")
      : getAuthOtpHref(roleId);
  }, [isLoginStep, roleId, step]);

  const title = step === "confirm" ? "Konfirmasi pin" : isLoginStep ? "Masukkan pin" : "Buat Pin Akun";
  const description =
    step === "confirm"
      ? "Buat pin untuk akun anda"
      : isLoginStep
        ? "Gunakan PIN akun anda"
        : "Buat pin untuk akun anda";

  const handlePinChange = (nextPin: string) => {
    setPin(nextPin);

    if (error) {
      setError("");
    }
  };

  const handleLogin = async () => {
    const pendingPhoneNumber =
      window.sessionStorage.getItem(getPendingLoginPhoneStorageKey(roleId)) ?? "";

    if (!pendingPhoneNumber) {
      setError("Nomor handphone tidak ditemukan. Ulangi dari awal.");
      return;
    }

    if (pin.length !== 6) {
      setError("PIN harus terdiri dari 6 digit");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const loginResponse = await login({
        phoneNumber: pendingPhoneNumber,
        pin,
      });

      saveAuthSession({
        accessToken: loginResponse.access_token,
        refreshToken: loginResponse.refresh_token,
        userId: loginResponse.user_id,
        cooperativeId: loginResponse.cooperative_id,
        roleId: loginResponse.role_id,
        roleCode: loginResponse.role_code,
        memberId: loginResponse.member_id,
      });

      window.sessionStorage.removeItem(getPendingLoginPhoneStorageKey(roleId));

      startTransition(() => {
        router.push(getPostLoginHref(loginResponse.role_code));
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

    const onboardingDraft = getOnboardingDraftSession(roleId);

    if (!onboardingDraft?.onboardingDraftId) {
      setError("Sesi onboarding tidak ditemukan. Ulangi dari awal.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const pinResponse = await setOnboardingPin({
        roleId,
        onboardingDraftId: onboardingDraft.onboardingDraftId,
        pin: originalPin,
        confirmPin: pin,
      });

      saveOnboardingDraftSession(roleId, {
        ...onboardingDraft,
        onboardingDraftId: pinResponse.onboarding_draft_id,
        onboardingToken: pinResponse.onboarding_token,
        nextStep: pinResponse.next_step,
      });

      window.sessionStorage.removeItem(getPendingPinStorageKey(roleId));
      startTransition(() => {
        router.push(getAuthProfileHref(roleId));
      });
    } catch (requestError) {
      setError(
        isApiError(requestError)
          ? requestError.message
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

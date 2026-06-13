"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { startOnboarding } from "@/src/features/auth/api/authApi";
import type { AuthEntryFlow, RoleOptionId } from "@/src/features/onboarding/content";
import {
  getAuthOtpHref,
  getAuthPinHref,
} from "@/src/features/onboarding/content";
import { isApiError } from "@/src/shared/api";

import { saveOnboardingDraftSession } from "../utils/onboardingDraftStorage";
import { getPendingLoginPhoneStorageKey } from "../utils/pinSetupFlow";

export function usePhoneAuthFlow(roleId: RoleOptionId, flow: AuthEntryFlow) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegisterFlow = flow === "register";

  const handlePhoneChange = (value: string) => {
    setPhone(value);

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async () => {
    const normalizedPhone = phone.replace(/\D/g, "");

    if (!normalizedPhone) {
      setError("Nomor handphone wajib diisi");
      return;
    }

    if (normalizedPhone.length < 9) {
      setError("Masukkan nomor WhatsApp yang valid");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      if (isRegisterFlow) {
        const onboardingDraft = await startOnboarding({
          roleId,
          phoneNumber: normalizedPhone,
        });

        saveOnboardingDraftSession(roleId, {
          onboardingDraftId: onboardingDraft.onboarding_draft_id,
          roleId,
          phoneNumber: onboardingDraft.phone_number,
          expiresInSeconds: onboardingDraft.expires_in_seconds,
        });

        startTransition(() => {
          router.push(getAuthOtpHref(roleId));
        });
      } else {
        window.sessionStorage.setItem(
          getPendingLoginPhoneStorageKey(roleId),
          normalizedPhone,
        );

        startTransition(() => {
          router.push(getAuthPinHref(roleId, "login"));
        });
      }
    } catch (requestError) {
      setError(
        isApiError(requestError)
          ? requestError.message
          : "Terjadi kesalahan saat menghubungi server",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    phone,
    error,
    isSubmitting,
    isRegisterFlow,
    handlePhoneChange,
    handleSubmit,
  };
}

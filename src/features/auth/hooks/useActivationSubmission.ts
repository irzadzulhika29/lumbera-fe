"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { activateCooperative } from "@/src/features/onboarding/api/onboardingApi";
import {
  getAuthActivationSuccessHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import { isApiError } from "@/src/shared/api";

import {
  getOnboardingDraftSession,
  saveOnboardingDraftSession,
} from "../utils/onboardingDraftStorage";

export function useActivationSubmission(roleId: RoleOptionId) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleActivate = async () => {
    const onboardingDraft = getOnboardingDraftSession(roleId);

    if (!onboardingDraft?.onboardingDraftId || !onboardingDraft.onboardingToken) {
      setFormError("Sesi onboarding tidak ditemukan. Ulangi dari awal.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      const activationResponse = await activateCooperative({
        onboardingDraftId: onboardingDraft.onboardingDraftId,
        onboardingToken: onboardingDraft.onboardingToken,
      });

      saveOnboardingDraftSession(roleId, {
        ...onboardingDraft,
        userId: activationResponse.user_id,
        cooperativeId: activationResponse.cooperative_id,
        membershipId: activationResponse.membership_id,
        nextStep: activationResponse.next_step,
      });

      startTransition(() => {
        router.push(getAuthActivationSuccessHref(roleId));
      });
    } catch (requestError) {
      setFormError(
        isApiError(requestError)
          ? requestError.message
          : "Terjadi kesalahan saat mengaktifkan koperasi",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isPending,
    isSubmitting,
    formError,
    handleActivate,
  };
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateCooperativeType } from "@/src/features/onboarding/api/onboardingApi";
import {
  getAuthCooperativeProfileHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import { isApiError } from "@/src/shared/api";
import {
  getOnboardingDraftSession,
  saveOnboardingDraftSession,
} from "../utils/onboardingDraftStorage";
import {
  COOPERATIVE_TYPE_CODE_MAP,
  type CooperativeTypeId,
} from "../components/cooperative-type/cooperativeTypeConfig";

export function useCooperativeTypeForm(roleId: RoleOptionId) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState<CooperativeTypeId>("ksp");
  const [formError, setFormError] = useState("");

  const handleSelectType = (value: CooperativeTypeId) => {
    setSelectedType(value);

    if (formError) {
      setFormError("");
    }
  };

  const handleSubmit = async () => {
    const onboardingDraft = getOnboardingDraftSession(roleId);

    if (!onboardingDraft?.onboardingDraftId || !onboardingDraft.onboardingToken) {
      setFormError("Sesi onboarding tidak ditemukan. Ulangi dari awal.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      const cooperativeTypeResponse = await updateCooperativeType({
        onboardingDraftId: onboardingDraft.onboardingDraftId,
        onboardingToken: onboardingDraft.onboardingToken,
        cooperativeType: COOPERATIVE_TYPE_CODE_MAP[selectedType],
      });

      saveOnboardingDraftSession(roleId, {
        ...onboardingDraft,
        onboardingDraftId: cooperativeTypeResponse.onboarding_draft_id,
        nextStep: cooperativeTypeResponse.next_step,
      });

      startTransition(() => {
        router.push(getAuthCooperativeProfileHref(roleId));
      });
    } catch (requestError) {
      setFormError(
        isApiError(requestError)
          ? requestError.message
          : "Terjadi kesalahan saat menyimpan jenis koperasi",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isPending,
    isSubmitting,
    selectedType,
    formError,
    handleSelectType,
    handleSubmit,
  };
}
